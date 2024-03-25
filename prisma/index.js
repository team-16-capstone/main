import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
  try {
    //Meat Product
    const newMeat = await prisma.meat.create({
      data: {
        name: 'Chicken',
        description: 'Organically meat from chickens',
      },
    });
    console.log('Created meat:', newMeat);
    // Butcher Location
    const newButcher = await prisma.butcher.create({
      data: {
        name: 'Esposito Meat Market',
        zipcode: '10001',
      },
    });
    console.log('Created Butcher:', newButcher);
  } catch (error) {
    console.error('error:', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
