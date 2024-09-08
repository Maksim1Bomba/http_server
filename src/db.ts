import pg from 'pg';
const pool = new pg.Pool({
    user: 'test_ts',
    password: 'adm123',
    database: 'test_ts',
    port: 5432
});

async function getUserInfo() {
    const client = await pool.connect();

    const answer = await client.query('SELECT * from test;');

    client.release(true);
    return answer.rows[0];
}

async function setUserInfo() {
    const client = await pool.connect();

    client.release(true);
}

async function addUserDB(name: string, login: string, password: string) {
    const client = await pool.connect();
    await client.query(`insert into users
        (name, login, password) 
            values ('${name}', '${login}', '${password}')`
    )
    client.release(true);
}

export { getUserInfo, addUserDB };
