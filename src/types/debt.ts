export interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

export interface PaymentSchedule {
  month: number;
  debtName: string;
  payment: number;
  principalPayment: number;
  interestPayment: number;
  remainingBalance: number;
}

export interface RepaymentPlan {
  method: 'snowball' | 'avalanche';
  totalInterest: number;
  totalMonths: number;
  totalPaid: number;
  monthlyPayments: PaymentSchedule[];
}
