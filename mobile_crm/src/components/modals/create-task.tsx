import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useSubmitTaskDetails } from "../../services/mutation";
import { useToast } from "../../hooks/use-toast";
import { format } from "date-fns";
import { useFrappeAuth } from "frappe-react-sdk";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormData, taskSchema } from "./create-task-schema";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId?: string;
}

export default function CreateTask({
  isOpen,
  onClose,
  leadId,
}: CreateModalProps) {
  const { toast } = useToast();
  const { currentUser } = useFrappeAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskTitle: "",
      taskDate: format(new Date(), "yyyy-MM-dd"),
      taskTime: "",
    },
  });

  const { mutate: submitTask } = useSubmitTaskDetails({
    options: {
      onError: () => {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
      },
      onSuccess: () => {
        toast({
          title: "Task Added",
          description: "Your task has been successfully created.",
        });
        reset();
        onClose();
      },
    },
  });

  const onSubmit = (data: TaskFormData) => {
    submitTask({
      custom_type_of_activity: data.taskTitle,
      date: format(new Date(data.taskDate), "yyyy-MM-dd"),
      custom_due_datetime: format(
        new Date(`${data.taskDate}T${data.taskTime}`),
        "yyyy-MM-dd HH:mm:ss.SSSSSS"
      ),
      reference_name: leadId || "",
      reference_type: "Lead",
      description: data.taskTitle,
      assigned_by: currentUser || "",
    });
  };

  useEffect(() => {
    if (!leadId) {
      toast({
        title: "Error",
        description: "Lead not found!",
      });
    }
  }, [leadId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-[#00000056] backdrop-blur-sm" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="pt-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Task Title</label>
              <Input
                {...register("taskTitle")}
                placeholder="Enter task title"
              />
              {errors.taskTitle && (
                <p className="text-sm text-[#ff0000]">
                  {errors.taskTitle.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  {...register("taskDate")}
                  min={format(new Date(), "yyyy-MM-dd")}
                />
                {errors.taskDate && (
                  <p className="text-sm text-[#ff0000]">
                    {errors.taskDate.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <Input type="time" {...register("taskTime")} />
                {errors.taskTime && (
                  <p className="text-sm text-[#ff0000]">
                    {errors.taskTime.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Task</Button>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
