import { Schema, model } from 'mongoose';
import {
  ActionUnion
} from '../types'; 

const actionSchema = new Schema<ActionUnion>(
  {
    type: {
      type: String,
      required: true,
      enum: ['httpRequest', 'logMessage'], 
    },
    parameters: {
      type: Schema.Types.Mixed, 
      required: true,
    },
    status: {
      type: String,
      default: 'PENDING',
      enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED'],
    },
    workflowId: {
      type: Schema.Types.ObjectId, 
      required: true,
      ref: 'Workflow', 
    },
  },
  { timestamps: true } 
);


export const Action = model<ActionUnion>('Action', actionSchema);
