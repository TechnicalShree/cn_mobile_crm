import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Mail, Phone, MessageSquare, CheckSquare } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Link } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";
import { LeadType } from "../../types/types";

export default function LeadCard({ lead }: { lead: LeadType }) {
  const renderBadge = () => {
    return (
      <Badge
        variant={
          lead.lead_status === "Do Not Contact" ? "destructive" : "secondary"
        }
        className="text-xs px-2 py-0.5 rounded-sm"
      >
        {lead.lead_status}
      </Badge>
    );
  };

  return (
    <Link href={`/mobile_crm/leads/${lead.name}`}>
      <Card className="p-3 transition-all duration-200 cursor-pointer hover:shadow-md">
        {/* Badge */}
        <div className="mb-2">{renderBadge()}</div>

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
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            title="Call"
            onClick={() => window.open(`tel:${lead.phone}`)}
          >
            <Phone className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            title="Email"
            onClick={() => window.open(`mailto:${lead.email_id}`)}
          >
            <Mail className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            title="WhatsApp"
            onClick={() => window.open(`https://wa.me/${lead.mobile_no}`)}
          >
            <SiWhatsapp className="h-3.5 w-3.5" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                title="Add Note"
              >
                <MessageSquare className="h-3.5 w-3.5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Note</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  placeholder="Type your note..."
                  className="min-h-[100px]"
                />
                <div className="flex justify-end">
                  <Button>Add Note</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                title="Add Task"
              >
                <CheckSquare className="h-3.5 w-3.5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Task title" />
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" />
                  <Input type="time" />
                </div>
                <div className="flex justify-end">
                  <Button>Add Task</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </Link>
  );
}
