import frappe


# cn_mobile_crm.api.dashboard_stats.get_lead_and_opportunity_count
@frappe.whitelist()
def get_lead_and_opportunity_count():
    """Get count of leads and opportunities for dashboard"""
    # return {
    # 	"lead_count": frappe.db.count("Lead", filters),
    # 	"opportunity_count": frappe.db.count("Opportunity", filters)
    # }

    # TODO :- for now we are using only lead for all over places
    pass
