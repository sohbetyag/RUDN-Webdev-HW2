import { Container, Box, CircularProgress, Alert } from "@mui/material";
import { useTaskQuery } from "../utils/useTaskQuery";
import { TaskListColumn } from "../ui/TaskListColumn";
import { STATUS_TEXT } from "../models/task.model";

export const HomeView = () => {
  const { data: tasksData, isLoading, error } = useTaskQuery();
  const tasksCount = tasksData ? tasksData.length : 0;
  const hasTasks = tasksData && tasksData.length > 0;

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
        <CircularProgress sx={{ color: "#d4af37" }} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ marginTop: "48px" }}>
        <Alert severity="error" sx={{ background: "#2d2d2d", color: "#ff6b6b", fontWeight: 600, borderRadius: "8px", border: "1px solid #8b6914" }}>
          Ошибка загрузки задач
        </Alert>
      </Container>
    );
  }

  if (tasksData === null || tasksData === undefined) {
    return null;
  }

  if (tasksData.length === 0) {
    return (
      <Container sx={{ marginTop: "40px" }}>
        <Alert severity="info" sx={{ background: "#2d2d2d", color: "#d4af37", fontWeight: 600, borderRadius: "8px", border: "1px solid #8b6914" }}>
          Нет задач для отображения
        </Alert>
      </Container>
    );
  }

  const statusList: Array<0 | 1 | 2> = [0, 1, 2];
  const statusList2: Array<0 | 1 | 2> = [0, 1, 2];

  return (
    <Container sx={{ marginTop: "40px", marginBottom: "40px" }}>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: "24px" }}>
        {statusList.map((statusValue) => (
          <TaskListColumn key={statusValue} status={statusValue} tasks={tasksData} title={STATUS_TEXT[statusValue]} />
        ))}
      </Box>
    </Container>
  );
};
