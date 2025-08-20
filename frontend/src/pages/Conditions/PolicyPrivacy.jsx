import React from 'react';

const PolicyPrivacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="mb-4">
        At Book Haven, your privacy is important to us. This privacy policy outlines how we collect, use, and safeguard your personal information when you use our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Personal details such as name, email address, and shipping information.</li>
        <li>Payment information (handled securely via third-party providers).</li>
        <li>Browsing and order history on our site.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>To process orders and deliver products.</li>
        <li>To provide customer support and respond to inquiries.</li>
        <li>To send promotional emails and updates (only if you opt in).</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Security</h2>
      <p className="mb-4">
        We use industry-standard measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Services</h2>
      <p className="mb-4">
        We may use third-party services (like payment gateways or analytics tools) that have their own privacy policies.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
      <p className="mb-4">
        You have the right to access, update, or delete your personal information. Contact us if you wish to do so.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Changes to This Policy</h2>
      <p className="mb-4">
        We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date.
      </p>

      <p className="mt-6">Effective Date: August 3, 2025</p>
    </div>
  );
};

export default PolicyPrivacy;
