import * as SQLite from 'expo-sqlite';


export type Test = {
        idApp: number;
        value: string;
        intValue: number;
};


export function test_init(){
    const db = SQLite.openDatabaseSync('databaseName');
    // `execAsync()` is useful for bulk queries when you want to execute altogether.
    // Note that `execAsync()` does not escape parameters and may lead to SQL injection.
    //NOTE: create
    db.execSync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, idApp INTEGER NOT NULL, value TEXT NOT NULL, intValue INTEGER);
    `);
    return;
};

export function test_create(test: Test){
    const db = SQLite.openDatabaseSync('databaseName');
    db.execSync(`
        INSERT INTO test (idApp, value, intValue) VALUES (${test.idApp}, '${test.value}', ${test.intValue});
    `);
}

export async function test_read(testIdApp: number){
    const db = await SQLite.openDatabaseAsync('databaseName');
    const testOut: Test | null = await db.getFirstAsync(`
        SELECT * FROM test WHERE idApp = ${testIdApp});
    `);
    return testOut
    //NOTE: peut-être renvoyer une erreur en cas de null
}