import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { config } from '../config/config';

const dynamoDb = new DocumentClient({ region: config.dynamoDBRegion });
const MESSAGES_TABLE = process.env.MESSAGES_TABLE || 'Messages';

export interface Message {
  id: string;
  text: string;
  segments: string[];
}

export const createMessage = async (message: Message): Promise<void> => {
  const params = {
    TableName: MESSAGES_TABLE,
    Item: message,
  };
  await // The `.promise()` call might be on an JS SDK v2 client API.
  // If yes, please remove .promise(). If not, remove this comment.
  dynamoDb.put(params).promise();
};

export const getMessages = async (): Promise<Message[]> => {
  const params = {
    TableName: MESSAGES_TABLE,
  };
  const result = await // The `.promise()` call might be on an JS SDK v2 client API.
  // If yes, please remove .promise(). If not, remove this comment.
  dynamoDb.scan(params).promise();
  return result.Items as Message[];
};

export const updateMessage = async (id: string, text: string): Promise<void> => {
  const params = {
    TableName: MESSAGES_TABLE,
    Key: { id },
    UpdateExpression: 'set text = :text',
    ExpressionAttributeValues: {
      ':text': text,
    },
  };
  await // The `.promise()` call might be on an JS SDK v2 client API.
  // If yes, please remove .promise(). If not, remove this comment.
  dynamoDb.update(params).promise();
};

export const deleteMessage = async (id: string): Promise<void> => {
  const params = {
    TableName: MESSAGES_TABLE,
    Key: { id },
  };
  await // The `.promise()` call might be on an JS SDK v2 client API.
  // If yes, please remove .promise(). If not, remove this comment.
  dynamoDb.delete(params).promise();
};