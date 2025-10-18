import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { email: 'admin@educaia.com', name: 'Admin User' },
      { email: 'tutor@educaia.com', name: 'Tutor User' },
      { email: 'alumno@educaia.com', name: 'Alumno User' }
    ],
    skipDuplicates: true
  });

  await prisma.course.createMany({
    data: [
      { slug: 'intro-a-fundae', title: 'Introducción a FUNDAE', priceCents: 4900 },
      { slug: 'compliance-psd2', title: 'Compliance PSD2', priceCents: 9900 }
    ],
    skipDuplicates: true
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
