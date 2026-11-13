/* Keeps the site cursor language inside the locally hosted footer iframe too. */
(() => {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const frame = document.querySelector(".footer-signature");
  if (!frame) return;

  const mount = () => {
    const doc = frame.contentDocument;
    if (!doc || doc.getElementById("footer-drone-trail")) return;

    const style = doc.createElement("style");
    style.textContent = `
      html, body, .signature, .signature * { cursor: url('../gudvin-cursor.svg') 10 8, none !important; }
      #footer-drone-trail { position: fixed; inset: 0; z-index: 20; width: 100vw; height: 100vh; pointer-events: none; }
    `;
    doc.head.append(style);

    const canvas = doc.createElement("canvas");
    canvas.id = "footer-drone-trail";
    canvas.setAttribute("aria-hidden", "true");
    doc.body.prepend(canvas);
    const ctx = canvas.getContext("2d");
    let dots = [];
    let frameId = 0;

    const resize = () => {
      const dpr = Math.min(doc.defaultView.devicePixelRatio || 1, 2);
      canvas.width = doc.defaultView.innerWidth * dpr;
      canvas.height = doc.defaultView.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const paint = (now) => {
      frameId = 0;
      ctx.clearRect(0, 0, doc.defaultView.innerWidth, doc.defaultView.innerHeight);
      dots = dots.filter((dot) => now - dot.time < 700);
      dots.forEach((dot) => {
        const age = (now - dot.time) / 700;
        ctx.globalAlpha = 0.42 * (1 - age);
        ctx.fillStyle = "#079cec";
        ctx.beginPath();
        ctx.arc(dot.x + 12 * age, dot.y + 12 * age, dot.size * (1 - age * 0.5), 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      if (dots.length) frameId = doc.defaultView.requestAnimationFrame(paint);
    };
    doc.addEventListener("pointermove", (event) => {
      dots.push({ x: event.clientX + 18, y: event.clientY + 18, time: performance.now(), size: 1.5 + Math.random() * 2 });
      if (!frameId) frameId = doc.defaultView.requestAnimationFrame(paint);
    }, { passive: true });
    doc.defaultView.addEventListener("resize", resize, { passive: true });
    resize();
  };

  frame.addEventListener("load", mount, { once: true });
  if (frame.contentDocument?.readyState === "complete") mount();
})();
