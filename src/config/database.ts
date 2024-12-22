import pg from 'pg'


const { Pool } = pg

const connectionString = process.env.CONNECT_DB;


export const pool = new Pool({
    connectionString,
    allowExitOnIdle: true,
})

