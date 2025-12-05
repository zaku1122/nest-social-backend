import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like } from './schemas/like.schema';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikesService {
  constructor(@InjectModel(Like.name) private likeModel: Model<Like>) {}

  async toggleLike(dto: CreateLikeDto, userId: string) 
  {
    const existing = await this.likeModel.findOne({
      postId: dto.postId,
      userId,
    });

    // If user already liked/disliked the post
    if (existing) 
    {
      // If same type again → remove it (unlike)
      if (existing.type === dto.type) {
        await existing.deleteOne();
        return { message: `Your ${dto.type} was removed` };
      }

      // If opposite type → update record
      existing.type = dto.type;
      await existing.save();
      return { message: `Changed to ${dto.type}` };
    }

    // First time like/dislike
    await this.likeModel.create({
      postId: dto.postId,
      userId,
      type: dto.type,
    });

    return { message: `Post ${dto.type}d successfully` };
  }


  async countLikes(postId: string) 
  {
    const likes = await this.likeModel.countDocuments({ postId, type: 'like' });
    const dislikes = await this.likeModel.countDocuments({
      postId,
      type: 'dislike',
    });

    return { likes, dislikes };
  }
}
