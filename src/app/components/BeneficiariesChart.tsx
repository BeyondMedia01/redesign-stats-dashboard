import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Line, 
  ComposedChart,
  Cell
} from 'recharts';

const data = [
  { year: '2018', usExpenses: 7000, zimbabweExpenses: 6000, beneficiaries: 8000 },
  { year: '2019', usExpenses: 8000, zimbabweExpenses: 7500, beneficiaries: 9000 },
  { year: '2020', usExpenses: 9000, zimbabweExpenses: 9500, beneficiaries: 10000 },
  { year: '2021', usExpenses: 10000, zimbabweExpenses: 10500, beneficiaries: 12000 },
  { year: '2022', usExpenses: 11000, zimbabweExpenses: 12000, beneficiaries: 13500 },
  { year: '2023', usExpenses: 14000, zimbabweExpenses: 14500, beneficiaries: 15500 },
  { year: '2024', usExpenses: 15500, zimbabweExpenses: 16000, beneficiaries: 17000 },
  { year: '2025', usExpenses: 17000, zimbabweExpenses: 18000, beneficiaries: 19000 },
];

export function BeneficiariesChart() {
  const brandBlue = '#0747A1';
  const brandBlueLight = '#60A5FA';
  const accentGreen = '#10B981';

  return (
    <div className="bg-white rounded-xl p-8 border border-gray-100 h-full flex flex-col gap-8 transition-all hover:border-gray-200">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-xl">
          <h3 className="text-[#0747A1] text-2xl font-semibold mb-3 tracking-tight">Financial & Impact Correlation</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            A comprehensive analysis demonstrating how operational expenditures across US and Zimbabwe hubs correlate with total beneficiary expansion.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 items-center bg-gray-50/50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: brandBlue }} />
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-widest">US Ops</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: brandBlueLight }} />
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-widest">ZW Ops</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 rounded-full" style={{ backgroundColor: accentGreen }} />
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-widest">Impact Trend</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[400px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart 
            data={data} 
            margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#F3F4F6" 
              vertical={false} 
            />
            <XAxis 
              dataKey="year" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }}
              dy={15}
            />
            <YAxis 
              yAxisId="expenses"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 11 }}
              tickFormatter={(value) => `$${value/1000}k`}
              dx={-10}
            />
            <YAxis 
              yAxisId="beneficiaries" 
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 11 }}
              dx={10}
            />
            <Tooltip 
              cursor={{ fill: '#F8FAFC', opacity: 0.5 }}
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #F1F5F9', 
                borderRadius: '8px',
                padding: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                fontSize: '12px',
                color: '#475569'
              }}
              labelStyle={{ 
                color: '#0747A1', 
                fontWeight: 700, 
                marginBottom: '8px',
                fontSize: '14px'
              }}
              itemStyle={{ padding: '2px 0' }}
            />
            <Bar 
              yAxisId="expenses"
              dataKey="usExpenses" 
              fill={brandBlue} 
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar 
              yAxisId="expenses"
              dataKey="zimbabweExpenses" 
              fill={brandBlueLight} 
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Line 
              yAxisId="beneficiaries"
              type="monotone" 
              dataKey="beneficiaries" 
              stroke={accentGreen} 
              strokeWidth={3}
              dot={{ fill: '#FFFFFF', r: 5, strokeWidth: 2, stroke: accentGreen }}
              activeDot={{ r: 7, strokeWidth: 0, fill: accentGreen }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
