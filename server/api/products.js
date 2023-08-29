const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        user: true,
      },
    });
    res.send(products);
  } catch (error) {
    res.send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        user: true,
      },
    });
    if (!product) {
      res.send({error: true, message: "Product not found"});
    } else {
      res.send(product);
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await prisma.product.create({
      data: req.body,
    });
    res.send(product);
  } catch (error) {
    res.send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    if (!product) {
      res.send({ error: true, message: "Product Not Found" });
    } else {
      res.send(product);
    }
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await prisma.product.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!product) {
      res.send({ error: true, message: "Product Not Found" });
    } else {
      res.send(product);
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;