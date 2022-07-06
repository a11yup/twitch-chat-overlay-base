/*
  Getting general user data for later requests
*/
const queryParameters = new URLSearchParams(window.location.search);
const channelName = queryParameters.get("channelName");

const userIdResponse = await fetch(
  `https://decapi.me/twitch/id/${channelName}`
);
const userId = await userIdResponse.text();

/*
  BTTV Global Emotes Fetching
*/
const bttvGlobalEmotesResponse = await fetch(
  "https://api.betterttv.net/3/cached/emotes/global"
);

const bttvGlobalEmotes = await bttvGlobalEmotesResponse.json();

export const bttvGlobalLookupTable = bttvGlobalEmotes.reduce(
  (result, emote) => {
    const emoteData = {
      id: emote.id,
      type: emote.imageType,
    };

    result[emote.code] = emoteData;

    return result;
  },
  {}
);

export const bttvGlobalEmoteCodes = Object.keys(bttvGlobalLookupTable);

/*
  BTTV Channel Emotes Fetching
*/
const bttvChannelEmotesResponse = await fetch(
  `https://api.betterttv.net/3/cached/users/twitch/${userId}`
);

const bttvChannelEmotesJSON = await bttvChannelEmotesResponse.json();
const bttvChannelEmotes = bttvChannelEmotesJSON.channelEmotes.concat(
  bttvChannelEmotesJSON.sharedEmotes
);

export const bttvChannelLookupTable = bttvChannelEmotes.reduce(
  (result, emote) => {
    const emoteData = {
      id: emote.id,
      type: emote.imageType,
    };

    result[emote.code] = emoteData;

    return result;
  },
  {}
);

export const bttvChannelEmoteCodes = Object.keys(bttvChannelLookupTable);

/*
  FrankerFaceZ Global Emotes Fetching
*/
const ffzChannelEmotesResponse = await fetch(
  `https://api.betterttv.net/3/cached/frankerfacez/users/twitch/${userId}`
);

const ffzChannelEmotes = await ffzChannelEmotesResponse.json();

export const ffzChannelLookupTable = ffzChannelEmotes.reduce(
  (result, emote) => {
    const emoteData = {
      id: emote.id,
      type: emote.imageType,
    };

    result[emote.code] = emoteData;

    return result;
  },
  {}
);

export const ffzChannelEmoteCodes = Object.keys(ffzChannelLookupTable);
