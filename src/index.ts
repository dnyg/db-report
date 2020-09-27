import * as dotenv from "dotenv";
dotenv.config();

import { Sequelize } from 'sequelize';
import { ColumnDataRow } from 'ColumnDataRow';

const { DB_USERNAME, DB_PASSWORD, DB_HOSTNAME } = process.env;

const sequelize = new Sequelize('information_schema', DB_USERNAME, DB_PASSWORD, {
  host: DB_HOSTNAME,
  dialect: 'mysql', // Hardcoded mysql for now...
  logging: null // Remove this line, or create a closure to handle logging if you want to see executed queries in the terminal
});

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // We don't use metadata for anything currently....
        const [results, metadata] = await sequelize.query(`
            SELECT *
            FROM COLUMNS
            WHERE TABLE_SCHEMA != 'information_schema'
        `);

        const columns = results.map((col: ColumnDataRow) => ({
            column: col.COLUMN_NAME,
            table: col.TABLE_NAME,
            type: col.DATA_TYPE
        }));

        console.log(`Found ${columns.length} columns in total`);

        const potentialForiegnKeys = results
            .filter(({ COLUMN_NAME }: ColumnDataRow) => COLUMN_NAME.endsWith('_id')) // Only get columns where the name ends with _id
            .map(({ COLUMN_NAME, TABLE_NAME}: ColumnDataRow) => ({column: COLUMN_NAME, table: TABLE_NAME }));

        console.log(`Found ${potentialForiegnKeys.length} potential foreign key foreign key columns`);

        const strOutput = potentialForiegnKeys.map(key => `${key.table}.${key.column}`).join("\n");

        console.log(strOutput);

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

start();