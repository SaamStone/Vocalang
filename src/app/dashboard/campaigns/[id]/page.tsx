'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { mockCampaignApi } from '@/lib/mock-api/campaigns'
import { Button } from '@/components/shared/Button'
import { formatNumber, formatDuration, formatINR, cn } from '@/lib/utils'
import type { Campaign } from '@/types'

export default function CampaignDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await mockCampaignApi.getCampaign(id)
        setCampaign(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) {
    return <div className="p-8 animate-pulse text-[rgb(var(--color-foreground))]">Loading...</div>
  }

  if (!campaign) {
    return <div className="p-8 text-[rgb(var(--color-foreground))]">Campaign not found</div>
  }

  const isRunning = campaign.status === 'running'
  const progress = campaign.totalContacts > 0
    ? Math.min(100, Math.round((campaign.contactsCalled / campaign.totalContacts) * 100))
    : 0

  return (
    <div className="space-y-8 text-[rgb(var(--color-foreground))]">
      <div className="flex justify-between items-center bg-[rgb(var(--color-card))] p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-[rgb(var(--color-border))]">
        <div>
          <h1 className="text-3xl font-bold">{campaign.name}</h1>
          <div className="mt-2 text-sm text-[rgb(var(--color-muted-foreground))]">Status: <span className="font-semibold text-[rgb(var(--color-primary))]">{campaign.status}</span></div>
        </div>
        <div className="flex gap-4">
          <Button variant={isRunning ? "secondary" : "primary"}>
            {isRunning ? 'Pause' : 'Resume'}
          </Button>
          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950">Stop</Button>
          <Button href={`/dashboard/campaigns/${id}/results`} variant="outline">
            View Results
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-[rgb(var(--color-card))] p-4 rounded-[var(--radius-md)] border border-[rgb(var(--color-border))]">
          <div className="text-sm text-[rgb(var(--color-muted-foreground))]">Total Contacts</div>
          <div className="text-2xl font-bold">{formatNumber(campaign.totalContacts)}</div>
        </div>
        <div className="bg-[rgb(var(--color-card))] p-4 rounded-[var(--radius-md)] border border-[rgb(var(--color-border))]">
          <div className="text-sm text-[rgb(var(--color-muted-foreground))]">Called</div>
          <div className="text-2xl font-bold">{formatNumber(campaign.contactsCalled)}</div>
        </div>
        <div className="bg-[rgb(var(--color-card))] p-4 rounded-[var(--radius-md)] border border-[rgb(var(--color-border))]">
          <div className="text-sm text-[rgb(var(--color-muted-foreground))]">Remaining</div>
          <div className="text-2xl font-bold">{formatNumber(campaign.contactsRemaining)}</div>
        </div>
        <div className="bg-[rgb(var(--color-card))] p-4 rounded-[var(--radius-md)] border border-[rgb(var(--color-border))]">
          <div className="text-sm text-[rgb(var(--color-muted-foreground))]">Failed</div>
          <div className="text-2xl font-bold text-red-500">{formatNumber(campaign.contactsFailed)}</div>
        </div>
        <div className="bg-[rgb(var(--color-card))] p-4 rounded-[var(--radius-md)] border border-[rgb(var(--color-border))]">
          <div className="text-sm text-[rgb(var(--color-muted-foreground))]">Est. Finish</div>
          <div className="text-2xl font-bold text-[rgb(var(--color-primary))]">{formatDuration(campaign.estimatedMinutesRemaining)}</div>
        </div>
      </div>

      <div className="bg-[rgb(var(--color-card))] p-6 rounded-[var(--radius-lg)] border border-[rgb(var(--color-border))]">
        <h2 className="text-xl font-semibold mb-4">Progress</h2>
        <div className="w-full bg-[rgb(var(--color-muted))] h-4 rounded-full overflow-hidden">
          <div className="bg-[rgb(var(--color-primary))] h-full" style={{ width: `${progress}%` }} />
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[rgb(var(--color-card))] p-6 rounded-[var(--radius-lg)] border border-[rgb(var(--color-border))]">
        <div>
          <div className="text-sm text-[rgb(var(--color-muted-foreground))]">Language</div>
          <div className="font-medium">{campaign.language}</div>
        </div>
        <div>
          <div className="text-sm text-[rgb(var(--color-muted-foreground))]">Voice</div>
          <div className="font-medium">{campaign.voice}</div>
        </div>
        <div>
          <div className="text-sm text-[rgb(var(--color-muted-foreground))]">Cost per min</div>
          <div className="font-medium">{formatINR(campaign.costPerMinute)}</div>
        </div>
      </div>
    </div>
  )
}
