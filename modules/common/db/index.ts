import { IStatement, Migrations, sql } from 'expo-sqlite-orm';

export const databaseName = 'fitnessFlow';

// TODO: add seed data
export const statements: IStatement = {
  '1662689376195_create_exercises': sql`
        CREATE TABLE exercises (
          id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          bodyPart TEXT NOT NULL,
          name TEXT NOT NULL,
          unit TEXT NOT NULL,
          isDeleted BOOLEAN NOT NULL DEFAULT false
        );`,
  '1662689376196_create_routines': sql`
        CREATE TABLE routines (
          id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          position INTEGER NOT NULL,
          isDeleted BOOLEAN NOT NULL DEFAULT false
        );`,
  '1662689376197_create_routine_exercises': sql`
        CREATE TABLE routineExercises (
          id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          routineId INTEGER NOT NULL,
          exerciseId INTEGER NOT NULL,
          position INTEGER NOT NULL,
          isDeleted BOOLEAN NOT NULL DEFAULT false,
          FOREIGN KEY (routineId) REFERENCES routines (id),
          FOREIGN KEY (exerciseId) REFERENCES exercises (id)
        );`,
  '1662689376198_create_routine_sets': sql`
        CREATE TABLE routineSets (
          id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          routineId INTEGER NOT NULL,
          exerciseId INTEGER NOT NULL,
          setNumber INTEGER NOT NULL,
          repCount INTEGER NOT NULL,
          isDeleted BOOLEAN NOT NULL DEFAULT false,
          FOREIGN KEY (routineId) REFERENCES routines (id),
          FOREIGN KEY (exerciseId) REFERENCES exercises (id)
        );`,
};

export const migrations = new Migrations(databaseName, statements);
