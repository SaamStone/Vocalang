'use client'

import { useState } from 'react'
import { Button } from '@/components/shared/Button'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="space-y-8 text-[rgb(var(--color-foreground))] max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="flex border-b border-[rgb(var(--color-border))]">
        {['profile', 'security', 'notifications'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium capitalize ${activeTab === tab ? 'border-b-2 border-[rgb(var(--color-primary))] text-[rgb(var(--color-primary))]' : 'text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))]'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-[rgb(var(--color-card))] p-8 rounded-[var(--radius-lg)] border border-[rgb(var(--color-border))] shadow-[var(--shadow-sm)]">
        {activeTab === 'profile' && (
          <form className="space-y-6 max-w-lg" onSubmit={e => e.preventDefault()}>
            <h2 className="text-xl font-bold mb-4">Profile Information</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <input type="text" defaultValue="John Doe" className="w-full p-2 border border-[rgb(var(--color-border))] rounded-[var(--radius-sm)] bg-[rgb(var(--color-background))]" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Business Name</label>
              <input type="text" defaultValue="Acme Corp" className="w-full p-2 border border-[rgb(var(--color-border))] rounded-[var(--radius-sm)] bg-[rgb(var(--color-background))]" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[rgb(var(--color-muted-foreground))]">Email Address</label>
              <input type="email" readOnly defaultValue="john@acme.com" className="w-full p-2 border border-[rgb(var(--color-border))] rounded-[var(--radius-sm)] bg-[rgb(var(--color-muted))] text-[rgb(var(--color-muted-foreground))]" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[rgb(var(--color-muted-foreground))]">Phone Number</label>
              <input type="tel" readOnly defaultValue="+91 9876543210" className="w-full p-2 border border-[rgb(var(--color-border))] rounded-[var(--radius-sm)] bg-[rgb(var(--color-muted))] text-[rgb(var(--color-muted-foreground))]" />
            </div>

            <Button type="submit">Save Changes</Button>
          </form>
        )}

        {activeTab === 'security' && (
          <div className="space-y-8 max-w-lg">
            <div>
              <h2 className="text-xl font-bold mb-4">Change Password</h2>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <input type="password" placeholder="Current Password" className="w-full p-2 border border-[rgb(var(--color-border))] rounded-[var(--radius-sm)] bg-[rgb(var(--color-background))]" />
                <input type="password" placeholder="New Password" className="w-full p-2 border border-[rgb(var(--color-border))] rounded-[var(--radius-sm)] bg-[rgb(var(--color-background))]" />
                <input type="password" placeholder="Confirm New Password" className="w-full p-2 border border-[rgb(var(--color-border))] rounded-[var(--radius-sm)] bg-[rgb(var(--color-background))]" />
                <Button>Update Password</Button>
              </form>
            </div>
            
            <div className="pt-8 border-t border-[rgb(var(--color-border))]">
              <h2 className="text-xl font-bold mb-4">Two-Factor Authentication</h2>
              <div className="flex items-center justify-between">
                <span className="text-[rgb(var(--color-muted-foreground))]">Secure your account with 2FA.</span>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6 max-w-lg">
            <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
            {[
              { id: 'email', label: 'Email Notifications' },
              { id: 'sms', label: 'SMS Notifications' },
              { id: 'campaign', label: 'Campaign Completion Alerts' },
              { id: 'balance', label: 'Low Balance Alerts' },
            ].map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 border border-[rgb(var(--color-border))] rounded-[var(--radius-sm)]">
                <span className="font-medium">{item.label}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-[rgb(var(--color-muted))] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-primary))]"></div>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
