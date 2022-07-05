import createMessageElement from "./createMessageElement.js";

const MAX_MESSAGES_COUNT = 20;

const client = tmi.Client({
  channels: ["thelegumeduprix"],
});

client.connect();

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
