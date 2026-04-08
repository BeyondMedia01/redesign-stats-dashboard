import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { Sidebar } from './components/Sidebar';
import { StatCard } from './components/StatCard';
import { BeneficiariesChart } from './components/BeneficiariesChart';
import { DemographicCard } from './components/DemographicCard';
import { FinancialCorrelationCard } from './components/FinancialCorrelationCard';
import ProgramPage from './pages/ProgramPage';
import CommunityPage from './pages/CommunityPage';
import { motion } from 'motion/react';
import { Calendar, Target, Briefcase, Microscope, TrendingUp, Award, Users2, MapPin, Star, CheckCircle2 } from 'lucide-react';

type YearTab = 'YTD' | '2026' | '2025' | '2024' | '2023' | '2022' | '2021' | '2020' | '2019' | '2018';

const yearData: Record<YearTab, {
  beneficiaries: string;
  capital: string;
  hubs: string;
  bootcamp: string;
  youthCoding: string;
  teacherTraining: string;
  outreachGoal: number;
  outreachTarget: string;
  beneficiariesTrend: string;
  capitalTrend: string;
  label: string;
}> = {
  YTD: {
    label: 'Q1 2026 (YTD)',
    beneficiaries: '8,241',
    capital: '$620K',
    hubs: '09',
    bootcamp: '124',
    youthCoding: '7.2k',
    teacherTraining: '98',
    outreachGoal: 24,
    outreachTarget: '35,000',
    beneficiariesTrend: '+3.1%',
    capitalTrend: '+2.0%',
  },
  '2026': {
    label: 'Full Year 2026',
    beneficiaries: '31,563',
    capital: '$3.15M',
    hubs: '09',
    bootcamp: '457',
    youthCoding: '28.9k',
    teacherTraining: '456',
    outreachGoal: 92,
    outreachTarget: '35,000',
    beneficiariesTrend: '+12.5%',
    capitalTrend: '+8.2%',
  },
  '2025': {
    label: 'Full Year 2025',
    beneficiaries: '26,840',
    capital: '$2.72M',
    hubs: '09',
    bootcamp: '398',
    youthCoding: '24.1k',
    teacherTraining: '390',
    outreachGoal: 87,
    outreachTarget: '31,000',
    beneficiariesTrend: '+14.1%',
    capitalTrend: '+10.6%',
  },
  '2024': {
    label: 'Full Year 2024',
    beneficiaries: '21,200',
    capital: '$2.18M',
    hubs: '08',
    bootcamp: '320',
    youthCoding: '19.3k',
    teacherTraining: '310',
    outreachGoal: 81,
    outreachTarget: '26,000',
    beneficiariesTrend: '+18.2%',
    capitalTrend: '+15.3%',
  },
  '2023': {
    label: 'Full Year 2023',
    beneficiaries: '16,400',
    capital: '$1.72M',
    hubs: '07',
    bootcamp: '245',
    youthCoding: '14.8k',
    teacherTraining: '240',
    outreachGoal: 76,
    outreachTarget: '21,500',
    beneficiariesTrend: '+22.4%',
    capitalTrend: '+19.4%',
  },
  '2022': {
    label: 'Full Year 2022',
    beneficiaries: '11,900',
    capital: '$1.30M',
    hubs: '06',
    bootcamp: '178',
    youthCoding: '10.6k',
    teacherTraining: '175',
    outreachGoal: 70,
    outreachTarget: '17,000',
    beneficiariesTrend: '+28.1%',
    capitalTrend: '+23.8%',
  },
  '2021': {
    label: 'Full Year 2021',
    beneficiaries: '8,300',
    capital: '$940K',
    hubs: '05',
    bootcamp: '130',
    youthCoding: '7.4k',
    teacherTraining: '120',
    outreachGoal: 63,
    outreachTarget: '13,200',
    beneficiariesTrend: '+31.7%',
    capitalTrend: '+29.2%',
  },
  '2020': {
    label: 'Full Year 2020',
    beneficiaries: '5,400',
    capital: '$640K',
    hubs: '04',
    bootcamp: '88',
    youthCoding: '4.7k',
    teacherTraining: '82',
    outreachGoal: 54,
    outreachTarget: '10,000',
    beneficiariesTrend: '+20.0%',
    capitalTrend: '+18.5%',
  },
  '2019': {
    label: 'Full Year 2019',
    beneficiaries: '3,800',
    capital: '$420K',
    hubs: '03',
    bootcamp: '62',
    youthCoding: '3.3k',
    teacherTraining: '55',
    outreachGoal: 48,
    outreachTarget: '8,000',
    beneficiariesTrend: '+90.0%',
    capitalTrend: '+75.0%',
  },
  '2018': {
    label: 'Inception Year 2018',
    beneficiaries: '2,000',
    capital: '$240K',
    hubs: '02',
    bootcamp: '30',
    youthCoding: '1.8k',
    teacherTraining: '28',
    outreachGoal: 40,
    outreachTarget: '5,000',
    beneficiariesTrend: '—',
    capitalTrend: '—',
  },
};

