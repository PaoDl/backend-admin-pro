import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  ParseUUIDPipe,
} from '@nestjs/common';

import { BiomeService } from '../services';
import { CreateBiomeDto } from '../dto';
import { MyResponse } from 'src/core';
import { Biome } from '../entities';
import { Auth } from 'src/auth/decorators';

@Controller('biome')
@Auth()
export class BiomeController {
  constructor(private readonly biomeService: BiomeService) {}

  @Post()
  create(@Body() createBiomeDto: CreateBiomeDto): Promise<MyResponse<Biome>> {
    return this.biomeService.create(createBiomeDto);
  }

  @Get(':biome_id')
  getDiet(
    @Param('biome_id', ParseUUIDPipe) biome_id: string,
  ): Promise<MyResponse<Biome>> {
    return this.biomeService.getBiome(biome_id);
  }

  @Get()
  findAll(): Promise<MyResponse<Biome[]>> {
    return this.biomeService.findAll();
  }
}
