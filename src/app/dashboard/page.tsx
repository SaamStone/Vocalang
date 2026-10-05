'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { mockCampaignApi } from '@/lib/mock-api/campaigns';
import { mockWalletApi } from '@/lib/mock-api/wallet';
import { cn, formatINR, formatDuration, formatNumber } from '@/lib/utils';
import { Button } from '@/components/shared/Button';
import { Campaign } from '@/types';

// Mock types for inline use if not fully defined in @/types
type DashboardStats = {
  walletBalance: number;
  activeCampaigns: number;
  callsToday: number;
  totalCalls: number;
  activeCampaignProgress?: {
    id: string;
    name: string;
    status: 'running' | 'paused' | 'completed' | 'stopped';
    contactsCalled: number;
    totalContacts: number;
    etaHours: number;
    etaMinutes: number;
    etaFinishTime: string; // e.g., 'HH:MM PM'
  };
  recentCampaigns: Campaign[];
};

const StatCard = ({ icon, label, value, subtitle, link }: { icon: React.ReactNode, label: string, value: string, subtitle?: string, link?: { text: string, href: string } }) => (
  <div className="flex flex-col p-6 rounded-[var(--radius-lg)] bg-[rgb(var(--color-card))] shadow-[var(--shadow-sm)] border border-[rgb(var(--color-border))]">
    <div className="flex items-center gap-3 mb-2">
      <div className="text-[rgb(var(--color-muted-foreground))]">
        {icon}
      </div>
      <span className="text-sm font-medium text-[rgb(var(--color-muted-foreground))]">{label}</span>
    </div>
    <div className="text-3xl font-bold text-[rgb(var(--color-foreground))] mb-1">
      {value}
    </div>
    <div className="flex items-center justify-between mt-auto pt-2">
      {subtitle ? (
        <span className="text-sm text-[rgb(var(--color-muted-foreground))]">{subtitle}</span>
      ) : <span />}
      {link && (
        <Link href={link.href} className="text-sm font-medium text-[rgb(var(--color-primary))] hover:underline">
          {link.text}
        </Link>
      )}
    </div>
  </div>
);

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

