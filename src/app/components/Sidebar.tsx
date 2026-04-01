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

interface SidebarProps {
  activeSection?: string;
}

export function Sidebar({ activeSection = 'Overview' }: SidebarProps) {
  const programs = ['Bootcamp', 'Youth Coding', 'Teacher Training', 'Outreach'];
  const communities = [
    'Dzivarasekwa',
    'Kuwadzana',
    'Mufakose',
    'Warren Park',
    'Kambuzuma',
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-100 h-screen flex flex-col sticky top-0 overflow-hidden">
      {/* Brand Logo */}
      <div className="p-10">
        <div className="w-full h-5 relative group cursor-pointer">
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
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-6 space-y-10 overflow-y-auto pb-10 custom-scrollbar">
        {/* General */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-4 px-4">Menu</h3>
          <div className="space-y-1">
            <NavItem 
              icon={<LayoutDashboard className="w-4 h-4" />} 
              label="Overview" 
              active={activeSection === 'Overview'} 
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
            {programs.map((program) => (
              <NavItem 
                key={program}
                icon={<BookOpen className="w-4 h-4" />} 
                label={program} 
              />
            ))}
          </div>
        </div>

        {/* Communities */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-4 px-4">Communities</h3>
          <div className="space-y-1">
            {communities.map((community) => (
              <NavItem 
                key={community}
                icon={<MapPin className="w-4 h-4" />} 
                label={community} 
              />
            ))}
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
  icon, 
  label, 
  active = false, 
  small = false 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean;
  small?: boolean;
}) {
  return (
    <button className={`
      w-full flex items-center gap-3 px-4 rounded-lg transition-all duration-200 group
      ${active 
        ? 'bg-[#0747A1]/5 text-[#0747A1] font-semibold py-3' 
        : 'text-gray-500 hover:bg-gray-50 hover:text-[#0747A1] py-2.5'
      }
      ${small ? 'text-xs' : 'text-sm'}
    `}>
      <span className={`transition-colors duration-200 ${active ? 'text-[#0747A1]' : 'text-gray-400 group-hover:text-[#0747A1]'}`}>
        {icon}
      </span>
      <span className="tracking-tight">{label}</span>
    </button>
  );
}
