import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./ui/NavBar";
import { HomeView } from "./views/HomeView";
import { NewTaskView } from "./views/NewTaskView";
import { TaskView } from "./views/TaskView";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/board" element={<HomeView />} />
        <Route path="/new" element={<NewTaskView />} />
        <Route path="/task/:id" element={<TaskView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
