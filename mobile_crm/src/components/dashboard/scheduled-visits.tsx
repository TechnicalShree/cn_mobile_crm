import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { useFetchMeetingList } from "../../services/query";

export default function ScheduledVisits() {
  const { data: todayVisits } = useFetchMeetingList();
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Today's Visits</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {todayVisits?.data && todayVisits?.data.length > 0 ? (
          todayVisits.data.map((visit) => (
            <div
              key={visit.name}
              className="flex items-start justify-between pb-3 border-b last:border-0 last:pb-0"
            >
              <div className="space-y-1">
                <p className="font-medium">{visit.full_name ?? "-"}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{visit.time_hrs}:{visit.time_mins} {visit.time_format}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{visit.locality ?? "-"}</span>
                </div>
              </div>
              <Badge variant={visit.status === "completed" ? "secondary" : "outline"} className="rounded-[4px]">
                {visit.status}
              </Badge>
            </div>
          ))
        ) : (
          <p className="py-2 text-sm text-center rounded-sm text-muted-foreground">
            No visits scheduled for today
          </p>
        )}
      </CardContent>
    </Card>
  );
}
