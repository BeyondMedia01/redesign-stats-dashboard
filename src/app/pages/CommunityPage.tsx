import { useState } from 'react';
import { useParams } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { StatCard } from '../components/StatCard';
import { motion } from 'motion/react';
import { MapPin, Users, BookOpen, GraduationCap, Calendar, TrendingUp } from 'lucide-react';

type YearTab = 'YTD' | '2026' | '2025' | '2024' | '2023' | '2022' | '2021' | '2020' | '2019' | '2018';

const ALL_YEARS: YearTab[] = ['YTD', '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'];

// Year stats per community: [beneficiaries, activestudents, stat3, stat3trend?, beneficiariesTrend?]
type YearStats = { beneficiaries: string; activeStudents: string; stat3: string; stat3Trend?: string; beneficiariesTrend?: string };

const communityYearStats: Record<string, Partial<Record<YearTab, YearStats>>> = {
  dzivarasekwa: {
    YTD:   { beneficiaries: '1,260', activeStudents: '312', stat3: '89', beneficiariesTrend: '+3.2%' },
    '2026': { beneficiaries: '4,820', activeStudents: '312', stat3: '89', beneficiariesTrend: '+11.4%' },
    '2025': { beneficiaries: '4,330', activeStudents: '289', stat3: '81', beneficiariesTrend: '+13.9%' },
    '2024': { beneficiaries: '3,800', activeStudents: '264', stat3: '74', beneficiariesTrend: '+11.8%' },
    '2023': { beneficiaries: '3,400', activeStudents: '240', stat3: '65', beneficiariesTrend: '+13.3%' },
    '2022': { beneficiaries: '3,000', activeStudents: '212', stat3: '56', beneficiariesTrend: '+11.1%' },
    '2021': { beneficiaries: '2,700', activeStudents: '188', stat3: '48', beneficiariesTrend: '+12.5%' },
    '2020': { beneficiaries: '2,400', activeStudents: '162', stat3: '38', beneficiariesTrend: '+9.1%' },
    '2019': { beneficiaries: '2,200', activeStudents: '130', stat3: '28', beneficiariesTrend: '+10.0%' },
    '2018': { beneficiaries: '2,000', activeStudents: '100', stat3: '20', beneficiariesTrend: '—' },
  },
  kuwadzana: {
    YTD:   { beneficiaries: '1,020', activeStudents: '278', stat3: '74', beneficiariesTrend: '+4.1%' },
    '2026': { beneficiaries: '3,940', activeStudents: '278', stat3: '74', beneficiariesTrend: '+16.2%' },
    '2025': { beneficiaries: '3,390', activeStudents: '248', stat3: '65', beneficiariesTrend: '+18.5%' },
    '2024': { beneficiaries: '2,860', activeStudents: '218', stat3: '56', beneficiariesTrend: '+20.2%' },
    '2023': { beneficiaries: '2,380', activeStudents: '192', stat3: '48', beneficiariesTrend: '+22.1%' },
    '2022': { beneficiaries: '1,950', activeStudents: '164', stat3: '40', beneficiariesTrend: '+25.0%' },
    '2021': { beneficiaries: '1,560', activeStudents: '136', stat3: '32', beneficiariesTrend: '+30.0%' },
    '2020': { beneficiaries: '1,200', activeStudents: '108', stat3: '24', beneficiariesTrend: '+50.0%' },
    '2019': { beneficiaries: '800',   activeStudents: '72',  stat3: '14', beneficiariesTrend: '—' },
  },
  mufakose: {
    YTD:   { beneficiaries: '1,340', activeStudents: '295', stat3: '112', beneficiariesTrend: '+2.8%' },
    '2026': { beneficiaries: '5,110', activeStudents: '295', stat3: '112', beneficiariesTrend: '+9.8%' },
    '2025': { beneficiaries: '4,650', activeStudents: '268', stat3: '101', beneficiariesTrend: '+12.0%' },
    '2024': { beneficiaries: '4,150', activeStudents: '242', stat3: '90', beneficiariesTrend: '+13.7%' },
    '2023': { beneficiaries: '3,650', activeStudents: '214', stat3: '78', beneficiariesTrend: '+15.9%' },
    '2022': { beneficiaries: '3,150', activeStudents: '188', stat3: '66', beneficiariesTrend: '+12.5%' },
    '2021': { beneficiaries: '2,800', activeStudents: '162', stat3: '54', beneficiariesTrend: '+16.7%' },
    '2020': { beneficiaries: '2,400', activeStudents: '136', stat3: '42', beneficiariesTrend: '+26.3%' },
    '2019': { beneficiaries: '1,900', activeStudents: '104', stat3: '28', beneficiariesTrend: '—' },
  },
  'warren-park': {
    YTD:   { beneficiaries: '720',   activeStudents: '198', stat3: '84%', beneficiariesTrend: '+6.2%' },
    '2026': { beneficiaries: '2,760', activeStudents: '198', stat3: '84%', beneficiariesTrend: '+21.3%' },
    '2025': { beneficiaries: '2,275', activeStudents: '168', stat3: '81%', beneficiariesTrend: '+22.7%' },
    '2024': { beneficiaries: '1,854', activeStudents: '140', stat3: '79%', beneficiariesTrend: '+32.4%' },
    '2023': { beneficiaries: '1,400', activeStudents: '112', stat3: '76%', beneficiariesTrend: '+55.6%' },
    '2022': { beneficiaries: '900',   activeStudents: '82',  stat3: '72%', beneficiariesTrend: '+80.0%' },
    '2021': { beneficiaries: '500',   activeStudents: '52',  stat3: '68%', beneficiariesTrend: '—' },
  },
  kambuzuma: {
    YTD:   { beneficiaries: '490',   activeStudents: '143', stat3: '8', beneficiariesTrend: '+9.0%' },
    '2026': { beneficiaries: '1,890', activeStudents: '143', stat3: '8', beneficiariesTrend: '+38.5%' },
    '2025': { beneficiaries: '1,365', activeStudents: '112', stat3: '8', beneficiariesTrend: '+24.1%' },
    '2024': { beneficiaries: '1,100', activeStudents: '84',  stat3: '6', beneficiariesTrend: '+61.8%' },
    '2023': { beneficiaries: '680',   activeStudents: '52',  stat3: '4', beneficiariesTrend: '—' },
  },
};

