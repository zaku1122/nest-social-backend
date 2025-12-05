import { Controller, Get, Post as HttpPost, Body, Param, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
@UseGuards(AuthGuard('jwt'))
export class PostsController {
  constructor(private readonly postsService: PostsService) {}


  @HttpPost()
  create(@Req() req, @Body() dto: CreatePostDto) 
  {
    return this.postsService.create(dto, req.user.userId);
  }

  @Get()
  findAll(@Req() req) 
  {
    return this.postsService.findAll(req.user.userId);
  }


  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) 
  {
    return this.postsService.findOne(id, req.user.userId);
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto, @Req() req) 
  {
    return this.postsService.update(id, dto, req.user.userId);
  }


  @Delete(':id')
  delete(@Param('id') id: string, @Req() req) 
  {
    return this.postsService.delete(id, req.user.userId);
  }
}
