import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-lg shadow-lg">
            {/* Compact View */}
            {!showDetails && (
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">🍪 Cookie Preferences</h3>
                    <p className="text-sm text-muted-foreground">
                      We use cookies to enhance your experience, analyze traffic, and enable personalized advertising. By continuing to browse, you consent to our use of cookies.{" "}
                      <button
                        onClick={() => setShowDetails(true)}
                        className="text-primary hover:underline font-medium"
                      >
                        Learn more
                      </button>
                    </p>
                  </div>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <Button
                    onClick={handleAccept}
                    className="flex-1 sm:flex-none bg-primary hover:bg-primary/90"
                  >
                    Accept All
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant="outline"
                    className="flex-1 sm:flex-none"
                  >
                    Reject Non-Essential
                  </Button>
                </div>
              </div>
            )}

            {/* Detailed View */}
            {showDetails && (
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Cookie Details</h3>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  <CookieCategory
                    name="Essential Cookies"
                    description="Required for website functionality and security"
                    examples="Authentication, security, session management"
                    required
                  />
                  <CookieCategory
                    name="Analytics Cookies"
                    description="Help us understand how you use our site"
                    examples="Google Analytics, Umami Analytics"
                  />
                  <CookieCategory
                    name="Advertising Cookies"
                    description="Enable personalized ads and track campaign performance"
                    examples="Pinterest Tag, Facebook Pixel"
                  />
                  <CookieCategory
                    name="Preference Cookies"
                    description="Remember your choices and settings"
                    examples="Theme preference, language selection"
                  />
                </div>

                <p className="text-xs text-muted-foreground mb-4">
                  For more information, see our{" "}
                  <Link href="/legal" className="text-primary hover:underline">
                    Privacy Policy and Cookie Policy
                  </Link>
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAccept}
                    className="flex-1 sm:flex-none bg-primary hover:bg-primary/90"
                  >
                    Accept All Cookies
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant="outline"
                    className="flex-1 sm:flex-none"
                  >
                    Reject Non-Essential
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CookieCategory({
  name,
  description,
  examples,
  required = false,
}: {
  name: string;
  description: string;
  examples: string;
  required?: boolean;
}) {
  return (
    <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-sm">{name}</h4>
        {required && (
          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
            Required
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground mb-2">{description}</p>
      <p className="text-xs text-muted-foreground/70">
        <span className="font-medium">Examples:</span> {examples}
      </p>
    </div>
  );
}
