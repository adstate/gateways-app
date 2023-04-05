import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export enum DeviceStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

@Schema()
export class Device {
  @ApiProperty({ type: 'string' })
  _id?: string;

  @Prop()
  @ApiProperty({ type: 'string' })
  uid: string;

  @Prop()
  @ApiProperty({ type: 'string' })
  vendor: string;

  @Prop()
  @ApiProperty({ type: 'string' })
  created: string;

  @Prop()
  @ApiProperty()
  status: DeviceStatus;
}

export type DeviceDocument = HydratedDocument<Device>;
export const DeviceSchema = SchemaFactory.createForClass(Device);
