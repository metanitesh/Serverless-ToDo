import * as AWS  from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

// const XAWS = AWSXRay.captureAWS(AWS)

import { Todo } from '../models/todo'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

export class TodoAccess {

  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly todoTable = process.env.TODO_TABLE,
    private readonly todoIndex = process.env.INDEX_NAME) {
  }

  async getAllTodos(userId: string): Promise<Todo[]> {

    const result = await this.docClient.query({
      TableName : this.todoTable,
      KeyConditionExpression: 'userId = :userId',
      IndexName: this.todoIndex,
      ExpressionAttributeValues: {
          ':userId': userId
      }
    }).promise()


    const items = result.Items
    return items as Todo[]
  }

  async createTodo(todo: Todo) : Promise<Todo>{
    
    await this.docClient.put({
      TableName: this.todoTable,
      Item: todo
    }).promise()

    return todo;
  }

  async updateTodo(todoId: string, updateTodo: UpdateTodoRequest) : Promise<string>{
    
    const params = {
      TableName: this.todoTable,
      Key: {
          "todoId": todoId
      },
      UpdateExpression: "set #name = :x, dueDate = :y, done = :z",
      ExpressionAttributeNames: {
          "#name": 'name'
      },
      ExpressionAttributeValues: {
          ":x": updateTodo.name,
          ":y": updateTodo.dueDate,
          ":z": updateTodo.done
      }
    };
  
    await this.docClient.update(params).promise();

    return "";
  }


  async deleteTodo(todoId: string) : Promise<string>{
    const params = {
      TableName:this.todoTable,
      Key: {
        "todoId": todoId
      }
    };
  
    await this.docClient.delete(params).promise();

    return "";
  }


}

