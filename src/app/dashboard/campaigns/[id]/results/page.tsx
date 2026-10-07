'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { mockCampaignApi } from '@/lib/mock-api/campaigns'
import { Button } from '@/components/shared/Button'
import { formatDuration, cn } from '@/lib/utils'
import type { CallResult } from '@/types'

export default function CampaignResultsPage() {
  const params = useParams()
  const id = params.id as string

  const [results, setResults] = useState<CallResult[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTranscript, setSelectedTranscript] = useState<CallResult | null>(null)

  const exportResults = () => {
    const headers = ['Name', 'Phone', 'Outcome', 'Duration (seconds)', 'Call date']
    const rows = results.map((result) => [
      result.contactName,
      result.contactPhone,
      result.outcome,
      result.duration,
      new Date(result.callStartedAt).toISOString(),
    ])
    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`).join(','))
      .join('\r\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `campaign-${id}-results.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const outcomes = [
    { label: 'Interested', value: results.filter((result) => result.outcome === 'interested').length },
    { label: 'Not Interested', value: results.filter((result) => result.outcome === 'not_interested').length },
    { label: 'Callback', value: results.filter((result) => result.outcome === 'callback').length },
    { label: 'No Answer', value: results.filter((result) => result.outcome === 'no_answer').length },
  ]

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
        <Button variant="outline" onClick={exportResults}>Export CSV</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {outcomes.map(({ label: outcome, value }) => (
          <div key={outcome} className="bg-[rgb(var(--color-card))] p-4 rounded-[var(--radius-md)] border border-[rgb(var(--color-border))]">
            <div className="text-sm font-semibold">{outcome}</div>
            <div className="text-2xl mt-1 text-[rgb(var(--color-primary))]">{value}</div>
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
            {results.map((res, idx) => (
              <tr key={idx} className="border-t border-[rgb(var(--color-border))]">
                <td className="p-4">{res.contactName}</td>
                <td className="p-4">{res.contactPhone}</td>
                <td className="p-4"><span className="bg-[rgb(var(--color-primary))] text-[rgb(var(--color-primary-foreground))] px-2 py-1 rounded-full text-xs">{res.outcome}</span></td>
                <td className="p-4">{formatDuration(res.duration || 120)}</td>
                <td className="p-4">{new Date(res.callStartedAt).toLocaleDateString()}</td>
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
              {selectedTranscript.transcript.map((message, index) => (
                <div key={`${selectedTranscript.id}-${index}`} className={cn("p-3 rounded-lg w-3/4", message.role === 'customer' ? "bg-[rgb(var(--color-primary))] text-[rgb(var(--color-primary-foreground))] ml-auto" : "bg-[rgb(var(--color-muted))]")}>
                  <p className="mb-1 text-xs font-semibold uppercase opacity-70">{message.role}</p>
                  {message.text}
                </div>
              ))}
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
