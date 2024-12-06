import express from 'express';
import connectToDatabase from './database'; 
import workflowRoutes from './routes/workflowRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

connectToDatabase();

app.use('/api', workflowRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});