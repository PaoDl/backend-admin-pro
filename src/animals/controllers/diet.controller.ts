import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { DietService } from '../services';
import { MyResponse } from 'src/core';
import { Diet } from '../entities';
import { CreateDietDto } from '../dto';
import { Auth } from 'src/auth/decorators';

@Controller('diet')
@Auth()
export class DietController {
  constructor(private readonly dietService: DietService) {}

  @Post()
  create(@Body() createDietDto: CreateDietDto): Promise<MyResponse<Diet>> {
    return this.dietService.create(createDietDto);
  }

  @Get(':diet_id')
  getDiet(
    @Param('diet_id', ParseUUIDPipe) diet_id: string,
  ): Promise<MyResponse<Diet>> {
    return this.dietService.getDiet(diet_id);
  }

  @Get()
  findAll(): Promise<MyResponse<Diet[]>> {
    return this.dietService.findAll();
  }
}
