import { Injectable } from '@nestjs/common';
import BaseService from 'src/cores/services/base.service';
import { PrismaService } from 'src/cores/services/prisma.service';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { TransactionDto, TransactionItemDto } from './dtos/transaction.dto';

@Injectable()
export class TransactionService extends BaseService {
  constructor(private readonly prismaService: PrismaService) {
    super(TransactionService.name);
  }

  async createTransaction(create: CreateTransactionDto[]): Promise<string> {
    try {
      const result = await this.prismaService.$transaction(async (tx) => {
        const noDraft = null;
        const createTransaction: TransactionDto =
          await this.prismaService.transaction.create({
            data: {
              noDraft: noDraft,
              userId: create[0].userId,
            },
          });
        await Promise.all(
          create.map(async (transactionUser: CreateTransactionDto) => {
            const transaction: TransactionItemDto =
              await tx.transactionItem.create({
                data: {
                  qty: transactionUser.qty,
                  price: transactionUser.price,
                  itemId: transactionUser.itemId,
                  transactionId: createTransaction.idTransaction,
                },
              });
          }),
        );
      });

      return 'Transaction Succesfully created';
    } catch (error) {
      this.handleErrorService(error);
    }
  }
}
