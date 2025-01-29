import { CalendarIcon, CheckCircle2Icon, Clock4Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { useUpdateTaskDetails } from "../../services/mutation";
import { toast } from "../../hooks/use-toast";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    name: string;
    title: string;
    dueDate: string;
    status: string;
    description?: string;
  };
}

export function TaskModal({ isOpen, onClose, task }: TaskModalProps) {
  const { mutate: updateTask, isLoading: isTaskUpdating } =
    useUpdateTaskDetails({
      options: {
        onError: () => {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again.",
          });
        },
        onSuccess: () => {
          toast({
            title: "Task Updated",
            description: "Your task has been successfully updated.",
          });
          onClose();
        },
      },
    });

  function onSubmit() {
    updateTask({
      todo_id: task.name,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-[#00000056] backdrop-blur-sm" />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {task.title}
            </DialogTitle>
          </DialogHeader>
          <div className="pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarIcon className="w-4 h-4" />
                <span>Due Date</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock4Icon className="w-4 h-4 text-muted-foreground" />
                <span>{task.dueDate}</span>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge
                variant={task.status === "Closed" ? "secondary" : "default"}
                className="flex items-center gap-1 rounded-sm"
              >
                {task.status === "Closed" && (
                  <CheckCircle2Icon className="w-3 h-3" />
                )}
                {task.status}
              </Badge>
            </div>

            {task.description && (
              <>
                <Separator />
                <div className="space-y-2">
                  <span className="text-muted-foreground">Description</span>
                  <div dangerouslySetInnerHTML={{ __html: task.description }} />
                </div>
              </>
            )}

            <div className="flex justify-end pt-4 gap-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {task.status === "Open" && (
                <Button
                  disabled={isTaskUpdating}
                  variant="default"
                  onClick={onSubmit}
                >
                  Mark as Completed
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
