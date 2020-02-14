import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS  from 'aws-sdk'
const docClient = new AWS.DynamoDB.DocumentClient()
const todoTable = process.env.TODO_TABLE;
import { createLogger } from '../../utils/logger'
const logger = createLogger('auth')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  console.log("---------------------------------", todoId)
  logger.info('Deleting to do for the todoId :', todoId);
  
  var params = {
    TableName:todoTable,
    Key: {
      "todoId": todoId
    }
  };

  await docClient.delete(params).promise();

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ""
  }
}
