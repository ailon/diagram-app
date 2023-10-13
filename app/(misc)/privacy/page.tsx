import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

type Props = {};

const PrivacyPage = (props: Props) => {
  return (
    <ScrollArea className="flex flex-1 p-4">
      <h1>Privacy policy</h1>
      <p>
        This is the privacy policy for the website Diagrams, developed by Alan
        Mendelevich. This policy explains how we collect, use and protect your
        information when you visit our website.
      </p>

      <p>
        We do not use any cookies or store any personal user data on our
        servers. We respect your privacy and do not track you across the web.
      </p>

      <p>
        We use <a href="https://plausible.io/">Plausible Analytics</a> for
        analytics purposes. Plausible Analytics is a privacy-friendly and
        GDPR-compliant alternative to Google Analytics. It does not collect any
        personal or identifiable information, such as IP addresses, from
        visitors. It only collects aggregated and anonymized data, such as the
        number of page views, the referral source, the device type, the browser
        and the country of origin. You can opt out of Plausible Analytics by
        using the &quot;Do Not Track&quot; setting in your browser.
      </p>

      <p>
        We may update this policy from time to time to reflect changes in our
        practices or the law. We will notify you of any material changes by
        posting a notice on our website.
      </p>

      <p>
        If you have any questions or concerns about this policy, please contact
        us at <a href="mailto:info@markerjs.com">info@markerjs.com</a>.
      </p>
    </ScrollArea>
  );
};

export default PrivacyPage;
