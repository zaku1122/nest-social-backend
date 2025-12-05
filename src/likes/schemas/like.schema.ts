import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Like extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
  postId: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ enum: ['like', 'dislike'], required: true })
  type: 'like' | 'dislike';
}

export const LikeSchema = SchemaFactory.createForClass(Like);
