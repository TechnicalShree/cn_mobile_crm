import { useState, useMemo } from "react";
import PageContainer from "../components/layout/page-container";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, ArrowLeft, UserPlus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Link, useSearchParams } from "wouter";
import LeadCard from "../components/leads/lead-card";
import FilterDialog from "../components/leads/filter-dialog";
import { useFetchLeadList } from "../services/query";
import { EmptyState } from "../components/leads/empty-record";

export const TabName = {
  ALL: "All",
  LEAD: "Lead",
  OPEN: "Open",
  HOT: "Hot",
  QUOTATION: "Quotation",
  OPPORTUNITY: "Opportunity",
  UNRESPONDED: "Unresponded",
};

const tabs = [
  {
    label: "All",
    value: TabName.ALL,
  },
  {
    label: "Lead",
    value: TabName.LEAD,
  },
  {
    label: "Opportunity",
    value: TabName.OPPORTUNITY,
  },
  {
    label: "Quotation",
    value: TabName.QUOTATION,
  },
  {
    label: "Open",
    value: TabName.OPEN,
  },
];

export default function Leads() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") || TabName.ALL;
  const [filters, setFilters] = useState<Record<string, string>>({});

  const leadOrFilters = useMemo(() => {
    const orFilters = [];
    switch (status) {
      case TabName.ALL:
        orFilters.push([
          "lead_status",
          "in",
          ["Lead", "Opportunity", "Quotation", "Open"],
        ]);
        break;
      case TabName.LEAD:
        orFilters.push(["lead_status", "=", "Lead"]);
        break;
      case TabName.OPPORTUNITY:
        orFilters.push(["lead_status", "=", "Opportunity"]);
        break;
      case TabName.QUOTATION:
        orFilters.push(["lead_status", "=", "Quotation"]);
        break;
      case TabName.OPEN:
        orFilters.push(["lead_status", "=", "Open"]);
        break;
      case TabName.HOT:
        orFilters.push(["lead_status", "=", "Hot"]);
        break;
      case TabName.UNRESPONDED:
        orFilters.push(["lead_status", "=", "Unresponded"]);
        break;
    }

    return orFilters;
  }, [status]);

  const leadFilters = useMemo(() => {
    const filtersList: string[][] = [];

    const addFilter = (
      field: string,
      operator: string,
      value: string | undefined
    ) => {
      if (value) {
        filtersList.push([field, operator, value]);
      }
    };

    // Add filters based on the provided conditions
    addFilter("lead_status", "=", filters.status);
    addFilter("territory", "=", filters.territory);
    addFilter(
      "campaign_name",
      "like",
      filters.campaign ? `%${filters.campaign}%` : undefined
    );
    addFilter(
      "company",
      "like",
      filters.company ? `%${filters.company}%` : undefined
    );

    if (searchQuery) {
      ["name", "mobile_no", "lead_name", "email_id"].forEach((field) => {
        addFilter(field, "like", `%${searchQuery}%`);
      });
    }

    return filtersList;
  }, [searchQuery, filters]);

  const { data: leadList } = useFetchLeadList({
    filters: leadFilters,
    or_filters: leadOrFilters,
  });

  return (
    <PageContainer>
      {/* Header with Actions */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/mobile_crm">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
        <Button size="icon" className="w-8 h-8">
          <UserPlus className="w-4 h-4" />
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex w-full gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <Input
            placeholder={`Search for ${
              status === TabName.OPPORTUNITY ? "Opportunity" : "Lead"
            }`}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <FilterDialog
          status={status}
          filters={filters}
          onFilterChange={setFilters}
          key={filters.toString()}
        />
      </div>

      {/* Tabs */}
      <div className="w-full mb-4 overflow-x-auto">
        <Tabs
          value={status}
          onValueChange={(value) => setSearchParams({ status: value })}
          className="w-full"
        >
          <TabsList className="justify-start w-full overflow-x-auto">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Card Grid */}
      <div className="grid gap-4">
        {leadList?.data && leadList.data.length === 0 && <EmptyState />}
        {leadList?.data &&
          leadList.data.length > 0 &&
          leadList?.data.map((lead) => (
            <LeadCard key={lead.name} lead={lead} />
          ))}
      </div>
    </PageContainer>
  );
}
