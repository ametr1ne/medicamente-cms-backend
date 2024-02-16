import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceDto, UpdateServiceDto } from './dto/service.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  async getAll() {
    return this.serviceService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.serviceService.getById(Number(id));
  }

  @Get('/slug/:slug')
  async getOneBySlug(@Param('slug') slug: string) {
    return this.serviceService.getOneBySlug(slug);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: ServiceDto) {
    return this.serviceService.create(dto);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Patch('/:id')
  async update(@Body() dto: UpdateServiceDto, @Param('id') id: string) {
    return this.serviceService.update(dto, Number(id));
  }

  @Auth()
  @Put('publish/:id')
  async publish(@Param('id') id: string) {
    return this.serviceService.publish(Number(id));
  }

  @Auth()
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.serviceService.delete(Number(id));
  }
}
