import { Skeleton } from "@mui/material";

const GatewaySkeleton: React.FC = () => {
  return (
    <>
      <Skeleton variant="rectangular" sx={{ mb: 2 }} width={200} height={40} />

      <Skeleton
        variant="rectangular"
        sx={{ mb: 2 }}
        width={"100%"}
        height={40}
      />

      <Skeleton
        variant="rectangular"
        sx={{ mb: 2 }}
        width={"100%"}
        height={40}
      />

      <Skeleton
        variant="rectangular"
        sx={{ mb: 2 }}
        width={"90%"}
        height={40}
      />
    </>
  );
};

export default GatewaySkeleton;
