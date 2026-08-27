export type PolicyId = "privacy" | "cookies" | "terms";

export const POLICY_TABS: { id: PolicyId; label: string }[] = [
  { id: "privacy", label: "Privacy Policy" },
  { id: "cookies", label: "Cookies Policy" },
  { id: "terms", label: "Terms of Service" },
];

type PolicyBlock = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  after?: string[];
};

export type PolicyDoc = {
  heading: string;
  updated: string;
  intro: string;
  sections: PolicyBlock[];
};

export const POLICIES: Record<PolicyId, PolicyDoc> = {
  privacy: {
    heading: "Introduction",
    updated: "Last Updated: 18 August 2026",
    intro:
      "At ZurichTech, we value your privacy and are committed to protecting the information you provide while using our Electronic Document Management System (EDMS). This Privacy Policy explains what information we collect, how we use it, how we protect it, and the choices available to you.",
    sections: [
      {
        title: "Information We Collect",
        paragraphs: [
          "We may collect the following information when you use the platform:",
        ],
        bullets: [
          "Account Information: Name, email address, phone number, department, job title and organisation details.",
          "Authentication Information: Login credentials, authentication records and security verification data.",
          "Document Information: Documents, files, metadata, comments, tags and other information uploaded or created within the system.",
          "Activity Information: Login history, document access, downloads, uploads, edits, sharing activities and other audit trail information.",
          "Device Information: IP address, browser type, operating system and device information.",
          "Communication Information: Information provided when you contact our support team or submit feedback.",
        ],
      },
      {
        title: "How We Use Your Information",
        paragraphs: ["We use collected information to:"],
        bullets: [
          "Provide and maintain the EDMS platform.",
          "Authenticate users and manage access permissions.",
          "Store, organise and retrieve documents.",
          "Enable document sharing and collaboration.",
          "Maintain audit trails and document activity history.",
          "Improve platform performance, security and usability.",
          "Detect and prevent unauthorised access, fraud or misuse.",
          "Provide customer support and respond to enquiries.",
          "Comply with applicable legal and regulatory requirements.",
        ],
      },
      {
        title: "Document Privacy",
        paragraphs: [
          "Documents uploaded to the platform remain accessible only to authorised users based on the permissions and access controls established by your organisation.",
          "We do not sell, rent or use your documents for advertising purposes.",
          "Users are responsible for ensuring that documents uploaded to the system are appropriate for storage and that they have the necessary rights and permissions to upload and share them.",
        ],
      },
      {
        title: "Access and Permissions",
        paragraphs: [
          "The EDMS uses role-based access controls to help ensure that users can only access information and documents they are authorised to view or manage.",
          "Depending on their assigned permissions, users may be able to:",
        ],
        bullets: [
          "View documents",
          "Upload and download files",
          "Edit document metadata",
          "Share documents",
          "Approve or reject documents",
          "Manage folders",
          "View activity history",
        ],
        after: [
          "Administrators may manage user accounts, roles and access permissions within their organisation.",
        ],
      },
      {
        title: "Information Security",
        paragraphs: [
          "We implement reasonable technical and organisational measures to protect information stored within the platform against unauthorised access, alteration, disclosure, loss or destruction.",
          "These measures may include encryption, access controls, authentication mechanisms, secure storage, monitoring and audit logging.",
          "However, no digital system can guarantee absolute security.",
        ],
      },
      {
        title: "Data Retention",
        paragraphs: [
          "We retain account information, documents and associated activity records for as long as necessary to provide the service or as required by the organisation's document retention policies and applicable laws.",
          "When information is no longer required, it may be securely deleted, archived or anonymised in accordance with applicable retention requirements.",
        ],
      },
      {
        title: "Sharing of Information",
        paragraphs: ["We may share information only where necessary to:"],
        bullets: [
          "Provide and operate the EDMS.",
          "Support authorised organisational activities.",
          "Work with trusted service providers.",
          "Comply with legal or regulatory obligations.",
          "Protect the security, rights or property of our users and organisation.",
        ],
        after: ["We do not sell personal information to third parties."],
      },
      {
        title: "Cookies and Usage Data",
        paragraphs: [
          "The platform may use cookies or similar technologies to maintain sessions, remember preferences, improve functionality and understand how users interact with the system.",
          "Users may be able to control certain cookie settings through their browser.",
        ],
      },
      {
        title: "Your Privacy Rights",
        paragraphs: [
          "Depending on applicable laws and organisational policies, you may have rights to:",
        ],
        bullets: [
          "Access your personal information.",
          "Request correction of inaccurate information.",
          "Request deletion of certain information.",
          "Request a copy of your information.",
          "Object to certain processing activities.",
          "Withdraw consent where processing is based on consent.",
        ],
        after: [
          "Requests may be subject to applicable legal, security and organisational requirements.",
        ],
      },
      {
        title: "Contact Us",
        paragraphs: [
          "If you have questions, concerns or requests regarding this Privacy Policy or how your information is handled, please contact our Privacy and Support Team.",
          "Email: privacy@ZurichTech.example",
          "Support: support@ZurichTech.example",
        ],
      },
    ],
  },
  cookies: {
    heading: "Cookies Policy",
    updated: "Last Updated: 18 August 2026",
    intro:
      "This Cookies Policy explains how ZurichTech uses cookies and similar technologies on our websites and Electronic Document Management System (EDMS).",
    sections: [
      {
        title: "What Are Cookies",
        paragraphs: [
          "Cookies are small text files stored on your device when you visit a website or use a web application. They help the platform remember your preferences, keep you signed in, and understand how the service is used.",
        ],
      },
      {
        title: "How We Use Cookies",
        paragraphs: ["We may use cookies and similar technologies to:"],
        bullets: [
          "Maintain authenticated sessions.",
          "Remember language, display, and other preferences.",
          "Improve functionality and performance.",
          "Understand how users interact with the system.",
        ],
      },
      {
        title: "Managing Cookies",
        paragraphs: [
          "You may be able to control certain cookie settings through your browser. Disabling cookies can affect sign-in, session persistence, and some features of the platform.",
        ],
      },
    ],
  },
  terms: {
    heading: "Terms of Service",
    updated: "Last Updated: 18 August 2026",
    intro:
      "These Terms of Service govern access to and use of ZurichTech websites, products, and the Electronic Document Management System (EDMS). By using the platform, you agree to these terms.",
    sections: [
      {
        title: "Use of the Platform",
        paragraphs: [
          "You may use the service only in accordance with these terms, applicable law, and the access permissions assigned by your organisation.",
        ],
        bullets: [
          "Keep login credentials confidential.",
          "Upload only content you have the rights to store and share.",
          "Do not attempt to bypass security or access controls.",
        ],
      },
      {
        title: "Accounts and Access",
        paragraphs: [
          "Access is granted on a role-based basis. Administrators in your organisation may manage user accounts, roles, and permissions. You are responsible for activity that occurs under your account.",
        ],
      },
      {
        title: "Contact",
        paragraphs: [
          "Questions about these terms can be sent to support@ZurichTech.example.",
        ],
      },
    ],
  },
};
