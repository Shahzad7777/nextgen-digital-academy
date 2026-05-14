import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data');
const CONTACTS_FILE = join(DATA_DIR, 'contacts.json');
const ENROLLMENTS_FILE = join(DATA_DIR, 'enrollments.json');
const USERS_FILE = join(DATA_DIR, 'users.json');

function ensureDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJSON(file) {
  try {
    if (!existsSync(file)) return [];
    return JSON.parse(readFileSync(file, 'utf-8'));
  } catch {
    return [];
  }
}

function writeJSON(file, data) {
  ensureDir();
  writeFileSync(file, JSON.stringify(data, null, 2));
}

export const store = {
  getContacts() { return readJSON(CONTACTS_FILE); },
  addContact(contact) {
    const contacts = this.getContacts();
    contact.id = Date.now().toString();
    contact.createdAt = new Date().toISOString();
    contacts.push(contact);
    writeJSON(CONTACTS_FILE, contacts);
    return contact;
  },

  getEnrollments() { return readJSON(ENROLLMENTS_FILE); },
  addEnrollment(enrollment) {
    const enrollments = this.getEnrollments();
    enrollment.id = Date.now().toString();
    enrollment.status = 'pending';
    enrollment.createdAt = new Date().toISOString();
    enrollments.push(enrollment);
    writeJSON(ENROLLMENTS_FILE, enrollments);
    return enrollment;
  },
  getEnrollmentsByEmail(email) {
    return this.getEnrollments().filter(e => e.email === email);
  },

  getUsers() { return readJSON(USERS_FILE); },
  addUser(user) {
    const users = this.getUsers();
    user.id = Date.now().toString();
    user.role = user.role || 'student';
    user.createdAt = new Date().toISOString();
    users.push(user);
    writeJSON(USERS_FILE, users);
    return user;
  },
  getUserByEmail(email) {
    return this.getUsers().find(u => u.email === email);
  }
};
