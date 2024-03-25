import prisma from "../../lib/prisma";

// GET /api/meetyourmatch
// right now, the only distinguishing feature
// between butchers and meats is that butchers have zipcodes
// so this will check for a zipcode first

export default async function handler(req, res) {
  const resultButchers = await prisma.post.findMany({
    where: { zipcode: true },
    include: { name: true, zipcode: true },
  });
  res.json(resultButchers);
}
