import PageContainer from "../components/layout/page-container";
import { Avatar } from "../components/ui/avatar";
import { Card } from "../components/ui/card";
import { Settings, HelpCircle, LogOut } from "lucide-react";

export default function Account() {
  const menuItems = [
    { icon: Settings, label: "Settings" },
    { icon: HelpCircle, label: "Help & Support" },
    { icon: LogOut, label: "Logout" },
  ];

  return (
    <PageContainer>
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-16 w-16" />
        <div>
          <h1 className="text-2xl font-bold">Kalai CRM</h1>
          <p className="text-gray-500">kalaicrm..gmail.com</p>
        </div>
      </div>

      <Card className="divide-y">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-4 w-full p-4 text-left hover:bg-gray-50"
          >
            <item.icon className="h-5 w-5 text-gray-500" />
            <span>{item.label}</span>
          </button>
        ))}
      </Card>
    </PageContainer>
  );
}
