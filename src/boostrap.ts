import { http } from './server';
   
import './routes/websockts';

http.listen(process.env.PORT, () =>
    console.log(`Server listing on ${process.env.HOST}:${process.env.PORT}`)
)