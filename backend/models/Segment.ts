import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { config } from '../config/config';

const dynamoDb = new DocumentClient({ region: config.dynamoDBRegion });
const SEGMENTS_TABLE = process.env.SEGMENTS_TABLE || 'Segments';

export interface Segment {
  id: string;
  name: string;
  users: string[];
}

export const createSegment = async (segment: Segment): Promise<void> => {
  const params = {
    TableName: SEGMENTS_TABLE,
    Item: segment,
  };
  await // The `.promise()` call might be on an JS SDK v2 client API.
  // If yes, please remove .promise(). If not, remove this comment.
  dynamoDb.put(params).promise();
};

export const getSegments = async (): Promise<Segment[]> => {
  const params = {
    TableName: SEGMENTS_TABLE,
  };
  const result = await // The `.promise()` call might be on an JS SDK v2 client API.
  // If yes, please remove .promise(). If not, remove this comment.
  dynamoDb.scan(params).promise();
  return result.Items as Segment[];
};

export const updateSegment = async (id: string, name: string): Promise<void> => {
  const params = {
    TableName: SEGMENTS_TABLE,
    Key: { id },
    UpdateExpression: 'set name = :name',
    ExpressionAttributeValues: {
      ':name': name,
    },
  };
  await // The `.promise()` call might be on an JS SDK v2 client API.
  // If yes, please remove .promise(). If not, remove this comment.
  dynamoDb.update(params).promise();
};

export const deleteSegment = async (id: string): Promise<void> => {
  const params = {
    TableName: SEGMENTS_TABLE,
    Key: { id },
  };
  await // The `.promise()` call might be on an JS SDK v2 client API.
  // If yes, please remove .promise(). If not, remove this comment.
  dynamoDb.delete(params).promise();
};

export const addUserToSegment = async (segmentId: string, userId: string): Promise<void> => {
  const params = {
    TableName: SEGMENTS_TABLE,
    Key: { id: segmentId },
    UpdateExpression: 'ADD users :userId',
    ExpressionAttributeValues: {
      ':userId': dynamoDb.createSet([userId]),
    },
  };
  await // The `.promise()` call might be on an JS SDK v2 client API.
  // If yes, please remove .promise(). If not, remove this comment.
  dynamoDb.update(params).promise();
};

export const removeUserFromSegment = async (segmentId: string, userId: string): Promise<void> => {
  const params = {
    TableName: SEGMENTS_TABLE,
    Key: { id: segmentId },
    UpdateExpression: 'DELETE users :userId',
    ExpressionAttributeValues: {
      ':userId': dynamoDb.createSet([userId]),
    },
  };
  await // The `.promise()` call might be on an JS SDK v2 client API.
  // If yes, please remove .promise(). If not, remove this comment.
  dynamoDb.update(params).promise();
};