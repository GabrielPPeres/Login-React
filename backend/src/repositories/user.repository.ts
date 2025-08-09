import prisma from '../config';

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const findUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const createUser = async (data: { email: string; passwordHash: string }) => {
  return await prisma.user.create({
    data,
  });
};