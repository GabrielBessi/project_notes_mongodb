const { MongoClient } = require("mongodb");
const url = "mongodb://0.0.0.0:27017/notesDb";

let _db;

const initDatabase = (cb) => {
  MongoClient.connect(url, { useUnifiedTopology: true })
    .then((client) => {
      _db = client;
      cb(null, _db);
    })
    .catch((err) => {
      cb(err);
    });
};

const getDatabase = () => {
  return _db;
};

module.exports = { initDatabase, getDatabase };
