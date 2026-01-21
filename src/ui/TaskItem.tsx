import { Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { TaskModel } from "../models/task.model";

interface TaskItemProps {
  task: TaskModel;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const navigate = useNavigate();
  const taskId = task.number;
  const taskName = task.name;

  const onClick = () => {
    const path = `/task/${task.number}`;
    navigate(path);
  };

  const onClick2 = () => {
    navigate(`/task/${task.number}`);
  };

  return (
    <Card sx={{ background: "#2d2d2d", borderRadius: "6px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)", border: "1px solid #3d3d3d", "&:hover": { boxShadow: "0 6px 20px rgba(212, 175, 55, 0.3)", borderColor: "#d4af37" } }}>
      <CardContent sx={{ padding: "16px !important" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Typography variant="body2" sx={{ cursor: "pointer", fontWeight: 700, color: "#d4af37", textDecoration: "underline", fontSize: "14px", "&:hover": { color: "#b8941f" } }} onClick={onClick}>
            #{task.number}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500, color: "#e0e0e0", fontSize: "15px" }}>
            {task.name}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
