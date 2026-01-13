import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { CartsService } from './carts.service';
import { BaseController } from 'src/cores/base.controller';
import { Response } from 'express';
import { CreateUpdateCartDto } from '../users/dtos/create-update-cart.dto';

@Controller('carts')
export class CartsController extends BaseController {
  constructor(private readonly cartsService: CartsService) {
    super();
  }

  @Post('create')
  async createCart(@Res() res: Response, @Body() create: CreateUpdateCartDto) {
    try {
      return this.created(
        res,
        await this.cartsService.createCart(create),
        'Cart succesfully added to cart',
        null,
      );
    } catch (error) {
      this.handleException(res, error);
    }
  }

  @Get('view/:userId')
  async viewCart(@Res() res: Response, @Param('userId') userId: number) {
    try {
      return this.created(
        res,
        await this.cartsService.cartView(userId),
        'Cart succesfully fetch',
        null,
      );
    } catch (error) {
      this.handleException(res, error);
    }
  }

  @Put('update/add/:id')
  async updateCartAdd(@Res() res: Response, @Param('id') id: number) {
    try {
      const option: string = 'add';
      return this.ok(
        res,
        await this.cartsService.updateCart(id, option),
        'Cart successfully updated',
        null,
      );
    } catch (error) {
      this.handleException(res, error);
    }
  }

  @Put('update/minus/:id')
  async updateCartMinus(@Res() res: Response, @Param('id') id: number) {
    try {
      const option: string = 'minus';
      return this.ok(
        res,
        await this.cartsService.updateCart(id, option),
        'Cart successfully updated',
        null,
      );
    } catch (error) {
      this.handleException(res, error);
    }
  }
}
