import { Card } from "../../components/ui/card";
import { Calendar } from "lucide-react";
import type { Task } from "../../lib/types";
import { format } from "date-fns";

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Pending Tasks</h2>
      {tasks.map((task) => (
        <Card key={task.id} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium">{task.title}</h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
