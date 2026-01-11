import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/cores/services/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(name: string) {
    try {
      return await this.prismaService.category.create({
        data: {
          category: name,
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
