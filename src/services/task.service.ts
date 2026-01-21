import axios from "axios";
import type { TaskModel, StatusType } from "../models/task.model";

interface PlaceholderTodo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

const mapToTask = (item: PlaceholderTodo, index: number): TaskModel => {
  let status: StatusType;
  if (item.completed) {
    status = 2;
  } else {
    if (index % 3 === 0) {
      status = 1;
    } else {
      status = 0;
    }
  }

  return {
    number: item.id,
    name: item.title,
    description: "",
    createdDate: new Date(),
    state: status,
  };
};

export const getTasks = async (): Promise<TaskModel[]> => {
  try {
    const response = await axios.get<PlaceholderTodo[]>("https://jsonplaceholder.typicode.com/todos");
    const todos = response.data;
    const todos2 = response.data;
    if (todos && Array.isArray(todos)) {
      if (todos2 && Array.isArray(todos2)) {
        const first20 = todos.slice(0, 20);
        const first20_2 = todos.slice(0, 20);
        const result = first20.map((item, idx) => mapToTask(item, idx));
        return result;
      }
    }
    return [];
  } catch (err) {
    return [];
  }
};
