import { Card } from "../../components/ui/card";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Link } from "wouter";
import { useFetchPedingTaskList } from "../../services/query";


export default function TaskList() {
  var { data: pendingTaskList } = useFetchPedingTaskList();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Pending Tasks</h2>
      {pendingTaskList?.data?.length === 0 && <p className="text-sm text-gray-500">No pending tasks</p>}
      {pendingTaskList?.data?.map((task) => (
        <Card key={task.name} className="w-full">
          <Link to={`/mobile_crm/leads/${task.reference_name}`}>
            <div className="flex items-start justify-between w-full p-4">
              <div className="w-full">
                <h3 className="w-full font-medium truncate">{task.custom_type_of_activity}</h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(task.creation), 'MMM dd, yyyy')}</span>
                </div>
              </div>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
}
