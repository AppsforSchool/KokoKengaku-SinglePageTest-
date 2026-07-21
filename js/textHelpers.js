function sanitizeHtmlToOnlyLinks(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const box = document.createDocumentFragment();

  // 再帰的にノードを処理するヘルパー関数
  function processNode(node) {
    // 1. テキストノードの場合：そのままテキストノードを返す
    if (node.nodeType === Node.TEXT_NODE) {
      return document.createTextNode(node.textContent);
    }

    // 要素ノード（ELEMENT_NODE）の処理
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toUpperCase();
      let resultElement = null;

      // 各タグに応じた要素の生成
      if (tagName === 'A') {
        resultElement = document.createElement('a');
        const rawHref = node.getAttribute('href') || '#';
        resultElement.setAttribute('href', rawHref);
        resultElement.setAttribute('target', '_blank');
        resultElement.setAttribute('rel', 'noopener noreferrer');
        resultElement.classList.add('chat-link');
      } 
      else if (tagName === 'UNDERLINE') {
        resultElement = document.createElement('span');
        resultElement.classList.add('underline');
      } 
      else if (tagName === 'LARGE') {
        resultElement = document.createElement('span');
        resultElement.classList.add('large');
      } 
      else if (tagName === 'MAINCOLOR') {
        resultElement = document.createElement('span');
        resultElement.classList.add('main-color');
      }
      else if (tagName === 'SMALL') {
        resultElement = document.createElement('span');
        resultElement.classList.add('small');
      }
      else if (tagName === 'EMOJI') {
        resultElement = document.createElement('span');
        resultElement.classList.add('emoji');
      }

      if (resultElement) {
        // 許可されたタグの場合：子ノードを再帰的に処理して自身に追加する
        node.childNodes.forEach(child => {
          const processedChild = processNode(child);
          if (processedChild) {
            resultElement.appendChild(processedChild);
          }
        });
        return resultElement;
      } else {
        // 許可されていない未知のタグ（例: <div>, <p> など）の場合：
        // タグ自体は無視し、中身の子ノード（テキストや許可タグ）だけを平坦化して返す
        const fragment = document.createDocumentFragment();
        node.childNodes.forEach(child => {
          const processedChild = processNode(child);
          if (processedChild) {
            fragment.appendChild(processedChild);
          }
        });
        return fragment;
      }
    }

    return null;
  }

  // ルート直下の子ノードを順次処理して documentFragment に追加
  Array.from(doc.body.childNodes).forEach(node => {
    const processed = processNode(node);
    if (processed) {
      box.appendChild(processed);
    }
  });

  return box;
}

function formatDateTime(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${yyyy}/${mm}/${dd} ${hh}:${min}`;
}
