import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewaysController } from './gateways.controller';
import { Gateway, GatewaySchema } from './schema/gateway.schema';
import { GatewaysService } from './gateways.service';
import { Device, DeviceSchema } from './schema/device.schema';
import { Sequance, SequanceSchema } from './schema/seq.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gateway.name, schema: GatewaySchema }]),
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
    MongooseModule.forFeature([
      { name: Sequance.name, schema: SequanceSchema },
    ]),
  ],
  controllers: [GatewaysController],
  providers: [GatewaysService],
})
export class GatewaysModule {}
