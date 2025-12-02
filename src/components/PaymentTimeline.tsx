import { useState } from 'react';
import { RepaymentPlan } from '../types/debt';
import { formatCurrency } from '../utils/debtCalculations';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PaymentTimelineProps {
  plan: RepaymentPlan;
}

export const PaymentTimeline = ({ plan }: PaymentTimelineProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'snowball' | 'avalanche'>(plan.method);
  const [showAll, setShowAll] = useState(false);

  // Group payments by month
  const groupedPayments = plan.monthlyPayments.reduce((acc, payment) => {
    if (!acc[payment.month]) {
      acc[payment.month] = [];
    }
    acc[payment.month].push(payment);
    return acc;
  }, {} as Record<number, typeof plan.monthlyPayments>);

  const months = Object.keys(groupedPayments).map(Number).sort((a, b) => a - b);
  const displayMonths = showAll ? months : months.slice(0, 12);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-foreground">Payment Timeline</h3>
        <div className="text-sm text-muted-foreground">
          {plan.method === 'snowball' ? '❄️ Snowball' : '🎯 Avalanche'} Method
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {displayMonths.map((month) => {
          const payments = groupedPayments[month];
          const totalPayment = payments.reduce((sum, p) => sum + p.payment, 0);

          return (
            <div key={month} className="bg-card border border-border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{month}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Month {month}</p>
                    <p className="text-sm text-muted-foreground">
                      Total: {formatCurrency(totalPayment)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {payments.map((payment, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-sm bg-muted/50 rounded px-3 py-2"
                  >
                    <span className="font-medium text-foreground">{payment.debtName}</span>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        {formatCurrency(payment.payment)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Balance: {formatCurrency(payment.remainingBalance)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {months.length > 12 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full flex items-center justify-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors py-2"
        >
          {showAll ? (
            <>
              Show Less <ChevronUp size={16} />
            </>
          ) : (
            <>
              Show All {months.length} Months <ChevronDown size={16} />
            </>
          )}
        </button>
      )}
    </div>
  );
};
