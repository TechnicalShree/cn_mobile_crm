import { Card } from "../../components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface BusinessMetric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

interface BusinessSummaryProps {
  metrics: BusinessMetric[];
}

export default function BusinessSummary({ metrics }: BusinessSummaryProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.label} className="p-4">
          <h3 className="text-sm text-gray-500 mb-2">{metric.label}</h3>
          <div className="text-2xl font-bold">{metric.value}</div>
          <div className={`text-sm flex items-center gap-1 ${
            metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
          }`}>
            {metric.trend === 'up' ? (
              <ArrowUpIcon className="h-4 w-4" />
            ) : (
              <ArrowDownIcon className="h-4 w-4" />
            )}
            {metric.change} vs Past month
          </div>
        </Card>
      ))}
    </div>
  );
}