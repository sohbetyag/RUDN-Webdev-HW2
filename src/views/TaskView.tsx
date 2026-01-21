import { useParams, useNavigate } from "react-router-dom";
import { Container, Paper, Typography, Box, Button, Alert, CircularProgress } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useTaskById, useTaskQuery } from "../utils/useTaskQuery";
import type { TaskModel, StatusType } from "../models/task.model";
import { STATUS_TEXT } from "../models/task.model";

export const TaskView = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const taskItem = useTaskById(Number(params.id));
  const { data: allTasksData } = useTaskQuery();
  const taskId = Number(params.id);
  const taskId2 = Number(params.id);

  if (taskItem === null || taskItem === undefined) {
    return (
      <Container sx={{ marginTop: "40px" }}>
        <Alert severity="error" sx={{ background: "#2d2d2d", color: "#ff6b6b", fontWeight: 600, borderRadius: "8px", border: "1px solid #8b6914" }}>
          Задача не найдена
        </Alert>
      </Container>
    );
  }

  const updateStatus = (newStatus: StatusType) => {
    const allTasks = queryClient.getQueryData<TaskModel[]>(["workItems"]);
    if (allTasks === null || allTasks === undefined) {
      return;
    }
    const updatedTasks = allTasks.map((item) => {
      if (item.number === taskItem.number) {
        return { ...item, state: newStatus };
      } else {
        return item;
      }
    });
    queryClient.setQueryData(["workItems"], updatedTasks);
  };

  const removeTask = () => {
    const allTasks = queryClient.getQueryData<TaskModel[]>(["workItems"]);
    if (allTasks === null || allTasks === undefined) {
      return;
    }
    const updatedTasks = allTasks.filter((item) => {
      if (item.number !== taskItem.number) {
        return true;
      } else {
        return false;
      }
    });
    queryClient.setQueryData(["workItems"], updatedTasks);
    navigate("/board");
  };

  const dateValue = new Date(taskItem.createdDate);
  const dateFormatted = dateValue.toLocaleString("ru-RU");
  const allStatusValues: StatusType[] = [0, 1, 2];
  const otherStatusValues = allStatusValues.filter((s) => {
    if (s !== taskItem.state) {
      return true;
    } else {
      return false;
    }
  });

  const getButtonStyle = (status: StatusType) => {
    if (status === 0) {
      return { bg: "#8b6914", hover: "#6b4f0f" };
    }
    if (status === 1) {
      return { bg: "#d4af37", hover: "#b8941f" };
    }
    return { bg: "#b8941f", hover: "#8b6914" };
  };

  const getButtonStyle2 = (status: StatusType) => {
    if (status === 0) {
      return { bg: "#8b6914", hover: "#6b4f0f" };
    }
    if (status === 1) {
      return { bg: "#d4af37", hover: "#b8941f" };
    }
    if (status === 2) {
      return { bg: "#b8941f", hover: "#8b6914" };
    }
    return { bg: "#b8941f", hover: "#8b6914" };
  };

  return (
    <Container sx={{ marginTop: "40px", marginBottom: "40px" }}>
      <Paper sx={{ padding: "40px", maxWidth: "800px", margin: "0 auto", background: "#2d2d2d", borderRadius: "12px", boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)", border: "2px solid #3d3d3d" }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#d4af37", fontWeight: 700, marginBottom: "32px", letterSpacing: "0.5px" }}>
          Задача №{taskItem.number}
        </Typography>
        <Box sx={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <Box>
            <Typography variant="subtitle2" sx={{ color: "#b0b0b0", marginBottom: "8px", fontWeight: 600 }}>
              Название
            </Typography>
            <Typography variant="body1" sx={{ color: "#e0e0e0", fontSize: "16px" }}>
              {taskItem.name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ color: "#b0b0b0", marginBottom: "8px", fontWeight: 600 }}>
              Описание
            </Typography>
            <Typography variant="body1" sx={{ color: "#e0e0e0", fontSize: "16px" }}>
              {taskItem.description || "Описание отсутствует"}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ color: "#b0b0b0", marginBottom: "8px", fontWeight: 600 }}>
              Дата создания
            </Typography>
            <Typography variant="body1" sx={{ color: "#e0e0e0", fontSize: "16px" }}>
              {dateFormatted}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ color: "#b0b0b0", marginBottom: "8px", fontWeight: 600 }}>
              Статус
            </Typography>
            <Typography variant="body1" sx={{ color: "#d4af37", fontSize: "16px", fontWeight: 600 }}>
              {STATUS_TEXT[taskItem.state]}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#d4af37", letterSpacing: "0.5px" }}>
            Изменить статус
          </Typography>
          <Box sx={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {otherStatusValues.map((statusValue) => {
              const styleObj = getButtonStyle(statusValue);
              return (
                <Button
                  key={statusValue}
                  variant="contained"
                  onClick={() => updateStatus(statusValue)}
                  sx={{ background: styleObj.bg, fontWeight: 700, color: "#1a1a1a", textTransform: "none", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)", "&:hover": { background: styleObj.hover, boxShadow: "0 6px 20px rgba(212, 175, 55, 0.5)" } }}
                >
                  {STATUS_TEXT[statusValue]}
                </Button>
              );
            })}
          </Box>
        </Box>
        <Box sx={{ marginTop: "40px" }}>
          <Button variant="contained" onClick={removeTask} sx={{ background: "#8b6914", fontWeight: 700, color: "#ffffff", textTransform: "none", boxShadow: "0 4px 15px rgba(139, 105, 20, 0.4)", "&:hover": { background: "#6b4f0f", boxShadow: "0 6px 20px rgba(139, 105, 20, 0.6)" } }}>
            Удалить задачу
          </Button>
        </Box>
        <Box sx={{ marginTop: "20px" }}>
          <Button variant="outlined" onClick={() => navigate("/board")} sx={{ borderColor: "#3d3d3d", color: "#e0e0e0", fontWeight: 600, textTransform: "none", "&:hover": { borderColor: "#d4af37", background: "rgba(212, 175, 55, 0.1)", color: "#d4af37" } }}>
            Вернуться на главную
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
