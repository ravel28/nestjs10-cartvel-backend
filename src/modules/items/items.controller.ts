import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ItemsService } from './services/items.service';
import { CreateItemDto } from './dtos/create-item.dto';
import { CategoryService } from './services/category.service';
import { BaseController } from 'src/cores/base.controller';
import { Response } from 'express';
import { ItemDto } from './dtos/item.dto';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { multerOptions } from 'src/cores/configs/multer.config';
import { updateItemDto } from './dtos/update-item.dto';

@Controller('items')
export class ItemsController extends BaseController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly categoryService: CategoryService,
  ) {
    super();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async createItem(
    @Body() createItem: CreateItemDto,
    @Body('idItem') idItem: number,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      let result: ItemDto;
      createItem.photo = file.filename;
      if (idItem) {
        result = await this.itemsService.updateItem(idItem, createItem);
      } else {
        result = await this.itemsService.createItem(createItem);
      }
      return this.created(res, result, 'Successfully creaated', null);
    } catch (error) {
      this.handleException(res, error);
    }
  }

  @Get('/')
  async getItems(@Res() res: Response, @Query('take') take: number) {
    try {
      return this.ok(
        res,
        await this.itemsService.getItems(take),
        'Successfully creaated',
        null,
      );
    } catch (error) {
      this.handleException(res, error);
    }
  }

  @Put('/stok/:id')
  async updateStockById(
    @Res() res: Response,
    @Param('id') id: number,
    @Body() update: updateItemDto,
  ) {
    try {
      return this.ok(
        res,
        await this.itemsService.updateItem(id, update),
        'Successfully creaated',
        null,
      );
    } catch (error) {
      this.handleException(res, error);
    }
  }

  @Get('/detail/:id')
  async getItemsById(@Res() res: Response, @Param('id') id: number) {
    try {
      return this.ok(
        res,
        await this.itemsService.getDetail(id),
        'Successfully creaated',
        null,
      );
    } catch (error) {
      this.handleException(res, error);
    }
  }

  @Post('category/')
  async createCategory(@Res() res: Response, @Body('name') name: string) {
    try {
      return this.ok(
        res,
        await this.categoryService.create(name),
        'Successfully creaated',
        null,
      );
    } catch (error) {
      this.handleException(res, error);
    }
  }

  @Get('category/')
  async getCategory(@Res() res: Response) {
    try {
      return this.ok(
        res,
        await this.categoryService.get(),
        'Successfully creaated',
        null,
      );
    } catch (error) {
      this.handleException(res, error);
    }
  }
}
