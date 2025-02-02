import { Link } from "wouter";
import { useLocation } from "wouter";
import { SiWhatsapp } from "react-icons/si";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
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
  useUpdateMeetingDetails,
} from "../services/mutation";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { format } from "date-fns";
import { useToast } from "../hooks/use-toast";
import { NoteCard } from "../components/modals/note-details";
import { TaskModal } from "../components/modals/task-details";
import { LoadingButton } from "../components/ui/loading-button";
import ScheduleMeetingModal from "../components/modals/schedule-meeting";
import CreateTask from "../components/modals/create-task";

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
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isVisitUpdate, setIsVisitUpdate] = useState(false);

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
        refetchVisit();
        setTaskDialogOpen(false);

        toast({
          title: "Task Added",
          description: "Your task has been successfully created.",
        });
      },
    },
  });

  const lead = leadDetails?.data;

  const [visit, setVisit] = useState<VisitDetailsType | null>(null);
  const [action, setAction] = useState<"check_in" | "completed">("check_in");

  const handleVisitUpdate = (
    visit: VisitDetailsType,
    action: "check_in" | "completed",
    longitude?: string | number,
    latitude?: string | number
  ) => {
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
        setVisitDialogOpen(false);
        return;
      }
    }

    updateMeeting(payload);
    setVisitDialogOpen(false);
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
      setVisit(() => visit);
      setAction(() => action);

      setTimeout(() => {
        window?.getLocationFromApp?.();
      }, 100);
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
            {!!lead.custom_client_whatsapp_no && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() =>
                  window.open(`https://wa.me/${lead.custom_client_whatsapp_no}`)
                }
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
                    {lead.custom_client_whatsapp_no || "-"}{" "}
                    {lead.custom_client_whatsapp_no ? "(Registered)" : ""}
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
                    className="pb-2 border-b cursor-pointer last:border-0"
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

              {selectedVisit?.status === "Visit Started" && (
                <div className="p-4 rounded-lg bg-accent/50">
                  <p className="text-sm">
                    Your current location will be recorded to complete the
                    visit.
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setVisitDialogOpen(false)}
                >
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

        <Button
          size="sm"
          variant="default"
          className="rounded-md shadow-lg"
          onClick={() => setIsMeetingModalOpen(true)}
        >
          <MapPin className="w-4 h-4 mr-2" />
          Meeting
        </Button>
      </div>

      {/* Task Dialog */}
      <CreateTask
        leadId={leadId}
        isOpen={taskDialogOpen}
        onClose={() => {
          refetchTask();
          setTaskDialogOpen(false);
        }}
      />

      <ScheduleMeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => {
          setIsMeetingModalOpen(false);
          refetchVisit();
        }}
      />

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
    </PageContainer>
  );
}
