// =============================================================
// LEGAL PAGE — Privacy Policy, Terms of Service, Cookie Policy
// =============================================================

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type LegalSection = "privacy" | "terms" | "cookies";

export default function LegalPage() {
  const [activeSection, setActiveSection] = useState<LegalSection>("privacy");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const sections = [
    { id: "privacy", label: "Privacy Policy", icon: "🔒" },
    { id: "terms", label: "Terms of Service", icon: "📋" },
    { id: "cookies", label: "Cookie Policy", icon: "🍪" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Legal Information</h1>
          <p className="text-lg text-muted-foreground">
            Privacy Policy, Terms of Service, and Cookie Policy for Wear Your Own Techs
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as LegalSection)}
                className={`px-6 py-4 font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeSection === section.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {activeSection === "privacy" && <PrivacyPolicy expandedItems={expandedItems} toggleExpanded={toggleExpanded} />}
          {activeSection === "terms" && <TermsOfService expandedItems={expandedItems} toggleExpanded={toggleExpanded} />}
          {activeSection === "cookies" && <CookiePolicy expandedItems={expandedItems} toggleExpanded={toggleExpanded} />}
        </motion.div>
      </div>

      {/* Last Updated */}
      <div className="bg-muted/50 border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Last updated: July 4, 2026</p>
          <p>For questions, contact us at support@wearyourowntechs.com</p>
        </div>
      </div>
    </div>
  );
}

// Privacy Policy Component
function PrivacyPolicy({
  expandedItems,
  toggleExpanded,
}: {
  expandedItems: string[];
  toggleExpanded: (id: string) => void;
}) {
  const items = [
    {
      id: "privacy-1",
      title: "Information We Collect",
      content: `We collect information you provide directly to us, such as when you:
      - Submit a review or comment
      - Subscribe to our newsletter
      - Contact us with questions or feedback
      - Use our comparison tools
      
      We also automatically collect certain information about your device and how you interact with our site, including IP address, browser type, pages visited, and time spent on pages.`,
    },
    {
      id: "privacy-2",
      title: "How We Use Your Information",
      content: `We use the information we collect to:
      - Provide, maintain, and improve our services
      - Send you updates and newsletters (with your consent)
      - Respond to your inquiries and support requests
      - Analyze usage patterns and improve user experience
      - Comply with legal obligations
      - Prevent fraud and protect security`,
    },
    {
      id: "privacy-3",
      title: "Cookies and Tracking",
      content: `We use cookies and similar tracking technologies to:
      - Remember your preferences
      - Understand how you use our site
      - Deliver personalized content
      - Track advertising performance
      - Analyze site traffic
      
      You can control cookies through your browser settings. See our Cookie Policy for more details.`,
    },
    {
      id: "privacy-4",
      title: "Third-Party Sharing",
      content: `We may share your information with:
      - Service providers who assist us (analytics, hosting, payment processing)
      - Advertising partners (with your consent)
      - Legal authorities when required by law
      
      We do not sell your personal information to third parties.`,
    },
    {
      id: "privacy-5",
      title: "Data Security",
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.`,
    },
    {
      id: "privacy-6",
      title: "Your Rights",
      content: `Depending on your location, you may have the right to:
      - Access your personal information
      - Correct inaccurate information
      - Request deletion of your information
      - Opt-out of marketing communications
      - Data portability
      
      Contact us to exercise these rights.`,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="prose prose-invert max-w-none mb-8">
        <p className="text-lg text-muted-foreground">
          This Privacy Policy explains how Wear Your Own Techs ("we," "us," or "our") collects, uses, discloses, and safeguards your information when you visit our website.
        </p>
      </div>

      {items.map((item) => (
        <ExpandableSection
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          isExpanded={expandedItems.includes(item.id)}
          onToggle={toggleExpanded}
        />
      ))}
    </div>
  );
}

