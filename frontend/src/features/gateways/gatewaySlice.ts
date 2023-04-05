import { AlertColor, AlertProps } from "@mui/material/Alert";
import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import {
  addDeviceToGateway,
  createGateway,
  fetchAllGateways,
  fetchGateway,
  removeDeviceFromGateway,
  updateGateway,
} from "./asyncActions";
import { Gateway } from "./models";
import { Notification } from "common/Notification";

export interface GatewayState {
  loading: boolean | null;
  items: Gateway[];
  openedGateway: Gateway | null;
  notification: Notification | null;
}

const initialState: GatewayState = {
  loading: null,
  items: [],
  openedGateway: null,
  notification: null,
};

function isRejectedAction(action: AnyAction) {
  return action.type.startsWith("gateway/") && action.type.endsWith("rejected");
}

export const gatewaySlice = createSlice({
  name: "gateway",
  initialState,

  reducers: {
    clearOpenedGateway(state) {
      state.openedGateway = null;
    },
    clearNotification(state) {
      state.notification = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGateways.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllGateways.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });

    builder
      .addCase(fetchGateway.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchGateway.fulfilled, (state, action) => {
        state.loading = false;
        state.openedGateway = action.payload;
      });

    builder
      .addCase(createGateway.pending, (state, action) => {})
      .addCase(createGateway.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.openedGateway = action.payload;

        state.notification = {
          severity: "success" as AlertColor,
          message: "Gateway was created",
        };
      });

    builder
      .addCase(updateGateway.pending, (state, action) => {})
      .addCase(updateGateway.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );

        if (index > -1) {
          state.items[index] = action.payload;
          state.openedGateway = state.items[index];
        }

        state.notification = {
          severity: "success" as AlertColor,
          message: "Gateway was updated",
        };
      });

    builder
      .addCase(addDeviceToGateway.pending, (state, action) => {})
      .addCase(addDeviceToGateway.fulfilled, (state, action) => {
        const gateway = state.items.find(
          (item) => item._id === action.payload._id
        );

        if (gateway) {
          gateway.devices = action.payload.devices;
          state.openedGateway = gateway;
        }

        state.notification = {
          severity: "success" as AlertColor,
          message: "Device was added",
        };
      });

    builder
      .addCase(removeDeviceFromGateway.pending, (state, action) => {})
      .addCase(removeDeviceFromGateway.fulfilled, (state, action) => {
        const gateway = state.items.find(
          (item) => item._id === action.payload._id
        );

        if (gateway) {
          gateway.devices = action.payload.devices;
          state.openedGateway = gateway;
        }

        state.notification = {
          severity: "success" as AlertColor,
          message: "Device was removed",
        };
      });

    builder.addMatcher(isRejectedAction, (state, action) => {
      state.loading = false;
      state.notification = {
        severity: "error" as AlertColor,
        message: action.payload.message,
      };
    });
  },
});

export const { clearOpenedGateway, clearNotification } = gatewaySlice.actions;

export default gatewaySlice.reducer;
