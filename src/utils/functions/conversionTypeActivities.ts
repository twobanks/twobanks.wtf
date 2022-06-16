const bike = '/icon/bike.svg';
const trail = '/icon/trail.svg';
const walking = '/icon/walking.svg';

export const conversionTypeActivities = (value: string) => {
  const activities: { [index: string]: string } = {
    'Ride': bike,
    'Run': trail,
    'Walk': walking
  }
  return activities[value];
}
