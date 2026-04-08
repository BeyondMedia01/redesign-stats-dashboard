import { useState, useMemo } from 'react';
import { Search, Trophy } from 'lucide-react';

const ALL_SCHOOLS = [
  { rank: 1,  school: 'Gwinyiro Primary School',       students: 152, projects: 259 },
  { rank: 2,  school: 'Kuwadzana 2 Primary',            students: 138, projects: 224 },
  { rank: 3,  school: 'Dzivarasekwa Primary',           students: 121, projects: 198 },
  { rank: 4,  school: 'Mufakose High School',           students: 109, projects: 176 },
  { rank: 5,  school: 'Warren Park Primary',            students: 94,  projects: 150 },
  { rank: 6,  school: 'Kambuzuma 1 Primary',            students: 88,  projects: 142 },
  { rank: 7,  school: 'Budiriro 3 Primary',             students: 81,  projects: 131 },
  { rank: 8,  school: 'Glen View 8 Primary',            students: 76,  projects: 119 },
  { rank: 9,  school: 'Highfield 2 Secondary',          students: 70,  projects: 108 },
  { rank: 10, school: 'Kuwadzana Extension Primary',    students: 65,  projects: 97  },
  { rank: 11, school: 'Mabvuku Primary School',         students: 60,  projects: 89  },
  { rank: 12, school: 'Tafara 1 Primary',               students: 55,  projects: 82  },
  { rank: 13, school: 'Dzivarasekwa 2 Primary',         students: 51,  projects: 74  },
  { rank: 14, school: 'Mufakose 2 Primary',             students: 47,  projects: 68  },
  { rank: 15, school: 'Warren Park D Primary',          students: 43,  projects: 61  },
];

export function SchoolPerformanceTable() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_SCHOOLS;
    return ALL_SCHOOLS.filter((s) => s.school.toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-[#0747A1] rounded-full" />
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">School Performance</h2>
          <span className="text-xs text-gray-400 font-medium">by Project Completions</span>
        </div>
        <span className="text-xs text-gray-400">{filtered.length} school{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {/* Search bar */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search schools…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-8 pr-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:border-[#0747A1]/30 focus:bg-white transition-colors placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Sticky header */}
        <div className="grid grid-cols-12 px-6 py-3 border-b border-gray-100 bg-gray-50/50">
          <span className="col-span-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rank</span>
          <span className="col-span-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">School</span>
          <span className="col-span-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Students</span>
          <span className="col-span-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Projects</span>
        </div>

        {/* Scrollable body — fixed height shows ~10 rows */}
        <div className="overflow-y-auto" style={{ maxHeight: '520px' }}>
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center h-24 text-sm text-gray-400">
              No schools match "{query}"
            </div>
          ) : (
            filtered.map(({ rank, school, students, projects }, i) => (
              <div
                key={school}
                className={`grid grid-cols-12 px-6 py-4 items-center ${i < filtered.length - 1 ? 'border-b border-gray-50' : ''}`}
              >
                <div className="col-span-1">
                  {rank === 1 ? (
                    <div className="w-6 h-6 rounded-full bg-[#0747A1] flex items-center justify-center">
                      <Trophy className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <span className="text-sm font-bold text-gray-400">#{rank}</span>
                  )}
                </div>
                <div className="col-span-6">
                  <span className="text-sm font-medium text-gray-700">{school}</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-sm font-semibold text-gray-600">{students}</span>
                </div>
                <div className="col-span-3 text-right">
                  <span className="text-sm font-bold text-[#0747A1]">{projects}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
