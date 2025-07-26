import React, { useState } from "react";
import { ArrowLeft, Mail, Lock, User, Globe, Gift } from "lucide-react";

interface AuthPageProps {
  onAuth: (
    email: string,
    password: string,
    role: "borrower" | "lender",
  ) => Promise<void>;
  onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuth, onBack }) => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [selectedRole, setSelectedRole] = useState<
    "borrower" | "lender" | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    country: "",
    referral: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup" && !selectedRole) return;

    setIsSubmitting(true);
    setError(null);
    const role = mode === "signin" ? "borrower" : selectedRole!;

    try {
      await onAuth(formData.email, formData.password, role);
    } catch (error) {
      console.error("Authentication failed:", error);
      setError("Authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="text-light-grey hover:text-bitcoin-gold mb-8 flex items-center transition-colors"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </button>

        {/* Auth Card */}
        <div className="bg-dark-charcoal/90 shadow-soft border-bitcoin-gold/20 rounded-2xl border p-8 backdrop-blur-sm">
          <div className="mb-8 text-center">
            <h1 className="text-subheading mb-2 font-medium text-white uppercase">
              {mode === "signin" ? "Welcome Back" : "Join ICRoots"}
            </h1>
            <p className="text-body text-light-grey/70">
              {mode === "signin"
                ? "Sign in to your account"
                : "Create your account to get started"}
            </p>
          </div>

          {/* Role Selection for Signup */}
          {mode === "signup" && (
            <div className="mb-6">
              <label className="text-body text-light-grey mb-3 block font-medium">
                I want to:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <RoleCard
                  role="borrower"
                  title="Borrow"
                  description="Get loans using Bitcoin"
                  selected={selectedRole === "borrower"}
                  onClick={() => setSelectedRole("borrower")}
                />
                <RoleCard
                  role="lender"
                  title="Lend"
                  description="Fund loans and earn"
                  selected={selectedRole === "lender"}
                  onClick={() => setSelectedRole("lender")}
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-risk-red/10 border-risk-red/20 mb-4 rounded-xl border p-4">
              <p className="text-risk-red text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <InputField
                icon={<User size={18} />}
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            )}

            <InputField
              icon={<Mail size={18} />}
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <InputField
              icon={<Lock size={18} />}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            {mode === "signup" && (
              <>
                <div className="relative">
                  <Globe
                    className="text-light-grey/50 absolute top-1/2 left-3 -translate-y-1/2 transform"
                    size={18}
                  />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="border-bitcoin-gold/30 bg-dark-charcoal focus:ring-bitcoin-gold w-full rounded-lg border py-3 pr-4 pl-10 text-white transition-all focus:border-transparent focus:ring-2"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="JP">Japan</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>

                <InputField
                  icon={<Gift size={18} />}
                  type="text"
                  name="referral"
                  placeholder="Referral Code (Optional)"
                  value={formData.referral}
                  onChange={handleInputChange}
                />
              </>
            )}

            <button
              type="submit"
              disabled={(mode === "signup" && !selectedRole) || isSubmitting}
              className="bg-primary hover:bg-primary/90 disabled:bg-dark-charcoal/50 text-bitcoin-gold shadow-soft hover:shadow-glow flex w-full transform items-center justify-center rounded-xl py-3 font-medium uppercase transition-all duration-300 hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="border-bitcoin-gold h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"></div>
              ) : mode === "signin" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <p className="text-body text-light-grey/70">
              {mode === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <button
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="text-bitcoin-gold ml-1 font-medium hover:underline"
              >
                {mode === "signin" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          {/* Forgot Password */}
          {mode === "signin" && (
            <div className="mt-4 text-center">
              <button className="text-caption text-light-grey/60 hover:text-bitcoin-gold transition-colors">
                Forgot your password?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RoleCard: React.FC<{
  role: "borrower" | "lender";
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}> = ({ role, title, description, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`rounded-xl border-2 p-4 text-left transition-all duration-300 ${
      selected
        ? "border-bitcoin-gold bg-bitcoin-gold/10 dark:bg-bitcoin-gold/20"
        : "border-light-grey dark:border-dark-charcoal hover:border-bitcoin-gold/50"
    }`}
  >
    <div className="mb-1 font-medium text-white">{title}</div>
    <div className="text-caption text-light-grey/70">{description}</div>
  </button>
);

const InputField: React.FC<{
  icon: React.ReactNode;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}> = ({ icon, type, name, placeholder, value, onChange, required }) => (
  <div className="relative">
    <div className="text-light-grey/50 absolute top-1/2 left-3 -translate-y-1/2 transform">
      {icon}
    </div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="border-bitcoin-gold/30 bg-dark-charcoal focus:ring-bitcoin-gold placeholder-light-grey/50 w-full rounded-lg border py-3 pr-4 pl-10 text-white transition-all focus:border-transparent focus:ring-2"
    />
  </div>
);

export default AuthPage;
