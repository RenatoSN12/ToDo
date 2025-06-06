import { useState } from "react";
import Grid from "../components/grid";
import type { TodoItem } from "../interfaces/TodoItem";
import { Box, Button, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

function HomePage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [date, setDate] = useState<Date | null>(new Date());

  const handleSubmit = (todo: Partial<TodoItem>) => {
    console.log("Nova Tarefa:", todo);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-around",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: { xs: 200, sm: 700 } }}
          gutterBottom
        >
          Tarefas do Dia
        </Typography>

        <DatePicker
          label="Selecionar data"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          slotProps={{ textField: { size: "small" } }}
        />

        <Button variant="contained" onClick={() => setDialogOpen(true)}>
          Nova Tarefa
        </Button>
      </Box>
      <Grid></Grid>
    </Box>
  );
}

export default HomePage;
