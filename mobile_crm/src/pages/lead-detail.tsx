import { Link } from "wouter";
import { useLocation } from "wouter";
import { SiWhatsapp } from "react-icons/si";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import PageContainer from "../components/layout/page-container";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  ArrowLeft,
  Mail,
  Phone,
  FileText,
  ClipboardList,
  StickyNote,
  Edit,
  MapPin,
  Clock,
  CalendarIcon,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  useFetchLeadDetails,
  useFetchTaskList,
  useFetchVisitList,
} from "../services/query";
import {
  Note,
  ToDoType,
  VisitDetailsType,
  PostVisitDetailsType,
} from "../types/types";
import {
  useSubmitNoteDetails,
  useSubmitTaskDetails,
  useUpdateMeetingDetails,
  useSubmitMeetingDetails,
} from "../services/mutation";
import { useState } from "react";
import { cn } from "../lib/utils";
import { format } from "date-fns";
import dayjs, { Dayjs } from "dayjs";
import { useToast } from "../hooks/use-toast";
import { NoteCard } from "../components/modals/note-details";
import { TaskModal } from "../components/modals/task-details";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";

export default function LeadDetail() {
  const [location] = useLocation();
  const { toast } = useToast();
  const leadId = location.split("/").pop();
  const [selectedVisit, setSelectedVisit] = useState<VisitDetailsType | null>(
    null
  );

  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ToDoType | null>(null);
  const [visitDialogOpen, setVisitDialogOpen] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");

  const [scheduleMeetingForm, setScheduleMeetingForm] = useState({
    purpose: {
      value: "",
      error: false,
    },
    date: {
      value: new Date(),
      error: false,
    },
    time: {
      value: "",
      error: false,
    },
    location_area: {
      value: "",
      error: false,
    },
  });

  const [note, setNote] = useState("");

  const { data: leadDetails, refetch: refetchLead } = useFetchLeadDetails({
    lead_id: leadId!,
    options: { enabled: !!leadId },
  });
  const { data: visitList, refetch: refetchVisit } = useFetchVisitList({
    lead_id: leadId!,
    options: { enabled: !!leadId },
  });
  const { data: taskList, refetch: refetchTask } = useFetchTaskList({
    lead_id: leadId!,
    options: { enabled: !!leadId },
  });

  const { mutate: submitNote } = useSubmitNoteDetails({
    options: {
      onError: () => {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
      },
      onSuccess: () => {
        refetchLead();
        toast({
          title: "Note Added",
          description: "Your note has been successfully created.",
        });
      },
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
        refetchTask();

        setTaskTitle("");
        setTaskDate("");
        setTaskTime("");
        setTaskDialogOpen(false);

        toast({
          title: "Task Added",
          description: "Your task has been successfully created.",
        });
      },
    },
  });

  const { mutate: submitMeeting } = useSubmitMeetingDetails({
    options: {
      onError: () => {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
      },
      onSuccess: () => {
        refetchVisit();

        setTaskTitle("");
        setTaskDate("");
        setTaskTime("");
        setTaskDialogOpen(false);

        toast({
          title: "Task Added",
          description: "Your task has been successfully created.",
        });
      },
    },
  });

  const { mutate: updateMeeting } = useUpdateMeetingDetails({
    options: {
      onError: () => {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
      },
      onSuccess: () => {
        refetchVisit();

        setTaskTitle("");
        setTaskDate("");
        setTaskTime("");
        setTaskDialogOpen(false);

        toast({
          title: "Task Added",
          description: "Your task has been successfully created.",
        });
      },
    },
  });

  const lead = leadDetails?.data;

  // Visit status management functions
  const handleVisitAction = (
    visit: VisitDetailsType,
    action: "check_in" | "completed"
  ) => {
    // Call this to get location from React Native
    window?.getLocationFromApp();

    // Handle the received location
    window.onReceiveLocation = function (location) {
      console.log("Received location:", location);
      alert(
        "hbhbs db sdf Latitude: " +
          location.latitude +
          "\nkjjsdk nlsd Longitude: " +
          location.longitude
      );
      if (location) {
        const payload: PostVisitDetailsType = {
          name: visit.name,
          status: action === "check_in" ? "Visit Started" : "Visit Done",
        };

        if (action === "check_in") {
          payload.is_visit_started = 1;
          payload.start_time = format(new Date(), "HH:mm:ss");
        } else if (action === "completed") {
          payload.is_visit_done = 1;
          payload.end_time = format(new Date(), "HH:mm:ss");
        }
        updateMeeting(payload);
        setVisitDialogOpen(false);
      }
    };
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

  const getVisitActionButton = (status: string) => {
    switch (status) {
      case "Visit Scheduled":
        return (
          <Button
            className="w-full"
            onClick={() =>
              selectedVisit && handleVisitAction(selectedVisit, "check_in")
            }
          >
            Check In
          </Button>
        );
      case "Visit Started":
        return (
          <Button
            className="w-full"
            onClick={() =>
              selectedVisit && handleVisitAction(selectedVisit, "completed")
            }
          >
            Mark as Completed
          </Button>
        );
      default:
        return null;
    }
  };

  const handleAddNote = async () => {
    await submitNote({
      note: note,
      added_by: "Administrator",
      added_on: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSSSSS"),
      parent: leadDetails?.data.name || "",
      parentfield: "notes",
      parenttype: "Lead",
      doctype: "CRM Note",
    });

    setNote("");
  };

  const handleAddTask = () => {
    submitTask({
      custom_type_of_activity: taskTitle,
      date: format(new Date(taskDate), "yyyy-MM-dd"),
      custom_due_datetime: format(
        new Date(taskDate + " " + taskTime),
        "yyyy-MM-dd HH:mm:ss.SSSSSS"
      ),
      reference_name: leadDetails?.data.name || "",
      reference_type: "Lead",
      description: taskTitle,
      assigned_by: "Administrator",
      assigned_by_full_name: "Administrator",
    });

    setTaskTitle("");
    setTaskDate("");
    setTaskTime("");
  };

  const handleScheduleMeetingFormChange = (
    key: keyof typeof scheduleMeetingForm,
    value: unknown
  ) => {
    if (key === "date") {
      setScheduleMeetingForm((prevForm) => ({
        ...prevForm,
        [key]: {
          error: false,
          value: new Date((value as Dayjs).format("YYYY-MM-DD")),
        },
      }));
    } else {
      setScheduleMeetingForm((prevForm) => ({
        ...prevForm,
        [key]: {
          error: false,
          value,
        },
      }));
    }
  };

  if (!lead) {
    return (
      <PageContainer>
        <div className="flex items-center mb-4">
          <Link href="/mobile_crm/leads">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
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

  return (
    <PageContainer>
      {/* Back Button */}
      <div className="flex items-center mb-4">
        <Link href="/mobile_crm/leads">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
      </div>

      {/* Lead Header Card */}
      <Card className="p-4 mb-4">
        <div className="space-y-3">
          {/* Status Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={
                lead.status === "Do Not Contact" ? "destructive" : "secondary"
              }
              className="rounded-sm"
            >
              🔴 {lead.status}
            </Badge>
            {lead.qualification_status && (
              <Badge variant="outline" className="rounded-sm">
                🟡 {lead.qualification_status}
              </Badge>
            )}
            {lead.territory && (
              <Badge variant="outline" className="rounded-sm">
                🌍 {lead.territory}
              </Badge>
            )}
          </div>

          {/* Name and Company */}
          <div>
            <h1 className="text-xl font-bold">
              {lead.first_name} {lead?.last_name || ""}
            </h1>
            <p className="text-muted-foreground">{lead.company_name}</p>
          </div>

          {/* Contact Actions */}
          <div className="flex gap-2 overflow-x-auto">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => window.open(`tel:${lead.phone}`)}
            >
              <Phone className="h-3.5 w-3.5" />
              Call
            </Button>
            {!!lead.email_id && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => window.open(`mailto:${lead.email_id}`)}
              >
                <Mail className="h-3.5 w-3.5" />
                Email
              </Button>
            )}
            {!!lead.whatsapp_no && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => window.open(`https://wa.me/${lead.whatsapp_no}`)}
              >
                <SiWhatsapp className="h-3.5 w-3.5" />
                WhatsApp
              </Button>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 rounded-md"
                >
                  <Edit className="h-3.5 w-3.5" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogPortal>
                <DialogOverlay className="bg-[#00000056] backdrop-blur-sm" />
                <DialogContent className="max-w-6xl w-[100vw] h-[100vh]">
                  {/* <DialogHeader>
                    <DialogTitle>Edit Lead</DialogTitle>
                  </DialogHeader> */}
                  <div className="flex-1 -mx-6 -mb-6">
                    <iframe
                      src={`/app/lead/${lead.name}`}
                      className="w-full h-full rounded-b-lg"
                      style={{ height: "calc(100vh - 2rem)" }}
                      onLoad={(e: any) => {
                        const iframe = e.target;
                        const iframeDocument =
                          iframe?.contentDocument ||
                          iframe?.contentWindow?.document;

                        // This script hides the navbar with the class 'navbar-expand'
                        const navbar = iframeDocument.querySelector(
                          ".navbar.navbar-expand"
                        );
                        if (navbar) {
                          navbar.style.display = "none";
                        }

                        // Hide the <chatnext-app> element
                        const chatnextApp =
                          iframeDocument.querySelector("chatnext-app");
                        if (chatnextApp) {
                          setTimeout(() => {
                            chatnextApp.style.display = "none";
                          }, 500);
                        }
                      }}
                    />
                  </div>
                </DialogContent>
              </DialogPortal>
            </Dialog>
          </div>
        </div>
      </Card>

      {/* Tabbed Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="justify-start w-full px-1 overflow-x-auto border-b rounded-md h-fit">
          <TabsTrigger value="overview" className="gap-2">
            <FileText className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="tasks" className="gap-2">
            <ClipboardList className="w-4 h-4" />
            Tasks
            {/* <span className="ml-1 text-xs">({leadTasks.length})</span> */}
          </TabsTrigger>
          <TabsTrigger value="notes" className="gap-2">
            <StickyNote className="w-4 h-4" />
            Notes
            {/* <span className="ml-1 text-xs">({leadNotes.length})</span> */}
          </TabsTrigger>
          <TabsTrigger value="visits" className="gap-2">
            <MapPin className="w-4 h-4" />
            Visits
            {/* <span className="ml-1 text-xs">({leadVisits.length})</span> */}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Contact Information */}
            <Card className="p-6">
              <h2 className="mb-4 text-base font-semibold">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-sm">{lead.email_id || "-"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-sm">{lead.mobile_no || "-"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <SiWhatsapp className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-sm">
                    {lead.whatsapp_no || "-"}{" "}
                    {!!lead.whatsapp_no ? "(Registered)" : ""}
                  </span>
                </div>
              </div>
            </Card>

            {/* Company Details */}
            <Card className="p-6">
              <h2 className="mb-4 text-base font-semibold">Company Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">
                    Company Name
                  </p>
                  <p className="text-sm font-medium">{lead.company || "-"}</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">
                    Employees
                  </p>
                  <p className="text-sm font-medium">
                    {lead.no_of_employees || "-"}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">
                    Territory
                  </p>
                  <p className="text-sm font-medium">{lead.territory || "-"}</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <Card className="p-4">
            <div className="space-y-3">
              {taskList?.data && taskList?.data.length > 0 ? (
                taskList.data.map((task) => (
                  <div
                    key={task.name}
                    className="flex items-center justify-between pb-2 border-b cursor-pointer last:border-0"
                    onClick={() => {
                      setIsTaskModalOpen(true);
                      setSelectedTask(task);
                    }}
                  >
                    <div>
                      {(!!task.custom_type_of_activity && (
                        <p className="w-full text-sm font-medium">
                          {task.custom_type_of_activity}
                        </p>
                      )) ||
                        (task.description && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: task.description,
                            }}
                          />
                        ))}
                      <p className="text-xs text-muted-foreground">
                        Due: {format(new Date(task.date), "dd MMM, yyyy")}
                      </p>
                    </div>
                    <Badge
                      variant={
                        task.status === "completed" ? "secondary" : "outline"
                      }
                      className="rounded-sm"
                    >
                      {task.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-center text-muted-foreground">
                  No tasks found
                </p>
              )}
            </div>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes">
          <Card className="p-4">
            <div className="space-y-3">
              {leadDetails.data && leadDetails.data.notes.length > 0 ? (
                leadDetails.data.notes.map((note) => (
                  <div
                    key={note.name}
                    className="pb-2 border-b last:border-0 cursor-pointer"
                    onClick={() => {
                      setIsNoteModalOpen(true);
                      setSelectedNote(note);
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: note.note }}></div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Added on {new Date(note.creation).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-center text-muted-foreground">
                  No notes found
                </p>
              )}
            </div>
          </Card>
        </TabsContent>

        {/* Visits Tab */}
        <TabsContent value="visits">
          <Card className="p-4">
            <div className="space-y-3">
              {visitList?.data && visitList?.data.length > 0 ? (
                visitList.data.map((visit) => (
                  <div
                    key={visit.name}
                    className={cn(
                      "flex items-center justify-between border-b pb-2 last:border-0",
                      visit.status !== "completed" &&
                        "cursor-pointer hover:bg-accent/50 p-2 rounded-lg -mx-2"
                    )}
                    onClick={() => {
                      if (visit.status !== "completed") {
                        setSelectedVisit(visit);
                        setVisitDialogOpen(true);
                      }
                    }}
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {visit.custom_purpose}
                      </p>
                      {!!visit.custom_location_area && (
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {visit.custom_location_area}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarIcon className="w-3 h-3" />
                        {format(
                          new Date(visit.creation),
                          "dd MMM, yyyy"
                        )} at {visit.time_hrs}:{visit.time_mins}{" "}
                        {visit.time_format}
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
                ))
              ) : (
                <p className="text-sm text-center text-muted-foreground">
                  No visits found
                </p>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Visit Action Dialog */}
      <Dialog open={visitDialogOpen} onOpenChange={setVisitDialogOpen}>
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

              <div className="p-4 rounded-lg bg-accent/50">
                <p className="text-sm">
                  Your current location will be recorded to complete the visit.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setVisitDialogOpen(false)}
                >
                  Cancel
                </Button>
                {getVisitActionButton(selectedVisit?.status || "scheduled")}
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>

      {/* Task Dialog */}
      <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <DialogPortal>
          <DialogOverlay className="bg-[#00000056] backdrop-blur-sm" />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Task</DialogTitle>
            </DialogHeader>
            <div className="pt-4 space-y-4">
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
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setTaskDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddTask}>Add Task</Button>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>

      {/* Floating Action Buttons */}
      <div className="fixed flex gap-2 bottom-4 right-4">
        <Button
          size="sm"
          variant="secondary"
          className="rounded-md shadow-lg"
          onClick={() => setTaskDialogOpen(true)}
        >
          <ClipboardList className="w-4 h-4 mr-2" />
          Task
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="secondary"
              className="rounded-md shadow-lg"
            >
              <StickyNote className="w-4 h-4 mr-2" />
              Note
            </Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay className="bg-[#00000056] backdrop-blur-sm" />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Note</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  placeholder="Type your note..."
                  className="min-h-[100px]"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <div className="flex justify-end">
                  <DialogClose>
                    <Button onClick={handleAddNote}>Add Note</Button>
                  </DialogClose>
                </div>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="default"
              className="rounded-md shadow-lg"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Meeting
            </Button>
          </DialogTrigger>
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                      value={dayjs(scheduleMeetingForm.date.value)}
                      onChange={(value) =>
                        handleScheduleMeetingFormChange("date", value)
                      }
                      slots={{
                        actionBar: () => null, // Completely remove the action bar
                      }}
                      slotProps={{
                        toolbar: { hidden: true }, // Disable the toolbar
                      }}
                      defaultValue={dayjs(format(new Date(), "yyyy-MM-dd"))}
                      minDate={dayjs(format(new Date(), "yyyy-MM-dd"))}
                    />
                  </LocalizationProvider>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time</label>
                    <Input
                      value={scheduleMeetingForm.time.value}
                      onChange={(e) =>
                        handleScheduleMeetingFormChange("time", e.target.value)
                      }
                      type="time"
                    />
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

                {/* Location tracking button */}
                {/* <Button
                variant="outline"
                className="w-full h-auto gap-2 py-4"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        console.log(position.coords);
                        // Here we would typically save the coordinates
                      },
                      (error) => console.error(error)
                    );
                  }
                }}
              >
                <MapPin className="w-4 h-4" />
                <div className="flex flex-col items-start text-left">
                  <span className="font-medium">Use Current Location</span>
                  <span className="text-xs text-muted-foreground">
                    Get exact coordinates for accurate visit tracking
                  </span>
                </div>
              </Button> */}

                <div className="flex justify-end gap-2 pt-2">
                  <DialogClose>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setScheduleMeetingForm({
                          purpose: { value: "", error: false },
                          date: { value: new Date(), error: false },
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

        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => {
            setIsTaskModalOpen(false);
            refetchTask();
          }}
          task={{
            name: selectedTask?.name || "",
            title: selectedTask?.custom_type_of_activity || "",
            dueDate: selectedTask?.date
              ? `Due: ${format(
                  new Date(selectedTask?.date || ""),
                  "dd MMM, yyyy"
                )}`
              : "",
            status: selectedTask?.status || "",
            description: selectedTask?.description || "",
          }}
        />

        {selectedNote && (
          <NoteCard
            isOpen={isNoteModalOpen}
            onClose={() => {
              setIsNoteModalOpen(false);
              refetchLead();
            }}
            noteDetails={selectedNote}
          />
        )}
      </div>
    </PageContainer>
  );
}
