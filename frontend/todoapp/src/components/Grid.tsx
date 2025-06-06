import {
  Box,
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { getTodoItemsByDate } from "../service/TodoItemService";
import type { TodoItem } from "../interfaces/TodoItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import NewTodoItemDialog from "./NewTodoItemDialog";

function Grid() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);
  


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
        const result = await getTodoItemsByDate(formattedDate);
        console.log(result);
        setTodos(result.data || []);
      } catch (err: any) {
        setTodos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [date]);

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
      <Paper sx={{ width: "80%", p: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox color="primary" />
                </TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((todo) => (
                <TableRow key={todo.title}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell>{todo.title}</TableCell>
                  <TableCell>{todo.dueDate}</TableCell>
                  <TableCell>
                    {todo.isCompleted ? "Concluída" : "Pendente"}
                  </TableCell>
                </TableRow>
              ))}
              {todos.length == 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Nenhuma tarefa encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <NewTodoItemDialog open={dialogOpen} onClose={()=>setDialogOpen(false)} handleSubmit={handleSubmit}/>
    </Box>
  );
}

export default Grid;
