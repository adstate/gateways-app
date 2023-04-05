import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Document } from 'mongoose';
import { Device, DeviceDocument } from './device.schema';

@Schema()
export class Gateway {
  @ApiProperty({ type: 'string' })
  _id?: string;

  @Prop({ required: true, unique: true, type: String })
  @ApiProperty({ type: 'string' })
  serialNumber: string;

  @Prop()
  @ApiProperty({ type: 'string' })
  name: string;

  @Prop()
  @ApiProperty({ type: 'string' })
  ipAddress: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }] })
  @ApiProperty({ type: Device, isArray: true })
  devices: Device[];
}

export type GatewayDocument = HydratedDocument<
  Gateway,
  { devices: DeviceDocument[] }
>;
export const GatewaySchema = SchemaFactory.createForClass(Gateway);
