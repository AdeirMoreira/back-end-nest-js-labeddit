import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { idPost } from './dto/idPost.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: idPost) {
    const { id } = params;
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param() params: idPost, @Body() updatePostDto: UpdatePostDto) {
    const { id } = params;
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param() params: idPost) {
    const { id } = params;
    return this.postsService.remove(+id);
  }
}
