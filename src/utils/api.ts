const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * 记录访问
 */
export const recordVisit = async (): Promise<void> => {
  try {
    await fetch(`${API_BASE_URL}/stats/visit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to record visit:', error);
  }
};

/**
 * 获取今日统计
 */
export const getTodayStats = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats/today`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to get today stats:', error);
    return null;
  }
};

/**
 * 获取最近统计（管理后台用）
 */
export const getRecentStats = async (days: number = 7): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats/recent?days=${days}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to get recent stats:', error);
    return null;
  }
};