const communityData: Record<string, {
  title: string;
  description: string;
  stat3Label: string;
  stat3Subtitle: string;
  foundedYear: number;
  about: string;
  programs: string[];
  highlights: string[];
}> = {
  dzivarasekwa: {
    title: 'Dzivarasekwa',
    description: 'One of our founding communities and home to our first Innovation Hub, driving digital inclusion in the heart of Harare.',
    stat3Label: 'Teachers Trained',
    stat3Subtitle: 'Certified educators',
    foundedYear: 2018,
    about: 'Dzivarasekwa was the starting point of our mission. With high youth unemployment and limited access to technology education, this community inspired the founding of our first Innovation Hub in 2018. Today it remains one of our most active hubs.',
    programs: ['Bootcamp Program', 'Youth Coding', 'Teacher Training', 'Outreach'],
    highlights: ['First Innovation Hub established here', 'Highest bootcamp graduation rate', 'Strong school partnerships', '3 active after-school clubs'],
  },
  kuwadzana: {
    title: 'Kuwadzana',
    description: 'A high-density suburb with strong community engagement and one of the fastest-growing youth coding cohorts in the network.',
    stat3Label: 'Teachers Trained',
    stat3Subtitle: 'Certified educators',
    foundedYear: 2019,
    about: 'Kuwadzana joined the network in 2019 and has grown rapidly, fuelled by strong community and school buy-in. The hub is known for its vibrant after-school Youth Coding clubs and active parent involvement.',
    programs: ['Bootcamp Program', 'Youth Coding', 'Teacher Training', 'Outreach'],
    highlights: ['Fastest-growing Youth Coding cohort', 'High parental engagement', '4 partnered primary schools', 'Annual community hackathon host'],
  },
  mufakose: {
    title: 'Mufakose',
    description: 'A densely populated suburb where our Teacher Training program has had its deepest multiplier effect, reaching thousands through trained educators.',
    stat3Label: 'Teachers Trained',
    stat3Subtitle: 'Certified educators',
    foundedYear: 2019,
    about: 'Mufakose is our largest hub by total beneficiary reach. The community has embraced teacher training as its primary vehicle for impact, with over 112 certified educators now delivering tech education across dozens of local schools.',
    programs: ['Bootcamp Program', 'Youth Coding', 'Teacher Training', 'Outreach'],
    highlights: ['Highest teacher training output', 'Largest beneficiary footprint', '12 partnered secondary schools', 'Monthly community meetups'],
  },
  'warren-park': {
    title: 'Warren Park',
    description: 'A growing suburb with a young demographic and strong bootcamp graduate employment outcomes, making it a model for economic upliftment.',
    stat3Label: 'Job Placements',
    stat3Subtitle: 'Bootcamp graduate employment',
    foundedYear: 2021,
    about: 'Warren Park is one of our newer hubs but has quickly distinguished itself through exceptional bootcamp graduate employment outcomes. The community has strong ties to local tech employers who actively hire from our program.',
    programs: ['Bootcamp Program', 'Youth Coding', 'Outreach'],
    highlights: ['Best employment outcomes (84%)', 'Active employer partnerships', '2 corporate sponsors', 'Rising female enrolment'],
  },
  kambuzuma: {
    title: 'Kambuzuma',
    description: 'Our newest community hub, focused on youth outreach and digital literacy, with rapid early growth and strong school integration.',
    stat3Label: 'Schools Partnered',
    stat3Subtitle: 'Active school integrations',
    foundedYear: 2023,
    about: 'Kambuzuma is our most recently established hub and is already showing impressive early momentum. With a strong focus on youth digital literacy and school integration, it is on track to become one of our highest-impact communities.',
    programs: ['Youth Coding', 'Outreach'],
    highlights: ['Fastest community growth rate', 'Strong school integration model', '8 partnered schools in year one', 'Youth-led coding club launched'],
  },
};

