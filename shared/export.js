(function () {
  const cfg = window.PROPOSAL || {};
  const FILENAME = cfg.filename
    || document.body.getAttribute("data-pdf-name")
    || "Proposal.pdf";
  const COVER_BG = cfg.coverBg || "#171B2E";
  const PAGE_BG = cfg.pageBg || "#EDF2F5";
  const READY_FLAG = cfg.packReady;
  const LABELS = Object.assign({
    export: "Export PDF",
    exporting: "Exporting…",
    preview: "Preview PDF",
    preparing: "Preparing…"
  }, cfg.labels || {});

  const exportBtn = document.getElementById("btn-export");
  const previewBtn = document.getElementById("btn-preview");
  const closeBtn = document.getElementById("btn-close-preview");
  const preview = document.getElementById("pdf-preview");
  const frame = document.getElementById("pdf-frame");

  if (!exportBtn || !previewBtn) return;

  let pdfBlob = null;
  let pdfUrl = null;
  let building = null;

  function setLoading(btn, loading, label) {
    const text = btn.querySelector(".tb-text");
    btn.classList.toggle("is-loading", loading);
    btn.disabled = loading;
    if (btn !== exportBtn) exportBtn.disabled = loading;
    if (btn !== previewBtn) previewBtn.disabled = loading;
    if (text) text.textContent = label;
  }

  function waitImg(img) {
    if (img.complete && img.naturalWidth > 0) return Promise.resolve();
    return new Promise(function (resolve) {
      img.addEventListener("load", resolve, { once: true });
      img.addEventListener("error", resolve, { once: true });
    });
  }

  async function inlineImages() {
    const imgs = Array.from(document.querySelectorAll("img"));
    await Promise.all(imgs.map(waitImg));

    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i];
      if (!img.src || img.src.indexOf("data:") === 0) continue;
      try {
        const res = await fetch(img.src, { mode: "cors", credentials: "omit" });
        if (!res.ok) continue;
        const blob = await res.blob();
        const dataUrl = await new Promise(function (resolve, reject) {
          const reader = new FileReader();
          reader.onload = function () { resolve(reader.result); };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        img.removeAttribute("crossorigin");
        img.src = dataUrl;
        await waitImg(img);
      } catch (e) {
        console.warn("Could not inline image for export:", img.src, e);
      }
    }
  }

  async function waitForPack() {
    if (!READY_FLAG || typeof window[READY_FLAG] !== "function") return;
    for (let i = 0; i < 40; i++) {
      if (window[READY_FLAG]()) break;
      await new Promise(function (r) { setTimeout(r, 50); });
    }
  }

  async function buildPdf() {
    if (!window.html2canvas || !window.jspdf) {
      throw new Error("PDF libraries failed to load. Check your internet connection.");
    }

    await waitForPack();
    await document.fonts.ready;
    await inlineImages();

    document.body.classList.add("exporting");
    await new Promise(function (resolve) {
      requestAnimationFrame(function () {
        requestAnimationFrame(resolve);
      });
    });

    try {
      const pdf = new window.jspdf.jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
        compress: true
      });

      const pages = document.querySelectorAll(".page");
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const canvas = await window.html2canvas(page, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          logging: false,
          imageTimeout: 15000,
          backgroundColor: page.classList.contains("page-cover") ? COVER_BG : PAGE_BG
        });
        const img = canvas.toDataURL("image/jpeg", 0.96);
        if (i > 0) pdf.addPage();
        pdf.addImage(img, "JPEG", 0, 0, 210, 297, undefined, "FAST");
      }

      return pdf.output("blob");
    } finally {
      document.body.classList.remove("exporting");
    }
  }

  async function getPdfBlob() {
    if (pdfBlob) return pdfBlob;
    if (!building) building = buildPdf().then(function (blob) {
      pdfBlob = blob;
      building = null;
      return blob;
    }).catch(function (err) {
      building = null;
      throw err;
    });
    return building;
  }

  function openPreview(blob) {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    pdfUrl = URL.createObjectURL(blob);
    frame.src = pdfUrl;
    preview.hidden = false;
    preview.classList.add("is-open");
    document.body.classList.add("preview-open");
  }

  function closePreview() {
    preview.classList.remove("is-open");
    preview.hidden = true;
    document.body.classList.remove("preview-open");
  }

  function downloadBlob(blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = FILENAME;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }

  exportBtn.addEventListener("click", async function () {
    const original = LABELS.export;
    setLoading(exportBtn, true, LABELS.exporting);
    try {
      pdfBlob = null;
      const blob = await getPdfBlob();
      downloadBlob(blob);
    } catch (err) {
      console.error(err);
      alert(err.message || "Could not export PDF.");
    } finally {
      setLoading(exportBtn, false, original);
    }
  });

  previewBtn.addEventListener("click", async function () {
    const original = LABELS.preview;
    setLoading(previewBtn, true, LABELS.preparing);
    try {
      pdfBlob = null;
      const blob = await getPdfBlob();
      openPreview(blob);
    } catch (err) {
      console.error(err);
      alert(err.message || "Could not prepare preview.");
    } finally {
      setLoading(previewBtn, false, original);
    }
  });

  if (closeBtn) closeBtn.addEventListener("click", closePreview);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && preview && preview.classList.contains("is-open")) closePreview();
  });
})();
