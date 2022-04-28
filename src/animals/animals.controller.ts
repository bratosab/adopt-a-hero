import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Response,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('/animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @UseInterceptors(FileInterceptor('picture'))
  @Post()
  async create(
    @Body() createAnimalDto: CreateAnimalDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileInfo: any = await this.animalsService.writeFile(file);
    createAnimalDto.pictureId = fileInfo._id;
    return this.animalsService.create(createAnimalDto);
  }

  @Get()
  findAll() {
    return this.animalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalsService.findOne(id);
  }

  @Get(':id/picture')
  async findPicture(@Param('id') id: string, @Response() res) {
    const buffer: any = await this.animalsService.readFile(id);
    res.set('Content-Type', 'image/jpeg');
    res.send(buffer);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalsService.update(+id, updateAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalsService.remove(+id);
  }
}
