import { useState } from 'react';
import { Debt } from '../types/debt';
import { calculateRepaymentPlan } from '../utils/debtCalculations';
import { DebtForm } from '../components/DebtForm';
import { DebtList } from '../components/DebtList';
import { RepaymentComparison } from '../components/RepaymentComparison';
import { PaymentTimeline } from '../components/PaymentTimeline';
import { Wallet, Plus, X } from 'lucide-react';

const Index = () => {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [extraPayment, setExtraPayment] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [selectedTimeline, setSelectedTimeline] = useState<'snowball' | 'avalanche'>('avalanche');

  const handleAddDebt = (debt: Omit<Debt, 'id'>) => {
    const newDebt: Debt = {
      ...debt,
      id: crypto.randomUUID(),
    };
    setDebts([...debts, newDebt]);
    setShowForm(false);
  };

  const handleRemoveDebt = (id: string) => {
    setDebts(debts.filter((d) => d.id !== id));
  };

  const extra = parseFloat(extraPayment) || 0;

  const snowballPlan = debts.length > 0 ? calculateRepaymentPlan(debts, extra, 'snowball') : null;
  const avalanchePlan = debts.length > 0 ? calculateRepaymentPlan(debts, extra, 'avalanche') : null;

  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinPayment = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Wallet className="text-primary-foreground" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Debt Repayment Planner</h1>
              <p className="text-muted-foreground">Smart strategies to become debt-free faster</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Summary Cards */}
        {debts.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-muted-foreground mb-1">Total Debt</p>
              <p className="text-3xl font-bold text-foreground">
                ${totalDebt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-muted-foreground mb-1">Min. Monthly Payment</p>
              <p className="text-3xl font-bold text-foreground">
                ${totalMinPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-muted-foreground mb-1">Number of Debts</p>
              <p className="text-3xl font-bold text-foreground">{debts.length}</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Debt Management */}
          <div className="lg:col-span-1 space-y-6">
            {/* Add Debt Section */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-foreground">Your Debts</h2>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="flex items-center gap-2 text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  {showForm ? (
                    <>
                      <X size={16} /> Cancel
                    </>
                  ) : (
                    <>
                      <Plus size={16} /> Add Debt
                    </>
                  )}
                </button>
              </div>

              {showForm && (
                <div className="mb-6">
                  <DebtForm onAddDebt={handleAddDebt} />
                </div>
              )}

              <DebtList debts={debts} onRemoveDebt={handleRemoveDebt} />
            </div>

            {/* Extra Payment Section */}
            {debts.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Extra Payment</h2>
                <div>
                  <label htmlFor="extra" className="block text-sm font-medium text-foreground mb-2">
                    Additional Monthly Payment ($)
                  </label>
                  <input
                    id="extra"
                    type="number"
                    step="0.01"
                    value={extraPayment}
                    onChange={(e) => setExtraPayment(e.target.value)}
                    placeholder="100"
                    className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Add extra to accelerate debt payoff
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            {debts.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-12 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="text-muted-foreground" size={40} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No Debts Added Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Add your debts to see personalized repayment strategies
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Add Your First Debt
                </button>
              </div>
            ) : (
              <>
                {snowballPlan && avalanchePlan && (
                  <>
                    <div className="bg-card border border-border rounded-xl p-6">
                      <h2 className="text-xl font-bold text-foreground mb-6">Repayment Strategies</h2>
                      <RepaymentComparison
                        snowballPlan={snowballPlan}
                        avalanchePlan={avalanchePlan}
                      />
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6">
                      <div className="flex gap-2 mb-6">
                        <button
                          onClick={() => setSelectedTimeline('avalanche')}
                          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                            selectedTimeline === 'avalanche'
                              ? 'bg-accent text-accent-foreground'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                        >
                          Avalanche Timeline
                        </button>
                        <button
                          onClick={() => setSelectedTimeline('snowball')}
                          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                            selectedTimeline === 'snowball'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                        >
                          Snowball Timeline
                        </button>
                      </div>
                      <PaymentTimeline
                        plan={selectedTimeline === 'snowball' ? snowballPlan : avalanchePlan}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
