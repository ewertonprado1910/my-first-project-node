import express from "express";
import { v4 as uuidv4 } from "uuid"; 
import cors from "cors";

const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());

const users = [];

const checkUserId = (request, response, next) => {
  const { id } = request.params;
  const index = users.findIndex((user) => user.id === id);

  if (index < 0) {
    return response.status(404).json({ error: "Usuário não encontrado" });
  }

  request.UserIndex = index;
  request.userId = id;

  next();
};

app.get("/users", (request, response) => {
  return response.json(users);
});

app.post("/users", (request, response) => {
  const { name, age } = request.body;

  const user = { id: uuidv4(), name, age }; 

  users.push(user);
  return response.status(201).json(user);
});

app.put("/users/:id", checkUserId, (request, response) => {
  const { name, age } = request.body;
  const index = request.UserIndex;
  const id = request.userId;

  const updateUser = { id, name, age };

  users[index] = updateUser;

  return response.status(201).json(updateUser);
});

app.delete("/users/:id", checkUserId, (request, response) => {
  const index = request.UserIndex;

  users.splice(index, 1);

  return response.status(204).json();
});

app.listen(port, () => {
  console.log(`Online server port ${port}`);
});