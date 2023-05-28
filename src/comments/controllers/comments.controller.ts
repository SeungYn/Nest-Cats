import { Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({
    summary: '모든 고영이 프로필에 적힌 댓글 가져오기',
  })
  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @Post(':id')
  async createComment(@Param('id') id: string) {
    return this.commentsService.createComment(id);
  }
}
