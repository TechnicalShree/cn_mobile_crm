import { useState } from "react";
import { Calendar } from "../components/ui/calendar";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { MapPin, Calendar as CalendarIcon, Clock, ClipboardList, Plus } from "lucide-react";
import PageContainer from "../components/layout/page-container";

// Mock data for visits
const mockVisits = [
  {
    id: 1,
    customerName: "Hybrowlabs Technologies",
    date: "2025-01-23",
    time: "10:00 AM",
    status: "scheduled",
    location: "Mumbai, Maharashtra",
    purpose: "Product Demo",
  },
  {
    id: 2,
    customerName: "TechCorp Industries",
    date: "2025-01-23",
    time: "2:30 PM",
    status: "completed",
    location: "Pune, Maharashtra",
    purpose: "Service Follow-up",
  },
];

export default function Visits() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <PageContainer>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Visits</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                New Visit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Visit</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                {/* Location tracking permission button */}
                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        position => {
                          console.log(position.coords);
                          // Here we would typically save the coordinates
                        },
                        error => console.error(error)
                      );
                    }
                  }}
                >
                  <MapPin className="h-4 w-4" />
                  Use Current Location
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Today's Visits */}
        <div className="space-y-4">
          {mockVisits.map((visit) => (
            <Card key={visit.id} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{visit.customerName}</h3>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4" />
                      {visit.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      {visit.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      {visit.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <ClipboardList className="h-4 w-4" />
                      {visit.purpose}
                    </div>
                  </div>
                </div>
                <Badge variant={visit.status === "completed" ? "secondary" : "outline"}>
                  {visit.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
