import { Response, Request } from 'express';

import noteActions from '../actions/noteActions';

interface NoteRequest extends Request {
    
    user: { userId: string };
    params: { id: string };
  }
  describe('noteActions', () => {
    let mockNoteModel: any; // Pusty mock modelu, który będziemy używać
  
    beforeEach(() => {
      mockNoteModel = {
        findOne: jest.fn(), // Mockujemy metody modelu, które będziemy używać
        deleteOne: jest.fn(),
      };
    });
  
    it('should delete a note successfully', async () => {
      const mockReq = {
          user: { userId: 'testUserId' },
          params: { id: 'testNoteId' },
      } as NoteRequest;
  
      const mockRes = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
          send: jest.fn(),
      } as unknown as Response;
  
      // Mockowanie deleteOne, aby zwracało odpowiedni wynik
      mockNoteModel.deleteOne.mockResolvedValue({ deletedCount: 1 }); // Dla nowszych wersji Mongoose
      
  
      await noteActions(mockNoteModel).deleteNote(mockReq, mockRes);
  
      expect(mockRes.send).toHaveBeenCalledWith('Note deleted: testNoteId');
  });
  
  it('should handle case where note is not found', async () => {
      // Mockowanie deleteOne, aby zwracało odpowiedni wynik (brak usuniętych dokumentów)
      mockNoteModel.deleteOne.mockResolvedValue({ deletedCount: 0 }); // Dla nowszych wersji Mongoose
      // mockNoteModel.deleteOne.mockResolvedValue({ n: 0 }); // Dla starszych wersji Mongoose
  
      const mockReq = {
          user: { userId: 'testUserId' },
          params: { id: 'testNoteId' },
      } as NoteRequest;
  
      const mockRes = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
          send: jest.fn(),
      } as unknown as Response;
  
      await noteActions(mockNoteModel).deleteNote(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Note not found' });
  })});