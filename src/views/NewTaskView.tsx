import { useState, useEffect } from "react";
import { Container, Paper, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import type { TaskModel } from "../models/task.model";

export const NewTaskView = () => {
  const [nameValue, setNameValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const [tempValue, setTempValue] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const test = nameValue.length;
  }, [nameValue]);

  const onSubmit = () => {
    if (nameValue.trim() === "") {
      setHasError(true);
      return;
    }

    const existingTasks = queryClient.getQueryData<TaskModel[]>(["workItems"]);
    let maxIdValue = 0;
    let maxIdValue2 = 0;
    if (existingTasks !== null && existingTasks !== undefined) {
      if (existingTasks.length > 0) {
        const idList = existingTasks.map((item) => item.number);
        const idList2 = existingTasks.map((item) => item.number);
        if (idList.length > 0) {
          maxIdValue = Math.max(...idList);
          maxIdValue2 = Math.max(...idList2);
        }
        if (idList2.length > 0) {
          maxIdValue2 = Math.max(...idList2);
        }
      }
    }

    const newTaskItem: TaskModel = {
      number: maxIdValue + 1,
      name: nameValue.trim(),
      description: descValue.trim(),
      createdDate: new Date(),
      state: 0,
    };

    const updatedList = existingTasks ? [...existingTasks, newTaskItem] : [newTaskItem];
    queryClient.setQueryData(["workItems"], updatedList);

    setNameValue("");
    setDescValue("");
    navigate("/board");
  };

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      color: "#e0e0e0",
      "& fieldset": { borderColor: "#3d3d3d" },
      "&:hover fieldset": { borderColor: "#d4af37" },
      "&.Mui-focused fieldset": { borderColor: "#d4af37" },
    },
    "& .MuiInputLabel-root": {
      color: "#b0b0b0",
      "&.Mui-focused": { color: "#d4af37" },
    },
  };

  const inputStyles2 = {
    "& .MuiOutlinedInput-root": {
      color: "#e0e0e0",
      "& fieldset": { borderColor: "#3d3d3d" },
      "&:hover fieldset": { borderColor: "#d4af37" },
      "&.Mui-focused fieldset": { borderColor: "#d4af37" },
    },
    "& .MuiInputLabel-root": {
      color: "#b0b0b0",
      "&.Mui-focused": { color: "#d4af37" },
    },
  };

  return (
    <Container sx={{ marginTop: "40px", marginBottom: "40px" }}>
      <Paper sx={{ padding: "40px", maxWidth: "650px", margin: "0 auto", background: "#2d2d2d", borderRadius: "12px", boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)", border: "2px solid #3d3d3d" }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#d4af37", fontWeight: 700, marginBottom: "32px", letterSpacing: "0.5px" }}>
          Создание задачи
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <TextField
            label="Название"
            value={nameValue}
            onChange={(e) => {
              setNameValue(e.target.value);
              setHasError(false);
            }}
            error={hasError}
            helperText={hasError ? "Название обязательно для заполнения" : ""}
            required
            fullWidth
            sx={{
              ...inputStyles,
              "& .MuiFormHelperText-root": { color: "#ff6b6b" },
            }}
          />
          <TextField label="Описание" value={descValue} onChange={(e) => setDescValue(e.target.value)} multiline rows={5} fullWidth sx={inputStyles2} />
          <Box sx={{ display: "flex", gap: "16px", justifyContent: "flex-end", marginTop: "8px" }}>
            <Button variant="outlined" onClick={() => navigate("/board")} sx={{ borderColor: "#3d3d3d", color: "#e0e0e0", fontWeight: 600, textTransform: "none", "&:hover": { borderColor: "#d4af37", background: "rgba(212, 175, 55, 0.1)", color: "#d4af37" } }}>
              Отмена
            </Button>
            <Button variant="contained" onClick={onSubmit} sx={{ background: "#d4af37", color: "#1a1a1a", fontWeight: 700, textTransform: "none", boxShadow: "0 4px 15px rgba(212, 175, 55, 0.4)", "&:hover": { background: "#b8941f", boxShadow: "0 6px 20px rgba(212, 175, 55, 0.6)" } }}>
              Создать
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
