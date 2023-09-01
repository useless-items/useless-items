const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// router.get('/', async (req, res) => {
//   try {
//     const products = await prisma.product.findMany({
//       include: {
//         user: true,
//       },
//     });
//     res.send(products);
//   } catch (error) {
//     res.send(error);
//   }
// });


router.get('/', async (req, res) => {
  try {
    const userId = req.userid; 
    const products = await prisma.product.findMany({
      where: {
        userId: userId, 
      },
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

// router.put("/:id", async (req, res) => {
//   try {
//     const product = await prisma.product.update({
//       where: {
//         id: Number(req.params.id),
//       },
//       data: req.body,
//     });
//     if (!product) {
//       res.send({ error: true, message: "Product Not Found" });
//     } else {
//       res.send(product);
//     }
//   } catch (error) {
//     res.send(error);
//   }
// });


router.put("/:id", async (req, res) => {
  try {
    const userId = req.userid; // Extract user ID from the JWT token
    const productId = Number(req.params.id);
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      res.send({ error: true, message: "Product Not Found" });
    } else if (product.userId !== userId) {
      res.status(403).send({ error: true, message: "Permission Denied" });
    } else {
      const updatedProduct = await prisma.product.update({
        where: {
          id: productId,
        },
        data: req.body,
      });

      res.send(updatedProduct);
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
