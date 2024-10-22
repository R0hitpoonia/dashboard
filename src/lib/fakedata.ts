import { faker } from "@faker-js/faker";
import { category, Order, Product, User } from "./schema";

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newOrder = (): Order => {
  const name = faker.name.fullName();
  const paymentMethod = faker.helpers.shuffle<Order["paymentMethod"]>([
    "cash",
    "online",
  ])[0]!;
  return {
    id: "HB" + faker.number.int({ min: 1000, max: 9999 }),
    date: faker.date.recent().toISOString(),
    customer: name,
    email: faker.internet.email(),
    phone: faker.phone.number(),
    status: faker.helpers.shuffle<Order["status"]>([
      "Order Placed",
      "Confirmed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ])[0]!,
    lastUpdated: faker.date.recent().toISOString(),
    orderDetails: range(faker.number.int({ min: 1, max: 10 })).map(() => ({
      product: faker.commerce.product(),
      quantity: faker.number.int({ min: 1, max: 10 }),
      price: faker.number.int({ min: 1, max: 1000 }),
    })),
    subtotal: faker.number.int({ min: 1, max: 1000 }),
    shipping: faker.number.int({ min: 1, max: 100 }),
    tax: faker.number.int({ min: 1, max: 100 }),
    total: faker.number.int({ min: 1, max: 1000 }),
    paymentMethod: paymentMethod,
    paymentId:
      paymentMethod === "online" ? faker.finance.creditCardNumber() : undefined,
    shippingAddress: {
      name: name,
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip: faker.address.zipCode(),
    },
  };
};

export function makeOrderData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Order[] => {
    const len = lens[depth]!;
    return range(len).map((_d): Order => {
      return {
        ...newOrder(),
      };
    });
  };

  return makeDataLevel();
}

const orderData = makeOrderData(1000);

export async function fetchOrderData(options: {
  pageIndex: number;
  pageSize: number;
}) {
  // network latency
  await new Promise((r) => setTimeout(r, 500));

  return {
    rows: orderData.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize
    ),
    pageCount: Math.ceil(orderData.length / options.pageSize),
    rowCount: orderData.length,
  };
}

const newProduct = (): Product => {
  return {
    name: faker.commerce.product(),
    desc: faker.lorem.paragraph(),
    categories: faker.commerce.department(),
    subCategories: faker.commerce.productAdjective(),
    status: faker.helpers.shuffle<Product["status"]>([
      "draft",
      "active",
      "deactive",
    ])[0]!,
    stock: faker.number.int({ min: 0, max: 1000 }),
    price: faker.number.int({ min: 1, max: 1000 }),
    totalSales: faker.number.int({ min: 0, max: 1000 }),
    images: faker.image.url(),
    createdAt: faker.date.recent().toISOString(),
    modifiedAt: faker.date.recent().toISOString(),
  };
};

export function makeProductData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Product[] => {
    const len = lens[depth]!;
    return range(len).map((_d): Product => {
      return {
        ...newProduct(),
      };
    });
  };

  return makeDataLevel();
}

const data = makeProductData(1000);

export async function fetchProductData(options: {
  pageIndex: number;
  pageSize: number;
}) {
  // network latency
  await new Promise((r) => setTimeout(r, 500));

  return {
    rows: data.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize
    ),
    pageCount: Math.ceil(data.length / options.pageSize),
    rowCount: data.length,
  };
}

const newCategory = (): category => {
  return {
    name: faker.commerce.department(),
    subCategory: faker.helpers
      .shuffle<string>(["Electronics", "Fashion", "Home", "Beauty", "Toys"])
      .slice(0, faker.number.int({ min: 0, max: 5 })),
  };
};

export function makeCategoryData(...lens: number[]) {
  const makeDataLevel = (depth = 0): category[] => {
    const len = lens[depth]!;
    return range(len).map((_d): category => {
      return {
        ...newCategory(),
      };
    });
  };

  return makeDataLevel();
}

const categoryData = makeCategoryData(1000);

export async function fetchCategoryData(options: {
  pageIndex: number;
  pageSize: number;
}) {
  // network latency
  await new Promise((r) => setTimeout(r, 500));

  return {
    rows: categoryData.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize
    ),
    pageCount: Math.ceil(categoryData.length / options.pageSize),
    rowCount: categoryData.length,
  };
}

export async function fetchUserData(options: {
  pageIndex: number;
  pageSize: number;
}) {
  // network latency
  await new Promise((r) => setTimeout(r, 500));

  const data = makeUserData(1000);

  return {
    rows: data.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize
    ),
    pageCount: Math.ceil(data.length / options.pageSize),
    rowCount: data.length,
  };
}

const newUser = (): User => {
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    profilePhoto: faker.image.avatar(),
    password: faker.internet.password(),
    address: range(faker.number.int({ min: 1, max: 5 })).map(() => ({
      name: faker.person.fullName(),
      address: faker.address.streetAddress(),
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip: faker.address.zipCode(),
    })),
    spent: faker.number.int({ min: 1000, max: 10000 }),
    role: "user",
  };
};

export function makeUserData(...lens: number[]) {
  const makeDataLevel = (depth = 0): User[] => {
    const len = lens[depth]!;
    return range(len).map((_d): User => {
      return {
        ...newUser(),
      };
    });
  };

  return makeDataLevel();
}
