/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

export const CustomTooltip = ({ active, payload, label, onHoverProp }: any) => {
  useEffect(() => {
    if (active && payload && payload.length > 0) {
      const originalData = payload[0].payload;
      if (originalData.coord) {
        onHoverProp(originalData.coord);
      }
    } else {
      onHoverProp(null);
    }
  }, [active, payload, onHoverProp]);
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{
        background: 'rgba(0,0,0,0.9)', 
        border: '1px solid #333',
        padding: '0.8rem',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '0.8rem',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        <p style={{ fontWeight: 'bold', borderBottom: '1px solid #444', paddingBottom: '4px', marginBottom: '2px' }}>
          📍 {label} km
        </p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FC4C02' }}>
          ⛰️ <span>{data.elevation} m</span>
        </div>

        {data.grade !== undefined && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ccc' }}>
            📐 <span>{data.grade}%</span>
          </div>
        )}
        
        {data.speed > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3B82F6' }}>
            ⚡ <span>{data.speed} km/h</span>
          </div>
        )}

        {data.bpm > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#EF4444' }}>
            ❤️ <span>{data.bpm} bpm</span>
          </div>
        )}
      </div>
    );
  }
  return null;
};