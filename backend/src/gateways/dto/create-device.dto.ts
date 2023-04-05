import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, Matches } from 'class-validator';
import { DeviceStatus } from '../schema/device.schema';

export class CreateDeviceDto {
  @IsNotEmpty()
  @Matches(/^[0-9]*$/)
  @ApiProperty({ type: 'string' })
  uid: string;

  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  vendor: string;

  @IsNotEmpty()
  @IsIn([DeviceStatus.ONLINE, DeviceStatus.OFFLINE])
  @ApiProperty({ type: 'string' })
  status: DeviceStatus;
}
