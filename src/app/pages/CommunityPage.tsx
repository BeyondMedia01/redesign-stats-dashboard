import { useParams } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { StatCard } from '../components/StatCard';
import { motion } from 'motion/react';
import { MapPin, Users, BookOpen, GraduationCap, Calendar, TrendingUp } from 'lucide-react';

const communityData: Record<string, {
  title: string;
  description: string;
  stats: { label: string; value: string; subtitle: string; trend?: string }[];
  about: string;
  programs: string[];
  highlights: string[];
}> = {
  dzivarasekwa: {
    title: 'Dzivarasekwa',
    description: 'One of our founding communities and home to our first Innovation Hub, driving digital inclusion in the heart of Harare.',
    stats: [
      { label: 'Beneficiaries', value: '4,820', subtitle: 'Total community reach', trend: '+11.4%' },
      { label: 'Hub Established', value: '2018', subtitle: 'Founding community hub' },
      { label: 'Active Students', value: '312', subtitle: 'Enrolled across all programs' },
      { label: 'Teachers Trained', value: '89', subtitle: 'Certified educators' },
    ],
    about: 'Dzivarasekwa was the starting point of our mission. With high youth unemployment and limited access to technology education, this community inspired the founding of our first Innovation Hub in 2018. Today it remains one of our most active hubs.',
    programs: ['Bootcamp Program', 'Youth Coding', 'Teacher Training', 'Outreach'],
    highlights: ['First Innovation Hub established here', 'Highest bootcamp graduation rate', 'Strong school partnerships', '3 active after-school clubs'],
  },
  kuwadzana: {
    title: 'Kuwadzana',
    description: 'A high-density suburb with strong community engagement and one of the fastest-growing youth coding cohorts in the network.',
    stats: [
      { label: 'Beneficiaries', value: '3,940', subtitle: 'Total community reach', trend: '+16.2%' },
      { label: 'Hub Established', value: '2019', subtitle: 'Second community hub' },
      { label: 'Active Students', value: '278', subtitle: 'Enrolled across all programs' },
      { label: 'Teachers Trained', value: '74', subtitle: 'Certified educators' },
    ],
    about: 'Kuwadzana joined the network in 2019 and has grown rapidly, fuelled by strong community and school buy-in. The hub is known for its vibrant after-school Youth Coding clubs and active parent involvement.',
    programs: ['Bootcamp Program', 'Youth Coding', 'Teacher Training', 'Outreach'],
    highlights: ['Fastest-growing Youth Coding cohort', 'High parental engagement', '4 partnered primary schools', 'Annual community hackathon host'],
  },
  mufakose: {
    title: 'Mufakose',
    description: 'A densely populated suburb where our Teacher Training program has had its deepest multiplier effect, reaching thousands through trained educators.',
    stats: [
      { label: 'Beneficiaries', value: '5,110', subtitle: 'Total community reach', trend: '+9.8%' },
      { label: 'Hub Established', value: '2019', subtitle: 'Community hub year' },
      { label: 'Active Students', value: '295', subtitle: 'Enrolled across all programs' },
      { label: 'Teachers Trained', value: '112', subtitle: 'Certified educators' },
    ],
    about: 'Mufakose is our largest hub by total beneficiary reach. The community has embraced teacher training as its primary vehicle for impact, with over 112 certified educators now delivering tech education across dozens of local schools.',
    programs: ['Bootcamp Program', 'Youth Coding', 'Teacher Training', 'Outreach'],
    highlights: ['Highest teacher training output', 'Largest beneficiary footprint', '12 partnered secondary schools', 'Monthly community meetups'],
  },
  'warren-park': {
    title: 'Warren Park',
    description: 'A growing suburb with a young demographic and strong bootcamp graduate employment outcomes, making it a model for economic upliftment.',
    stats: [
      { label: 'Beneficiaries', value: '2,760', subtitle: 'Total community reach', trend: '+21.3%' },
      { label: 'Hub Established', value: '2021', subtitle: 'Community hub year' },
      { label: 'Active Students', value: '198', subtitle: 'Enrolled across all programs' },
      { label: 'Job Placements', value: '84%', subtitle: 'Bootcamp graduate employment' },
    ],
    about: 'Warren Park is one of our newer hubs but has quickly distinguished itself through exceptional bootcamp graduate employment outcomes. The community has strong ties to local tech employers who actively hire from our program.',
    programs: ['Bootcamp Program', 'Youth Coding', 'Outreach'],
    highlights: ['Best employment outcomes (84%)', 'Active employer partnerships', '2 corporate sponsors', 'Rising female enrolment'],
  },
  kambuzuma: {
    title: 'Kambuzuma',
    description: 'Our newest community hub, focused on youth outreach and digital literacy, with rapid early growth and strong school integration.',
    stats: [
      { label: 'Beneficiaries', value: '1,890', subtitle: 'Total community reach', trend: '+38.5%' },
      { label: 'Hub Established', value: '2023', subtitle: 'Newest community hub' },
      { label: 'Active Students', value: '143', subtitle: 'Enrolled across all programs' },
      { label: 'Schools Partnered', value: '8', subtitle: 'Active school integrations' },
    ],
    about: 'Kambuzuma is our most recently established hub and is already showing impressive early momentum. With a strong focus on youth digital literacy and school integration, it is on track to become one of our highest-impact communities.',
    programs: ['Youth Coding', 'Outreach'],
    highlights: ['Fastest community growth rate', 'Strong school integration model', '8 partnered schools in year one', 'Youth-led coding club launched'],
  },
};

export default function CommunityPage() {
  const { slug } = useParams<{ slug: string }>();
  const community = communityData[slug ?? ''];

  if (!community) {
    return (
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center bg-[#F8FAFC]">
          <p className="text-gray-400 text-lg">Community not found.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

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
                  Community Hub
                </span>
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Data as of Q1 2026</span>
                </div>
              </div>

              <div className="flex items-start gap-5 mb-6">
                <div className="p-4 bg-[#0747A1] rounded-xl text-white shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight leading-tight mb-3">
                    {community.title}
                  </h1>
                  <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">
                    {community.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </header>

          {/* KPI Stats */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
              <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Community Metrics</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {community.stats.map((stat) => (
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
              <div className="bg-white rounded-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
                  <h2 className="text-lg font-semibold text-gray-900 tracking-tight">About this Community</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{community.about}</p>
              </div>

              <div className="bg-white rounded-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
                  <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Hub Highlights</h2>
                </div>
                <ul className="space-y-3">
                  {community.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0747A1] shrink-0" />
                      <span className="text-gray-600 text-sm">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Active Programs */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
              <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Active Programs</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {community.programs.map((p) => {
                const icons: Record<string, React.ReactNode> = {
                  'Bootcamp Program': <GraduationCap className="w-3.5 h-3.5 text-[#0747A1]" />,
                  'Youth Coding': <BookOpen className="w-3.5 h-3.5 text-[#0747A1]" />,
                  'Teacher Training': <Users className="w-3.5 h-3.5 text-[#0747A1]" />,
                  'Outreach': <TrendingUp className="w-3.5 h-3.5 text-[#0747A1]" />,
                };
                return (
                  <div key={p} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-lg">
                    {icons[p]}
                    <span className="text-sm text-gray-700 font-medium">{p}</span>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
