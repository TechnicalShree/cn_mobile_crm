import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface FilterDialogProps {
  status: string;
  filters: Record<string, string>;
  onFilterChange: (filters: Record<string, string>) => void;
}

export const STATUS_LIST = {
  All: ["Lead", "Opportunity", "Quotation", "Open"],
  Opportunity: ["Opportunity"],
  Quotation: ["Quotation"],
};

export default function FilterDialog({
  status,
  filters,
  onFilterChange,
}: FilterDialogProps) {
  const [tempFilters, setTempFilters] =
    useState<Record<string, string>>(filters);
  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [updateFilters, setUpdateFilters] = useState(false);

  const updateTempFilter = (key: string, value: string) => {
    if (value) {
      setTempFilters({ ...tempFilters, [key]: value });
    } else {
      const newFilters = { ...tempFilters };
      delete newFilters[key];
      setTempFilters(newFilters);
    }
  };

  const applyFilters = () => {
    setUpdateFilters((prev) => !prev);
  };

  const clearFilters = () => {
    setTempFilters({});
    onFilterChange({});
  };

  useEffect(() => {
    switch (status) {
      case "Opportunity":
        setStatusOptions(STATUS_LIST.Opportunity);
        updateTempFilter("status", STATUS_LIST.Opportunity[0]);
        break;
      case "Quotation":
        setStatusOptions(STATUS_LIST.Quotation);
        updateTempFilter("status", STATUS_LIST.Quotation[0]);
        break;
      default:
        setStatusOptions(STATUS_LIST.All);
        const updatedTempFilters = { ...tempFilters };
        delete updatedTempFilters["status"];
        setTempFilters(updatedTempFilters);
    }
    setUpdateFilters((prev) => !prev);
  }, [status]);

  useEffect(() => {
    onFilterChange(tempFilters);
  }, [updateFilters]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative">
          <Button variant="outline" size="icon">
            <span className="sr-only">Open filters</span>
            {Object.keys(filters).length > 0 && (
              <Badge
                variant="secondary"
                className="absolute flex items-center justify-center w-5 h-5 p-0 rounded-lg -top-2 -right-2"
                key={JSON.stringify(filters)}
              >
                {Object.keys(filters).length}
              </Badge>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <line x1="21" x2="14" y1="4" y2="4" />
              <line x1="10" x2="3" y1="4" y2="4" />
              <line x1="21" x2="12" y1="12" y2="12" />
              <line x1="8" x2="3" y1="12" y2="12" />
              <line x1="21" x2="16" y1="20" y2="20" />
              <line x1="12" x2="3" y1="20" y2="20" />
              <line x1="14" x2="14" y1="2" y2="6" />
              <line x1="8" x2="8" y1="10" y2="14" />
              <line x1="16" x2="16" y1="18" y2="22" />
            </svg>
          </Button>
        </div>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="bg-[#00000056] backdrop-blur-sm" />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Filters</DialogTitle>
              {Object.keys(tempFilters).length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all
                </Button>
              )}
            </div>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={tempFilters.status || ""}
                onValueChange={(value) => updateTempFilter("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Territory</label>
              <Select
                value={tempFilters.territory || ""}
                onValueChange={(value) => updateTempFilter("territory", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select territory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="US">US</SelectItem>
                  <SelectItem value="Europe">Europe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Campaign</label>
              <Input
                value={tempFilters.campaign || ""}
                onChange={(e) => updateTempFilter("campaign", e.target.value)}
                placeholder="Enter campaign"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Company</label>
              <Input
                value={tempFilters.company || ""}
                onChange={(e) => updateTempFilter("company", e.target.value)}
                placeholder="Enter company name"
              />
            </div>
          </div>

          {/* Apply Button */}
          <div className="flex justify-end pt-4">
            <DialogClose asChild>
              <Button onClick={applyFilters}>Apply Filters</Button>
            </DialogClose>
          </div>

          {Object.keys(tempFilters).length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {Object.entries(tempFilters).map(([key, value]) => (
                <Badge
                  key={key}
                  variant="secondary"
                  className="gap-1 rounded-sm"
                >
                  {key}: {value}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => updateTempFilter(key, "")}
                  />
                </Badge>
              ))}
            </div>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
