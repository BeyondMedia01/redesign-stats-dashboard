import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const SPACES = [
  {
    id: 'head-office',
    name: 'Head Office',
    description: 'uncommon.org headquarters',
    lat: -17.8180252,
    lng: 31.0672814,
  },
  {
    id: 'mbare-art-space',
    name: 'Mbare Art Space',
    description: 'Community innovation hub — Mbare',
    lat: -17.8662875,
    lng: 31.0297969,
  },
  {
    id: 'emganwini',
    name: 'Emganwini',
    description: 'Community innovation hub — Bulawayo',
    lat: -20.2164242,
    lng: 28.5134762,
  },
  {
    id: 'kuwadzana',
    name: 'Kuwadzana',
    description: 'Community innovation hub — Harare West',
    lat: -17.8037051,
    lng: 30.9290935,
  },
];

// Center that fits all 4 pins (Harare + Bulawayo)
const MAP_CENTER: [number, number] = [30.2, -18.9];
const MAP_ZOOM = 6;

export function SpacesMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      attributionControl: false,
    });

    map.current.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      'top-right'
    );

    map.current.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      'bottom-right'
    );

    SPACES.forEach((space) => {
      // Outer pulse ring
      const pulse = document.createElement('div');
      pulse.style.cssText = `
        width: 36px; height: 36px;
        border-radius: 50%;
        background: rgba(7, 71, 161, 0.12);
        border: 2px solid rgba(7, 71, 161, 0.25);
        display: flex; align-items: center; justify-content: center;
        cursor: pointer;
        transition: transform 0.2s ease, background 0.2s ease;
        animation: pulse-ring 2.5s ease-out infinite;
      `;

      // Inner dot
      const dot = document.createElement('div');
      dot.style.cssText = `
        width: 14px; height: 14px;
        border-radius: 50%;
        background: #0747A1;
        border: 2.5px solid white;
        box-shadow: 0 2px 8px rgba(7, 71, 161, 0.45);
        transition: transform 0.2s ease;
      `;
      pulse.appendChild(dot);

      const marker = new maplibregl.Marker({ element: pulse, anchor: 'center' })
        .setLngLat([space.lng, space.lat])
        .addTo(map.current!);

      const popup = new maplibregl.Popup({
        offset: 22,
        closeButton: false,
        closeOnClick: false,
        className: 'uncommon-popup',
        maxWidth: '220px',
      }).setHTML(`
        <div style="font-family: inherit; padding: 2px 0;">
          <p style="margin: 0 0 2px; font-size: 13px; font-weight: 700; color: #0747A1; line-height: 1.3;">${space.name}</p>
          <p style="margin: 0; font-size: 11px; color: #6b7280; line-height: 1.4;">${space.description}</p>
        </div>
      `);

      pulse.addEventListener('mouseenter', () => {
        popup.setLngLat([space.lng, space.lat]).addTo(map.current!);
        pulse.style.background = 'rgba(7, 71, 161, 0.18)';
        dot.style.transform = 'scale(1.2)';
        setActive(space.id);
      });

      pulse.addEventListener('mouseleave', () => {
        popup.remove();
        pulse.style.background = 'rgba(7, 71, 161, 0.12)';
        dot.style.transform = 'scale(1)';
        setActive(null);
      });

      pulse.addEventListener('click', () => {
        map.current!.flyTo({
          center: [space.lng, space.lat],
          zoom: 13,
          duration: 1200,
          essential: true,
        });
      });
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-gray-100 shadow-sm" style={{ height: 440 }}>
      {/* Pulse animation style */}
      <style>{`
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(7, 71, 161, 0.25); }
          70% { box-shadow: 0 0 0 10px rgba(7, 71, 161, 0); }
          100% { box-shadow: 0 0 0 0 rgba(7, 71, 161, 0); }
        }
        .maplibregl-ctrl-top-right { top: 12px; right: 12px; }
        .maplibregl-ctrl-group { border: none !important; box-shadow: 0 1px 4px rgba(0,0,0,0.1) !important; border-radius: 8px !important; overflow: hidden; }
        .maplibregl-ctrl-group button { border: none !important; }
        .uncommon-popup .maplibregl-popup-content {
          border-radius: 10px !important;
          padding: 10px 14px !important;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12) !important;
          border: 1px solid rgba(7,71,161,0.12) !important;
          font-family: inherit !important;
        }
        .uncommon-popup .maplibregl-popup-tip { border-top-color: white !important; }
      `}</style>

      <div ref={mapContainer} className="w-full h-full" />

      {/* Location legend overlay */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-3 flex flex-col gap-2">
        {SPACES.map((space) => (
          <div
            key={space.id}
            className={`flex items-center gap-2.5 px-2 py-1 rounded-lg transition-colors cursor-pointer ${
              active === space.id ? 'bg-[#0747A1]/5' : ''
            }`}
            onClick={() => {
              map.current?.flyTo({
                center: [space.lng, space.lat],
                zoom: 13,
                duration: 1200,
                essential: true,
              });
            }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#0747A1] shrink-0 shadow-sm" />
            <span className="text-xs font-medium text-gray-700 leading-tight">{space.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
