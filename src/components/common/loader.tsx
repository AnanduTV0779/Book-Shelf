import * as React from "react";

import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

interface ILoader {}

const Loader: React.FunctionComponent<ILoader> = (props) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: "200px" }}>
      <CircularProgress  sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        thickness={4}
        color="secondary" />
    </Box>
  );
};

export default Loader;
