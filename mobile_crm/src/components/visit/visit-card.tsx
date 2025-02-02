import { CalendarIcon, MapPin } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { cn } from "../../lib/utils";
import { VisitDetailsType } from "../../types/types";
import { format } from "date-fns";

interface VisitCardProps {
  visit: VisitDetailsType;
  onClick: () => void;
}

export default function VisitCard({ visit, onClick }: VisitCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b pb-2 last:border-0",
        visit.status !== "completed" &&
          "cursor-pointer hover:bg-accent/50 p-2 rounded-lg -mx-2"
      )}
      onClick={() => {
        if (visit.status !== "completed") {
          onClick();
        }
      }}
    >
      <div>
        <p className="text-sm font-medium">{visit.custom_purpose}</p>
        {!!visit.custom_location_area && (
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            {visit.custom_location_area}
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarIcon className="w-3 h-3" />
          {format(new Date(visit.creation), "dd MMM, yyyy")} at {visit.time_hrs}
          :{visit.time_mins} {visit.time_format}
        </div>
      </div>
      <Badge
        variant={
          visit.status === "completed"
            ? "secondary"
            : visit.status === "in_progress"
            ? "default"
            : "outline"
        }
        className="rounded-sm"
      >
        {visit.status}
      </Badge>
    </div>
  );
}
