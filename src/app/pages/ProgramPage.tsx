import { useState } from 'react';
import { useParams } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { StatCard } from '../components/StatCard';
import { YearTabs, CURRENT_YEAR } from '../components/YearTabs';
import type { YearTab } from '../components/YearTabs';
import { motion } from 'motion/react';
import { BookOpen, Users, TrendingUp, GraduationCap, Calendar, Target, MapPin, User, UserCheck, MapPinned, GraduationCap as GradIcon, Trophy } from 'lucide-react';

type ProgramStats = { label: string; value: string; subtitle: string; trend?: string };

type ProgramDef = {
  title: string;
  description: string;
  icon: React.ReactNode;
  statsByYear: Partial<Record<YearTab, ProgramStats[]>>;
  about: string;
  highlights: string[];
  communities: string[];
  launchYear: number;
};

const programData: Record<string, ProgramDef> = {
  bootcamp: {
    title: 'Bootcamp Program',
    description: 'Full-time intensive coding bootcamp training the next generation of software developers from underserved communities.',
    icon: <GraduationCap className="w-6 h-6" />,
    launchYear: 2018,
    statsByYear: {
      YTD:  [{ label: 'Enrolled Students', value: '124', subtitle: 'Full-time active learners', trend: '+4.2%' }, { label: 'Graduates', value: '498', subtitle: 'Since inception in 2018', trend: '+6.1%' }, { label: 'Job Placement', value: '76%', subtitle: 'Within 6 months of graduation' }, { label: 'Avg. Starting Salary', value: '$18K', subtitle: 'USD per annum' }],
      '2026': [{ label: 'Enrolled Students', value: '457', subtitle: 'Full-time active learners', trend: '+14.3%' }, { label: 'Graduates', value: '1,840', subtitle: 'Since inception in 2018', trend: '+22.1%' }, { label: 'Job Placement', value: '78%', subtitle: 'Within 6 months of graduation' }, { label: 'Avg. Starting Salary', value: '$18K', subtitle: 'USD per annum' }],
      '2025': [{ label: 'Enrolled Students', value: '398', subtitle: 'Full-time active learners', trend: '+24.4%' }, { label: 'Graduates', value: '1,383', subtitle: 'Since inception in 2018', trend: '+28.9%' }, { label: 'Job Placement', value: '75%', subtitle: 'Within 6 months of graduation' }, { label: 'Avg. Starting Salary', value: '$16K', subtitle: 'USD per annum' }],
      '2024': [{ label: 'Enrolled Students', value: '320', subtitle: 'Full-time active learners', trend: '+30.6%' }, { label: 'Graduates', value: '985', subtitle: 'Since inception in 2018', trend: '+33.2%' }, { label: 'Job Placement', value: '72%', subtitle: 'Within 6 months of graduation' }, { label: 'Avg. Starting Salary', value: '$15K', subtitle: 'USD per annum' }],
      '2023': [{ label: 'Enrolled Students', value: '245', subtitle: 'Full-time active learners', trend: '+37.6%' }, { label: 'Graduates', value: '665', subtitle: 'Since inception in 2018', trend: '+40.1%' }, { label: 'Job Placement', value: '69%', subtitle: 'Within 6 months of graduation' }, { label: 'Avg. Starting Salary', value: '$14K', subtitle: 'USD per annum' }],
      '2022': [{ label: 'Enrolled Students', value: '178', subtitle: 'Full-time active learners', trend: '+36.9%' }, { label: 'Graduates', value: '420', subtitle: 'Since inception in 2018' }, { label: 'Job Placement', value: '65%', subtitle: 'Within 6 months of graduation' }, { label: 'Avg. Starting Salary', value: '$13K', subtitle: 'USD per annum' }],
      '2021': [{ label: 'Enrolled Students', value: '130', subtitle: 'Full-time active learners', trend: '+47.7%' }, { label: 'Graduates', value: '242', subtitle: 'Since inception in 2018' }, { label: 'Job Placement', value: '61%', subtitle: 'Within 6 months of graduation' }, { label: 'Avg. Starting Salary', value: '$12K', subtitle: 'USD per annum' }],
      '2020': [{ label: 'Enrolled Students', value: '88', subtitle: 'Full-time active learners' }, { label: 'Graduates', value: '112', subtitle: 'Since inception in 2018' }, { label: 'Job Placement', value: '58%', subtitle: 'Within 6 months of graduation' }, { label: 'Avg. Starting Salary', value: '$11K', subtitle: 'USD per annum' }],
      '2019': [{ label: 'Enrolled Students', value: '62', subtitle: 'Full-time active learners' }, { label: 'Graduates', value: '24', subtitle: 'First full graduating class' }, { label: 'Job Placement', value: '54%', subtitle: 'Within 6 months of graduation' }, { label: 'Avg. Starting Salary', value: '$10K', subtitle: 'USD per annum' }],
      '2018': [{ label: 'Enrolled Students', value: '30', subtitle: 'Inaugural cohort' }, { label: 'Graduates', value: '—', subtitle: 'First class still in training' }, { label: 'Job Placement', value: '—', subtitle: 'Program not yet complete' }, { label: 'Avg. Starting Salary', value: '—', subtitle: 'Program not yet complete' }],
    },
    about: 'The Bootcamp Program is our flagship 6-month intensive coding curriculum. Students gain skills in full-stack web development, data analysis, and software engineering fundamentals.',
    highlights: ['6-month full-time curriculum', 'Project-based learning', 'Industry mentorship', 'Job placement support', 'Stipend for qualifying students'],
    communities: ['Dzivarasekwa', 'Kuwadzana', 'Mufakose', 'Warren Park'],
  },
  'youth-coding': {
    title: 'Youth Coding',
    description: 'Introducing technology and computational thinking to primary and secondary school students across 9 hubs.',
    icon: <BookOpen className="w-6 h-6" />,
    launchYear: 2018,
    statsByYear: {
      YTD:  [{ label: 'Students Reached', value: '7.2k', subtitle: 'Primary & Secondary learners', trend: '+3.1%' }, { label: 'Schools Partnered', value: '64', subtitle: 'Active school partnerships' }, { label: 'Avg. Age', value: '14', subtitle: 'Years old' }, { label: 'Female Participation', value: '52%', subtitle: 'Gender balance achieved' }],
      '2026': [{ label: 'Students Reached', value: '28.9k', subtitle: 'Primary & Secondary learners', trend: '+18.7%' }, { label: 'Schools Partnered', value: '64', subtitle: 'Active school partnerships', trend: '+8.0%' }, { label: 'Avg. Age', value: '14', subtitle: 'Years old' }, { label: 'Female Participation', value: '52%', subtitle: 'Gender balance achieved' }],
      '2025': [{ label: 'Students Reached', value: '24.1k', subtitle: 'Primary & Secondary learners', trend: '+25.1%' }, { label: 'Schools Partnered', value: '58', subtitle: 'Active school partnerships', trend: '+11.5%' }, { label: 'Avg. Age', value: '14', subtitle: 'Years old' }, { label: 'Female Participation', value: '51%', subtitle: 'Gender balance achieved' }],
      '2024': [{ label: 'Students Reached', value: '19.3k', subtitle: 'Primary & Secondary learners', trend: '+30.4%' }, { label: 'Schools Partnered', value: '52', subtitle: 'Active school partnerships', trend: '+15.6%' }, { label: 'Avg. Age', value: '14', subtitle: 'Years old' }, { label: 'Female Participation', value: '50%', subtitle: 'Gender balance achieved' }],
      '2023': [{ label: 'Students Reached', value: '14.8k', subtitle: 'Primary & Secondary learners', trend: '+39.6%' }, { label: 'Schools Partnered', value: '45', subtitle: 'Active school partnerships' }, { label: 'Avg. Age', value: '13', subtitle: 'Years old' }, { label: 'Female Participation', value: '49%', subtitle: 'Near gender parity' }],
      '2022': [{ label: 'Students Reached', value: '10.6k', subtitle: 'Primary & Secondary learners', trend: '+43.2%' }, { label: 'Schools Partnered', value: '36', subtitle: 'Active school partnerships' }, { label: 'Avg. Age', value: '13', subtitle: 'Years old' }, { label: 'Female Participation', value: '47%', subtitle: 'Growing female reach' }],
      '2021': [{ label: 'Students Reached', value: '7.4k', subtitle: 'Primary & Secondary learners' }, { label: 'Schools Partnered', value: '28', subtitle: 'Active school partnerships' }, { label: 'Avg. Age', value: '13', subtitle: 'Years old' }, { label: 'Female Participation', value: '45%', subtitle: 'Growing female reach' }],
      '2020': [{ label: 'Students Reached', value: '4.7k', subtitle: 'Primary & Secondary learners' }, { label: 'Schools Partnered', value: '19', subtitle: 'Active school partnerships' }, { label: 'Avg. Age', value: '12', subtitle: 'Years old' }, { label: 'Female Participation', value: '43%', subtitle: 'Growing female reach' }],
      '2019': [{ label: 'Students Reached', value: '3.3k', subtitle: 'Primary & Secondary learners' }, { label: 'Schools Partnered', value: '12', subtitle: 'Active school partnerships' }, { label: 'Avg. Age', value: '12', subtitle: 'Years old' }, { label: 'Female Participation', value: '41%', subtitle: 'Growing female reach' }],
      '2018': [{ label: 'Students Reached', value: '1.8k', subtitle: 'Inaugural year reach' }, { label: 'Schools Partnered', value: '6', subtitle: 'Founding school partnerships' }, { label: 'Avg. Age', value: '12', subtitle: 'Years old' }, { label: 'Female Participation', value: '38%', subtitle: 'Inaugural year' }],
    },
    about: 'Youth Coding brings foundational digital literacy and coding education to young learners. Through after-school clubs, holiday programs, and in-school workshops, we ignite curiosity and build problem-solving skills.',
    highlights: ['After-school coding clubs', 'Holiday bootcamps', 'In-school workshops', 'Scratch & Python curriculum', 'Female inclusion focus'],
    communities: ['Dzivarasekwa', 'Kuwadzana', 'Mufakose', 'Warren Park', 'Kambuzuma'],
  },
  'teacher-training': {
    title: 'Teacher Training',
    description: 'Equipping educators with the skills and confidence to deliver technology education in their classrooms.',
    icon: <Users className="w-6 h-6" />,
    launchYear: 2024,
    statsByYear: {
      YTD:  [{ label: 'Certified Educators', value: '98', subtitle: 'Trained this year', trend: '+4.3%' }, { label: 'Schools Impacted', value: '112', subtitle: 'Via trained teachers' }, { label: 'Female Teachers', value: '65%', subtitle: 'Gender representation' }, { label: 'Avg. Training Duration', value: '3 wks', subtitle: 'Per certification cycle' }],
      '2026': [{ label: 'Certified Educators', value: '456', subtitle: 'Trained since inception', trend: '+16.9%' }, { label: 'Schools Impacted', value: '112', subtitle: 'Via trained teachers' }, { label: 'Female Teachers', value: '65%', subtitle: 'Gender representation' }, { label: 'Avg. Training Duration', value: '3 wks', subtitle: 'Per certification cycle' }],
      '2025': [{ label: 'Certified Educators', value: '390', subtitle: 'Trained since inception', trend: '+25.8%' }, { label: 'Schools Impacted', value: '96', subtitle: 'Via trained teachers' }, { label: 'Female Teachers', value: '63%', subtitle: 'Gender representation' }, { label: 'Avg. Training Duration', value: '3 wks', subtitle: 'Per certification cycle' }],
      '2024': [{ label: 'Certified Educators', value: '310', subtitle: 'Inaugural year cohorts' }, { label: 'Schools Impacted', value: '74', subtitle: 'Via trained teachers' }, { label: 'Female Teachers', value: '60%', subtitle: 'Gender representation' }, { label: 'Avg. Training Duration', value: '3 wks', subtitle: 'Per certification cycle' }],
    },
    about: 'Teacher Training creates a multiplier effect — each trained teacher reaches hundreds of students. Our program certifies educators in coding fundamentals, classroom facilitation, and curriculum delivery.',
    highlights: ['3-week certification program', 'Ongoing coaching support', 'Curriculum resources included', 'Community of practice', 'Re-certification annually'],
    communities: ['Dzivarasekwa', 'Kuwadzana', 'Mufakose'],
  },
  outreach: {
    title: 'Outreach',
    description: 'Community awareness, digital literacy campaigns, and events that extend our reach beyond our core programs.',
    icon: <MapPin className="w-6 h-6" />,
    launchYear: 2018,
    statsByYear: {
      YTD:  [{ label: 'People Reached', value: '620', subtitle: 'Via events & campaigns', trend: '+8.4%' }, { label: 'Events Hosted', value: '12', subtitle: 'In Q1 2026' }, { label: 'Volunteer Hours', value: '940', subtitle: 'Contributed by community' }, { label: 'Media Impressions', value: '48K', subtitle: 'Social & print reach' }],
      '2026': [{ label: 'People Reached', value: '2,200', subtitle: 'Via events & campaigns', trend: '+31.0%' }, { label: 'Events Hosted', value: '48', subtitle: 'In 2026', trend: '+20.0%' }, { label: 'Volunteer Hours', value: '3,600', subtitle: 'Contributed by community' }, { label: 'Media Impressions', value: '180K', subtitle: 'Social & print reach' }],
      '2025': [{ label: 'People Reached', value: '1,680', subtitle: 'Via events & campaigns', trend: '+27.3%' }, { label: 'Events Hosted', value: '40', subtitle: 'In 2025', trend: '+17.6%' }, { label: 'Volunteer Hours', value: '2,800', subtitle: 'Contributed by community' }, { label: 'Media Impressions', value: '130K', subtitle: 'Social & print reach' }],
      '2024': [{ label: 'People Reached', value: '1,320', subtitle: 'Via events & campaigns', trend: '+34.7%' }, { label: 'Events Hosted', value: '34', subtitle: 'In 2024' }, { label: 'Volunteer Hours', value: '2,100', subtitle: 'Contributed by community' }, { label: 'Media Impressions', value: '95K', subtitle: 'Social & print reach' }],
      '2023': [{ label: 'People Reached', value: '980', subtitle: 'Via events & campaigns', trend: '+40.0%' }, { label: 'Events Hosted', value: '26', subtitle: 'In 2023' }, { label: 'Volunteer Hours', value: '1,500', subtitle: 'Contributed by community' }, { label: 'Media Impressions', value: '68K', subtitle: 'Social & print reach' }],
      '2022': [{ label: 'People Reached', value: '700', subtitle: 'Via events & campaigns' }, { label: 'Events Hosted', value: '18', subtitle: 'In 2022' }, { label: 'Volunteer Hours', value: '980', subtitle: 'Contributed by community' }, { label: 'Media Impressions', value: '44K', subtitle: 'Social & print reach' }],
      '2021': [{ label: 'People Reached', value: '480', subtitle: 'Via events & campaigns' }, { label: 'Events Hosted', value: '12', subtitle: 'In 2021' }, { label: 'Volunteer Hours', value: '620', subtitle: 'Contributed by community' }, { label: 'Media Impressions', value: '28K', subtitle: 'Social & print reach' }],
      '2020': [{ label: 'People Reached', value: '310', subtitle: 'Via events & campaigns' }, { label: 'Events Hosted', value: '8', subtitle: 'Limited by COVID-19' }, { label: 'Volunteer Hours', value: '380', subtitle: 'Contributed by community' }, { label: 'Media Impressions', value: '18K', subtitle: 'Social & print reach' }],
      '2019': [{ label: 'People Reached', value: '220', subtitle: 'Via events & campaigns' }, { label: 'Events Hosted', value: '6', subtitle: 'In 2019' }, { label: 'Volunteer Hours', value: '240', subtitle: 'Contributed by community' }, { label: 'Media Impressions', value: '10K', subtitle: 'Social & print reach' }],
      '2018': [{ label: 'People Reached', value: '120', subtitle: 'Inaugural outreach events' }, { label: 'Events Hosted', value: '3', subtitle: 'Founding year events' }, { label: 'Volunteer Hours', value: '110', subtitle: 'Contributed by community' }, { label: 'Media Impressions', value: '4K', subtitle: 'Social & print reach' }],
    },
    about: 'Outreach is how we connect with the broader community — through hackathons, career days, digital literacy workshops, and public events. It is the gateway into our deeper programs.',
    highlights: ['Annual hackathon', 'Career fairs', 'Digital literacy workshops', 'Community radio segments', 'School open days'],
    communities: ['Dzivarasekwa', 'Kuwadzana', 'Mufakose', 'Warren Park', 'Kambuzuma'],
  },
};

