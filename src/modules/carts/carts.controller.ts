import { Body, Controller, Param, Post, Put, Res } from '@nestjs/common';
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
        'Item succesfully added to cart',
        null,
      );
    } catch (error) {
      this.handleException(res, error);
    }
  }

  @Put('update/:id')
  async updateCart(
    @Res() res: Response,
    @Body() update: CreateUpdateCartDto,
    @Param('id') id: number,
  ) {
    try {
      return this.ok(
        res,
        await this.cartsService.updateCart(id, update),
        'Cart successfully updated',
        null,
      );
    } catch (error) {
      this.handleException(res, error);
    }
  }
}
