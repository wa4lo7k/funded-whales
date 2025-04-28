"use client";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GlassCard } from "../ui/glass-card";

export function UserProfile() {
  const { user, logout, isLoading } = useAuth();

  if (!user) {
    return null;
  }

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
    <GlassCard className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.image || ""} alt={user.name || "User"} />
          <AvatarFallback className="text-lg">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>

        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-muted-foreground">{user.email}</p>
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {user.role === "ADMIN" ? "Administrator" : "User"}
          </div>
        </div>

        <div className="w-full pt-4 border-t border-border">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account type</span>
              <span className="font-medium">
                {user.role === "ADMIN" ? "Administrator" : "Standard User"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{user.email}</span>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full mt-6"
          onClick={() => logout()}
          disabled={isLoading}
        >
          {isLoading ? "Logging out..." : "Sign out"}
        </Button>
      </div>
    </GlassCard>
  );
}
