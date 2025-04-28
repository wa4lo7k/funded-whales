"use client";

import { GlassCard } from "@/components/ui/glass-card";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Clock, Copy, CreditCard, DollarSign, ExternalLink, RefreshCcw } from "lucide-react";
import QRCode from "react-qr-code";
import { Badge } from "@/components/ui/badge";

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  method: "USDT_BEP20" | "CREDIT_CARD" | "BANK_TRANSFER";
  transactionId: string | null;
  walletAddress: string | null;
  paymentDate: string | null;
  expiresAt: string | null;
  challenge: {
    id: string;
    type: string;
  } | null;
}

const statusConfig = {
  PENDING: {
    color: "bg-yellow-500",
    label: "Pending",
    icon: Clock,
  },
  COMPLETED: {
    color: "bg-green-500",
    label: "Completed",
    icon: CheckCircle,
  },
  FAILED: {
    color: "bg-red-500",
    label: "Failed",
    icon: AlertCircle,
  },
  REFUNDED: {
    color: "bg-blue-500",
    label: "Refunded",
    icon: RefreshCcw,
  },
};

const methodConfig = {
  USDT_BEP20: {
    label: "USDT (BEP20)",
    icon: DollarSign,
  },
  CREDIT_CARD: {
    label: "Credit Card",
    icon: CreditCard,
  },
  BANK_TRANSFER: {
    label: "Bank Transfer",
    icon: DollarSign,
  },
};

