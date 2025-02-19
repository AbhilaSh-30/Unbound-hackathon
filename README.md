# Unbound-Hackathon

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

## Upcoming Milestones
- **Milestone 3:**
