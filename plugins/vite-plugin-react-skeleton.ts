import { resolve } from 'path'
import Server from './Server'
import Skeleton from './Skeleton'
import { readFileSync, writeFileSync } from 'fs'

interface IOptions {
  staticDir: string,
  port: number,
  origin: string
  viewport: {
    width: number,
    height: number,
    deviceScaleFactor: number
  }
}

// 创建插件
export default function reactSkeletonPlugin(options: IOptions): any {
  const { staticDir, origin, viewport } = options;

  return {
    name: 'vite-plugin-react-skeleton',
    writeBundle: {
      sequential: true,
			order: 'post',
      async handler (html: string) {
        const modifiedHtml = html;
        // 启动服务器
        const server = new Server(options)
        server.listen()
        // 生成骨架屏
        const skeleton= new Skeleton({
          viewport
        });
        await skeleton.initialize();
        const skeletonHtml = await skeleton.genHtml(origin);
        const originPath = resolve(staticDir, 'index.html');
        const originHtml = await readFileSync(originPath, 'utf-8');
        const finalHtml = originHtml.replace('<!-- G_SKELETON -->', skeletonHtml);
        await writeFileSync(originPath, finalHtml, 'utf-8');
        await skeleton.destroy();
        // 关闭服务器
        server.close()
        return modifiedHtml;
      }
    },
  }
}