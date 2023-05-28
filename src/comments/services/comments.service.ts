import { Injectable } from '@nestjs/common';
import { CommentsCreateDto } from '../dtos/comments.dto';

@Injectable()
export class CommentsService {
  async getAllComments() {
    return 'hello world';
  }

  async createComment(id: string, comments: CommentsCreateDto) {
    return 'hello world';
  }

  async plusLike(id: string) {
    return 'like';
  }
}
