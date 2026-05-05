export default function PrivacyChoices() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#1F4E79] mb-2">Privacy Choices</h1>
      <p className="text-sm text-muted-foreground mb-8">Effective Date: May 5, 2026 · Last Updated: May 5, 2026</p>

      <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed">
        <p>
          MyHandyman.ai (operated by <strong>MyAiga LLC</strong>) gives you direct control over the data we hold on your behalf.
          This page explains how to exercise the privacy rights available to you under U.S. state laws (including the CCPA / CPRA),
          GDPR where applicable, and Apple&apos;s App Store privacy requirements.
        </p>

        <h2 className="text-xl font-semibold text-[#1F4E79] mt-8">At MyHandyman, you can:</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Request a copy of your data</strong> &mdash; email{" "}
            <a href="mailto:support@myhandyman.ai?subject=Data%20Export%20Request" className="text-[#2FA3A0] hover:underline">
              support@myhandyman.ai
            </a>{" "}
            with the subject line <em>&ldquo;Data Export Request&rdquo;</em>.
          </li>
          <li>
            <strong>Delete your account and data</strong> &mdash; email{" "}
            <a href="mailto:support@myhandyman.ai?subject=Account%20Deletion" className="text-[#2FA3A0] hover:underline">
              support@myhandyman.ai
            </a>{" "}
            with the subject line <em>&ldquo;Account Deletion&rdquo;</em>, or use the in-app{" "}
            <a href="/tools" className="text-[#2FA3A0] hover:underline">Delete Account</a> button on the Tools page.
          </li>
          <li>
            <strong>Correct your data</strong> &mdash; email{" "}
            <a href="mailto:support@myhandyman.ai?subject=Data%20Correction" className="text-[#2FA3A0] hover:underline">
              support@myhandyman.ai
            </a>{" "}
            with the subject line <em>&ldquo;Data Correction&rdquo;</em>.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#1F4E79] mt-8">Response Time</h2>
        <p>
          We respond to all privacy requests within <strong>7 business days</strong>. For California residents, we honor CCPA / CPRA
          rights without requiring justification. For EU residents, GDPR rights apply when EU territories are enabled in your account.
        </p>

        <h2 className="text-xl font-semibold text-[#1F4E79] mt-8">What You Can Manage Directly</h2>
        <p>
          Some controls are immediate and don&apos;t require contacting us:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Clear your local repair history</strong> by clearing your browser&apos;s localStorage &mdash; this removes the
            anonymous user ID we use to track free-tier usage and saved repairs.
          </li>
          <li>
            <strong>Cancel a subscription</strong> at any time through your{" "}
            <a href="/tools" className="text-[#2FA3A0] hover:underline">Account &amp; Tools</a> page (web) or via your
            App Store / Google Play subscription settings (mobile).
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#1F4E79] mt-8">Verifying Your Identity</h2>
        <p>
          To protect your data, we may ask you to verify the email or anonymous user ID associated with your account before
          fulfilling a request. We will never ask for your password, payment details, or government ID to verify a privacy request.
        </p>

        <h2 className="text-xl font-semibold text-[#1F4E79] mt-8">Authorized Agents</h2>
        <p>
          If you would like an authorized agent to submit a request on your behalf, please include written authorization in your email
          to <a href="mailto:support@myhandyman.ai" className="text-[#2FA3A0] hover:underline">support@myhandyman.ai</a>. We will
          confirm directly with you before acting on the request.
        </p>

        <h2 className="text-xl font-semibold text-[#1F4E79] mt-8">Right to Non-Discrimination</h2>
        <p>
          We will not deny you access to MyHandyman.ai, charge you a different price, or provide a lower-quality service because you
          exercised a privacy right.
        </p>

        <h2 className="text-xl font-semibold text-[#1F4E79] mt-8">More Information</h2>
        <p>
          For full details on what we collect, how we use it, and how it&apos;s shared, see our{" "}
          <a href="/privacy" className="text-[#2FA3A0] hover:underline">Privacy Policy</a> and{" "}
          <a href="/terms" className="text-[#2FA3A0] hover:underline">Terms of Service</a>.
        </p>

        <h2 className="text-xl font-semibold text-[#1F4E79] mt-8">Contact</h2>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:support@myhandyman.ai" className="text-[#2FA3A0] hover:underline">support@myhandyman.ai</a>
        </p>
        <p>
          <strong>MyAiga LLC</strong>
          <br />
          Palm Beach County, FL
        </p>
      </div>
    </div>
  );
}
