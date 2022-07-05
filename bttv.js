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

const userId = "118820534";

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
