import { Router } from 'express';
import {
  createWorkflow,
  getWorkflows,
} from '../controllers/workflowController'; 

const router = Router();

router.post('/workflows', createWorkflow);
router.get('/workflows', getWorkflows);

export default router;
