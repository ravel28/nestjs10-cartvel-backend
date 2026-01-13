import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { BaseController } from 'src/cores/base.controller';
import { Response } from 'express';
import { CreateTransactionDto } from './dtos/create-transaction.dto';

@Controller('transaction')
export class TransactionController extends BaseController {
  constructor(private readonly transactionService: TransactionService) {
    super();
  }

  @Post('create')
  async createTransaction(
    @Res() res: Response,
    @Body() create: CreateTransactionDto[],
  ) {
    try {
      this.ok(
        res,
        await this.transactionService.createTransaction(create),
        'Cart Succesfully to Transaction execute',
        null,
      );
    } catch (error) {
      this.handleException(res, error);
    }
  }

  @Get('all/:userId')
  async getTransaction(@Res() res: Response, @Param('userId') userId: number) {
    try {
      this.ok(
        res,
        await this.transactionService.getTransaction(userId),
        'Cart Succesfully to Transaction execute',
        null,
      );
    } catch (error) {
      this.handleException(res, error);
    }
  }
}
