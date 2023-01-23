import { Activities } from "@/types/strava";

const TOKEN_ENDPOINT = "https://www.strava.com/oauth/token";
const CALL_ATHLETE = `https://www.strava.com/api/v3/athletes/28981595`;

const getAccessToken = async () => {
  const body = JSON.stringify({
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    refresh_token: process.env.NEXT_PUBLIC_REFRESH_TOKEN,
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

export const getActivities = async () => {
  const { access_token: accessToken } = await getAccessToken();
  const response = await fetch(
    `${CALL_ATHLETE}/activities?access_token=${accessToken}`
  );
  const json = await response.json();

  const activities = json.filter((activity: Activities) => activity.visibility === "everyone");

  return activities;
};
