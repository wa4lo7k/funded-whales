"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useAuth } from "@/contexts/auth-context";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogIn,
  RefreshCcw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  // Navigation links
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#why-us", label: "Why Us" },
    { href: "#pricing", label: "Pricing" },
    { href: "#join-us", label: "Join Us" },
    { href: "#faq", label: "FAQ" },
  ];

  // Handle scroll effect and active section
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background - transition to transparent on scroll
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));

      // Find the current section in view
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // Update URL without page reload
      window.history.pushState(null, '', href);

      // Close mobile menu if open
      if (isOpen) setIsOpen(false);
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };



  return (
    <header
      className={cn(
        "fixed mt-2 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "py-1 glass shadow-sm" // Original glass effect when scrolled
          : "py-2 bg-[#0c2d48]" // Dark blue background when not scrolled, reduced height
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-2 z-10">
          <Image
            src="/logo.svg"
            alt="Funded Whales Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="text-xl font-bold gradient-text hidden sm:inline-block">
            FundedWhales
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md hover:bg-primary/10 transition-colors",
                activeSection === link.href.substring(1)
                  ? "bg-primary/10 gradient-text font-bold"
                  : scrolled
                    ? "hover:gradient-text"
                    : "text-white hover:text-white/80"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <UserMenu user={user} logout={logout} getInitials={getInitials} />
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className={!scrolled && "text-white hover:text-white/80"}>
                <Link href="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
              <Button asChild size="sm" className="bg-gradient-to-r from-primary to-accent text-white">
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={cn(
            "md:hidden z-10 p-2",
            !scrolled && "text-white"
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-0 left-0 w-full h-screen bg-background z-40 md:hidden"
            >
              <div className="flex flex-col h-full pt-20 pb-6 px-6">
                <nav className="flex flex-col space-y-4 mb-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "py-3 text-lg font-medium border-b border-border",
                        activeSection === link.href.substring(1) && "gradient-text font-bold"
                      )}
                      onClick={(e) => scrollToSection(e, link.href)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto flex flex-col gap-3">
                  {user ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 p-3 border border-border rounded-md">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name || "User"}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>

                      <Link
                        href="/dashboard"
                        className="py-3 text-center border border-border rounded-md"
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>

                      {user.role === "ADMIN" && (
                        <Link
                          href="/admin"
                          className="py-3 text-center border border-border rounded-md"
                          onClick={() => setIsOpen(false)}
                        >
                          Admin Portal
                        </Link>
                      )}

                      <Button
                        variant="destructive"
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                      >
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button asChild variant="outline" size="lg">
                        <Link
                          href="/login"
                          onClick={() => setIsOpen(false)}
                        >
                          <LogIn className="h-4 w-4 mr-2" />
                          Login
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        className="bg-gradient-to-r from-primary to-accent text-white"
                      >
                        <Link
                          href="/register"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

// User menu component for desktop view
function UserMenu({
  user,
  logout,
  getInitials
}: {
  user: { id: string; name: string | null; email: string; role: string; };
  logout: () => Promise<void>;
  getInitials: (name: string | null) => string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 glass">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        {user.role === "ADMIN" && (
          <DropdownMenuItem asChild>
            <Link href="/admin">Admin Portal</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
