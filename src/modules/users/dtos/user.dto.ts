import { RoleUserEnum } from '@prisma/client';

export class UserDto {
  email: string;
  password: string;
  name: string;
  role: RoleUserEnum;
}
