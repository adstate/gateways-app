import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Toolbar,
  IconButton,
  Skeleton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllGateways } from "../asyncActions";
import styles from "./GatewayList.module.scss";
import Typography from "@mui/material/Typography";

const GatewayList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: gateways, loading } = useAppSelector((s) => s.gateways);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllGateways());
  }, []);

  const openGatewayDetails: React.MouseEventHandler<HTMLTableRowElement> =
    useCallback((e) => {
      const rowElement = e.currentTarget;
      const gatewayId = rowElement.dataset.id;

      navigate(`/gateways/${gatewayId}`);
    }, []);

  return (
    <>
      <Toolbar sx={{ paddingLeft: 0, alignItems: "center", gap: "8px" }}>
        <Typography variant="h4" component="h1">
          Gateways
        </Typography>
        <IconButton
          to="/gateways/add"
          component={Link}
          aria-label="add gateway"
          title="Add gateway"
        >
          <AddIcon />
        </IconButton>
      </Toolbar>
      <TableContainer
        className={styles.container}
        sx={{ width: "100%" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650, width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Serial Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>Device amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gateways.map((gateway) => (
              <TableRow
                key={gateway._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                data-id={gateway._id}
                onClick={openGatewayDetails}
              >
                <TableCell component="th" scope="row">
                  {gateway.serialNumber}
                </TableCell>
                <TableCell>{gateway.name}</TableCell>
                <TableCell>{gateway.ipAddress}</TableCell>
                <TableCell>{gateway.devices.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GatewayList;
