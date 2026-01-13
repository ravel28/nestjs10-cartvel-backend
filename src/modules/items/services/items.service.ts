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
import { updateItemDto } from '../dtos/update-item.dto';

@Injectable()
export class ItemsService extends BaseService {
  constructor(private readonly prismaService: PrismaService) {
    super(ItemsService.name);
  }

  async createItem(createItem: CreateItemDto): Promise<ItemDto> {
    try {
      const findUser = await this.prismaService.users.findUnique({
        where: {
          idUser: Number(createItem.userId),
        },
      });
      if (findUser.role !== RoleUserEnum.SUPER_ADMIN)
        throw new ForbiddenException('Role user must be Mitra');

      return await this.prismaService.item.create({
        data: {
          itemName: createItem.itemName,
          photo: createItem.photo,
          qty: Number(createItem.qty),
          price: Number(createItem.price),
          description: createItem.description,
          userId: Number(createItem.userId),
          categoryId: Number(createItem.categoryId),
        },
      });
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async getItems(take: number): Promise<ItemDto[]> {
    return await this.prismaService.item.findMany({
      take: Number(take),
    });
  }

  async getDetail(idItem: number): Promise<ItemDto> {
    try {
      const [{ data: getDetailItem }] = await this.prismaService.$queryRaw<
        { data: ItemDto }[]
      >`SELECT get_item_detail(${Number(idItem)}) as data`;
      return getDetailItem;
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async updateItem(
    idItem: number,
    updateItem: updateItemDto,
  ): Promise<ItemDto> {
    try {
      const findUser = await this.prismaService.users.findUnique({
        where: {
          idUser: updateItem.userId,
        },
      });
      if (findUser.role !== RoleUserEnum.SUPER_ADMIN)
        throw new ForbiddenException();

      const findStock: ItemDto = await this.prismaService.item.findUnique({
        where: {
          idItem: Number(idItem),
        },
      });

      return await this.prismaService.item.update({
        where: {
          idItem: Number(idItem),
        },
        data: {
          qty: findStock.qty + updateItem.qty,
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
