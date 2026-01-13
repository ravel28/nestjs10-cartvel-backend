import { Injectable } from '@nestjs/common';
import BaseService from 'src/cores/services/base.service';
import { PrismaService } from 'src/cores/services/prisma.service';
import { CreateUpdateCartDto } from '../users/dtos/create-update-cart.dto';
import { CartDto } from '../users/dtos/cart.dto';

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

  async cartView(userId: number) {
    try {
      return await this.prismaService.cartView.findMany({
        where: {
          userId: Number(userId),
        },
      });
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async updateCart(cartId: number, option: string) {
    try {
      const findCart: CartDto = await this.prismaService.cart.findUnique({
        where: {
          idCart: Number(cartId),
        },
      });

      const qty = option === 'add' ? 1 : -1;
      const isAvailable: boolean = findCart.qty + qty > 0 ? true : false;

      if (isAvailable)
        return await this.prismaService.cart.update({
          where: {
            idCart: Number(cartId),
          },
          data: {
            qty: findCart.qty + qty,
          },
        });
      if (!isAvailable)
        return await this.prismaService.cart.delete({
          where: {
            idCart: Number(cartId),
          },
        });
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async checkoutCart() {}
}
