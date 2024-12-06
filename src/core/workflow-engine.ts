// src/core/workflow-engine.ts

import { getAllWorkflowsService } from '../services/workflowService';
import { TriggerManager } from './trigger-manager';
import { ActionProcessor } from './action-processor';

export const executeWorkflows = async () => {
  // Step 1: Get workflows from the service
  const workflows = await getAllWorkflowsService();

  // Step 2: Initialize instances of TriggerManager and ActionProcessor
  const triggerManager = new TriggerManager();
  const actionProcessor = new ActionProcessor();

  // Step 3: Iterate over each workflow
  for (const workflow of workflows) {
    try {
      // Step 4: Initialize the trigger for the workflow
      triggerManager.initializeTrigger(workflow);

      // Step 5: Process the actions defined in the workflow
      await actionProcessor.processActions(workflow.actions);

      console.log(`Successfully executed workflow: ${workflow.name}`);
    } catch (error) {
      console.error(`Error executing workflow ${workflow.name}:`, error);
      // Handle error (e.g., log it, update workflow status, etc.)
    }
  }
};
