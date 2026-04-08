import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { year: '2018', applied: 80,  enrolled: 30,  graduated: 0   },
  { year: '2019', applied: 160, enrolled: 62,  graduated: 24  },
  { year: '2020', applied: 220, enrolled: 88,  graduated: 55  },
  { year: '2021', applied: 310, enrolled: 130, graduated: 82  },
  { year: '2022', applied: 420, enrolled: 178, graduated: 118 },
  { year: '2023', applied: 580, enrolled: 245, graduated: 162 },
  { year: '2024', applied: 740, enrolled: 320, graduated: 224 },
  { year: '2025', applied: 890, enrolled: 398, graduated: 310 },
  { year: '2026', applied: 1020, enrolled: 457, graduated: 380 },
];

export function BootcampEnrollmentChart() {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
        <h2 className="text-lg font-semibold text-gray-900 tracking-tight">All Time Enrollment Data</h2>
        <span className="text-xs text-gray-400 font-medium">Year over Year</span>
      </div>

      <div className="bg-white rounded-xl p-8 border border-gray-100">
        <div className="flex flex-wrap gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#0747A1]" />
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-widest">Applied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#60A5FA]" />
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-widest">Enrolled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#10B981]" />
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-widest">Graduated</span>
          </div>
        </div>

        <div className="w-full h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 11 }}
                dx={-10}
              />
              <Tooltip
                cursor={{ fill: '#F8FAFC', opacity: 0.6 }}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #F1F5F9',
                  borderRadius: '8px',
                  padding: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                  fontSize: '12px',
                  color: '#475569',
                }}
                labelStyle={{ color: '#0747A1', fontWeight: 700, marginBottom: '6px', fontSize: '13px' }}
                itemStyle={{ padding: '2px 0' }}
              />
              <Bar dataKey="applied"   name="Applied"   fill="#0747A1" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="enrolled"  name="Enrolled"  fill="#60A5FA" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="graduated" name="Graduated" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
