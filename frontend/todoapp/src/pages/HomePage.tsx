import { useEffect, useState } from "react";
import type { TodoItem } from "../interfaces/TodoItem";
import { Box, Button, Stack, Typography } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import Grid from "../components/Grid";
import {
  completeTodoItem,
  createTodoItem,
  deleteTodoItem,
  getTodoItemsByDate,
  patchTodoItem,
} from "../service/TodoItemService";
import { enqueueSnackbar } from "notistack";
import type { AxiosError } from "axios";
import { SplitErrors } from "../utils/StringSpliter";
import TodoItemDialog from "../components/TodoItemDialog";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ConfirmDialog from "../components/ConfirmDialog";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { format } from "date-fns";
import { safeDateFromString } from "../utils/DateHelpers";

function HomePage() {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);

  const [date, setDate] = useState<Date | null>(new Date());
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const [todoBeingEdited, setTodoBeingEdited] = useState<Partial<TodoItem> | null>(null);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const onDateChanged = (date: Date | null) => {
    setDate(date);
    setSelectedIds([]);
  };

  const handleEdit = (todo: TodoItem) => {
    setTodoBeingEdited({ ...todo });
    setEditDialogOpen(true);
  };

  const handleClose = () => {
    setEditDialogOpen(false);
  };

  const onCreateClicked = () => {
    const newTodo: Partial<TodoItem> = {
      title: "",
      description: "",
    }

    setTodoBeingEdited(newTodo);

    setEditDialogOpen(true);
  };

  useEffect(() => {
    loadTodos();
  }, [date]);

  const loadTodos = async () => {
    try {
      const dateFormatted = format(date ?? new Date(),"yyyy-MM-dd")
      var result = await getTodoItemsByDate(dateFormatted);
      setTodos(result.data ?? []);
    } catch {
      setTodos([]);
    }
  };

  const onCompleteTodoItemsClicked = () => {
    setCompleteDialogOpen(true);
  };

  const handleDelete = async (todoId: string) => {
    try {
      var result = await deleteTodoItem(todoId);

      setTodos((prevTodos) => prevTodos.filter((x) => x.id !== todoId));

      enqueueSnackbar(result.message, { variant: "success" });
    } catch (err: any) {
      const axiosErr = err as AxiosError<{ message: string }>;
      const errors = SplitErrors(axiosErr.response?.data?.message);
      errors.forEach((error) => enqueueSnackbar(error, { variant: "error" }));
    }
  };

  const handleComplete = async (todoIds: string[]) => {
    try {
      if (todoIds.length === 0) return;

      var result = await completeTodoItem(todoIds);

      setTodos((prevTodos) =>
        prevTodos.map((t) => {
          const updated = result.data?.find(
            (updatedTodo) => updatedTodo.id === t.id
          );
          return updated ?? t;
        })
      );

      setCompleteDialogOpen(false);
      enqueueSnackbar("Tarefa concluída com sucesso!", { variant: "success" });
    } catch (err: any) {
      const axiosErr = err as AxiosError<{ message: string }>;
      const errors = SplitErrors(axiosErr.response?.data?.message);
      errors.forEach((error) => enqueueSnackbar(error, { variant: "error" }));
    }
  };

  const handleSubmit = async (todo: Partial<TodoItem>) => {
    try {
      const isEditing = todoBeingEdited?.id != null;
      const acao = isEditing ? "atualizada" : "criada";

      if (isEditing) {
        const result = await patchTodoItem(todo);
        const updatedTodo = result.data;

        setTodos((prevTodos) =>
          prevTodos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
        );
      } else {
        const result = await createTodoItem(todo);
        const newTodo = result.data;
       
        if (!newTodo) return;

        const createdDate = safeDateFromString(newTodo.dueDate ?? "");
        
        if(createdDate === date && result.data !== null){
          setTodos((prevTodos) => [...prevTodos, newTodo]);
        }
      }

      enqueueSnackbar(`Tarefa ${acao} com sucesso!`, { variant: "success" });
      setEditDialogOpen(false);
    } catch (err: any) {
      const axiosErr = err as AxiosError<{ message: string }>;
      const errors = SplitErrors(axiosErr.response?.data?.message);
      errors.forEach((error) => enqueueSnackbar(error, { variant: "error" }));
    }
  };

  return (
    <Box mt={4}>
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
        <Stack direction="row" alignItems="center" spacing={1} mb={{ xs: 4 }}>
          <EventNoteIcon fontSize="large" />
          <Typography variant="h4" fontWeight={{ xs: 400, sm: 500 }}>
            Tarefas do Dia
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 3 }}
          sx={{ marginBottom: { xs: 3 } }}
        >
          <DesktopDatePicker
            sx={{ bgcolor: "#ffffff" }}
            label="Selecionar data"
            value={date}
            onChange={(newValue) => onDateChanged(newValue)}
            slotProps={{ textField: { size: "small" } }}
          />

          <Button
            sx={{
              display: selectedIds.length > 0 ? "flex" : "none",
              textTransform: "none",
              px: 2,
              borderRadius: 2,
            }}
            variant="contained"
            color="success"
            startIcon={<CheckCircleIcon />}
            onClick={onCompleteTodoItemsClicked}
          >
            <Typography>Concluir Tarefas</Typography>
          </Button>

          <Button
            startIcon={<AddCircleIcon/>}
            variant="contained"
            onClick={onCreateClicked}
            sx={{
               textTransform: "none",
               px: 2, borderRadius: 2
            }}
          >
            <Typography>Nova Tarefa</Typography>
          </Button>
        </Stack>
      </Box>

      <Grid
        todos={todos}
        onSelectedItemsChange={setSelectedIds}
        onEdit={handleEdit}
        onDelete={handleDelete}
      ></Grid>

      <ConfirmDialog
        open={completeDialogOpen}
        title="Completar tarefa(s)"
        message="Deseja realmente completar a(s) tarefa(s) selecionada(s)?"
        onCancel={() => setCompleteDialogOpen(false)}
        onConfirm={() => handleComplete(selectedIds)}
      />

      <TodoItemDialog
        open={editDialogOpen}
        onClose={handleClose}
        onExited={() => setTodoBeingEdited(null)}
        handleSubmit={handleSubmit}
        todo={todoBeingEdited}
        setTodo={setTodoBeingEdited}
      />
    </Box>
  );
}

export default HomePage;
