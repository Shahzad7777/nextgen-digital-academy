import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data');

if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}

const adminPassword = createHash('sha256').update('admin123').digest('hex');

const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@nextgendigitalacademy.com',
    phone: '+92 300 1234567',
    password: adminPassword,
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

const contacts = [];
const enrollments = [];

writeFileSync(join(DATA_DIR, 'users.json'), JSON.stringify(users, null, 2));
writeFileSync(join(DATA_DIR, 'contacts.json'), JSON.stringify(contacts, null, 2));
writeFileSync(join(DATA_DIR, 'enrollments.json'), JSON.stringify(enrollments, null, 2));

console.log('Database seeded successfully!');
console.log('Admin login: admin@nextgendigitalacademy.com / admin123');
