# 🐳 FundedWhales Trading Platform

<div align="center">
  <img src="public/android-chrome-512x512.png" alt="FundedWhales Logo" width="150" />
  <h3>Take your trading to the next level with funded accounts</h3>
  <p>A modern proprietary trading firm platform built with Next.js 14+, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion</p>

  [![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.9-0055FF?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
  [![Prisma](https://img.shields.io/badge/Prisma-6.6-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
</div>

## ✨ Features

### 🏆 Trading Challenges
- **🐋 Whale Hunter**: Entry level funded account with account sizes from $25K to $200K
- **🌊 Deep Ocean**: Advanced trader program with account sizes from $300K to $1M
- **👑 Blue Whale**: Elite trader program with account sizes from $2M to $10M
- **💰 High Profit Split**: Up to 90% profit sharing for traders
- **⏱️ Flexible Time Limits**: Trade at your own pace with generous time limits

### 📊 Trader Dashboard
- **📈 TradingView Integration**: Real-time market analysis with advanced charting
- **📉 MyFXBook Analytics**: Detailed performance tracking and account statistics
- **🧮 Profit Split Calculator**: Calculate potential earnings based on account size and profit
- **📱 Responsive Design**: Fully responsive dashboard accessible on all devices
- **🔄 Challenge Progression Tracking**: Monitor your progress through trading challenges

### 💳 Payment Processing
- **💲 USDT-BEP20 Support**: Cryptocurrency payment integration with QR code generation
- **🔒 Secure Transactions**: Robust payment verification and processing
- **⚡ Rapid Funding**: Quick account activation after payment confirmation

### 🛠️ Technical Features
- **🔐 Authentication**: Secure JWT-based authentication system
- **🗄️ Database**: Prisma ORM with SQLite (configurable for production databases)
- **🌙 Dark Mode**: Exclusive dark mode design for optimal viewing experience
- **🎭 Animations**: Smooth, performant animations with Framer Motion
- **🧩 Component Library**: High-quality UI components with shadcn/ui
- **📱 Responsive**: Mobile-first design approach for all screen sizes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/fundedwhales.git
cd fundedwhales
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Initialize the database:
```bash
npx prisma migrate dev
npx prisma db seed
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
fundedwhales/
├── prisma/                # Database schema and migrations
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js App Router pages
│   ├── components/        # React components
│   │   ├── dashboard/     # Dashboard-specific components
│   │   ├── icons/         # Custom icon components
│   │   ├── layout/        # Layout components (navbar, footer)
│   │   ├── pricing/       # Pricing components
│   │   ├── sections/      # Page section components
│   │   ├── theme/         # Theme components
│   │   └── ui/            # UI components (shadcn/ui)
│   ├── config/            # Configuration files
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility functions and shared code
└── ...
```

## 🧪 Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

For test coverage:

```bash
npm run test:coverage
# or
yarn test:coverage
```

## 🚀 Deployment

### Deploying to Vercel

This project is configured for easy deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the project in the Vercel dashboard
3. Set the following environment variables in the Vercel dashboard:
   - `DATABASE_URL`: Your production database connection string
   - `JWT_SECRET`: A secure random string for JWT token generation
   - `JWT_EXPIRES_IN`: Token expiration time (e.g., "15m")
   - `REFRESH_TOKEN_EXPIRES_IN`: Refresh token expiration (e.g., "7d")
   - `NEXTAUTH_SECRET`: A secure random string for NextAuth
   - `NEXTAUTH_URL`: Your Vercel deployment URL (e.g., "https://your-app.vercel.app")

4. Deploy the project

The project includes a `vercel.json` configuration file that handles the build process automatically.

## 🔍 Key Features Explained

### Trading Challenges

FundedWhales offers three tiers of trading challenges:

1. **Whale Hunter** - Entry level funded accounts:
   - Account sizes: $25K, $50K, $100K, $200K
   - 14-day time limit
   - 8% maximum loss
   - 5% profit target
   - 80% profit share

2. **Deep Ocean** - Advanced trader program:
   - Account sizes: $300K, $500K, $1M
   - 30-day time limit
   - 10% maximum loss
   - 8% profit target
   - 85% profit share

3. **Blue Whale** - Elite trader program:
   - Account sizes: $2M, $5M, $10M
   - 45-day time limit
   - 12% maximum loss
   - 10% profit target
   - 90% profit share

### Dashboard Analytics

The trader dashboard provides comprehensive analytics:

- **Trading Stats**: Track balance, equity, profit/loss, win rate, and more
- **TradingView Charts**: Analyze markets with professional charting tools
- **MyFXBook Integration**: Connect your MyFXBook account for detailed performance tracking
- **Challenge Tracker**: Monitor your progress through trading challenges
- **Profit Split Calculator**: Calculate potential earnings based on your trading performance

### Payment Processing

Secure payment options for funding your trading account:

- **USDT (BEP20)**: Pay with cryptocurrency using the BEP20 network
- **QR Code Generation**: Easily scan and pay with mobile wallets
- **Transaction Tracking**: Monitor payment status in real-time
- **Automatic Account Activation**: Trading accounts are activated automatically upon payment confirmation

## 🌟 Why FundedWhales?

- **Rapid Funding**: Get funded quickly after passing our challenge
- **High Profit Split**: Enjoy up to 90% profit sharing
- **24/7 Support**: Our dedicated support team is always available
- **Advanced Analytics**: Access comprehensive trading analytics
- **Risk Management**: Trade with peace of mind with robust risk protocols
- **Global Markets Access**: Trade forex, indices, commodities, and cryptocurrencies
- **Flexible Account Sizes**: Choose from multiple account sizes
- **No Time Restrictions**: Trade at your own pace
- **Scaling Opportunities**: Grow your account size through consistent profitability
- **Sleek Dark Mode**: Exclusive dark theme design for comfortable trading in any lighting condition

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please email [support@fundedwhales.com](mailto:support@fundedwhales.com).

---

<div align="center">
  <p>© 2025 FundedWhales. All rights reserved.</p>
  <p>
    <a href="#">Terms of Service</a> •
    <a href="#">Privacy Policy</a> •
    <a href="#">Contact Us</a>
  </p>
</div>

# funded-whales