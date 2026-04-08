import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  BookOpen,
  MapPin,
  Settings,
  HelpCircle,
  TrendingUp,
  Users
} from 'lucide-react';
import svgPaths from "../../imports/svg-n8a0hqlqph";

const programSlugs: Record<string, string> = {
  'Bootcamp': 'bootcamp',
  'Youth Coding': 'youth-coding',
  'Teacher Training': 'teacher-training',
  'Outreach': 'outreach',
};

export function Sidebar() {
  const location = useLocation();
  const programs = ['Bootcamp', 'Youth Coding', 'Teacher Training', 'Outreach'];
  const communities = [
    { label: 'Kuwadzana', slug: 'kuwadzana' },
    { label: 'Kambuzuma', slug: 'kambuzuma' },
    { label: 'Vincent Bohlen', slug: 'vincent-bohlen' },
    { label: 'Mufakose', slug: 'mufakose' },
    { label: 'Jafuta', slug: 'jafuta' },
    { label: 'Emganwini', slug: 'emganwini' },
    { label: 'Dzivarasekwa', slug: 'dzivarasekwa' },
    { label: 'Warren Park', slug: 'warren-park' },
    { label: 'Mbare', slug: 'mbare' },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-100 h-screen flex flex-col sticky top-0 overflow-hidden">
      {/* Brand Logo */}
      <div className="p-10">
        <Link to="/" className="w-full h-5 relative group cursor-pointer block">
          <svg className="block h-full w-auto" fill="none" preserveAspectRatio="xMinYMid meet" viewBox="0 0 175 16.297">
            <g>
              <path d={svgPaths.p3c89a80} fill="#0747A1" />
              <path d={svgPaths.p109d8880} fill="#0747A1" transform="translate(16, 0.12)" />
              <path d={svgPaths.p1f023000} fill="#0747A1" transform="translate(33, 0.12)" />
              <path d={svgPaths.p24c24070} fill="#0747A1" transform="translate(49, 0.09)" />
              <path d={svgPaths.pa1f4ac0} fill="#0747A1" transform="translate(66, 0)" />
              <path d={svgPaths.p21cf0900} fill="#0747A1" transform="translate(94, 0)" />
              <path d={svgPaths.p186f9a00} fill="#0747A1" transform="translate(122, 0.09)" />
              <path d={svgPaths.p3f139e00} fill="#0747A1" transform="translate(139, 0.12)" />
            </g>
          </svg>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-6 space-y-10 overflow-y-auto pb-10 custom-scrollbar">
        {/* General */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-4 px-4">Menu</h3>
          <div className="space-y-1">
            <NavItem
              to="/"
              icon={<LayoutDashboard className="w-4 h-4" />}
              label="Overview"
              active={location.pathname === '/'}
            />
            <NavItem
              icon={<TrendingUp className="w-4 h-4" />}
              label="Analytics"
            />
            <NavItem
              icon={<Users className="w-4 h-4" />}
              label="Beneficiaries"
            />
          </div>
        </div>

        {/* Programs */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-4 px-4">Programs</h3>
          <div className="space-y-1">
            {programs.map((program) => {
              const slug = programSlugs[program];
              const path = `/programs/${slug}`;
              return (
                <NavItem
                  key={program}
                  to={path}
                  icon={<BookOpen className="w-4 h-4" />}
                  label={program}
                  active={location.pathname === path}
                />
              );
            })}
          </div>
        </div>

        {/* Communities */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-4 px-4">Communities</h3>
          <div className="space-y-1">
            {communities.map(({ label, slug }) => {
              const path = `/communities/${slug}`;
              return (
                <NavItem
                  key={slug}
                  to={path}
                  icon={<MapPin className="w-4 h-4" />}
                  label={label}
                  active={location.pathname === path}
                />
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer Nav */}
      <div className="p-6 border-t border-gray-50 bg-gray-50/30">
        <div className="space-y-1">
          <NavItem
            icon={<Settings className="w-4 h-4" />}
            label="Settings"
            small
          />
          <NavItem
            icon={<HelpCircle className="w-4 h-4" />}
            label="Support"
            small
          />
        </div>
      </div>
    </aside>
  );
}

function NavItem({
  to,
  icon,
  label,
  active = false,
  small = false
}: {
  to?: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  small?: boolean;
}) {
  const className = `
    w-full flex items-center gap-3 px-4 rounded-lg transition-all duration-200 group
    ${active
      ? 'bg-[#0747A1]/5 text-[#0747A1] font-semibold py-3'
      : 'text-gray-500 hover:bg-gray-50 hover:text-[#0747A1] py-2.5'
    }
    ${small ? 'text-xs' : 'text-sm'}
  `;

  const content = (
    <>
      <span className={`transition-colors duration-200 ${active ? 'text-[#0747A1]' : 'text-gray-400 group-hover:text-[#0747A1]'}`}>
        {icon}
      </span>
      <span className="tracking-tight">{label}</span>
    </>
  );

  if (to) {
    return <Link to={to} className={className}>{content}</Link>;
  }

  return <button className={className}>{content}</button>;
}
