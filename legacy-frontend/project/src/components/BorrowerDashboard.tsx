import React, { useState } from "react";
import {
  Bitcoin,
  Wallet,
  FileText,
  History,
  Award,
  LogOut,
  Menu,
  X,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import TrustNFTDisplay from "./TrustNFTDisplay";
import BTCWallet from "./BTCWallet";
import LoanApplication from "./LoanApplication";
import LoanHistory from "./LoanHistory";
import { useICRoots } from "../hooks/useICRoots";

interface BorrowerDashboardProps {
  onLogout: () => void;
}

const BorrowerDashboard: React.FC<BorrowerDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    user,
    wallet,
    trustProfile,
    loans,
    loading,
    refreshWallet,
    submitLoanApplication,
    refreshTrustProfile,
  } = useICRoots();

  const activeLoan = loans.find((loan) => loan.status === "active");
  const aiScore = trustProfile?.score || 85;

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "wallet", label: "BTC Wallet", icon: Wallet },
    { id: "apply", label: "Apply for Loan", icon: FileText },
    { id: "history", label: "Loan History", icon: History },
    { id: "trust", label: "Trust NFT", icon: Award },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "wallet":
        return (
          <BTCWallet
            balance={wallet?.balance || 0}
            usdValue={wallet?.usdValue || 0}
            address={wallet?.address || ""}
            onRefresh={refreshWallet}
          />
        );
      case "apply":
        return (
          <LoanApplication
            aiScore={aiScore}
            onSubmit={submitLoanApplication}
            loading={loading}
          />
        );
      case "history":
        return <LoanHistory loans={loans} />;
      case "trust":
        return (
          <TrustNFTDisplay
            tier={trustProfile?.tier || "sprout"}
            profile={trustProfile}
            onRefresh={refreshTrustProfile}
          />
        );
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="from-primary to-bitcoin-gold rounded-2xl bg-gradient-to-r p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-subheading mb-2 font-medium uppercase">
                    Welcome back, {user?.name}!
                  </h1>
                  <p className="opacity-90">
                    Ready to unlock your Bitcoin's potential?
                  </p>
                </div>
                <TrustNFTDisplay
                  tier={trustProfile?.tier || "sprout"}
                  compact
                />
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <MetricCard
                icon={<Bitcoin className="text-bitcoin-gold h-8 w-8" />}
                title="BTC Balance"
                value={`${wallet?.balance.toFixed(4) || "0.0000"} BTC`}
                subtitle={`$${wallet?.usdValue.toLocaleString() || "0"}`}
                trend="+2.5%"
              />
              <MetricCard
                icon={<TrendingUp className="text-mint-green h-8 w-8" />}
                title="AI Credit Score"
                value={aiScore.toString()}
                subtitle="Excellent standing"
                trend="+5 pts"
              />
              <MetricCard
                icon={<CheckCircle className="text-trust-blue h-8 w-8" />}
                title="Trust Tier"
                value={
                  (trustProfile?.tier || "sprout").charAt(0).toUpperCase() +
                  (trustProfile?.tier || "sprout").slice(1)
                }
                subtitle="Growing steadily"
                trend="Level up soon"
              />
            </div>

            {/* Active Loan */}
            {activeLoan && (
              <div className="dark:bg-dark-charcoal/70 shadow-soft rounded-2xl bg-white/70 p-6 backdrop-blur-sm">
                <h3 className="text-dark-charcoal mb-4 flex items-center text-lg font-medium dark:text-white">
                  <Clock className="text-trust-blue mr-2 h-5 w-5" />
                  Active Loan
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-caption text-dark-charcoal/70 dark:text-light-grey/70">
                      Loan Amount
                    </p>
                    <p className="text-dark-charcoal text-xl font-bold dark:text-white">
                      ${activeLoan.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-caption text-dark-charcoal/70 dark:text-light-grey/70">
                      Next Payment
                    </p>
                    <p className="text-body text-dark-charcoal font-medium dark:text-white">
                      {activeLoan.nextPaymentDate
                        ? new Date(
                            activeLoan.nextPaymentDate,
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-caption text-dark-charcoal/70 dark:text-light-grey/70">
                      Remaining
                    </p>
                    <p className="text-body text-dark-charcoal font-medium dark:text-white">
                      {activeLoan.remainingPayments} payments
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="bg-light-grey dark:bg-dark-charcoal h-2 rounded-full">
                    <div
                      className="bg-mint-green h-2 rounded-full"
                      style={{
                        width: `${((activeLoan.term - activeLoan.remainingPayments) / activeLoan.term) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-caption text-dark-charcoal/70 dark:text-light-grey/70 mt-1">
                    {Math.round(
                      ((activeLoan.term - activeLoan.remainingPayments) /
                        activeLoan.term) *
                        100,
                    )}
                    % repaid
                  </p>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="dark:bg-dark-charcoal/70 shadow-soft rounded-2xl bg-white/70 p-6 backdrop-blur-sm">
              <h3 className="text-dark-charcoal mb-4 text-lg font-medium dark:text-white">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <button
                  onClick={() => setActiveTab("apply")}
                  className="bg-primary text-bitcoin-gold hover:bg-primary/90 shadow-soft hover:shadow-glow flex items-center rounded-xl p-4 transition-all duration-300"
                >
                  <FileText className="mr-3 h-6 w-6" />
                  <div className="text-left">
                    <p className="font-medium uppercase">Apply for New Loan</p>
                    <p className="text-caption opacity-90">
                      Get instant pre-approval
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("wallet")}
                  className="bg-bitcoin-gold text-primary hover:bg-bitcoin-gold/90 shadow-soft hover:shadow-glow flex items-center rounded-xl p-4 transition-all duration-300"
                >
                  <Wallet className="mr-3 h-6 w-6" />
                  <div className="text-left">
                    <p className="font-medium uppercase">Manage BTC Wallet</p>
                    <p className="text-caption opacity-90">
                      View balance & deposit
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`dark:bg-dark-charcoal/80 shadow-soft fixed inset-y-0 left-0 z-50 w-64 transform bg-white/80 backdrop-blur-sm ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:static lg:inset-0 lg:translate-x-0`}
      >
        <div className="border-light-grey dark:border-dark-charcoal flex items-center justify-between border-b p-6">
          <div className="flex items-center space-x-2">
            <img
              src="/ICRoots logo, no background.png"
              alt="ICRoots Logo"
              className="h-8 w-8"
            />
            <span className="text-dark-charcoal text-xl font-bold dark:text-white">
              ICRoots
            </span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="text-dark-charcoal dark:text-light-grey h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 px-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`mb-2 flex w-full items-center rounded-xl px-4 py-3 transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-primary text-bitcoin-gold shadow-glow"
                  : "text-dark-charcoal dark:text-light-grey hover:bg-light-grey dark:hover:bg-dark-charcoal"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute right-6 bottom-6 left-6">
          <button
            onClick={onLogout}
            className="text-risk-red hover:bg-risk-red/10 flex w-full items-center rounded-xl px-4 py-3 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="dark:bg-dark-charcoal/80 flex items-center justify-between bg-white/80 p-6 backdrop-blur-sm lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="hover:bg-light-grey dark:hover:bg-dark-charcoal rounded-xl p-2 transition-colors"
          >
            <Menu className="text-dark-charcoal dark:text-light-grey h-6 w-6" />
          </button>
          <h1 className="text-dark-charcoal text-lg font-medium uppercase dark:text-white">
            {menuItems.find((item) => item.id === activeTab)?.label}
          </h1>
          <div className="w-10"></div>
        </div>

        {/* Content */}
        <div className="p-6">{renderContent()}</div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-40 bg-black lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

const MetricCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  trend: string;
}> = ({ icon, title, value, subtitle, trend }) => (
  <div className="dark:bg-dark-charcoal/70 shadow-soft rounded-2xl bg-white/70 p-6 backdrop-blur-sm">
    <div className="mb-4 flex items-center justify-between">
      {icon}
      <span className="text-caption text-mint-green font-medium">{trend}</span>
    </div>
    <h3 className="text-body text-dark-charcoal mb-1 font-medium dark:text-white">
      {title}
    </h3>
    <p className="text-dark-charcoal mb-1 text-xl font-bold dark:text-white">
      {value}
    </p>
    <p className="text-caption text-dark-charcoal/70 dark:text-light-grey/70">
      {subtitle}
    </p>
  </div>
);

export default BorrowerDashboard;
