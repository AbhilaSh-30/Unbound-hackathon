# Unbound-Hackathon - 22PC01 ABHILASH K

## Additional Features

- Additional Features that I tried implementing/implemented
- Added secure Auth Implementation in backend(jwt,cookie).
- "pool.query(
      "INSERT INTO routing_rules (original_model, regex_pattern, redirect_model) VALUES ($1, $2, $3)",
      [original_model, regex_pattern, redirect_model]
    );"
   use of parametrized queries (prepared statements) preventing SQL injection.
- Users can be of two types : admin and normal.
- Rate limiting has been added(if more than 3 failed attempts has to wait half an hour to try again).
- Input Validation

## Milestone 1

- Using **PostgreSQL**, **Node.js**, and **Express** for backend development.
- **Database Name**: `unbound_hackathon`
- The `database.sql` file contains SQL commands for creating the database and performing operations.
- ![Database Schema](https://github.com/user-attachments/assets/1306b237-776d-4e83-a24e-0eef518d73db)
- **Structured Folder Architecture** for backend implementation:
  - `config/` - Configuration files
  - `models/` - Database models
  - `controllers/` - Business logic
  - `routers/` - API routes
  - `middleware/` - Middleware functions
- Implemented **GET /models** endpoint:
  - **Controller Logic**: Implemented in `controllers/modelController.js`
  - **Route Definition**: Implemented in `routers/modelRouter.js`
- Use **Postman** to test the response.
- ![API Response](https://github.com/user-attachments/assets/e4ef9e61-8e4a-4f9b-8d77-f06075788b90)
- ✅ **Milestone 1 Completed**

## Milestone 2

- Added `providers/` for modular implementation of each provider that generates its unique dummy response string.
    - `providers/anthropicProvider.js` - anthropic
    - `providers/geminiProvider.js` - gemini
    - `providers/openaiProvider.js` - openai
- Implemented **POST /v1/chat/completions** endpoint:
  - **Controller Logic**: Implemented in `controllers/chatController.js`
  - **Route Definition**: Implemented in `routers/chatRouter.js`
- Use **Postman** to test the response.
- ![image](https://github.com/user-attachments/assets/b18867ab-cc9e-463c-9a49-16ad4f8bc9b1)
- ✅ **Milestone 2 Completed**

## Milestone 3

- Added another table called *routing_rules*
- ![image](https://github.com/user-attachments/assets/bd4bcdb7-50a9-4d47-be03-451eaac50592)
- ![image](https://github.com/user-attachments/assets/dda120fb-669e-4cc9-9c28-34506423c6cd)
- Added `middleware/routingPolicy.js` for enforcing routing policy(re routing when a regex pattern matches).
- Calling the routingPolicy from middleware in `controllers/chatController.js` to check for regex pattern.
- Use **Postman** to test the response.
- ![image](https://github.com/user-attachments/assets/6e41088d-eee4-4eb0-af36-d4e179c7c35d)
- ✅ **Milestone 3 Completed**

## Milestone 4

- Create a simple minimal ui for frontend.
- ![image](https://github.com/user-attachments/assets/21679a41-5ca2-491e-824d-31831f5320ee)
- ✅ **Milestone 4 Completed**

## Milestone 5

- Implemented **POST PUT GET DELETE** endpoints:
  - **Controller Logic**: Implemented in `controllers/chatController.js`
  - **Route Definition**: Implemented in `routers/chatRouter.js`
- Use **Postman** to test the response.
- ![image](https://github.com/user-attachments/assets/bbd838d5-911f-4100-9f13-114125d7f909)
- ![image](https://github.com/user-attachments/assets/f5df4e0c-609c-42aa-8c8b-72de6c40aa79)
- ![image](https://github.com/user-attachments/assets/4ae4445f-36a1-4801-9bbd-9187320c0718)
- ![image](https://github.com/user-attachments/assets/8194018b-3408-4b74-b86a-728c97edab75)
- Completed the frontend part
- ![image](https://github.com/user-attachments/assets/fa54e14e-74de-4cc2-b08a-e3f1c6fecc12)
- ✅ **Milestone 5 Completed**
  
## Milestone 6

- Added `middleware/upload.js` for file upload(used multer).
- The uploaded files are stored in `uploads/`.
- Response sends an additional message indicating file processed.
- Use **Postman** to test the response.
- ![image](https://github.com/user-attachments/assets/b129fb76-4292-41d7-ac28-d78673550c79)
- Added the file upload feature.
- ✅ **Milestone 6 Completed**

## Milestone 7

- Updated `middleware/routingPolicy.js` for file erouting policy.
- Updated `controllers/chatController.js` for checking file type for re routing.
- Implemented **POST PUT GET DELETE** endpoints:
  - **Controller Logic**: Implemented in `controllers/fileRoutingController.js`
  - **Route Definition**: Implemented in `routers/fileRoutingRouter.js`
- Use **Postman** to test the response.
- ![image](https://github.com/user-attachments/assets/aa765d41-9e02-4cfc-82ed-02d0c9469014)
- ![image](https://github.com/user-attachments/assets/daf44221-7fcd-4b0a-9e1e-99c7d9be8bf3)
- Completed the frontend.
- ![image](https://github.com/user-attachments/assets/e0dd8e86-988b-493e-b5eb-c4a3857cc9b2)
- ✅ **Milestone 7 Completed** 

-Video
- (https://www.loom.com/share/c0753de5762f438b87ed300a0974a6e3?sid=c13c9d72-4c2b-4681-8700-bf44de19eebe)

---

## Steps to run the server:
  
1. Navigate to the `server` directory:
   ```sh
   cd server
   ```
2. Start the server:
   ```sh
   npm start
   ```
