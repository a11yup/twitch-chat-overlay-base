import createMessageElement from "./createMessageElement.js";

function setup() {
  const MAX_MESSAGES_COUNT = 20;

  const queryParameters = new URLSearchParams(window.location.search);
  const CHANNEL_NAME = queryParameters.get("channel");
  const CHAT_STRIP_MODE = queryParameters.has("chatStrip");

  let chatContainerSelectorName;

  if (CHAT_STRIP_MODE) {
    document.querySelector(".chat-box").style.display = "none";
    chatContainerSelectorName = ".chat-strip";
  } else {
    document.querySelector(".chat-strip").style.display = "none";
    chatContainerSelectorName = ".chat-box";
  }

  const client = tmi.Client({
    channels: [CHANNEL_NAME],
  });

  client.connect();

  client.on("message", async (channel, tags, message, self) => {
    const messageElement = await createMessageElement(tags, message);

    const chatBoxElement = document.querySelector(chatContainerSelectorName);
    chatBoxElement.append(messageElement);

    const allMessageElements = document.querySelectorAll(
      `${chatContainerSelectorName} p`
    );

    if (allMessageElements.length > MAX_MESSAGES_COUNT) {
      // remove the first message from the beginning of the list
      allMessageElements[0]?.remove();
    }
  });
}

document.addEventListener("DOMContentLoaded", setup);
