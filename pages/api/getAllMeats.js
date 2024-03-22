import { prisma } from "@utils/prisma";

export default async function handler(req, res) {
  try {
    // is findAll a correct prisma method? findFirst is.
    const allMeats = await prisma.meats.findAll({
      orderBy: {
        createdDate: "desc",
        // this orders them by descending created date - better option coud be alphabetical.
      },
      select: {
        id: true,
      },
    });
    if (!allMeats) {
      return res.status(404).json({ message: "No meats found." });
    }
    return res.status(200).json({ orderId: allMeats.id });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error: 500" });
  }
}
