import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userService = {
  authenticate,
};

async function authenticate(username: string, password: string) {
  if (!username && !password) {
    throw new Error('Username and password are required');
  }

  const user = await prisma.user.findUnique({
    where: {
      email: username,
    },
  });

  if (!user || !user.hashed || !checkPassword(password, user.hashed)) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

// Function to check if the provided password matches the hashed password
function checkPassword(password: string, hashedPassword: string) {
  return password === hashedPassword;
}
