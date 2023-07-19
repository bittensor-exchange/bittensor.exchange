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
import { useRouter } from "next/navigation";
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

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  const { replace } = useRouter();
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordRepeat, setPasswordRepeat] = React.useState("");
  const [passwordMismatch, setPasswordMismatch] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const showModal = (isOpen: boolean) => {
    if (!isOpen) {
      setErrorMessage("");
      setPassword("");
    }
    setModalOpen(isOpen);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!password || !passwordRepeat) return;

    if (password !== passwordRepeat) {
      setPasswordMismatch(true);
      return;
    }
    setLoading(true);
    axios
      .post("/api/auth/reset-password", {
        token: params.token,
        newPassword: data.get("password"),
      })
      .then(() => {
        showModal(true);
        setLoading(false);
        setTimeout(() => {
          showModal(false);
          replace("/login");
        }, 2000);
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        showModal(true);
        setLoading(false);
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
          Reset your password
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Repeat your Password"
                type="password"
                id="passwordRepeat"
                autoComplete="new-password"
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
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
            Reset
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" className="dark:text-white">
                Or remember password now? Sign in
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
            : `We've successfully updated your password.`}
        </Typography>
      </DefaultModal>
      <DefaultModal isOpen={passwordMismatch} showModal={setPasswordMismatch}>
        <Typography component="h6" className="whitespace-pre">
          {errorMessage
            ? errorMessage
            : `Please check your password again!\nPasswords don't match.`}
        </Typography>
      </DefaultModal>
    </Container>
  );
}
