/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  INestApplication,
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  private logger: Logger;

  constructor() {
    super({
      log: [
        // 'info',
        // 'query'
      ],
    });
    this.logger = new Logger(PrismaService.name);
  }
  /**
   * On Application Shutdown
   * @param signal string
   * @returns void
   */
  onApplicationShutdown(signal?: string) {
    this.$disconnect();
    this.logger.log('Prisma OCX shutting down, see you...');
  }

  /**
   * On Module Init
   * @returns Promise<void>
   */
  async onModuleInit() {
    this.logger.log(`Database connection occured ${Math.random()}`);
  }

  /**
   * Enable Shutdown Hook
   * @param app INestApplication
   * @returns Promise<void>
   */
  async enableShutdownHook(app: INestApplication): Promise<void> {
    process.on('beforeExit', async () => {
      this.$disconnect();
      this.logger.log('Prisma Public shutting down...');
      await app.close();
    });
  }
}
