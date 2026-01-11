export class ItemDto {
  idItem: number;
  itemName: string;
  photo: string;
  qty: number;
  description?: string;
  price: number;
  isDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  categoryId: number;
}
