"use client";

import { useAuth } from "@/contexts/auth-context";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Users,
  Trophy,
  CreditCard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  UserPlus,
  CheckCircle,
  XCircle
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

interface DashboardStats {
  totalUsers: number;
  totalAdmins: number;
  totalChallenges: number;
  activeChallenges: number;
  completedChallenges: number;
  failedChallenges: number;
  totalPayments: number;
  pendingPayments: number;
  completedPayments: number;
  totalRevenue: number;
  recentUsers: Array<{
    id: string;
    name: string | null;
    email: string;
    createdAt: string;
  }>;
  recentPayments: Array<{
    id: string;
    amount: number;
    status: string;
    method: string;
    createdAt: string;
  }>;
  userGrowth: Array<{
    date: string;
    count: number;
  }>;
  challengeDistribution: Array<{
    name: string;
    value: number;
  }>;
  paymentMethods: Array<{
    name: string;
    value: number;
  }>;
}

export default function AdminDashboardPage() {
  const { accessToken } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (accessToken) {
      fetchDashboardStats();
    }
  }, [accessToken]);

  const fetchDashboardStats = async () => {
    setIsLoading(true);
    try {
      // In a real application, this would be an API call to fetch dashboard stats
      // For now, we'll use mock data

      // Mock data for dashboard stats
      const mockStats: DashboardStats = {
        totalUsers: 156,
        totalAdmins: 3,
        totalChallenges: 210,
        activeChallenges: 87,
        completedChallenges: 98,
        failedChallenges: 25,
        totalPayments: 183,
        pendingPayments: 12,
        completedPayments: 171,
        totalRevenue: 28750,
        recentUsers: [
          { id: '1', name: 'John Doe', email: 'john@example.com', createdAt: '2023-04-25T10:30:00Z' },
          { id: '2', name: 'Jane Smith', email: 'jane@example.com', createdAt: '2023-04-24T14:20:00Z' },
          { id: '3', name: 'Mike Johnson', email: 'mike@example.com', createdAt: '2023-04-23T09:15:00Z' },
          { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', createdAt: '2023-04-22T16:45:00Z' },
        ],
        recentPayments: [
          { id: '1', amount: 199, status: 'COMPLETED', method: 'USDT_BEP20', createdAt: '2023-04-25T11:20:00Z' },
          { id: '2', amount: 99, status: 'COMPLETED', method: 'CREDIT_CARD', createdAt: '2023-04-24T15:30:00Z' },
          { id: '3', amount: 399, status: 'PENDING', method: 'USDT_BEP20', createdAt: '2023-04-23T10:45:00Z' },
          { id: '4', amount: 199, status: 'COMPLETED', method: 'BANK_TRANSFER', createdAt: '2023-04-22T09:10:00Z' },
        ],
        userGrowth: [
          { date: '2023-01', count: 45 },
          { date: '2023-02', count: 62 },
          { date: '2023-03', count: 78 },
          { date: '2023-04', count: 95 },
          { date: '2023-05', count: 110 },
          { date: '2023-06', count: 129 },
          { date: '2023-07', count: 156 },
        ],
        challengeDistribution: [
          { name: 'Whale Hunter', value: 98 },
          { name: 'Deep Ocean', value: 75 },
          { name: 'Blue Whale', value: 37 },
        ],
        paymentMethods: [
          { name: 'USDT-BEP20', value: 112 },
          { name: 'Credit Card', value: 48 },
          { name: 'Bank Transfer', value: 23 },
        ],
      };

      setStats(mockStats);
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">Failed to load dashboard data</h2>
        <Button onClick={fetchDashboardStats} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={fetchDashboardStats} size="sm">
          Refresh Data
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <GlassCard className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Users</p>
              <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.totalAdmins} admins, {stats.totalUsers - stats.totalAdmins} traders
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Challenges</p>
              <h3 className="text-2xl font-bold">{stats.activeChallenges}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.completedChallenges} completed, {stats.failedChallenges} failed
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full">
              <Trophy className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
              <h3 className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                From {stats.completedPayments} payments
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending Payments</p>
              <h3 className="text-2xl font-bold">{stats.pendingPayments}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Requiring verification
              </p>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900/20 p-3 rounded-full">
              <CreditCard className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={stats.userGrowth}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0088FE" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#0088FE"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 gap-6">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4">Challenge Distribution</h3>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.challengeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {stats.challengeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} challenges`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.paymentMethods}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {stats.paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} payments`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <div className="p-6 border-b border-border">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Recent Users</h3>
              <Button variant="outline" size="sm" asChild>
                <a href="/admin/users">View All</a>
              </Button>
            </div>
          </div>
          <div className="divide-y divide-border">
            {stats.recentUsers.map((user) => (
              <div key={user.id} className="p-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <UserPlus className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{user.name || 'Anonymous'}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-6 border-b border-border">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Recent Payments</h3>
              <Button variant="outline" size="sm" asChild>
                <a href="/admin/payments">View All</a>
              </Button>
            </div>
          </div>
          <div className="divide-y divide-border">
            {stats.recentPayments.map((payment) => (
              <div key={payment.id} className="p-4 flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
                  style={{
                    backgroundColor: payment.status === 'COMPLETED' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    color: payment.status === 'COMPLETED' ? 'rgb(16, 185, 129)' : 'rgb(245, 158, 11)'
                  }}
                >
                  {payment.status === 'COMPLETED' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <CreditCard className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">${payment.amount}</p>
                  <p className="text-sm text-muted-foreground">{payment.method.replace('_', '-')}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    payment.status === 'COMPLETED' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {payment.status}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
