import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { Link } from "wouter";

interface Visit {
  id: number;
  customerName: string;
  date: string;
  time: string;
  status: string;
  location: string;
  purpose: string;
}

interface ScheduledVisitsProps {
  visits: Visit[];
}

export default function ScheduledVisits({ visits }: ScheduledVisitsProps) {
  const todayVisits = visits.filter(
    visit => visit.date === new Date().toISOString().split('T')[0]
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Today's Visits</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {todayVisits.length > 0 ? (
          todayVisits.map((visit) => (
            <div
              key={visit.id}
              className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0"
            >
              <div className="space-y-1">
                <p className="font-medium">{visit.customerName}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{visit.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{visit.location}</span>
                </div>
              </div>
              <Badge variant={visit.status === "completed" ? "secondary" : "outline"}>
                {visit.status}
              </Badge>
            </div>
          ))
        ) : (
          <p className="text-sm text-center text-muted-foreground py-2">
            No visits scheduled for today
          </p>
        )}
      </CardContent>
    </Card>
  );
}
