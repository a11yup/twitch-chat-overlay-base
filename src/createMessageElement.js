import replaceEmotesWithImageTags from "../lib/emotes.js";
import { fetchPronounsForUser } from "../lib/pronouns.js";

const createMessageElement = async (tags, message) => {
  const messageHTMLWithEmotesReplaced = await replaceEmotesWithImageTags(
    message,
    tags.emotes
  );

  let userNameHTML = `<span style="color: ${tags.color}">${tags["display-name"]}</span>`;

  const userPronouns = await fetchPronounsForUser(tags.username);
  if (userPronouns) {
    userNameHTML += `<span class="pronouns">${userPronouns}</span>`;
  }

  const messageElement = document.createElement("p");
  messageElement.innerHTML = `${userNameHTML}: ${messageHTMLWithEmotesReplaced}`;

  return messageElement;
};

export default createMessageElement;
