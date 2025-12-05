import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}


  async create(dto: CreatePostDto, userId: string) 
  {
    return this.postModel.create({
      ...dto,
      author: userId,
    });
  }


  async findAll(userId: string) 
  {
    return this.postModel.find({ author: userId });
  }


  async findOne(id: string, userId: string) 
  {
    const post = await this.postModel.findById(id);
    if (!post)
    {   
        throw new NotFoundException('Post not found'); 
    }

    return post;
  }


  async update(id: string, dto: UpdatePostDto, userId: string) 
  {
    const post = await this.findOne(id, userId);

    if(post.author.toString() !== userId) 
    {
      throw new ForbiddenException('You are not allowed to update this post');
    }

    Object.assign(post, dto);
    return post.save();
  }

  async delete(id: string, userId: string) {
    const post = await this.findOne(id, userId);
    if(post.author.toString() !== userId) {
      throw new ForbiddenException('You are not allowed to delete this post');
    }

    await post.deleteOne();
    return { message: 'Post deleted successfully' };
  }
}
