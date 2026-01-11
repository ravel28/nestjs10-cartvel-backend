import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CartsModule } from './modules/carts/carts.module';
import { ItemsModule } from './modules/items/items.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [UsersModule, CartsModule, ItemsModule, DashboardModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
