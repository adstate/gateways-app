import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Sequance {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true, default: 1 })
  next: number;
}

export const SequanceSchema = SchemaFactory.createForClass(Sequance);
