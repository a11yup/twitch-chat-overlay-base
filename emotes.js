const URL_PREFIX = `https://static-cdn.jtvnw.net/emoticons/v2`;
const EMOTE_REGEX_PART_1 = "(?:^|(?<=\\s))";
const EMOTE_REGEX_PART_2 = "(?:(?=\\s)|$)";

const replaceEmotesWithImageTags = (message, emotes) => {
  let result = message;

  if (emotes) {
    const replacementMap = {};

    for (const [emoteId, occurenceIndices] of Object.entries(emotes)) {
      const [startIndex, endIndex] = occurenceIndices[0].split("-");

      const emoteText = message.slice(Number(startIndex), Number(endIndex) + 1);

      replacementMap[
        emoteText
      ] = `<img src="${URL_PREFIX}/${emoteId}/default/light/2.0" alt="emote" />`;
    }

    for (const [emoteText, replacement] of Object.entries(replacementMap)) {
      const emotePattern = new RegExp(
        `${EMOTE_REGEX_PART_1}${emoteText}${EMOTE_REGEX_PART_2}`,
        "g"
      );

      result = result.replaceAll(emotePattern, replacement);
    }
  }

  return result;
};

export default replaceEmotesWithImageTags;
