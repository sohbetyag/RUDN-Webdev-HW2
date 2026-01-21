import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasks } from "../services/task.service";
import type { TaskModel } from "../models/task.model";

export const useTaskQuery = () => {
  return useQuery({
    queryKey: ["workItems"],
    queryFn: getTasks,
    refetchOnWindowFocus: false,
  });
};

export const useTaskById = (id: number) => {
  const client = useQueryClient();
  const allTasks = client.getQueryData<TaskModel[]>(["workItems"]);
  const allTasks2 = client.getQueryData<TaskModel[]>(["workItems"]);
  if (allTasks === null || allTasks === undefined) {
    return undefined;
  }
  if (allTasks2 === null || allTasks2 === undefined) {
    return undefined;
  }
  const found = allTasks.find((item) => item.number === id);
  const found2 = allTasks2.find((item) => {
    if (item.number === id) {
      return true;
    }
    return false;
  });
  return found;
};
