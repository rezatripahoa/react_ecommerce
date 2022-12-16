import {
  Card,
  Grid,
  Container,
  Typography,
  Stack,
  Button,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";

import { currencyFormat } from "../../utils/functions";

export default function CartComponent() {
  const navigate = useNavigate();
  const [dataCart, setDataCarts] = useState([]);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      setDataCarts(cart);
    }
  };

  const gotoCheckout = () => {
    navigate("/checkout");
  };

  const updateCart = (id, type) => {
    let cart = dataCart;
    for (var i in cart) {
      if (cart[i].id == id) {
        let newQty = cart[i].qty;
        if (type == "min") {
          newQty--;
        } else {
          newQty++;
        }

        if (newQty < 0) {
          newQty = 0;
        }
        cart[i].qty = newQty;
        console.log("cart[]", cart);
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    getCart();
    alert("Cart berhasil di update");
  };

  return (
    <Container sx={{ mt: 2 }}>
      {dataCart.map((val, i) => (
        <Card key={i} elevation={2} sx={{ my: 1 }}>
          <Grid container>
            <Grid
              item
              xs={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Checkbox name="is_checkout" value={val.id} />
            </Grid>
            <Grid item xs={2}>
              <img
                src={val.image}
                srcSet={val.image}
                alt={val.name}
                loading="lazy"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={7} sx={{ p: 1 }}>
              <Typography variant="h5">{val.name}</Typography>
              <Typography variant="h6" fontWeight={"bold"} sx={{ mt: 3 }}>
                {currencyFormat(val.price)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: 1,
              }}
            >
              <Stack direction={"row"} alignItems="center">
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => updateCart(val.id, "min")}
                >
                  <RemoveIcon />
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
                  {val.qty}
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => updateCart(val.id, "plus")}
                >
                  <AddIcon />
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      ))}

      <Stack direaction="row" alignItems={"flex-end"} sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="error"
          sx={{ width: 100 }}
          onClick={gotoCheckout}
        >
          Checkout
        </Button>
      </Stack>
    </Container>
  );
}
