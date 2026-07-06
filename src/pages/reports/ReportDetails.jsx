import {
  Box,
  Typography,
  Paper,
} from "@mui/material";

import {
  useParams,
} from "react-router-dom";

function ReportDetails() {

  const { id } =
    useParams();

  return (

    <Box>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Report Details
      </Typography>

      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
        }}
      >

        <Typography>
          Report ID :
          {id}
        </Typography>

      </Paper>

    </Box>

  );

}

export default ReportDetails;