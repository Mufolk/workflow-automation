
// src/controllers/workflowController.ts

import { Request, Response } from 'express';
import { createWorkflowService, getAllWorkflowsService } from '../services/workflowService';

// Create a new workflow
export const createWorkflow = async (req: Request, res: Response) => {
  try {
    const newWorkflow = await createWorkflowService(req.body);
    res.status(201).json(newWorkflow);
  } catch (error) {
    res.status(500).json({ message: 'Error creating workflow', error });
  }
};

// Get all workflows
export const getWorkflows = async (req: Request, res: Response) => {
  try {
    const workflows = await getAllWorkflowsService();
    res.status(200).json(workflows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workflows', error });
  }
};