import { SQLiteDatabase } from "react-native-sqlite-storage";

type SchedulesProps = {};

export const getSchedules = async (db: SQLiteDatabase): Promise<SchedulesProps[]> => {
  try {
    const schedules: SchedulesProps[] = [];
    const results = await db.executeSql("SELECT * FROM ScheduleSholat");
    results?.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        schedules.push(result.rows.item(index));
      }
    });
    return schedules;
  } catch (error) {
    console.error(error);
    throw Error("Failed to get Schedule from database");
  }
};
