import { useState } from "react";
import { Campaign } from "./CreateCampaignDialog";
import { CampaignCard } from "./CampaignCard";
import { SearchBar } from "./SearchBar";

interface CampaignListProps {
  campaigns: Campaign[];
  onStatusChange: (id: string, status: "running" | "stopped") => void;
}

export const CampaignList = ({ campaigns, onStatusChange }: CampaignListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <SearchBar onSearch={setSearchQuery} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
};