export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp_id: string;
  company_name?: string;
  status: string;
  qualification_status?: string;
  territory?: string;
  type: "Lead" | "Opportunity" | "Quotation";
  // Opportunity specific fields
  customer_name?: string;
  sales_stage?: string;
  price_quoted?: number;
  creation_date: string;
}

export interface Task {
  id: number;
  title: string;
  dueDate: string;
  leadId: number;
  status: string;
}