import { Type } from 'class-transformer';

export class CreateItemDto {
  itemName: string;
  photo: string;
  qty: number;
  description?: string;
  price: number;
  @Type(() => Number)
  userId: number;
  categoryId: number;
}
