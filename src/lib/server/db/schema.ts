import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// 사용자 테이블 (Keycloak sub)
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  googleAccessToken: text('google_access_token'),
  googleRefreshToken: text('google_refresh_token'),
  coupleId: text('couple_id'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
});

// 커플 테이블
export const couples = sqliteTable('couples', {
  id: text('id').primaryKey(),
  user1Id: text('user1_id').notNull().references(() => users.id),
  user2Id: text('user2_id').references(() => users.id),
  startDate: text('start_date').notNull(), // YYYY-MM-DD
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
});

// 기념일 테이블
export const anniversaries = sqliteTable('anniversaries', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  coupleId: text('couple_id').notNull().references(() => couples.id),
  title: text('title').notNull(),
  startDate: text('start_date').notNull(),     // YYYY-MM-DD
  endDate: text('end_date'),                    // YYYY-MM-DD (선택)
  repeatType: text('repeat_type'),              // 'monthly' | 'yearly' | 'hundred' | null
  memo: text('memo'),
  googleEventId: text('google_event_id'),       // Google Calendar 이벤트 ID
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
});

// 데이트 룰렛 결과 히스토리
export const rouletteHistory = sqliteTable('roulette_history', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  coupleId: text('couple_id').notNull().references(() => couples.id),
  result: text('result').notNull(),
  date: text('date').notNull(), // YYYY-MM-DD
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
});

// 릴스 보관함
export const reels = sqliteTable('reels', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  coupleId: text('couple_id').notNull().references(() => couples.id),
  uploadedBy: text('uploaded_by').notNull().references(() => users.id),
  url: text('url').notNull(),
  title: text('title'),
  memo: text('memo'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
});

// 소근소근 (채팅)
export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  coupleId: text('couple_id').notNull().references(() => couples.id),
  senderId: text('sender_id').notNull().references(() => users.id),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
});

// 타입 추출
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Couple = typeof couples.$inferSelect;
export type NewCouple = typeof couples.$inferInsert;
export type Anniversary = typeof anniversaries.$inferSelect;
export type NewAnniversary = typeof anniversaries.$inferInsert;
export type RouletteHistory = typeof rouletteHistory.$inferSelect;
export type Reel = typeof reels.$inferSelect;
export type Message = typeof messages.$inferSelect;