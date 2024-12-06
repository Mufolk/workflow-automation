
import { Request, Response } from 'express';
import { ActionService } from '../services/actionService'; 
import { ActionUnion } from '../types';

const actionService = new ActionService();

export class ActionController {
  async createAction(req: Request, res: Response) {
    try {
      const actionData: ActionUnion = req.body;
      const newAction = await actionService.createAction(actionData);
      res.status(201).json(newAction);
    } catch (error) {
      res.status(500).json({ message: 'Error Creating Action', error });
    }
  }

  async updateActionStatus(req: Request, res: Response) {
    const { actionId } = req.params; 
    const { newStatus } = req.body;

    try {
      const updatedAction = await actionService.updateActionStatus(
        actionId,
        newStatus
      );
      res.json(updatedAction);
    } catch (error) {
      res.status(404).json({ message: 'Error updating actions', error });
    }
  }

  async findActionsByWorkflowId(req: Request, res: Response) {
    const { workflowId } = req.params;
    try {
      const actions = await actionService.findActionsByWorkflowId(workflowId);
      res.json(actions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching actions by workflow Id', error });
    }
  }
}
