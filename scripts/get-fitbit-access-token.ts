/// <Reference path="../src/types/fitbit-node.d.ts" />

import * as FitbitApiClient from "fitbit-node";
import * as config from "../config";

async function init() {
    const client = new FitbitApiClient({
        clientId: config.fitbitClientId, clientSecret:
            config.fitbitSecret, apiVersion: "1.2"
    })

    const authUrl = client.getAuthorizeUrl("heartrate profile activity sleep", "http://127.0.0.1:8080/");

    if (!config.fitbitCode) {
        console.log("---- PUT THE FOLLOWING URL IN YOUR BROWSER ---")
        console.log(authUrl);
        console.log("After auth, then copy the code into the config.ts and run this again.")
    }
    else if (!config.fitbitAccessToken.access_token) {
        const token = await client.getAccessToken(config.fitbitCode, "http://127.0.0.1:8080/");
        console.log("---- ACCESS TOKEN ----");
        console.log(token);
        console.log("Take the above and chuck it in config.ts and run the mirror.");
    }
    else {
        console.log("You are all sorted.. To prove it here is some data about you:");
        const data = await client.get("/profile.json", config.fitbitAccessToken.access_token);
        console.log(data[0]);
        const hr = await client.get("/activities/heart/date/today/1d.json");
        console.log("Heartrate", hr[0]);
    }
}

init();