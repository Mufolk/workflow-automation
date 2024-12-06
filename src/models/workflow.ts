
import { Schema, model } from 'mongoose';


const WorkflowSchema = new Schema({
  name: { type: String, required: true },
  trigger: { type: String, required: true },
  actions: [{ type: Schema.Types.ObjectId, ref: 'Action', required: true }],
  lastExecutionState: { type: Object, default: null } 
}, { timestamps: true });


export const Workflow = model('Workflow', WorkflowSchema);