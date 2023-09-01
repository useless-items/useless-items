const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');


const main = async () => {
  const user1 = await prisma.user.create({
    data: {
      firstName: "Josh",
      lastName: "Duschik",
      email: "Jdus@email.com",
      username: "JDus123",
      password: await bcrypt.hash("joshPassword123", 10),
      isAdmin: true,
    },
  })
  const user2 = await prisma.user.create({
    data: {
      firstName: "Jt",
      lastName: "Pricone",
      email: "JTP@email.com",
      username: "JPric123",
      password: await bcrypt.hash("jtPassword123", 10),
      isAdmin: false
    }
  })
  const user3 = await prisma.user.create({
    data: {
      firstName: "Nathan",
      lastName: "Kim",
      email: "Natek@email.com",
      username: "Nkim123",
      password: await bcrypt.hash("NatePassword123", 10),
      isAdmin: true
    }
  })
  const user = await prisma.user.create({
    data: {
      firstName: "Eddie",
      lastName: "Jacobian",
      email: "EdJ@email.com",
      username: "EDJ123",
      password: await bcrypt.hash("eddiePassword123", 10),
      isAdmin: true
    }
  })
  const product1 = await prisma.product.create({
    data: {
      productName: "Inferno Knuckles",
      stock: 50,
      description: "For when you need to punch someone in the dark.",
      productImgUrl: "infernoknucks.jpg",
      productRating: 2,
      pennies: 30000,
      userId: user2.id
    }
  })
  const product2 = await prisma.product.create({
    data: {
      productName: "Dinosaur taco holder",
      stock: 3,
      description: "Need to impress someone special? This is how you do it.",
      productImgUrl: "dinotaco.jpg",
      productRating: 1,
      pennies: 20000,
      userId: user.id
    }
  })
  const product3 = await prisma.product.create({
    data: {
      productName: "Mobile toilet paper",
      stock: 8000,
      description: "For when your nose is runny or you have taco bell, we wont ask.",
      productImgUrl: "mobilepaper.jpg",
      productRating: 3,
      pennies: 40000,
      userId: user1.id
    }
  })
  const product4 = await prisma.product.create({
    data: {
      productName: "Nutty bandit",
      stock: 1,
      description: "Finally found the culprit stealing my peanut butter.",
      productImgUrl: "racoon.jpg",
      productRating: 10,
      pennies: 50000,
      userId: user.id
    }
  })
  const product5 = await prisma.product.create({
    data: {
      productName: "Totally normal bank",
      stock: 500,
      description: "If you need to save some extra change, this is for you.",
      productImgUrl: "weirdbank.jpg",
      productRating: 1,
      pennies: 80000,
      userId: user2.id
    }
  })
  const product6 = await prisma.product.create({
    data: {
      productName: "Yodeling pickle",
      stock: 700,
      description: "Can't afford a pickle rick? This is the next best thing!",
      productImgUrl: "yoedlepickle.jpg",
      productRating: 2,
      pennies: 10000,
      userId: user3.id
    }
  })

  const user1Cart = await prisma.shoppingCart.create({
    data: {
      userId: user1.id,
      isClosed: false,
    }
  });
  
  const user2Cart = await prisma.shoppingCart.create({
    data: {
      userId: user2.id,
      isClosed: false,
    }
  });

  const user1CartProducts = await prisma.shoppingCartProduct.create({
    data:{
      productId: product1.id,
      shoppingCartId: 1,
      quantity: 2,
      pennies: product1.pennies * 2,
    },
  });
  
  const user2CartProducts = await prisma.shoppingCartProduct.createMany({
    data: [
      {
        productId: product2.id,
        shoppingCartId: 2,
        quantity: 1,
        pennies: product2.pennies * 1,
      },
      {
        productId: product3.id,
        shoppingCartId: 2,
        quantity: 3,
        pennies: product3.pennies * 3,
      },
    ]
  });
}

main();