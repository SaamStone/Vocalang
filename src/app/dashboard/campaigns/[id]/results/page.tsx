'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { mockCampaignApi } from '@/lib/mock-api/campaigns'
import { Button } from '@/components/shared/Button'
import { formatDuration, cn } from '@/lib/utils'

export default function CampaignResultsPage() {
  const params = useParams()
  const id = params.id as string

  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTranscript, setSelectedTranscript] = useState<any | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await mockCampaignApi.getCampaignResults(id)
        setResults(data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) {
    return <div className="p-8 animate-pulse text-[rgb(var(--color-foreground))]">Loading results...</div>
  }

  return (
    <div className="space-y-6 text-[rgb(var(--color-foreground))]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Results — Campaign {id}</h1>
        <Button variant="outline">Export to Excel</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Interested', 'Not Interested', 'Callback', 'No Answer'].map(outcome => (
          <div key={outcome} className="bg-[rgb(var(--color-card))] p-4 rounded-[var(--radius-md)] border border-[rgb(var(--color-border))]">
            <div className="text-sm font-semibold">{outcome}</div>
            <div className="text-2xl mt-1 text-[rgb(var(--color-primary))]">12</div>
          </div>
        ))}
      </div>

      <div className="bg-[rgb(var(--color-card))] rounded-[var(--radius-lg)] border border-[rgb(var(--color-border))] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[rgb(var(--color-muted))] text-[rgb(var(--color-muted-foreground))]">
            <tr>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Phone</th>
              <th className="p-4 font-medium">Outcome</th>
              <th className="p-4 font-medium">Duration</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res: any, idx: number) => (
              <tr key={idx} className="border-t border-[rgb(var(--color-border))]">
                <td className="p-4">{res.name || 'John Doe'}</td>
                <td className="p-4">{res.phone || '+91 9876543210'}</td>
                <td className="p-4"><span className="bg-[rgb(var(--color-primary))] text-[rgb(var(--color-primary-foreground))] px-2 py-1 rounded-full text-xs">{res.outcome || 'Interested'}</span></td>
                <td className="p-4">{formatDuration(res.duration || 120)}</td>
                <td className="p-4">{res.date || '2026-10-04'}</td>
                <td className="p-4">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedTranscript(res)}>View Transcript</Button>
                </td>
              </tr>
            ))}
            {results.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-[rgb(var(--color-muted-foreground))]">No results yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedTranscript && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
          <div className="w-full max-w-md bg-[rgb(var(--color-background))] h-full p-6 shadow-xl border-l border-[rgb(var(--color-border))]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Transcript</h3>
              <button onClick={() => setSelectedTranscript(null)} className="text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))]">Close</button>
            </div>
            <div className="space-y-4">
              <div className="bg-[rgb(var(--color-muted))] p-3 rounded-lg w-3/4">Hello! I am calling from Vocalang.</div>
              <div className="bg-[rgb(var(--color-primary))] text-[rgb(var(--color-primary-foreground))] p-3 rounded-lg w-3/4 ml-auto">Hi, tell me more.</div>
            </div>
            <div className="mt-8">
              <div className="w-full bg-[rgb(var(--color-muted))] h-2 rounded-full overflow-hidden mb-2"><div className="bg-[rgb(var(--color-primary))] w-1/3 h-full" /></div>
              <div className="flex justify-between text-sm text-[rgb(var(--color-muted-foreground))]"><span>0:00</span><span>0:45</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
