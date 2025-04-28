import { WhaleIcon, AnchorIcon, CrownIcon } from "@/components/icons/challenge-icons";

export const CHALLENGE_TYPES = {
  "Whale Hunter": {
    icon: WhaleIcon,
    description: "Entry level funded account",
    color: "from-blue-600/20 to-cyan-500/20",
    prices: {
      "25K": "$299",
      "50K": "$499",
      "100K": "$799",
      "200K": "$999",
    },
    discountPercentage: {
      "25K": "-20%",
      "50K": "-25%",
      "100K": "-30%",
      "200K": "-35%",
    },
    salePrice: {
      "25K": "$239",
      "50K": "$374",
      "100K": "$559",
      "200K": "$649",
    },
    features: [
      "14 Day Time Limit",
      "8% Maximum Loss",
      "5% Profit Target",
      "No Minimum Trading Days",
      "Weekend Holdings Allowed",
      "News Trading Allowed"
    ]
  },

  "Deep Ocean": {
    icon: AnchorIcon,
    description: "Advanced trader program",
    color: "from-indigo-600/20 to-blue-500/20",
    prices: {
      "300K": "$1499",
      "500K": "$1999",
      "1M": "$2999",
    },
    discountPercentage: {
      "300K": "-25%",
      "500K": "-30%",
      "1M": "-35%",
    },
    salePrice: {
      "300K": "$1124",
      "500K": "$1399",
      "1M": "$1949",
    },
    features: [
      "30 Day Time Limit",
      "10% Maximum Loss",
      "8% Profit Target",
      "5 Minimum Trading Days",
      "Advanced Trading Tools",
      "Priority Support"
    ]
  },

  "Blue Whale": {
    icon: CrownIcon,
    description: "Elite trader program",
    color: "from-cyan-600/20 to-teal-500/20",
    prices: {
      "2M": "$4999",
      "5M": "$9999",
      "10M": "$14999",
    },
    discountPercentage: {
      "2M": "-30%",
      "5M": "-35%",
      "10M": "-40%",
    },
    salePrice: {
      "2M": "$3499",
      "5M": "$6499",
      "10M": "$8999",
    },
    features: [
      "45 Day Time Limit",
      "12% Maximum Loss",
      "10% Profit Target",
      "VIP Support",
      "Custom Platform Settings",
      "1-on-1 Mentoring"
    ]
  }
}
