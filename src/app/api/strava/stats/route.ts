import { NextResponse } from 'next/server';
import { getAthleteStats } from '@/utils/lib/strava';
import { getAthleteSettings, getWellnessData } from '@/utils/lib/intervals';
import { StravaStatsResponse, IntervalsProfileResponse, IntervalsWellnessItem, StravaActivityTotal, FormattedVolume, VolumeData, FormattedZone, PhysiologyData, ApiResponse } from '@/utils/types/strava';

export async function GET() {
  const stravaStats = (await getAthleteStats()) as StravaStatsResponse | null;
  const intervalsProfile = (await getAthleteSettings()) as IntervalsProfileResponse | null;
  const intervalsWellness = (await getWellnessData(7)) as IntervalsWellnessItem[] | null;

  if (!stravaStats) {
    return NextResponse.json({ error: 'Erro ao buscar dados do Strava' }, { status: 500 });
  }

  const formatVolume = (statObj?: StravaActivityTotal): FormattedVolume => ({
    count: statObj?.count || 0,
    distance: statObj ? Math.round(statObj.distance / 1000) : 0, 
    elevation: statObj ? Math.round(statObj.elevation_gain) : 0, 
    time: statObj ? Math.round(statObj.moving_time / 3600) : 0,  
  });

  const volume: VolumeData = {
    year: {
      run: formatVolume(stravaStats.ytd_run_totals),
      ride: formatVolume(stravaStats.ytd_ride_totals),
    },
    recent: {
      run: formatVolume(stravaStats.recent_run_totals),
      ride: formatVolume(stravaStats.recent_ride_totals),
    },
    all_time: {
      run: formatVolume(stravaStats.all_run_totals),
      ride: formatVolume(stravaStats.all_ride_totals),
    },
  };

  const runSettings = intervalsProfile?.sportSettings?.find((s) => 
    s.types.includes('Run')
  );

  const lthr = runSettings?.lthr || 0;
  const rawZones = runSettings?.hr_zones || [];

  const zones: FormattedZone[] = rawZones.map((upperLimit, index) => {
    if (typeof upperLimit === 'number') {
      const prevZoneLimit = index === 0 ? 0 : rawZones[index - 1];
      const lowerLimit = typeof prevZoneLimit === 'number' ? prevZoneLimit + 1 : 0;
      
      return {
        min: lowerLimit,
        max: upperLimit,
        name: `Z${index + 1}`,
      };
    }

    return {
      min: upperLimit.min || 0,
      max: upperLimit.max || 0,
      name: upperLimit.name || `Z${index + 1}`,
    };
  });

  const wellness = intervalsWellness
    ? [...intervalsWellness].reverse().find((day) => day.restingHR || day.hrv)
    : null;

  const physiology: PhysiologyData = {
    lthr: lthr,
    restingHR: wellness?.restingHR || intervalsProfile?.restingHR || 0,
    maxHR: intervalsProfile?.max_hr || 0,
    ctl: intervalsProfile?.fitness || 0,
    atl: intervalsProfile?.fatigue || 0,
    form: intervalsProfile?.form || 0,
    zones: zones,
  };

  return NextResponse.json<ApiResponse>({ volume, physiology });
}