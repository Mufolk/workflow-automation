import { Router } from 'express';
import { ActionController } from '../controllers/actionController';

const router = Router();
const actionController = new ActionController();

router.post('/actions', actionController.createAction.bind(actionController));
router.put(
  '/actions/:actionId/status',
  actionController.updateActionStatus.bind(actionController)
);
router.get(
  '/workflows/:workflowId/actions',
  actionController.findActionsByWorkflowId.bind(actionController)
);

export default router;
