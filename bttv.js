const bttvGlobalEmotesResponse = await fetch(
  "https://api.betterttv.net/3/cached/emotes/global"
);

const bttvGlobalEmotes = await bttvGlobalEmotesResponse.json();

const bttvGlobalLookupTable = bttvGlobalEmotes.reduce((result, emote) => {
  const emoteData = {
    id: emote.id,
    type: emote.imageType,
  };

  result[emote.code] = emoteData;

  return result;
}, {});

export const bttvGlobalEmoteCodes = Object.keys(bttvGlobalLookupTable);

export default bttvGlobalLookupTable;