export default function CommunityPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeYear, setActiveYear] = useState<YearTab>('2026');

  const community = communityData[slug ?? ''];
  const yearStats = communityYearStats[slug ?? ''];

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

  const availableYears = ALL_YEARS.filter(y => yearStats?.[y] !== undefined);
  const data = yearStats?.[activeYear];

  // If selected year predates this community, default to oldest available
  const displayData = data ?? yearStats?.[availableYears[availableYears.length - 1]];

  const yearLabel =
    activeYear === 'YTD' ? 'Q1 2026 (YTD)' :
    activeYear === '2018' ? 'Inception Year 2018' :
    `Full Year ${activeYear}`;

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
                  <span>{yearLabel}</span>
                </div>
              </div>

              {/* Year Tabs */}
              <div className="flex items-center gap-1 mb-6 p-1 bg-white border border-gray-100 rounded-xl w-fit shadow-sm flex-wrap">
                {ALL_YEARS.map((year) => {
                  const available = availableYears.includes(year);
                  return (
                    <button
                      key={year}
                      onClick={() => available && setActiveYear(year)}
                      disabled={!available}
                      className={`px-5 py-2 rounded-lg text-sm font-semibold tracking-tight transition-all ${
                        activeYear === year
                          ? 'bg-[#0747A1] text-white shadow-md'
                          : available
                            ? 'text-gray-400 hover:text-gray-700'
                            : 'text-gray-200 cursor-not-allowed'
                      }`}
                    >
                      {year}
                    </button>
                  );
                })}
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
            {displayData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard
                  label="Beneficiaries"
                  value={displayData.beneficiaries}
                  subtitle="Total community reach"
                  trend={displayData.beneficiariesTrend}
                  variant="primary"
                />
                <StatCard
                  label="Hub Established"
                  value={String(community.foundedYear)}
                  subtitle={community.foundedYear <= 2018 ? 'Founding community hub' : 'Community hub year'}
                  variant="primary"
                />
                <StatCard
                  label="Active Students"
                  value={displayData.activeStudents}
                  subtitle="Enrolled across all programs"
                  variant="primary"
                />
                <StatCard
                  label={community.stat3Label}
                  value={displayData.stat3}
                  subtitle={community.stat3Subtitle}
                  trend={displayData.stat3Trend}
                  variant="primary"
                />
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 border border-gray-100 text-center text-gray-400">
                No data available for {activeYear} — this hub was established in {community.foundedYear}.
              </div>
            )}
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
