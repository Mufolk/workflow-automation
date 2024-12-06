import { Request, Response } from 'express';
import { ActionController } from '../../src/controllers/actionController';
import { ActionService } from '../../src/services/actionService';
import { ActionUnion, HttpRequestAction } from '../../src/types';
import { Types } from 'mongoose';

jest.mock('../../src/services/actionService');

describe('ActionController', () => {
  let actionController: ActionController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let actionService: jest.Mocked<ActionService>;

  // Create reusable ObjectId instances for tests
  const mockWorkflowId = new Types.ObjectId();
  const mockActionId = new Types.ObjectId();

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

  // Base action mock generator function
  const createBaseHttpRequestAction = (overrides = {}): HttpRequestAction => {
    return {
      _id: mockActionId, // Reusing the mock Action ID
      __v: 0,
      type: 'httpRequest',
      parameters: {
        url: 'http://test.com',
        method: 'GET',
        headers: {},
        body: null,
      },
      status: 'PENDING',
      workflowId: mockWorkflowId, // Reusing the mock Workflow ID
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides,
    };
  };

  describe('createAction', () => {
    it('should create a new action and return it', async () => {
      const actionData: HttpRequestAction = createBaseHttpRequestAction();

      mockRequest.body = actionData;
      actionService.createAction.mockResolvedValue(actionData as any);

      await actionController.createAction(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(actionService.createAction).toHaveBeenCalledWith(actionData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(actionData);
    });

    it('should handle errors when creating an action', async () => {
      const actionData: HttpRequestAction = createBaseHttpRequestAction();

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
      const newStatus = 'COMPLETED';
      const updatedAction: HttpRequestAction = createBaseHttpRequestAction({
        status: newStatus,
      });

      mockRequest.params = { actionId: mockActionId.toString() };
      mockRequest.body = { newStatus };
      actionService.updateActionStatus.mockResolvedValue(updatedAction as any);

      await actionController.updateActionStatus(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(actionService.updateActionStatus).toHaveBeenCalledWith(
        mockActionId.toString(),
        newStatus
      );
      expect(mockResponse.json).toHaveBeenCalledWith(updatedAction);
    });

    it('should handle errors when updating action status', async () => {
      const newStatus = 'COMPLETED';

      mockRequest.params = { actionId: mockActionId.toString() };
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
      const actions: ActionUnion[] = [createBaseHttpRequestAction()];

      mockRequest.params = { workflowId: mockWorkflowId.toString() };
      actionService.findActionsByWorkflowId.mockResolvedValue(actions as any);

      await actionController.findActionsByWorkflowId(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(actionService.findActionsByWorkflowId).toHaveBeenCalledWith(
        mockWorkflowId.toString()
      );
      expect(mockResponse.json).toHaveBeenCalledWith(actions);
    });

    it('should handle errors when fetching actions by workflow Id', async () => {
      mockRequest.params = { workflowId: mockWorkflowId.toString() };
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