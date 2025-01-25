import { Home, Users, Building2, UserCircle2, MapPin } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";

export default function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Users, label: "Leads", href: "/mobile_crm/leads" },
    { icon: MapPin, label: "Visits", href: "/mobile_crm/visits" },
    { icon: Building2, label: "Customers", href: "/mobile_crm/customers" },
    { icon: UserCircle2, label: "Account", href: "/mobile_crm/account" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
      <nav className="flex justify-between items-center">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <a className={cn(
              "flex flex-col items-center gap-1 text-xs",
              location === item.href ? "text-primary" : "text-gray-500"
            )}>
              <item.icon className="h-6 w-6" />
              <span>{item.label}</span>
            </a>
          </Link>
        ))}
      </nav>
    </div>
  );
}