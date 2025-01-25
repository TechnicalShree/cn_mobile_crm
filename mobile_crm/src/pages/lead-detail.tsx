import { useLocation } from "wouter";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ArrowLeft, Mail, Phone, MessageSquare, CheckSquare, FileText, ClipboardList, StickyNote, Edit, MapPin, Calendar as CalendarIcon, Clock } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import PageContainer from "../components/layout/page-container";
import { leads, tasks, notes, visits } from "../lib/mock-data";
import { Link } from "wouter";
import { Textarea } from "../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { cn } from "../lib/utils";
import { Calendar } from "../components/ui/calendar";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";
import { Clock as ClockIcon } from "lucide-react";

export default function LeadDetail() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [location] = useLocation();
  const { toast } = useToast();
  const leadId = location.split("/").pop();
  const lead = leads.find((l) => l.id === leadId);
  const [selectedVisit, setSelectedVisit] = useState<typeof visits[0] | null>(null);
  const [visitDialogOpen, setVisitDialogOpen] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");

  // Visit status management functions
  const handleVisitAction = (visit: typeof visits[0]) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          // Here we would typically send this to the backend
          console.log(`Location captured: ${latitude}, ${longitude}`);

          if (visit.status === 'scheduled') {
            toast({
              title: "Visit Started",
              description: "Your location has been recorded for the visit check-in.",
            });
            // Update visit status to in_progress
          } else if (visit.status === 'in_progress') {
            toast({
              title: "Visit Completed",
              description: "Visit has been marked as completed.",
            });
            // Update visit status to completed
          }
          setVisitDialogOpen(false);
        },
        error => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enable location services.",
            variant: "destructive",
          });
          console.error(error);
        }
      );
    }
  };

  const getVisitActionButton = (status: string) => {
    switch (status) {
      case 'scheduled':
        return (
          <Button
            className="w-full mt-4"
            onClick={() => selectedVisit && handleVisitAction(selectedVisit)}
          >
            Check In
          </Button>
        );
      case 'in_progress':
        return (
          <Button
            className="w-full mt-4"
            onClick={() => selectedVisit && handleVisitAction(selectedVisit)}
          >
            Mark as Completed
          </Button>
        );
      default:
        return null;
    }
  };

  if (!lead) {
    return (
      <PageContainer>
        <div className="flex items-center mb-4">
          <Link href="/mobile_crm/leads">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
        <Card className="p-4">
          <p className="text-center text-gray-500">Lead not found</p>
        </Card>
      </PageContainer>
    );
  }

  const leadTasks = tasks.filter(task => task.leadId.toString() === lead.id);
  const leadNotes = notes.filter(note => note.leadId.toString() === lead.id);
  const leadVisits = visits.filter(visit => visit.leadId === lead.id);

  const handleAddTask = () => {
    // Here we would typically make an API call to add the task
    console.log("Adding task:", { taskTitle, taskDate, taskTime });

    toast({
      title: "Task Added",
      description: "Your task has been successfully created.",
    });

    // Reset form and close dialog
    setTaskTitle("");
    setTaskDate("");
    setTaskTime("");
    setTaskDialogOpen(false);
  };

  return (
    <PageContainer>
      {/* Back Button */}
      <div className="flex items-center mb-4">
        <Link href="/mobile_crm/leads">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      {/* Lead Header Card */}
      <Card className="p-4 mb-4">
        <div className="space-y-3">
          {/* Status Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge variant={lead.status === "Do Not Contact" ? "destructive" : "secondary"}>
              🔴 {lead.status}
            </Badge>
            {lead.qualification_status && (
              <Badge variant="outline">
                🟡 {lead.qualification_status}
              </Badge>
            )}
            {lead.territory && (
              <Badge variant="outline">
                🌍 {lead.territory}
              </Badge>
            )}
          </div>

          {/* Name and Company */}
          <div>
            <h1 className="text-xl font-bold">{lead.name}</h1>
            <p className="text-muted-foreground">{lead.company_name}</p>
          </div>

          {/* Contact Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => window.open(`tel:${lead.phone}`)}
            >
              <Phone className="h-3.5 w-3.5" />
              Call
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => window.open(`mailto:${lead.email}`)}
            >
              <Mail className="h-3.5 w-3.5" />
              Email
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => window.open(`https://wa.me/${lead.whatsapp_id}`)}
            >
              <SiWhatsapp className="h-3.5 w-3.5" />
              WhatsApp
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                >
                  <Edit className="h-3.5 w-3.5" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl w-[90vw] h-[90vh]">
                <DialogHeader>
                  <DialogTitle>Edit Lead</DialogTitle>
                </DialogHeader>
                <div className="flex-1 -mx-6 -mb-6">
                  <iframe
                    src={`https://operate.hybrowlabs.com/lead/${lead.id}`}
                    className="w-full h-full rounded-b-lg"
                    style={{ height: 'calc(90vh - 4rem)' }}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>

      {/* Tabbed Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none px-0">
          <TabsTrigger value="overview" className="gap-2">
            <FileText className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="tasks" className="gap-2">
            <ClipboardList className="h-4 w-4" />
            Tasks
            <span className="ml-1 text-xs">({leadTasks.length})</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="gap-2">
            <StickyNote className="h-4 w-4" />
            Notes
            <span className="ml-1 text-xs">({leadNotes.length})</span>
          </TabsTrigger>
          <TabsTrigger value="visits" className="gap-2">
            <MapPin className="h-4 w-4" />
            Visits
            <span className="ml-1 text-xs">({leadVisits.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Contact Information */}
            <Card className="p-6">
              <h2 className="text-base font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm">{lead.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm">{lead.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <SiWhatsapp className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm">{lead.whatsapp_id} {lead.whatsapp_registered ? "(Registered)" : ""}</span>
                </div>
              </div>
            </Card>

            {/* Company Details */}
            <Card className="p-6">
              <h2 className="text-base font-semibold mb-4">Company Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Company Name</p>
                  <p className="text-sm font-medium">{lead.company_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Employees</p>
                  <p className="text-sm font-medium">{lead.employees}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Territory</p>
                  <p className="text-sm font-medium">{lead.territory}</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <Card className="p-4">
            <div className="space-y-3">
              {leadTasks.length > 0 ? (
                leadTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                    </div>
                    <Badge variant={task.status === "completed" ? "secondary" : "outline"}>
                      {task.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-center text-muted-foreground">No tasks found</p>
              )}
            </div>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes">
          <Card className="p-4">
            <div className="space-y-3">
              {leadNotes.length > 0 ? (
                leadNotes.map((note) => (
                  <div key={note.id} className="border-b pb-2 last:border-0">
                    <p className="text-sm">{note.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Added on {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-center text-muted-foreground">No notes found</p>
              )}
            </div>
          </Card>
        </TabsContent>

        {/* Visits Tab */}
        <TabsContent value="visits">
          <Card className="p-4">
            <div className="space-y-3">
              {leadVisits.length > 0 ? (
                leadVisits.map((visit) => (
                  <div
                    key={visit.id}
                    className={cn(
                      "flex items-center justify-between border-b pb-2 last:border-0",
                      visit.status !== "completed" && "cursor-pointer hover:bg-accent/50 p-2 rounded-lg -mx-2"
                    )}
                    onClick={() => {
                      if (visit.status !== "completed") {
                        setSelectedVisit(visit);
                        setVisitDialogOpen(true);
                      }
                    }}
                  >
                    <div>
                      <p className="text-sm font-medium">{visit.purpose}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        {visit.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarIcon className="h-3 w-3" />
                        {visit.date} at {visit.time}
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
                    >
                      {visit.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-center text-muted-foreground">No visits found</p>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Visit Action Dialog */}
      <Dialog open={visitDialogOpen} onOpenChange={setVisitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedVisit?.status === 'scheduled' ? 'Check In to Visit' : 'Complete Visit'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <h3 className="font-medium">{selectedVisit?.purpose}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {selectedVisit?.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {selectedVisit?.time}
              </div>
            </div>

            <div className="bg-accent/50 p-4 rounded-lg">
              <p className="text-sm">Your current location will be recorded to complete the visit.</p>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button variant="outline" onClick={() => setVisitDialogOpen(false)}>
                Cancel
              </Button>
              {getVisitActionButton(selectedVisit?.status || 'scheduled')}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Task Dialog */}
      <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Task Title</label>
              <Input
                placeholder="Enter task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <Input
                  type="time"
                  value={taskTime}
                  onChange={(e) => setTaskTime(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button variant="outline" onClick={() => setTaskDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTask}>Add Task</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 right-4 flex gap-2">
        <Button size="sm" variant="secondary" className="rounded-full shadow-lg" onClick={() => setTaskDialogOpen(true)}>
          <ClipboardList className="h-4 w-4 mr-2" />
          Task
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="secondary" className="rounded-full shadow-lg">
              <StickyNote className="h-4 w-4 mr-2" />
              Note
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea placeholder="Type your note..." className="min-h-[100px]" />
              <div className="flex justify-end">
                <Button>Add Note</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="default" className="rounded-full shadow-lg">
              <MapPin className="h-4 w-4 mr-2" />
              Meeting
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Meeting</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Purpose</label>
                <Input placeholder="Meeting purpose (e.g. Product Demo, Service Follow-up)" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border mx-auto"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input type="time" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input placeholder="Enter location" />
                </div>
              </div>

              {/* Location tracking button */}
              <Button
                variant="outline"
                className="w-full gap-2 h-auto py-4"
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
                <div className="flex flex-col items-start text-left">
                  <span className="font-medium">Use Current Location</span>
                  <span className="text-xs text-muted-foreground">Get exact coordinates for accurate visit tracking</span>
                </div>
              </Button>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline">Cancel</Button>
                <Button>Schedule Meeting</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
}