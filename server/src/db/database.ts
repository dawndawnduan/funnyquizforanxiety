import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '../../data/stats.db');
const db = new Database(dbPath);

// 初始化数据库表
db.exec(`
  CREATE TABLE IF NOT EXISTS daily_stats (
    date TEXT PRIMARY KEY,
    visits INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export interface DailyStats {
  date: string;
  visits: number;
  created_at: string;
  updated_at: string;
}

// 记录访问
export const recordVisit = (): void => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const stmt = db.prepare(`
    INSERT INTO daily_stats (date, visits, updated_at)
    VALUES (?, 1, CURRENT_TIMESTAMP)
    ON CONFLICT(date)
    DO UPDATE SET
      visits = visits + 1,
      updated_at = CURRENT_TIMESTAMP
  `);

  stmt.run(today);
};

// 获取指定日期范围的统计
export const getStatsByDateRange = (startDate: string, endDate: string): DailyStats[] => {
  const stmt = db.prepare(`
    SELECT * FROM daily_stats
    WHERE date BETWEEN ? AND ?
    ORDER BY date DESC
  `);

  return stmt.all(startDate, endDate) as DailyStats[];
};

// 获取今日统计
export const getTodayStats = (): DailyStats | undefined => {
  const today = new Date().toISOString().split('T')[0];
  const stmt = db.prepare('SELECT * FROM daily_stats WHERE date = ?');
  return stmt.get(today) as DailyStats | undefined;
};

// 获取最近N天的统计
export const getRecentStats = (days: number = 7): DailyStats[] => {
  const stmt = db.prepare(`
    SELECT * FROM daily_stats
    ORDER BY date DESC
    LIMIT ?
  `);

  return stmt.all(days) as DailyStats[];
};

// 获取总访问量
export const getTotalVisits = (): number => {
  const stmt = db.prepare('SELECT SUM(visits) as total FROM daily_stats');
  const result = stmt.get() as { total: number | null };
  return result.total || 0;
};

export default db;
