import { useParams } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { StatCard } from '../components/StatCard';
import { motion } from 'motion/react';
import { BookOpen, Users, TrendingUp, GraduationCap, Calendar, Target, MapPin } from 'lucide-react';

const programData: Record<string, {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  stats: { label: string; value: string; subtitle: string; trend?: string }[];
  about: string;
  highlights: string[];
  communities: string[];
}> = {
  bootcamp: {
    title: 'Bootcamp Program',
    description: 'Full-time intensive coding bootcamp training the next generation of software developers from underserved communities.',
    icon: <GraduationCap className="w-6 h-6" />,
    color: '#0747A1',
    stats: [
      { label: 'Enrolled Students', value: '457', subtitle: 'Full-time active learners', trend: '+14.3%' },
      { label: 'Graduates', value: '1,840', subtitle: 'Since inception in 2018', trend: '+22.1%' },
      { label: 'Job Placement', value: '78%', subtitle: 'Within 6 months of graduation' },
      { label: 'Avg. Starting Salary', value: '$18K', subtitle: 'USD per annum' },
    ],
    about: 'The Bootcamp Program is our flagship 6-month intensive coding curriculum. Students gain skills in full-stack web development, data analysis, and software engineering fundamentals.',
    highlights: ['6-month full-time curriculum', 'Project-based learning', 'Industry mentorship', 'Job placement support', 'Stipend for qualifying students'],
    communities: ['Dzivarasekwa', 'Kuwadzana', 'Mufakose', 'Warren Park'],
  },
  'youth-coding': {
    title: 'Youth Coding',
    description: 'Introducing technology and computational thinking to primary and secondary school students across 9 hubs.',
    icon: <BookOpen className="w-6 h-6" />,
    color: '#0747A1',
    stats: [
      { label: 'Students Reached', value: '28.9k', subtitle: 'Primary & Secondary learners', trend: '+18.7%' },
      { label: 'Schools Partnered', value: '64', subtitle: 'Active school partnerships', trend: '+8.0%' },
      { label: 'Avg. Age', value: '14', subtitle: 'Years old' },
      { label: 'Female Participation', value: '52%', subtitle: 'Gender balance achieved' },
    ],
    about: 'Youth Coding brings foundational digital literacy and coding education to young learners. Through after-school clubs, holiday programs, and in-school workshops, we ignite curiosity and build problem-solving skills.',
    highlights: ['After-school coding clubs', 'Holiday bootcamps', 'In-school workshops', 'Scratch & Python curriculum', 'Female inclusion focus'],
    communities: ['Dzivarasekwa', 'Kuwadzana', 'Mufakose', 'Warren Park', 'Kambuzuma'],
  },
  'teacher-training': {
    title: 'Teacher Training',
    description: 'Equipping educators with the skills and confidence to deliver technology education in their classrooms.',
    icon: <Users className="w-6 h-6" />,
    color: '#0747A1',
    stats: [
      { label: 'Certified Educators', value: '456', subtitle: 'Trained since inception', trend: '+16.9%' },
      { label: 'Schools Impacted', value: '112', subtitle: 'Via trained teachers' },
      { label: 'Female Teachers', value: '65%', subtitle: 'Gender representation' },
      { label: 'Avg. Training Duration', value: '3 wks', subtitle: 'Per certification cycle' },
    ],
    about: 'Teacher Training creates a multiplier effect — each trained teacher reaches hundreds of students. Our program certifies educators in coding fundamentals, classroom facilitation, and curriculum delivery.',
    highlights: ['3-week certification program', 'Ongoing coaching support', 'Curriculum resources included', 'Community of practice', 'Re-certification annually'],
    communities: ['Dzivarasekwa', 'Kuwadzana', 'Mufakose'],
  },
  outreach: {
    title: 'Outreach',
    description: 'Community awareness, digital literacy campaigns, and events that extend our reach beyond our core programs.',
    icon: <MapPin className="w-6 h-6" />,
    color: '#0747A1',
    stats: [
      { label: 'People Reached', value: '2,200', subtitle: 'Via events & campaigns', trend: '+31.0%' },
      { label: 'Events Hosted', value: '48', subtitle: 'In 2026', trend: '+20.0%' },
      { label: 'Volunteer Hours', value: '3,600', subtitle: 'Contributed by community' },
      { label: 'Media Impressions', value: '180K', subtitle: 'Social & print reach' },
    ],
    about: 'Outreach is how we connect with the broader community — through hackathons, career days, digital literacy workshops, and public events. It is the gateway into our deeper programs.',
    highlights: ['Annual hackathon', 'Career fairs', 'Digital literacy workshops', 'Community radio segments', 'School open days'],
    communities: ['Dzivarasekwa', 'Kuwadzana', 'Mufakose', 'Warren Park', 'Kambuzuma'],
  },
};

export default function ProgramPage() {
  const { slug } = useParams<{ slug: string }>();
  const program = programData[slug ?? ''];

  if (!program) {
    return (
      <div className="flex min-h-screen bg-white">
        <Sidebar activeSection={slug} />
        <main className="flex-1 flex items-center justify-center bg-[#F8FAFC]">
          <p className="text-gray-400 text-lg">Program not found.</p>
        </main>
      </div>
    );
  }

  const sidebarLabel =
    slug === 'bootcamp' ? 'Bootcamp' :
    slug === 'youth-coding' ? 'Youth Coding' :
    slug === 'teacher-training' ? 'Teacher Training' :
    'Outreach';

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar activeSection={sidebarLabel} />

      <main className="flex-1 min-w-0 bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto p-8 lg:p-12 xl:p-20">

          {/* Header */}
          <header className="mb-16">
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
                  <span>Data as of Q1 2026</span>
                </div>
              </div>

              <div className="flex items-start gap-5 mb-6">
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
          </header>

          {/* KPI Stats */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
              <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Key Metrics</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {program.stats.map((stat) => (
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
          </section>

          {/* About + Highlights */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* About */}
              <div className="bg-white rounded-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
                  <h2 className="text-lg font-semibold text-gray-900 tracking-tight">About this Program</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{program.about}</p>
              </div>

              {/* Highlights */}
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

        </div>
      </main>
    </div>
  );
}
