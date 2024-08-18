import { Request, Response } from 'express';
import { Message, createMessage, getMessages, updateMessage, deleteMessage } from '../models/Message';

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const newMessage: Message = { id: Date.now().toString(), ...req.body };
    await createMessage(newMessage);
    res.status(201).send(newMessage);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const readAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const messages = await getMessages();
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    await updateMessage(id, text);
    res.status(200).send({ id, text });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteMessage(id);
    res.status(200).send({ message: 'Message deleted successfully.' });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};