import { useState } from "react";
import { Campaign } from "./CreateCampaignDialog";
import { CampaignCard } from "./CampaignCard";
import { SearchBar } from "./SearchBar";

interface CampaignListProps {
  campaigns: Campaign[];
  onStatusChange: (id: string, status: "running" | "stopped") => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedCampaign: Omit<Campaign, "id">) => void;
}

export const CampaignList = ({ campaigns, onStatusChange, onDelete, onEdit }: CampaignListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [payoutFilter, setPayoutFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const getMaxPayout = (campaign: Campaign) => {
    return Math.max(...campaign.payouts.map(p => p.amount));
  };

  const isInPayoutRange = (campaign: Campaign, range: string) => {
    const maxPayout = getMaxPayout(campaign);
    switch (range) {
      case "0-50": return maxPayout <= 50;
      case "51-100": return maxPayout > 50 && maxPayout <= 100;
      case "101-500": return maxPayout > 100 && maxPayout <= 500;
      case "501+": return maxPayout > 500;
      default: return true;
    }
  };

  const sortCampaigns = (campaigns: Campaign[]) => {
    switch (sortBy) {
      case "newest":
        return [...campaigns].reverse();
      case "oldest":
        return [...campaigns];
      case "title-asc":
        return [...campaigns].sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return [...campaigns].sort((a, b) => b.title.localeCompare(a.title));
      case "payout-high":
        return [...campaigns].sort((a, b) => getMaxPayout(b) - getMaxPayout(a));
      case "payout-low":
        return [...campaigns].sort((a, b) => getMaxPayout(a) - getMaxPayout(b));
      default:
        return campaigns;
    }
  };

  const filteredCampaigns = sortCampaigns(campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.url.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus =
      statusFilter === "all" || campaign.status === statusFilter;

    const matchesPayout = payoutFilter === "all" || isInPayoutRange(campaign, payoutFilter);

    return matchesSearch && matchesStatus && matchesPayout;
  }));

  return (
    <div className="space-y-4">
      <SearchBar 
        onSearch={setSearchQuery} 
        onStatusFilter={setStatusFilter}
        onPayoutFilter={setPayoutFilter}
        onSortBy={setSortBy}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};