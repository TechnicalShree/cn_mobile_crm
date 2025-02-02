import { Badge } from "../ui/badge";
import { ToDoType } from "../../types/types";
import { format } from "date-fns";

interface TaskCardProps {
  task: ToDoType;
  onClick: () => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <div
      className="flex items-center justify-between pb-2 border-b cursor-pointer last:border-0"
      onClick={onClick}
    >
      <div>
        {(!!task.custom_type_of_activity && (
          <p className="w-full text-sm font-medium">
            {task.custom_type_of_activity}
          </p>
        )) ||
          (task.description && (
            <div
              dangerouslySetInnerHTML={{
                __html: task.description,
              }}
            />
          ))}
        <p className="text-xs text-muted-foreground">
          Due: {format(new Date(task.date), "dd MMM, yyyy")}
        </p>
      </div>
      <Badge
        variant={task.status === "completed" ? "secondary" : "outline"}
        className="rounded-sm"
      >
        {task.status}
      </Badge>
    </div>
  );
}
