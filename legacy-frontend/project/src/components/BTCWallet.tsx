import React, { useState } from "react";
import {
  Bitcoin,
  Copy,
  QrCode,
  RefreshCw,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";

interface BTCWalletProps {
  balance: number;
  usdValue: number;
}

const BTCWallet: React.FC<BTCWalletProps> = ({ balance, usdValue }) => {
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mock wallet address
  const walletAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    // Mock refresh functionality
    console.log("Refreshing wallet balance...");
  };

  return (
    <div className="space-y-6">
      {/* Wallet Balance Card */}
      <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bitcoin className="h-10 w-10" />
            <div>
              <h2 className="text-2xl font-bold">BTC Wallet</h2>
              <p className="opacity-90">ICP-Generated Address</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            className="rounded-full bg-white/20 p-3 transition-colors hover:bg-white/30"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p className="mb-1 text-lg opacity-90">Bitcoin Balance</p>
            <p className="text-4xl font-bold">{balance} BTC</p>
          </div>
          <div>
            <p className="mb-1 text-lg opacity-90">USD Value</p>
            <p className="text-4xl font-bold">${usdValue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Warning for Empty Wallet */}
      {balance === 0 && (
        <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-800 dark:bg-yellow-900/20">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="mt-1 h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            <div>
              <h3 className="mb-2 text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                Empty Wallet
              </h3>
              <p className="mb-4 text-yellow-700 dark:text-yellow-300">
                Your BTC wallet is empty. You need to deposit Bitcoin to use as
                collateral for loans.
              </p>
              <button className="rounded-full bg-yellow-600 px-4 py-2 text-white transition-colors hover:bg-yellow-700">
                Learn How to Deposit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wallet Address */}
      <div className="rounded-3xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Wallet Address
          </h3>
          <button
            onClick={() => setShowQR(!showQR)}
            className="flex items-center space-x-2 rounded-full bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            <QrCode className="h-4 w-4" />
            <span>{showQR ? "Hide" : "Show"} QR</span>
          </button>
        </div>

        <div className="mb-4 rounded-2xl bg-gray-100 p-4 dark:bg-gray-700">
          <div className="flex items-center justify-between">
            <code className="text-sm break-all text-gray-800 dark:text-gray-200">
              {walletAddress}
            </code>
            <button
              onClick={handleCopyAddress}
              className="ml-4 rounded-lg p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <Copy className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {copied && (
          <div className="mb-4 text-sm text-green-600 dark:text-green-400">
            ✓ Address copied to clipboard
          </div>
        )}

        {showQR && (
          <div className="mb-4 text-center">
            <div className="inline-block rounded-2xl bg-white p-4 shadow-lg">
              <div className="flex h-48 w-48 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-600">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  QR Code
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-sm text-gray-600 dark:text-gray-300">
          <p className="mb-2">
            This is your automatically generated ICP wallet address for Bitcoin
            deposits. Send Bitcoin to this address to use as collateral for
            loans.
          </p>
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
            <ExternalLink className="h-4 w-4" />
            <a href="#" className="hover:underline">
              View on blockchain explorer
            </a>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="rounded-3xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
        <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
          Recent Transactions
        </h3>

        {balance > 0 ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-2xl bg-gray-50 p-4 dark:bg-gray-700"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <Bitcoin className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      Received
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Jan {15 + i}, 2025 at 3:42 PM
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600 dark:text-green-400">
                    +0.{15 + i * 5} BTC
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    ${(8000 + i * 2000).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
              <Bitcoin className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              No transactions yet
            </p>
            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
              Your transaction history will appear here once you make deposits
            </p>
          </div>
        )}
      </div>

      {/* Security Note */}
      <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
        <h3 className="mb-2 text-lg font-semibold text-blue-800 dark:text-blue-200">
          Security Information
        </h3>
        <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
          <p>
            • This wallet is automatically generated and secured by the Internet
            Computer Protocol
          </p>
          <p>• Your private keys are managed securely by ICP smart contracts</p>
          <p>
            • Bitcoin deposits are locked as collateral and can be released upon
            loan repayment
          </p>
          <p>• All transactions are recorded on-chain for full transparency</p>
        </div>
      </div>
    </div>
  );
};

export default BTCWallet;
