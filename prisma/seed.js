const { PrismaClient } = require('@prisma/client');
const { meats } = require('./seedData');
const prisma = new PrismaClient();

const seed = async () => {
  try {
    for (const meatData of meats) {
      const meat = await prisma.meat.create({
        data: meatData,
      });
      console.log(`create meat with id: ${meat.id}`);
    }
  } catch (error) {
    console.error('error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
