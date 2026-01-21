export type StatusType = 0 | 1 | 2;

export interface TaskModel {
  number: number;
  name: string;
  description: string;
  createdDate: Date;
  state: StatusType;
}

export const STATUS_TEXT: Record<StatusType, string> = {
  0: "К выполнению",
  1: "В работе",
  2: "Выполнено",
};
