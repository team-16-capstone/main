const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const main = async () => {
  try {
    const newMeat = await prisma.meat.create({
      data: {
        name: 'Chicken',
        description: 'Organically meat from chickens',
        zipCodes: {
          connect: { code: '10001' },
        },
      },
    });
    console.log('Created meat:', newMeat);

    const meatsInZipCode = await prisma.zipCode.findUnique({
      where: { code: '10001' },
      select: { meats: true },
    });
    console.log('Meats are avail in the zip code 10001:', meatsInZipCode);
  } catch (error) {
    console.error('error:', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
