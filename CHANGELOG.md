# 项目改动记录

## 2024-12-XX 改动记录

### 功能改动

#### 1. 新闻链接点击行为优化
- **文件**: `src/components/column/card.tsx`
- **改动内容**:
  - 移除了新闻链接的 `target="_blank"` 属性
  - 添加了点击事件处理，点击新闻链接时在当前窗口打开弹窗展示内容
  - 在 `NewsListHot` 和 `NewsListTimeLine` 组件中添加了弹窗状态管理
  - 添加了必要的 React hooks 导入（`useState`, `useRef`, `useEffect`）

#### 2. 新增新闻弹窗组件
- **文件**: `src/components/common/news-modal.tsx` (新建)
- **功能特性**:
  - 使用 `framer-motion` 实现平滑的动画效果
  - 使用 iframe 展示新闻内容
  - 支持 ESC 键关闭弹窗
  - 提供"在新标签页打开"按钮，方便用户选择
  - 响应式设计，适配不同屏幕尺寸
  - 点击遮罩层可关闭弹窗

### 配置改动

#### 3. TypeScript 配置调整
- **文件**: `tsconfig.node.json`
- **改动内容**:
  - 将 `module` 从 `commonjs` 改为 `ESNext`
  - 将 `moduleResolution` 从 `node` 改为 `bundler`
  - 确保与 Vite 项目的 ESM 模块系统兼容

#### 4. 依赖版本更新
- **文件**: `package.json`
- **改动内容**:
  - 更新 `@tanstack/router-plugin` 从 `1.112.7` 到 `1.143.4`
  - 更新 `@tanstack/react-router` 从 `1.112.7` 到 `1.143.4`
  - 更新 `vite-plugin-with-nitro` 从 `0.0.3` 到 `0.0.5`
  - 更新 `h3` 从 `1.15.1` 到 `1.15.4`
  - 添加 `engines` 字段，指定 Node.js 版本要求 `>=18.0.0`

#### 5. 依赖解析配置
- **文件**: `package.json`
- **改动内容**:
  - 在 `resolutions` 中添加了 `h3: "^1.15.4"`
  - 在 `resolutions` 中添加了 `h3-nightly: "npm:h3@^1.15.4"`
  - 解决 `nitro-go` 与 `h3` 版本兼容性问题

#### 6. Vite 配置优化
- **文件**: `vite.config.ts`
- **改动内容**:
  - 移除了 TanStack Router 插件的显式路径配置（`routesDirectory` 和 `generatedRouteTree`）
  - 添加了 `h3` 模块别名，确保 `nitro-go` 使用正确的 `h3` 版本
  - 移除了之前添加的路径别名（因为可能导致问题）

#### 7. Nitro 服务器配置
- **文件**: `nitro.config.ts`
- **改动内容**:
  - 添加了 `devServer` 配置，明确指定开发服务器端口为 `4444`
  - 设置主机为 `localhost`
  - 确保后端服务在正确的端口启动

### 问题修复

#### 8. Windows 平台 ESM 路径问题
- **问题**: 在 Windows 上运行时出现 `ERR_UNSUPPORTED_ESM_URL_SCHEME` 错误
- **解决方案**:
  - 更新了 TanStack Router 插件到最新版本（可能已修复相关问题）
  - 调整了 TypeScript 配置以更好地支持 ESM 模块
  - 添加了依赖版本解析配置

#### 9. Nitro 与 h3 兼容性问题
- **问题**: `nitro-go` 无法从 `h3` 导入 `send` 函数
- **解决方案**:
  - 更新 `h3` 到最新版本 `1.15.4`
  - 更新 `vite-plugin-with-nitro` 到 `0.0.5`
  - 在 `package.json` 的 `resolutions` 中强制使用统一的 `h3` 版本
  - 在 `vite.config.ts` 中添加 `h3` 别名

### 技术细节

#### 新增组件结构
```
src/components/common/news-modal.tsx
├── NewsModal 组件
│   ├── AnimatePresence (动画容器)
│   ├── motion.div (遮罩层)
│   ├── motion.div (弹窗主体)
│   │   ├── 标题栏
│   │   │   ├── 新闻标题
│   │   │   └── 操作按钮（新标签页打开、关闭）
│   │   └── iframe (新闻内容展示)
│   └── 键盘事件处理 (ESC 关闭)
```

#### 修改的组件
- `NewsListHot`: 热门新闻列表组件
  - 添加了弹窗状态管理
  - 修改了链接点击行为
  
- `NewsListTimeLine`: 时间线新闻列表组件
  - 添加了弹窗状态管理
  - 修改了链接点击行为

### 注意事项

1. **后端服务**: 确保 Nitro 服务器在 4444 端口正常运行，如果遇到连接问题，请检查：
   - 开发服务器是否正常启动
   - 端口 4444 是否被占用
   - `nitro.config.ts` 中的 `devServer` 配置是否正确

2. **依赖安装**: 如果遇到依赖问题，建议：
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

3. **浏览器兼容性**: 新闻弹窗使用了 iframe，某些网站可能设置了 X-Frame-Options 阻止在 iframe 中加载，这是正常的安全限制。

### 测试建议

1. 测试新闻链接点击，确认弹窗正常显示
2. 测试 ESC 键关闭功能
3. 测试"在新标签页打开"按钮
4. 测试响应式布局在不同屏幕尺寸下的表现
5. 确认后端 API 请求正常工作（端口 4444）

---

**改动日期**: 2024-12-XX  
**改动人员**: AI Assistant  
**版本**: 0.0.24

