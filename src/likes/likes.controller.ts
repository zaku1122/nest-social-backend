import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from '../users/decorators/user.decorator';

@Controller('likes')
@UseGuards(AuthGuard('jwt'))
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  like(@Body() dto: CreateLikeDto, @UserInfo() user: any) 
  {
    return this.likesService.toggleLike(dto, user.userId);
  }

  @Get(':postId')
  count(@Param('postId') postId: string) 
  {
    return this.likesService.countLikes(postId);
  }
}
