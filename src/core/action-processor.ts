// src/core/action-processor.ts
import axios from 'axios'; // Assuming you might use axios for HTTP requests
import { Action } from '../models/action'; // Import the Action model
import { ActionUnion } from '../types';

export class ActionProcessor {
  // Method to process a single action by its ID
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

    // Logic to process the action based on its type
    if (!('type' in action)) {
      throw new Error(`Invalid action: type not found`);
    }
    switch (action.type) {
      case 'httpRequest':
        return await this.executeHttpRequest(action.parameters);
      case 'logMessage':
        return this.logMessage(action.parameters);
      // Add more action types as needed
      default:
        throw new Error(`Unknown action type: ${action}`);
    }
  }

  // Helper method to execute HTTP requests
  private async executeHttpRequest(params: any) {
    const { url, method, headers, body } = params; // Extract parameters
    const response = await axios({
      url,
      method,
      headers,
      data: body,
    });
    return response.data; // Return the response data
  }

  // Helper method to log a message
  private logMessage(params: { message: string }) {
    console.log(params.message);
    return { status: 'success', message: 'Message logged successfully' };
  }

  // Add more methods for different action types as needed
}
