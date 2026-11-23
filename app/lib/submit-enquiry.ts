export type EnquirySubmission = {
  enquiryType: "callback" | "contact";
  fullName: string;
  phone: string;
  email: string;
  service: string;
  sourcePage: string;
  message?: string;
  website?: string;
};

const wait = (milliseconds: number) => new Promise(resolve => window.setTimeout(resolve, milliseconds));

export async function submitEnquiry(submission: EnquirySubmission) {
  const submissionKey = crypto.randomUUID();
  const request = () => fetch("/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    cache: "no-store",
    keepalive: true,
    body: JSON.stringify({ ...submission, submissionKey }),
  });

  let response: Response;
  try {
    response = await request();
  } catch {
    await wait(650);
    response = await request();
  }

  if (!response.ok) {
    const result = await response.json().catch(() => null) as { error?: string } | null;
    throw new Error(result?.error || "We could not submit your request. Please try again or call us directly.");
  }

  return response.json().catch(() => ({ ok: true }));
}
