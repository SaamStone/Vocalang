'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { Button } from '@/components/shared/Button'
import { formatINR } from '@/lib/utils'

type DemoNumber = { id: string; number: string; type: 'Rented' | 'Owned'; verified: boolean; fee: number; campaigns: number }

export default function NumbersPage() {
  const [numbers, setNumbers] = useState<DemoNumber[]>([
    { id: '1', number: '+91 98765 43210', type: 'Rented', verified: true, fee: 500, campaigns: 2 },
    { id: '2', number: '+91 87654 32109', type: 'Owned', verified: true, fee: 0, campaigns: 1 },
  ])
  const [dialog, setDialog] = useState<'own' | 'rent' | null>(null)
  const [managedNumber, setManagedNumber] = useState<DemoNumber | null>(null)
  const [phone, setPhone] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const loadNumbers = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem('vocalang-demo-numbers')
        if (saved) setNumbers(JSON.parse(saved) as DemoNumber[])
      } catch (error) {
        console.error('Could not load demo phone numbers', error)
      }
    }, 0)
    return () => window.clearTimeout(loadNumbers)
  }, [])

  const saveNumbers = (updated: DemoNumber[]) => {
    setNumbers(updated)
    localStorage.setItem('vocalang-demo-numbers', JSON.stringify(updated))
  }

  const addOwnedNumber = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalized = phone.trim()
    if (!/^\+?[0-9 ()-]{8,20}$/.test(normalized)) {
      setNotice('Enter a valid phone number, including its country code.')
      return
    }
    saveNumbers([...numbers, { id: `number-${Date.now()}`, number: normalized, type: 'Owned', verified: false, fee: 0, campaigns: 0 }])
    setPhone('')
    setDialog(null)
    setNotice('Number added to the demo list. Real ownership verification requires a phone provider.')
  }

  const rentDemoNumber = () => {
    const newNumber: DemoNumber = { id: `number-${Date.now()}`, number: `+91 80${Math.floor(10000000 + Math.random() * 89999999)}`, type: 'Rented', verified: true, fee: 500, campaigns: 0 }
    saveNumbers([...numbers, newNumber])
    setDialog(null)
    setNotice(`${newNumber.number} was added as a demo rented number. No number was purchased.`)
  }

  return (
    <div className="space-y-8 text-[rgb(var(--color-foreground))] max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Phone Numbers</h1>
        <Button onClick={() => { setDialog('own'); setNotice('') }}>Add Number</Button>
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
                <td className={`p-4 text-sm font-medium ${num.verified ? 'text-green-500' : 'text-amber-600'}`}>{num.verified ? 'Verified' : 'Unverified'}</td>
                <td className="p-4">{formatINR(num.fee)}</td>
                <td className="p-4">{num.campaigns}</td>
                <td className="p-4">
                  <Button variant="ghost" size="sm" onClick={() => setManagedNumber(num)}>Manage</Button>
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
          <Button variant="outline" className="w-full" onClick={() => { setDialog('own'); setNotice('') }}>Verify a Number</Button>
        </div>
        <div className="bg-[rgb(var(--color-card))] p-6 rounded-[var(--radius-lg)] border border-[rgb(var(--color-border))]">
          <h3 className="text-lg font-bold text-[rgb(var(--color-primary))]">Rent a number</h3>
          <p className="text-[rgb(var(--color-muted-foreground))] mt-2 mb-6">Choose from available numbers in your region for your campaigns.</p>
          <Button className="w-full" onClick={() => { setDialog('rent'); setNotice('') }}>Browse Numbers</Button>
        </div>
      </div>
      {notice && <p role="status" className="text-sm text-[rgb(var(--color-muted-foreground))]">{notice}</p>}

      {dialog && (
        <div className="fixed inset-0 z-[var(--z-modal)] grid place-items-center bg-black/50 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDialog(null) }}>
          <section role="dialog" aria-modal="true" aria-labelledby="number-dialog-title" className="w-full max-w-md rounded-[var(--radius-lg)] bg-[rgb(var(--color-card))] p-6 shadow-[var(--shadow-xl)]">
            <h2 id="number-dialog-title" className="mb-4 text-xl font-semibold">{dialog === 'own' ? 'Add your phone number' : 'Rent a demo number'}</h2>
            {dialog === 'own' ? (
              <form onSubmit={addOwnedNumber} className="space-y-4">
                <label htmlFor="phone-number" className="block text-sm">Phone number</label>
                <input id="phone-number" autoFocus value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+91 98765 43210" className="w-full rounded-[var(--radius-sm)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] p-3" />
                {notice && <p role="alert" className="text-sm text-red-600">{notice}</p>}
                <p className="text-xs text-[rgb(var(--color-muted-foreground))]">Demo mode adds the number to this browser; provider verification is not connected.</p>
                <div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => setDialog(null)}>Cancel</Button><Button type="submit">Add Number</Button></div>
              </form>
            ) : (
              <div className="space-y-4"><p className="text-sm text-[rgb(var(--color-muted-foreground))]">Add a sample Indian number to preview number assignment. This does not reserve or purchase a real phone number.</p><div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setDialog(null)}>Cancel</Button><Button onClick={rentDemoNumber}>Add Demo Number</Button></div></div>
            )}
          </section>
        </div>
      )}

      {managedNumber && (
        <div className="fixed inset-0 z-[var(--z-modal)] grid place-items-center bg-black/50 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setManagedNumber(null) }}>
          <section role="dialog" aria-modal="true" aria-labelledby="manage-number-title" className="w-full max-w-md rounded-[var(--radius-lg)] bg-[rgb(var(--color-card))] p-6 shadow-[var(--shadow-xl)]">
            <h2 id="manage-number-title" className="mb-4 text-xl font-semibold">Manage {managedNumber.number}</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between"><dt>Type</dt><dd>{managedNumber.type}</dd></div>
              <div className="flex justify-between"><dt>Verification</dt><dd>{managedNumber.verified ? 'Verified' : 'Not verified'}</dd></div>
              <div className="flex justify-between"><dt>Monthly fee</dt><dd>{formatINR(managedNumber.fee)}</dd></div>
              <div className="flex justify-between"><dt>Assigned campaigns</dt><dd>{managedNumber.campaigns}</dd></div>
            </dl>
            <p className="my-4 text-xs text-[rgb(var(--color-muted-foreground))]">Number management is demo-only; telephony and ownership verification require a connected provider.</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setManagedNumber(null)}>Close</Button>
              {!managedNumber.verified && <Button onClick={() => {
                const updated = { ...managedNumber, verified: true }
                saveNumbers(numbers.map((item) => item.id === updated.id ? updated : item))
                setManagedNumber(updated)
                setNotice(`${updated.number} marked verified in the demo. No verification call was made.`)
              }}>Mark Verified (Demo)</Button>}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
