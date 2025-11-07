# FunnyQuiz 部署指南

## 阿里云 ECS 部署步骤

### 一、前置准备（在你的阿里云 ECS 上操作）

#### 1. 安装 PM2
```bash
npm install -g pm2
```

#### 2. 配置阿里云安全组规则
登录阿里云控制台 → 进入 ECS 实例 → 安全组 → 配置规则

添加以下入方向规则：
- **端口 80**: HTTP 访问
- **端口 443**: HTTPS 访问（如果需要SSL）

具体步骤：
1. 进入阿里云控制台
2. 找到你的 ECS 实例
3. 点击"安全组"
4. 点击"配置规则"
5. 点击"添加安全组规则"
6. 配置如下：
   - 授权策略：允许
   - 协议类型：TCP
   - 端口范围：80/80 （或 443/443）
   - 授权对象：0.0.0.0/0
   - 描述：HTTP 访问

#### 3. （可选）配置域名
如果你有域名，需要：
1. 在域名服务商处添加 A 记录指向你的 ECS IP
2. 修改 `deploy/nginx.conf` 中的 `server_name` 为你的域名
3. 如果需要 HTTPS，可以使用 Let's Encrypt 免费证书：
```bash
# 安装 certbot
sudo apt install certbot python3-certbot-nginx
# 获取证书
sudo certbot --nginx -d your_domain.com
```

### 二、本地开发测试

#### 1. 安装依赖
```bash
# 前端
cd client
npm install

# 后端
cd ../server
npm install
```

#### 2. 本地运行
```bash
# 在两个终端分别运行

# 终端 1 - 前端
cd client
npm run dev

# 终端 2 - 后端
cd server
npm run dev
```

访问 `http://localhost:5173` 查看效果

### 三、构建项目

#### 1. 构建前端
```bash
cd client
npm run build
```
构建产物在 `client/dist` 目录

#### 2. 构建后端
```bash
cd server
npm run build
```
构建产物在 `server/dist` 目录

### 四、部署到阿里云 ECS

#### 方式 1：使用 Git（推荐）

1. **在本地推送代码到 Git 仓库**
```bash
# 在项目根目录
git init
git add .
git commit -m "Initial commit"
git remote add origin <你的git仓库地址>
git push -u origin main
```

2. **在 ECS 上克隆代码**
```bash
# SSH 登录到你的 ECS
ssh root@你的ECS_IP

# 克隆项目
cd /var/www
git clone <你的git仓库地址> funnyquiz
cd funnyquiz
```

#### 方式 2：使用 SCP 直接上传

```bash
# 在本地项目目录执行
scp -r . root@你的ECS_IP:/var/www/funnyquiz
```

#### 五、在 ECS 上安装依赖并构建

```bash
# SSH 登录到 ECS
ssh root@你的ECS_IP

cd /var/www/funnyquiz

# 安装前端依赖并构建
cd client
npm install
npm run build

# 安装后端依赖并构建
cd ../server
npm install
npm run build

# 创建环境配置文件
cp .env.example .env
# 如果需要修改端口，编辑 .env 文件

# 创建日志目录
cd ..
mkdir -p logs
```

### 六、配置 Nginx

```bash
# 复制配置文件
sudo cp deploy/nginx.conf /etc/nginx/sites-available/funnyquiz

# 修改配置文件中的域名
sudo nano /etc/nginx/sites-available/funnyquiz
# 将 server_name 改为你的域名或 ECS 公网 IP

# 创建软链接
sudo ln -s /etc/nginx/sites-available/funnyquiz /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

### 七、启动应用

```bash
cd /var/www/funnyquiz

# 使用 PM2 启动
pm2 start deploy/ecosystem.config.js

# 查看运行状态
pm2 status

# 查看日志
pm2 logs funnyquiz

# 设置开机自启
pm2 startup
pm2 save
```

### 八、访问应用

- 如果配置了域名：`http://your_domain.com`
- 如果使用 IP：`http://你的ECS_IP`

### 九、常用运维命令

```bash
# 查看应用状态
pm2 status

# 重启应用
pm2 restart funnyquiz

# 停止应用
pm2 stop funnyquiz

# 查看日志
pm2 logs funnyquiz

# 查看实时日志
pm2 logs funnyquiz --lines 50

# 更新代码后重新部署
cd /var/www/funnyquiz
git pull
cd client && npm run build
cd ../server && npm run build
pm2 restart funnyquiz

# 查看数据库数据
cd /var/www/funnyquiz/server/data
sqlite3 stats.db
# 在 SQLite 中执行
# SELECT * FROM daily_stats;
# .exit 退出
```

### 十、查看访问统计

#### 方式 1：直接查询数据库
```bash
cd /var/www/funnyquiz/server/data
sqlite3 stats.db "SELECT * FROM daily_stats ORDER BY date DESC LIMIT 10;"
```

#### 方式 2：通过 API 访问
```bash
# 今日统计
curl http://localhost:3001/api/stats/today

# 最近7天统计
curl http://localhost:3001/api/stats/recent?days=7

# 总访问量
curl http://localhost:3001/api/stats/total
```

### 十一、故障排查

#### 1. 应用无法启动
```bash
# 查看日志
pm2 logs funnyquiz

# 检查端口占用
sudo netstat -tulpn | grep 3001

# 检查进程
ps aux | grep node
```

#### 2. Nginx 502 错误
```bash
# 检查后端是否运行
pm2 status

# 检查 Nginx 配置
sudo nginx -t

# 查看 Nginx 错误日志
sudo tail -f /var/log/nginx/funnyquiz_error.log
```

#### 3. 数据库错误
```bash
# 检查数据库文件权限
ls -la /var/www/funnyquiz/server/data/

# 如果权限不对，修改权限
chmod 755 /var/www/funnyquiz/server/data/
chmod 644 /var/www/funnyquiz/server/data/stats.db
```

### 十二、安全建议

1. **定期备份数据库**
```bash
# 创建备份脚本
mkdir -p /var/backups/funnyquiz
cp /var/www/funnyquiz/server/data/stats.db /var/backups/funnyquiz/stats_$(date +%Y%m%d).db
```

2. **设置防火墙**
```bash
# 使用 ufw
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

3. **配置 HTTPS**（推荐）
参考第一步中的可选项配置 SSL 证书

---

## 项目结构

```
funnyquiz/
├── client/                 # 前端项目
│   ├── src/
│   │   ├── pages/         # 页面组件
│   │   ├── components/    # 通用组件
│   │   ├── data/          # 数据配置
│   │   ├── utils/         # 工具函数
│   │   └── types/         # TypeScript 类型
│   └── dist/              # 构建产物
├── server/                # 后端项目
│   ├── src/
│   │   ├── routes/        # 路由
│   │   └── db/            # 数据库
│   ├── data/              # SQLite 数据库文件
│   └── dist/              # 构建产物
├── deploy/                # 部署配置
│   ├── nginx.conf         # Nginx 配置
│   └── ecosystem.config.js # PM2 配置
└── DEPLOYMENT.md          # 本文档
```

## 联系支持

如果遇到问题，请检查：
1. Node.js 版本是否 >= 18
2. 所有依赖是否正确安装
3. 端口是否被占用
4. 安全组规则是否正确配置

祝部署顺利！
