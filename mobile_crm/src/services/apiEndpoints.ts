const API_END_POINTS = {
  // Custom Methods
  getLeadAndOpportunityStats:
    "/api/method/cn_mobile_crm.api.dashboard_stats.get_lead_and_opportunity_count",
  getLeadAnalysisStats:
    "/api/method/cn_mobile_crm.api.dashboard_stats.get_lead_analysis_stats",

  // Standard Methods
  getPendingTaskList: "/api/resource/ToDo",
  getMeetingList: "/api/resource/Daily Visit Schedule",

  getLeadList: "/api/resource/Lead",
};

export default API_END_POINTS;
