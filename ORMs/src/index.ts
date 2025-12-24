import 'dotenv/config'
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function createUser() {
  try {
    await prisma.users.create({ 
      data: {
        username: "bik",
        password: "bik123",
        age: 35,
      },
    });
    console.log("User created successfully");
  } catch (e) {
    console.error(e);
  } 
}

async function updateUser() {
  try {
    await prisma.users.update({
      where: {
        id: 1
      },
      data: {
        username: "nikk"
      }
    })
    console.log("User updated successfully");
  } catch (e) {
    console.error(e);
  } 
}

async function deleteUser() {
  try {
    await prisma.users.delete({
      where: {
        id: 3
      }
    })
    console.log("User deleted successfully");
  } catch (e) {
    console.error(e);
  }
}

async function findUser() {
  try {
    const user = await prisma.users.findFirst({
      where: {
        id: 1
      },
      select: {
        username: true,
        id: true,
        todos: true,
      }
    })
    console.log(`User with id-${user?.id} is ${user?.username}`);
    console.log("Todos:", user?.todos);
  } catch (e) {
    console.error(e);
  }
}

// createUser();
// updateUser();
// deleteUser();
findUser();
await prisma.$disconnect();

