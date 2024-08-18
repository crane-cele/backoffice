import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  dynamoDBRegion: process.env.DYNAMO_DB_REGION || 'us-east-1',
};