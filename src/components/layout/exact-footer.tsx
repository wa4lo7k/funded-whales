"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import {
  Facebook,
  Instagram,
  Mail,
  ExternalLink,
  FileText,
  Shield,
  AlertCircle,
  ChevronRight,
  Send,
  BookOpen,
  GraduationCap,
  HelpCircle,
  Building,
  MessageSquare
} from 'lucide-react'
import Link from "next/link"

export function ExactFooter() {
  return (
    <footer className="relative bg-[#0A0F1C] text-white border-t border-blue-900/30">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute w-[800px] h-[800px] -left-96 top-0 bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute w-[800px] h-[800px] -right-96 bottom-0 bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-black/20" />
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Top section with logo and main links */}
        <div className="pt-16 pb-12 border-b border-blue-900/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Funded Whales
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Professional trading challenges and funded accounts for serious traders. Access institutional-grade tools and support to elevate your trading career.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/fundedwhales/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-blue-950/30 hover:bg-blue-900/30 transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-blue-300" />
                </a>
                <a
                  href="https://t.me/fundedwhales"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-blue-950/30 hover:bg-blue-900/30 transition-colors duration-300"
                  aria-label="Telegram"
                >
                  <Send className="w-5 h-5 text-blue-300" />
                </a>
                <a
                  href="https://www.instagram.com/fundedwhales"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-blue-950/30 hover:bg-blue-900/30 transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-blue-300" />
                </a>
                <a
                  href="https://discord.gg/ZzG8demuuz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-blue-950/30 hover:bg-blue-900/30 transition-colors duration-300"
                  aria-label="Discord"
                >
                  <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Platform links */}
            <div className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400">Platform</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-blue-400 text-sm flex items-center gap-2 group transition-colors duration-200">
                    <GraduationCap className="w-4 h-4 text-blue-600/70" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Trading Challenges</span>
                  </Link>
                </li>

                <li>
                  <Link href="#" className="text-gray-300 hover:text-blue-400 text-sm flex items-center gap-2 group transition-colors duration-200">
                    <BookOpen className="w-4 h-4 text-blue-600/70" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Learning Resources</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company links */}
            <div className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-blue-400 text-sm flex items-center gap-2 group transition-colors duration-200">
                    <Building className="w-4 h-4 text-blue-600/70" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">About Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-blue-400 text-sm flex items-center gap-2 group transition-colors duration-200">
                    <MessageSquare className="w-4 h-4 text-blue-600/70" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Contact</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-blue-400 text-sm flex items-center gap-2 group transition-colors duration-200">
                    <HelpCircle className="w-4 h-4 text-blue-600/70" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">FAQ</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support section */}
            <div className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400">Support</h3>
              <p className="text-gray-300 text-sm">Need help? Our support team is available to assist you.</p>
              <div className="flex items-center space-x-3 text-gray-300 bg-blue-950/30 p-3 rounded-lg">
                <Mail className="w-5 h-5 text-blue-400" />
                <a href="mailto:support@fundedwhales.com" className="text-sm hover:text-blue-400 transition-colors duration-200">
                  support@fundedwhales.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer section */}
        <div className="py-8 border-b border-blue-900/20">
          <div className="bg-blue-950/20 rounded-lg p-4 border border-blue-900/30">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-300 mb-2">Risk Disclosure</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Trading financial markets carries substantial risk of loss. Content is educational only and not financial advice. Funded Whales does not execute trades or manage funds. [...]
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and legal links */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs">
              © {new Date().getFullYear()} Funded Whales. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="#" className="text-gray-400 hover:text-blue-400 text-xs flex items-center gap-1 transition-colors duration-200">
                <FileText className="w-3 h-3" />
                <span>Terms of Service</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 text-xs flex items-center gap-1 transition-colors duration-200">
                <Shield className="w-3 h-3" />
                <span>Privacy Policy</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 text-xs flex items-center gap-1 transition-colors duration-200">
                <ExternalLink className="w-3 h-3" />
                <span>Cookies</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
