import { Task, TaskStatus } from '../../tasks/entities/task.entity';
import dataSource from '../../config/databases.config';
import * as fs from 'fs';
import * as path from 'path';

interface SampleTask {
  title: string;
  description: string;
  status: string;
  aiNote: string | null;
}

interface SeedData {
  tasks: SampleTask[];
}

async function seed() {
    try {
        await dataSource.initialize();
        console.log('📦 Database connected for seeding...');

        const taskRepository = dataSource.getRepository(Task);

        // Clear existing data
        await taskRepository.clear();
        console.log('🗑️  Cleared existing tasks');

        // Read and parse the JSON file
        const seedDataPath = path.join(__dirname, 'sample-tasks.json');
        const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf8')) as SeedData;

        // Insert sample tasks
        for (const taskData of seedData.tasks) {
            const task = taskRepository.create({
                ...taskData,
                status: TaskStatus[taskData.status as keyof typeof TaskStatus]
            });
            await taskRepository.save(task);
        }

        console.log(`✅ Successfully seeded ${seedData.tasks.length} tasks`);
        console.log('🌱 Seeding completed!');

    } catch (error) {
        console.error('❌ Error during seeding:', error);
    } finally {
        await dataSource.destroy();
        process.exit(0);
    }
}

void seed();