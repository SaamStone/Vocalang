/* ============================================================
   MOCK API — Wallet Service
   Simulates wallet operations, top-ups, and invoices.
   ============================================================ */

import type { Wallet, WalletTransaction, Invoice, PaymentMethod } from "@/types";
import { sleep } from "@/lib/utils";

const MOCK_DELAY = 600;

const mockTransactions: WalletTransaction[] = [
  {
    id: "txn_001",
    type: "top_up",
    amount: 5000,
    balanceAfter: 5000,
    description: "Initial wallet top-up",
    paymentMethod: "upi",
    invoiceId: "inv_001",
    createdAt: new Date(Date.now() - 2592000000).toISOString(),
  },
  {
    id: "txn_002",
    type: "campaign_charge",
    amount: -525,
    balanceAfter: 4475,
    description: "October Lead Follow-up — 350 minutes",
    campaignId: "camp_active_001",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "txn_003",
    type: "campaign_charge",
    amount: -225,
    balanceAfter: 4250,
    description: "September Admissions Drive — ongoing",
    campaignId: "camp_completed_001",
    createdAt: new Date(Date.now() - 604800000).toISOString(),
  },
];

const mockInvoices: Invoice[] = [
  {
    id: "inv_001",
    number: "VL-2024-0001",
    amount: 4237,
    gst: 763,
    total: 5000,
    status: "paid",
    createdAt: new Date(Date.now() - 2592000000).toISOString(),
    downloadUrl: "#mock-invoice",
  },
];

let walletBalance = 4250;

export const mockWalletApi = {
  async getWallet(): Promise<Wallet> {
    await sleep(MOCK_DELAY);
    return {
      balance: walletBalance,
      currency: "INR",
      lastTopUpAt: mockTransactions.find((t) => t.type === "top_up")?.createdAt,
      transactions: [...mockTransactions].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    };
  },

  async topUp(data: {
    amount: number;
    paymentMethod: PaymentMethod;
  }): Promise<{ success: boolean; transaction: WalletTransaction; error?: string }> {
    await sleep(MOCK_DELAY * 2);

    if (data.amount < 500) {
      return {
        success: false,
        transaction: {} as WalletTransaction,
        error: "Minimum top-up amount is ₹500",
      };
    }

    walletBalance += data.amount;
    const transaction: WalletTransaction = {
      id: `txn_${Date.now()}`,
      type: "top_up",
      amount: data.amount,
      balanceAfter: walletBalance,
      description: `Wallet top-up via ${data.paymentMethod.toUpperCase()}`,
      paymentMethod: data.paymentMethod,
      invoiceId: `inv_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    mockTransactions.unshift(transaction);

    const gst = Math.round(data.amount * 0.18);
    mockInvoices.unshift({
      id: transaction.invoiceId!,
      number: `VL-2024-${String(mockInvoices.length + 1).padStart(4, "0")}`,
      amount: data.amount - gst,
      gst,
      total: data.amount,
      status: "paid",
      createdAt: new Date().toISOString(),
      downloadUrl: "#mock-invoice",
    });

    return { success: true, transaction };
  },

  async getInvoices(): Promise<Invoice[]> {
    await sleep(MOCK_DELAY);
    return [...mockInvoices];
  },

  async getBalance(): Promise<number> {
    return walletBalance;
  },
};
