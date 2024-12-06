import { Action } from '../models/action'; 
import { ActionUnion } from '../types';
import { AppError } from '../utils/errorHandler';

export class ActionService {
  async createAction(actionData: ActionUnion) {
    try {
      const newAction = new Action(actionData);
      await newAction.save();
      return newAction;
    } catch (error) {
      throw new AppError('Error creating action', 500);
    }
  }

  async updateActionStatus(
    actionId: string,
    newStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED'
  ) {
    const action = await Action.findById(actionId);
    if (action) {
      action.status = newStatus; 
      await action.save(); 
      return action;
    } else {
      throw new AppError('Action not found.', 404);
    }
  }

  async findActionsByWorkflowId(workflowId: string) {
    try {
      return Action.find({ workflowId });
    } catch (error) {
      throw new AppError('Error fetching actions', 500);
    }
  }
}
