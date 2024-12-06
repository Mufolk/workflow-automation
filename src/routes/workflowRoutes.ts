import { Router } from 'express';
import { WorkflowController } from '../controllers/workflowController';

const router = Router();
const workflowController = new WorkflowController();

router.post(
  '/workflows',
  workflowController.createWorkflow.bind(workflowController)
);

router.get(
  '/workflows',
  workflowController.getWorkflows.bind(workflowController)
);

router.put(
  '/workflows/:id',
  workflowController.updateWorkflow.bind(workflowController)
);

router.delete(
  '/workflows/:id',
  workflowController.deleteWorkflow.bind(workflowController)
);

export default router;
