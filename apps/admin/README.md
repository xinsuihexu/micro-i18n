# 国际化微前端中后台系统

### 创建子应用步骤
- copy templete模版，更改目录名为子应用名
- 修改package.json属性name --> @admin/子应用名
- 修改vite.config.ts alias别名 --> @admin/子应用名
- 在tsconfig.json文件中paths属性增加 "@admin/子应用名/*": ["apps/admin/子应用名/src/*"]
- 在_share/enums/index.ts文件中给AppCodeType枚举类型增加上该子应用code
- 修改子应用目录下settings.ts 子应用code APP_CODE的值
- 修改.env多个文件对应的环境变量值，如域名，本地端口
- 在_share/settings.ts文件中的APP_URL_MAP增加上子应用url映射
- 更改routes/home.ts demo用例中import()导入的组件路径

### 运行子应用
- 安装 pnpm install -F @admin/子应用名
- 通过微前端(主/子)方式: pnpm run -F @admin/main dev
- 单独运行子应用方式: pnpm run -F @admin/子应用名 dev

### 子应用安装包方式
- 远程包: pnpm add -F @admin/子应用名 包名
- 本地monorepo包: pnpm add -F @admin/子应用名 @pkg/包名

### git命名规范参考
- feat/zx_home_20240606
- fix/zx_home_20240606

### 开发注意事项
- route path需要在enums/route.ts文件内定义对应枚举
- 页面级别的组件需要定义name, defineOptions({ name: 值通过enums/route.ts RouteName获取 })
- css中将物理属性写法用逻辑属性写法替换，颜色值采用变量方式使用，切勿写死颜色值
