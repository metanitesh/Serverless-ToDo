import {TodoAccess} from './../data-layer/todo-access'
import {Todo} from './../models/todo'
import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import { getUserId } from '../lambda/utils';
import * as  uuid from 'uuid'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const todoAccess = new TodoAccess();
const bucketName = process.env.IMAGES_S3_BUCKET


export async function getAllTodos(userId: string): Promise<Todo[]>{
  return todoAccess.getAllTodos(userId)
}

export async function createTodo(event: APIGatewayProxyEvent): Promise<Todo>{
  
  const userIdHead = getUserId(event);
  const parsedBody: CreateTodoRequest = JSON.parse(event.body)
  const itemId: string = uuid.v4()
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

  const result = await todoAccess.createTodo(newItem);

  return result;
}

export async function updateTodo(todoId: string, updateTodo: UpdateTodoRequest): Promise<string>{
  return todoAccess.updateTodo(todoId, updateTodo)
}

export async function deleteTodo(todoId: string): Promise<string>{
  return todoAccess.deleteTodo(todoId)
}
