import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EnquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
}

interface FormErrors {
  name?: string;
  mobile?: string;
  email?: string;
  consent?: string;
}

const EnquiryPopup: React.FC<EnquiryPopupProps> = ({
  isOpen,
  onClose,
  projectName,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    company: "",
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Validation ──────────────────────────────────────────────
  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = "Name must contain only letters and spaces.";
    }

    // Mobile
    // Mobile
if (!formData.mobile) {
  newErrors.mobile = "Mobile number is required.";
} else if (formData.mobile.length !== 10) {
  newErrors.mobile = "Mobile number must be exactly 10 digits.";
}

    // Email (optional but validated if filled)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Consent
    if (!formData.consent) {
      newErrors.consent = "You must agree to the terms to proceed.";
    }

    return newErrors;
  };

  // ── Handlers ────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;

    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value,
    }));
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.replace(/\D/g, ""); // strip non-digits
  if (value.length <= 10) {
    if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: undefined }));
    setFormData((prev) => ({ ...prev, mobile: value }));
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.company) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_mai4j8k",
        "template_xg51vz4",
        {
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          project_name: projectName,
        },
        "R-j4qmWrSTnvwNVIc"
      );

      if (typeof window.gtag !== "undefined") {
        window.gtag("event", "project_enquiry_submit", {
          event_category: "lead",
          event_label: projectName,
        });
      }

      toast.success("Enquiry submitted successfully", {
        description: "Our team will contact you shortly.",
      });

      setFormData({ name: "", mobile: "", email: "", company: "", consent: false });
      setErrors({});
      onClose();
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Failed to submit enquiry", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── UI ───────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              disabled={isSubmitting}
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-2xl font-normal text-center mb-6 text-[#00274D]">
              Enquire About{" "}
              <span className="text-[#D7A764]">{projectName}</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>

              {/* Full Name */}
              <div>
                <Label htmlFor="name">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.name ? "border-red-500 focus-visible:ring-red-400" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <Label htmlFor="mobile">
                  Mobile Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleMobileChange}
                  placeholder="Enter 10-digit mobile number"
                  inputMode="numeric"
                  maxLength={10}
                  className={errors.mobile ? "border-red-500 focus-visible:ring-red-400" : ""}
                />
                {errors.mobile && (
                  <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email (optional)"
                  className={errors.email ? "border-red-500 focus-visible:ring-red-400" : ""}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Honeypot */}
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Consent */}
              <div>
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 accent-[#D7A764]"
                  />
                  <Label htmlFor="consent" className="text-sm leading-relaxed">
                    By submitting the above information you agree to receive the
                    communication about my products and services via
                    SMS/RCS/WABA/Voice/etc.{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                </div>
                {errors.consent && (
                  <p className="text-xs text-red-500 mt-1">{errors.consent}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#D7A764] hover:bg-[#c4954a] text-[#00274D] font-normal rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryPopup;