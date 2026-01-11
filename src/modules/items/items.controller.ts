import { Body, Controller, Post, Res } from '@nestjs/common';
import { ItemsService } from './services/items.service';
import { CreateItemDto } from './dtos/create-item.dto';
import { CategoryService } from './services/category.service';
import { BaseController } from 'src/cores/base.controller';
import { Response } from 'express';
import { ItemDto } from './dtos/item.dto';

@Controller('items')
export class ItemsController extends BaseController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly categoryService: CategoryService,
  ) {
    super();
  }

  @Post()
  async createItem(
    @Body() createItem: CreateItemDto,
    @Body('idItem') idItem: number,
    @Res() res: Response,
  ) {
    try {
      let result: ItemDto;
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
}
