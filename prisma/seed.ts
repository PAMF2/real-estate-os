import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const user = await db.user.upsert({
    where: { email: "pedro@reos.dev" },
    update: {},
    create: { email: "pedro@reos.dev", name: "Pedro" },
  });

  const properties = await Promise.all([
    db.property.upsert({
      where: { id: "seed-prop-1" },
      update: {},
      create: {
        id: "seed-prop-1",
        title: "Apartamento Vila Mariana",
        address: "Rua Domingos de Morais, 1234",
        city: "São Paulo",
        state: "SP",
        zip: "04010-100",
        type: "apartment",
        bedrooms: 2,
        area: 78,
        priceCents: 450000_00,
        status: "available",
      },
    }),
    db.property.upsert({
      where: { id: "seed-prop-2" },
      update: {},
      create: {
        id: "seed-prop-2",
        title: "Casa Pinheiros",
        address: "Rua dos Pinheiros, 567",
        city: "São Paulo",
        state: "SP",
        zip: "05422-001",
        type: "house",
        bedrooms: 3,
        area: 120,
        priceCents: 1200000_00,
        status: "available",
      },
    }),
  ]);

  const clients = await Promise.all([
    db.client.upsert({
      where: { email: "maria.silva@example.com" },
      update: {},
      create: { name: "Maria Silva", email: "maria.silva@example.com", phone: "+5511988887777", document: "123.456.789-00" },
    }),
    db.client.upsert({
      where: { email: "joao.santos@example.com" },
      update: {},
      create: { name: "João Santos", email: "joao.santos@example.com", phone: "+5511955554444", document: "987.654.321-00" },
    }),
  ]);

  console.log(`Seeded ${properties.length} properties, ${clients.length} clients, user ${user.email}`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => db.$disconnect());
