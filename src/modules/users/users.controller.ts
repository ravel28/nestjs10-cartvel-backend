import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { BaseController } from 'src/cores/base.controller';
import { Response } from 'express';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController extends BaseController {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  @Post('login/')
  async loginUser(
    @Res() res: Response,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      this.ok(
        res,
        await this.usersService.loginUser(email, password),
        'Login Succesfully execute',
        null,
      );
    } catch (error) {
      this.handleException(res, error);
    }
  }

  @Get('detail/:idUser')
  async detailUser(@Res() res: Response, @Param('idUser') idUser: number) {
    try {
      this.ok(
        res,
        await this.usersService.detailUser(idUser),
        'Login Succesfully execute',
        null,
      );
    } catch (error) {
      this.handleException(res, error);
    }
  }

  @Post('create/')
  async createUser(@Res() res: Response, @Body() create: CreateUserDto) {
    try {
      this.created(
        res,
        await this.usersService.createUser(create),
        'User successfully created',
        null,
      );
    } catch (error) {
      this.handleException(res, error);
    }
  }

  @Put('update/:idUser')
  @UseInterceptors()
  async updateUser(
    @Res() res: Response,
    @Param('idUser') idUser: number,
    @Body() create: UpdateUserDto,
  ) {
    try {
      this.ok(
        res,
        await this.usersService.updateUser(idUser, create),
        'User successfully created',
        null,
      );
    } catch (error) {
      this.handleException(res, error);
    }
  }

  @Put('updatepass/:idUser')
  async updatePassUser(
    @Res() res: Response,
    @Param('idUser') idUser: number,
    @Body('newPass') newPass: string,
    @Body('oldPass') oldPass: string,
  ) {
    try {
      this.ok(
        res,
        await this.usersService.updatePassUser(idUser, newPass, oldPass),
        'User successfully created',
        null,
      );
    } catch (error) {
      this.handleException(res, error);
    }
  }
}
