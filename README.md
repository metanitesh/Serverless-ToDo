# Serverless TODO

Deployed API points
  GET - https://boe8gta9nd.execute-api.ap-south-1.amazonaws.com/dev/todos
  POST - https://boe8gta9nd.execute-api.ap-south-1.amazonaws.com/dev/todos
  PATCH - https://boe8gta9nd.execute-api.ap-south-1.amazonaws.com/dev/todos/{todoId}
  DELETE - https://boe8gta9nd.execute-api.ap-south-1.amazonaws.com/dev/todos/{todoId}
  POST - https://boe8gta9nd.execute-api.ap-south-1.amazonaws.com/dev/todos/{todoId}/attachment

These points are protected use the following JWT token to test.

eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1rWXpRVGsyUWpsR016TkNORFZEUkVVd05EbEdOa05HUlROQlJEWkdOMEZFTjBVNVFUQTVSZyJ9.eyJpc3MiOiJodHRwczovL25pdGVzaHNoYXJtYS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTMxMDAxMTUxMDAyMTMyNjUxMDMiLCJhdWQiOiJ6RFF5cDVoMmFGTVZCM2loNWlMZHlqZTFGTXFqeGxwZCIsImlhdCI6MTU4MTY0ODk3MiwiZXhwIjoxNTgxNjg0OTcyLCJhdF9oYXNoIjoidzhKdUM3VEY2QkE2TGQycWZtVUJnUSIsIm5vbmNlIjoiQnYzNUtEcm1vb05BdmVoS1NoVjU4Q2o1VkxIRGFWbi0ifQ.vfa5igrVhtPKE-I9oXpVrNyWrSPS98ECNPhF7Fg8kJhtXEgJx8YPU7M5gK4k7LI3TELMmXOStc0LrilaUAH0LJ-P3Z1M1_BJNOkQzKXGtckqPJb_xx--SxR2OZMRVNzS3k6wjkvOSQXhhC8Ls7kQ6D1ecYGQBisCR2wKusbChTWpoWdlR79o1EOFmq9F70UB2tQB9V0f7Vogq-EsATmc_0yZkbd-w93urvAV1lac5Bvaf1nyhwRNTjHIgyZASrH-uZTWz_cStdkJGItZCOGTd97bI7K9LTLislxwAd9l8S3HqWzfNJllY-bs29IyXanenzNqC1-1wn5p0QK6gilOCg

Deployed frontend:


Frontend

cd client
npm install
npm run start
This should start a development server with the React application that will interact with the serverless TODO application.

Backend
You will have to configure AWS credentials for it. Please not that this will create the infrastructure on aws and it will cost the money.

To deploy an application run the following commands:

cd backend
npm install
sls deploy -v


