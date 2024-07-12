import { Response, Request } from 'express';
import noteActions from '../actions/noteActions';
import mongoose from 'mongoose';
import { NoteM } from '../models/noteM';

interface NoteRequest extends Request {
    user: { userId: string }; // Definicja userId w user
}

describe('getAllNotes', () => {
    it('should return notes for specific userId', async () => {
        // given
        const mockNotes = [
            { _id: '1', title: 'Note 1', body: 'Body of note 1', userId: 'testUserId' },
            { _id: '2', title: 'Note 2', body: 'Body of note 2', userId: 'testUserId' },
        ];

        const reqMock = {
            user: { userId: 'testUserId' }, // userId w user
        } as NoteRequest;

        const resMock = {
            json: jest.fn(),
        } as unknown as Response;

        const noteModelMock = {
            find: jest.fn().mockImplementation((query) => {
                if (query.userId === 'testUserId') {
                    return Promise.resolve(mockNotes);
                } else {
                    return Promise.resolve([]);
                }
            }),
        } as unknown as mongoose.Model<NoteM>;

        // when
        await noteActions(noteModelMock).getAllNotes(reqMock, resMock);

        // then
        expect(noteModelMock.find).toHaveBeenCalledWith({ userId: 'testUserId' });
        expect(resMock.json).toHaveBeenCalledWith(mockNotes);
    });

    it('should not return notes for different userId', async () => {
        // given
        const reqMock = {
            user: { userId: 'otherUserId' }, // userId in user
        } as NoteRequest;

        const resMock = {
            json: jest.fn(),
        } as unknown as Response;

        const noteModelMock = {
            find: jest.fn().mockResolvedValue([]),
        } as unknown as mongoose.Model<NoteM>;

        // when
        await noteActions(noteModelMock).getAllNotes(reqMock, resMock);

        // then
        expect(noteModelMock.find).toHaveBeenCalledWith({ userId: 'otherUserId' });
        expect(resMock.json).toHaveBeenCalledWith([]);
    });
});