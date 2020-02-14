import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS  from 'aws-sdk'
import { getUserId } from '../utils';
import { createLogger } from '../../utils/logger'
const logger = createLogger('auth')

const docClient = new AWS.DynamoDB.DocumentClient()
const todoTable = process.env.TODO_TABLE;
const todoIndex = process.env.INDEX_NAME;

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  const userId = getUserId(event);
  logger.info('Getting todo for the userId: ', userId)

  const result = await docClient.query({
    TableName : todoTable,
    KeyConditionExpression: 'userId = :userId',
    IndexName: todoIndex,
    ExpressionAttributeValues: {
        ':userId': userId
    }
  }).promise()

  logger.info('Fetched Todo for: ', userId, result)
  if (result.Count !== 0) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(result)
    }
  }
  
  logger.error('Could not found todo', result);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(result)
  }

}
