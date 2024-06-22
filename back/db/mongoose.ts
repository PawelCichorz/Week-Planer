import mongoose from 'mongoose';
import dotenv from 'dotenv'


dotenv.config();

const databaseUrl = process.env.DATABASE!
console.log(process.env.DATABASE)

try {
    mongoose.connect(databaseUrl,  { useNewUrlParser: true, useUnifiedTopology: true } as any);
    console.log('Połączono z bazą danych');
} catch (err) {
    console.error('Błąd podczas łączenia z bazą danych:', err);
}