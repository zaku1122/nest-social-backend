import { Controller,Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  UseFilters } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SimpleAuthGuard } from './guards/simple-auth.guard';
import { NotFoundFilter } from './filters/not-found.filter';
@UseGuards(SimpleAuthGuard)
@UseFilters(new NotFoundFilter())
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}
    @Get()
    findAll() {
        return this.postsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.postsService.findOne(id);
    }

    @Post()
    create(@Body() createPostDto: CreatePostDto) {
        return this.postsService.create(createPostDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: UpdatePostDto) {
        return this.postsService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.postsService.remove(id);
    }
}
