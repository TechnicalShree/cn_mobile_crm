const API_END_POINTS = {
  // Custom Methods
  getLeadAndOpportunityStats:
    "/api/method/cn_mobile_crm.api.dashboard_stats.get_lead_and_opportunity_count",
  getLeadAnalysisStats:
    "/api/method/cn_mobile_crm.api.dashboard_stats.get_lead_analysis_stats",
  updateVisit: "/api/method/cn_mobile_crm.api.lead_details.update_daily_visits",
  updateTask: "/api/method/cn_mobile_crm.api.lead_details.mark_todo_closed",

  // Standard Methods
  todoApi: "/api/resource/ToDo",
  leadApi: "/api/resource/Lead",
  crmNoteApi: "/api/resource/CRM Note",
  visitApi: "/api/resource/Daily Visit Schedule",
};

export default API_END_POINTS;
