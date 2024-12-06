// actionController.test.ts

import { Request, Response } from 'express';
import { ActionController } from '../../src/controllers/actionController';
import { ActionService } from '../../src/services/actionService';

jest.mock('../services/actionService');

describe('ActionController', () => {
  let actionController: ActionController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let actionService: jest.Mocked<ActionService>;

  beforeEach(() => {
    actionController = new ActionController();
    actionService = new ActionService() as jest.Mocked<ActionService>;

    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAction', () => {
    it('should create a new action and return it', async () => {
      const actionData = { id: 1, name: 'Test Action' };
      const newAction = { ...actionData, createdAt: new Date() };

      mockRequest.body = actionData;
      actionService.createAction.mockResolvedValue(newAction);

      await actionController.createAction(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(actionService.createAction).toHaveBeenCalledWith(actionData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(newAction);
    });

    it('should handle errors when creating an action', async () => {
      const actionData = { id: 1, name: 'Test Action' };
      mockRequest.body = actionData;
      actionService.createAction.mockRejectedValue(
        new Error('Creation failed')
      );

      await actionController.createAction(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error Creating Action',
        error: expect.any(Error),
      });
    });
  });

  describe('updateActionStatus', () => {
    it('should update the action status and return the updated action', async () => {
      const actionId = '1';
      const newStatus = 'completed';
      const updatedAction = { id: actionId, status: newStatus };

      mockRequest.params = { actionId };
      mockRequest.body = { newStatus };
      actionService.updateActionStatus.mockResolvedValue(updatedAction);

      await actionController.updateActionStatus(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(actionService.updateActionStatus).toHaveBeenCalledWith(
        actionId,
        newStatus
      );
      expect(mockResponse.json).toHaveBeenCalledWith(updatedAction);
    });

    it('should handle errors when updating action status', async () => {
      const actionId = '1';
      const newStatus = 'completed';

      mockRequest.params = { actionId };
      mockRequest.body = { newStatus };
      actionService.updateActionStatus.mockRejectedValue(
        new Error('Update failed')
      );

      await actionController.updateActionStatus(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error updating actions',
        error: expect.any(Error),
      });
    });
  });

  describe('findActionsByWorkflowId', () => {
    it('should return actions for the given workflowId', async () => {
      const workflowId = '123';
      const actions = [{ id: 1, workflowId, name: 'Test Action' }];

      mockRequest.params = { workflowId };
      actionService.findActionsByWorkflowId.mockResolvedValue(actions);

      await actionController.findActionsByWorkflowId(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(actionService.findActionsByWorkflowId).toHaveBeenCalledWith(
        workflowId
      );
      expect(mockResponse.json).toHaveBeenCalledWith(actions);
    });

    it('should handle errors when fetching actions by workflow Id', async () => {
      const workflowId = '123';
      mockRequest.params = { workflowId };
      actionService.findActionsByWorkflowId.mockRejectedValue(
        new Error('Fetch failed')
      );

      await actionController.findActionsByWorkflowId(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error fetching actions by workflow Id',
        error: expect.any(Error),
      });
    });
  });
});
