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
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { handleError } from "../utils/ErrorHelpers";

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
      handleError(err);
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
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={1}
          sx={{ marginBottom: 4 }}
        >
          <PersonAddIcon />
          <Typography
            fontWeight={700}
            variant="h5"
            letterSpacing={1.3}
            align="center"
          >
            Registrar
          </Typography>
        </Stack>

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
              required
              value={name}
              slotProps={{
                htmlInput: {maxLength: 120},
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleOutlinedIcon />
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
              required
              value={email}
              slotProps={{
                htmlInput: {maxLength: 80},
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
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
              required
              value={password}
              slotProps={{
                htmlInput: {maxLength: 16},
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyOutlinedIcon />
                    </InputAdornment>
                  ),
                },
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Senha (Confirmação)"
              type="password"
              required
              fullWidth
              value={confirmPassword}
              slotProps={{
                htmlInput: {maxLength: 16},
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyOutlinedIcon />
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
            Registrar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default RegisterPage;
