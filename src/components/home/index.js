import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { dataProducts } from "../../utils/static";

export default function HomeComponent() {
  const navigate = useNavigate();

  const gotoDetail = (id) => {
    navigate("/product/" + id);
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {dataProducts.map((data, i) => (
          <Grid key={i} item xs={3}>
            <Card>
              <CardHeader title={data.name} />
              <CardMedia
                component="img"
                height="200"
                image={data.image}
                alt={data.name}
              />
              <CardContent>
                <Typography variant="subtitle2">{data.desc}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => gotoDetail(data.id)}
                >
                  Detail
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
