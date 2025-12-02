import { Debt, PaymentSchedule, RepaymentPlan } from '../types/debt';

export const calculateRepaymentPlan = (
  debts: Debt[],
  extraPayment: number,
  method: 'snowball' | 'avalanche'
): RepaymentPlan => {
  const debtsCopy = debts.map(d => ({ ...d, currentBalance: d.balance }));
  const monthlyPayments: PaymentSchedule[] = [];
  let month = 0;
  let totalInterest = 0;

  // Sort debts based on method
  const sortedDebts = method === 'snowball'
    ? [...debtsCopy].sort((a, b) => a.currentBalance - b.currentBalance)
    : [...debtsCopy].sort((a, b) => b.interestRate - a.interestRate);

  while (debtsCopy.some(d => d.currentBalance > 0)) {
    month++;

    // Prevent infinite loops
    if (month > 600) break;

    let remainingExtraPayment = extraPayment;

    debtsCopy.forEach(debt => {
      if (debt.currentBalance <= 0) return;

      const monthlyInterestRate = debt.interestRate / 100 / 12;
      const interestPayment = debt.currentBalance * monthlyInterestRate;

      let payment = debt.minimumPayment;

      // Add extra payment to the priority debt
      const isPriorityDebt = sortedDebts.find(d => d.currentBalance > 0)?.id === debt.id;
      if (isPriorityDebt) {
        payment += remainingExtraPayment;
        remainingExtraPayment = 0;
      }

      // Don't overpay
      const maxPayment = debt.currentBalance + interestPayment;
      payment = Math.min(payment, maxPayment);

      const principalPayment = payment - interestPayment;
      debt.currentBalance -= principalPayment;

      if (debt.currentBalance < 0) debt.currentBalance = 0;

      totalInterest += interestPayment;

      monthlyPayments.push({
        month,
        debtName: debt.name,
        payment,
        principalPayment,
        interestPayment,
        remainingBalance: debt.currentBalance,
      });
    });

    // Update sorted debts for next iteration
    sortedDebts.sort((a, b) =>
      method === 'snowball'
        ? a.currentBalance - b.currentBalance
        : b.interestRate - a.interestRate
    );
  }

  const totalPaid = debts.reduce((sum, d) => sum + d.balance, 0) + totalInterest;

  return {
    method,
    totalInterest,
    totalMonths: month,
    totalPaid,
    monthlyPayments,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatPercent = (value: number): string => {
  return `${value.toFixed(2)}%`;
};
