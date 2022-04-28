import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnimalDocument = Animal & Document;

@Schema()
export class Animal {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop()
  pictureId: string;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
