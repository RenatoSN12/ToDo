import {
  Box,
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { loginApi } from "../service/AuthService";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { SplitErrors } from "../utils/StringSpliter";
import type { AxiosError } from "axios";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const result = await loginApi(email, password);
      login(result.jwtData.token);
      enqueueSnackbar("Login realizado com sucesso!", { variant: "success" });
      navigate("/home");
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ message: string }>;
      const errors = SplitErrors(axiosErr.response?.data?.message);
      errors.forEach((error) => enqueueSnackbar(error, { variant: "error" }));
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
          p: 6,
          borderRadius: "15px",
          width: { xs: "90%", sm: "400px" },
          boxSizing: "border-box",
        }}
      >
        <Typography
          fontWeight={700}
          variant="h5"
          letterSpacing={1.3}
          align="center"
        >
          Entrar
        </Typography>

        <Box
          component="form"
          mt={2}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Stack spacing={3}>
            <TextField
              label="Email"
              type="email"
              autoComplete="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Senha"
              type="password"
              autoComplete="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Stack>

          <Link href="/register" variant="body2" underline="hover">
            Não possuo uma conta
          </Link>

          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            fullWidth
            sx={{ borderRadius: 2, mt: 2, height: 45 }}
          >
            Entrar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginPage;
