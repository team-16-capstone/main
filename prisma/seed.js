import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  try {
    await prisma.meatButcher.deleteMany({});
    await prisma.butcher.deleteMany({});
    await prisma.meat.deleteMany({});
  } catch (error) {
    console.error('Error: ', error);
  }

  {
    try {
      // Seed the Meat and Butcher tables first
      const newMeats = await prisma.meat.createMany({
        data: [
          { name: 'Ribeye steak', description: 'Richly marbled and flavorful' },
          { name: 'Filet mignon', description: 'Tender and buttery.' },
          {
            name: 'New York strip steak',
            description: 'Well-marbled and juicy.',
          },
          { name: 'Lamb chops', description: 'Tender with a distinct flavor.' },
          {
            name: 'Pork loin chops',
            description: 'Tender and flavorful pork cuts.',
          },
          {
            name: 'Beef brisket',
            description: 'Flavorful and ideal for slow cooking.',
          },
          {
            name: 'Pork shoulder',
            description: 'Versatile and flavorful cut.',
          },
          {
            name: 'Flank steak',
            description: 'Lean and flavorful, perfect for grilling.',
          },
          { name: 'Chicken breasts', description: 'Lean and versatile.' },
          {
            name: 'Ground beef',
            description: 'Versatile minced beef for various dishes.',
          },
        ],
      });

      const newButchers = await prisma.butcher.createMany({
        data: [
          {
            name: 'Esposito Meat Market',
            street: '500 9th Ave',
            city: 'New York',
            state: 'NY',
            zipcode: '10018',
            phonenumber: '+1(212)279-3298',
            image_url: 'https://pbs.twimg.com/media/CQe3XUKUsAEKPmA.jpg',
            map_url:
              'https://hips.hearstapps.com/hmg-prod/images/ribeye-steak-horizontal-1675097147.jpg?crop=0.671xw:1.00xh;0.0798xw,0&resize=1200:*',
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
              'https://fastly.4sqi.net/img/general/600x600/45690617_9A_C-P28Kd9Hv7GmWh9PjZkHTdOQ1NWs1aNP-TjpV7M.jpg',
            map_url:
              'https://houseofnasheats.com/wp-content/uploads/2024/01/Filet-Mignon-Recipe-Square-1.jpg',
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
              'https://static01.nyt.com/images/2016/06/23/dining/23COOKING-SOY-GRILLED-STEAK1/23COOKING-SOY-GRILLED-STEAK1-square640.jpg',
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
              'https://bakingamoment.com/wp-content/uploads/2023/07/IMG_2248-lamb-chops.jpg',
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
              'https://heygrillhey.com/wp-content/uploads/2024/03/HGPT-Square.jpg',
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
              'https://s3.amazonaws.com/img.kh-labs.com/ZxW98y6401f88cf35681.85093623',
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
              'https://thewoodenskillet.com/wp-content/uploads/2022/04/pork-shoulder-roast-recipe-1.jpg',
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
              'https://fastly.4sqi.net/img/general/600x600/10675662_LbxECV_pnTJhQQi3oenaedJ3LqMrmyW0-2CCvAvMD0A.jpg',
            map_url:
              'https://www.farmfoodsmarket.com/cdn/shop/products/11769745109_beef_flank_steak.003_SQUARE_89.jpg?v=1644441401&width=480',
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
              'https://static01.nyt.com/images/2015/04/05/nyregion/20150405JOINT-slide-KT7M/20150405JOINT-slide-KT7M-superJumbo.jpg',
            map_url:
              'https://keviniscooking.com/wp-content/uploads/2022/10/How-to-Roast-a-Chicken-square.jpg',
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
              'https://pinchofyum.com/wp-content/uploads/Smash-burgers-Square.jpg',
            lat: '40.718318836507564',
            lng: '-73.98810677337802',
          },
        ],
      });

      console.log(
        'All meats and butchers created successfully:',
        newMeats,
        newButchers
      );

      const createdButchers = await prisma.butcher.findMany();

      const butcherIds = createdButchers.map((butcher) => butcher.id);

      const generateRandomMeats = () => {
        const meats = [];
        const basePrices = [
          10.99, 28.99, 12.49, 11.39, 4.99, 7.0, 8.5, 9.5, 8.99, 5.99,
        ];
        const numberOfMeats = basePrices.length;

        for (let butcherId of butcherIds) {
          for (let j = 0; j < numberOfMeats; j++) {
            const basePrice = basePrices[j];
            const randomPrice = Math.random() * 2 + basePrice;
            const randomDigit = Math.floor(Math.random() * 9) + 1;
            const formattedPrice = `${randomPrice.toFixed(2)}${randomDigit}`;
            const meat = {
              meatId: j + 1,
              butcherId: butcherId,
              price: parseFloat(formattedPrice),
            };
            meats.push(meat);
          }
        }

        return meats;
      };
      const randomMeats = generateRandomMeats();
      console.log(randomMeats);

      const newMeatButchers = await prisma.meatButcher.createMany({
        data: randomMeats,
      });

      console.log('All meatButchers created successfully:', newMeatButchers);
    } catch (error) {
      console.error('error:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
};

main();
