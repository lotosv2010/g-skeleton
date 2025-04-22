// import { readFileSync } from "fs";
import { resolve } from "path";
import puppeteer from "puppeteer";
import { sleep } from "./utils";

class Skeleton {
  private options = {
    defer: 5000,
    viewport: {
      width: 640,
      height: 480,
      deviceScaleFactor: 1
    },
  };
  private browser: any;
  constructor(options?: any) {
    this.options = options;
  }

  async initialize() {
    this.browser = await puppeteer.launch({
      headless: false,
    });
  }
  async newPage() {
    const { viewport } = this.options;
    const page = await this.browser.newPage();
    if (viewport) {
      await page.setViewport(viewport);
    }
    return page;
  }
  async makeSkeleton(page: any) {
    // 延迟时间
    const { defer = 3000 } = this.options;
    // 获取脚本
    // const scriptContent = await readFileSync(resolve(__dirname, 'skeletonScript.js'), 'utf-8');
    // 添加脚本
    await page.addScriptTag({
      // content: scriptContent
      path: resolve(__dirname, 'skeletonScript.js'),
      // type: 'module'
    });
    // 延迟执行
    await sleep(defer);
    // 执行脚本
    await page.evaluate((options: any) => {
      (this as any).$Skeleton.genSkeleton(options);
    }, this.options);
  }
  async genHtml(url: string) {
    const page = await this.newPage();
    const response = await page.goto(url, { waitUntil: "networkidle2" });
    if (response && !response.ok()) {
      throw new Error(`${response.status} on ${url}`);
    }
    await this.makeSkeleton(page);
    const { styles, html} = await page.evaluate(() => {
      return (this as any).$Skeleton.genHtmlAndStyle();
    }) || {};
    const result = `
      <style>${styles?.join?.('\n')}</style>
      ${html}
    `;
    return Promise.resolve(result);
  }
  async destroy() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

export default Skeleton;
