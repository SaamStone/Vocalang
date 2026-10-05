/* ============================================================
   MOCK API — Auth Service
   Simulates registration, login, verification, password reset.
   All data lives in memory (resets on page reload).
   ============================================================ */

import type { User, Session, PolicyAcceptance } from "@/types";
import { sleep } from "@/lib/utils";

const MOCK_DELAY = 800;

// In-memory user store
let mockUsers: User[] = [
  {
    id: "usr_demo_001",
    fullName: "Ravi Kumar",
    email: "ravi@example.com",
    phone: "+919876543210",
    businessName: "Skyline Realtors",
    industry: "real-estate",
    emailVerified: true,
    phoneVerified: true,
    businessVerified: true,
    businessVerificationStatus: "approved",
    createdAt: "2024-09-15T10:00:00Z",
    lastLoginAt: new Date().toISOString(),
    twoFactorEnabled: false,
    freeTrialUsed: true,
  },
];

let mockSession: Session | null = null;
const mockPolicyAcceptances: PolicyAcceptance[] = [];

export const mockAuthApi = {
  async register(data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    businessName: string;
    industry: string;
  }): Promise<{ success: boolean; userId: string; error?: string }> {
    await sleep(MOCK_DELAY);

    if (mockUsers.find((u) => u.email === data.email)) {
      return { success: false, userId: "", error: "Email already registered" };
    }
    if (mockUsers.find((u) => u.phone === data.phone)) {
      return { success: false, userId: "", error: "Phone number already registered" };
    }

    const user: User = {
      id: `usr_${Date.now()}`,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      businessName: data.businessName,
      industry: data.industry,
      emailVerified: false,
      phoneVerified: false,
      businessVerified: false,
      businessVerificationStatus: "not_submitted",
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      twoFactorEnabled: false,
      freeTrialUsed: false,
    };

    mockUsers.push(user);
    return { success: true, userId: user.id };
  },

  async verifyOtp(data: {
    userId: string;
    emailCode: string;
    phoneCode: string;
  }): Promise<{ success: boolean; error?: string }> {
    await sleep(MOCK_DELAY);

    // Mock: accept any 6-digit code
    if (data.emailCode.length !== 6 || data.phoneCode.length !== 6) {
      return { success: false, error: "Invalid code format" };
    }

    const user = mockUsers.find((u) => u.id === data.userId);
    if (!user) return { success: false, error: "User not found" };

    user.emailVerified = true;
    user.phoneVerified = true;

    // Auto-login after verification
    mockSession = {
      user,
      token: `tok_${Date.now()}`,
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
    };

    return { success: true };
  },

  async login(data: {
    emailOrPhone: string;
    password: string;
  }): Promise<{ success: boolean; session?: Session; error?: string }> {
    await sleep(MOCK_DELAY);

    const user = mockUsers.find(
      (u) => u.email === data.emailOrPhone || u.phone === data.emailOrPhone
    );

    if (!user) {
      return { success: false, error: "Invalid email/phone or password" };
    }

    if (!user.emailVerified || !user.phoneVerified) {
      return { success: false, error: "Please verify your email and phone first" };
    }

    // Mock: accept any password for demo (in real: argon2/bcrypt)
    user.lastLoginAt = new Date().toISOString();
    mockSession = {
      user,
      token: `tok_${Date.now()}`,
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
    };

    return { success: true, session: mockSession };
  },

  async logout(): Promise<void> {
    await sleep(300);
    mockSession = null;
  },

  async getSession(): Promise<Session | null> {
    return mockSession;
  },

  async getCurrentUser(): Promise<User | null> {
    return mockSession?.user ?? null;
  },

  async forgotPassword(email: string): Promise<{ success: boolean; error?: string }> {
    await sleep(MOCK_DELAY);
    const user = mockUsers.find((u) => u.email === email);
    // Always return success to not leak user existence
    return { success: true };
  },

  async acceptPolicy(acceptance: Omit<PolicyAcceptance, "acceptedAt" | "ip">): Promise<void> {
    await sleep(300);
    mockPolicyAcceptances.push({
      ...acceptance,
      acceptedAt: new Date().toISOString(),
      ip: "127.0.0.1",
    });
  },

  /** Auto-login with the demo account (for development) */
  async loginAsDemo(): Promise<Session> {
    const user = mockUsers[0]!;
    user.lastLoginAt = new Date().toISOString();
    mockSession = {
      user,
      token: `tok_demo_${Date.now()}`,
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
    };
    return mockSession;
  },
};
