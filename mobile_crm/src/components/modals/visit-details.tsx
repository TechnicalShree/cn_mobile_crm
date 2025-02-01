import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";
import { Clock, MapPin } from "lucide-react";
import { LoadingButton } from "../ui/loading-button";
import { PostVisitDetailsType, VisitDetailsType } from "../../types/types";
import { Button } from "../ui/button";
import { toast } from "../../hooks/use-toast";
import { format } from "date-fns";
import { useUpdateMeetingDetails } from "../../services/mutation";

interface VisitDetailModalProps {
  open: boolean;
  onClose: () => void;
  selectedVisit: VisitDetailsType;
}

export default function VisitDetailModal({
  open,
  onClose,
  selectedVisit,
}: VisitDetailModalProps) {
  const [isVisitUpdate, setIsVisitUpdate] = useState(false);

  const [visit, setVisit] = useState<VisitDetailsType | null>(null);
  const [action, setAction] = useState<"check_in" | "completed">("check_in");

  const { mutate: updateMeeting } = useUpdateMeetingDetails({
    options: {
      onError: (data) => {
        toast({
          title: "Error",
          description:
            "Something went wrong. Please try again." + JSON.stringify(data),
        });
      },
      onSuccess: () => {
        toast({
          title: "Task Added",
          description: "Your task has been successfully created.",
        });
      },
    },
  });

  const handleVisitUpdate = (
    visit: VisitDetailsType,
    action: "check_in" | "completed",
    longitude?: string | number,
    latitude?: string | number
  ) => {
    setIsVisitUpdate(() => true);
    const payload: PostVisitDetailsType = {
      name: visit.name,
      status: action === "check_in" ? "Visit Started" : "Visit Done",
    };

    if (action === "check_in") {
      payload.is_visit_started = 1;
      payload.start_time = format(new Date(), "HH:mm:ss");
    } else if (action === "completed") {
      if (longitude && latitude) {
        payload.is_location = 1;
        payload.is_visit_done = 1;
        payload.end_time = format(new Date(), "HH:mm:ss");
        payload.location = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: [longitude, latitude],
              },
            },
          ],
        };
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Location not found.",
        });
        onClose();
        setIsVisitUpdate(() => false);
        return;
      }
    }

    updateMeeting(payload);
    onClose();
    setIsVisitUpdate(() => true);
  };

  useEffect(() => {
    window.onReceiveLocation = function (location) {
      if (location && visit && action) {
        handleVisitUpdate(visit, action, location.longitude, location.latitude);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Location not found.",
        });
      }
    };
  }, [visit, action]);

  const handleVisitAction = (
    visit: VisitDetailsType,
    action: "check_in" | "completed"
  ) => {
    if (action === "check_in") {
      handleVisitUpdate(visit, action);
    } else if (action === "completed") {
      setIsVisitUpdate(() => true);
      setVisit(() => visit);
      setAction(() => action);

      setTimeout(() => {
        window?.getLocationFromApp?.();
      }, 100);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-[#00000056] backdrop-blur-sm" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedVisit?.status === "scheduled"
                ? "Check In to Visit"
                : "Complete Visit"}
            </DialogTitle>
          </DialogHeader>
          <div className="pt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">{selectedVisit?.custom_purpose}</h3>
              {!!selectedVisit?.custom_location_area && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {selectedVisit?.custom_location_area}
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {selectedVisit?.time_hrs}:{selectedVisit?.time_mins}{" "}
                {selectedVisit?.time_format}
              </div>
            </div>

            {selectedVisit?.status === "Visit Started" && (
              <div className="p-4 rounded-lg bg-accent/50">
                <p className="text-sm">
                  Your current location will be recorded to complete the visit.
                </p>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>

              {selectedVisit?.status === "Visit Scheduled" && (
                <LoadingButton
                  className="w-full disabled:opacity-65"
                  onClick={() =>
                    selectedVisit &&
                    handleVisitAction(selectedVisit, "check_in")
                  }
                  loading={isVisitUpdate}
                >
                  Check In
                </LoadingButton>
              )}

              {selectedVisit?.status === "Visit Started" && (
                <LoadingButton
                  className="w-full disabled:opacity-65"
                  onClick={() =>
                    selectedVisit &&
                    handleVisitAction(selectedVisit, "completed")
                  }
                  loading={isVisitUpdate}
                >
                  Mark as Completed
                </LoadingButton>
              )}
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
