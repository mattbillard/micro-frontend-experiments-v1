
const db = {};

const get = (username, key) => {
  db[username] = db[username] || {};
  return db[username][key];
}

const set = (username, key, value) => {
  db[username] = db[username] || {};
  db[username][key] = value;
}

module.exports = {
  get,
  set,
};
