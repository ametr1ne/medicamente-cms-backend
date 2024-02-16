import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ExpertUdpateDto } from './dto/expert.dto';

@Injectable()
export class ExpertService {
  constructor(private prisma: PrismaService) {}

  async create(dto: ExpertUdpateDto) {
    const isExists = await this.prisma.expert.findUnique({
      where: { slug: dto.slug },
    });

    if (isExists)
      throw new BadRequestException('Expert with same slug already exists');

    return this.prisma.expert.create({ data: dto });
  }

  async getAll() {
    return this.prisma.expert.findMany();
  }

  async getOneById(id: number) {
    const isExists = await this.prisma.expert.findUnique({ where: { id } });

    if (!isExists) throw new NotFoundException('Not found expert with same id');

    return this.prisma.expert.findUnique({ where: { id } });
  }

  async getOneBySlug(slug: string) {
    const isExists = await this.prisma.expert.findUnique({ where: { slug } });

    if (!isExists)
      throw new NotFoundException('Not found expert with same slug');

    return this.prisma.expert.findUnique({ where: { slug } });
  }

  async update(dto: ExpertUdpateDto, id: number) {
    const isExists = await this.prisma.expert.findUnique({ where: { id } });

    if (!isExists) throw new NotFoundException('Not found expert with same id');

    return this.prisma.expert.update({
      where: { id },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        middleName: dto.middleName,
        slug: dto.slug,
        photo: dto.photo,
        experienceInYears: dto.experienceInYears,
        rank: dto.rank,
        specializations: dto.specializations,
        tags: dto.tags,
      },
    });
  }

  async delete(id: number) {
    const isExists = await this.prisma.expert.findUnique({ where: { id } });

    if (!isExists) throw new NotFoundException('Not found expert with same id');

    return this.prisma.expert.delete({ where: { id } });
  }
}
