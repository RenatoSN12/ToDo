import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { login } from "../service/AuthService";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { SplitErrors } from "../utils/StringSpliter";
import type { AxiosError } from "axios";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const result = await login(email, password);
      localStorage.setItem("token", result.jwtData.token);
      enqueueSnackbar("Login realizado com sucesso!", {variant: "success"})
      navigate("/home")
    } catch(err : unknown) {
      const axiosErr = err as AxiosError<{ message: string }>;
      const errors = SplitErrors(axiosErr.response?.data?.message);
      errors.forEach(error => enqueueSnackbar(error, { variant: "error" }));
    }
  };

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
          Entrar
        </Typography>

        <Box
          component="form"
          mt={2}
          display="flex"
          flexDirection="column"
          gap={2}
        >
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

          <Link href="/register" underline="hover">
            Não possuo uma conta
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

export default LoginPage;
