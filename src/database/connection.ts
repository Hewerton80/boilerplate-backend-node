import { createConnection } from 'typeorm';
import { resolve } from 'path';

createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port:  Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [
        resolve(__dirname, '..', 'app', '**', '*.model.{js,ts}')
    ],
})
    .then(() => {
        console.log('banco de dados conectado com sucesso!')
    })
    .catch(err => {
        console.log('banco de dados não pôde se conectar!')

        console.log(err);
    })

