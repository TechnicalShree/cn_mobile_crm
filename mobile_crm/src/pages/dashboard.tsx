import { Avatar } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import PageContainer from "../components/layout/page-container";
import BusinessSummary from "../components/dashboard/business-summary";
import LeadAnalysis from "../components/dashboard/lead-analysis";
// import StarredLeads from "../components/dashboard/starred-leads";
import TaskList from "../components/dashboard/task-list";
import ScheduledVisits from "../components/dashboard/scheduled-visits";
import { dashboardStats } from "../lib/mock-data";
import { Link } from "wouter";
import { UserPlus, Users } from "lucide-react";
import { useFetchLeadAndOpportunityStats } from "../services/query";
import { LeadForm } from "../components/modals/create-lead";
import { useState } from "react";

export default function Dashboard() {
  const { data: dashboardLeadStats } = useFetchLeadAndOpportunityStats({});
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);

  const shortcuts = [
    {
      label: "Open Leads",
      href: "/mobile_crm/leads?status=Open",
      count: dashboardLeadStats?.message.open_leads_count ?? 0,
    },
    {
      label: "Unresponded Leads",
      href: "/mobile_crm/leads?status=unresponded",
      count: dashboardLeadStats?.message.unresponded_lead_count ?? 0,
    },
    {
      label: "Hot Leads",
      href: "/mobile_crm/leads?status=Hot",
      count: dashboardLeadStats?.message.hot_lead_count ?? 0,
    },
    {
      label: "Opportunities",
      href: "/mobile_crm/leads?status=Opportunity",
      count: dashboardLeadStats?.message.opportunity_lead_count ?? 0,
    },
    {
      label: "Quotations",
      href: "/mobile_crm/leads?status=Quotation",
      count: dashboardLeadStats?.message.quotation_count ?? 0,
    },
  ];

  const metrics = [
    {
      label: "Lead Performance",
      value: `${dashboardStats.metrics.leads.percentage}%`,
      change: `${Math.abs(dashboardStats.metrics.leads.change)}%`,
      trend: dashboardStats.metrics.leads.trend,
    },
    {
      label: "Opportunity Rate",
      value: `${dashboardStats.metrics.opportunities.percentage}%`,
      change: `${Math.abs(dashboardStats.metrics.opportunities.change)}%`,
      trend: dashboardStats.metrics.opportunities.trend,
    },
  ];

  return (
    <PageContainer>
      {/* Header with User Profile */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* <Avatar className="w-10 h-10" /> */}
          <div>
            <h1 className="text-xl font-bold">{dashboardStats.user.name}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{dashboardStats.user.email}</span>
              <span>•</span>
              <span className="text-primary">{dashboardStats.user.role}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/mobile_crm/leads">
            <Button variant="outline" size="icon" className="w-8 h-8">
              <Users className="w-4 h-4" />
            </Button>
          </Link>
          <Button
            size="icon"
            className="w-8 h-8"
            onClick={() => setIsNewLeadModalOpen(true)}
          >
            <UserPlus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-6">
        <BusinessSummary metrics={metrics} />
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-2">
        {shortcuts.map((shortcut) => (
          <Link key={shortcut.label} href={shortcut.href}>
            <Button
              variant="outline"
              className="justify-between w-full h-auto px-4 py-3"
            >
              <span className="text-sm font-medium">{shortcut.label}</span>
              <span className="text-sm font-bold text-primary">
                {shortcut.count}
              </span>
            </Button>
          </Link>
        ))}
      </div>

      {/* Tasks and Visits Grid */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
        <TaskList />
        <ScheduledVisits />
      </div>

      {/* Starred Leads */}
      {/* <div className="mb-6">
        <StarredLeads leads={leads} />
      </div> */}

      {/* Lead Analysis */}
      <LeadAnalysis />

      <LeadForm
        isOpen={isNewLeadModalOpen}
        onClose={() => setIsNewLeadModalOpen(false)}
      />
    </PageContainer>
  );
}
