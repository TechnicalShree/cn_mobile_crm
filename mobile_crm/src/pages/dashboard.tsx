import { Avatar } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import PageContainer from "../components/layout/page-container";
import BusinessSummary from "../components/dashboard/business-summary";
import LeadAnalysis from "../components/dashboard/lead-analysis";
import StarredLeads from "../components/dashboard/starred-leads";
import TaskList from "../components/dashboard/task-list";
import ScheduledVisits from "../components/dashboard/scheduled-visits";
import { dashboardStats, leads, tasks, leadData, visits } from "../lib/mock-data";
import { Link } from "wouter";
import { UserPlus, Users } from "lucide-react";

export default function Dashboard() {
  const shortcuts = [
    { label: "Open Leads", href: "/mobile_crm/leads?status=open", count: dashboardStats.quickStats.openLeads },
    { label: "Unresponded Leads", href: "/mobile_crm/leads?status=unresponded", count: dashboardStats.quickStats.unrespondedLeads },
    { label: "Hot Leads", href: "/mobile_crm/leads?status=hot", count: dashboardStats.quickStats.hotLeads },
    { label: "Opportunities", href: "/mobile_crm/leads?status=opportunity", count: dashboardStats.quickStats.opportunities },
    { label: "Quotations", href: "/mobile_crm/leads?status=quotation", count: dashboardStats.quickStats.quotations },
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
          <Avatar className="h-10 w-10" />
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
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Users className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/mobile_crm/leads?new=true">
            <Button size="icon" className="h-8 w-8">
              <UserPlus className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-6">
        <BusinessSummary metrics={metrics} />
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {shortcuts.map((shortcut) => (
          <Link key={shortcut.label} href={shortcut.href}>
            <Button
              variant="outline"
              className="w-full justify-between h-auto py-3 px-4"
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
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <TaskList tasks={tasks} />
        <ScheduledVisits visits={visits} />
      </div>

      {/* Starred Leads */}
      <div className="mb-6">
        <StarredLeads leads={leads} />
      </div>

      {/* Lead Analysis */}
      <LeadAnalysis data={leadData} />
    </PageContainer>
  );
}