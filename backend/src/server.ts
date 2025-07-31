import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import apifyRoutes from './routes/apifyRoutes';



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/apify', apifyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
