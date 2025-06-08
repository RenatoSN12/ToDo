import { useEffect, useState } from "react";
import type { TodoItem } from "../interfaces/TodoItem";
import {
  Box,
  Button,
  Checkbox,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
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
import TodoItemDialog from "../components/TodoItemDialog";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ConfirmDialog from "../components/ConfirmDialog";
import LogoutIcon from "@mui/icons-material/Logout";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { format } from "date-fns";
import { safeDateFromString, toFullDate } from "../utils/DateHelpers";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { handleError } from "../utils/ErrorHelpers";

function HomePage() {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);

  const [date, setDate] = useState<Date | null>(new Date());
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const [todoBeingEdited, setTodoBeingEdited] =
    useState<Partial<TodoItem> | null>(null);

  const [allItemsCompleted, setAllItemsCompleted] = useState(false);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    setAllItemsCompleted(todos.every((x) => x.isCompleted));
  }, [todos]);

  const onLogoutClicked = () => {
    logout();
    navigate("/register");
  };

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
      dueDate: format(new Date(), "yyyy-MM-dd"),
    };

    setTodoBeingEdited(newTodo);

    setEditDialogOpen(true);
  };

  useEffect(() => {
    loadTodos();
  }, [date]);

  const loadTodos = async () => {
    try {
      const dateFormatted = format(date ?? new Date(), "yyyy-MM-dd");
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
    } catch (err: unknown) {
      handleError(err);
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
    } catch (err: unknown) {
      handleError(err);
    }
  };

  const handleSubmit = async (todo: Partial<TodoItem>) => {
    try {
      const isEditing = todoBeingEdited?.id != null;
      const acao = isEditing ? "atualizada" : "criada";

      if (isEditing) {
        const result = await patchTodoItem(todo);
        const updatedTodo = result.data;

        const updatedDate = safeDateFromString(updatedTodo?.dueDate ?? "");
        if (updatedDate.toLocaleDateString() !== date?.toLocaleDateString()) {
          setTodos((prevTodos) =>
            prevTodos.filter((x) => x.id !== updatedTodo?.id)
          );
          console.log("Passou aqqui 1");
          return;
        }

        console.log("Passou aqui 2");
        setTodos((prevTodos) =>
          prevTodos.map((t) => (t.id === updatedTodo?.id ? updatedTodo : t))
        );
      } else {
        const result = await createTodoItem(todo);
        const newTodo = result.data;

        if (!newTodo) return;

        const createdDate = safeDateFromString(newTodo.dueDate ?? "");

        if (
          createdDate.toLocaleDateString() === date?.toLocaleDateString() &&
          result.data !== null
        ) {
          setTodos((prevTodos) => [...prevTodos, newTodo]);
        }
      }

      enqueueSnackbar(`Tarefa ${acao} com sucesso!`, { variant: "success" });
      setEditDialogOpen(false);
    } catch (err: unknown) {
      handleError(err);
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
        <Stack
          direction="column"
          alignItems="center"
          spacing={1}
          mb={{ xs: 4 }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <EventNoteIcon fontSize="large" />
            <Typography variant="h4" fontWeight={{ xs: 400, sm: 500 }}>
              Tarefas do Dia
            </Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography>{toFullDate(date)}</Typography>
            <Tooltip title="Todas as tarefas do dia estão concluídas">
              <Checkbox readOnly checked={allItemsCompleted} />
            </Tooltip>
          </Stack>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 2, md: 3 }}
          sx={{ marginBottom: { xs: 3 } }}
        >
          <DesktopDatePicker
            sx={{ bgcolor: "#FFFFFF" }}
            label="Selecionar data"
            value={date}
            onChange={(newValue) => {
              if (newValue instanceof Date && !isNaN(newValue.getTime())) {
                onDateChanged(newValue);
              }
            }}
            slotProps={{ textField: { size: "small", variant: "outlined" } }}
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
            Concluir Tarefas
          </Button>

          <Button
            startIcon={<AddCircleIcon />}
            variant="contained"
            onClick={onCreateClicked}
            sx={{
              textTransform: "none",
              px: 2,
              borderRadius: 2,
            }}
          >
            Nova Tarefa
          </Button>
          <Button
            startIcon={<LogoutIcon />}
            variant="outlined"
            color="error"
            onClick={onLogoutClicked}
            sx={{
              textTransform: "none",
              px: 2,
              borderRadius: 2,
            }}
          >
            Sair
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
