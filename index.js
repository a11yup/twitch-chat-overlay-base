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
      ] = `<img src="${URL_PREFIX}/${emoteId}/default/dark/2.0" alt="emote" />`;
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

const MAX_MESSAGES_COUNT = 20;

const client = tmi.Client({
  channels: [""],
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  const messageElement = document.createElement("p");

  const userName = `<span style="color: ${tags.color}">${tags["display-name"]}</span>`;

  const messageWithEmotesReplaced = replaceEmotesWithImageTags(
    message,
    tags.emotes
  );

  messageElement.innerHTML = `${userName}: ${messageWithEmotesReplaced}`;

  const chatBoxElement = document.querySelector(".chat-box");
  chatBoxElement.append(messageElement);

  const currentlyExistingMessageElements =
    document.querySelectorAll(".chat-box p");

  if (currentlyExistingMessageElements.length > MAX_MESSAGES_COUNT) {
    // remove the first message from the beginning of the list
    currentlyExistingMessageElements[0]?.remove();
  }
});
