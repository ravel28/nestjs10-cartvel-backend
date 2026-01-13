import { RoleUserEnum } from '@prisma/client';

export class UserDto {
  idUser: number;
  email: string;
  password: string;
  name: string;
  role: RoleUserEnum;
  phone: string;
  address: string;
}
