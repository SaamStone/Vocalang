"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { WizardState, ColumnMapping } from "@/types";
import { mockCampaignApi } from "@/lib/mock-api/campaigns";
import { mockWalletApi } from "@/lib/mock-api/wallet";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/Button";
import {
  UploadCloud,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
  SkipForward,
  ChevronRight,
  ChevronLeft,
  Banknote,
} from "lucide-react";

const STEPS = [
  "Upload File",
  "Map Columns",
  "Review",
  "Configure",
  "Confirm & Start",
];

function StepProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isPast = stepNum < currentStep;

          return (
            <div key={step} className="flex flex-col items-center relative z-10">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors duration-300",
                  isActive
                    ? "bg-[rgb(var(--color-primary))] text-white shadow-[var(--shadow-md)]"
                    : isPast
                    ? "bg-[rgb(var(--color-primary))] text-white"
                    : "bg-[rgb(var(--color-muted))] text-[rgb(var(--color-muted-foreground))]"
                )}
              >
                {isPast ? <CheckCircle className="w-5 h-5" /> : stepNum}
              </div>
              <span
                className={cn(
                  "mt-2 text-sm font-medium",
                  isActive
                    ? "text-[rgb(var(--color-foreground))]"
                    : "text-[rgb(var(--color-muted-foreground))]"
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
      <div className="relative mt-[-2rem] mb-[2rem] z-0 px-5">
        <div className="h-1 w-full bg-[rgb(var(--color-muted))] rounded-full">
          <div
            className="h-1 bg-[rgb(var(--color-primary))] rounded-full transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function CampaignWizardPage() {
  const router = useRouter();

  const [state, setState] = useState<WizardState>({
    step: 1,
    campaignName: "",
    industry: siteConfig.industries[0].slug,
    language: siteConfig.supportedVoiceLanguages[0],
    voice: "female",
    simultaneousAgents: 2,
    callingWindowStart: siteConfig.callingDefaults.windowStart,
    callingWindowEnd: siteConfig.callingDefaults.windowEnd,
    maxRetries: siteConfig.callingDefaults.maxRetries,
  });

  const estimate = useMemo(() => {
    const totalContacts = state.cleanedContacts?.valid;
    if (!totalContacts) return undefined;

    return mockCampaignApi.calculateEstimate({
      totalContacts,
      simultaneousAgents: state.simultaneousAgents,
      callingWindowStart: state.callingWindowStart,
      callingWindowEnd: state.callingWindowEnd,
      maxRetries: state.maxRetries,
    });
  }, [
    state.cleanedContacts?.valid,
    state.simultaneousAgents,
    state.callingWindowStart,
    state.callingWindowEnd,
    state.maxRetries,
  ]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [mappingError, setMappingError] = useState("");
  const [startError, setStartError] = useState("");
  const [walletBalance, setWalletBalance] = useState(4250);

  useEffect(() => {
    mockWalletApi.getBalance().then(setWalletBalance).catch((error) => {
      console.error("Could not load demo wallet balance", error);
    });
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to update state
  const updateState = (updates: Partial<WizardState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => updateState({ step: Math.min(5, state.step + 1) });
  const prevStep = () => updateState({ step: Math.max(1, state.step - 1) });

  // -------------------------------------------------------------
  // Step 1: Upload Logic
  // -------------------------------------------------------------
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setUploadError("Please upload a CSV file. Excel and PDF parsing are not connected in this demo.");
      updateState({ file: undefined, fileName: undefined });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("The CSV must be smaller than 10 MB.");
      updateState({ file: undefined, fileName: undefined });
      return;
    }
    setUploadError("");
    updateState({ file, fileName: file.name });
  };

  const handleUploadSubmit = async () => {
    if (!state.file) return;
    setIsProcessing(true);
    try {
      const res = await mockCampaignApi.parseUploadedFile(state.file);
      const initialMappings: ColumnMapping[] = res.headers.map((h) => {
        let targetField: ColumnMapping["targetField"] = "skip";
        const hLow = h.toLowerCase();
        if (hLow.includes("name")) targetField = "name";
        else if (hLow.includes("phone") || hLow.includes("mobile"))
          targetField = "phone";
        else if (hLow.includes("email")) targetField = "email";
        return { sourceColumn: h, targetField };
      });
      updateState({
        parsedHeaders: res.headers,
        parsedRows: res.rows,
        parsedTotalRows: res.totalRows,
        columnMappings: initialMappings,
      });
      nextStep();
    } catch (err) {
      console.error("Upload error", err);
      setUploadError(err instanceof Error ? err.message : "The CSV could not be read.");
    } finally {
      setIsProcessing(false);
    }
  };

  // -------------------------------------------------------------
  // Step 2: Mapping Logic
  // -------------------------------------------------------------
  const handleMappingChange = (
    index: number,
    targetField: ColumnMapping["targetField"]
  ) => {
    if (!state.columnMappings) return;
    const newMappings = [...state.columnMappings];
    newMappings[index] = { ...newMappings[index], targetField };
    setMappingError("");
    updateState({ columnMappings: newMappings });
  };

  const hasPhoneMapped = state.columnMappings?.some(
    (m) => m.targetField === "phone"
  );

  const handleMappingSubmit = () => {
    if (!hasPhoneMapped) {
      setMappingError("Map at least one column to Phone Number before continuing.");
      return;
    }
    if (!state.parsedTotalRows) {
      setMappingError("This CSV has no contact rows. Upload a file with at least one contact.");
      return;
    }
    setMappingError("");
    setIsProcessing(true);
    // Mock processing step for data cleaning
    setTimeout(() => {
      const totalRows = state.parsedTotalRows ?? state.parsedRows?.length ?? 0;
      updateState({
        cleanedContacts: {
          valid: totalRows > 0 ? Math.max(1, Math.floor(totalRows * 0.9)) : 0,
          duplicates: Math.floor(totalRows * 0.05),
          invalid: Math.floor(totalRows * 0.03),
          dndFiltered: Math.floor(totalRows * 0.02),
        },
      });
      setIsProcessing(false);
      nextStep();
    }, 600);
  };

  // -------------------------------------------------------------
  // Step 5: Confirm Logic
  // -------------------------------------------------------------
  const handleStartCampaign = async () => {
    if (!state.campaignName) {
      alert("Please provide a campaign name before starting.");
      return;
    }
    setIsProcessing(true);
    try {
      const camp = await mockCampaignApi.createCampaign({ ...state, estimate });
      router.push(`/dashboard/campaigns/${camp.id}`);
    } catch (err) {
      console.error(err);
      setStartError(err instanceof Error ? err.message : "Could not create the campaign.");
      setIsProcessing(false);
    }
  };

  // =============================================================
  // Render Steps
  // =============================================================
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[rgb(var(--color-foreground))]">Upload Contacts</h2>
        <p className="text-[rgb(var(--color-muted-foreground))]">
          Upload a CSV file containing your contact list (maximum 10 MB).
        </p>
      </div>
      <div
        className={cn(
          "border-2 border-dashed rounded-[var(--radius-lg)] p-10 flex flex-col items-center justify-center space-y-4 transition-colors cursor-pointer",
          state.file
            ? "border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]/5"
            : "border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-primary))]/50 hover:bg-[rgb(var(--color-muted))]/50"
        )}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".csv,text/csv"
        />
        {state.file ? (
          <>
            <FileText className="w-12 h-12 text-[rgb(var(--color-primary))]" />
            <div className="text-center">
              <p className="font-semibold text-[rgb(var(--color-foreground))]">{state.file.name}</p>
              <p className="text-sm text-[rgb(var(--color-muted-foreground))]">
                {(state.file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </>
        ) : (
          <>
            <UploadCloud className="w-12 h-12 text-[rgb(var(--color-muted-foreground))]" />
            <div className="text-center">
              <p className="font-semibold text-[rgb(var(--color-foreground))]">
                Drag & drop your file here
              </p>
              <p className="text-sm text-[rgb(var(--color-muted-foreground))]">
                or click to browse from your computer
              </p>
            </div>
          </>
        )}
      </div>
      {uploadError && <p role="alert" className="text-sm text-red-600">{uploadError}</p>}
      <div className="flex justify-end pt-4 border-t border-[rgb(var(--color-border))]">
        <Button onClick={handleUploadSubmit} disabled={!state.file || isProcessing}>
          {isProcessing ? "Processing..." : "Next Step"} <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[rgb(var(--color-foreground))]">Map Columns</h2>
        <p className="text-[rgb(var(--color-muted-foreground))]">
          Match your file headers to the system fields.
        </p>
      </div>

      <div className="overflow-x-auto rounded-[var(--radius-md)] border border-[rgb(var(--color-border))]">
        <table className="w-full text-sm text-left">
          <thead className="bg-[rgb(var(--color-muted))] text-[rgb(var(--color-muted-foreground))] border-b border-[rgb(var(--color-border))]">
            <tr>
              <th className="px-4 py-3 font-medium">Your Header</th>
              <th className="px-4 py-3 font-medium">System Field</th>
              <th className="px-4 py-3 font-medium text-xs">Preview (Row 1)</th>
              <th className="px-4 py-3 font-medium text-xs">Preview (Row 2)</th>
            </tr>
          </thead>
          <tbody>
            {state.columnMappings?.map((mapping, idx) => (
              <tr
                key={mapping.sourceColumn}
                className="border-b border-[rgb(var(--color-border))] last:border-0 hover:bg-[rgb(var(--color-muted))]/30"
              >
                <td className="px-4 py-3 font-medium text-[rgb(var(--color-foreground))]">
                  {mapping.sourceColumn}
                </td>
                <td className="px-4 py-3">
                  <select
                    className="w-full p-2 rounded-[var(--radius-sm)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))]"
                    value={mapping.targetField}
                    onChange={(e) =>
                      handleMappingChange(idx, e.target.value as ColumnMapping["targetField"])
                    }
                  >
                    <option value="name">Name</option>
                    <option value="phone">Phone Number</option>
                    <option value="email">Email Address</option>
                    <option value="custom">Custom Field</option>
                    <option value="skip">Ignore / Skip</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-[rgb(var(--color-muted-foreground))] truncate max-w-[120px]">
                  {state.parsedRows?.[0]?.[mapping.sourceColumn] || "-"}
                </td>
                <td className="px-4 py-3 text-[rgb(var(--color-muted-foreground))] truncate max-w-[120px]">
                  {state.parsedRows?.[1]?.[mapping.sourceColumn] || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!hasPhoneMapped && (
        <div className="p-4 rounded-[var(--radius-md)] bg-red-50 text-red-600 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
                  You must map at least one column to &apos;Phone Number&apos;.
        </div>
      )}
      {mappingError && <p role="alert" className="text-sm text-red-600">{mappingError}</p>}

      <div className="flex justify-between pt-4 border-t border-[rgb(var(--color-border))]">
        <Button variant="outline" onClick={prevStep}>
          <ChevronLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={handleMappingSubmit} disabled={!hasPhoneMapped || isProcessing}>
          {isProcessing ? "Cleaning Data..." : "Next Step"} <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[rgb(var(--color-foreground))]">Review Cleaned List</h2>
        <p className="text-[rgb(var(--color-muted-foreground))]">
          We&apos;ve processed your contacts and removed invalid entries.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-[var(--radius-lg)] border border-green-200 bg-green-50">
          <div className="flex items-center text-green-700 font-semibold mb-2">
            <CheckCircle className="w-4 h-4 mr-2" /> Valid Contacts
          </div>
          <div className="text-3xl font-bold text-green-800">
            {state.cleanedContacts?.valid}
          </div>
        </div>
        <div className="p-4 rounded-[var(--radius-lg)] border border-yellow-200 bg-yellow-50">
          <div className="flex items-center text-yellow-700 font-semibold mb-2">
            <AlertTriangle className="w-4 h-4 mr-2" /> Duplicates
          </div>
          <div className="text-3xl font-bold text-yellow-800">
            {state.cleanedContacts?.duplicates}
          </div>
        </div>
        <div className="p-4 rounded-[var(--radius-lg)] border border-red-200 bg-red-50">
          <div className="flex items-center text-red-700 font-semibold mb-2">
            <XCircle className="w-4 h-4 mr-2" /> Invalid Numbers
          </div>
          <div className="text-3xl font-bold text-red-800">
            {state.cleanedContacts?.invalid}
          </div>
        </div>
        <div className="p-4 rounded-[var(--radius-lg)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-muted))]">
          <div className="flex items-center text-[rgb(var(--color-muted-foreground))] font-semibold mb-2">
            <SkipForward className="w-4 h-4 mr-2" /> DND Filtered
          </div>
          <div className="text-3xl font-bold text-[rgb(var(--color-foreground))]">
            {state.cleanedContacts?.dndFiltered}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-[rgb(var(--color-border))] mt-8">
        <Button variant="outline" onClick={prevStep}>
          <ChevronLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={nextStep}>
          Looks good <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[rgb(var(--color-foreground))]">Configure Campaign</h2>
        <p className="text-[rgb(var(--color-muted-foreground))]">
          Set up how and when your AI agents will call.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[rgb(var(--color-foreground))]">
              Campaign Name *
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]"
              placeholder="e.g. November Promo Follow-ups"
              value={state.campaignName}
              onChange={(e) => updateState({ campaignName: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[rgb(var(--color-foreground))]">
                Industry Template
              </label>
              <select
                className="w-full p-3 rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))]"
                value={state.industry}
                onChange={(e) => updateState({ industry: e.target.value })}
              >
                {siteConfig.industries.map((ind) => (
                  <option key={ind.slug} value={ind.slug}>
                    {ind.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[rgb(var(--color-foreground))]">
                Language
              </label>
              <select
                className="w-full p-3 rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))]"
                value={state.language}
                onChange={(e) => updateState({ language: e.target.value })}
              >
                {siteConfig.supportedVoiceLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[rgb(var(--color-foreground))]">
              Voice Character
            </label>
            <div className="flex gap-4">
              <label className="flex items-center p-3 border border-[rgb(var(--color-border))] rounded-[var(--radius-md)] cursor-pointer hover:bg-[rgb(var(--color-muted))]/30 flex-1">
                <input
                  type="radio"
                  name="voice"
                  value="female"
                  checked={state.voice === "female"}
                  onChange={() => updateState({ voice: "female" })}
                  className="mr-3 text-[rgb(var(--color-primary))]"
                />
                Female Voice
              </label>
              <label className="flex items-center p-3 border border-[rgb(var(--color-border))] rounded-[var(--radius-md)] cursor-pointer hover:bg-[rgb(var(--color-muted))]/30 flex-1">
                <input
                  type="radio"
                  name="voice"
                  value="male"
                  checked={state.voice === "male"}
                  onChange={() => updateState({ voice: "male" })}
                  className="mr-3 text-[rgb(var(--color-primary))]"
                />
                Male Voice
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[rgb(var(--color-foreground))]">
                Simultaneous Agents (1-10)
              </label>
              <input
                type="number"
                min="1"
                max="10"
                className="w-full p-3 rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))]"
                value={state.simultaneousAgents}
                onChange={(e) => updateState({ simultaneousAgents: parseInt(e.target.value) || 1 })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[rgb(var(--color-foreground))]">
                Max Retries (1-5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                className="w-full p-3 rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))]"
                value={state.maxRetries}
                onChange={(e) => updateState({ maxRetries: parseInt(e.target.value) || 1 })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[rgb(var(--color-foreground))]">
              Calling Window
            </label>
            <div className="flex items-center gap-4">
              <input
                type="time"
                className="flex-1 p-3 rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))]"
                value={state.callingWindowStart}
                onChange={(e) => updateState({ callingWindowStart: e.target.value })}
              />
              <span className="text-[rgb(var(--color-muted-foreground))]">to</span>
              <input
                type="time"
                className="flex-1 p-3 rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))]"
                value={state.callingWindowEnd}
                onChange={(e) => updateState({ callingWindowEnd: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="p-6 rounded-[var(--radius-lg)] border border-[rgb(var(--color-primary))]/20 bg-[rgb(var(--color-primary))]/5 space-y-4 sticky top-6">
            <h3 className="font-semibold text-lg text-[rgb(var(--color-foreground))]">Real-time Estimate</h3>
            <div className="space-y-3 divide-y divide-[rgb(var(--color-border))]">
              <div className="flex justify-between pt-3">
                <span className="text-[rgb(var(--color-muted-foreground))]">Total Contacts</span>
                <span className="font-semibold text-[rgb(var(--color-foreground))]">
                  {estimate?.totalContacts || 0}
                </span>
              </div>
              <div className="flex justify-between pt-3">
                <span className="text-[rgb(var(--color-muted-foreground))]">Est. Time Required</span>
                <span className="font-semibold text-[rgb(var(--color-foreground))]">
                  {estimate?.estimatedDuration || "-"}
                </span>
              </div>
              <div className="flex justify-between pt-3">
                <span className="text-[rgb(var(--color-muted-foreground))]">Finish By</span>
                <span className="font-semibold text-[rgb(var(--color-foreground))]">
                  {estimate?.estimatedFinishTime
                    ? new Date(estimate.estimatedFinishTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between pt-3">
                <span className="text-[rgb(var(--color-muted-foreground))]">Est. Cost</span>
                <span className="font-semibold text-[rgb(var(--color-primary))]">
                  ₹{estimate?.estimatedCost || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-[rgb(var(--color-border))] mt-8">
        <Button variant="outline" onClick={prevStep}>
          <ChevronLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={nextStep} disabled={!state.campaignName}>
          Review & Confirm <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderStep5 = () => {
    const cost = estimate?.estimatedCost || 0;
    const isInsufficientBalance = walletBalance < cost;

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[rgb(var(--color-foreground))]">Confirm & Start</h2>
          <p className="text-[rgb(var(--color-muted-foreground))]">
            Review your campaign details before launching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="p-6 rounded-[var(--radius-lg)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))]">
              <h3 className="font-semibold text-lg text-[rgb(var(--color-foreground))] mb-4">Summary</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[rgb(var(--color-muted-foreground))]">Campaign Name</dt>
                  <dd className="font-medium text-[rgb(var(--color-foreground))]">{state.campaignName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[rgb(var(--color-muted-foreground))]">Valid Contacts</dt>
                  <dd className="font-medium text-[rgb(var(--color-foreground))]">{state.cleanedContacts?.valid}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[rgb(var(--color-muted-foreground))]">Language / Voice</dt>
                  <dd className="font-medium text-[rgb(var(--color-foreground))]">{state.language} ({state.voice})</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[rgb(var(--color-muted-foreground))]">Agents</dt>
                  <dd className="font-medium text-[rgb(var(--color-foreground))]">{state.simultaneousAgents}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[rgb(var(--color-muted-foreground))]">Calling Window</dt>
                  <dd className="font-medium text-[rgb(var(--color-foreground))]">{state.callingWindowStart} - {state.callingWindowEnd}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-[var(--radius-lg)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))]">
              <h3 className="font-semibold text-lg text-[rgb(var(--color-foreground))] mb-4 flex items-center">
                <Banknote className="w-5 h-5 mr-2" /> Cost & Billing
              </h3>
              <dl className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <dt className="text-[rgb(var(--color-muted-foreground))]">Estimated Cost</dt>
                  <dd className="font-bold text-lg text-[rgb(var(--color-foreground))]">₹{cost}</dd>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-[rgb(var(--color-border))]">
                  <dt className="text-[rgb(var(--color-muted-foreground))]">Wallet Balance</dt>
                  <dd className="font-medium text-[rgb(var(--color-foreground))]">₹{walletBalance}</dd>
                </div>
              </dl>

              {isInsufficientBalance && (
                <div className="p-4 rounded-[var(--radius-md)] bg-red-50 text-red-600 flex items-start mb-4">
                  <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 shrink-0" />
                  <p className="text-sm">
                    Insufficient wallet balance. You need ₹{cost - walletBalance} more to run this campaign fully. It will pause when balance runs out.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t border-[rgb(var(--color-border))] mt-8">
          <Button variant="outline" onClick={prevStep}>
            <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button onClick={handleStartCampaign} disabled={isProcessing}>
            {isProcessing ? "Starting..." : "Start Campaign"}
          </Button>
        </div>
        {startError && <p role="alert" className="mt-4 text-sm text-red-600">{startError}</p>}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <StepProgressBar currentStep={state.step} />
      <div className="bg-[rgb(var(--color-card))] rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] border border-[rgb(var(--color-border))] p-6 md:p-10">
        {state.step === 1 && renderStep1()}
        {state.step === 2 && renderStep2()}
        {state.step === 3 && renderStep3()}
        {state.step === 4 && renderStep4()}
        {state.step === 5 && renderStep5()}
      </div>
    </div>
  );
}
