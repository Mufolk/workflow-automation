import { Types } from 'mongoose';

export interface TriggerData {
  type: string;
  params: object;
}

export interface ActionData {
  _id?: Types.ObjectId; // Optional, but commonly used in documents
  __v?: number; // Optional, for version key
  type: string;
  parameters: object;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  workflowId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowData {
  name: string;
  trigger: TriggerData;
  actions: ActionData[];
  lastExecutionState?: object | null;
}

export interface HttpRequestAction extends ActionData {
  type: 'httpRequest';
  parameters: {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: any;
  };
}

export interface LogMessageAction extends ActionData {
  type: 'logMessage';
  parameters: {
    message: string;
  };
}

export interface WebhookTrigger extends TriggerData {
  type: 'webhook';
  params: {
    webHookUrl: string;
  };
}

export interface TimerTrigger extends TriggerData {
  type: 'timer';
  params: {
    interval: number;
  };
}

export type ActionUnion = HttpRequestAction | LogMessageAction;
