import puppeteer from "puppeteer";

class Skeleton {
  private options = {
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
  async genHtml(url: string) {
    const page = await this.newPage();
    const response = await page.goto(url, { waitUntil: "networkidle2" });
    if (response && !response.ok()) {
      throw new Error(`${response.status} on ${url}`);
    }
    return "html";
  }
  async destroy() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

export default Skeleton;
