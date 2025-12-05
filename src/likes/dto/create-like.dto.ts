import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
  @IsNotEmpty()
  postId: string;

  @IsEnum(['like', 'dislike'])
  type: 'like' | 'dislike';
}
