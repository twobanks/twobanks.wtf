import { Activities } from "@/types/strava";

const TOKEN_ENDPOINT = "https://www.strava.com/oauth/token";
const CALL_ATHLETE = `https://www.strava.com/api/v3/athletes/28981595`;
const ACTIVITY_ENDPOINT = "https://www.strava.com/api/v3/";

const getAccessToken = async () => {
  const body = JSON.stringify({
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET,
    refresh_token: process.env.STRAVA_REFRESH_TOKEN,
    grant_type: "refresh_token",
  });

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body,
  });

  return response.json();
};

export const getAthlete = async () => {
  const { access_token: accessToken } = await getAccessToken();
  const response = await fetch(
    `${ACTIVITY_ENDPOINT}/athlete?access_token=${accessToken}`
  );

  const athlete = await response.json();
  return athlete;
};

export const getActivities = async () => {
  const { access_token: accessToken } = await getAccessToken();
  const response = await fetch(
    `${CALL_ATHLETE}/activities?access_token=${accessToken}&per_page=50`
  );
  const json = await response.json();

  const activities = json.filter((activity: Activities) => activity.visibility === "everyone");

  return activities;
};

export const getActivity = async (id: number) => {
  const { access_token: accessToken } = await getAccessToken();
  const response = await fetch(
    `${ACTIVITY_ENDPOINT}/activities/${id}?access_token=${accessToken}`
  );
  const activity = await response.json();
  return activity;
};

export const getAthleteStats = async () => {
  const { access_token: accessToken } = await getAccessToken();
  const response = await fetch(
    `${ACTIVITY_ENDPOINT}/athletes/28981595/stats?access_token=${accessToken}`
  );
  const athleteStats = await response.json();

  return athleteStats;
};
