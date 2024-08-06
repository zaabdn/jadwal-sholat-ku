import { enablePromise, openDatabase, SQLiteDatabase } from "react-native-sqlite-storage";

enablePromise(true);

export const connectToDatabase = async () => {
  return openDatabase(
    { name: "jadwalSholatKu.db", location: "default" },
    () => {},
    (err) => {
      console.log("err", err);
      throw Error("Could not connect to database");
    },
  );
};

export const createDatabases = async (db: SQLiteDatabase) => {
  const scheduleSholat = `CREATE TABLE IF NOT EXISTS ScheduleSholat (id INTEGER DEFAULT 1, name TEXT, dateTime DATETIME, PRIMARY KEY(id))`;

  try {
    await db.executeSql(scheduleSholat);
  } catch (error) {
    console.log("error", error);
    throw Error("Failed to create tables");
  }
};

export const getDataSchedule = async (db: SQLiteDatabase): Promise<string[]> => {
  try {
    const tableNames: string[] = [];
    const results = await db.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
    );
    results?.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        tableNames.push(result.rows.item(index).name);
      }
    });
    return tableNames;
  } catch (error) {
    console.error(error);
    throw Error("Failed to get table names from database");
  }
};
