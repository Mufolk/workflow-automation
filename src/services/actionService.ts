// src/services/actionService.ts

import { Action } from '../models/action';

// Function to create a new action
export const createActionService = async (
  workflowId: string,
  type: string,
  parameters: object
) => {
  const newAction = new Action({
    type,
    parameters,
    workflowId,
  });

  await newAction.save(); // Save the action to the database
  return newAction; // Return the created action
};

// Function to retrieve an action by ID
export const getActionByIdService = async (actionId: string) => {
  return await Action.findById(actionId); // Fetch action from the database
};

// Additional CRUD operations can be added here
