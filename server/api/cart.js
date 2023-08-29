const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get all cart items
router.get('/', async (req, res) => {
  try {
    const cart = await prisma.shoppingCartProduct.findMany();
    res.send(cart);
  } catch (error) {
    res.send(error);
  }
});
// post (add to cart)
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
// put (edit item amount ***probably needs to be adjusted when implemented)
router.put("/:id", async (req, res) => {
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
// delete (deletes item)
router.delete("/:id", async (req, res) => {
  try {
    const product = await prisma.product.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.send(product);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;