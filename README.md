# Speer-Backend-api

#Framework used: express
Express used due to following reasons:
- Inbuilt asyncHanlders and middlerwares
- Express rate limiter and throtlling packages
- Use of routes 

#Database used: MongoDb
- For scalable api build
- Faster insertion and retrieval 
- MongoDB Atlas provides good indexing features for search

# How Code Works
- 3 Routes - authorization, notes, and search
- 3 Controllers - same as routes
- 2 Models - userModel(to define user schema), noteModel(to define note schema and implement indexing)
- 4 Middlewares - errorHandler(custom error handler), validateToken(validates token, authorization & authentication: jwt token), limiter(rate limiter), and speedLimiter(throtlling)

#For SignUp
- Requiremnets : username, email, password

#For LogIn
- Requirements: email, password

#To Share Note
- pass the noteId of note to be shated as: params id in endpoint, 
- user with whom note is to be shared: pass user's id in body with key (sharedUserId )

# To Run The API
- env file contains following

PORT = 4001
CONNECTION_STRING = mongodb+srv://jaglanabhishek08:admin@speer-backend.ofjy3xn.mongodb.net/Speer-backend-api?retryWrites=true&w=majority
ACCESS_TOKEN_SECRET = 5fa6da6286b8fed687d778a2201f7a80c43154dcca78f759a8fe4b2611ce1773

- copy the aforementioned in new env file and run npm to download node modules

*except for the tests everything runs and has been implemented
*search feature returns all notes matching the keyword, and when no such keyword exists, it returns all notes for the user
