/**
 * 海报图片路径映射配置
 * 将性格类型 ID 映射到对应的海报图片路径
 */

export const POSTER_MAP: Record<string, string> = {
  'I': '/posters/躺平派.png',      // 躺平派 LAID_BACK
  'II': '/posters/保守派.png',     // 保守派 CONSERVATIVE
  'III': '/posters/发泄派.png',    // 发泄派 IMPULSIVE
  'IV': '/posters/激进派.png',     // 激进派 AGGRESSIVE
  'V': '/posters/平衡派.png',      // 平衡派 BALANCED
  'VI': '/posters/游移派.png',     // 游移派 WANDERING
};

/**
 * 获取性格类型对应的海报路径
 * @param personalityType 性格类型 ID ('I', 'II', 'III', 'IV', 'V', 'VI')
 * @returns 海报图片路径
 */
export const getPosterPath = (personalityType: string): string => {
  return POSTER_MAP[personalityType] || '';
};
