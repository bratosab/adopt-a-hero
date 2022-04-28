import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Animal, AnimalDocument } from './schemas/animal.schema';
import { Model, Connection } from 'mongoose';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { createModel } from 'mongoose-gridfs';
import { Readable } from 'stream';

@Injectable()
export class AnimalsService {
  private fileModel: any;

  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
  ) {
    this.fileModel = createModel({
      modelName: 'Images',
      connection: connection,
    });
  }

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    const createdCat = new this.animalModel(createAnimalDto);
    return createdCat.save();
  }

  writeFile(file: Express.Multer.File) {
    const options = { filename: file.originalname, contentType: file.mimetype };
    const stream = Readable.from(file.buffer);

    return new Promise((resolve, reject) => {
      this.fileModel.write(options, stream, (error, fileInfo) => {
        if (error) {
          reject(error);
        } else {
          resolve(fileInfo);
        }
      });
    });
  }

  readFile(id: string) {
    return new Promise((resolve, reject) => {
      this.fileModel.findById(id, (error, file) => {
        if (file) {
          if (error) {
            reject(error);
          } else {
            this.fileModel.read(file, (error, content) => {
              if (error) {
                reject(error);
              } else {
                resolve(content);
              }
            });
          }
        }
      });
    });
  }

  async findAll(): Promise<Animal[]> {
    return this.animalModel.find().exec();
  }

  findOne(id: string) {
    return this.animalModel.findById(id);
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    return `This action updates a #${id} animal`;
  }

  remove(id: number) {
    return `This action removes a #${id} animal`;
  }
}
