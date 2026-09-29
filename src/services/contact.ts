// This is Web3Forms' public form identifier, not a secret API credential.
const ACCESS_KEY = "be450410-8797-4e71-aca1-20a023fe0d12";
export const CONTACT_COOLDOWN_MS = 60_000;
const STORAGE_KEY = "jothivasan-contact-last-submit";

export function readLastSubmission(): number {
  try {
    const value = Number(window.localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(value) ? value : 0;
  } catch {
    return 0;
  }
}

export function rememberSubmission(time: number): void {
  // Storage can be unavailable in private browsing. A delivered note is still a success.
  try { window.localStorage.setItem(STORAGE_KEY, String(time)); } catch { /* optional persistence */ }
}

export async function sendContactMessage(payload: FormData, signal: AbortSignal): Promise<void> {
  payload.set("access_key", ACCESS_KEY);
  payload.set("subject", "New portfolio enquiry");
  payload.set("from_name", "jothivasan.dev");
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: payload,
    signal,
  });
  const data: unknown = await response.json();
  if (!response.ok || !data || typeof data !== "object" || !("success" in data) || data.success !== true) {
    throw new Error("The message could not be sent.");
  }
}
