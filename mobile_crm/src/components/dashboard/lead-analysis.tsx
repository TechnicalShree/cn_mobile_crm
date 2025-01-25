import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card } from "../../components/ui/card";
import { useFetchLeadAnalysisStats } from "../../services/query";

interface LeadDataPoint {
  month: string;
  leads: number;
}

interface LeadAnalysisProps {
  data: LeadDataPoint[];
}

export default function LeadAnalysis({ data }: LeadAnalysisProps) {
  const {data: starredLeads} = useFetchLeadAnalysisStats();

  console.log("nsndlnsdldjsnfdfnkndn sdflsdkm----", starredLeads?.message, data);
  
  
  return (
    <Card className="p-4">
      <h3 className="mb-4 text-lg font-semibold">Lead Analysis</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={starredLeads?.message ?? []}>
            <defs>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                background: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                padding: '8px'
              }}
            />
            <Area
              type="monotone"
              dataKey="leads"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorLeads)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}