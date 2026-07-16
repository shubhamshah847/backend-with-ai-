import { Queue, Worker } from 'bullmq';
import Redis from 'ioredis';
import { sendEmail } from './lib/sendemail.js';

const REDIS_URL = 'redis://localhost:6379';

// 1. Establish the shared Redis connection
const connection = new Redis(REDIS_URL, {
  maxRetriesPerRequest: null,
});

// 2. Define the Queue (Used to add jobs)
//  => const emailQueue = new Queue('emailQueue', { connection });

// 3. Define the Worker (Used to process jobs)
const worker = new Worker(
  'emailQueue',
  async (job) => {
    console.log(`Job started for user: ${job.data.username}`);
    
    // It's good practice to wrap the core logic in case sendEmail fails
    const username = job.data.username;
    await sendEmail(username);
    
    console.log(`Job ${job.id} completed successfully`);
  },
  { connection }
);

// 4. Handle worker events (Optional but highly recommended for debugging)
worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed with error: ${err.message}`);
});

/*

Quick test trigger
queueNewEmail('john_doe');
*/