import Seo from "../components/Seo.jsx";

export default function Privacy() {
  return (
    <section className="section">
      <Seo
        title="Privacy Policy"
        description="Learn how JOSHEM Cleaning Services collects, uses, and protects your information."
        canonical="https://joshemcleaning.com/privacy"
      />
      <div className="container">
        <div className="section-head">
          <h1>Privacy Policy</h1>
          <p>Last updated: March 15, 2026</p>
        </div>

        <p>
          JOSHEM Cleaning Services respects your privacy. This policy explains what information we
          collect, how we use it, and the choices you have.
        </p>

        <h2>Information We Collect</h2>
        <ul>
          <li>Account details such as name, email, and phone number.</li>
          <li>Booking details such as service type, address, and preferred time.</li>
          <li>Payment information, when you complete a payment.</li>
          <li>Usage data such as pages visited and actions taken on the website.</li>
          <li>Support messages and communication history.</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To create and manage bookings and service requests.</li>
          <li>To send status updates, confirmations, and notifications.</li>
          <li>To provide customer support and resolve issues.</li>
          <li>To improve our services, website performance, and user experience.</li>
          <li>To comply with legal and regulatory requirements.</li>
        </ul>

        <h2>Sharing of Information</h2>
        <p>We do not sell your personal information. We may share data only when necessary:</p>
        <ul>
          <li>With service providers who help us deliver bookings, payments, and notifications.</li>
          <li>With cleaners assigned to your order, limited to service delivery needs.</li>
          <li>When required by law or to protect our legal rights.</li>
        </ul>

        <h2>Data Retention</h2>
        <p>
          We retain your information only as long as necessary to deliver services, meet legal
          obligations, and resolve disputes.
        </p>

        <h2>Security</h2>
        <p>
          We use technical and organizational safeguards to protect your data, including access
          controls, secure authentication, and encrypted communications where available.
        </p>

        <h2>Your Choices</h2>
        <ul>
          <li>You can request to update or correct your account details.</li>
          <li>You can request deletion of your account, subject to legal obligations.</li>
          <li>You can opt out of non-essential notifications.</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this policy, contact us at{" "}
          <a href="mailto:joshemcleaners@gmail.com">joshemcleaners@gmail.com</a>.
        </p>
      </div>
    </section>
  );
}