function Dashboard() {
  const [activeYear, setActiveYear] = useState<YearTab>('2026');
  const data = yearData[activeYear];

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      {/* Main Impact Dashboard */}
      <main className="flex-1 min-w-0 bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto p-8 lg:p-12 xl:p-20">
          
          {/* Top Header & Actions */}
          <header className="mb-20">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-[#0747A1]/5 text-[#0747A1] text-[10px] font-bold uppercase tracking-[2px] rounded-full border border-[#0747A1]/10">
                    Impact Insight • v2.0
                  </span>
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{data.label}</span>
                  </div>
                </div>

                {/* Year Tabs */}
                <div className="flex items-center gap-1 mb-6 p-1 bg-white border border-gray-100 rounded-xl w-fit shadow-sm">
                  {(['YTD', '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'] as YearTab[]).map((year) => (
                    <button
                      key={year}
                      onClick={() => setActiveYear(year)}
                      className={`px-5 py-2 rounded-lg text-sm font-semibold tracking-tight transition-all ${
                        activeYear === year
                          ? 'bg-[#0747A1] text-white shadow-md'
                          : 'text-gray-400 hover:text-gray-700'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
                <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight leading-[1.15] mb-6">
                  Driving measurable change <br />
                  <span className="text-[#0747A1]">through sustainable</span> innovation.
                </h1>
                <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                  Evaluate the real-time impact across all programs and hubs. 
                  Providing high-level transparency into our core performance metrics.
                </p>
              </motion.div>
              
            </div>
          </header>

          {/* Core Performance Section */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
                <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Core Performance KPIs</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <StatCard
                label="Direct Beneficiaries"
                value={data.beneficiaries}
                subtitle="Across 12 major programs"
                trend={data.beneficiariesTrend}
                variant="primary"
              />
              <StatCard
                label="Capital Secured"
                value={data.capital}
                subtitle="Since inception in 2018"
                trend={data.capitalTrend}
                variant="primary"
              />
              <StatCard
                label="Innovation Hubs"
                value={data.hubs}
                subtitle="Active operational centers"
                variant="primary"
              />
            </div>
          </section>

          {/* Program Stats Section */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
                <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Program Impact</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard
                label="Bootcamp Program"
                value={data.bootcamp}
                subtitle="Full-time students enrolled"
                variant="secondary"
              />
              <StatCard
                label="Youth Coding"
                value={data.youthCoding}
                subtitle="Primary & Secondary reach"
                variant="secondary"
              />
              <StatCard
                label="Teacher Training"
                value={data.teacherTraining}
                subtitle="Certified educators"
                variant="secondary"
              />
              <div className="p-6 bg-[#0747A1]/5 border border-[#0747A1]/10 rounded-xl flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#0747A1] rounded-lg">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-bold text-[#0747A1] uppercase tracking-[1px]">Outreach Goal</span>
                </div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-2xl font-bold text-[#0747A1]">{data.outreachGoal}%</span>
                  <span className="text-xs text-gray-500 font-medium">Goal: {data.outreachTarget}</span>
                </div>
                <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-[#0747A1]/10">
                  <div className="bg-[#0747A1] h-full rounded-full transition-all duration-700" style={{ width: `${data.outreachGoal}%` }} />
                </div>
              </div>
            </div>
          </section>

          {/* Data Visualization Section */}
          <section className="mb-20">
            <BeneficiariesChart />
          </section>

          {/* Strategic Demographics */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
                <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Strategic Demographics</h2>
              </div>
              <div className="flex gap-2">
                <FilterChip label="Gender" active />
                <FilterChip label="Age" />
                <FilterChip label="Location" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <DemographicCard
                program="Bootcamp Students"
                averageAge={21}
                malePercent={45}
                femalePercent={55}
              />
              <DemographicCard
                program="Youth Coding"
                averageAge={16}
                malePercent={48}
                femalePercent={52}
              />
              <DemographicCard
                program="Teacher Training"
                averageAge={34}
                malePercent={35}
                femalePercent={65}
              />
              
              {/* Visual Impact Box */}
              <div className="bg-gradient-to-br from-[#0747A1] to-[#0a5ac7] rounded-xl p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-10 -rotate-12 transition-transform group-hover:scale-110 group-hover:rotate-0 duration-700">
                  <Microscope className="w-40 h-40" />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h4 className="text-xl font-bold mb-3 tracking-tight">Social Impact Hubs</h4>
                    <p className="text-blue-50/80 text-sm leading-relaxed mb-8 max-w-[200px]">
                      9 strategic hubs fostering innovation in under-served communities.
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                       {[1,2,3,4].map(i => (
                         <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0747A1] bg-blue-400/50 flex items-center justify-center text-[10px] font-bold">
                           {i}
                         </div>
                       ))}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-blue-100">Global Hubs</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Financial & Impact Correlation */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
                <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Financial & Impact Correlation</h2>
              </div>
              <div className="flex gap-2">
                <FilterChip label="Program" active />
                <FilterChip label="Quarter" />
                <FilterChip label="Region" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <FinancialCorrelationCard
                program="Bootcamp Program"
                capitalInvested="$820K"
                beneficiaries={457}
                costPerBeneficiary="$1,795"
                efficiency={82}
              />
              <FinancialCorrelationCard
                program="Youth Coding"
                capitalInvested="$1.2M"
                beneficiaries={28900}
                costPerBeneficiary="$42"
                efficiency={95}
              />
              <FinancialCorrelationCard
                program="Teacher Training"
                capitalInvested="$430K"
                beneficiaries={456}
                costPerBeneficiary="$943"
                efficiency={74}
              />

              {/* Summary Impact Box */}
              <div className="bg-gradient-to-br from-[#0747A1] to-[#0a5ac7] rounded-xl p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-10 -rotate-12 transition-transform group-hover:scale-110 group-hover:rotate-0 duration-700">
                  <Briefcase className="w-40 h-40" />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h4 className="text-xl font-bold mb-3 tracking-tight">Total Capital ROI</h4>
                    <p className="text-blue-50/80 text-sm leading-relaxed mb-8 max-w-[200px]">
                      $3.15M deployed across all programs since inception in 2018.
                    </p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">$99</div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-blue-100">Avg. cost per beneficiary</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/programs/:slug" element={<ProgramPage />} />
      <Route path="/communities/:slug" element={<CommunityPage />} />
    </Routes>
  );
}

function FilterChip({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button className={`
      px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all
      ${active
        ? 'bg-[#0747A1] text-white shadow-md'
        : 'bg-white text-gray-500 border border-gray-100 hover:border-gray-200'
      }
    `}>
      {label}
    </button>
  );
}
