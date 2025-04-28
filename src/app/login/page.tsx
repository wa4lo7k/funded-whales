import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Funded Whales",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
