const $$ = document.querySelectorAll.bind(document);
const REMOVE_TAGS = ['script', 'style', 'noscript', 'meta', 'link'];
const SMALLEST_BASE64 = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const CLASS_NAME_PREFIX = 'g-sk-';
const basicOption = {
  color: '#e4e4e4'
}
const styleCache = new Map();
const setAttributes = (ele, attrs) => {
  Object.keys(attrs).forEach(k => ele.setAttribute(k, attrs[k]));
}

const addStyle = (selector, rule) => {
  if (!styleCache.has(selector)) {
    styleCache.set(selector, rule)
  }
}

function imgHandler(ele, options = basicOption) {
  const { width, height } = ele.getBoundingClientRect();
  const attrs = {
    width,
    height,
    src: SMALLEST_BASE64
  };
  setAttributes(ele, attrs);
  const className = CLASS_NAME_PREFIX + 'image';
  const rule = `{ background: ${options.color} !important;}`;
  addStyle(`.${className}`, rule);
  ele.classList.add(className)
}
function buttonHandler(ele, options = basicOption) {
  const classname = CLASS_NAME_PREFIX + 'button'
  const rule = `{
    color: ${options.color} !important;
    background: ${options.color} !important;
    border: none !important;
    box-shadow: none !important;
  }`
  addStyle(`.${classname}`, rule)
  ele.classList.add(classname)
}

function basicHandler(ele, options = basicOption) {
  const classname = CLASS_NAME_PREFIX + 'basic'
  const rule = `{
    color: ${options.color} !important;
    background: ${options.color} !important;
    border: none !important;
    box-shadow: none !important;
  }`
  addStyle(`.${classname}`, rule)
  ele.classList.add(classname)
}

window.$Skeleton = {
  genSkeleton: (options = {}) => {
    const rootElement = document.documentElement;
    ; (function traverse(options) {
      let { button, image, basic } = options;
      const buttons = [];
      const imgs = [];
      const basics = []
      ; (function preTraverse(ele) {
        if (ele.children && ele.children.length > 0) {
          Array.from(ele.children).forEach(child => preTraverse(child))
        }
        if (ele.tagName === 'BUTTON') {
          return buttons.push(ele);
        }
        if (ele.tagName === 'IMG') {
          return imgs.push(ele)
        }
        if(['A', 'H1'].includes(ele.tagName)) {
          return basics.push(ele)
        }
      })(rootElement);
      buttons.forEach(e => buttonHandler(e, button))
      imgs.forEach(e => imgHandler(e, image));
      basics.forEach(e => basicHandler(e, basic))
    })(options);
    let rules = ''
    for (const [selector, rule] of styleCache) {
      rules += `${selector} ${rule}\n`;
    }
    const styleEle = document.createElement('style')
    styleEle.innerHTML = rules;
    document.head.appendChild(styleEle)
  },
  genHtmlAndStyle: () => {
    const styles = Array.from($$('style')).map((style) => style.innerHTML || style.innerText);
    Array.from($$(REMOVE_TAGS.join(','))).forEach((ele) => ele?.parentNode?.removeChild?.(ele));
    const html = document.body.innerHTML;
    return {
      html,
      styles
    }
  }
}