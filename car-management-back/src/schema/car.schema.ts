import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarDocument = Car & Document;

@Schema()
export class Car {
  @Prop()
  Model: string;

  @Prop()
  Brand: string;

  @Prop()
  MainColor: string;

  @Prop()
  Value: number;

  @Prop()
  ProductionCost: number;

  @Prop()
  TransportationCost: number;

  @Prop()
  Total: number;
}

export const CarSchema = SchemaFactory.createForClass(Car);
