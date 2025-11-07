import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import statsRouter from './routes/stats';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务（部署时提供前端构建文件）
app.use(express.static(path.join(__dirname, '../../client/dist')));

// API 路由
app.use('/api/stats', statsRouter);

// 健康检查
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// 前端路由（SPA fallback）
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`⚡️ Server is running at http://localhost:${port}`);
});
