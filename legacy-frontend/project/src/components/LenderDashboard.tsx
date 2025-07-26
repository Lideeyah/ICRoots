import React, { useState, useEffect } from "react";
import {
  DollarSign,
  TrendingUp,
  Users,
  Wallet,
  LogOut,
  Menu,
  X,
  Bitcoin,
  Eye,
  Star,
  ArrowRight,
  Download,
} from "lucide-react";
import { useICRoots } from "../hooks/useICRoots";

interface LenderDashboardProps {
  onLogout: () => void;
}

const LenderDashboard: React.FC<LenderDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loans, loading, getAIRecommendations, fundLoan } = useICRoots();
  const [aiRecommendations, setAIRecommendations] = useState<any[]>([]);

  useEffect(() => {
    const loadRecommendations = async () => {
      const recommendations = await getAIRecommendations();
      setAIRecommendations(recommendations);
    };

    if (user?.role === "lender") {
      loadRecommendations();
    }
  }, [user, getAIRecommendations]);

  // Calculate lender metrics
  const lenderMetrics = {
    totalStaked: loans.reduce(
      (sum, loan) => sum + (loan.lenderId === user?.id ? loan.amount : 0),
      0,
    ),
    loansFunded: loans.filter((loan) => loan.lenderId === user?.id).length,
    activeLoans: loans.filter(
      (loan) => loan.lenderId === user?.id && loan.status === "active",
    ).length,
    totalEarnings: loans.reduce((sum, loan) => {
      if (loan.lenderId === user?.id && loan.status === "repaid") {
        return sum + (loan.totalPaid - loan.amount);
      }
      return sum;
    }, 0),
    averageROI: 12.5, // This would be calculated based on actual returns
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "fund", label: "Fund Loans", icon: DollarSign },
    { id: "track", label: "Track Loans", icon: Eye },
    { id: "earnings", label: "Earnings", icon: Wallet },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "fund":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                AI-Recommended Borrowers
              </h2>
              <button className="rounded-full bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600">
                Refresh AI Suggestions
              </button>
            </div>

            <div className="grid gap-6">
              {aiRecommendations.map((borrower) => (
                <BorrowerCard
                  key={borrower.id}
                  borrower={borrower}
                  onFund={fundLoan}
                  loading={loading}
                />
              ))}
            </div>
          </div>
        );

      case "track":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Active Loans
            </h2>
            <div className="overflow-hidden rounded-3xl bg-white/70 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                        Borrower
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                        Next Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {loans
                      .filter((loan) => loan.lenderId === user?.id)
                      .map((loan) => (
                        <tr
                          key={loan.id}
                          className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 font-semibold text-white">
                                {loan.borrowerId.charAt(0).toUpperCase()}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  Borrower {loan.borrowerId.slice(-4)}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-300">
                                  Trust: Sapling
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-white">
                            ${loan.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-700">
                              <div
                                className="h-2 rounded-full bg-green-500"
                                style={{
                                  width: `${((loan.term - loan.remainingPayments) / loan.term) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <div className="mt-1 text-xs text-gray-500 dark:text-gray-300">
                              {Math.round(
                                ((loan.term - loan.remainingPayments) /
                                  loan.term) *
                                  100,
                              )}
                              %
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-white">
                            {loan.nextPaymentDate
                              ? new Date(
                                  loan.nextPaymentDate,
                                ).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold text-green-800 dark:bg-green-900 dark:text-green-200">
                              On Time
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "earnings":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Earnings Overview
              </h2>
              <button className="flex items-center rounded-full bg-green-500 px-6 py-2 text-white transition-colors hover:bg-green-600">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
                <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                  Total Earnings
                </h3>
                <div className="mb-2 text-3xl font-bold text-green-500">
                  ${lenderMetrics.totalEarnings.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  +8.2% from last month
                </div>
              </div>

              <div className="rounded-3xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
                <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                  Available to Withdraw
                </h3>
                <div className="mb-2 text-3xl font-bold text-blue-500">
                  $8,420
                </div>
                <button className="rounded-full bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600">
                  Withdraw Now
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
              <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                Monthly Earnings Trend
              </h3>
              <div className="flex h-64 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-700">
                <p className="text-gray-500 dark:text-gray-400">
                  Earnings chart would go here
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="rounded-3xl bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
              <h1 className="mb-2 text-2xl font-bold">
                Welcome back, {lenderData.name}!
              </h1>
              <p className="opacity-90">
                Your lending portfolio is performing excellently
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <MetricCard
                icon={<DollarSign className="h-8 w-8 text-green-500" />}
                title="Total Staked"
                value={`$${lenderMetrics.totalStaked.toLocaleString()}`}
                trend="+12.5%"
              />
              <MetricCard
                icon={<Users className="h-8 w-8 text-blue-500" />}
                title="Loans Funded"
                value={lenderMetrics.loansFunded.toString()}
                trend="+3 this month"
              />
              <MetricCard
                icon={<TrendingUp className="h-8 w-8 text-purple-500" />}
                title="Average ROI"
                value={`${lenderMetrics.averageROI}%`}
                trend="+0.8%"
              />
              <MetricCard
                icon={<Wallet className="h-8 w-8 text-orange-500" />}
                title="Total Earnings"
                value={`$${lenderMetrics.totalEarnings.toLocaleString()}`}
                trend="+8.2%"
              />
            </div>

            {/* AI Suggestions Preview */}
            <div className="rounded-3xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  AI-Recommended Borrowers
                </h3>
                <button
                  onClick={() => setActiveTab("fund")}
                  className="flex items-center font-medium text-blue-500 transition-colors hover:text-blue-600"
                >
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {aiRecommendations.slice(0, 2).map((borrower) => (
                  <div
                    key={borrower.id}
                    className="rounded-2xl border border-gray-200 p-4 dark:border-gray-600"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-semibold text-gray-800 dark:text-white">
                        Borrower {borrower.borrowerId?.slice(-4) || "Unknown"}
                      </span>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-sm text-green-800 dark:bg-green-900 dark:text-green-200">
                        {borrower.riskLevel || "low"} risk
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <div>
                        Amount: ${borrower.amount?.toLocaleString() || "N/A"}
                      </div>
                      <div>AI Score: {borrower.aiScore || "N/A"}/100</div>
                      <div>
                        Interest: {borrower.interestRate?.toFixed(1) || "N/A"}%
                      </div>
                    </div>
                  </div>
                ))}
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
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white/80 shadow-xl backdrop-blur-sm dark:bg-gray-800/80 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:static lg:inset-0 lg:translate-x-0`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <img
              src="/ICRoots logo, no background.png"
              alt="ICRoots Logo"
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              ICRoots
            </span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
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
              className={`mb-2 flex w-full items-center rounded-2xl px-4 py-3 transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
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
            className="flex w-full items-center rounded-2xl px-4 py-3 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-white/80 p-6 backdrop-blur-sm lg:hidden dark:bg-gray-800/80">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
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
  trend: string;
}> = ({ icon, title, value, trend }) => (
  <div className="rounded-3xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
    <div className="mb-4 flex items-center justify-between">
      {icon}
      <span className="text-sm font-medium text-green-500">{trend}</span>
    </div>
    <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white">
      {title}
    </h3>
    <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
  </div>
);

const BorrowerCard: React.FC<{
  borrower: any;
  onFund: (loanId: string, amount: number) => Promise<boolean>;
  loading: boolean;
}> = ({ borrower, onFund, loading }) => {
  const [funding, setFunding] = useState(false);

  const handleFund = async (amount: number) => {
    setFunding(true);
    try {
      await onFund(borrower.id, amount);
    } finally {
      setFunding(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="mb-1 text-xl font-semibold text-gray-800 dark:text-white">
            Borrower {borrower.borrowerId?.slice(-4) || "Unknown"}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
            <span>
              AI Score: <strong>{borrower.aiScore || "N/A"}/100</strong>
            </span>
            <span className="flex items-center">
              <Star className="mr-1 h-4 w-4 text-yellow-400" />
              sapling
            </span>
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            (borrower.riskLevel || "low") === "low"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : (borrower.riskLevel || "low") === "medium"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {borrower.riskLevel || "low"} risk
        </span>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Requested Amount
          </p>
          <p className="text-xl font-bold text-gray-800 dark:text-white">
            ${borrower.amount?.toLocaleString() || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Interest Rate
          </p>
          <p className="text-xl font-bold text-gray-800 dark:text-white">
            {borrower.interestRate?.toFixed(1) || "N/A"}%
          </p>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => handleFund(borrower.amount)}
          disabled={funding || loading}
          className="flex flex-1 items-center justify-center rounded-full bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:bg-gray-400"
        >
          {funding ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          ) : (
            "Fund Full Amount"
          )}
        </button>
        <button
          onClick={() => handleFund(borrower.amount * 0.5)}
          disabled={funding || loading}
          className="flex-1 rounded-full border border-blue-500 px-4 py-2 text-blue-500 transition-colors hover:bg-blue-50 disabled:opacity-50 dark:hover:bg-blue-900/20"
        >
          Fund Partial
        </button>
      </div>
    </div>
  );
};

export default LenderDashboard;
