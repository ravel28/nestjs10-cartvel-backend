export class TransactionDto {
  idTransaction: number;
  noDraft: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class TransactionItemDto {
  idTransactionItem: number;
  qty: number;
  price: number;
  itemId: number;
  transactionId: number;
  createdAt: Date;
  updatedAt: Date;
}
