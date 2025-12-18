'use client';

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  TooltipProps 
} from 'recharts';
import { useTheme } from 'styled-components';
import { CustomTooltip } from '@/components/CustomTooltip';
import { ElevationChartProps } from '@/utils/types/strava';
import { ChartValue } from '@/utils/types/component';

import * as S from './styles';

export default function ElevationChart({ data, onHover }: ElevationChartProps) {
  const theme = useTheme();
  const strokeColor = theme?.colors?.menuHover || '#8884d8';
  const textColor = theme?.colors?.text || '#ccc';
  const gridColor = theme?.colors?.text ? `${theme.colors.text}10` : '#ccc';
  if (!data || data.length === 0) return null;
  return (
    <S.ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} onMouseLeave={() => onHover(null)}>
          <defs>
            <linearGradient id="colorElevation" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
          <XAxis dataKey="distance" tickLine={false} axisLine={false} interval="preserveStartEnd" minTickGap={50} unit="km" />
          <YAxis hide={false} tickLine={false} axisLine={false} domain={['dataMin', 'auto']} unit="m" width={40} />
          <Tooltip 
            cursor={{ 
              stroke: textColor, 
              strokeWidth: 1, 
              strokeDasharray: '5 5' 
            }}
            content={(props: TooltipProps<ChartValue, string>) => <CustomTooltip {...props} onHoverProp={onHover} />} 
          />
          <Area type="monotone" dataKey="elevation" stroke={strokeColor} strokeWidth={2} fillOpacity={1} fill="url(#colorElevation)" />
        </AreaChart>
      </ResponsiveContainer>
    </S.ChartContainer>
  );
}