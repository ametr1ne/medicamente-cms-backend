import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ServiceDto, UpdateServiceDto } from './dto/service.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.service.findMany();
  }

  async getById(id: number) {
    const isExists = await this.prisma.service.findUnique({ where: { id } });

    if (!isExists) throw new NotFoundException('Cannot get service');

    return this.getWholeObject({ where: { id } });
  }

  async getOneBySlug(slug: string) {
    const isExists = await this.prisma.service.findUnique({ where: { slug } });

    if (!isExists) throw new NotFoundException('Cannot get service');

    return this.getWholeObject({ where: { slug } });
  }

  async create(dto: ServiceDto) {
    const isExists = await this.prisma.service.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (isExists)
      throw new BadRequestException('This name is already in use');

    const service = await this.prisma.service.create({ data: dto });
    return service;
  }

  async update(dto: UpdateServiceDto, id: number) {
    const isExists = await this.prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (!isExists) throw new NotFoundException('Cannot get service');

    return this.prisma.service.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        shortDescription: dto.shortDescription,
        longDescription: dto.longDescription,
        icon: dto.icon,
        published: false,
        slug: dto.slug,
      },
    });
  }

  async publish(id: number) {
    const isExists = await this.prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (!isExists) throw new NotFoundException('Cannot get service');

    return this.prisma.service.update({
      where: { id },
      data: {
        published: true,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.service.delete({
      where: { id },
    });
  }

  private async getWholeObject(params: {
    where: Prisma.ServiceWhereUniqueInput;
  }) {
    const { where } = params;

    return this.prisma.service.findUnique({
      where,
      include: {
        specialists: true,
        prices: true,
      },
    });
  }
}
