import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import bcrypt from 'bcryptjs';
import { config } from '../config/config';

const dynamoDb = new DocumentClient({ region: config.dynamoDBRegion });
const USERS_TABLE = process.env.USERS_TABLE || 'Users';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  verified: boolean;
  segments: string[];
}

export const createUser = async (user: User): Promise<void> => {
  const params = {
    TableName: USERS_TABLE,
    Item: user,
  };
  console.log('params--------------------------------------', params)
  await dynamoDb.put(params).promise();
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const params = {
    TableName: USERS_TABLE,
    IndexName: 'EmailIndex',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
  };
  const result = await // The `.promise()` call might be on an JS SDK v2 client API.
  // If yes, please remove .promise(). If not, remove this comment.
  dynamoDb.query(params).promise();
  return result.Items ? (result.Items[0] as User) : null;
};

export const updateUserVerification = async (id: string): Promise<void> => {
  const params = {
    TableName: USERS_TABLE,
    Key: { id },
    UpdateExpression: 'set verified = :verified',
    ExpressionAttributeValues: {
      ':verified': true,
    },
  };
  await // The `.promise()` call might be on an JS SDK v2 client API.
  // If yes, please remove .promise(). If not, remove this comment.
  dynamoDb.update(params).promise();
};

export const hashPassword = (password: string): { hash: string, salt: string } => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return { hash, salt };
};

export const verifyPassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};