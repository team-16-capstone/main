import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  try {
    //Manually created users
    const userData = [
      { name: 'julie', email: 'julie@team16.com', password: 'password123' },
      {
        name: 'juan pablo',
        email: 'juanpablo@team16.com',
        password: 'password1234',
      },
      {
        name: 'vanessa',
        email: 'vanessa@team16.com',
        password: 'password1235',
      },
    ];
    const newUsers = await prisma.user.createMany({
      data: userData,
    });
    console.log('All users created successfully:', newUsers);

    //Meat Products manual
    const meatsData = [
      { name: 'Ribeye steak', description: 'Richly marbled and flavorful' },
      { name: 'Filet mignon', description: 'Tender and buttery.' },
      { name: 'New York strip steak', description: 'Well-marbled and juicy.' },
      { name: 'Lamb chops', description: 'Tender with a distinct flavor.' },
      {
        name: 'Pork loin chops',
        description: 'Tender and flavorful pork cuts.',
      },
      {
        name: 'Beef brisket',
        description: 'Flavorful and ideal for slow cooking.',
      },
      { name: 'Pork shoulder', description: 'Versatile and flavorful cut.' },
      {
        name: 'Flank steak',
        description: 'Lean and flavorful, perfect for grilling.',
      },
      { name: 'Chicken breasts', description: 'Lean and versatile.' },
      {
        name: 'Ground beef',
        description: 'Versatile minced beef for various dishes.',
      },
    ];

    const newMeats = await prisma.meat.createMany({
      data: meatsData,
    });

    console.log('All meats created successfully:', newMeats);

    // Butcher Location manual
    const butchersData = [
      {
        name: 'Esposito Meat Market',
        street: '500 9th Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10018',
        phonenumber: '+1(212)279-3298',
        image_url:
          'https://lh3.googleusercontent.com/p/AF1QipPnj3XYxvcMJ2OvGnpJ4RBQRL_7jK5ezNy71AVX=s680-w680-h510',
        map_url:
          'https://www.google.com/maps/d/thumbnail?mid=1erNnjDpSRwrkGfqb7rzit1KFSpU&hl=en'
      },
      {
        name: 'Big Apple Meat Market',
        street: '577 9th Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10036',
        phonenumber: '+12125632555',
        image_url: '',
      },
      {
        name: 'Piccinini Bros',
        street: '633 9th Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10036',
        phonenumber: '+12122468277',
        image_url: '',
      },
      {
        name: 'Dickson Farmstand Meats',
        street: '75 9th Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10010',
        phonenumber: '+12122422630',
      },
      {
        name: 'Sonny 10th Ave Meat Market',
        street: '758 10th Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10019',
        phonenumber: '+12127572276',
        image_url: '',
      },
      {
        name: 'Ceriello Fine Foods',
        street: '89 E 42nd St',
        city: 'New York',
        state: 'NY',
        zipcode: '10017',
        phonenumber: '+12129724266',
      },
      {
        name: 'L. Simchick, & Co.',
        street: '988 1st Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10022',
        phonenumber: '+12128882299',
        image_url: '',
      },
      {
        name: 'East Village Meat Market',
        street: '139 2nd Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10003',
        phonenumber: '+12122285590',
      },
      {
        name: 'Pino Prime Meat Market',
        street: '149 Sullivan St',
        city: 'New York',
        state: 'NY',
        zipcode: '10012',
        phonenumber: '+12124758134',
        image_url: '',
      },
      {
        name: 'Luis Meat Market',
        street: '88 Essex St',
        city: 'New York',
        state: 'NY',
        zipcode: '10002',
        phonenumber: '+12125632555',
        image_url: '',
      },
    ];

    const newButchers = await prisma.butcher.createMany({
      data: butchersData,
    });
    console.log('All butchers created successfully:', newButchers);
  } catch (error) {
    console.error('error:', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
