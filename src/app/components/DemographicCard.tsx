import { User, UserCheck } from 'lucide-react';

interface DemographicCardProps {
  program: string;
  averageAge: number;
  malePercent: number;
  femalePercent: number;
}

export function DemographicCard({ program, averageAge, malePercent, femalePercent }: DemographicCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-200 transition-colors">
      <div className="flex flex-col gap-6">
        <div>
          <h4 className="text-gray-900 text-lg font-semibold tracking-tight">{program}</h4>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">Avg. Age</span>
            <span className="text-[#0747A1] text-sm font-bold">{averageAge}</span>
          </div>
        </div>
        
        <div className="space-y-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-500 font-medium">Male</span>
              </div>
              <span className="text-xs text-[#0747A1] font-bold">{malePercent}%</span>
            </div>
            <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-[#0747A1] h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${malePercent}%` }}
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-500 font-medium">Female</span>
              </div>
              <span className="text-xs text-[#60A5FA] font-bold">{femalePercent}%</span>
            </div>
            <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-[#60A5FA] h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${femalePercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
