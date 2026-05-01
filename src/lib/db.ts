import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH =
  process.env.DB_PATH || path.join(process.cwd(), "data", "registrations.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");

    db.exec(`
      CREATE TABLE IF NOT EXISTS registrations (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        name          TEXT NOT NULL,
        phone         TEXT NOT NULL,
        phone1        TEXT NOT NULL DEFAULT '010',
        phone2        TEXT NOT NULL,
        phone3        TEXT NOT NULL,
        interest_type TEXT DEFAULT '',
        age           TEXT DEFAULT '',
        city          TEXT DEFAULT '',
        district      TEXT DEFAULT '',
        dong          TEXT DEFAULT '',
        agreed        INTEGER NOT NULL DEFAULT 1,
        created_at    TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
        updated_at    TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
      );

      CREATE INDEX IF NOT EXISTS idx_reg_name ON registrations(name);
      CREATE INDEX IF NOT EXISTS idx_reg_phone ON registrations(phone);
      CREATE INDEX IF NOT EXISTS idx_reg_created ON registrations(created_at);
      CREATE INDEX IF NOT EXISTS idx_reg_interest ON registrations(interest_type);
    `);
  }
  return db;
}
