import { http } from './server'
const HOST = process.env.HOST || 'http://locahost'
const PORT = process.env.PORT || 3001
http.listen(PORT, () => console.log(`Server listing on ${HOST}:${PORT}`))
