(function () {
  const cfg = window.PROPOSAL || {};
  const MM = 96 / 25.4;
  const PAGE_PAD_TOP = 14 * MM;
  const PAGE_PAD_BOTTOM = 4 * MM;
  const FOOTER_RESERVE = 20 * MM;
  const SAFETY = 6 * MM;
  const BRAND = cfg.footerBrand || "Mahdi Ezzeddine";
  const LABEL_MAX = cfg.footerLabelMax || 42;
  const READY_FLAG = cfg.packReady || "__civilPackReady";

  let packed = false;

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function createPage(pageNum) {
    const page = document.createElement("div");
    page.className = "page";

    const body = document.createElement("div");
    body.className = "page-body";

    const footer = document.createElement("div");
    footer.className = "page-footer";
    footer.innerHTML =
      "<span>" + BRAND + "</span>" +
      "<span></span>" +
      "<span>" + pad2(pageNum) + "</span>";

    page.appendChild(body);
    page.appendChild(footer);
    page._body = body;
    page._footerLabel = footer.children[1];
    page._labels = [];
    return page;
  }

  function updateFooterLabel(page) {
    const labels = page._labels.filter(Boolean);
    const text = labels.length ? labels.join(" · ") : "Proposal";
    page._footerLabel.textContent = text.length > LABEL_MAX
      ? labels[0] + (labels.length > 1 ? " +" + (labels.length - 1) : "")
      : text;
  }

  function usableHeight(page) {
    return page.clientHeight - PAGE_PAD_TOP - PAGE_PAD_BOTTOM - FOOTER_RESERVE - SAFETY;
  }

  function contentUsed(body) {
    const kids = body.children;
    if (!kids.length) return 0;
    const bodyTop = body.getBoundingClientRect().top;
    const last = kids[kids.length - 1].getBoundingClientRect();
    return last.bottom - bodyTop;
  }

  function pageOverflows(page) {
    return page.scrollHeight > page.clientHeight + 1;
  }

  function pack() {
    const source = document.getElementById("pack-source");
    const target = document.getElementById("pack-target");
    if (!source || !target) return;

    const blocks = Array.from(source.querySelectorAll(".content-block"));
    if (!blocks.length) return;

    target.innerHTML = "";

    let pageNum = 2;
    let page = createPage(pageNum);
    target.appendChild(page);
    void page.offsetHeight;
    let capacity = usableHeight(page);

    blocks.forEach(function (block) {
      const clone = block.cloneNode(true);
      page._body.appendChild(clone);
      void clone.offsetHeight;

      const used = contentUsed(page._body);
      const overflows = pageOverflows(page);

      if (page._body.children.length > 1 && (used > capacity || overflows)) {
        page._body.removeChild(clone);
        updateFooterLabel(page);

        pageNum += 1;
        page = createPage(pageNum);
        target.appendChild(page);
        void page.offsetHeight;
        capacity = usableHeight(page);

        page._body.appendChild(clone);
      }

      page._labels.push(block.getAttribute("data-label") || "");
    });

    updateFooterLabel(page);

    const pages = Array.from(target.querySelectorAll(".page"));
    for (let i = 0; i < pages.length; i++) {
      const p = pages[i];
      while (pageOverflows(p) && p._body.children.length > 1) {
        const last = p._body.lastElementChild;
        const label = p._labels.pop();
        p._body.removeChild(last);
        updateFooterLabel(p);

        let next = p.nextElementSibling;
        if (!next || !next.classList.contains("page")) {
          pageNum += 1;
          next = createPage(pageNum);
          target.appendChild(next);
        }
        next._body.insertBefore(last, next._body.firstChild);
        next._labels.unshift(label);
        updateFooterLabel(next);
        void next.offsetHeight;
      }
    }

    Array.from(target.querySelectorAll(".page")).forEach(function (p, idx) {
      p.querySelector(".page-footer span:last-child").textContent = pad2(idx + 2);
    });

    packed = true;
    document.body.classList.add("is-packed");
  }

  function run() {
    pack();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        requestAnimationFrame(pack);
      }).catch(function () {});
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  window.addEventListener("load", function () {
    requestAnimationFrame(pack);
  });

  let resizeTimer = null;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(pack, 150);
  });

  window[READY_FLAG] = function () { return packed; };
})();
