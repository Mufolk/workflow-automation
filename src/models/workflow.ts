// src/models/workflow.ts

import { Schema, model } from 'mongoose';

// Define the Workflow schema
const WorkflowSchema = new Schema({
  name: { type: String, required: true },
  trigger: { type: String, required: true },
  actions: [{ type: Schema.Types.ObjectId, ref: 'Action', required: true }], // Reference to Action model
  lastExecutionState: { type: Object, default: null } // State of the last execution
}, { timestamps: true });

// Create the Workflow model
export const Workflow = model('Workflow', WorkflowSchema);