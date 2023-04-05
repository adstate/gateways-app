import { Button, Paper, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createGateway, fetchGateway, updateGateway } from "../asyncActions";
import styles from "./GatewayDetails.module.scss";
import GatewaySkeleton from "./GatewaySkeleton";
import { useForm } from "react-hook-form";
import { CreateGatewayDto } from "../models";
import FormTextField from "common/FormTextField";
import { clearOpenedGateway } from "../gatewaySlice";
import GatewayDevices from "./GatewayDevices";
import FormIpAddressField from "common/FormIpAddressField";

const gatewaySchema = yup.object({
  serialNumber: yup.string().default("").required("Field is required"),
  name: yup.string().default("").required("Field is required"),
  ipAddress: yup.string().default("").required("Field is required"),
});

const defaultValues: CreateGatewayDto = {
  serialNumber: "",
  name: "",
  ipAddress: "",
};

const GatewayDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id: gatewayId } = useParams();
  const createMode = gatewayId === "add";

  const dispatch = useAppDispatch();
  const { openedGateway, loading } = useAppSelector((s) => s.gateways);
  const [formLoading, setFormLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm<any>({
    resolver: yupResolver(gatewaySchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    return () => {
      dispatch(clearOpenedGateway());
    };
  }, []);

  useEffect(() => {
    reset(openedGateway);
    setFormLoading(false);
  }, [openedGateway]);

  useEffect(() => {
    if (!createMode && gatewayId) {
      dispatch(fetchGateway(gatewayId))
        .unwrap()
        .catch(() => {
          navigate("/gateways/add");
        });
    }
  }, [gatewayId]);

  const onSubmit = (data: CreateGatewayDto) => {
    if (createMode) {
      dispatch(createGateway(data))
        .unwrap()
        .then((g) => {
          navigate(`/gateways/${g._id}`);
        })
        .catch(() => {});
    } else {
      if (gatewayId) {
        dispatch(updateGateway({ id: gatewayId, createGatewayDto: data }));
      }
    }
  };

  if (loading || formLoading) {
    return <GatewaySkeleton />;
  }

  return (
    <>
      <Typography variant="h4" mb={2} component="h1">
        {createMode ? "Add gateway" : openedGateway?.name}
      </Typography>
      <Paper className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FormTextField
              name="serialNumber"
              label="Serial Number"
              control={control}
            />

            <FormTextField name="name" label="Name" control={control} />

            <FormIpAddressField
              name="ipAddress"
              label="IP Adress"
              control={control}
            />

            <Stack
              direction="row"
              sx={{ pt: 2 }}
              spacing={2}
              justifyContent="flex-end"
            >
              <Button to="/" component={Link}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                {createMode ? "Create" : "Update"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>

      {openedGateway && <GatewayDevices gateway={openedGateway} />}
    </>
  );
};

export default GatewayDetails;
