import { IAnimal } from '../../models/animal.interface';

export class CreateAnimalDto implements IAnimal {
  constructor(
    public name: string,
    public age: number,
    public breed: string,
    public picture: Buffer,
    public pictureId: string,
  ) {}
}
