import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  try {
    //Manually created users
    const userData = [
      { name: 'julie', 
        email: 'julie@team16.com', 
        password: 'password123',
      },
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
          'https://www.google.com/maps/d/thumbnail?mid=1erNnjDpSRwrkGfqb7rzit1KFSpU&hl=en',
        lat: '40.75644631753445',
        lng: '-73.99435489999999',
      },
      {
        name: 'Big Apple Meat Market',
        street: '577 9th Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10036',
        phonenumber: '+1(212)563-2555',
        image_url:
          'https://d2sg5tibg946xl.cloudfront.net/eyJidWNrZXQiOiJtZXJjYXRvLWltYWdlcyIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJmaWxsIiwid2lkdGgiOjM5MCwiaGVpZ2h0IjozOTB9fSwia2V5Ijoic3RvcmUtaW1hZ2VzL0w2M25wODdEQk1LUEFaRlRjOTlKbXhYeWRENGFPcXNSMjJXM29HVDIuanBnIn0=',
        map_url:
          'https://www.google.com/maps/d/thumbnail?mid=1erNnjDpSRwrkGfqb7rzit1KFSpU&hl=en',
        lat: '40.75839054564528',
        lng: '-73.9929978266508',
      },
      {
        name: 'Piccinini Bros',
        street: '633 9th Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10036',
        phonenumber: '+1(212)246-8277',
        image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSE4ZmAZj4JA7Nl2rxzT_oHcbFnMxv6WzRxt6hSscuqQ&s',
        map_url:
          'https://www.google.com/maps/d/thumbnail?mid=1erNnjDpSRwrkGfqb7rzit1KFSpU&hl=en',
        lat: '40.760987408985514',
        lng: '-73.9917928613626',
      },
      {
        name: 'Dickson Farmstand Meats',
        street: '75 9th Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10010',
        phonenumber: '+1(212)242-2630',
        image_url:
          'https://myannoyingopinions.files.wordpress.com/2019/10/chelsea-market-dicksons-farmstand-meats.jpg?w=800',
        map_url:
          'https://www.google.com/maps/d/thumbnail?mid=1erNnjDpSRwrkGfqb7rzit1KFSpU&hl=en',
        lat: '40.742655645351114',
        lng: '-74.00615191386095',
      },
      {
        name: 'Sonny 10th Ave Meat Market',
        street: '758 10th Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10019',
        phonenumber: '+1(212)757-2276',
        image_url:
          'https://images-pw.pixieset.com/elementfield/631743402/chicago__sunnyparkphoto_2-3cf7fd92.png',
        map_url:
          'https://www.google.com/maps/d/thumbnail?mid=1erNnjDpSRwrkGfqb7rzit1KFSpU&hl=en',
        lat: '40.7670017699855',
        lng: '-73.98980561641342',
      },
      {
        name: 'Ceriello Fine Foods',
        street: '89 E 42nd St',
        city: 'New York',
        state: 'NY',
        zipcode: '10017',
        phonenumber: '+1(212)972-4266',
        image_url:
          'https://cdn.shopify.com/s/files/1/1035/4561/files/wp_delisection_2048x2048.jpg?v=1527871848',
        map_url:
          'https://www.google.com/maps/d/thumbnail?mid=1erNnjDpSRwrkGfqb7rzit1KFSpU&hl=en',
        lat: '40.752525858741336',
        lng: '-73.97602267522332',
      },
      {
        name: 'L. Simchick, & Co.',
        street: '988 1st Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10022',
        phonenumber: '+1(212)888-2299',
        image_url:
          'https://untappedcities.com/wp-content/uploads/2014/06/simchick-midtown-manhattan-old-school-butcher-shop.jpg',
        map_url:
          'https://www.google.com/maps/d/thumbnail?mid=1erNnjDpSRwrkGfqb7rzit1KFSpU&hl=en',
        lat: '40.7566828300824',
        lng: '-73.96372298133309',
      },
      {
        name: 'East Village Meat Market',
        street: '139 2nd Ave',
        city: 'New York',
        state: 'NY',
        zipcode: '10003',
        phonenumber: '+1(212)228-5590',
        image_url:
          'https://carpecity.com/wp-content/uploads/2022/07/J-Baczynsky-Meat-Market-Exterior-East-Village.jpg',
        map_url:
          'https://www.google.com/maps/d/thumbnail?mid=1erNnjDpSRwrkGfqb7rzit1KFSpU&hl=en',
        lat: '40.72921570855029',
        lng: '-73.98752290036671',
      },
      {
        name: "Pino's Prime Meat Market",
        street: '149 Sullivan St',
        city: 'New York',
        state: 'NY',
        zipcode: '10012',
        phonenumber: '+1(212)475-8134',
        image_url:
          'https://www.thecitycook.com/merchants/pino-prime-meats/_res/id=Picture',
        map_url:
          'https://www.google.com/maps/d/thumbnail?mid=1erNnjDpSRwrkGfqb7rzit1KFSpU&hl=en',
        lat: '40.72737439097817',
        lng: '-74.00160171570738',
      },
      {
        name: 'Luis Meat Market',
        street: '88 Essex St',
        city: 'New York',
        state: 'NY',
        zipcode: '10002',
        phonenumber: '+1(212)563-2555',
        image_url:
          'https://www.shoparc.com/wp-content/uploads/2020/12/131013_SHoP_EssexMrkt_Ewing-9761_jpg.jpg',
        map_url:
          'https://www.google.com/maps/d/thumbnail?mid=1erNnjDpSRwrkGfqb7rzit1KFSpU&hl=en',
        lat: '40.718318836507564',
        lng: '-73.98810677337802',
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
