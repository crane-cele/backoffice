import { Request, Response } from 'express';
import { Segment, createSegment, getSegments, updateSegment, deleteSegment, addUserToSegment, removeUserFromSegment } from '../models/Segment';

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const newSegment: Segment = { id: Date.now().toString(), ...req.body };
    await createSegment(newSegment);
    res.status(201).send(newSegment);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const readAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const segments = await getSegments();
    res.status(200).send(segments);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await updateSegment(id, name);
    res.status(200).send({ id, name });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteSegment(id);
    res.status(200).send({ message: 'Segment deleted successfully.' });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    await addUserToSegment(id, userId);
    res.status(200).send({ message: 'User added to segment successfully.' });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const removeUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, userId } = req.params;
    await removeUserFromSegment(id, userId);
    res.status(200).send({ message: 'User removed from segment successfully.' });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};