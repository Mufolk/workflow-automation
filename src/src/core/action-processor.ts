
import axios from 'axios'; 
import { Action } from '../models/action';
import { ActionUnion } from '../types';

export class ActionProcessor {
  async processAction(action: ActionUnion & { type: string }) {
    if ('actionId' in action.parameters && typeof action.parameters.actionId === 'string') {
      const processingAction = await Action.findById(action.parameters.actionId);
      if (!processingAction) {
        throw new Error(`Action with ID ${action.parameters.actionId} not found`);
      }
    } else {
      throw new Error(
        `Invalid action parameters: actionId not found`
      );
    }

   
    if (!('type' in action)) {
      throw new Error(`Invalid action: type not found`);
    }
    switch (action.type) {
      case 'httpRequest':
        return await this.executeHttpRequest(action.parameters);
      case 'logMessage':
        return this.logMessage(action.parameters);
     
      default:
        throw new Error(`Unknown action type: ${action}`);
    }
  }


  private async executeHttpRequest(params: any) {
    const { url, method, headers, body } = params; 
    const response = await axios({
      url,
      method,
      headers,
      data: body,
    });
    return response.data; 
  }

 
  private logMessage(params: { message: string }) {
    console.log(params.message);
    return { status: 'success', message: 'Message logged successfully' };
  }

}
