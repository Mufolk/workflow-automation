import express from 'express';
import connectToDatabase from './database'; 
import workflowRoutes from './routes/workflowRoutes';
import actionRoutes from './routes/actionRoutes';
import { errorHandler } from './utils/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

connectToDatabase();

app.use('/api/workflow', workflowRoutes); 
app.use('/api/action', actionRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});