import axios from "app/api-service";
import { CreateDeviceDto, CreateGatewayDto, Device, Gateway } from "./models";

export async function getGateways() {
  return axios.get<Gateway[]>("/gateways");
}

export async function addGateway(createGatewayDto: CreateGatewayDto) {
  return axios.post<Gateway>("/gateways", createGatewayDto);
}

export async function getGateway(id: string) {
  return axios.get<Gateway>(`/gateways/${id}`);
}

export async function patchGateway(
  id: string,
  createGatewayDto: CreateGatewayDto
) {
  return axios.patch<Gateway>(`/gateways/${id}`, createGatewayDto);
}

export async function addDevice(
  gatewayId: string,
  createDeviceDto: CreateDeviceDto
) {
  return axios.post<Gateway>(`/gateways/${gatewayId}/devices`, createDeviceDto);
}

export async function removeDevice(gatewayId: string, deviceId: string) {
  return axios.delete<Gateway>(`/gateways/${gatewayId}/devices/${deviceId}`);
}
