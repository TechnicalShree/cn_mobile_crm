"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogPortal,
  DialogOverlay,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { useUpdateNote } from "../../services/mutation";
import { toast } from "../../hooks/use-toast";
import { PostNoteType } from "../../types/types";
import { format } from "date-fns";

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  noteDetails: PostNoteType;
}

export function NoteCard({ isOpen, onClose, noteDetails }: NoteModalProps) {
  const [note, setNote] = useState(noteDetails);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.note || "");

  const { mutate: updateNote } = useUpdateNote({
    options: {
      onError: () => {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
      },
      onSuccess: () => {
        onClose();
        toast({
          title: "Note Updated",
          description: "Your note has been successfully updated.",
        });
      },
    },
  });

  const handleUpdate = () => {
    updateNote({
      name: note.name,
      note: editedContent,
    });
    setNote({
      creation: "",
      note: "",
      name: "",
    });
    setIsEditing(false);
  };

  useEffect(() => {
    setNote(noteDetails);
    setEditedContent(noteDetails.note || "");
  }, [noteDetails]);

  console.log(note, editedContent);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-[#00000056] backdrop-blur-sm" />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <p className="text-sm text-muted-foreground">
                Added on{" "}
                {note?.creation
                  ? `Due: ${format(
                      new Date(note?.creation || ""),
                      "dd MMM, yyyy"
                    )}`
                  : ""}
              </p>
            </DialogTitle>
          </DialogHeader>
          {isEditing ? (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="content">Note</Label>
                <Textarea
                  id="content"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdate}>Save Changes</Button>
              </div>
            </div>
          ) : (
            <div>
              {note.note && <p className="mt-2">{note.note}</p>}
              <div className="flex justify-end mt-4">
                <Button onClick={() => setIsEditing(true)}>Edit Note</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
