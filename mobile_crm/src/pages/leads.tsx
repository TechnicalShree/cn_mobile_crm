import { useState, useEffect } from "react";
import PageContainer from "../components/layout/page-container";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, ArrowLeft, UserPlus } from "lucide-react";
import { leads } from "../lib/mock-data";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Link, useLocation } from "wouter";
import LeadCard from "../components/leads/lead-card";
import FilterDialog from "../components/leads/filter-dialog";
import type { Lead } from "../lib/types";

export default function Leads() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split('?')[1]);
  const statusParam = params.get('status');
  const [activeTab, setActiveTab] = useState(statusParam?.toUpperCase() || "ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(leads);

  useEffect(() => {
    let result = leads;

    // Filter by tab
    if (activeTab !== "ALL") {
      result = result.filter(lead => 
        lead.type.toLowerCase() === activeTab.toLowerCase()
      );
    }

    // Apply search
    if (searchQuery) {
      result = result.filter(lead => 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      result = result.filter(lead => {
        const leadValue = (lead as any)[key];
        return leadValue?.toLowerCase() === value.toLowerCase();
      });
    });

    setFilteredLeads(result);
  }, [activeTab, searchQuery, filters]);

  return (
    <PageContainer>
      {/* Header with Actions */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <Button size="icon" className="h-8 w-8">
          <UserPlus className="h-4 w-4" />
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2 mb-4 w-full">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={`Search for ${activeTab === "OPPORTUNITY" ? "Opportunity" : "Lead"}`}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <FilterDialog filters={filters} onFilterChange={setFilters} />
      </div>

      {/* Tabs */}
      <div className="w-full overflow-x-auto mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="ALL">ALL</TabsTrigger>
            <TabsTrigger value="LEAD">Lead</TabsTrigger>
            <TabsTrigger value="OPPORTUNITY">Opportunity</TabsTrigger>
            <TabsTrigger value="QUOTATION">Quotation</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Card Grid */}
      <div className="grid gap-4">
        {filteredLeads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </div>
    </PageContainer>
  );
}