import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExpertService } from './expert.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ExpertDto, ExpertUdpateDto } from './dto/expert.dto';

@Controller('expert')
export class ExpertController {
  constructor(private readonly expertService: ExpertService) {}

  @Get()
  async getAll() {
    return this.expertService.getAll();
  }

  @Get('/:id')
  async getOneById(@Param('id') id: string) {
    return this.expertService.getOneById(Number(id));
  }

  @Get('/slug/:slug')
  async getOneBySlug(@Param('slug') slug: string) {
    return this.expertService.getOneById(Number(slug));
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: ExpertDto) {
    return this.expertService.create(dto);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Patch('/:id')
  async update(@Body() dto: ExpertUdpateDto, @Param('id') id: string) {
    return this.expertService.update(dto, Number(id));
  }

  @Auth()
  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    return this.expertService.delete(Number(id));
  }
}
