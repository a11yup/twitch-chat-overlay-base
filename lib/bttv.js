let userId;
let bttvGlobalLookupTable;
let bttvChannelLookupTable;
let ffzChannelLookupTable;

async function getUserId() {
  if (userId) return userId;

  const queryParameters = new URLSearchParams(window.location.search);
  const channelName = queryParameters.get("channel");

  const userIdResponse = await fetch(
    `https://decapi.me/twitch/id/${channelName}`
  );

  userId = await userIdResponse.text();

  return userId;
}

async function getBttvGlobalLookupTable() {
  if (bttvGlobalLookupTable) return bttvGlobalLookupTable;

  const bttvGlobalEmotesResponse = await fetch(
    "https://api.betterttv.net/3/cached/emotes/global"
  );

  const bttvGlobalEmotes = await bttvGlobalEmotesResponse.json();

  bttvGlobalLookupTable = bttvGlobalEmotes.reduce((result, emote) => {
    const emoteData = {
      id: emote.id,
      type: emote.imageType,
    };

    result[emote.code] = emoteData;

    return result;
  }, {});

  return bttvGlobalLookupTable;
}

async function getBttvChannelLookupTable() {
  if (bttvChannelLookupTable) return bttvChannelLookupTable;

  const userId = await getUserId();

  const bttvChannelEmotesResponse = await fetch(
    `https://api.betterttv.net/3/cached/users/twitch/${userId}`
  );

  const bttvChannelEmotesJSON = await bttvChannelEmotesResponse.json();
  const bttvChannelEmotes = bttvChannelEmotesJSON.channelEmotes.concat(
    bttvChannelEmotesJSON.sharedEmotes
  );

  bttvChannelLookupTable = bttvChannelEmotes.reduce((result, emote) => {
    const emoteData = {
      id: emote.id,
      type: emote.imageType,
    };

    result[emote.code] = emoteData;

    return result;
  }, {});

  return bttvChannelLookupTable;
}

async function getFfzChannelLookupTable() {
  if (ffzChannelLookupTable) return ffzChannelLookupTable;

  const userId = await getUserId();

  const ffzChannelEmotesResponse = await fetch(
    `https://api.betterttv.net/3/cached/frankerfacez/users/twitch/${userId}`
  );

  const ffzChannelEmotes = await ffzChannelEmotesResponse.json();

  ffzChannelLookupTable = ffzChannelEmotes.reduce((result, emote) => {
    const emoteData = {
      id: emote.id,
      type: emote.imageType,
    };

    result[emote.code] = emoteData;

    return result;
  }, {});

  return ffzChannelLookupTable;
}

export default {
  getBttvGlobalLookupTable,
  getBttvChannelLookupTable,
  getFfzChannelLookupTable,
};
