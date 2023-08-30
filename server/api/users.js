const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        product: true,
      },
    });
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        product: true,
      },
    });
    if (!user) {
      res.send({error: true, message: "User not found"});
    } else {
      res.send(user);
    }
  } catch (error) {
    res.send(error);
  }
});


router.put("/:id", async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    if (!user) {
      res.send({ error: true, message: "User Not Found" });
    } else {
      res.send(user);
    }
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!user) {
      res.send({ error: true, message: "User Not Found" });
    } else {
      res.send(user);
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;