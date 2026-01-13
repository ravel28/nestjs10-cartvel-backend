import { BadRequestException, Injectable } from '@nestjs/common';
import BaseService from 'src/cores/services/base.service';
import { PrismaService } from 'src/cores/services/prisma.service';

@Injectable()
export class CategoryService extends BaseService {
  constructor(private readonly prismaService: PrismaService) {
    super(CategoryService.name);
  }

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

  async get() {
    try {
      return await this.prismaService.category.findMany({});
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