export default function DashboardHome() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fallback for mock data if methods are slightly different
        const dashboardStats = await mockCampaignApi.getDashboardStats();
        // Assume wallet balance comes from stats or wallet API
        let balance = dashboardStats.walletBalance;
        if (balance === undefined && mockWalletApi?.getBalance) {
           const wallet = await mockWalletApi.getBalance();
           balance = wallet.balance || 0;
        }
        setStats({ ...dashboardStats, walletBalance: balance || 0 });
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
        // Fallback dummy data
        setStats({
          walletBalance: 12500,
          activeCampaigns: 3,
          callsToday: 1240,
          totalCalls: 45000,
          activeCampaignProgress: {
            id: 'c-1',
            name: 'Diwali Reactivation',
            status: 'running',
            contactsCalled: 1240,
            totalContacts: 5000,
            etaHours: 2,
            etaMinutes: 15,
            etaFinishTime: '05:30 PM'
          },
          recentCampaigns: [
            { id: 'c-1', name: 'Diwali Reactivation', status: 'running', contacts: 5000, called: 1240, remaining: 3760, createdAt: '2023-11-01', tags: ['Retail'] } as any
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading || !stats) {
    return (
      <div className="p-8 space-y-6 animate-pulse">
        <div className="h-10 bg-[rgb(var(--color-muted))] rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-[rgb(var(--color-card))] rounded-[var(--radius-lg)]"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-[rgb(var(--color-foreground))] tracking-tight">Dashboard</h1>
        <p className="text-[rgb(var(--color-muted-foreground))] mt-1">Welcome back, Ravi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          label="Wallet Balance" 
          value={formatINR(stats.walletBalance)} 
          link={{ text: 'Top up', href: '/dashboard/wallet' }} 
        />
        <StatCard 
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>}
          label="Active Campaigns" 
          value={stats.activeCampaigns.toString()} 
          link={{ text: 'View all', href: '/dashboard/campaigns' }} 
        />
        <StatCard 
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
          label="Calls Today" 
          value={formatNumber(stats.callsToday)} 
          subtitle="Updated just now"
        />
        <StatCard 
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
          label="Total Calls" 
          value={formatNumber(stats.totalCalls)} 
          subtitle="All time"
        />
      </div>

      {stats.activeCampaignProgress && (
        <div className="bg-[rgb(var(--color-card))] p-6 rounded-[var(--radius-lg)] border border-[rgb(var(--color-border))] shadow-[var(--shadow-sm)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-[rgb(var(--color-foreground))]">Active Campaign Progress</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="font-medium text-[rgb(var(--color-foreground))]">{stats.activeCampaignProgress.name}</span>
                <StatusBadge status={stats.activeCampaignProgress.status} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="text-sm">Pause</Button>
              <Link href={`/dashboard/campaigns/${stats.activeCampaignProgress.id}`}>
                <Button variant="secondary" className="text-sm">View details</Button>
              </Link>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[rgb(var(--color-muted-foreground))]">
                {formatNumber(stats.activeCampaignProgress.contactsCalled)} / {formatNumber(stats.activeCampaignProgress.totalContacts)} contacts called
              </span>
              <span className="text-[rgb(var(--color-muted-foreground))]">
                {Math.round((stats.activeCampaignProgress.contactsCalled / Math.max(stats.activeCampaignProgress.totalContacts, 1)) * 100)}%
              </span>
            </div>
            <div className="w-full bg-[rgb(var(--color-muted))] rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-[rgb(var(--color-primary))] h-2.5 rounded-full transition-all duration-[var(--duration-normal)]" 
                style={{ width: `${Math.min(100, Math.round((stats.activeCampaignProgress.contactsCalled / Math.max(stats.activeCampaignProgress.totalContacts, 1)) * 100))}%` }}
              ></div>
            </div>
            <div className="text-sm text-[rgb(var(--color-muted-foreground))] pt-1">
              Live ETA: About {stats.activeCampaignProgress.etaHours}h {stats.activeCampaignProgress.etaMinutes}m, finishing by {stats.activeCampaignProgress.etaFinishTime}
            </div>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold text-[rgb(var(--color-foreground))] mb-4">Recent Campaigns</h2>
        <div className="bg-[rgb(var(--color-card))] rounded-[var(--radius-lg)] border border-[rgb(var(--color-border))] overflow-hidden shadow-[var(--shadow-sm)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[rgb(var(--color-border))] bg-[rgb(var(--color-muted))/50]">
                  <th className="py-3 px-4 text-sm font-medium text-[rgb(var(--color-muted-foreground))]">Name</th>
                  <th className="py-3 px-4 text-sm font-medium text-[rgb(var(--color-muted-foreground))]">Status</th>
                  <th className="py-3 px-4 text-sm font-medium text-[rgb(var(--color-muted-foreground))]">Contacts</th>
                  <th className="py-3 px-4 text-sm font-medium text-[rgb(var(--color-muted-foreground))]">Called</th>
                  <th className="py-3 px-4 text-sm font-medium text-[rgb(var(--color-muted-foreground))]">Remaining</th>
                  <th className="py-3 px-4 text-sm font-medium text-[rgb(var(--color-muted-foreground))]">Created</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentCampaigns && stats.recentCampaigns.length > 0 ? (
                  stats.recentCampaigns.map((campaign) => (
                    <tr 
                      key={campaign.id} 
                      className="border-b border-[rgb(var(--color-border))] last:border-0 hover:bg-[rgb(var(--color-muted))/30] transition-colors cursor-pointer"
                      onClick={() => window.location.href = `/dashboard/campaigns/${campaign.id}`}
                    >
                      <td className="py-3 px-4 text-sm font-medium text-[rgb(var(--color-foreground))]">{campaign.name}</td>
                      <td className="py-3 px-4"><StatusBadge status={campaign.status} /></td>
                      <td className="py-3 px-4 text-sm text-[rgb(var(--color-muted-foreground))]">{formatNumber(campaign.contacts || 0)}</td>
                      <td className="py-3 px-4 text-sm text-[rgb(var(--color-muted-foreground))]">{formatNumber(campaign.called || 0)}</td>
                      <td className="py-3 px-4 text-sm text-[rgb(var(--color-muted-foreground))]">{formatNumber(campaign.remaining || 0)}</td>
                      <td className="py-3 px-4 text-sm text-[rgb(var(--color-muted-foreground))]">{new Date(campaign.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-sm text-[rgb(var(--color-muted-foreground))]">
                      No recent campaigns found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-[rgb(var(--color-primary))/10] rounded-[var(--radius-lg)] p-8 text-center border border-[rgb(var(--color-primary))/20]">
        <h3 className="text-xl font-semibold text-[rgb(var(--color-foreground))] mb-2">Ready to reach your customers?</h3>
        <p className="text-[rgb(var(--color-muted-foreground))] mb-6 max-w-md mx-auto">Create a new voice calling campaign in minutes with our AI voices.</p>
        <Link href="/dashboard/campaigns/new">
          <Button size="lg" className="font-medium">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            New Campaign
          </Button>
        </Link>
      </div>
    </div>
  );
}
