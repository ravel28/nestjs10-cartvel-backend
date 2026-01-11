import { Module } from '@nestjs/common';
import { ItemsService } from './services/items.service';
import { ItemsController } from './items.controller';
import { PrismaService } from 'src/cores/services/prisma.service';
import { CategoryService } from './services/category.service';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, CategoryService, PrismaService],
})
export class ItemsModule {}
