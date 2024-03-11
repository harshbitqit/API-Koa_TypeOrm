import { Server } from 'http';
import app from './app/app';
import databaseConnection from './database/databse.connection';

// Process.env will always be comprised of strings, so we typecast the port to a
// number.
const PORT:number = Number(process.env.PORT) || 3000;

databaseConnection
.then(()=> {
    console.log("Server",PORT)
    app.listen(PORT)
})
.catch(console.error);
