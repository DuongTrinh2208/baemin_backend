import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const storeIds = [1, 2, 3, 4, 5]; // Replace with actual store IDs or generate them as well
  const categoryIds = [1, 2, 3, 4, 5]; // Replace with actual category IDs

  const foodData = Array.from({ length: 100000 }).map(() => ({
    description: faker.commerce.productName(),
    cost: parseFloat(faker.commerce.price()), // Random float between 1 and 100
    storeId: faker.helpers.arrayElement(storeIds),
    category_id: faker.helpers.arrayElement(categoryIds),
  }));

  console.log(`Seeding ${foodData.length} records...`);

  for (let i = 0; i < foodData.length; i += 1000) {
    const chunk = foodData.slice(i, i + 1000);
    await prisma.food.createMany({ data: chunk });
    console.log(`Inserted ${i + chunk.length} records`);
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
