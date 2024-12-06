// src/services/workflowService.ts

import { Workflow } from '../models/workflow'; // Import the Workflow model
import { WorkflowData } from '../types'; // Assuming you have defined types for your workflows

export const createWorkflowService = async (workflowData: WorkflowData) => {
  const newWorkflow = new Workflow(workflowData);
  await newWorkflow.save();
  return newWorkflow;
};

export const getAllWorkflowsService = async () => {
  const workflows = await Workflow.find();
  return workflows;
};

// Additional workflow-related services can be added here
