import { useState, useRef, useEffect } from 'react';
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
    teacherTraining: '—',
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
    teacherTraining: '—',
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
    teacherTraining: '—',
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
    teacherTraining: '—',
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
    teacherTraining: '—',
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
    teacherTraining: '—',
    outreachGoal: 40,
    outreachTarget: '5,000',
    beneficiariesTrend: '—',
    capitalTrend: '—',
  },
};

const CURRENT_YEAR: YearTab = '2026';
const HISTORICAL_YEARS: YearTab[] = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'];

function Dashboard() {
  const [activeYear, setActiveYear] = useState<YearTab>(CURRENT_YEAR);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const data = yearData[activeYear];

  const isHistorical = HISTORICAL_YEARS.includes(activeYear);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
                  {/* YTD tab */}
                  <button
                    onClick={() => setActiveYear('YTD')}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold tracking-tight transition-all ${
                      activeYear === 'YTD'
                        ? 'bg-[#0747A1] text-white shadow-md'
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    YTD
                  </button>

                  {/* Current year tab with dropdown */}
                  <div ref={dropdownRef} className="relative">
                    <button
                      onClick={() => {
                        if (!isHistorical) setActiveYear(CURRENT_YEAR);
                        setDropdownOpen((o) => !o);
                      }}
                      className={`flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold tracking-tight transition-all ${
                        activeYear !== 'YTD'
                          ? 'bg-[#0747A1] text-white shadow-md'
                          : 'text-gray-400 hover:text-gray-700'
                      }`}
                    >
                      {isHistorical ? activeYear : CURRENT_YEAR}
                      <svg className="w-3 h-3 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {dropdownOpen && (
                      <div className="absolute left-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-50 min-w-[100px] py-1 overflow-hidden">
                        <button
                          onClick={() => { setActiveYear(CURRENT_YEAR); setDropdownOpen(false); }}
                          className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                            activeYear === CURRENT_YEAR ? 'text-[#0747A1] bg-[#0747A1]/5' : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {CURRENT_YEAR}
                        </button>
                        {HISTORICAL_YEARS.map((year) => (
                          <button
                            key={year}
                            onClick={() => { setActiveYear(year); setDropdownOpen(false); }}
                            className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                              activeYear === year ? 'text-[#0747A1] bg-[#0747A1]/5' : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
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
                subtitle={data.teacherTraining === '—' ? 'Program not yet active' : 'Certified educators'}
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

          {/* Outcomes & Sustainability */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
                <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Outcomes & Sustainability</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
              {/* Employment at 6–12 months */}
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-[#0747A1]/5 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-[#0747A1]" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-[1px]">Employment 6–12 Months</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">71%</div>
                <p className="text-xs text-gray-500 mb-3">Still employed in tech roles 6–12 months post-graduation</p>
                <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                  <span>vs. 78% at graduation — 7pt drop tracked</span>
                </div>
              </div>

              {/* Income change */}
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-[#0747A1]/5 rounded-lg">
                    <Award className="w-4 h-4 text-[#0747A1]" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-[1px]">Income Change</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">+464%</div>
                <p className="text-xs text-gray-500 mb-3">Average income growth after program completion</p>
                <div className="flex justify-between text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                  <span>Before: <strong className="text-gray-700">$3.2K/yr</strong></span>
                  <span>→</span>
                  <span>After: <strong className="text-[#0747A1]">$18K/yr</strong></span>
                </div>
              </div>

              {/* Completion rate */}
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-[#0747A1]/5 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-[#0747A1]" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-[1px]">Completion Rate</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">84%</div>
                <p className="text-xs text-gray-500 mb-3">Students who complete the full 6-month curriculum</p>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#0747A1] h-full rounded-full" style={{ width: '84%' }} />
                </div>
                <p className="text-xs text-gray-400 mt-2">16% dropout — tracked & supported</p>
              </div>

              {/* Long-term follow-up */}
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-[#0747A1]/5 rounded-lg">
                    <Users2 className="w-4 h-4 text-[#0747A1]" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-[1px]">Long-term Follow-up</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">68%</div>
                <p className="text-xs text-gray-500 mb-3">Graduates still in tech employment at 2-year mark</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1-year cohort tracked</span>
                    <strong className="text-gray-700">1,240 grads</strong>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>2-year cohort tracked</span>
                    <strong className="text-gray-700">820 grads</strong>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Program Quality */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
                <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Program Quality</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* NPS */}
              <div className="bg-white rounded-xl p-8 border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-[#0747A1]/5 rounded-lg">
                    <Star className="w-4 h-4 text-[#0747A1]" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-[1px]">Net Promoter Score</span>
                </div>
                <div className="text-5xl font-bold text-[#0747A1] mb-2">72</div>
                <p className="text-sm text-gray-500 mb-6">Participant satisfaction score — <strong className="text-gray-700">World class (&gt;70)</strong></p>
                <div className="space-y-2">
                  {[
                    { label: 'Promoters', pct: 78, color: 'bg-[#0747A1]' },
                    { label: 'Passives', pct: 16, color: 'bg-gray-300' },
                    { label: 'Detractors', pct: 6, color: 'bg-red-200' },
                  ].map(({ label, pct, color }) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-20 shrink-0">{label}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div className={`${color} h-full rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 w-8 text-right">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accreditation */}
              <div className="bg-white rounded-xl p-8 border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-[#0747A1]/5 rounded-lg">
                    <Award className="w-4 h-4 text-[#0747A1]" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-[1px]">Accreditation Status</span>
                </div>
                <div className="space-y-4">
                  {[
                    { body: 'Ministry of ICT, Zimbabwe', status: 'Accredited', year: '2021' },
                    { body: 'ZIMSEC Curriculum Alignment', status: 'Accredited', year: '2022' },
                    { body: 'African Union Skills Framework', status: 'In Review', year: '2026' },
                    { body: 'CompTIA Partnership', status: 'Accredited', year: '2023' },
                  ].map(({ body, status, year }) => (
                    <div key={body} className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{body}</p>
                        <p className="text-xs text-gray-400">Since {year}</p>
                      </div>
                      <span className={`shrink-0 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${
                        status === 'Accredited' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentor ratio */}
              <div className="bg-white rounded-xl p-8 border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-[#0747A1]/5 rounded-lg">
                    <Users2 className="w-4 h-4 text-[#0747A1]" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-[1px]">Mentor-to-Student Ratio</span>
                </div>
                <div className="text-5xl font-bold text-[#0747A1] mb-2">1:8</div>
                <p className="text-sm text-gray-500 mb-6">One mentor per 8 students across all cohorts</p>
                <div className="space-y-3">
                  {[
                    { program: 'Bootcamp', ratio: '1:8', active: 57 },
                    { program: 'Youth Coding', ratio: '1:14', active: 64 },
                    { program: 'Teacher Training', ratio: '1:6', active: 76 },
                  ].map(({ program, ratio, active }) => (
                    <div key={program} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{program}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900">{ratio}</span>
                        <span className="text-xs text-gray-400">{active} mentors</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Scale & Reach */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
                <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Scale & Reach</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Waitlist / Unmet Demand */}
              <div className="bg-white rounded-xl p-8 border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-[1px]">Waitlist / Unmet Demand</span>
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-2">1,240</div>
                <p className="text-sm text-gray-500 mb-6">Qualified applicants awaiting program placement</p>
                <div className="space-y-3">
                  {[
                    { label: 'Bootcamp', count: 520 },
                    { label: 'Youth Coding', count: 480 },
                    { label: 'Teacher Training', count: 240 },
                  ].map(({ label, count }) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{label}</span>
                      <span className="font-semibold text-amber-600">{count} waiting</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
                  Unmet demand represents opportunity for expanded funding
                </div>
              </div>

              {/* New vs. Returning */}
              <div className="bg-white rounded-xl p-8 border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-[#0747A1]/5 rounded-lg">
                    <Users2 className="w-4 h-4 text-[#0747A1]" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-[1px]">New vs. Returning Beneficiaries</span>
                </div>
                <div className="flex items-end gap-4 mb-6">
                  <div>
                    <div className="text-4xl font-bold text-[#0747A1]">82%</div>
                    <p className="text-xs text-gray-500 mt-1">New beneficiaries</p>
                  </div>
                  <div className="pb-1">
                    <div className="text-2xl font-bold text-gray-400">18%</div>
                    <p className="text-xs text-gray-500 mt-1">Returning</p>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
                  <div className="bg-[#0747A1] h-full" style={{ width: '82%' }} />
                  <div className="bg-gray-300 h-full flex-1" />
                </div>
                <p className="text-xs text-gray-400 mt-3">Reach is expanding — 82% first-time beneficiaries confirms real growth, not recirculation</p>
              </div>

              {/* Geographic Reach */}
              <div className="bg-white rounded-xl p-8 border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-[#0747A1]/5 rounded-lg">
                    <MapPin className="w-4 h-4 text-[#0747A1]" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-[1px]">Geographic Reach</span>
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-2">9</div>
                <p className="text-sm text-gray-500 mb-6">Active community hubs across Zimbabwe</p>
                <div className="space-y-2 mb-4">
                  {['Kuwadzana', 'Kambuzuma', 'Vincent Bohlen', 'Mufakose', 'Jafuta', 'Emganwini', 'Dzivarasekwa', 'Warren Park', 'Mbare'].map((c) => (
                    <div key={c} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#0747A1]" />
                      <span className="text-sm text-gray-700">{c}</span>
                      <span className="ml-auto text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">Active</span>
                    </div>
                  ))}
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

          {/* Strategic Demographics */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
                <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Strategic Demographics</h2>
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

          {/* Historical Trend Chart */}
          <section className="mb-20">
            <BeneficiariesChart />
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
