export type DashboardStatsInfoType = {
  message: {
    open_leads_count: number;
    unresponded_lead_count: number;
    hot_lead_count: number;
    opportunity_lead_count: number;
    quotation_count: number;
  };
};

// Pending Task Types
export type ToDoListType = {
  data: ToDoType[];
};

type ToDoType = {
  name: string;
  owner: string;
  creation: Date;
  modified: Date;
  modified_by: string;
  docstatus: number;
  idx: number;
  status: string;
  priority: string;
  custom_type_of_activity: null | string;
  color: null;
  date: Date;
  allocated_to: null | string;
  custom_due_datetime: Date | null;
  description: string;
  reference_type: string;
  reference_name: string;
  role: null;
  assigned_by: null | string;
  assigned_by_full_name: null | string;
  sender: null;
  assignment_rule: null;
};

// Meeting Types
export interface MeetingListType {
  data: MeetingType[];
}

type MeetingType = {
  name: string;
  owner: string;
  creation: Date;
  modified: Date;
  modified_by: string;
  docstatus: number;
  idx: number;
  type: string;
  full_name: string;
  mobile_number: string;
  date: Date;
  property_name: null | string;
  locality: null | string;
  lead: string;
  project_name: null | string;
  time_format: string;
  time_hrs: string;
  time_mins: string;
  is_visit_started: number;
  is_location: number;
  is_visit_done: number;
  status: string;
  assigned_to: null;
  assigned_to_employee_name: null;
  comment: null;
  location: null;
  start_time: string;
  end_time: string;
};
