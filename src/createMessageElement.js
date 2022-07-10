import replaceEmotesWithImageTags from "../lib/emotes.js";
import { fetchPronounsForUser } from "../lib/pronouns.js";

const createMessageElement = async (tags, message) => {
  const messageHTMLWithEmotesReplaced = await replaceEmotesWithImageTags(
    message,
    tags.emotes
  );

  const userColor = tags.color || "#b9a3e3";

  let userNameHTML = `<span style="color: ${userColor}">${tags["display-name"]}</span>`;

  const userPronouns = await fetchPronounsForUser(tags.username);
  if (userPronouns) {
    userNameHTML = `<span class="pronouns" style="color: ${userColor}; border: 2px solid ${userColor}" >${userPronouns}</span>${userNameHTML}`;
  }

  console.log(`${tags.username}: ${tags.color}`);

  const messageElement = document.createElement("p");
  messageElement.innerHTML = `${userNameHTML} ${messageHTMLWithEmotesReplaced}`;

  return messageElement;
};

export default createMessageElement;
