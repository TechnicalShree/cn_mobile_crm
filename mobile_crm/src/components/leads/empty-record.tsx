import { FileX2 } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = "No items found",
  description = "There are no items matching your search criteria.",
  actionLabel = "Clear filters",
  onAction,
}: EmptyStateProps) {
  return (
    <Card className="w-full py-12">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="p-4 rounded-full bg-muted">
          <FileX2 className="w-8 h-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground max-w-[400px]">
            {description}
          </p>
        </div>
        {onAction && (
          <Button variant="outline" onClick={onAction} className="mt-2">
            {actionLabel}
          </Button>
        )}
      </div>
    </Card>
  );
}
