import { ArrowUpRight } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle: string;
  trend?: string;
  variant?: "primary" | "secondary";
}

export function StatCard({ label, value, subtitle, trend, variant = "primary" }: StatCardProps) {
  if (variant === "secondary") {
    return (
      <div className="bg-white rounded-xl p-5 border border-gray-100 hover:border-gray-200 transition-colors">
        <div className="flex flex-col gap-3">
          <span className="text-gray-400 text-xs font-semibold uppercase tracking-widest">{label}</span>
          <div className="flex items-baseline gap-2">
            <span className="text-[#0747A1] text-3xl font-medium tracking-tight">{value}</span>
            {trend && <span className="text-emerald-500 text-xs font-medium">{trend}</span>}
          </div>
          <span className="text-gray-500 text-xs">{subtitle}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-7 border border-gray-100 group hover:border-[#0747A1]/20 transition-all duration-300">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-start">
          <span className="text-gray-500 text-sm font-medium tracking-wide">{label}</span>
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#0747A1]/5 group-hover:text-[#0747A1] transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        <div>
          <h3 className="text-[#0747A1] text-5xl font-medium tracking-tight mb-2 leading-none">{value}</h3>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
