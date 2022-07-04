const client = tmi.Client({
  channels: [""],
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  const userName = document.createElement("span");
  userName.append(tags["display-name"]);
  userName.style.color = tags.color;

  const messageElement = document.createElement("p");

  messageElement.append(userName);
  messageElement.append(`: ${message}`);

  const chatBoxElement = document.querySelector(".chat-box");
  chatBoxElement.append(messageElement);
});
