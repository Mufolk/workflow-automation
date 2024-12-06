
import { Request, Response } from 'express';
import {
  createWorkflowService,
  getAllWorkflowsService,
  updateWorkflowService,
  deleteWorkflowService,
} from '../services/workflowService';

export class WorkflowController {
  public async createWorkflow(req: Request, res: Response) {
    try {
      const newWorkflow = await createWorkflowService(req.body);
      res.status(201).json(newWorkflow);
    } catch (error) {
      res.status(500).json({ message: 'Error creating workflow', error });
    }
  }

  public async getWorkflows(req: Request, res: Response) {
    try {
      const workflows = await getAllWorkflowsService();
      res.status(200).json(workflows);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching workflows', error });
    }
  }

  public async updateWorkflow(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const updatedWorkflow = await updateWorkflowService(id, req.body);
      res.status(200).json(updatedWorkflow);
    } catch (error) {
      res.status(500).json({ message: 'Error updating workflow', error });
    }
  }

  public async deleteWorkflow(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await deleteWorkflowService(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting workflow', error });
    }
  }
}
