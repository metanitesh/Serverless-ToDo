import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import * as  uuid from 'uuid'
import * as AWS  from 'aws-sdk'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils'
const docClient = new AWS.DynamoDB.DocumentClient()
const todoTable = process.env.TODO_TABLE
const bucketName = process.env.IMAGES_S3_BUCKET

import { createLogger } from '../../utils/logger'
const logger = createLogger('auth')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  const parsedBody: CreateTodoRequest = JSON.parse(event.body)
  const userIdHead = getUserId(event);
  logger.info('Adding to do for the userId :', userIdHead);


  const itemId = uuid.v4()
  const date = new Date();
  const dateString = date.toISOString();

  const newItem = {
    todoId: itemId,
    done: false,
    userId: userIdHead,
    createdAt: dateString,
    imageUrl: `https://${bucketName}.s3.amazonaws.com/${itemId}`,
    ...parsedBody
  }

  await docClient.put({
    TableName: todoTable,
    Item: newItem
  }).promise()

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: newItem
    })
  }
}
