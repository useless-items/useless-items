const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { requireUser } = require('./utils');


router.get('/', requireUser, async (req, res) => {
  try {
    const cart = await prisma.shoppingCartProduct.findMany();
    res.send(cart);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", requireUser, async (req, res) => {
  try {
    const cart = await prisma.shoppingCartProduct.create({
      data: req.body,
    });
    res.send(cart);
  } catch (error) {
    res.send(error);
  }
});

router.put("/:id", requireUser, async (req, res) => {
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

router.delete("/:id", requireUser, async (req, res) => {
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

router.post("/usercart", requireUser, async (req, res) => {
  try {
    const cart = await prisma.shoppingCart.create({
      data: req.body,
    });
    res.send(cart);
  } catch (error) {
    res.send(error);
  }
});

router.get('/usercart/:userId', requireUser, async(req, res) => {
  try {
    const cart = await prisma.shoppingCart.findFirst({
      where: {
        userId: Number(req.params.userId),
        isClosed: false,
      },
      include: {
        shoppingCartProduct: true,
      },
    });
    if (!cart) {
      res.send({error: true, message: "No Items Found"});
    } else {
      res.send(cart);
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;