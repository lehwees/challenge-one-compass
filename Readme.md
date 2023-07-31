
# Rest API Veterina

Proposed by Compass UOL in the Back-end Journey track (Node.js) - AWS Cloud Context the creation of a microservice scenario for the Franchise veterinarian. it will be used by all the clinics they have for internal management of clients and services. With the mission of building the POC bases of this microservice, a REST API was created with all the needs of the client.

Nome: Letícia Machado Lopes
E-mail: leticia.lopes.pb@compasso.com.br 
## Technologies

The Technologies used in this process are: 

- Node.js
- TypeScript
- MongoDB
- Express
- Eslin
- Prettier
- Jest
- VisualStudio Code


## Functionalities and Basic requirements

The Functionalities are the routes that have been created for the costumer to access according to their needs.

the routes are:

- Retrieves all tutors.
- Create a new tutor.
- Updates a tutor.
- Deletes a tutor.
- Creates a pet and adds it to a tutor.
- Updates a pet's info
- Deletes a pet from a tutor


the Basic requirements are:

• Readability
• Private repository
• Small commits
• Commit pattern
• TypeScript
• Express
• Readme.md
• Explanation of how to run locally
• Share the repository's access with the class monitors for evaluation
## Run Project Locally 

To run the local project, follow the step by step.

1. you must have node.js and git on your machine. If not, install them and check if the version is suitable to run the project. To check the version of both node and git just add --version in front. Ex: git --version and node --version.

2. After checking that the version of git and node are matching, access the repository in git and give the command git clone. 
Repository: https://github.com/lehwees/challenge-one-compass.git

3. After cloning the repository, access the vs code terminal and give the command npm install.

4. Rename the .env.example file to .env and add your connection string provided by mongoDB next to the front of MONGO_URL=. After that change <password> by the access password to your database and enter "/?" enter the name of the bank.

5. Use the npm start command in the vscode terminal to start the application.

6. use Insominia for support in applications.

7. Then apply the following routes.

• GET /tutors -> Retrieves all tutors.
• POST/tutors -> Create a new tutor.
• PUT/tutor/:id -> Updates a tutor.
• DELETE/tutor/:id -> Deletes a tutor.
• POST/pet/:tutorId-> Creates a pet and adds it to a tutor.
• PUT/pet/:petId/tutor/:tutorId -> updates a pet's info
• DELETE/pet/:petId/tutor/:tutorId -> deletes a pet from a tutor.
## Reference 

- Udemy
- docs MongoDB
- Stackoverflow
## SMs and instructors

- Alisson Morais
- Yago Felipe Lopes

### Instructors:

- Rafael Menegon
- Jonatan Machado
- Gilberto da Silva Medeiros
- Matheus da Cruz Bernardo Santos
