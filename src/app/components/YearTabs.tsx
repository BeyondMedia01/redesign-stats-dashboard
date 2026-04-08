import { useState, useRef, useEffect } from 'react';

export type YearTab = 'YTD' | '2026' | '2025' | '2024' | '2023' | '2022' | '2021' | '2020' | '2019' | '2018';

export const CURRENT_YEAR: YearTab = '2026';
export const HISTORICAL_YEARS: YearTab[] = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'];

export function YearTabs({
  activeYear,
  onChange,
}: {
  activeYear: YearTab;
  onChange: (year: YearTab) => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
    <div className="flex items-center gap-1 p-1 bg-white border border-gray-100 rounded-xl w-fit shadow-sm">
      {/* YTD tab */}
      <button
        onClick={() => onChange('YTD')}
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
            if (!isHistorical) onChange(CURRENT_YEAR);
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
              onClick={() => { onChange(CURRENT_YEAR); setDropdownOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                activeYear === CURRENT_YEAR ? 'text-[#0747A1] bg-[#0747A1]/5' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {CURRENT_YEAR}
            </button>
            {HISTORICAL_YEARS.map((year) => (
              <button
                key={year}
                onClick={() => { onChange(year); setDropdownOpen(false); }}
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
  );
}