export default function ProgramPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeYear, setActiveYear] = useState<YearTab>(CURRENT_YEAR);
  const program = programData[slug ?? ''];

  if (!program) {
    return (
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center bg-[#F8FAFC]">
          <p className="text-gray-400 text-lg">Program not found.</p>
        </main>
      </div>
    );
  }

  const isBeforeLaunch = activeYear !== 'YTD' && parseInt(activeYear) < program.launchYear;
  const stats = isBeforeLaunch ? [] : (program.statsByYear[activeYear] ?? program.statsByYear[CURRENT_YEAR] ?? []);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex-1 min-w-0 bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto p-8 lg:p-12 xl:p-20">

          {/* Header */}
          <header className="mb-16">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-[#0747A1]/5 text-[#0747A1] text-[10px] font-bold uppercase tracking-[2px] rounded-full border border-[#0747A1]/10">
                    Program Overview
                  </span>
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{activeYear === 'YTD' ? 'Q1 2026 (YTD)' : `Full Year ${activeYear}`}</span>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="p-4 bg-[#0747A1] rounded-xl text-white shrink-0">
                    {program.icon}
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight leading-tight mb-3">
                      {program.title}
                    </h1>
                    <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">
                      {program.description}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:pt-1 shrink-0"
              >
                <YearTabs activeYear={activeYear} onChange={setActiveYear} />
              </motion.div>
            </div>
          </header>

          {/* KPI Stats */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
              <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Key Metrics</h2>
            </div>

            {isBeforeLaunch ? (
              <div className="flex items-center justify-center h-32 bg-white border border-gray-100 rounded-xl">
                <p className="text-gray-400 text-sm">
                  {program.title} launched in {program.launchYear}. No data available for {activeYear}.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <StatCard
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                    subtitle={stat.subtitle}
                    trend={stat.trend}
                    variant="primary"
                  />
                ))}
              </div>
            )}
          </section>

          {/* About + Highlights */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
                  <h2 className="text-lg font-semibold text-gray-900 tracking-tight">About this Program</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{program.about}</p>
              </div>

              <div className="bg-white rounded-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
                  <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Program Highlights</h2>
                </div>
                <ul className="space-y-3">
                  {program.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0747A1] shrink-0" />
                      <span className="text-gray-600 text-sm">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Communities */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
              <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Active Communities</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {program.communities.map((c) => (
                <div key={c} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-lg">
                  <Target className="w-3.5 h-3.5 text-[#0747A1]" />
                  <span className="text-sm text-gray-700 font-medium">{c}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Youth Coding — exclusive sections */}
          {slug === 'youth-coding' && (
            <>
              {/* Target Demographics */}
              <section className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
                  <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Target Demographics</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  {/* Age & Gender */}
                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center gap-2 mb-5">
                      <User className="w-4 h-4 text-[#0747A1]" />
                      <h3 className="text-sm font-semibold text-gray-900 tracking-tight">Age / Gender</h3>
                    </div>
                    <div className="mb-5">
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">Avg. Age</span>
                      <div className="text-3xl font-bold text-[#0747A1] mt-1">21</div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-xs text-gray-500 font-medium">Male</span>
                          </div>
                          <span className="text-xs font-bold text-[#0747A1]">45%</span>
                        </div>
                        <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-[#0747A1] h-full rounded-full" style={{ width: '45%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <UserCheck className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-xs text-gray-500 font-medium">Female</span>
                          </div>
                          <span className="text-xs font-bold text-[#60A5FA]">55%</span>
                        </div>
                        <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-[#60A5FA] h-full rounded-full" style={{ width: '55%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Education Level */}
                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center gap-2 mb-5">
                      <GradIcon className="w-4 h-4 text-[#0747A1]" />
                      <h3 className="text-sm font-semibold text-gray-900 tracking-tight">Education Level</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: 'Primary School', pct: 35, rank: 'Lowest' },
                        { label: 'Secondary School', pct: 45, rank: '' },
                        { label: 'High School', pct: 20, rank: 'Highest' },
                      ].map(({ label, pct, rank }) => (
                        <div key={label}>
                          <div className="flex justify-between mb-1.5">
                            <span className="text-xs text-gray-500 font-medium">{label}</span>
                            <div className="flex items-center gap-1.5">
                              {rank && <span className="text-[10px] text-gray-400">{rank}</span>}
                              <span className="text-xs font-bold text-[#0747A1]">{pct}%</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-[#0747A1] h-full rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Geography */}
                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center gap-2 mb-5">
                      <MapPinned className="w-4 h-4 text-[#0747A1]" />
                      <h3 className="text-sm font-semibold text-gray-900 tracking-tight">Geography</h3>
                    </div>
                    <p className="text-xs text-gray-400 mb-5">Highly urbanized student base</p>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-xs text-gray-500 font-medium">Urban</span>
                          <span className="text-xs font-bold text-[#0747A1]">80%</span>
                        </div>
                        <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-[#0747A1] h-full rounded-full" style={{ width: '80%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-xs text-gray-500 font-medium">Rural</span>
                          <span className="text-xs font-bold text-[#60A5FA]">20%</span>
                        </div>
                        <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-[#60A5FA] h-full rounded-full" style={{ width: '20%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* School Performance */}
              <section className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
                  <h2 className="text-lg font-semibold text-gray-900 tracking-tight">School Performance</h2>
                  <span className="text-xs text-gray-400 font-medium">by Project Completions</span>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div className="grid grid-cols-12 px-6 py-3 border-b border-gray-50 bg-gray-50/50">
                    <span className="col-span-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rank</span>
                    <span className="col-span-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">School</span>
                    <span className="col-span-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Students</span>
                    <span className="col-span-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Projects</span>
                  </div>
                  {[
                    { rank: 1, school: 'Gwinyiro Primary School', students: 152, projects: 259 },
                    { rank: 2, school: 'Kuwadzana 2 Primary', students: 138, projects: 224 },
                    { rank: 3, school: 'Dzivarasekwa Primary', students: 121, projects: 198 },
                    { rank: 4, school: 'Mufakose High School', students: 109, projects: 176 },
                    { rank: 5, school: 'Warren Park Primary', students: 94, projects: 150 },
                  ].map(({ rank, school, students, projects }, i) => (
                    <div key={school} className={`grid grid-cols-12 px-6 py-4 items-center ${i < 4 ? 'border-b border-gray-50' : ''}`}>
                      <div className="col-span-1">
                        {rank === 1 ? (
                          <div className="w-6 h-6 rounded-full bg-[#0747A1] flex items-center justify-center">
                            <Trophy className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <span className="text-sm font-bold text-gray-400">#{rank}</span>
                        )}
                      </div>
                      <div className="col-span-5">
                        <span className="text-sm font-medium text-gray-700">{school}</span>
                      </div>
                      <div className="col-span-3 text-right">
                        <span className="text-sm font-semibold text-gray-600">{students}</span>
                      </div>
                      <div className="col-span-3 text-right">
                        <span className="text-sm font-bold text-[#0747A1]">{projects}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Outcomes — Survey Results */}
              <section className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
                  <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Outcomes</h2>
                  <span className="text-xs text-gray-400 font-medium">Survey Results</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  {/* Teacher Responses */}
                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                      <Users className="w-4 h-4 text-[#0747A1]" />
                      <h3 className="text-sm font-semibold text-gray-900 tracking-tight">Teacher Responses</h3>
                    </div>
                    <div className="space-y-5">
                      {[
                        { label: 'Improved critical thinking skills', yes: 55 },
                        { label: 'Improved teamwork skills', yes: 45 },
                        { label: 'Increased interest in technology', yes: 55 },
                      ].map(({ label, yes }) => (
                        <div key={label}>
                          <div className="flex justify-between mb-2">
                            <span className="text-xs text-gray-600 font-medium max-w-[220px]">{label}</span>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-[10px] text-[#0747A1] font-bold">Yes {yes}%</span>
                              <span className="text-[10px] text-gray-400 font-medium">No {100 - yes}%</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-[#0747A1] h-full rounded-full" style={{ width: `${yes}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Student Responses */}
                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                      <BookOpen className="w-4 h-4 text-[#0747A1]" />
                      <h3 className="text-sm font-semibold text-gray-900 tracking-tight">Student Responses</h3>
                    </div>
                    <div className="space-y-5">
                      {[
                        { label: 'Enjoyment / Fun in coding classes', yes: 55 },
                        { label: 'Desire to continue learning coding', yes: 45 },
                        { label: 'Likely to recommend lessons to friends', yes: 55 },
                      ].map(({ label, yes }) => (
                        <div key={label}>
                          <div className="flex justify-between mb-2">
                            <span className="text-xs text-gray-600 font-medium max-w-[220px]">{label}</span>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-[10px] text-[#0747A1] font-bold">Yes {yes}%</span>
                              <span className="text-[10px] text-gray-400 font-medium">No {100 - yes}%</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-[#0747A1] h-full rounded-full" style={{ width: `${yes}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </section>
            </>
          )}

        </div>
      </main>
    </div>
  );
}
