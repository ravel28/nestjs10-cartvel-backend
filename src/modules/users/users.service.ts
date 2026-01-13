import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PrismaService } from 'src/cores/services/prisma.service';
import BaseService from 'src/cores/services/base.service';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService extends BaseService {
  constructor(private readonly prismaService: PrismaService) {
    super(UsersService.name);
  }

  async loginUser(email: string, password: string): Promise<Partial<UserDto>> {
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

      const data: Partial<UserDto> = {
        idUser: findUser.idUser,
        email: findUser.email,
        name: findUser.name,
        role: findUser.role,
      };
      return data;
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async detailUser(idUser: number): Promise<Partial<UserDto>> {
    try {
      const findUser: UserDto = await this.prismaService.users.findUnique({
        where: {
          idUser: Number(idUser),
        },
      });

      delete findUser.password;

      return findUser;
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
          phone: createUser.phoneNumber,
          address: createUser.address,
        },
      });
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async updateUser(
    idUser: number,
    createUser: UpdateUserDto,
  ): Promise<Partial<UserDto>> {
    try {
      const updateData: UserDto = await this.prismaService.users.update({
        where: {
          idUser: Number(idUser),
        },
        data: {
          email: createUser.email,
          name: createUser.name,
          phone: createUser.phoneNumber,
          address: createUser.address,
        },
      });

      delete updateData.password;
      return updateData;
    } catch (error) {
      this.handleErrorService(error);
    }
  }

  async updatePassUser(
    idUser: number,
    newPass: string,
    oldPass: string,
  ): Promise<Partial<UserDto>> {
    try {
      const updateData: UserDto = await this.prismaService.users.update({
        where: {
          idUser: Number(idUser),
          password: oldPass,
        },
        data: {
          password: newPass,
        },
      });

      delete updateData.password;
      return updateData;
    } catch (error) {
      this.handleErrorService(error);
    }
  }
}
