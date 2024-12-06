// src/types.ts

// Define the ActionData interface
export interface ActionData {
  type: string; // Type of the action (e.g., "httpRequest", "logMessage")
  parameters: object; // Parameters specific to the action type
  status?: 'pending' | 'in-progress' | 'completed' | 'failed'; // Status of the action
  workflowId: string; // Reference to the associated workflow
  createdAt?: Date; // Optional timestamp for when the action was created
  updatedAt?: Date; // Optional timestamp for the last update
}

// Define the WorkflowData interface
export interface WorkflowData {
  name: string; // Name of the workflow
  trigger: string; // Type of trigger (e.g., "time-based", "webhook")
  actions: ActionData[]; // Array of actions associated with the workflow
  lastExecutionState?: object | null; // State of the last execution (optional)
}

// Define specific action types
export interface HttpRequestAction extends ActionData {
  type: 'httpRequest'; // This action type
  parameters: {
    url: string; // URL for the HTTP request
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'; // HTTP method
    headers?: Record<string, string>; // Optional headers
    body?: any; // Optional body for POST/PUT requests
  };
}

// Define a logging action type
export interface LogMessageAction extends ActionData {
  type: 'logMessage'; // This action type
  parameters: {
    message: string; // The message to log
  };
}

// Union type for all possible actions
export type ActionUnion = HttpRequestAction | LogMessageAction;