// Terms of Service Component
function TermsOfService({
  expandedItems,
  toggleExpanded,
}: {
  expandedItems: string[];
  toggleExpanded: (id: string) => void;
}) {
  const items = [
    {
      id: "terms-1",
      title: "Acceptance of Terms",
      content: `By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`,
    },
    {
      id: "terms-2",
      title: "Use License",
      content: `Permission is granted to temporarily download one copy of the materials (information or software) on Wear Your Own Techs's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      - Modify or copy the materials
      - Use the materials for any commercial purpose or for any public display
      - Attempt to decompile or reverse engineer any software contained on the website
      - Remove any copyright or other proprietary notations from the materials
      - Transfer the materials to another person or "mirror" the materials on any other server`,
    },
    {
      id: "terms-3",
      title: "Disclaimer",
      content: `The materials on Wear Your Own Techs's website are provided on an 'as is' basis. Wear Your Own Techs makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.`,
    },
    {
      id: "terms-4",
      title: "Limitations",
      content: `In no event shall Wear Your Own Techs or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Wear Your Own Techs's website, even if Wear Your Own Techs or an authorized representative has been notified orally or in writing of the possibility of such damage.`,
    },
    {
      id: "terms-5",
      title: "Accuracy of Materials",
      content: `The materials appearing on Wear Your Own Techs's website could include technical, typographical, or photographic errors. Wear Your Own Techs does not warrant that any of the materials on its website are accurate, complete, or current. Wear Your Own Techs may make changes to the materials contained on its website at any time without notice.`,
    },
    {
      id: "terms-6",
      title: "Links",
      content: `Wear Your Own Techs has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Wear Your Own Techs of the site. Use of any such linked website is at the user's own risk.`,
    },
    {
      id: "terms-7",
      title: "Modifications",
      content: `Wear Your Own Techs may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.`,
    },
    {
      id: "terms-8",
      title: "Governing Law",
      content: `These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Wear Your Own Techs operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.`,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="prose prose-invert max-w-none mb-8">
        <p className="text-lg text-muted-foreground">
          These Terms of Service ("Terms") govern your use of the Wear Your Own Techs website and services. Please read them carefully before using our site.
        </p>
      </div>

      {items.map((item) => (
        <ExpandableSection
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          isExpanded={expandedItems.includes(item.id)}
          onToggle={toggleExpanded}
        />
      ))}
    </div>
  );
}

// Cookie Policy Component
function CookiePolicy({
  expandedItems,
  toggleExpanded,
}: {
  expandedItems: string[];
  toggleExpanded: (id: string) => void;
}) {
  const items = [
    {
      id: "cookies-1",
      title: "What Are Cookies?",
      content: `Cookies are small text files that are stored on your device when you visit a website. They help websites remember information about your visit, such as your preferences and login status. Cookies can be either session cookies (deleted when you close your browser) or persistent cookies (stored for a longer period).`,
    },
    {
      id: "cookies-2",
      title: "Types of Cookies We Use",
      content: `Essential Cookies: Required for the website to function properly (authentication, security)
      
      Analytics Cookies: Help us understand how visitors use our site (Google Analytics, Umami)
      
      Advertising Cookies: Used to track advertising performance and show relevant ads (Pinterest, Facebook)
      
      Preference Cookies: Remember your choices and preferences (theme, language)`,
    },
    {
      id: "cookies-3",
      title: "Third-Party Cookies",
      content: `We use third-party services that may set their own cookies:
      - Google Analytics: Tracks website usage
      - Pinterest: Tracks conversions and user behavior
      - Facebook: Tracks conversions and enables retargeting
      
      These services have their own privacy policies that govern their cookie use.`,
    },
    {
      id: "cookies-4",
      title: "Managing Cookies",
      content: `You can control cookies through your browser settings:
      - Most browsers allow you to refuse cookies
      - You can delete cookies that have already been set
      - You can set your browser to notify you when cookies are being set
      
      Note: Disabling cookies may affect the functionality of our website.`,
    },
    {
      id: "cookies-5",
      title: "Cookie Consent",
      content: `When you first visit our website, we display a cookie consent banner. By continuing to use our site, you consent to our use of cookies as described in this policy. You can withdraw your consent at any time by adjusting your cookie preferences.`,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="prose prose-invert max-w-none mb-8">
        <p className="text-lg text-muted-foreground">
          This Cookie Policy explains how Wear Your Own Techs uses cookies and similar tracking technologies on our website.
        </p>
      </div>

      {items.map((item) => (
        <ExpandableSection
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          isExpanded={expandedItems.includes(item.id)}
          onToggle={toggleExpanded}
        />
      ))}
    </div>
  );
}

// Expandable Section Component
function ExpandableSection({
  id,
  title,
  content,
  isExpanded,
  onToggle,
}: {
  id: string;
  title: string;
  content: string;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <motion.div
      className="border border-border rounded-lg overflow-hidden bg-card hover:bg-card/80 transition-colors"
      initial={false}
    >
      <button
        onClick={() => onToggle(id)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-left">{title}</h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 py-4 border-t border-border bg-muted/30 whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed">
          {content}
        </div>
      </motion.div>
    </motion.div>
  );
}
