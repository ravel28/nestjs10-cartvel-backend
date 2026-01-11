import { plainToClass } from 'class-transformer';
import { Response } from 'express';
import { ResponseDto } from './dtos/response.dto';
import { HttpStatus } from '@nestjs/common';

export abstract class BaseController {
  ok<T, M>(res: Response, data: T, message: string, meta?: M) {
    const stastusCodeOk: number = HttpStatus.OK;
    return res.status(HttpStatus.OK).json(
      plainToClass(ResponseDto<T, any>, {
        data: data,
        meta: meta ? meta : undefined,
        message: message,
        status: stastusCodeOk,
        time: new Date(),
      }),
    );
  }

  created<T, M>(res: Response, data: T, message: string, meta: M) {
    return res.status(HttpStatus.CREATED).json(
      plainToClass(ResponseDto<any, any>, {
        data: data,
        meta: meta,
        message: message,
        status: HttpStatus.CREATED,
        time: new Date(),
      }),
    );
  }

  responseNoContent(res: Response, data: any) {
    return res.status(HttpStatus.NO_CONTENT).send(data);
  }

  handleException(res: Response, error: any) {
    const data: null = null;
    const meta: null = null;
    const response = error.response
      ? {
          data: data,
          meta: meta,
          message: error.response?.message,
          error: error.response?.error,
          status: error.response?.statusCode,
          time: new Date(),
        }
      : {
          data: data,
          meta: meta,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message.message
            ? error.message.message
            : error.message,
          time: new Date(),
        };
    return res.status(response.status).json(response);
  }

  handleExceptionWithMessage(res: Response, error: any, message: string) {
    return res.status(error?.status).json({
      data: null,
      meta: null,
      message: message,
      status: error?.status,
      time: new Date(),
    });
  }
}
