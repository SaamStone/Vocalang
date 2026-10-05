'use client'

import { useEffect, useState } from 'react'
import { mockWalletApi } from '@/lib/mock-api/wallet'
import { Button } from '@/components/shared/Button'
import { formatINR, cn } from '@/lib/utils'
import type { Wallet } from '@/types'

export default function WalletPage() {
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await mockWalletApi.getWallet()
        setWallet(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="p-8 animate-pulse text-[rgb(var(--color-foreground))]">Loading wallet...</div>
  }

  const balance = wallet?.balance || 0
  const isLowBalance = balance < 500

  return (
    <div className="space-y-8 text-[rgb(var(--color-foreground))] max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">Wallet & Billing</h1>

      {isLowBalance && (
        <div className="bg-red-500/10 text-red-500 border border-red-500/20 p-4 rounded-[var(--radius-md)] flex items-center justify-between">
          <span>Your balance is low. Please top up to keep your campaigns running.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[rgb(var(--color-card))] p-8 rounded-[var(--radius-lg)] border border-[rgb(var(--color-border))] shadow-[var(--shadow-md)]">
          <div className="text-[rgb(var(--color-muted-foreground))] mb-2">Available Balance</div>
          <div className="text-5xl font-bold text-[rgb(var(--color-primary))]">{formatINR(balance)}</div>
          
          <div className="mt-8 space-y-4">
            <h3 className="font-semibold">Quick Top-Up</h3>
            <div className="flex gap-2 flex-wrap">
              {[500, 1000, 2000, 5000].map(amt => (
                <button key={amt} className="px-4 py-2 border border-[rgb(var(--color-border))] rounded-[var(--radius-sm)] hover:border-[rgb(var(--color-primary))] hover:text-[rgb(var(--color-primary))] transition-colors">
                  {formatINR(amt)}
                </button>
              ))}
              <button className="px-4 py-2 border border-[rgb(var(--color-border))] rounded-[var(--radius-sm)] hover:border-[rgb(var(--color-primary))] transition-colors">Custom</button>
            </div>
            <div className="pt-4">
              <Button size="lg" className="w-full">Proceed to Pay</Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[rgb(var(--color-card))] p-6 rounded-[var(--radius-lg)] border border-[rgb(var(--color-border))]">
            <h3 className="font-semibold mb-4">Payment Method</h3>
            <div className="space-y-3">
              {['UPI', 'Credit/Debit Card', 'Net Banking'].map(method => (
                <label key={method} className="flex items-center gap-3 p-3 border border-[rgb(var(--color-border))] rounded-[var(--radius-sm)] cursor-pointer hover:bg-[rgb(var(--color-muted))]">
                  <input type="radio" name="payment-method" className="accent-[rgb(var(--color-primary))]" />
                  <span>{method}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[rgb(var(--color-card))] rounded-[var(--radius-lg)] border border-[rgb(var(--color-border))] overflow-hidden">
        <div className="p-6 border-b border-[rgb(var(--color-border))] flex justify-between items-center">
          <h2 className="text-xl font-semibold">Transaction History</h2>
        </div>
        <table className="w-full text-left">
          <thead className="bg-[rgb(var(--color-muted))] text-[rgb(var(--color-muted-foreground))]">
            <tr>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Description</th>
              <th className="p-4 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {(wallet?.transactions || []).map((tx, idx) => (
              <tr key={idx} className="border-t border-[rgb(var(--color-border))]">
                <td className="p-4">{new Date(tx.createdAt).toLocaleDateString()}</td>
                <td className="p-4">{tx.description}</td>
                <td className={cn("p-4 font-semibold", tx.amount > 0 ? "text-green-500" : "text-red-500")}>
                  {tx.amount > 0 ? '+' : ''}{formatINR(tx.amount)}
                </td>
              </tr>
            ))}
            {(!wallet?.transactions || wallet.transactions.length === 0) && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-[rgb(var(--color-muted-foreground))]">No transactions yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
