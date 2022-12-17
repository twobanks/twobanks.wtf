export const CALL_REFRESH = `https://www.strava.com/oauth/token?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}&refresh_token=${process.env.NEXT_PUBLIC_REFRESH_TOKEN}&grant_type=refresh_token`
export const CALL_ACTIVITIES = `https://www.strava.com/api/v3/athlete/activities?page=`
export const CALL_ATHLETE = `https://www.strava.com/api/v3/athlete?access_token=`
