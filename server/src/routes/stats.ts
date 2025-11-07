import { Router, Request, Response } from 'express';
import {
  recordVisit,
  getTodayStats,
  getRecentStats,
  getTotalVisits,
  getStatsByDateRange,
} from '../db/database';

const router = Router();

// 记录访问（前端调用）
router.post('/visit', (req: Request, res: Response) => {
  try {
    recordVisit();
    res.json({ success: true, message: 'Visit recorded' });
  } catch (error) {
    console.error('Error recording visit:', error);
    res.status(500).json({ success: false, message: 'Failed to record visit' });
  }
});

// 获取今日统计
router.get('/today', (req: Request, res: Response) => {
  try {
    const stats = getTodayStats();
    res.json({
      success: true,
      data: stats || { date: new Date().toISOString().split('T')[0], visits: 0 },
    });
  } catch (error) {
    console.error('Error getting today stats:', error);
    res.status(500).json({ success: false, message: 'Failed to get stats' });
  }
});

// 获取最近N天统计（管理后台用）
router.get('/recent', (req: Request, res: Response) => {
  try {
    const days = parseInt(req.query.days as string) || 7;
    const stats = getRecentStats(days);
    const total = getTotalVisits();

    res.json({
      success: true,
      data: {
        stats,
        total,
      },
    });
  } catch (error) {
    console.error('Error getting recent stats:', error);
    res.status(500).json({ success: false, message: 'Failed to get stats' });
  }
});

// 获取指定日期范围的统计（管理后台用）
router.get('/range', (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'startDate and endDate are required',
      });
    }

    const stats = getStatsByDateRange(startDate as string, endDate as string);
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error getting stats by range:', error);
    res.status(500).json({ success: false, message: 'Failed to get stats' });
  }
});

// 获取总访问量
router.get('/total', (req: Request, res: Response) => {
  try {
    const total = getTotalVisits();
    res.json({ success: true, data: { total } });
  } catch (error) {
    console.error('Error getting total visits:', error);
    res.status(500).json({ success: false, message: 'Failed to get total visits' });
  }
});

export default router;
