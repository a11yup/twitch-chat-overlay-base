import createMessageElement from "./createMessageElement.js";

const MAX_MESSAGES_COUNT = 20;

const queryParameters = new URLSearchParams(window.location.search);
const CHANNEL_NAME = queryParameters.get("channel");
const CHAT_STRIP_MODE = queryParameters.has("chatStrip");

const client = tmi.Client({
  channels: [CHANNEL_NAME],
});

client.connect();

if (CHAT_STRIP_MODE) {
  document.querySelector(".chat-box").style.display = "none";

  client.on("message", (channel, tags, message, self) => {
    const messageElement = createMessageElement(tags, message);

    const chatBoxElement = document.querySelector(".chat-strip");
    chatBoxElement.append(messageElement);

    const allMessageElements = document.querySelectorAll(".chat-strip p");

    if (allMessageElements.length > MAX_MESSAGES_COUNT) {
      // remove the first message from the beginning of the list
      allMessageElements[0]?.remove();
    }
  });
} else {
  document.querySelector(".chat-strip").style.display = "none";

  client.on("message", (channel, tags, message, self) => {
    const messageElement = createMessageElement(tags, message);

    const chatBoxElement = document.querySelector(".chat-box");
    chatBoxElement.append(messageElement);

    const allMessageElements = document.querySelectorAll(".chat-box p");

    if (allMessageElements.length > MAX_MESSAGES_COUNT) {
      // remove the first message from the beginning of the list
      allMessageElements[0]?.remove();
    }
  });
}
