import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  ParseUUIDPipe,
  Patch,
  Delete,
} from '@nestjs/common';

import { BiomeService } from '../services';
import { CreateBiomeDto, UpdateBiomeDto } from '../dto';
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
  @Patch(':biome_id')
  update(
    @Param('biome_id', ParseUUIDPipe) biome_id: string,
    @Body() updateBiomeDto: UpdateBiomeDto,
  ): Promise<MyResponse<Biome>> {
    return this.biomeService.update(biome_id, updateBiomeDto);
  }

  @Delete(':biome_id')
  remove(
    @Param('biome_id', ParseUUIDPipe) biome_id: string,
  ): Promise<MyResponse<Record<string, never>>> {
    return this.biomeService.remove(biome_id);
  }
}
