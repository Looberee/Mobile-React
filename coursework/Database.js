import * as SQLite from "expo-sqlite";

const database_name = "Coursework.db";
const database_version = "1.0";
const database_displayname = "Coursework React Database";
const database_size = 200000;

const db = SQLite.openDatabase(
    database_name,
    database_version,
    database_displayname,
    database_size
);

export const initDatabase = async () => {
    db.transaction((tx) => {
        tx.executeSql(
        `CREATE TABLE IF NOT EXISTS hikes_table (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            HikeName TEXT,
            HikeLocation TEXT,
            HikeDate TEXT,
            HikeStatus TEXT,
            HikeLength TEXT,
            HikeLevel TEXT,
            HikeDescription TEXT
        );`,
        [],
        () => console.log("Hike Table has been created successfully."),
        (error) => console.log("Error occurred while creating the table.", error)
        );

        tx.executeSql(
        `CREATE TABLE IF NOT EXISTS observations_table (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ObsName TEXT,
            ObsTime TEXT,
            ObsComment TEXT,
            ObsHikeId TEXT
        );`,
        [],
        () => console.log("Observation Table has been created successfully."),
        (error) => console.log("Error occurred while creating the table.", error)
        );
    });
};

const getHikes = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
        tx.executeSql(
            "SELECT * FROM hikes_table",
            [],
            (_, { rows }) => {
            resolve(rows._array);
            },
            (_, error) => {
            reject(error);
        });
    });
});
};

const getObservations = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
        tx.executeSql(
            "SELECT * FROM observations_table",
            [],
            (_, { rows }) => {
            resolve(rows._array);
            },
            (_, error) => {
            reject(error);
        });
    });
});
};

const deleteHike = (HikeId) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
        tx.executeSql(
        "DELETE FROM hikes_table WHERE id = ?",
        [HikeId],
        () => {
            resolve();
        },
        (_, error) => {
            reject(error);
        });
    });
});
};

const deleteObservation = (ObservationId) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
        tx.executeSql(
        "DELETE FROM observations_table WHERE id = ?",
        [ObservationId],
        () => {
            resolve();
        },
        (_, error) => {
            reject(error);
        });
    });
});
};

const addHike = (hikeName, hikeLocation, hikeDate, hikeStatus, hikeLength, hikeLevel, hikeDescription) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
        tx.executeSql(
        "INSERT INTO hikes_table (HikeName, HikeLocation, HikeDate, HikeStatus, HikeLength, HikeLevel, HikeDescription) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [hikeName,hikeLocation,hikeDate,hikeStatus,hikeLength,hikeLevel,hikeDescription],
        (_, { insertId }) => {
            resolve(insertId);
        },
        (_, error) => {
            reject(error);
        }
        );
    });
    });
};

const addObservation = (obsName, obsTime, obsComment, obsHikeId) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
        tx.executeSql(
        "INSERT INTO observations_table (ObsName, ObsTime, ObsComment, ObsHikeId) VALUES (?, ?, ?, ?)",
        [obsName, obsTime, obsComment, obsHikeId],
        (_, { insertId }) => {
            resolve(insertId);
        },
        (_, error) => {
            reject(error);
        }
        );
    });
    });
};

const updateHike = (id, hikeName, hikeLocation, hikeDate, hikeStatus, hikeLength, hikeLevel, hikeDescription) => {
    new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "UPDATE hikes_table SET HikeName = ?, HikeLocation = ?, HikeDate = ?, HikeStatus = ?, HikeLength = ?,HikeLevel = ?, HikeDescription = ? where id = ?",
                [hikeName, hikeLocation, hikeDate, hikeStatus, hikeLength, hikeLevel, hikeDescription, id],
                () => {resolve();},
                (_, error) => {reject(error);},
            )
        });
    });
}

const updateObservation = (obsName, obsTime, obsComment, obsHikeId, id) => {
    new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "UPDATE observations_table SET ObsName = ?, ObsTime = ?, ObsComment = ?, ObsHikeId = ? where id = ?",
                [obsName, obsTime, obsComment, obsHikeId, id],
                () => {resolve();},
                (_, {error}) => {reject(error);},
            )
        });
    });
}

const Database = {
    initDatabase,
    addHike,
    getHikes,
    deleteHike,
    updateHike,
    addObservation,
    getObservations,
    deleteObservation,
    updateObservation,
};

export default Database;