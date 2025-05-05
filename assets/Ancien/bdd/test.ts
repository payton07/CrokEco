import * as SQLite from "expo-sqlite";

export type Test = {
  idApp: number;
  value: string;
  intValue: number;
};

export function test_init() {
  const db = SQLite.openDatabaseSync("databaseName");
  // `execAsync()` is useful for bulk queries when you want to execute altogether.
  // Note that `execAsync()` does not escape parameters and may lead to SQL injection.
  //NOTE: create
  db.execSync(`
        PRAGMA journal_mode = WAL;
        DROP TABLE IF EXISTS test;
        CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, idApp INTEGER NOT NULL, value TEXT NOT NULL, intValue INTEGER);
    `);
  return;
}

export function test_create(test: Test) {
  const db = SQLite.openDatabaseSync("databaseName");
  const res = db.getFirstSync(`
        SELECT * FROM test WHERE idApp LIKE '${test.idApp}';
    `);
  if (res === null) {
    db.runSync(`
          INSERT INTO test (idApp, value, intValue) VALUES (${test.idApp}, '${test.value}', ${test.intValue});
      `);
  }
}

export async function test_read() {
  const db = SQLite.openDatabaseSync("databaseName");
  const testOut: Promise<Test[] | null> = db.getAllAsync(`
        SELECT * FROM test;
    `);
  return await testOut;
}

export function test_update(value: Test["value"], idApp: Test["idApp"]) {
  const db = SQLite.openDatabaseSync("databaseName");
  db.runSync(
    `
    UPDATE test SET value = ? WHERE idApp = ?
  `,
    value,
    idApp,
  );
}

export function test_delete(test: Test) {
  const db = SQLite.openDatabaseSync("databaseName");
  db.runSync(
    `
    DELETE FROM test WHERE idApp = ?
 `,
    test.idApp,
  );
}
