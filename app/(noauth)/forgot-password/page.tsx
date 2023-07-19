"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Image from "next/image";
import { Modal } from "@mui/material";
import DefaultModal from "@/components/modals";
import axios from "axios";
import { LoadingButton } from "@mui/lab";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link className="text-buy" href="/">
        tensor.exchange
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function ForgotPasswordPage() {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const showModal = (isOpen: boolean) => {
    if (!isOpen) {
      setErrorMessage("");
    }
    setModalOpen(isOpen);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    axios
      .post("/api/auth/forgot-password", { email: data.get("email") })
      .then(() => {
        showModal(true);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.data.message) {
          setErrorMessage(error.response.data.message.join("\n"));
          showModal(true);
          setLoading(false);
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link href="/">
          <Avatar sx={{ m: 1, bgcolor: "transparent" }}>
            <Image
              className="mx-2"
              src="/logo.png"
              alt="Tensor Exchange Logo"
              width={40}
              height={40}
              priority
              quality={100}
            />
          </Avatar>
        </Link>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: 400 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
          </Grid>
          <LoadingButton
            fullWidth
            loading={loading}
            variant="contained"
            sx={{ mt: 3, mb: 2, color: "white" }}
            color="success"
            type="submit"
          >
            Email me a recovery link
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" className="dark:text-white">
                Back to Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
      <DefaultModal isOpen={isModalOpen} showModal={showModal}>
        <Typography component="h6" className="whitespace-pre">
          {errorMessage
            ? errorMessage
            : `Thank you for tensor.Exchange!\nTo reset your password, please click on the link\nin the email just sent to you.`}
        </Typography>
      </DefaultModal>
    </Container>
  );
}
