import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { AxiosError } from "axios";
import {
  addDevice,
  addGateway,
  getGateway,
  getGateways,
  patchGateway,
  removeDevice,
} from "./gatewayService";
import { GatewayState } from "./gatewaySlice";
import { CreateDeviceDto, CreateGatewayDto, Gateway } from "./models";

interface UpdateGatewayPayload {
  id: string;
  createGatewayDto: CreateGatewayDto;
}

interface AddDevicePayload {
  id: string;
  device: CreateDeviceDto;
}

interface RemoveDevicePayload {
  id: string;
  deviceId: string;
}

export const fetchAllGateways = createAsyncThunk(
  "gateway/fetchAllGateways",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getGateways();

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const fetchGateway = createAsyncThunk(
  "gateway/fetchGateway",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const { gateways } = getState() as RootState;
      const gateway = gateways.items.find((g) => g._id === id);

      if (gateway) {
        return gateway;
      }

      const response = await getGateway(id);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const updateGateway = createAsyncThunk(
  "gateway/updateGateway",
  async (payload: UpdateGatewayPayload, { rejectWithValue }) => {
    try {
      const response = await patchGateway(payload.id, payload.createGatewayDto);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const createGateway = createAsyncThunk(
  "gateway/createGateway",
  async (createGatewayDto: CreateGatewayDto, { rejectWithValue }) => {
    try {
      const response = await addGateway(createGatewayDto);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const addDeviceToGateway = createAsyncThunk(
  "gateway/addDevice",
  async (payload: AddDevicePayload, { rejectWithValue }) => {
    try {
      const response = await addDevice(payload.id, payload.device);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const removeDeviceFromGateway = createAsyncThunk(
  "gateway/removeDevice",
  async (payload: RemoveDevicePayload, { rejectWithValue }) => {
    try {
      const response = await removeDevice(payload.id, payload.deviceId);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);
