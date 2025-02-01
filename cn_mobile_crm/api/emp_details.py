import frappe


# cn_mobile_crm.api.emp_details.get_employee_detail
@frappe.whitelist()
def get_employee_detail():
    user = frappe.session.user

    if not frappe.db.exists("Employee", {"user_id":user}):
        return

    employee = frappe.get_doc("Employee", {"user_id":user})

    return employee