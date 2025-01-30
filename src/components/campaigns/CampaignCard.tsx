import { Campaign } from "./CreateCampaignDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ExternalLink, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { EditCampaignDialog } from "./EditCampaignDialog";

interface CampaignCardProps {
  campaign: Campaign;
  onStatusChange: (id: string, status: "running" | "stopped") => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedCampaign: Omit<Campaign, "id">) => void;
}

export const CampaignCard = ({ campaign, onStatusChange, onDelete, onEdit }: CampaignCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{campaign.title}</CardTitle>
        <div className="flex items-center gap-2">
          <EditCampaignDialog campaign={campaign} onEdit={onEdit} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Campaign</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{campaign.title}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(campaign.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Switch
            checked={campaign.status === "running"}
            onCheckedChange={(checked) =>
              onStatusChange(campaign.id, checked ? "running" : "stopped")
            }
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <a
              href={campaign.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1"
            >
              {campaign.url}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className={
                campaign.status === "running"
                  ? "bg-success/10 text-success"
                  : "bg-warning/10 text-warning"
              }
            >
              {campaign.status}
            </Badge>
            {campaign.payouts.map((payout, index) => (
              <Badge key={index} variant="secondary">
                {payout.country}: ${payout.amount}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};