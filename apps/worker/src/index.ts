import { Queue, Worker } from 'bullmq';
import { createClient } from 'redis';

const connection = {
  url: process.env.REDIS_URL || 'redis://localhost:6379'
};

export const emailQueue = new Queue('email', { connection });

new Worker(
  'email',
  async (job) => {
    console.log('Sending email', job.data);
  },
  { connection }
);

async function main() {
  await emailQueue.add('welcome', { to: 'alumno@educaia.com' });
  console.log('Worker bootstrapped');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
