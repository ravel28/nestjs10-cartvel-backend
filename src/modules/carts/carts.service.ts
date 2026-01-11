import { Injectable } from '@nestjs/common';
import BaseService from 'src/cores/services/base.service';
import { PrismaService } from 'src/cores/services/prisma.service';
import { CreateUpdateCartDto } from '../users/dtos/create-update-cart.dto';

@Injectable()
export class CartsService extends BaseService {
  constructor(private readonly prismaService: PrismaService) {
    super(CartsService.name);
  }

  async createCart(create: CreateUpdateCartDto) {
    try {
      return await this.prismaService.cart.create({
        data: {
          qty: create.qty,
          userId: create.userId,
          itemId: create.itemId,
        },
      });
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async updateCart(cartId: number, updateCart: CreateUpdateCartDto) {
    try {
      return await this.prismaService.cart.update({
        where: {
          idCart: cartId,
        },
        data: {
          qty: updateCart.qty,
          userId: updateCart.userId,
          itemId: updateCart.itemId,
        },
      });
    } catch (error) {
      this.handleErrorService(error);
    }
  }
}