export function PaymentProcessor() {
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!accessToken) return;

      try {
        const response = await fetch("/api/user/payments", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch payment data");
        }

        const data = await response.json();
        setPayments(data.payments);
        setWalletAddress(data.walletAddress);
      } catch (error) {
        console.error("Error fetching payments:", error);
        toast.error("Failed to load payment data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [accessToken]);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
    toast.success("Wallet address copied to clipboard");
  };

  const handlePaymentSelect = (payment: Payment) => {
    setSelectedPayment(payment);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const pendingPayment = payments.find(p => p.status === "PENDING");

  return (
    <div className="space-y-6">
      <Tabs defaultValue={pendingPayment ? "pending" : "history"} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="pending">Pending Payments</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {pendingPayment ? (
            <GlassCard>
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Payment Required</h3>
                    <div className="flex items-center">
                      <Badge className="bg-yellow-500 text-white">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                      {pendingPayment.expiresAt && (
                        <span className="text-xs text-muted-foreground ml-2">
                          Expires: {new Date(pendingPayment.expiresAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-sm text-muted-foreground">Amount Due</div>
                    <div className="text-2xl font-bold">${pendingPayment.amount.toFixed(2)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium mb-4">Pay with USDT (BEP20)</h4>
                    <div className="bg-white p-4 rounded-lg mb-4 flex justify-center">
                      <QRCode
                        size={180}
                        value={`binance:${walletAddress}?amount=${pendingPayment.amount}&token=USDT`}
                        viewBox={`0 0 256 256`}
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Wallet Address (BEP20)</div>
                        <div className="flex items-center">
                          <div className="bg-[var(--glass-background)] p-2 rounded text-sm font-mono flex-1 overflow-hidden text-ellipsis">
                            {walletAddress}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2"
                            onClick={handleCopyAddress}
                          >
                            {copySuccess ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Amount</div>
                        <div className="bg-[var(--glass-background)] p-2 rounded text-sm font-mono">
                          {pendingPayment.amount} USDT
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <AlertCircle className="h-4 w-4 inline-block mr-1" />
                        Please make sure to send USDT on the BEP20 (Binance Smart Chain) network only.
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">Payment Instructions</h4>
                    <ol className="space-y-3 text-sm">
                      <li className="flex">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                        <span>Copy the wallet address or scan the QR code with your crypto wallet app.</span>
                      </li>
                      <li className="flex">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                        <span>Send exactly <strong>{pendingPayment.amount} USDT</strong> using the BEP20 network (Binance Smart Chain).</span>
                      </li>
                      <li className="flex">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                        <span>After sending, it may take 5-10 minutes for the transaction to be confirmed.</span>
                      </li>
                      <li className="flex">
                        <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">4</span>
                        <span>Once confirmed, your challenge will be automatically activated.</span>
                      </li>
                    </ol>

                    <div className="mt-6 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-sm">
                      <div className="font-medium mb-1">Important Notes:</div>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Only send USDT on the BEP20 network.</li>
                        <li>Sending any other token or using a different network may result in permanent loss of funds.</li>
                        <li>Include your email in the transaction memo if possible.</li>
                      </ul>
                    </div>

                    <div className="mt-6">
                      <Button className="w-full">
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        I've Made the Payment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ) : (
            <GlassCard>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">No Pending Payments</h3>
                <p className="text-muted-foreground mb-4">
                  You don't have any pending payments at the moment.
                </p>
                <Button>Start a New Challenge</Button>
              </div>
            </GlassCard>
          )}
        </TabsContent>

        <TabsContent value="history">
          {payments.length > 0 ? (
            <div className="space-y-6">
              <GlassCard>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[var(--border)]">
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Challenge</th>
                        <th className="text-left py-3 px-4">Method</th>
                        <th className="text-right py-3 px-4">Amount</th>
                        <th className="text-center py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => {
                        const status = statusConfig[payment.status];
                        const method = methodConfig[payment.method];
                        const StatusIcon = status.icon;
                        const MethodIcon = method.icon;

                        return (
                          <tr key={payment.id} className="border-b border-[var(--border)]">
                            <td className="py-3 px-4">
                              {payment.paymentDate
                                ? new Date(payment.paymentDate).toLocaleDateString()
                                : payment.expiresAt
                                  ? `Due: ${new Date(payment.expiresAt).toLocaleDateString()}`
                                  : "N/A"}
                            </td>
                            <td className="py-3 px-4">
                              {payment.challenge
                                ? payment.challenge.type.replace("_", " ").replace("_", " ")
                                : "N/A"}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <MethodIcon className="w-4 h-4 mr-1 text-muted-foreground" />
                                {method.label}
                              </div>
                            </td>
                            <td className="text-right py-3 px-4 font-medium">
                              ${payment.amount.toFixed(2)}
                            </td>
                            <td className="text-center py-3 px-4">
                              <Badge className={`${status.color} text-white`}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {status.label}
                              </Badge>
                            </td>
                            <td className="text-right py-3 px-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePaymentSelect(payment)}
                              >
                                Details
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </GlassCard>

              {selectedPayment && (
                <GlassCard>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">Payment Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Payment ID</div>
                            <div className="font-medium">{selectedPayment.id}</div>
                          </div>

                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Amount</div>
                            <div className="font-medium">${selectedPayment.amount.toFixed(2)} {selectedPayment.currency}</div>
                          </div>

                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Status</div>
                            <div>
                              <Badge className={`${statusConfig[selectedPayment.status].color} text-white`}>
                                {React.createElement(statusConfig[selectedPayment.status].icon, { className: "w-3 h-3 mr-1" })}
                                {statusConfig[selectedPayment.status].label}
                              </Badge>
                            </div>
                          </div>

                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Payment Method</div>
                            <div className="font-medium">
                              {React.createElement(methodConfig[selectedPayment.method].icon, { className: "w-4 h-4 inline-block mr-1" })}
                              {methodConfig[selectedPayment.method].label}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Date</div>
                            <div className="font-medium">
                              {selectedPayment.paymentDate
                                ? new Date(selectedPayment.paymentDate).toLocaleString()
                                : "Not paid yet"}
                            </div>
                          </div>

                          {selectedPayment.expiresAt && (
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Expires</div>
                              <div className="font-medium">
                                {new Date(selectedPayment.expiresAt).toLocaleString()}
                              </div>
                            </div>
                          )}

                          {selectedPayment.transactionId && (
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Transaction ID</div>
                              <div className="font-mono text-sm break-all">
                                {selectedPayment.transactionId}
                                {selectedPayment.method === "USDT_BEP20" && (
                                  <a
                                    href={`https://bscscan.com/tx/${selectedPayment.transactionId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center ml-2 text-primary"
                                    title="View transaction on BSC Scan"
                                    aria-label="View transaction on BSC Scan"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    <span className="sr-only">View on BSC Scan</span>
                                  </a>
                                )}
                              </div>
                            </div>
                          )}

                          {selectedPayment.walletAddress && (
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Wallet Address</div>
                              <div className="font-mono text-sm break-all">
                                {selectedPayment.walletAddress}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {selectedPayment.status === "PENDING" && (
                      <div className="mt-6">
                        <Button className="w-full">
                          <RefreshCcw className="w-4 h-4 mr-2" />
                          Check Payment Status
                        </Button>
                      </div>
                    )}
                  </div>
                </GlassCard>
              )}
            </div>
          ) : (
            <GlassCard>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">No Payment History</h3>
                <p className="text-muted-foreground">
                  You haven't made any payments yet.
                </p>
              </div>
            </GlassCard>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
