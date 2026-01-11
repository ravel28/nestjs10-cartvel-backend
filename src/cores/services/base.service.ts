import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import ServiceError from '../errors/service.error';

abstract class BaseService {
  public logger: Logger;
  private instanceName: string;

  constructor(instance: string) {
    this.logger = new Logger(instance);
    this.instanceName = instance;
  }

  /**
   * Plugin of debug to simple code
   * @param message
   * @param context
   */
  async debug(message: string, context: any) {
    this.logger.debug(message, context);
  }

  handleErrorService(error: any) {
    this.logger.error(error.name);
    this.logger.error(error.message);

    if (error instanceof BadRequestException)
      throw new BadRequestException(error.getResponse());
    if (error instanceof NotFoundException)
      throw new NotFoundException(error.getResponse());
    if (error instanceof ConflictException)
      throw new ConflictException(error.getResponse());
    if (error instanceof ForbiddenException)
      throw new ForbiddenException(error.getResponse());

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2028') {
        throw new BadRequestException(
          'Time Out To Transaction data of Realization',
        );
      } else if (error.code === 'P2002') {
        throw new ConflictException(`${error.meta.target[0]} already exist`);
      } else {
        throw new ServiceError(
          `${error.name} ${error?.code}: Please check the input ${error.meta.target[0]}`,
        );
      }
    }

    if (error instanceof PrismaClientValidationError) {
      throw new ServiceError(`${error.name}: ${error.message}`);
    }

    throw new ServiceError(error);
  }
}

export default BaseService;
