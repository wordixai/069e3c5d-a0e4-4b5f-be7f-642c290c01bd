import { useState } from 'react';
import { Debt } from '../types/debt';

interface DebtFormProps {
  onAddDebt: (debt: Omit<Debt, 'id'>) => void;
}

export const DebtForm = ({ onAddDebt }: DebtFormProps) => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [minimumPayment, setMinimumPayment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !balance || !interestRate || !minimumPayment) return;

    onAddDebt({
      name,
      balance: parseFloat(balance),
      interestRate: parseFloat(interestRate),
      minimumPayment: parseFloat(minimumPayment),
    });

    setName('');
    setBalance('');
    setInterestRate('');
    setMinimumPayment('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
          Debt Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Credit Card, Student Loan..."
          className="w-full px-4 py-2.5 bg-card border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="balance" className="block text-sm font-medium text-foreground mb-1.5">
            Balance ($)
          </label>
          <input
            id="balance"
            type="number"
            step="0.01"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            placeholder="5000"
            className="w-full px-4 py-2.5 bg-card border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label htmlFor="rate" className="block text-sm font-medium text-foreground mb-1.5">
            Interest Rate (%)
          </label>
          <input
            id="rate"
            type="number"
            step="0.01"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="18.99"
            className="w-full px-4 py-2.5 bg-card border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label htmlFor="minimum" className="block text-sm font-medium text-foreground mb-1.5">
            Min. Payment ($)
          </label>
          <input
            id="minimum"
            type="number"
            step="0.01"
            value={minimumPayment}
            onChange={(e) => setMinimumPayment(e.target.value)}
            placeholder="150"
            className="w-full px-4 py-2.5 bg-card border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        Add Debt
      </button>
    </form>
  );
};
