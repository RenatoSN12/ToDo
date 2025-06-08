import {
  Box,
  Checkbox,
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import type { TodoItem } from "../interfaces/TodoItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "./ConfirmDialog";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { safeDateFromString, stripTime } from "../utils/DateHelpers";
import { format } from "date-fns";

interface GridProps {
  todos: TodoItem[];
  onSelectedItemsChange: Dispatch<SetStateAction<string[]>>;
  onEdit: (todo: TodoItem) => void;
  onDelete: (todoId: string) => void;
}

function Grid({ todos, onSelectedItemsChange, onEdit, onDelete }: GridProps) {
  const [openConfirmDialog, setConfirmDialogOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [todoDeleted, setTodoDeleted] = useState<string>("");

  const onDeleteClicked = (todoId: string) => {
    setTodoDeleted(todoId);
    setConfirmDialogOpen(true);
  };

  useEffect(() => {
    setSelectedIds([]);
  }, [todos]);

  useEffect(() => {
    onSelectedItemsChange(selectedIds);
  }, [selectedIds]);

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        mt: 4,
      }}
    >
      <Paper sx={{ width: { xs: "90%", sm: "80%" }, p: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell align="center">Título</TableCell>
                <TableCell align="center">Data</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((todo) => (
                <TableRow hover key={todo.id}>
                  <TableCell align="center" padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selectedIds.includes(todo.id ?? "")}
                      onChange={() => handleSelect(todo.id ?? "")}
                    />
                  </TableCell>
                  <TableCell align="center">{todo.title}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={format(
                        safeDateFromString(todo.dueDate),
                        "dd/MM/yyyy"
                      )}
                      color={
                        stripTime(safeDateFromString(todo.dueDate)) <
                        stripTime(new Date())
                          ? "error"
                          : "default"
                      }
                      size="small"
                      variant="filled"
                    ></Chip>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={todo.isCompleted ? "Concluída" : "Pendente"}
                      color={todo.isCompleted ? "success" : "default"}
                      size="small"
                      variant="outlined"
                    ></Chip>
                  </TableCell>
                  <TableCell align="center">
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Tooltip title="Editar tarefa">
                        <IconButton
                          color="primary"
                          onClick={() => onEdit(todo)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir tarefa">
                        <IconButton
                          color="error"
                          onClick={() => onDeleteClicked(todo.id ?? "")}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {todos.length == 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Nenhuma tarefa encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ConfirmDialog
        open={openConfirmDialog}
        title="Deletar tarefa"
        message="Deseja realmente deletar a tarefa?"
        onCancel={() => {
          setConfirmDialogOpen(false);
        }}
        onConfirm={() => {
          onDelete(todoDeleted);
          setConfirmDialogOpen(false);
        }}
      />
    </Box>
  );
}

export default Grid;
