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
  // Keep duplicate Just in case you need to replace it with a custom method
  getLeadDetails: "/api/resource/Lead",
  getVisitList: "/api/resource/Daily Visit Schedule",
  todoApi: "/api/resource/ToDo",
  getTaskList: "/api/resource/ToDo",
};

export default API_END_POINTS;
