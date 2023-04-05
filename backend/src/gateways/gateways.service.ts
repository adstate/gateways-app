import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeviceDto } from './dto/create-device.dto';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { Device } from './schema/device.schema';
import { Gateway, GatewayDocument } from './schema/gateway.schema';
import { Sequance } from './schema/seq.schema';

@Injectable()
export class GatewaysService {
  constructor(
    @InjectModel(Gateway.name) private gatewayModel: Model<Gateway>,
    @InjectModel(Device.name) private deviceModel: Model<Device>,
    @InjectModel(Sequance.name) private seqModel: Model<Sequance>,
  ) {}

  async create(createGatewayDto: CreateGatewayDto): Promise<Gateway> {
    const createdGateway = new this.gatewayModel(createGatewayDto);

    try {
      const savedGateway = await createdGateway.save();
      return savedGateway;
    } catch (e) {
      if (e.code === 11000) {
        throw new BadRequestException('Provided serial number is not uniq');
      }

      throw new InternalServerErrorException();
    }
  }

  async findById(id: string): Promise<GatewayDocument> {
    try {
      const gateway: GatewayDocument = await this.gatewayModel
        .findById(id)
        .populate('devices');

      if (!gateway) {
        throw new NotFoundException('Gateway not found');
      }

      return gateway;
    } catch (e) {
      throw new NotFoundException('Gateway not found');
    }
  }

  async update(
    id: string,
    createGatewayDto: CreateGatewayDto,
  ): Promise<Gateway> {
    const gateway = await this.findById(id);

    try {
      gateway.serialNumber = createGatewayDto.serialNumber;
      gateway.name = createGatewayDto.name;
      gateway.ipAddress = createGatewayDto.ipAddress;
      gateway.serialNumber = createGatewayDto.serialNumber;

      return gateway.save();
    } catch (e) {
      if (e.code === 11000) {
        throw new BadRequestException('Provided serial number is not uniq');
      }

      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Gateway[]> {
    return this.gatewayModel.find().populate('devices').exec();
  }

  async getNextUID(): Promise<number> {
    const seq = await this.seqModel.findByIdAndUpdate(
      'uid',
      { $inc: { next: 1 } },
      { new: true, upsert: true },
    );

    return seq.next;
  }

  async addDevice(
    gatewayId: string,
    createDeviceDto: CreateDeviceDto,
  ): Promise<Gateway> {
    const gateway = await this.findById(gatewayId);

    if (gateway.devices.length >= 10) {
      throw new BadRequestException(
        'Gateway can not contain more than 10 devices',
      );
    }

    if (gateway.devices.some((d) => d.uid === createDeviceDto.uid)) {
      throw new BadRequestException(
        `Divice with uid=${createDeviceDto.uid} already added to gateway`,
      );
    }

    const device = new this.deviceModel(createDeviceDto);
    device.created = new Date().toISOString();

    device.save();
    gateway.devices.push(device);

    return gateway.save();
  }

  async removeDevice(gatewayId: string, deviceId: string): Promise<Gateway> {
    const gateway = await this.findById(gatewayId);

    const findDeviceInGateway = gateway.devices.find(
      (d) => d._id.toString() === deviceId,
    );

    if (!findDeviceInGateway) {
      throw new BadRequestException(
        `Gateway does not have device id=${deviceId}`,
      );
    }

    const device = await this.deviceModel.findById(deviceId);

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    gateway.devices = gateway.devices.filter(
      (d) => d._id.toString() !== deviceId,
    );

    device.deleteOne();

    return gateway.save();
  }
}
