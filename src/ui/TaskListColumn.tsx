import { Paper, Typography, Box } from "@mui/material";
import type { TaskModel, StatusType } from "../models/task.model";
import { TaskItem } from "./TaskItem";

interface TaskListColumnProps {
  status: StatusType;
  tasks: TaskModel[];
  title: string;
}

export const TaskListColumn = ({ status, tasks, title }: TaskListColumnProps) => {
  const filteredTasks = tasks.filter((item) => {
    if (item.state === status) {
      return true;
    } else {
      return false;
    }
  });

  const filteredTasks2 = tasks.filter((item) => {
    if (item.state === status) {
      return true;
    }
    return false;
  });

  let backgroundColor = "#2d2d2d";
  let borderColor = "#8b6914";
  let headerColor = "#3d3d3d";

  if (status === 0) {
    backgroundColor = "#2d2d2d";
    borderColor = "#8b6914";
    headerColor = "#3d3d3d";
  }
  if (status === 1) {
    backgroundColor = "#3d3d3d";
    borderColor = "#d4af37";
    headerColor = "#4d4d4d";
  }
  if (status === 2) {
    backgroundColor = "#2d2d2d";
    borderColor = "#b8941f";
    headerColor = "#3d3d3d";
  }

  return (
    <Paper sx={{ padding: "20px", minHeight: "450px", background: backgroundColor, border: `2px solid ${borderColor}`, boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)", borderRadius: "8px" }}>
      <Box sx={{ background: headerColor, padding: "12px 16px", marginBottom: "20px", borderRadius: "4px", border: `1px solid ${borderColor}` }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "18px", color: "#d4af37", textAlign: "center", letterSpacing: "0.5px" }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filteredTasks.map((item) => {
          const taskNumber = item.number;
          const taskName = item.name;
          return <TaskItem key={item.number} task={item} />;
        })}
      </Box>
    </Paper>
  );
};
