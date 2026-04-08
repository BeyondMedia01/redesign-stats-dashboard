import { useState } from 'react';
import { useParams } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { StatCard } from '../components/StatCard';
import { motion } from 'motion/react';
import { MapPin, Users, BookOpen, GraduationCap, Calendar, TrendingUp, Award, CheckCircle2, Users2 } from 'lucide-react';

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
  'vincent-bohlen': {
    YTD:   { beneficiaries: '310',   activeStudents: '98',  stat3: '12', beneficiariesTrend: '+7.2%' },
    '2026': { beneficiaries: '1,420', activeStudents: '98',  stat3: '12', beneficiariesTrend: '+29.1%' },
    '2025': { beneficiaries: '1,100', activeStudents: '76',  stat3: '9',  beneficiariesTrend: '+34.1%' },
    '2024': { beneficiaries: '820',   activeStudents: '58',  stat3: '6',  beneficiariesTrend: '+51.9%' },
    '2023': { beneficiaries: '540',   activeStudents: '38',  stat3: '3',  beneficiariesTrend: '—' },
  },
  jafuta: {
    YTD:   { beneficiaries: '280',   activeStudents: '86',  stat3: '5', beneficiariesTrend: '+8.5%' },
    '2026': { beneficiaries: '1,240', activeStudents: '86',  stat3: '5', beneficiariesTrend: '+32.8%' },
    '2025': { beneficiaries: '934',   activeStudents: '64',  stat3: '4', beneficiariesTrend: '+35.2%' },
    '2024': { beneficiaries: '690',   activeStudents: '44',  stat3: '2', beneficiariesTrend: '—' },
  },
  emganwini: {
    YTD:   { beneficiaries: '340',   activeStudents: '110', stat3: '14', beneficiariesTrend: '+6.8%' },
    '2026': { beneficiaries: '1,580', activeStudents: '110', stat3: '14', beneficiariesTrend: '+26.4%' },
    '2025': { beneficiaries: '1,250', activeStudents: '88',  stat3: '10', beneficiariesTrend: '+31.6%' },
    '2024': { beneficiaries: '950',   activeStudents: '66',  stat3: '7',  beneficiariesTrend: '+40.7%' },
    '2023': { beneficiaries: '675',   activeStudents: '44',  stat3: '4',  beneficiariesTrend: '—' },
  },
  mbare: {
    YTD:   { beneficiaries: '420',   activeStudents: '128', stat3: '18', beneficiariesTrend: '+5.9%' },
    '2026': { beneficiaries: '2,180', activeStudents: '128', stat3: '18', beneficiariesTrend: '+22.5%' },
    '2025': { beneficiaries: '1,780', activeStudents: '104', stat3: '14', beneficiariesTrend: '+25.4%' },
    '2024': { beneficiaries: '1,420', activeStudents: '82',  stat3: '10', beneficiariesTrend: '+28.8%' },
    '2023': { beneficiaries: '1,102', activeStudents: '62',  stat3: '6',  beneficiariesTrend: '+46.9%' },
    '2022': { beneficiaries: '750',   activeStudents: '44',  stat3: '3',  beneficiariesTrend: '—' },
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
  demographics: {
    malePercent: number;
    femalePercent: number;
    avgAge: number;
    ageGroups: { label: string; pct: number }[];
  };
  outcomes: {
    employment6mo: number;
    completionRate: number;
    incomeChangePct: number;
    incomeBefore: string;
    incomeAfter: string;
    followUp2yr: number;
  };
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
    demographics: {
      malePercent: 44, femalePercent: 56, avgAge: 22,
      ageGroups: [
        { label: '13–17', pct: 28 },
        { label: '18–24', pct: 42 },
        { label: '25–34', pct: 20 },
        { label: '35+',   pct: 10 },
      ],
    },
    outcomes: {
      employment6mo: 74, completionRate: 87,
      incomeChangePct: 480, incomeBefore: '$3.0K', incomeAfter: '$17.4K', followUp2yr: 70,
    },
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
    demographics: {
      malePercent: 48, femalePercent: 52, avgAge: 19,
      ageGroups: [
        { label: '13–17', pct: 38 },
        { label: '18–24', pct: 36 },
        { label: '25–34', pct: 18 },
        { label: '35+',   pct: 8 },
      ],
    },
    outcomes: {
      employment6mo: 69, completionRate: 82,
      incomeChangePct: 440, incomeBefore: '$3.1K', incomeAfter: '$16.7K', followUp2yr: 65,
    },
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
    demographics: {
      malePercent: 38, femalePercent: 62, avgAge: 31,
      ageGroups: [
        { label: '13–17', pct: 18 },
        { label: '18–24', pct: 30 },
        { label: '25–34', pct: 34 },
        { label: '35+',   pct: 18 },
      ],
    },
    outcomes: {
      employment6mo: 68, completionRate: 80,
      incomeChangePct: 390, incomeBefore: '$3.4K', incomeAfter: '$16.7K', followUp2yr: 63,
    },
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
    demographics: {
      malePercent: 46, femalePercent: 54, avgAge: 21,
      ageGroups: [
        { label: '13–17', pct: 22 },
        { label: '18–24', pct: 50 },
        { label: '25–34', pct: 22 },
        { label: '35+',   pct: 6 },
      ],
    },
    outcomes: {
      employment6mo: 84, completionRate: 91,
      incomeChangePct: 520, incomeBefore: '$2.9K', incomeAfter: '$18.0K', followUp2yr: 78,
    },
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
    demographics: {
      malePercent: 50, femalePercent: 50, avgAge: 15,
      ageGroups: [
        { label: '13–17', pct: 62 },
        { label: '18–24', pct: 28 },
        { label: '25–34', pct: 8 },
        { label: '35+',   pct: 2 },
      ],
    },
    outcomes: {
      employment6mo: 58, completionRate: 76,
      incomeChangePct: 310, incomeBefore: '$2.8K', incomeAfter: '$11.5K', followUp2yr: 52,
    },
  },
  'vincent-bohlen': {
    title: 'Vincent Bohlen',
    description: 'A Victoria Falls community hub bringing digital skills training to one of Zimbabwe\'s key tourism regions, creating new economic pathways for young people.',
    stat3Label: 'Teachers Trained',
    stat3Subtitle: 'Certified educators',
    foundedYear: 2023,
    about: 'Vincent Bohlen is our first hub in the Victoria Falls region. It focuses on equipping youth with digital skills that open doors beyond the tourism economy, building long-term resilience in the community.',
    programs: ['Bootcamp Program', 'Youth Coding', 'Outreach'],
    highlights: ['First hub in Victoria Falls region', 'Strong youth employment focus', 'Tourism-sector employer partnerships', 'Growing female enrolment'],
    demographics: {
      malePercent: 47, femalePercent: 53, avgAge: 20,
      ageGroups: [
        { label: '13–17', pct: 30 },
        { label: '18–24', pct: 48 },
        { label: '25–34', pct: 16 },
        { label: '35+',   pct: 6 },
      ],
    },
    outcomes: {
      employment6mo: 66, completionRate: 79,
      incomeChangePct: 390, incomeBefore: '$2.8K', incomeAfter: '$13.7K', followUp2yr: 60,
    },
  },
  jafuta: {
    title: 'Jafuta',
    description: 'A Vic Falls community hub serving a rural-adjacent population with limited prior access to technology education.',
    stat3Label: 'Schools Partnered',
    stat3Subtitle: 'Active school integrations',
    foundedYear: 2024,
    about: 'Jafuta is our youngest hub, established in 2024 in the greater Victoria Falls area. It is focused primarily on youth digital literacy and school integration, with early indicators showing strong community appetite for tech education.',
    programs: ['Youth Coding', 'Outreach'],
    highlights: ['Established in 2024', 'Focus on rural digital access', 'School-first delivery model', 'Strong community leadership buy-in'],
    demographics: {
      malePercent: 52, femalePercent: 48, avgAge: 16,
      ageGroups: [
        { label: '13–17', pct: 58 },
        { label: '18–24', pct: 30 },
        { label: '25–34', pct: 10 },
        { label: '35+',   pct: 2 },
      ],
    },
    outcomes: {
      employment6mo: 54, completionRate: 74,
      incomeChangePct: 280, incomeBefore: '$2.6K', incomeAfter: '$9.9K', followUp2yr: 48,
    },
  },
  emganwini: {
    title: 'Emganwini',
    description: 'A Bulawayo community hub expanding our footprint into Zimbabwe\'s second city, delivering coding education to a high-density urban population.',
    stat3Label: 'Teachers Trained',
    stat3Subtitle: 'Certified educators',
    foundedYear: 2023,
    about: 'Emganwini marks our expansion into Bulawayo, Zimbabwe\'s second-largest city. The hub serves a dense urban community with strong demand for digital skills, and has quickly built school and employer partnerships across the city.',
    programs: ['Bootcamp Program', 'Youth Coding', 'Teacher Training', 'Outreach'],
    highlights: ['First hub in Bulawayo', 'Rapid school partnership growth', 'Employer network in Bulawayo CBD', 'High female teacher representation'],
    demographics: {
      malePercent: 42, femalePercent: 58, avgAge: 23,
      ageGroups: [
        { label: '13–17', pct: 24 },
        { label: '18–24', pct: 44 },
        { label: '25–34', pct: 24 },
        { label: '35+',   pct: 8 },
      ],
    },
    outcomes: {
      employment6mo: 70, completionRate: 81,
      incomeChangePct: 410, incomeBefore: '$3.0K', incomeAfter: '$15.3K', followUp2yr: 64,
    },
  },
  mbare: {
    title: 'Mbare',
    description: 'One of Harare\'s most populous and historically underserved suburbs, where our hub is delivering significant economic impact through tech education.',
    stat3Label: 'Teachers Trained',
    stat3Subtitle: 'Certified educators',
    foundedYear: 2022,
    about: 'Mbare is one of the oldest and most densely populated suburbs in Harare. Our hub here addresses deep-rooted youth unemployment through intensive coding training, teacher development, and strong community outreach.',
    programs: ['Bootcamp Program', 'Youth Coding', 'Teacher Training', 'Outreach'],
    highlights: ['High-density urban reach', 'Strong bootcamp graduate outcomes', 'Active community radio presence', 'Growing corporate sponsor network'],
    demographics: {
      malePercent: 45, femalePercent: 55, avgAge: 22,
      ageGroups: [
        { label: '13–17', pct: 26 },
        { label: '18–24', pct: 46 },
        { label: '25–34', pct: 20 },
        { label: '35+',   pct: 8 },
      ],
    },
    outcomes: {
      employment6mo: 72, completionRate: 83,
      incomeChangePct: 430, incomeBefore: '$3.1K', incomeAfter: '$16.4K', followUp2yr: 67,
    },
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

          {/* Beneficiary Demographics */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
              <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Beneficiary Demographics</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Gender */}
              <div className="bg-white rounded-xl p-8 border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-[#0747A1]/5 rounded-lg">
                    <Users2 className="w-4 h-4 text-[#0747A1]" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-[1px]">Gender Split</span>
                </div>
                <div className="flex items-end gap-4 mb-6">
                  <div>
                    <div className="text-4xl font-bold text-[#0747A1]">{community.demographics.femalePercent}%</div>
                    <p className="text-xs text-gray-500 mt-1">Female</p>
                  </div>
                  <div className="pb-1">
                    <div className="text-2xl font-bold text-gray-400">{community.demographics.malePercent}%</div>
                    <p className="text-xs text-gray-500 mt-1">Male</p>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
                  <div className="bg-[#0747A1] h-full" style={{ width: `${community.demographics.femalePercent}%` }} />
                  <div className="bg-gray-300 h-full flex-1" />
                </div>
                <p className="text-xs text-gray-400 mt-3">Average participant age: <strong className="text-gray-700">{community.demographics.avgAge} yrs</strong></p>
              </div>

              {/* Age Groups */}
              <div className="bg-white rounded-xl p-8 border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-[#0747A1]/5 rounded-lg">
                    <Users className="w-4 h-4 text-[#0747A1]" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-[1px]">Age Distribution</span>
                </div>
                <div className="space-y-4">
                  {community.demographics.ageGroups.map(({ label, pct }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                        <span>{label}</span>
                        <strong className="text-gray-700">{pct}%</strong>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-[#0747A1] h-full rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary callout */}
              <div className="bg-gradient-to-br from-[#0747A1] to-[#0a5ac7] rounded-xl p-8 text-white flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[1.5px] text-blue-200">Community Profile</span>
                  <div className="text-5xl font-bold mt-4 mb-2">{community.demographics.avgAge}</div>
                  <p className="text-blue-100 text-sm">Average age of beneficiaries in {community.title}</p>
                </div>
                <div className="mt-8 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Female representation</span>
                    <strong>{community.demographics.femalePercent}%</strong>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Largest age cohort</span>
                    <strong>{community.demographics.ageGroups.reduce((a, b) => a.pct > b.pct ? a : b).label}</strong>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Outcomes */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
              <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Outcomes & Sustainability</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-[#0747A1]/5 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-[#0747A1]" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-[1px]">Employment 6–12 Months</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{community.outcomes.employment6mo}%</div>
                <p className="text-xs text-gray-500 mb-3">Still employed in tech roles post-graduation</p>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#0747A1] h-full rounded-full" style={{ width: `${community.outcomes.employment6mo}%` }} />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-[#0747A1]/5 rounded-lg">
                    <Award className="w-4 h-4 text-[#0747A1]" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-[1px]">Income Change</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">+{community.outcomes.incomeChangePct}%</div>
                <p className="text-xs text-gray-500 mb-3">Average income growth after program</p>
                <div className="flex justify-between text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                  <span>Before: <strong className="text-gray-700">{community.outcomes.incomeBefore}/yr</strong></span>
                  <span>→</span>
                  <span>After: <strong className="text-[#0747A1]">{community.outcomes.incomeAfter}/yr</strong></span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-[#0747A1]/5 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-[#0747A1]" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-[1px]">Completion Rate</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{community.outcomes.completionRate}%</div>
                <p className="text-xs text-gray-500 mb-3">Students completing the full curriculum</p>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#0747A1] h-full rounded-full" style={{ width: `${community.outcomes.completionRate}%` }} />
                </div>
                <p className="text-xs text-gray-400 mt-2">{100 - community.outcomes.completionRate}% dropout — tracked & supported</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-[#0747A1]/5 rounded-lg">
                    <Users2 className="w-4 h-4 text-[#0747A1]" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-[1px]">Long-term Follow-up</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{community.outcomes.followUp2yr}%</div>
                <p className="text-xs text-gray-500 mb-3">Still in tech employment at 2-year mark</p>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#0747A1] h-full rounded-full" style={{ width: `${community.outcomes.followUp2yr}%` }} />
                </div>
              </div>

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
