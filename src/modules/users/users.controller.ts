import { Body, Controller, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { BaseController } from 'src/cores/base.controller';
import { Response } from 'express';

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
}
