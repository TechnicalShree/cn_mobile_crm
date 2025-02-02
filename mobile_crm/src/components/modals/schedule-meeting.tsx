import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { format } from "date-fns";
import { useFetchLeadDetails } from "../../services/query";
import { useLocation } from "wouter";
import { useToast } from "../../hooks/use-toast";
import { useSubmitMeetingDetails } from "../../services/mutation";

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScheduleMeetingModal({
  isOpen,
  onClose,
}: ScheduleMeetingModalProps) {
  const [location] = useLocation();
  const { toast } = useToast();
  const leadId = location.split("/").pop();
  const { data: leadDetails } = useFetchLeadDetails({
    lead_id: leadId!,
    options: { enabled: !!leadId },
  });
  const [scheduleMeetingForm, setScheduleMeetingForm] = useState(
    getInitialMeetingState()
  );

  const { mutate: submitMeeting } = useSubmitMeetingDetails({
    options: {
      onError: (data) => {
        toast({
          title: "Error",
          description:
            "Something went wrong. Please try again." + JSON.stringify(data),
        });
        setScheduleMeetingForm(getInitialMeetingState());
      },
      onSuccess: () => {
        onClose();

        setScheduleMeetingForm(getInitialMeetingState());

        toast({
          title: "Task Added",
          description: "Your task has been successfully created.",
        });
      },
    },
  });

  const handleScheduleMeetingFormChange = (
    key: keyof typeof scheduleMeetingForm,
    value: unknown
  ) => {
    setScheduleMeetingForm((prevForm) => ({
      ...prevForm,
      [key]: {
        error: false,
        value,
      },
    }));
  };

  const handleScheduleMeeting = () => {
    const timeValue = scheduleMeetingForm.time.value;

    // Split the time into hours and minutes
    const [hours, minutes] = timeValue.split(":").map(Number);

    // Determine AM/PM and convert hours to 12-hour format
    const timeFormat = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12; // Convert 0 or 24 to 12 for 12-hour clock

    submitMeeting({
      date: format(new Date(scheduleMeetingForm.date.value), "yyyy-MM-dd"),
      lead: leadDetails?.data.name || "",
      custom_location_area: scheduleMeetingForm.location_area.value,
      custom_purpose: scheduleMeetingForm.purpose.value,
      time_format: timeFormat,
      time_hrs: hours12,
      time_mins: minutes,
      status: "Visit Scheduled",
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-[#00000056] backdrop-blur-sm" />
        <DialogContent>
          <DialogHeader className="z-50">
            <DialogTitle>Schedule Meeting</DialogTitle>
          </DialogHeader>
          <div className="z-50 pt-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Purpose</label>
              <Input
                value={scheduleMeetingForm.purpose.value}
                onChange={(e) =>
                  handleScheduleMeetingFormChange("purpose", e.target.value)
                }
                placeholder="Meeting purpose (e.g. Product Demo, Service Follow-up)"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Input
                type="date"
                value={scheduleMeetingForm.date.value}
                onChange={(e) =>
                  handleScheduleMeetingFormChange("date", e.target.value)
                }
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <div className="w-full">
                  <Input
                    value={scheduleMeetingForm.time.value}
                    onChange={(e) =>
                      handleScheduleMeetingFormChange("time", e.target.value)
                    }
                    type="time"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={scheduleMeetingForm.location_area.value}
                  onChange={(e) =>
                    handleScheduleMeetingFormChange(
                      "location_area",
                      e.target.value
                    )
                  }
                  placeholder="Enter location"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <DialogClose>
                <Button
                  variant="outline"
                  onClick={() => {
                    setScheduleMeetingForm({
                      purpose: { value: "", error: false },
                      date: {
                        value: new Date().toISOString().split("T")[0],
                        error: false,
                      },
                      time: { value: "", error: false },
                      location_area: { value: "", error: false },
                    });
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose>
                <Button onClick={handleScheduleMeeting}>
                  Schedule Meeting
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

const getInitialMeetingState = () => {
  return {
    purpose: { value: "", error: false },
    date: {
      value: new Date().toISOString().split("T")[0],
      error: false,
    },
    time: { value: "", error: false },
    location_area: { value: "", error: false },
  };
};
