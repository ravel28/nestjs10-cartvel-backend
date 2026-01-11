import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/cores/services/prisma.service';
import { ItemDto } from '../dtos/item.dto';
import { CreateItemDto } from '../dtos/create-item.dto';
import { RoleUserEnum } from '@prisma/client';
import BaseService from 'src/cores/services/base.service';

@Injectable()
export class ItemsService extends BaseService {
  constructor(private readonly prismaService: PrismaService) {
    super(ItemsService.name);
  }

  async createItem(createItem: CreateItemDto): Promise<ItemDto> {
    try {
      const findUser = await this.prismaService.users.findUnique({
        where: {
          idUser: createItem.userId,
        },
      });
      if (findUser.role !== RoleUserEnum.MITRA)
        throw new ForbiddenException('Role user must be Mitra');

      console.log(createItem);
      console.log(createItem.categoryId);
      return await this.prismaService.item.create({
        data: {
          itemName: createItem.itemName,
          photo: '',
          qty: createItem.qty,
          price: createItem.price,
          description: createItem.description,
          userId: createItem.userId,
          categoryId: createItem.categoryId,
        },
      });
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async updateItem(
    idItem: number,
    updateItem: CreateItemDto,
  ): Promise<ItemDto> {
    try {
      const findUser = await this.prismaService.users.findUnique({
        where: {
          idUser: updateItem.userId,
        },
      });
      if (findUser.role !== RoleUserEnum.MITRA) throw new ForbiddenException();

      return await this.prismaService.item.update({
        where: {
          idItem: idItem,
        },
        data: {
          itemName: updateItem.itemName,
          photo: '',
          qty: updateItem.qty,
          price: updateItem.price,
          description: updateItem.description,
          userId: updateItem.userId,
          categoryId: updateItem.categoryId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
