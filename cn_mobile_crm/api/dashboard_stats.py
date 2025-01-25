import frappe

OPEN_LEAD_FILTERS = ["Open"]
UNRESPONDED_LEAD_FILTERS = ["Unresponsive"]
HOT_LEAD_FILTERS = ["New Lead", "Opportunity", "Interested", "Replied"]
# HOT_LEAD_FILTERS = ["Interested", "Replied"]
OPPORTUNITY_LEAD_FILTERS = ["Opportunity"]
QUOTATION_FILTERS = ["Quotation"]


# cn_mobile_crm.api.dashboard_stats.get_lead_and_opportunity_count
@frappe.whitelist()
def get_lead_and_opportunity_count():
    """Optimized function to get lead and opportunity counts for the dashboard."""

    # Define the statuses and their grouping
    status_grouping = {
        "open_leads_count": OPEN_LEAD_FILTERS,
        "unresponded_lead_count": UNRESPONDED_LEAD_FILTERS,
        "hot_lead_count": HOT_LEAD_FILTERS,
        "opportunity_lead_count": OPPORTUNITY_LEAD_FILTERS,
        "quotation_count": QUOTATION_FILTERS,
    }

    # Combine all filters for a single query
    filters = {
        "lead_status": [
            "in",
            sum(
                [[v] if isinstance(v, str) else v for v in status_grouping.values()], []
            ),
        ]
    }

    # Fetch counts grouped by lead_status
    results = frappe.db.get_all(
        "Lead",
        fields=["lead_status", "COUNT(*) as count"],
        filters=filters,
        group_by="lead_status",
    )

    # Initialize the result dictionary with zero counts
    response = {key: 0 for key in status_grouping.keys()}

    # Map the results to the respective keys in the response
    for result in results:
        for key, status in status_grouping.items():
            if result.lead_status == status or (
                isinstance(status, list) and result.lead_status in status
            ):
                response[key] += result.count

    return response
