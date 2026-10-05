'use client'

import { Button } from '@/components/shared/Button'
import { formatINR } from '@/lib/utils'

export default function NumbersPage() {
  const numbers = [
    { id: '1', number: '+91 98765 43210', type: 'Rented', verified: true, fee: 500, campaigns: 2 },
    { id: '2', number: '+91 87654 32109', type: 'Owned', verified: true, fee: 0, campaigns: 1 },
  ]

  return (
    <div className="space-y-8 text-[rgb(var(--color-foreground))] max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Phone Numbers</h1>
        <Button>Add Number</Button>
      </div>

      <div className="bg-[rgb(var(--color-card))] rounded-[var(--radius-lg)] border border-[rgb(var(--color-border))] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[rgb(var(--color-muted))] text-[rgb(var(--color-muted-foreground))]">
            <tr>
              <th className="p-4 font-medium">Number</th>
              <th className="p-4 font-medium">Type</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Monthly Fee</th>
              <th className="p-4 font-medium">Assigned Campaigns</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {numbers.map((num) => (
              <tr key={num.id} className="border-t border-[rgb(var(--color-border))]">
                <td className="p-4 font-semibold">{num.number}</td>
                <td className="p-4">
                  <span className="bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-secondary-foreground))] px-2 py-1 rounded-full text-xs font-medium">
                    {num.type}
                  </span>
                </td>
                <td className="p-4 text-green-500 text-sm font-medium">Verified</td>
                <td className="p-4">{formatINR(num.fee)}</td>
                <td className="p-4">{num.campaigns}</td>
                <td className="p-4">
                  <Button variant="ghost" size="sm">Manage</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold mt-12 mb-4">Add a new number</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[rgb(var(--color-card))] p-6 rounded-[var(--radius-lg)] border border-[rgb(var(--color-border))]">
          <h3 className="text-lg font-bold text-[rgb(var(--color-primary))]">Use your own number</h3>
          <p className="text-[rgb(var(--color-muted-foreground))] mt-2 mb-6">Connect your existing phone number to Vocalang by verifying ownership.</p>
          <Button variant="outline" className="w-full">Verify a Number</Button>
        </div>
        <div className="bg-[rgb(var(--color-card))] p-6 rounded-[var(--radius-lg)] border border-[rgb(var(--color-border))]">
          <h3 className="text-lg font-bold text-[rgb(var(--color-primary))]">Rent a number</h3>
          <p className="text-[rgb(var(--color-muted-foreground))] mt-2 mb-6">Choose from available numbers in your region for your campaigns.</p>
          <Button className="w-full">Browse Numbers</Button>
        </div>
      </div>
    </div>
  )
}
