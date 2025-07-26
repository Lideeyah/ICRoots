import React from "react";

interface TrustNFTDisplayProps {
  tier: string;
  compact?: boolean;
}

const TrustNFTDisplay: React.FC<TrustNFTDisplayProps> = ({
  tier,
  compact = false,
}) => {
  const getTierInfo = (tier: string) => {
    switch (tier) {
      case "sprout":
        return {
          emoji: "🌱",
          name: "Sprout",
          description: "New user - Just getting started",
          level: 1,
          progress: 20,
          benefits: ["Basic loan access", "Standard rates"],
        };
      case "sapling":
        return {
          emoji: "🌿",
          name: "Sapling",
          description: "1-2 successful loans completed",
          level: 2,
          progress: 40,
          benefits: ["Faster approval", "0.5% rate reduction"],
        };
      case "branch":
        return {
          emoji: "🌲",
          name: "Branch",
          description: "Good repayment history",
          level: 3,
          progress: 60,
          benefits: [
            "Priority support",
            "1% rate reduction",
            "Higher loan limits",
          ],
        };
      case "trunk":
        return {
          emoji: "🌳",
          name: "Trunk",
          description: "Consistent good behavior",
          level: 4,
          progress: 80,
          benefits: ["Premium rates", "Extended terms", "Exclusive products"],
        };
      case "oak":
        return {
          emoji: "🌰",
          name: "Oak",
          description: "Highest trust level",
          level: 5,
          progress: 100,
          benefits: [
            "Best rates available",
            "Maximum loan amounts",
            "VIP support",
          ],
        };
      default:
        return getTierInfo("sprout");
    }
  };

  const tierInfo = getTierInfo(tier);

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg">
          {tierInfo.emoji}
        </div>
        <div>
          <p className="font-semibold text-white">{tierInfo.name}</p>
          <p className="text-xs text-white/80">Level {tierInfo.level}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white/70 p-8 text-center shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
        <div className="mb-4 text-6xl">{tierInfo.emoji}</div>
        <h2 className="mb-2 text-3xl font-bold text-gray-800 dark:text-white">
          {tierInfo.name}
        </h2>
        <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">
          {tierInfo.description}
        </p>
        <div className="mb-6 flex items-center justify-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Trust Level
          </span>
          <span className="rounded-full bg-blue-500 px-3 py-1 text-sm font-semibold text-white">
            {tierInfo.level}/5
          </span>
        </div>

        {/* Progress to Next Level */}
        {tierInfo.level < 5 && (
          <div className="mb-6">
            <div className="mb-2 flex justify-between text-sm text-gray-600 dark:text-gray-300">
              <span>Progress to next level</span>
              <span>{tierInfo.progress}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${tierInfo.progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Benefits */}
      <div className="rounded-3xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
        <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
          Your Benefits
        </h3>
        <div className="space-y-3">
          {tierInfo.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-gray-700 dark:text-gray-300">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* NFT Details */}
      <div className="rounded-3xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
        <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
          NFT Details
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Type:</span>
            <span className="font-semibold text-gray-800 dark:text-white">
              Soulbound NFT
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">
              Blockchain:
            </span>
            <span className="font-semibold text-gray-800 dark:text-white">
              Internet Computer
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">
              Transferable:
            </span>
            <span className="font-semibold text-red-500">No (Soulbound)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">
              Upgradeable:
            </span>
            <span className="font-semibold text-green-500">
              Yes (Automatic)
            </span>
          </div>
        </div>
      </div>

      {/* How to Level Up */}
      {tierInfo.level < 5 && (
        <div className="rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:from-blue-900/20 dark:to-indigo-900/20">
          <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
            Level Up Tips
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                1
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                Make timely loan repayments
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                2
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                Complete multiple successful loans
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                3
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                Maintain good communication with lenders
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrustNFTDisplay;
