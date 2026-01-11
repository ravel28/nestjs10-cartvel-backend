import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/cores/services/prisma.service';
import { MitraService } from './services/mitra.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, MitraService, PrismaService],
})
export class UsersModule {}
