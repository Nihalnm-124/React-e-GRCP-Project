import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Divider,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";

const documents = [
  {
    document: "ISO 27001 Certificate",
    owner: "ABC Vendor",
    status: "Missing",
  },
  {
    document: "GST Registration",
    owner: "XYZ Pvt Ltd",
    status: "Pending",
  },
  {
    document: "NDA Agreement",
    owner: "Global Tech",
    status: "Missing",
  },
  {
    document: "Security Assessment",
    owner: "Secure Corp",
    status: "Pending",
  },
];

function getColor(status) {
  switch (status) {
    case "Missing":
      return "error";

    case "Pending":
      return "warning";

    default:
      return "success";
  }
}

function MissingDocuments() {
  return (
    <Card
      elevation={0}
      sx={{
        height: 420,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>

        <Typography
          variant="h6"
          fontWeight={700}
          mb={3}
        >
          Missing Documents
        </Typography>

        <List sx={{ p: 0 }}>

          {documents.map(
            (item, index) => (
              <div key={index}>

                <ListItem sx={{ px: 0 }}>

                  <ListItemAvatar>

                    <Avatar
                      sx={{
                        bgcolor:
                          "warning.main",
                      }}
                    >
                      <DescriptionIcon />
                    </Avatar>

                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      item.document
                    }
                    secondary={
                      item.owner
                    }
                  />

                  <Chip
                    size="small"
                    label={item.status}
                    color={getColor(
                      item.status
                    )}
                  />

                </ListItem>

                {index !==
                  documents.length - 1 && (
                  <Divider />
                )}

              </div>
            )
          )}

        </List>

      </CardContent>
    </Card>
  );
}

export default MissingDocuments;