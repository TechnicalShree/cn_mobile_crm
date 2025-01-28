import json
import frappe


# cn_mobile_crm.api.lead_details.update_daily_visits
@frappe.whitelist()
def update_daily_visits():
    try:
        # Get the raw request data
        raw_data = frappe.request.get_data(as_text=True)

        # Parse the JSON data
        data = json.loads(raw_data)

        # Extract the 'visit' object from the parsed data
        visit = data.get("visit")

        if not visit:
            frappe.throw(
                "Visit data is missing in the request.", frappe.ValidationError
            )

        if not frappe.db.exists("Daily Visit Schedule", visit.get("name")):
            frappe.throw(
                f"Visit with name {visit.get('name')} does not exist.",
                frappe.ValidationError,
            )

        data = {"status": visit.get("status")}

        if visit.get("status") == "Visit Started":
            data["is_visit_started"] = visit.get("is_visit_started")
            data["start_time"] = visit.get("start_time")

        elif visit.get("status") == "Visit Done":
            data["is_visit_done"] = visit.get("is_visit_done")
            data["end_time"] = visit.get("end_time")

        frappe.db.set_value("Daily Visit Schedule", visit.get("name"), data)

        frappe.db.commit()

        # Return a success response
        return {
            "status": "success",
            "message": "Visit data processed successfully.",
            "data": frappe.get_doc("Daily Visit Schedule", visit.get("name")),
        }

    except json.JSONDecodeError:
        frappe.throw("Invalid JSON input.", frappe.ValidationError)
    except Exception as e:
        frappe.throw(f"An error occurred: {str(e)}", frappe.ValidationError)


# cn_mobile_crm.api.lead_details.mark_todo_closed
@frappe.whitelist()
def mark_todo_closed(todo_id):
    if not frappe.db.exists("ToDo", todo_id):
        frappe.throw(f"Todo with ID {todo_id} does not exist.")

    frappe.db.set_value("ToDo", todo_id, "status", "Closed")
    frappe.db.commit()

    return frappe.get_doc("ToDo", todo_id)
