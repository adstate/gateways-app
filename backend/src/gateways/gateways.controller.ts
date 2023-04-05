import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ApiFoundResponse, ApiResponse } from '@nestjs/swagger/dist';
import { CreateDeviceDto } from './dto/create-device.dto';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { GatewaysService } from './gateways.service';
import { Gateway } from './schema/gateway.schema';

@ApiTags('gateways')
@Controller('api/gateways')
export class GatewaysController {
  constructor(private readonly gatewaysService: GatewaysService) {}

  @Get('/')
  @ApiResponse({
    type: Gateway,
    isArray: true,
  })
  getGateways(): Promise<Gateway[]> {
    return this.gatewaysService.findAll();
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: Gateway,
  })
  addGateway(@Body() createGatewayDto: CreateGatewayDto): Promise<Gateway> {
    return this.gatewaysService.create(createGatewayDto);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: Gateway,
  })
  updateGateway(
    @Param('id') id: string,
    @Body() createGatewayDto: CreateGatewayDto,
  ): Promise<Gateway> {
    return this.gatewaysService.update(id, createGatewayDto);
  }

  @Get('/:id')
  @ApiFoundResponse({
    type: Gateway,
  })
  getGateway(@Param('id') id: string): Promise<Gateway> {
    return this.gatewaysService.findById(id);
  }

  @Post('/:id/devices')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    type: Gateway,
  })
  addDevice(
    @Param('id') id: string,
    @Body() createDeviceDto: CreateDeviceDto,
  ): Promise<Gateway> {
    return this.gatewaysService.addDevice(id, createDeviceDto);
  }

  @Delete('/:id/devices/:deviceId')
  @ApiResponse({
    type: Gateway,
  })
  deleteDevice(
    @Param('id') gatewayId: string,
    @Param('deviceId') deviceId: string,
  ): Promise<Gateway> {
    return this.gatewaysService.removeDevice(gatewayId, deviceId);
  }
}
