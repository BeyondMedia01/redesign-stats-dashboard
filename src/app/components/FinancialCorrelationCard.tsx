import { TrendingUp } from 'lucide-react';

interface FinancialCorrelationCardProps {
  program: string;
  capitalInvested: string;
  beneficiaries: number;
  costPerBeneficiary: string;
  efficiency: number;
}

export function FinancialCorrelationCard({
  program,
  capitalInvested,
  beneficiaries,
  costPerBeneficiary,
  efficiency,
}: FinancialCorrelationCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-200 transition-colors">
      <div className="flex flex-col gap-6">
        <div>
          <h4 className="text-gray-900 text-lg font-semibold tracking-tight">{program}</h4>
          <div className="mt-1 flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-[#0747A1]" />
            <span className="text-[#0747A1] text-sm font-bold">{capitalInvested} invested</span>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">Beneficiaries</span>
              <span className="text-xs text-[#0747A1] font-bold">{beneficiaries.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#0747A1] h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${efficiency}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-gray-50">
            <span className="text-xs text-gray-400 font-medium">Cost per beneficiary</span>
            <span className="text-xs text-gray-700 font-bold">{costPerBeneficiary}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
