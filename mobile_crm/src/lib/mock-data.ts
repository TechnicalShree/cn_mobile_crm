export const leadData = [
  { month: "Jan", leads: 10 },
  { month: "Feb", leads: 15 },
  { month: "Mar", leads: 280 },
  { month: "Apr", leads: 45 },
  { month: "May", leads: 30 },
  { month: "Jun", leads: 40 },
  { month: "Jul", leads: 35 },
  { month: "Aug", leads: 20 },
  { month: "Sep", leads: 110 },
];

export const leads = [
  {
    id: "CRM-LEAD-2025-00008",
    name: "Chinmay Kulkarni",
    title: "Hybrowlabs Technologies",
    company_name: "Hybrowlabs Technologies Pvt Ltd",
    status: "Do Not Contact",
    qualification_status: "Unqualified",
    request_type: "",
    lead_owner: "funnel@chatnext.hybrowlabs.com",
    email: "example@example.com",
    phone: "+91-8805189711",
    whatsapp_id: "918805189711",
    whatsapp_registered: true,
    annual_revenue: 0,
    employees: "1-10",
    territory: "India",
    country: "India",
    cold_emailing_stage: "Review Personalization",
    last_whatsapp_interaction: "2025-01-21 18:30:51",
    unread_whatsapp_messages: 0,
    custom_last_message_interaction: "2025-01-21 18:30:51",
    language: "English",
    persona_type: "Lead",
    type: "Lead",
    creation_date: "2025-01-21",
  },
  {
    id: "OPP-HRL-IND-DO-SR-24-25/01-032",
    name: "OPP-HRL-IND-DO-SR-24-25/01-032",
    opportunity_from: "Lead",
    party_name: "HRL-IND-DO-SR-24-25/01-022",
    customer_name: "thermax",
    status: "Open",
    sales_stage: "Prospecting",
    opportunity_type: "Sales",
    price_quoted: 0,
    creation_date: "2025-01-21",
    type: "Opportunity",
  },
];

export const tasks = [
  {
    id: 1,
    title: "Follow up with Yuvanesh",
    dueDate: "2025-01-23",
    leadId: 1,
    status: "pending",
  },
  {
    id: 2,
    title: "Send proposal to TechCorp",
    dueDate: "2025-01-24",
    leadId: 1,
    status: "completed",
  },
  {
    id: 3,
    title: "Schedule demo call",
    dueDate: "2025-01-25",
    leadId: 2,
    status: "pending",
  },
];

export const notes = [
  {
    id: 1,
    content:
      "Initial contact made through website inquiry. Showed interest in our CRM solutions.",
    createdAt: "2025-01-21 15:30:00",
    status: "completed",
    leadId: 1,
  },
  {
    id: 2,
    content: "Follow-up call scheduled for next week to discuss requirements.",
    createdAt: "2025-01-21 16:45:00",
    status: "pending",
    leadId: 1,
  },
];

export const dashboardStats = {
  metrics: {
    leads: {
      percentage: 21,
      change: 11.4,
      trend: "up" as const,
    },
    opportunities: {
      percentage: 28,
      change: -5.2,
      trend: "down" as const,
    },
  },
  quickStats: {
    openLeads: 12,
    unrespondedLeads: 5,
    hotLeads: 8,
    opportunities: 15,
    quotations: 3,
  },
  user: {
    name: "Chinmay Kulkarni",
    email: "chinmay@hybrowlabs.com",
    role: "Sales Executive",
    avatar: null,
  },
};

export const visits = [
  {
    id: 1,
    customerName: "Hybrowlabs Technologies",
    date: "2025-01-23",
    time: "10:00 AM",
    status: "in_progress",
    location: "Mumbai, Maharashtra",
    purpose: "Product Demo",
    leadId: "CRM-LEAD-2025-00008",
  },
  {
    id: 2,
    customerName: "TechCorp Industries",
    date: "2025-01-23",
    time: "2:30 PM",
    status: "completed",
    location: "Pune, Maharashtra",
    purpose: "Service Follow-up",
    leadId: "OPP-HRL-IND-DO-SR-24-25/01-032",
  },
];
