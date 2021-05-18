import { createConnection } from 'typeorm';
import { resolve } from 'path';

createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [
        resolve(__dirname, '..', 'app', 'models', '*.{js,ts}')
    ],
})
    .then(() => {
        console.log('banco de dados conectado com sucesso!')
    })
    .catch(err => {
        console.log('banco de dados não pôde se conectar!')

        console.log(err);
    })
