import { redirect } from 'next/navigation';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trading Challenges | Funded Whales",
  description: "Explore our trading challenges and get funded with Funded Whales",
};

export default function HftNeoPage() {
  // Redirect to the main pricing page
  redirect('/#pricing');
}
