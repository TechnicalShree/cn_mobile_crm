import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Mail, Phone, MessageSquare, CheckSquare, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Link } from "wouter";
import { LeadType } from "../../types/types";
import { useState } from "react";
import NoteForm from "../modals/create-note";
import CreateTask from "../modals/create-task";
import ScheduleMeetingModal from "../modals/schedule-meeting";
import { useToggleLikeLead } from "../../services/mutation";

export default function LeadCard({ lead }: { lead: LeadType }) {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

  const { mutate: toggleLike } = useToggleLikeLead({
    options: {
      onSuccess: () => {},
      onError: () => {},
    },
  });

  const handleToggleLike = () => {
    toggleLike({
      doctype: "Lead",
      name: lead.name,
      add: "Yes",
    });
  };

  console.log("sdkjbsdjk s-d--f ------", lead);

  return (
    <Link href={`/mobile_crm/leads/${lead.name}`}>
      <Card className="p-3 transition-all duration-200 cursor-pointer hover:shadow-md">
        {/* Badge */}
        <div className="mb-2">
          {!!lead?.lead_status && (
            <Badge
              variant={
                lead.lead_status === "Do Not Contact"
                  ? "destructive"
                  : "secondary"
              }
              className="text-xs px-2 py-0.5 rounded-sm"
            >
              {lead.lead_status}
            </Badge>
          )}
        </div>

        {/* Lead Info */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium">
            {lead.first_name} {lead?.last_name || ""}
          </h3>
          <div className="text-sm text-muted-foreground">
            {lead.company_name}
            {lead.territory && (
              <>
                <span className="mx-1.5 text-gray-400">|</span>
                <span>{lead.territory}</span>
              </>
            )}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-primary">{lead.qualification_status}</span>
            <span className="text-muted-foreground truncate max-w-[200px]">
              {lead.email_id}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className="flex justify-end gap-1.5 mt-2"
          onClick={(e) => e.preventDefault()}
        >
          {!!lead.phone && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              title="Call"
              onClick={() => window.open(`tel:${lead.phone}`)}
            >
              <Phone className="h-3.5 w-3.5" />
            </Button>
          )}
          {!!lead.email_id && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              title="Email"
              onClick={() => window.open(`mailto:${lead.email_id}`)}
            >
              <Mail className="h-3.5 w-3.5" />
            </Button>
          )}
          {!!lead.custom_client_whatsapp_no && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              title="WhatsApp"
              onClick={() =>
                window.open(`https://wa.me/${lead.custom_client_whatsapp_no}`)
              }
            >
              <SiWhatsapp className="h-3.5 w-3.5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            title="Add Note"
            onClick={() => setIsNoteModalOpen(true)}
          >
            <MessageSquare className="h-3.5 w-3.5" />
          </Button>

          <NoteForm
            isOpen={isNoteModalOpen}
            onClose={() => {
              setIsNoteModalOpen(false);
            }}
            leadId={lead.name}
            key={`${lead.name}_${isNoteModalOpen}`}
          />

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            title="Add Task"
            onClick={() => setIsVisitModalOpen(true)}
          >
            <CheckSquare className="h-3.5 w-3.5" />
          </Button>

          <CreateTask
            isOpen={isVisitModalOpen}
            onClose={() => setIsVisitModalOpen(false)}
            leadId={lead.name}
            key={lead.name}
          />

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            title="Add Note"
            onClick={() => setIsMeetingModalOpen(true)}
          >
            <MapPin className="h-3.5 w-3.5" />
          </Button>

          <ScheduleMeetingModal
            isOpen={isMeetingModalOpen}
            onClose={() => setIsMeetingModalOpen(false)}
            leadId={lead?.name}
          />
        </div>
      </Card>
    </Link>
  );
}
