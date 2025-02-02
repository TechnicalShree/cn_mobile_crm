import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { useEffect } from "react";
import { format } from "date-fns";
import { useSubmitNoteDetails } from "../../services/mutation";
import { useToast } from "../../hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFrappeAuth } from "frappe-react-sdk";

const noteSchema = z.object({
  note: z
    .string()
    .min(1, "Note cannot be empty")
    .max(1000, "Note cannot exceed 1000 characters"),
});

type NoteFormData = z.infer<typeof noteSchema>;

interface NoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  leadId?: string;
}

export default function NoteForm({ isOpen, onClose, leadId }: NoteFormProps) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      note: "",
    },
  });
  const { currentUser } = useFrappeAuth();
  const { mutate: submitNote, isLoading } = useSubmitNoteDetails({
    options: {
      onError: () => {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
      },
      onSuccess: () => {
        toast({
          title: "Note Added",
          description: "Your note has been successfully created.",
        });
        reset();
        onClose();
      },
    },
  });

  const onSubmit = (data: NoteFormData) => {
    submitNote({
      note: data.note,
      added_by: currentUser || "",
      added_on: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSSSSS"),
      parent: leadId || "",
      parentfield: "notes",
      parenttype: "Lead",
      doctype: "CRM Note",
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    if (!leadId) {
      toast({
        title: "Error",
        description: "Lead not found",
      });
      onClose();
    }
  }, [leadId]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="bg-[#00000056] backdrop-blur-sm" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div className="space-y-2">
              <Textarea
                {...register("note")}
                placeholder="Type your note..."
                className="min-h-[100px]"
              />
              {errors.note && (
                <p className="text-sm text-[#ff0000]">{errors.note.message}</p>
              )}
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="disabled:opacity-80"
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                Add Note
              </Button>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
