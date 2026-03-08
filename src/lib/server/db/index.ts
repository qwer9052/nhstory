import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import { resolve } from 'path';

// DB 파일 경로 (프로젝트 루트의 data 폴더)
const dbPath = resolve('data', 'nhstory.db');

// SQLite 연결 (WAL 모드 활성화)
const sqlite = new Database(dbPath);

// WAL 모드 설정 - 동시 읽기 성능 향상
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('busy_timeout = 5000');
sqlite.pragma('synchronous = NORMAL');
sqlite.pragma('cache_size = 1000000000');
sqlite.pragma('foreign_keys = ON');
sqlite.pragma('temp_store = MEMORY');

// Drizzle ORM 인스턴스
export const db = drizzle(sqlite, { schema });

export { sqlite };