import { faker } from "@faker-js/faker";

interface Product {
  name: string;
  desc: string;
  categories: string;
  subCategories: string;
  status: "draft" | "active" | "deactive";
  stock: number;
  price: number;
  totalSales: number;
  images: string;
  createdAt: string;
  modifiedAt: string;
}

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Product => {
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
        ...newPerson(),
      };
    });
  };

  return makeDataLevel();
}
