import {
  Box,
  Button,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { register } from "../service/AuthService";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { SplitErrors } from "../utils/StringSpliter";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
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
          Registrar
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
              label="Nome"
              type="text"
              autoComplete="name"
              fullWidth
              value={name}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleOutlinedIcon/>
                    </InputAdornment>
                  ),
                },
              }}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              autoComplete="email"
              fullWidth
              value={email}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon/>
                    </InputAdornment>
                  ),
                },
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Senha"
              type="password"
              autoComplete="new-password"
              fullWidth
              value={password}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyOutlinedIcon/>
                    </InputAdornment>
                  ),
                },
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Senha (Confirmação)"
              type="password"
              fullWidth
              value={confirmPassword}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyOutlinedIcon/>
                    </InputAdornment>
                  ),
                },
              }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Stack>

          <Link href="/login" variant="body2" underline="hover">
            Já possuo uma conta
          </Link>

          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            fullWidth
            sx={{ borderRadius: 2, mt: 2, height: 45 }}
          >
            Registar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default RegisterPage;
