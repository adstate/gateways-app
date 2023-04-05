import { ApiProperty } from '@nestjs/swagger';
import { IsIP, IsNotEmpty } from 'class-validator';

export class CreateGatewayDto {
  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  serialNumber: string;

  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  @IsIP(4)
  ipAddress: string;
}
