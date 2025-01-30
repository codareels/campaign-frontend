import { useState } from "react";
import { CreateCampaignDialog, Campaign } from "@/components/campaigns/CreateCampaignDialog";
import { CampaignList } from "@/components/campaigns/CampaignList";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const { toast } = useToast();

  const handleCreateCampaign = (newCampaign: Omit<Campaign, "id">) => {
    const campaign: Campaign = {
      ...newCampaign,
      id: Math.random().toString(36).substr(2, 9),
    };
    setCampaigns([...campaigns, campaign]);
    toast({
      title: "Campaign Created",
      description: "Your campaign has been created successfully.",
    });
  };

  const handleStatusChange = (id: string, status: "running" | "stopped") => {
    setCampaigns(
      campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, status } : campaign
      )
    );
    toast({
      title: "Status Updated",
      description: `Campaign status changed to ${status}.`,
    });
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
    toast({
      title: "Campaign Deleted",
      description: "Your campaign has been deleted successfully.",
    });
  };

  const handleEditCampaign = (id: string, updatedCampaign: Omit<Campaign, "id">) => {
    setCampaigns(
      campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, ...updatedCampaign } : campaign
      )
    );
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Campaign Management</h1>
        <CreateCampaignDialog onCreateCampaign={handleCreateCampaign} />
      </div>
      <CampaignList 
        campaigns={campaigns} 
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteCampaign}
        onEdit={handleEditCampaign}
      />
    </div>
  );
};

export default Index;