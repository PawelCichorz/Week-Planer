import mongoose from 'mongoose';
import config from "../config";

try {
    mongoose.connect(config.database,  { useNewUrlParser: true, useUnifiedTopology: true } as any);
    console.log('Połączono z bazą danych');
} catch (err) {
    console.error('Błąd podczas łączenia z bazą danych:', err);
}