interface TaskProps {
  id: string;
  name: string;
  description: string | null;
  listId: string;
  priority: string;
  tagIds: string[];
  taskDate: string | null;
  isAllDay: boolean;
  startTime: string | null;
  endTime: string | null;
  isRepeating: boolean;
  repeatFrequency: string | null;
  endBy: string | null;
  endByDate: string | null;
  endByRepeatCount: string | null;
  endByRepeatCountDate: number | null;
  isMultiDay: boolean;
  startMultiDate: string | null;
  endMultiDate: string | null;
  isCompleted: boolean;
  isWontDo: boolean;
  isDeleted: number;
  completedTime: string;
  progress: number;
  parentTaskId: string | null;
  childTaskIds: string[];
  createdTime: string | null;
  modifiedTime: string | null;
}

export default TaskInterface;
