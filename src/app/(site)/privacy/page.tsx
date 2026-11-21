import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { event } from "@/config/event";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How CircuitX'26 collects, uses and protects personal data.",
};

export default function Privacy() {
  const email = event.contact.email;
  return (
    <LegalPage
      title="Privacy Policy"
      intro="What we collect, why we collect it and how we look after it."
      updated="21 November 2026"
    >
      <h2>1. Who we are</h2>
      <p>
        CircuitX&apos;26 is a 16-hour overnight hackathon organised by {event.organisers.map((o) => o.name).join(" and ")} at {event.institution} ({event.institutionShort}), Bengaluru. This policy covers the website at circuitx26.vercel.app and the forms and tools that run on it.
      </p>

      <h2>2. What we collect</h2>
      <p><b>Visitors to the website.</b> We use privacy-friendly analytics (Vercel Web Analytics) to count page views and see which pages are used. It does not build a profile of you.</p>
      <p><b>Organising team members.</b> When a member of the organising team fills in the team form, we collect:</p>
      <ul>
        <li>Name and email address, provided by your Google account when you sign in</li>
        <li>University Seat Number (USN) and phone number</li>
        <li>A photo that you upload yourself</li>
        <li>The team you belong to and your designation</li>
        <li>Optional details: LinkedIn, Instagram or GitHub links, branch, year of study and T-shirt size</li>
      </ul>
      <p><b>Participants.</b> Registration and idea submission for the hackathon take place on Unstop. Unstop&apos;s own privacy policy applies to what you give them. We may receive your registration details from Unstop to run the event.</p>
      <p><b>Administrators.</b> Authorised organisers who manage the website sign in with Google. We store their email address and the permissions they have been given.</p>

      <h2>3. Google user data</h2>
      <p>
        When you choose to sign in with Google, we request only your basic profile information: your name and email address. We do not access your Gmail, Google Drive, contacts, calendar or any other Google data.
      </p>
      <ul>
        <li>We use your Google name and email only to identify you, to pre-fill the team form and to let you sign in again later.</li>
        <li>We do not sell Google user data, use it for advertising or share it with third parties except the service providers listed below that run the website for us.</li>
        <li>We do not use Google user data to train artificial intelligence or machine learning models.</li>
      </ul>

      <h2>4. How we use your information</h2>
      <ul>
        <li>To organise CircuitX&apos;26: coordinating the organising team, onboarding participants and managing logistics</li>
        <li>To contact you about the event</li>
        <li>To show the organising team on the website, only for members the admins have approved. We publish name, photo, team and designation, and a social link only if you provided one.</li>
        <li>To keep the website secure and prevent misuse</li>
      </ul>
      <p>Your phone number, USN and email address are never shown publicly.</p>

      <h2>5. Where your data is stored and who can see it</h2>
      <p>
        Data is stored with our service providers: <b>Supabase</b> (database, authentication and private file storage), <b>Vercel</b> (website hosting and analytics) and <b>Google</b> (sign-in). Uploaded photos are kept in a private store. Only authorised organisers with the right permission can view submitted details. Access rules are enforced on the server and in the database.
      </p>
      <p>We do not sell your personal data.</p>

      <h2>6. How long we keep it</h2>
      <p>
        We keep organiser and participant data while CircuitX&apos;26 is being organised and for a reasonable period afterwards for records and for planning future editions. After that we delete or anonymise it. You can ask us to delete your data earlier at any time.
      </p>

      <h2>7. Your rights</h2>
      <p>
        You can ask us to show you the data we hold about you, correct it, or delete it. You can also withdraw your consent for us to display your details on the Team page. To do any of these, write to <a href={`mailto:${email}`}>{email}</a>. We handle requests in line with applicable Indian law, including the Digital Personal Data Protection Act, 2023.
      </p>

      <h2>8. Children</h2>
      <p>The event is for college and university students. The website is not directed at children under 13, and we do not knowingly collect their data.</p>

      <h2>9. Changes to this policy</h2>
      <p>We may update this policy as the event and website change. The date at the top shows when it was last revised.</p>

      <h2>10. Contact</h2>
      <p>Questions about this policy: <a href={`mailto:${email}`}>{email}</a>.</p>
    </LegalPage>
  );
}
