import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import { register } from "../service/AuthService";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { SplitErrors } from "../utils/StringSpliter";
import type { AxiosError } from "axios";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password != confirmPassword) {
      enqueueSnackbar("As senhas informadas não coincidem.", {
        variant: "error",
      });
      return;
    }
    try {
      await register(name, email, password);
      enqueueSnackbar("Usuário cadastrado com sucesso!", {
        variant: "success",
      });
      navigate("/login");
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ message: string }>;
      const errors = SplitErrors(axiosErr.response?.data?.message);
      errors.forEach((msg) => enqueueSnackbar(msg, { variant: "error" }));
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          width: { xs: "90%", sm: "400px" },
          boxSizing: "border-box",
        }}
      >
        <Typography fontWeight={700} variant="h4" align="center">
          Registrar
        </Typography>

        <Box
          component="form"
          mt={2}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Nome"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Senha (Confirmação)"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Link href="/login" underline="hover">
            Já possuo uma conta
          </Link>

          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            fullWidth
          >
            Entrar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default RegisterPage;
