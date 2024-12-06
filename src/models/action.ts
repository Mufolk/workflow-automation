// src/models/action.ts

import { Schema, model } from 'mongoose';

// Define an interface for Action
export interface IAction {
  type: 'httpRequest' | 'logMessage'; // Specific types of actions
  parameters: HttpRequestParameters | LogMessageParameters; // Parameters specific to the action type
  status?: 'pending' | 'in-progress' | 'completed' | 'failed'; // Optional status
  workflowId: string; // Reference to the associated workflow
  createdAt?: Date; // Timestamp of when the action was created
  updatedAt?: Date; // Timestamp of the last update
}

// Define specific parameter interfaces for actions
export interface HttpRequestParameters {
  url: string; // URL for the HTTP request
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'; // HTTP method
  headers?: Record<string, string>; // Optional headers
  body?: any; // Optional body for POST/PUT requests
}

export interface LogMessageParameters {
  message: string; // The message to log
}

// Define the Action schema
const actionSchema = new Schema<IAction>(
  {
    type: {
      type: String,
      required: true,
      enum: ['httpRequest', 'logMessage'], // Restrict to specific action types
    },
    parameters: {
      type: Schema.Types.Mixed, // Allow for flexible parameters while still validating in your code logic
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'in-progress', 'completed', 'failed'], // Restrict to specific statuses
    },
    workflowId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Create the Action model
export const Action = model<IAction>('Action', actionSchema);
