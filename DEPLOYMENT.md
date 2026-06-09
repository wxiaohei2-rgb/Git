# DaMai Matrix 部署说明

## 推荐方式：Vercel

1. 在 GitHub 新建一个私有仓库，例如 `damai-matrix`。
2. 上传本项目源码，不要上传 `node_modules`、`.next`、日志文件或 `.env.local`。
3. 登录 Vercel，选择 `Import Project`，导入这个 GitHub 仓库。
4. Vercel 会自动识别 Next.js，构建命令保持默认即可。
5. 在 Vercel 项目的 Environment Variables 中添加：
   - `DEMO_PASSCODE=matrix2026`
   - `DEMO_SESSION_TOKEN=替换成一串随机长字符`
6. 点击 Deploy，部署完成后把 Vercel 生成的网址和访问口令发给别人。

## 本地验证

```bash
npm install
npm run build
npm run start
```

本地地址仍然是 `http://localhost:3000` 或你指定的端口，它只适合本机预览。
