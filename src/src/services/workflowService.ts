import { Workflow } from '../models/workflow';
import { WorkflowData } from '../types';
import { AppError } from '../utils/errorHandler';

export const createWorkflowService = async (workflowData: WorkflowData) => {
  try {
    const newWorkflow = new Workflow(workflowData);
    await newWorkflow.save();
    return newWorkflow;
  } catch (error) {
    throw new AppError('Error creating workflow', 500);
  }
};

export const getAllWorkflowsService = async () => {
  try {
    const workflows = await Workflow.find();
    return workflows;
  } catch (error) {
    throw new AppError('Error fetching workflows', 500);
  }
};


export const updateWorkflowService = async (
  id: string,
  workflowData: WorkflowData
) => {
  const updatedWorkflow = await Workflow.findByIdAndUpdate(id, workflowData, {
    new: true,
  });
  if (!updatedWorkflow) {
    throw new AppError('Workflow not found', 404);
  }
  return updatedWorkflow;
};


export const deleteWorkflowService = async (id: string) => {
  const deletedWorkflow = await Workflow.findByIdAndDelete(id);
  if (!deletedWorkflow) {
    throw new AppError('Workflow not found', 404);
  }
};
