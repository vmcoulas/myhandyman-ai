/**
 * Email list service stub.
 * Wire this to Mailchimp, Resend, or another provider by implementing the
 * addSubscriber function body and setting the appropriate env vars.
 */

export async function addSubscriber(email: string, firstName?: string | null): Promise<void> {
  if (!email) return;

  // TODO: replace stub with real provider integration
  // Example for Mailchimp: use MAILCHIMP_API_KEY + MAILCHIMP_LIST_ID
  // Example for Resend: use RESEND_API_KEY + RESEND_AUDIENCE_ID
  if (process.env.EMAIL_LIST_ENABLED === "true") {
    console.log(`[emailList] Would subscribe: ${email} (${firstName ?? ""})`);
  }
}
