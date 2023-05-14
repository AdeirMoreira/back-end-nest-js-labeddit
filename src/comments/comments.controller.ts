import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { idComment } from './dto/idComment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: idComment) {
    const { id } = params;
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param() params: idComment,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const { id } = params;
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param() params: idComment) {
    const { id } = params;
    return this.commentsService.remove(+id);
  }
}
