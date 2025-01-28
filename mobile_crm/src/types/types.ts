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

export type ToDoType = {
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

export type PostToDoType = {
  name?: string;
  owner?: string;
  creation?: Date;
  modified?: Date;
  modified_by?: string;
  docstatus?: number;
  idx?: number;
  status?: string;
  priority?: string;
  custom_type_of_activity: null | string;
  color?: null;
  date: Date | string;
  allocated_to?: null | string;
  custom_due_datetime: Date | string;
  description: string;
  reference_type: string;
  reference_name: string;
  role?: null;
  assigned_by: null | string;
  assigned_by_full_name: null | string;
  sender?: null;
  assignment_rule?: null;
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
  location_area?: string;
};

// Lead Analysis Types
export interface LeadAnalysisType {
  message: {
    month: string;
    leads: number;
  }[];
}

export interface LeadListType {
  data: LeadType[];
}

export interface LeadType {
  name: string;
  owner: LeadOwner;
  creation: Date;
  modified: Date;
  modified_by: LeadOwner;
  docstatus: number;
  idx: number;
  naming_series: NamingSeries;
  first_name: string;
  last_name: null | string;
  mobile_no: string;
  whatsapp_no: null;
  email_id: string;
  salutation: null;
  lead_date: Date | null;
  lead_status: LeadStatus;
  lead_name: string;
  custom_preferred_contact_method: CustomPreferredContactMethod;
  custom_birthday: null;
  custom_anniversary_date: null;
  custom_latest_visit_status: CustomLatestVisitStatus;
  custom_area: null;
  custom_city1: null;
  custom_postal_code: null;
  custom_address_copy: null;
  custom_state_copy: null;
  custom_city_copy: null;
  custom_postal_code_copy: null;
  custom_state1: null;
  custom_repeat_customer: null;
  custom_address: null;
  custom_rented: number;
  custom_owned: number;
  custom_parentalfriend: number;
  custom_current_residence_type: null;
  custom_property_name: null;
  custom_project: null;
  custom_project_name_data: null;
  locality: null | string;
  property_name: null;
  custom_financing_dea: string;
  custom_expected_time_of_purchase: string;
  custom_budget_range: string;
  custom_purpose_of_purchase: CustomPurposeOfPurchase;
  custom_attednded_by: null;
  custom_sales_manager: null;
  lead_owner: LeadOwner;
  source: null | string;
  custom_visit_status: CustomVisitStatus;
  campaign_name: null | string;
  lead_source: null | string;
  custom_cp_firm_name: null;
  custom_channel_partner_name: null;
  custom_channel_partner_mobile: null;
  team_leader: null;
  project_name: null;
  property: null;
  middle_name: null;
  job_title: null;
  custom_remider_date: null;
  custom_reminder_time_minutes: null;
  custom_reminder_time_hours: null;
  custom_reminder_time_format: CustomReminderTimeFormat;
  lead_result: LeadResult;
  custom_reminder_notes: null;
  gender: null;
  status: Status;
  customer: null;
  type: string;
  request_type: string;
  website: null;
  phone: string;
  phone_ext: null;
  company_name: null;
  no_of_employees: NoOfEmployees;
  annual_revenue: number;
  industry: null;
  market_segment: null;
  territory: null;
  fax: null;
  qualification_status: QualificationStatus;
  qualified_by: null;
  qualified_on: null;
  company: Company;
  language: Language;
  image: string;
  title: string;
  disabled: number;
  unsubscribed: number;
  blog_subscriber: number;
  custom_mobile_number_1: null;
  custom_mobile_number_2: null;
  custom_mobile_number_3: null;
  custom_email_id_1: null;
  custom_email_id_2: null;
  custom_email_id_3: null;
  city: null;
  state: null;
  country: Country;
  custom_budget: CustomBudget;
  custom_occupation: null;
  team_leader_name: null;
  assigned_to: null;
  custom_employee_name: null;
  custom_mobile_no: null;
  team: null;
  configuration: null;
}

export enum Company {
  Realtyreflex = "Realtyreflex",
}

export enum Country {
  India = "India",
}

export enum CustomBudget {
  The6070Lakhs = "60-70 Lakhs",
  The7080Lakhs = "70-80 Lakhs",
  The8090Lakhs = "80-90 Lakhs",
  Above1Cr = "Above 1 Cr.",
}

export enum CustomLatestVisitStatus {
  Empty = "",
  VisitDone = "Visit Done",
  VisitScheduled = "Visit Scheduled",
  ReVisitDone = "Re-Visit Done",
  ReVisitScheduled = "Re-Visit Scheduled",
  VisitCancelled = "Visit Cancelled",
}

export enum CustomPreferredContactMethod {
  Empty = "",
  PhoneCall = "Phone Call",
}

export enum CustomPurposeOfPurchase {
  Empty = "",
  Investment = "Investment",
}

export enum CustomReminderTimeFormat {
  Am = "AM",
  Pm = "PM",
}

export enum CustomVisitStatus {
  NotScheduled = "Not Scheduled",
}

export enum Language {
  En = "en",
}

export enum LeadOwner {
  Administrator = "Administrator",
  FunnelChatnextHybrowlabsCOM = "funnel@chatnext.hybrowlabs.com",
}

export enum LeadResult {
  Open = "Open",
  Closed = "Closed",
}

export enum LeadStatus {
  Hot = "Hot",
  Open = "Open",
  NewLead = "New Lead",
  Replied = "Replied",
  Converted = "Converted",
  Quotation = "Quotation",
  Interested = "Interested",
  Opportunity = "Opportunity",
  Unresponsive = "Unresponsive",
  DoNotContact = "Do Not Contact",
  LostQuotation = "Lost Quotation",
}

export enum NamingSeries {
  CRMLeadYyyy = "CRM-LEAD-.YYYY.-",
}

export enum NoOfEmployees {
  The110 = "1-10",
  The1150 = "11-50",
  The5150 = "51-200",
  The5200 = "201-500",
  The51000 = "501-1000",
  The1000 = "1000+",
}

export enum QualificationStatus {
  Unqualified = "Unqualified",
  InProcess = "In Process",
  Qualified = "Qualified",
}

export enum Status {
  Open = "Open",
  Lead = "Lead",
  Replied = "Replied",
  Converted = "Converted",
  Quotation = "Quotation",
  Interested = "Interested",
  Opportunity = "Opportunity",
  DoNotContact = "Do Not Contact",
  LostQuotation = "Lost Quotation",
}

// Lead details pages

export interface LeadDetailsType {
  data: LeadDetails;
}

export type LeadDetails = {
  name: string;
  owner: LeadOwner; // Assuming LeadOwner is a type that can be used for both fields
  creation: Date;
  modified: Date;
  modified_by: LeadOwner; // Assuming this is the same as 'owner' in the first type
  docstatus: number;
  idx: number;
  naming_series: NamingSeries; // Assuming NamingSeries is a valid type
  first_name: string;
  last_name: string | null;
  middle_name: string | null;
  mobile_no: string;
  whatsapp_no: string | null;
  email_id: string;
  salutation: string | null;
  lead_date: Date | null;
  lead_status: LeadStatus;
  lead_name: string;
  custom_preferred_contact_method: CustomPreferredContactMethod;
  custom_birthday: string | null; // Assuming custom_birthday is string or null
  custom_anniversary_date: string | null;
  custom_latest_visit_status: CustomLatestVisitStatus;
  custom_area: string | null;
  custom_city1: string | null;
  custom_postal_code: string | null;
  custom_address_copy: string | null;
  custom_state_copy: string | null;
  custom_city_copy: string | null;
  custom_postal_code_copy: string | null;
  custom_state1: string | null;
  custom_repeat_customer: string | null;
  custom_address: string | null;
  custom_rented: number;
  custom_owned: number;
  custom_parentalfriend: number;
  custom_current_residence_type: string | null;
  custom_property_name: string | null;
  custom_project: string | null;
  custom_project_name_data: string | null;
  locality: string | null;
  property_name: string | null;
  custom_financing_dea: string;
  custom_expected_time_of_purchase: string;
  custom_budget_range: string;
  custom_purpose_of_purchase: CustomPurposeOfPurchase;
  custom_attednded_by: string | null;
  custom_sales_manager: string | null;
  lead_owner: LeadOwner;
  source: string | null;
  custom_visit_status: CustomVisitStatus;
  campaign_name: string | null;
  lead_source: string | null;
  custom_cp_firm_name: string | null;
  custom_channel_partner_name: string | null;
  custom_channel_partner_mobile: string | null;
  team_leader: string | null;
  project_name: string | null;
  property: string | null;
  job_title: string | null;
  custom_remider_date: string | null;
  custom_reminder_time_minutes: number | null;
  custom_reminder_time_hours: number | null;
  custom_reminder_time_format: CustomReminderTimeFormat;
  lead_result: LeadResult;
  custom_reminder_notes: string | null;
  gender: string | null;
  status: Status;
  customer: string | null;
  type: string;
  request_type: string;
  website: string | null;
  phone: string;
  phone_ext: string | null;
  company_name: string | null;
  no_of_employees: NoOfEmployees;
  annual_revenue: number;
  industry: string | null;
  market_segment: string | null;
  territory: string | null;
  fax: string | null;
  qualification_status: QualificationStatus;
  qualified_by: string | null;
  qualified_on: string | null;
  company: Company;
  language: Language;
  image: string;
  title: string;
  disabled: number;
  unsubscribed: number;
  blog_subscriber: number;
  custom_mobile_number_1: string | null;
  custom_mobile_number_2: string | null;
  custom_mobile_number_3: string | null;
  custom_email_id_1: string | null;
  custom_email_id_2: string | null;
  custom_email_id_3: string | null;
  city: string | null;
  state: string | null;
  country: Country;
  custom_budget: CustomBudget;
  custom_occupation: string | null;
  team_leader_name: string | null;
  assigned_to: string | null;
  custom_employee_name: string | null;
  custom_mobile_no: string | null;
  team: string | null;
  configuration: string | null;
  doctype: string;
  secondary_location: any[];
  custom_intersted_property: any[];
  notes: Note[];
  custom_unit_type: any[];
  custom_property_type: any[];
};

export interface Note {
  name: number;
  owner: string;
  creation: Date;
  modified: Date;
  modified_by: string;
  docstatus: number;
  idx: number;
  note: string;
  added_by: string;
  added_on: Date | string;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

export interface PostNoteType {
  name?: number;
  owner?: string;
  creation?: Date;
  modified?: Date;
  modified_by?: string;
  docstatus?: number;
  idx?: number;
  note?: string;
  added_by?: string;
  added_on?: Date | string;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

// Task Types
export interface VisitListType {
  data: VisitDetailsType[];
}

export interface VisitDetailsType {
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
  property_name: null;
  locality: null;
  lead: string;
  project_name: string;
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
  custom_purpose: string;
  custom_location_area: string;
}

export interface PostVisitDetailsType {
  name?: string;
  owner?: string;
  creation?: Date;
  modified?: Date;
  modified_by?: string;
  docstatus?: number;
  idx?: number;
  type?: string;
  full_name?: string;
  mobile_number?: string;
  date?: Date | string;
  property_name?: null;
  locality?: null;
  lead?: string;
  project_name?: string;
  time_format?: string;
  time_hrs?: string | number;
  time_mins?: string | number;
  is_visit_started?: number;
  is_location?: number;
  is_visit_done?: number;
  status?: string;
  assigned_to?: null;
  assigned_to_employee_name?: null;
  comment?: null;
  location?: null;
  start_time?: string;
  end_time?: string;
  custom_purpose?: string;
  custom_location_area?: string;
}

// // Task Types
// export interface ToDoListType {
//   data: Datum[];
// }

// export interface Datum {
//   name:                    string;
//   owner:                   string;
//   creation:                Date;
//   modified:                Date;
//   modified_by:             string;
//   docstatus:               number;
//   idx:                     number;
//   status:                  string;
//   priority:                string;
//   custom_type_of_activity: null;
//   color:                   null;
//   date:                    Date;
//   allocated_to:            string;
//   custom_due_datetime:     null;
//   description:             string;
//   reference_type:          string;
//   reference_name:          string;
//   role:                    null;
//   assigned_by:             string;
//   assigned_by_full_name:   string;
//   sender:                  null;
//   assignment_rule:         null;
// }

export type PostMarkTaskCloseType = {
  task_id: string;
};
