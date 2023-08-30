const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


router.get('/', async (req, res) => {
  try {
    const cart = await prisma.shoppingCartProduct.findMany();
    res.send(cart);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const cart = await prisma.shoppingCartProduct.create({
      data: req.body,
    });
    res.send(cart);
  } catch (error) {
    res.send(error);
  }
});

router.put("/", async (req, res) => {
  try {
    const cart = await prisma.shoppingCartProduct.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.send(cart);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const cart = await prisma.shoppingCartProduct.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.send(cart);
  } catch (error) {
    res.send(error);
  }
});

router.get('/usercart/:id', async(req, res) => {
  try {
    const cart = await prisma.shoppingCart.findUnique({
      where: {
        isClosed: false,
        userId: Number(req.params.id),
      },
      include: {
        shoppingCartProduct: true,
      },
    });
    res.send(cart);
  } catch (error) {
    res.send(error);
  }
})

module.exports = router;