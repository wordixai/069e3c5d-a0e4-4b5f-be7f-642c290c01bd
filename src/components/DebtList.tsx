import { Debt } from '../types/debt';
import { formatCurrency, formatPercent } from '../utils/debtCalculations';
import { Trash2 } from 'lucide-react';

interface DebtListProps {
  debts: Debt[];
  onRemoveDebt: (id: string) => void;
}

export const DebtList = ({ debts, onRemoveDebt }: DebtListProps) => {
  if (debts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No debts added yet. Add your first debt above.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {debts.map((debt) => (
        <div
          key={debt.id}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-lg text-foreground">{debt.name}</h3>
            <button
              onClick={() => onRemoveDebt(debt.id)}
              className="text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Remove debt"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Balance</p>
              <p className="font-semibold text-foreground">{formatCurrency(debt.balance)}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Interest Rate</p>
              <p className="font-semibold text-foreground">{formatPercent(debt.interestRate)}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Min. Payment</p>
              <p className="font-semibold text-foreground">{formatCurrency(debt.minimumPayment)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
