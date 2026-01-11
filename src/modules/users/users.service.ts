import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PrismaService } from 'src/cores/services/prisma.service';
import BaseService from 'src/cores/services/base.service';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UsersService extends BaseService {
  constructor(private readonly prismaService: PrismaService) {
    super(UsersService.name);
  }

  async loginUser(email: string, password: string): Promise<String> {
    try {
      const findUser: UserDto = await this.prismaService.users.findUnique({
        where: {
          email: email,
        },
      });
      if (!findUser)
        throw new NotFoundException('User tidak ditemukan di database kami');
      if (findUser.password !== password)
        throw new NotFoundException('Password tidak sama');
      return 'User dapat ditemukan';
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async createUser(createUser: CreateUserDto): Promise<UserDto> {
    try {
      return await this.prismaService.users.create({
        data: {
          email: createUser.email,
          password: createUser.password,
          name: createUser.name,
        },
      });
    } catch (error) {
      this.handleErrorService(error);
    }
  }
}
