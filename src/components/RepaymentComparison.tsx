import { RepaymentPlan } from '../types/debt';
import { formatCurrency } from '../utils/debtCalculations';
import { TrendingDown, Calendar, DollarSign, Sparkles, Target } from 'lucide-react';

interface RepaymentComparisonProps {
  snowballPlan: RepaymentPlan;
  avalanchePlan: RepaymentPlan;
}

export const RepaymentComparison = ({ snowballPlan, avalanchePlan }: RepaymentComparisonProps) => {
  const savingsWithAvalanche = snowballPlan.totalInterest - avalanchePlan.totalInterest;
  const timeSavingsWithAvalanche = snowballPlan.totalMonths - avalanchePlan.totalMonths;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Snowball Method */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles className="text-primary-foreground" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Snowball Method</h3>
            <p className="text-sm text-muted-foreground">Lowest balance first</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="text-primary" size={20} />
            <div>
              <p className="text-sm text-muted-foreground">Time to Debt-Free</p>
              <p className="text-lg font-semibold text-foreground">
                {snowballPlan.totalMonths} months ({Math.floor(snowballPlan.totalMonths / 12)} years)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DollarSign className="text-primary" size={20} />
            <div>
              <p className="text-sm text-muted-foreground">Total Interest</p>
              <p className="text-lg font-semibold text-foreground">
                {formatCurrency(snowballPlan.totalInterest)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <TrendingDown className="text-primary" size={20} />
            <div>
              <p className="text-sm text-muted-foreground">Total Paid</p>
              <p className="text-lg font-semibold text-foreground">
                {formatCurrency(snowballPlan.totalPaid)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-card/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Best for:</strong> Quick wins and motivation.
            Pay off smallest debts first to build momentum.
          </p>
        </div>
      </div>

      {/* Avalanche Method */}
      <div className="bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
            <Target className="text-accent-foreground" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Avalanche Method</h3>
            <p className="text-sm text-muted-foreground">Highest interest first</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="text-accent" size={20} />
            <div>
              <p className="text-sm text-muted-foreground">Time to Debt-Free</p>
              <p className="text-lg font-semibold text-foreground">
                {avalanchePlan.totalMonths} months ({Math.floor(avalanchePlan.totalMonths / 12)} years)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DollarSign className="text-accent" size={20} />
            <div>
              <p className="text-sm text-muted-foreground">Total Interest</p>
              <p className="text-lg font-semibold text-foreground">
                {formatCurrency(avalanchePlan.totalInterest)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <TrendingDown className="text-accent" size={20} />
            <div>
              <p className="text-sm text-muted-foreground">Total Paid</p>
              <p className="text-lg font-semibold text-foreground">
                {formatCurrency(avalanchePlan.totalPaid)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-card/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Best for:</strong> Saving money.
            Pay off highest interest debts first to minimize total interest.
          </p>
        </div>
      </div>

      {/* Savings Comparison */}
      {savingsWithAvalanche > 0 && (
        <div className="md:col-span-2 bg-gradient-to-r from-accent/10 to-primary/10 border border-border rounded-xl p-6">
          <h4 className="text-lg font-semibold text-foreground mb-3">Savings with Avalanche Method</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <DollarSign className="text-accent-foreground" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Interest Savings</p>
                <p className="text-2xl font-bold text-accent">
                  {formatCurrency(savingsWithAvalanche)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Calendar className="text-primary-foreground" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time Savings</p>
                <p className="text-2xl font-bold text-primary">
                  {timeSavingsWithAvalanche} months
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
