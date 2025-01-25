import { Avatar } from "../../components/ui/avatar";
import { Card } from "../../components/ui/card";
import { Star } from "lucide-react";
import type { Lead } from "../../lib/types";

interface StarredLeadsProps {
  leads: Lead[];
}

export default function StarredLeads({ leads }: StarredLeadsProps) {
  const starredLeads = leads.filter(lead => lead.isStarred);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <Star className="h-5 w-5 fill-yellow-400 stroke-yellow-400" />
        Starred Leads
      </h2>
      {starredLeads.map((lead) => (
        <Card key={lead.id} className="p-4">
          <div className="flex items-start gap-4">
            <Avatar />
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-semibold">{lead.name}</h3>
                <span className="text-sm text-primary">{lead.type}</span>
              </div>
              <p className="text-sm text-gray-500">{lead.position}</p>
              <p className="text-sm">{lead.company}</p>
              <p className="text-sm text-gray-500">{lead.location}</p>
              <div className="flex justify-between items-center mt-2">
                <div className="text-sm text-gray-500">
                  {lead.pendingTasks} Pending Tasks
                </div>
                <span className="text-sm text-orange-500">{lead.status}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
