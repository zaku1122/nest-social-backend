import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto'; 
import { PostNotFoundException } from './exceptions/post-not-found.exception';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostsService {
    private posts: Post[] = [];

    findAll() {
        return this.posts;
    }

    findOne(id: number) {
        const post = this.posts.find(post => post.id === id);
        if (!post) {
            throw new PostNotFoundException(id);
        }
        return post;
    }


    create( dto : CreatePostDto ) {
        const newPost = {
            id: Date.now(),
            ...dto,
        };
        this.posts.push(newPost);
        return newPost;
    }
        update(id: number, dto: UpdatePostDto) {
            const post = this.findOne(id);
            Object.assign(post, dto);
            return post;
}
    remove(id: number) {
        const post = this.findOne(id);
        this.posts = this.posts.filter(p => p.id !== id);
        return post;
    }


}