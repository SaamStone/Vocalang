'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { mockCampaignApi } from '@/lib/mock-api/campaigns';
import { cn, formatNumber } from '@/lib/utils';
import { Button } from '@/components/shared/Button';
import { Campaign } from '@/types';

const StatusBadge = ({ status }: { status: string }) => {
  const getStyles = () => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'stopped': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize", getStyles())}>
      {status}
    </span>
  );
};

export default function CampaignListPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const data = await mockCampaignApi.getCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error("Failed to load campaigns", error);
        // Fallback data
        setCampaigns([
          { id: '1', name: 'Festive Promo', status: 'completed', contacts: 10000, called: 10000, remaining: 0, createdAt: '2023-10-15', tags: ['Retail', 'Hindi'] } as any,
          { id: '2', name: 'Q4 Updates', status: 'running', contacts: 5000, called: 2500, remaining: 2500, createdAt: '2023-11-01', tags: ['Tech', 'English'], estimatedFinish: 'Today, 5:00 PM' } as any
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const filteredCampaigns = campaigns.filter(c => {
    const matchesStatus = statusFilter === 'All' || c.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statuses = ['All', 'Running', 'Paused', 'Completed', 'Stopped'];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[rgb(var(--color-foreground))] tracking-tight">Campaigns</h1>
          <p className="text-[rgb(var(--color-muted-foreground))] mt-1">Manage and track your voice calling campaigns.</p>
        </div>
        <Link href="/dashboard/campaigns/new">
          <Button>
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            New Campaign
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-[rgb(var(--color-card))] p-4 rounded-[var(--radius-lg)] border border-[rgb(var(--color-border))] shadow-[var(--shadow-sm)]">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors whitespace-nowrap",
                statusFilter === status 
                  ? "bg-[rgb(var(--color-primary))] text-white" 
                  : "bg-[rgb(var(--color-muted))] text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))]"
              )}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-[rgb(var(--color-muted-foreground))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[rgb(var(--color-background))] border border-[rgb(var(--color-border))] rounded-[var(--radius-md)] text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:border-transparent text-[rgb(var(--color-foreground))]"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-[var(--radius-lg)] animate-pulse shadow-[var(--shadow-sm)]"></div>
          ))}
        </div>
      ) : filteredCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map(campaign => {
            const called = campaign.called || 0;
            const total = campaign.contacts || 1;
            const percent = Math.min(100, Math.round((called / Math.max(total, 1)) * 100));

            return (
              <Link key={campaign.id} href={`/dashboard/campaigns/${campaign.id}`} className="group block">
                <div className="h-full bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-[var(--radius-lg)] p-5 hover:border-[rgb(var(--color-primary))] hover:shadow-[var(--shadow-md)] transition-all duration-[var(--duration-normal)] shadow-[var(--shadow-sm)] flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg text-[rgb(var(--color-foreground))] group-hover:text-[rgb(var(--color-primary))] transition-colors truncate pr-2">
                      {campaign.name}
                    </h3>
                    <StatusBadge status={campaign.status} />
                  </div>
                  
                  {campaign.tags && campaign.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {campaign.tags.map((tag: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-[rgb(var(--color-muted))] text-[rgb(var(--color-muted-foreground))] text-xs rounded-[var(--radius-sm)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-[rgb(var(--color-muted-foreground))]">{formatNumber(called)} / {formatNumber(total)} calls</span>
                        <span className="font-medium text-[rgb(var(--color-foreground))]">{percent}%</span>
                      </div>
                      <div className="w-full bg-[rgb(var(--color-muted))] rounded-full h-2 overflow-hidden">
                        <div 
                          className={cn(
                            "h-2 rounded-full transition-all duration-[var(--duration-normal)]", 
                            campaign.status === 'completed' ? 'bg-blue-500' : 'bg-[rgb(var(--color-primary))]'
                          )}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-[rgb(var(--color-muted-foreground))] pt-2 border-t border-[rgb(var(--color-border))]">
                      <span>Created {new Date(campaign.createdAt).toLocaleDateString()}</span>
                      {/* @ts-ignore */}
                      {campaign.estimatedFinish && campaign.status === 'running' && (
                        <span>ETA: {campaign.estimatedFinish as string}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-[var(--radius-lg)] border-dashed text-center">
          <div className="w-16 h-16 bg-[rgb(var(--color-muted))] rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-[rgb(var(--color-muted-foreground))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-[rgb(var(--color-foreground))] mb-1">No campaigns found</h3>
          <p className="text-[rgb(var(--color-muted-foreground))] mb-6 max-w-sm">
            {searchQuery || statusFilter !== 'All' 
              ? "We couldn't find any campaigns matching your current filters." 
              : "You haven't created any campaigns yet. Start engaging with your customers today."}
          </p>
          {(searchQuery || statusFilter !== 'All') ? (
            <Button variant="outline" onClick={() => { setSearchQuery(''); setStatusFilter('All'); }}>
              Clear Filters
            </Button>
          ) : (
            <Link href="/dashboard/campaigns/new">
              <Button>Create Your First Campaign</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
