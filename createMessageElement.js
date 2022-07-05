import replaceEmotesWithImageTags from "./emotes.js";

const createMessageElement = (tags, message) => {
  const messageHTMLWithEmotesReplaced = replaceEmotesWithImageTags(
    message,
    tags.emotes
  );

  const userNameHTML = `<span style="color: ${tags.color}">${tags["display-name"]}</span>`;

  const messageElement = document.createElement("p");
  messageElement.innerHTML = `${userNameHTML}: ${messageHTMLWithEmotesReplaced}`;

  return messageElement;
};

export default createMessageElement;
