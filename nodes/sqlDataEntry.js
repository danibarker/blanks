const getPublishedDate = require("./getPodcasts");
const getSpreadsheetData = require("./readCSV");

const sqlite3 = require("sqlite3").verbose();

const getDb = () => {
  return new sqlite3.Database("./database.db", (err) => {
    if (err) {
      console.error(err.message);
    }
  });
};

const closeDb = (db) => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
};

const getGuestIdByName = async (guestName) => {
  let [firstname, lastname] = guestName.split(" ");
  const db = getDb();
  try {
    return await new Promise((resolve, reject) => {
      db.get(
        `SELECT id FROM guests WHERE firstname = ? AND lastname = ?`,
        [firstname, lastname],
        (err, row) => {
          if (err) {
            reject(err);
          }
          resolve(row);
        }
      );
    });
  } finally {
    closeDb(db);
  }
};

const getHostIdByName = async (hostName) => {
  let names = hostName.split(" ");
  let firstname = names[0];
  let lastname = names.slice(1).join(" ");
  const db = getDb();

  try {
    return await new Promise((resolve, reject) => {
      db.get(
        `SELECT id FROM hosts WHERE firstname = ? AND lastname = ?`,
        [firstname, lastname],
        (err, row) => {
          if (err) {
            reject(err);
          }
          resolve(row);
        }
      );
    });
  } finally {
    closeDb(db);
  }
};
let locationid = 1;
getSpreadsheetData().then((data) => {  
  let podcasts=data.map((podcast)=>{
    return [
      getPublishedDate(podcast['Episode Number']),
      podcast['Date of Recording'],
      podcast['Episode Number'],
      getHostIdByName(podcast['Host']),
      getGuestIdByName(podcast['Guest1']),
      getGuestIdByName(podcast['Guest2']),
      podcast['Show Summary'],
      podcast['Memorable Quotes (please include at least one)'],
      locationid,
    ]
  })
  podcasts.forEach(element => {
    addPodcast(element);
  });
});
function addPodcast(podcast) {
  let db = getDb();
  db.run(
    `INSERT INTO podcasts(
      episodedate,
      dateadded,
      episodenumber,
      hostid,
      guest1id, 
      guest2id, 
      episodesummary,
      memorablequotes,
      locationid
      ) 
      VALUES(?,?,?,?,?,?,?,?,?)`,
    podcast,
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );
}
