import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({ description: '고양이 아이디', required: true })
  @Prop({
    type: Types.ObjectId, // ObjectId 라는 타입 사용 사용자에게 보여질때는 string로 변환됨
    required: true,
    ref: 'cats', // 몽고디비는 이렇게 조인을 해줌
  })
  author: Types.ObjectId;

  @ApiProperty({ description: '댓글' })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({ description: '좋아용 수' })
  @Prop({
    default: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  likeCount: number;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
