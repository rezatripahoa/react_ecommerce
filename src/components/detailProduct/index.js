import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { dataProducts } from "../../utils/static";
import { currencyFormat } from "../../utils/functions";

export default function DetailProductComponent() {
  const params = useParams();
  const [qty, setQty] = useState(0);

  const dataDetail = dataProducts.filter(
    (val) => val.id === parseInt(params.id)
  );

  useEffect(() => {
    updateState();
  }, []);

  const updateState = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      let newCart = cart.filter((val) => val.id == dataDetail[0].id);
      if (newCart.length > 0) {
        setQty(newCart[0].qty);
      }
    }
  };

  const qtyChange = (type) => {
    let newQty = qty;
    if (type === "min") {
      newQty--;
    } else {
      newQty++;
    }

    if (newQty < 0) {
      newQty = 0;
    }

    setQty(newQty);
  };

  const updateCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let newDataDetail = {};
    if (!cart) {
      cart = [];
      newDataDetail = dataDetail[0];
    } else {
      let newCart = cart.filter((val) => val.id == dataDetail[0].id);
      if (newCart.length > 0) {
        newDataDetail = newCart[0];
      } else {
        newDataDetail = dataDetail[0];
      }
    }
    newDataDetail.qty = qty;
    let allCart = cart.filter((val) => val.id != dataDetail[0].id);
    allCart.push(newDataDetail);

    localStorage.setItem("cart", JSON.stringify(allCart));
    alert("Berhasil ditambahkan ke Cart");
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <img
            src={dataDetail[0].image}
            srcSet={dataDetail[0].image}
            alt={dataDetail[0].name}
            loading="lazy"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader title={dataDetail[0].name} />
            <CardContent>
              <Typography variant="subtitle2">{dataDetail[0].desc}</Typography>
              <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
                {currencyFormat(dataDetail[0].price)}
              </Typography>
              <Stack direction={"row"} alignItems="center" sx={{ mt: 3 }}>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => qtyChange("min")}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Typography
                  sx={{
                    borderBottom: 1,
                    width: 50,
                    mx: 1,
                    textAlign: "center",
                    fontSize: 20,
                  }}
                  variant="subtitle2"
                >
                  {qty}
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => qtyChange("plus")}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button variant="contained" color="error" onClick={updateCart}>
                + Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
