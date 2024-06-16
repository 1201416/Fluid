import expressLoader from './express';
import dependencyinjector from './dependencyinjector';
import mongooseLoader from './mongoose';
import bootstrap from './bootstrap';
import './events';


export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  console.log('DB loaded and connected!');

  if (process.argv.includes('--bootstrap')) {
    console.log('Running bootstrap...');
    await bootstrap(mongoConnection);
  }

  const userSchema = {
     name: "UserSchema",
     schema: "../persistence/schemas/UserSchema",
    };

  const boardSchema = {
    name: "BoardSchema",
    schema: "../persistence/schemas/BoardSchema",
  };

  const userController = {
    name: "UserController",
    path: "../controllers/userController"
  }

  const boardController = {
    name: "BoardController",
    path: "../controllers/boardController"
  }

  const userRepo = {
    name: "UserRepo",
    path: "../repos/UserRepo"
  }

  const boardRepo = {
    name: "BoardRepo",
    path: "../repos/BoardRepo"
  }

  const userService = {
    name: "UserService",
    path: "../services/userService"
  }

  const boardService = {
    name: "BoardService",
    path: "../services/boardService"
  }

  await dependencyinjector({
    mongoConnection,
    schemas: [
      userSchema,
      boardSchema
    ],
    controllers: [
      userController,
      boardController
    ],
    repos: [
      userRepo,
      boardRepo
    ],
    services: [
      userService,
      boardService
    ]
  });
  console.log('Dependencies injected');

  await expressLoader({ app: expressApp });
  console.log('Express loaded');
};
