import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { ContentCut } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <AppBar position="static" sx={{ background: "#1a1a1a", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)", borderBottom: "3px solid #d4af37" }}>
      <Toolbar>
        <ContentCut sx={{ marginRight: "16px", fontSize: "32px", color: "#d4af37" }} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, fontSize: "24px", color: "#ffffff", letterSpacing: "1px" }}>
          Доска задач
        </Typography>
        <Box sx={{ display: "flex", gap: "12px" }}>
          <Button component={Link} to="/board" sx={{ color: "#ffffff", fontWeight: 600, textTransform: "none", fontSize: "16px", "&:hover": { background: "rgba(212, 175, 55, 0.15)", color: "#d4af37" } }}>
            Задачи
          </Button>
          <Button component={Link} to="/new" sx={{ background: "#d4af37", color: "#1a1a1a", fontWeight: 700, textTransform: "none", fontSize: "16px", "&:hover": { background: "#b8941f", boxShadow: "0 4px 15px rgba(212, 175, 55, 0.5)" } }}>
            Создать
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
