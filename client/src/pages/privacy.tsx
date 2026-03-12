export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#1F4E79] mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Effective Date: March 1, 2026 · Last Updated: March 12, 2026</p>

      <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed">
        <p>MyHandyman.ai (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is operated by <strong>MyAiga LLC</strong>, based in Palm Beach County, Florida. This Privacy Policy describes how we collect, use, and protect your information when you use our AI-powered home repair assistant.</p>

        <h2 className="text-xl font-semibold text-[#1F4E79] mt-8">1. Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Anonymous User Identifiers:</strong> We generate a random anonymous ID stored in your browser&apos;s localStorage to track usage limits and repair history. We do not require registration or collect your name, email, or personal details to use the free tier.</li>
          <li><strong>Photos You Upload:</strong> When you upload a photo for repair analysis, the image is sent to our AI service (OpenAI) for processing. Photos are used solely to generate your repair guide and are not permanently stored on our servers after processing.</li>
          <li><strong>Text Descriptions:</strong> If you describe a repair issue via text input, that description is processed by our AI service to generate repair instructions.</li>
          <li><strong>Usage Data:</strong> We track the number of repair analyses you&apos;ve requested to manage free-tier usage limits.</li>
          <li><strong>Payment Information:</strong> If you subscribe to our premium plan, payment is processed securely through Stripe. We do not store your credit card information on our servers.</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#1F4E79] mt-8">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To generate AI-powered repair guides based on your photos or descriptions</li>
          <li>To manage usage limits and subscription status</li>
          <li>To improve the accuracy and quality of our repair recommendations</li>
          <li>To process subscription payments</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#1F4E79] mt-8">3. Amazon Associates &amp; Affiliate Disclosure</h2>
        <p>MyHandyman.ai is a participant in the <strong>Amazon Services LLC Associates Program</strong>, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. When you click &ldquo;Buy&rdquo; links for tools or materials in your repair guides, you will be directed to Amazon.com. We may earn a small commission on qualifying purchases at no additional cost to you.</p>

        <h2 className="text-xl font-semibold text-[#1F4E79] mt-8">4. Data Sharing</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>We do not sell your personal data.</strong></li>
          <li>Photos are sent to OpenAI for AI processing. OpenAI&apos;s data usage policies apply to this processing.</li>
          <li>Payment data is handled by Stripe under their privacy policy.</li>
          <li>We may share anonymized, aggregated usage statistics for analytics purposes.</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#1F4E79] mt-8">5. Data Retention</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Photos:</strong> Processed in real-time and not permanently stored after analysis is complete.</li>
          <li><strong>Repair Guides:</strong> Stored in our database linked to your anonymous user ID so you can access your repair history.</li>
          <li><strong>Anonymous IDs:</strong> Persist in your browser&apos;s localStorage until you clear your browser data.</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#1F4E79] mt-8">6. Your Rights</h2>
        <p>You can clear your repair history and anonymous ID at any time by clearing your browser&apos;s localStorage. Since we don&apos;t collect personal identifying information for free-tier users, there is no account to delete.</p>

        <h2 className="text-xl font-semibold text-[#1F4E79] mt-8">7. Cookies</h2>
        <p>We use localStorage (not cookies) to store your anonymous user ID and preferences. We do not use tracking cookies. Third-party services (Stripe, analytics) may use their own cookies subject to their respective policies.</p>

        <h2 className="text-xl font-semibold text-[#1F4E79] mt-8">8. Children&apos;s Privacy</h2>
        <p>MyHandyman.ai is not intended for use by children under 13. We do not knowingly collect information from children under 13.</p>

        <h2 className="text-xl font-semibold text-[#1F4E79] mt-8">9. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &ldquo;Last Updated&rdquo; date.</p>

        <h2 className="text-xl font-semibold text-[#1F4E79] mt-8">10. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, contact us at:</p>
        <p><strong>Email:</strong> <a href="mailto:support@myhandyman.ai" className="text-[#2FA3A0] hover:underline">support@myhandyman.ai</a></p>
        <p><strong>MyAiga LLC</strong><br />Palm Beach County, FL</p>
      </div>
    </div>
  );
}
