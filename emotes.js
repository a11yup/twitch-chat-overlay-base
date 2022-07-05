import bttvGlobalLookupTable, { bttvGlobalEmoteCodes } from "./bttv.js";

const TWITCH_URL_PREFIX = `https://static-cdn.jtvnw.net/emoticons/v2`;
const EMOTE_REGEX_PART_1 = "(?:^|(?<=\\s))";
const EMOTE_REGEX_PART_2 = "(?:(?=\\s)|$)";

const BTTV_URL_PREFIX = "https://cdn.betterttv.net/emote";

/*
  This function takes the Twitch message's `emotes` data to inject
  one `<img>` tag per emote into the message that.

  For example for this emotes object...

  {
    "9080864508308403": "2-4",
    "1010283120381084": "70-72",
  }

  ...this means that characters 2-4 in the message string need
  to be replaced with an `<img>` tag which has an URL to the image
  for the emote with the ID 9080864508308403.
*/
const replaceTwitchStandardEmotes = (message, emotes) => {
  // Twitch didn't recognize any emotes in the message.
  // So we just return the original message.
  if (!emotes) return message;

  let result = message;
  const replacementMap = {};

  for (const [emoteId, occurenceIndices] of Object.entries(emotes)) {
    const [startIndex, endIndex] = occurenceIndices[0].split("-");

    const emoteText = message.slice(Number(startIndex), Number(endIndex) + 1);

    replacementMap[
      emoteText
    ] = `<img src="${TWITCH_URL_PREFIX}/${emoteId}/default/light/2.0" alt="emote" />`;
  }

  for (const [emoteText, replacement] of Object.entries(replacementMap)) {
    const emotePattern = new RegExp(
      `${EMOTE_REGEX_PART_1}${emoteText}${EMOTE_REGEX_PART_2}`,
      "g"
    );

    result = result.replaceAll(emotePattern, replacement);
  }

  return result;
};

/*
  This function scans the message text for occurences of bttv emote codes.

  It uses the global bttv emotes list and for each emote code (e.g. SourPls),
  it replaces that code with an `<img>` tag with the URL to that bttv emote.
*/
const replaceBTTVGlobalEmotes = (message) => {
  // Check if there are any global emote codes found in the message...
  const noGlobalEmoteCodeFound = bttvGlobalEmoteCodes.every(
    (emoteCode) => !message.includes(emoteCode)
  );

  // ... and if not just return the original message
  if (noGlobalEmoteCodeFound) return message;

  // Else do the work...
  let result = message;

  // Go through each code and if you find it replace it respectively.
  bttvGlobalEmoteCodes.forEach((emoteCode) => {
    result = result.replaceAll(emoteCode, (matchedCode) => {
      const emoteId = bttvGlobalLookupTable[matchedCode].id;

      return `<img src="${BTTV_URL_PREFIX}/${emoteId}/2x" alt="${matchedCode} bttv emote"/>`;
    });
  });

  return result;
};

const replaceEmotesWithImageTags = (message, emotes) => {
  let result = message;
  result = replaceTwitchStandardEmotes(result, emotes);
  result = replaceBTTVGlobalEmotes(result);
  return result;
};

export default replaceEmotesWithImageTags;
