const PRONOUNS_URL_PREFIX = `https://pronouns.alejo.io/api`;

let pronounNames;
let userPronouns = {};

const fetchAllPronounNames = async () => {
  if (pronounNames) return pronounNames;

  const pronounsJSON = await fetch(`${PRONOUNS_URL_PREFIX}/pronouns`);
  pronounNames = await pronounsJSON.json();

  pronounNames = pronounNames.reduce((result, pronoun) => {
    result[pronoun.name] = pronoun.display;
    return result;
  }, {});

  return pronounNames;
};

const fetchPronounsForUser = async (username) => {
  if (!pronounNames) {
    await fetchAllPronounNames();
  }

  const userPronounsJSON = await fetch(
    `${PRONOUNS_URL_PREFIX}/users/${username}`
  );
  const userPronounsData = await userPronounsJSON.json();

  const pronounId = userPronounsData?.[0]?.pronoun_id;

  if (pronounId) {
    userPronouns[username] = pronounNames[pronounId];
  }

  return userPronouns[username];
};

export { fetchPronounsForUser };
