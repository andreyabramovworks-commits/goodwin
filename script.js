const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches,
  finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  motionEnabled = !reduceMotion && "IntersectionObserver" in window;
motionEnabled && document.body.classList.add("motion-enabled");
const menuButton = document.querySelector("[data-menu-button]"),
  mobileMenu = document.querySelector("[data-mobile-menu]");
(menuButton?.addEventListener("click", () => {
  const e = mobileMenu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(e));
}),
  mobileMenu?.querySelectorAll("a").forEach((e) =>
    e.addEventListener("click", () => {
      (mobileMenu.classList.remove("open"),
        menuButton?.setAttribute("aria-expanded", "false"));
    }),
  ));
const dayButtons = [...document.querySelectorAll("[data-day]")],
  dayPanels = [...document.querySelectorAll("[data-panel]")],
  animateSchedulePanel = (e) => {
    !reduceMotion &&
      e &&
      (e.animate(
        [
          { opacity: 0, transform: "translateY(12px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 360,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "both",
        },
      ),
      e.querySelectorAll(".lesson-card").forEach((e, t) => {
        e.animate(
          [
            { opacity: 0, transform: "translateY(14px) scale(0.99)" },
            { opacity: 1, transform: "translateY(0) scale(1)" },
          ],
          {
            delay: Math.min(55 * t, 165),
            duration: 360,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both",
          },
        );
      }));
  },
  setScheduleDay = (e) => {
    const t = () => {
      dayButtons.forEach((t) =>
        t.setAttribute("aria-selected", String(t === e)),
      );
      let t = null;
      (dayPanels.forEach((n) => {
        const r = n.dataset.panel === e.dataset.day;
        ((n.hidden = !r), r && (t = n));
      }),
        animateSchedulePanel(t));
    };
    document.startViewTransition && !reduceMotion
      ? document.startViewTransition(t)
      : t();
  };
dayButtons.forEach((e) => e.addEventListener("click", () => setScheduleDay(e)));
const scrollToCallback = () => {
  (document
    .querySelector("#callback")
    ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }),
    window.setTimeout(
      () => document.querySelector("#callback input")?.focus(),
      reduceMotion ? 0 : 550,
    ));
};
function initScrollStages() {
  if (!motionEnabled) return;
  const e = new IntersectionObserver(
    (e, t) => {
      e.forEach((e) => {
        e.isIntersecting &&
          (e.target.classList.add("is-visible"), t.unobserve(e.target));
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -9% 0px" },
  );
  document.querySelectorAll("[data-scroll-stage]").forEach((t) => {
    ([...t.children].forEach((e, t) => {
      ((e.dataset.staged = "true"),
        e.classList.add("scroll-stage-item"),
        e.style.setProperty("--stage-delay", `${Math.min(45 * t, 270)}ms`));
    }),
      e.observe(t));
  });
}
function initSingleReveals() {
  if (!motionEnabled) return;
  const e = new IntersectionObserver(
    (e, t) => {
      e.forEach((e) => {
        e.isIntersecting &&
          (e.target.classList.add("is-visible"), t.unobserve(e.target));
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -7% 0px" },
  );
  document.querySelectorAll(".reveal-on-scroll").forEach((t) => {
    t.dataset.staged || e.observe(t);
  });
}
function initScrollProgress() {
  if (reduceMotion) return;
  const e = document.querySelector(".scroll-progress span");
  if (!e) return;
  let t = 0;
  const n = () => {
      t = 0;
      const n = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight,
        ),
        r = Math.min(1, Math.max(0, window.scrollY / n));
      e.style.transform = `scaleX(${r.toFixed(4)})`;
    },
    r = () => {
      t || (t = requestAnimationFrame(n));
    };
  (n(),
    document.addEventListener("scroll", r, { passive: !0 }),
    window.addEventListener("resize", r, { passive: !0 }));
}
function initScrollFloat() {
  if (reduceMotion) return;
  const e = document.querySelector("[data-scroll-float]");
  if (!e || !("IntersectionObserver" in window)) return;
  let t = 0,
    n = !1,
    r = null;
  const a = () => {
      if (((t = 0), !n || document.hidden)) return;
      const a = e.getBoundingClientRect(),
        o = window.innerHeight || 1,
        i = Math.min(1, Math.max(0, (o - a.top) / o)),
        s = window.matchMedia("(max-width: 620px)").matches ? 12 : 28,
        c = -Math.round(i * s);
      c !== r && ((r = c), e.style.setProperty("--photo-drift-y", `${c}px`));
    },
    o = () => {
      t || (t = requestAnimationFrame(a));
    };
  (new IntersectionObserver(
    ([e]) => {
      ((n = e.isIntersecting), n && o());
    },
    { threshold: 0.01 },
  ).observe(e),
    document.addEventListener("scroll", o, { passive: !0 }),
    window.addEventListener("resize", o, { passive: !0 }));
}
function initClubOpening() {
  const e = document.querySelector("[data-club-opening]");
  if (!e) return;
  const t = e.querySelector("[data-opening-skip]");
  let n = !1;
  const r = () => {
    n ||
      ((n = !0),
      e.classList.add("is-leaving"),
      document.body.classList.remove("is-opening"),
      window.setTimeout(() => e.remove(), 700));
  };
  if (reduceMotion) return void e.remove();
  let a = !1;
  try {
    ((a = "yes" === window.sessionStorage.getItem("goodwin-v6-opening-seen")),
      window.sessionStorage.setItem("goodwin-v6-opening-seen", "yes"));
  } catch {}
  a
    ? e.remove()
    : (document.body.classList.add("is-opening"),
      requestAnimationFrame(() => e.classList.add("is-ready")),
      t?.addEventListener("click", r),
      window.setTimeout(r, 2100));
}
function initRevealHover(e) {
  if (
    !e.querySelector(".reveal-hover__image--overlay") ||
    !finePointer ||
    reduceMotion
  )
    return;
  const t = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      radius: 0,
      targetRadius: 0,
      frame: 0,
      inside: !1,
    },
    n = Number.parseFloat(e.dataset.revealRadius),
    r = () => {
      ((t.frame = 0),
        (t.x += 0.1 * (t.targetX - t.x)),
        (t.y += 0.1 * (t.targetY - t.y)),
        (t.radius += 0.14 * (t.targetRadius - t.radius)),
        e.style.setProperty("--reveal-x", `${t.x.toFixed(1)}px`),
        e.style.setProperty("--reveal-y", `${t.y.toFixed(1)}px`),
        e.style.setProperty("--reveal-radius", `${t.radius.toFixed(1)}px`),
        (Math.abs(t.targetX - t.x) > 0.1 ||
          Math.abs(t.targetY - t.y) > 0.1 ||
          Math.abs(t.targetRadius - t.radius) > 0.1) &&
          (t.frame = requestAnimationFrame(r)));
    },
    a = (a) => {
      (((n) => {
        const r = e.getBoundingClientRect();
        ((t.targetX = n.clientX - r.left), (t.targetY = n.clientY - r.top));
      })(a),
        t.inside || ((t.x = t.targetX), (t.y = t.targetY)),
        (t.inside = !0),
        (t.targetRadius = Number.isFinite(n)
          ? n
          : Math.min(240, Math.max(150, 0.26 * e.clientWidth))),
        t.frame || (t.frame = requestAnimationFrame(r)));
    },
    o = () => {
      ((t.inside = !1),
        (t.targetRadius = 0),
        t.frame || (t.frame = requestAnimationFrame(r)));
    };
  (e.addEventListener("pointerenter", a),
    e.addEventListener("pointermove", a),
    e.addEventListener("pointerleave", o),
    e.addEventListener("pointercancel", o),
    window.addEventListener("blur", o));
}
(document.querySelectorAll("[data-scroll-form]").forEach((e) =>
  e.addEventListener("click", () => {
    const t = document.querySelector("[data-booking-choice]");
    const n = document.querySelector("[data-session-select]");
    t &&
      e.dataset.session &&
      ((t.textContent = `Вы выбрали: ${e.dataset.session}. Мы подтвердим запись звонком.`),
      n && (n.value = e.dataset.session));
    scrollToCallback();
  }),
),
  initScrollStages(),
  initSingleReveals(),
  initScrollProgress(),
  initScrollFloat(),
  initClubOpening(),
  document
    .querySelector("[data-callback-form]")
    ?.addEventListener("submit", (e) => {
      (e.preventDefault(),
        (e.currentTarget.querySelector(".form-success").hidden = !1),
        (e.currentTarget.querySelector("button").textContent =
          "Спасибо, ждите звонка"));
    }),
  document
    .querySelector("[data-session-select]")
    ?.addEventListener("change", (e) => {
      const t = document.querySelector("[data-booking-choice]");
      t &&
        (t.textContent = e.currentTarget.value
          ? `Вы выбрали: ${e.currentTarget.value}. Мы подтвердим запись звонком.`
          : "Можно выбрать удобную дату в расписании выше.");
    }),
  document.querySelectorAll("[data-reveal-hover]").forEach(initRevealHover));
const reader = document.querySelector("[data-news-reader]"),
  readerTitle = document.querySelector("[data-news-reader-title]"),
  readerDate = document.querySelector("[data-news-reader-date]"),
  readerBody = document.querySelector("[data-news-reader-body]"),
  surfaceAnimations = new WeakMap(),
  surfaceMotion = (e, t, n) => {
    const r = surfaceAnimations.get(e);
    if ((r?.cancel(), reduceMotion)) return null;
    const a = e.animate(t, n);
    return (surfaceAnimations.set(e, a), a);
  },
  showSurface = (e) => {
    e &&
      ((e.hidden = !1),
      e.classList.remove("is-closing", "is-open"),
      e.getBoundingClientRect(),
      e.classList.add("is-open"),
      surfaceMotion(
        e,
        [
          { opacity: 0, transform: "translateY(16px) scale(0.985)" },
          { opacity: 1, transform: "translateY(0) scale(1)" },
        ],
        { duration: 520, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      ));
  },
  hideSurface = (e) => {
    if (!e || e.hidden) return;
    (e.classList.add("is-closing"), e.classList.remove("is-open"));
    const t = e.classList.contains("team-profile") ? 500 : 380,
      n = surfaceMotion(
        e,
        [
          { opacity: 1, transform: "translateY(0) scale(1)" },
          { opacity: 0, transform: "translateY(-8px) scale(0.992)" },
        ],
        { duration: t, easing: "cubic-bezier(0.55, 0, 1, 0.45)" },
      ),
      r = () => {
        e.classList.contains("is-closing") &&
          ((e.hidden = !0), e.classList.remove("is-closing"));
      };
    n ? n.finished.then(r).catch(() => {}) : r();
  };
function initNewsCarousel() {
  const e = document.querySelector("[data-news-carousel]"),
    t = e?.querySelector("[data-news-track]"),
    n = e?.querySelector("[data-news-prev]"),
    r = e?.querySelector("[data-news-next]"),
    a = t ? [...t.children] : [];
  if (!t || !n || !r || 0 === a.length) return;
  let o = 0,
    i = 0;
  const s = (e) => {
      const n = Math.max(0, Math.min(a.length - 1, e));
      t.scrollTo({
        left: a[n].offsetLeft,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    c = () => {
      i = 0;
      const e = t.scrollLeft;
      ((o = a.reduce(
        (t, n, r) =>
          Math.abs(n.offsetLeft - e) < Math.abs(a[t].offsetLeft - e) ? r : t,
        0,
      )),
        (n.disabled = 0 === o),
        (r.disabled = o === a.length - 1));
    },
    d = () => {
      i || (i = requestAnimationFrame(c));
    };
  (n.addEventListener("click", () => s(o - 1)),
    r.addEventListener("click", () => s(o + 1)),
    t.addEventListener("scroll", d, { passive: !0 }),
    window.addEventListener("resize", d, { passive: !0 }),
    c());
}
(document.querySelectorAll(".news-open").forEach((e) =>
  e.addEventListener("click", () => {
    ((readerTitle.textContent = e.dataset.newsTitle),
      (readerDate.textContent = e.dataset.newsDate),
      (readerBody.textContent = e.dataset.newsBody),
      showSurface(reader),
      reduceMotion ||
        reader.scrollIntoView({ behavior: "smooth", block: "nearest" }));
  }),
),
  document
    .querySelector("[data-reader-close]")
    ?.addEventListener("click", () => {
      hideSurface(reader);
    }),
  initNewsCarousel(),
  document.querySelectorAll("[data-team-card]").forEach((e) => {
    const t = [...e.querySelectorAll("[data-team-toggle]")],
      n = e.querySelector(".team-profile");
    t.forEach((e) =>
      e.addEventListener("click", () => {
        const e = n.hidden || !n.classList.contains("is-open");
        (document.querySelectorAll(".team-profile").forEach((e) => {
          e !== n && hideSurface(e);
        }),
          document.querySelectorAll("[data-team-toggle]").forEach((e) => {
            t.includes(e) || e.setAttribute("aria-expanded", "false");
          }),
          e ? showSurface(n) : hideSurface(n),
          t.forEach((t) => t.setAttribute("aria-expanded", String(e))));
      }),
    );
  }));
const documentViewer = document.querySelector("[data-document-viewer]"),
  documentTitle = documentViewer?.querySelector("h3[data-document-title]"),
  documentKind = documentViewer?.querySelector("p[data-document-kind]"),
  documentFeedback = document.querySelector(".document-feedback");
function initScrubbedWords(e) {
  if (reduceMotion) return;
  const t = e.textContent.trim(),
    n = t.split(/(\s+)/);
  ((e.textContent = ""), e.setAttribute("aria-label", t));
  let r = 0;
  n.forEach((t) => {
    if (!t.trim()) return e.append(document.createTextNode(t));
    const n = document.createElement("span");
    ((n.className = "scrub-word"),
      n.setAttribute("aria-hidden", "true"),
      (n.textContent = t),
      e.append(n),
      (r += 1));
  });
  let a = 0;
  const o = () => {
      a = 0;
      const t = e.getBoundingClientRect(),
        n = Math.max(
          0,
          Math.min(
            1,
            (1.04 * window.innerHeight - t.top) / (0.48 * window.innerHeight),
          ),
        );
      e.querySelectorAll(".scrub-word").forEach((e, t) => {
        e.style.setProperty(
          "--word-progress",
          Math.max(0, Math.min(1, n * r - t)).toFixed(3),
        );
      });
    },
    i = () => {
      a || (a = requestAnimationFrame(o));
    };
  (document.addEventListener("scroll", i, { passive: !0 }),
    window.addEventListener("resize", i, { passive: !0 }),
    i());
}
/* Cursor tail is at (34,32); hotspot is (10,8). Emit smoke 24px behind both axes. */ function initHeroTrail() {
  if (reduceMotion || !finePointer) return;
  const e = document.querySelector("[data-page-trail]"),
    t = e?.getContext("2d");
  if (!e || !t) return;
  let n,
    r = [],
    a = null,
    o = null,
    i = 0,
    s = 0;
  const c = () => {
      const n = { width: window.innerWidth, height: window.innerHeight },
        r = Math.min(window.devicePixelRatio || 1, 2);
      return (
        (e.width = Math.max(1, n.width * r)),
        (e.height = Math.max(1, n.height * r)),
        (e.style.width = `${n.width}px`),
        (e.style.height = `${n.height}px`),
        t.setTransform(r, 0, 0, r, 0, 0),
        n
      );
    },
    d = (e, t, n = 1) => {
      for (let a = 0; a < n; a += 1)
        r.push({
          x: e,
          y: t,
          birth: performance.now(),
          size: 1.7 + 2.7 * Math.random(),
          vx: 0.18 + 0.26 * Math.random(),
          vy: 0.18 + 0.26 * Math.random(),
        });
    },
    l = (e) => {
      ((s = 0),
        document.hidden ||
          (t.clearRect(0, 0, n.width, n.height),
          o && e - i > 100 && (d(o.x, o.y), (i = e)),
          (r = r.filter((t) => e - t.birth < 1600)),
          r.forEach((n) => {
            const r = (e - n.birth) / 1600;
            ((n.x += n.vx),
              (n.y += n.vy),
              (t.globalAlpha = 0.45 * (1 - r)),
              (t.fillStyle = "#079cec"),
              t.beginPath(),
              t.arc(n.x, n.y, n.size * (1 - 0.55 * r), 0, 2 * Math.PI),
              t.fill());
          }),
          (t.globalAlpha = 1),
          (r.length || o) && (s = requestAnimationFrame(l))));
    },
    u = () => {
      s || document.hidden || (s = requestAnimationFrame(l));
    };
  (document.addEventListener("pointermove", (e) => {
    if (e.target.closest("[data-no-trail], a, button, input, select, textarea"))
      return ((o = null), (a = null), (r = []), void u());
    const t = { x: e.clientX + 24, y: e.clientY + 24 };
    if (a) {
      const e = Math.hypot(t.x - a.x, t.y - a.y);
      for (let n = 8; n < e; n += 9)
        d(a.x + ((t.x - a.x) * n) / e, a.y + ((t.y - a.y) * n) / e);
    }
    (d(t.x, t.y, 2), (a = t), (o = t), u());
  }),
    window.addEventListener("blur", () => {
      ((o = null), (a = null), u());
    }),
    window.addEventListener("resize", () => {
      n = c();
    }),
    document.addEventListener("visibilitychange", u),
    (n = c()),
    u());
}
function initCallbackParticles() {
  if (reduceMotion) return;
  const e = document.querySelector("#callback"),
    t = document.querySelector("[data-callback-particles]"),
    n = t?.getContext("2d");
  if (!e || !t || !n) return;
  const r = window.matchMedia("(max-width: 700px)").matches;
  let a,
    o = [],
    i = null,
    s = 0,
    c = !1,
    d = performance.now();
  const l = () => {
      ((a = (() => {
        const r = e.getBoundingClientRect(),
          a = Math.min(window.devicePixelRatio || 1, 2);
        return (
          (t.width = Math.max(1, r.width * a)),
          (t.height = Math.max(1, r.height * a)),
          (t.style.width = `${r.width}px`),
          (t.style.height = `${r.height}px`),
          n.setTransform(a, 0, 0, a, 0, 0),
          r
        );
      })()),
        (o = Array.from(
          {
            length: r
              ? Math.min(
                  20,
                  Math.max(12, Math.floor((a.width * a.height) / 3e4)),
                )
              : Math.min(
                  42,
                  Math.max(20, Math.floor((a.width * a.height) / 23e3)),
                ),
          },
          () => ({
            x: Math.random() * a.width,
            y: Math.random() * a.height,
            size: 2 + 5 * Math.random(),
            phase: Math.random() * Math.PI * 2,
            speed: 7 + 11 * Math.random(),
            color: Math.random() > 0.45 ? "#079cec" : "#91b9d4",
          }),
        )));
    },
    u = (e) => {
      if (((s = 0), !c || document.hidden)) return;
      const t = Math.min(0.05, (e - d) / 1e3);
      ((d = e),
        n.clearRect(0, 0, a.width, a.height),
        o.forEach((r) => {
          if (
            ((r.y -= r.speed * t),
            (r.x += 10 * Math.sin(e / 1200 + r.phase) * t),
            i)
          ) {
            const e = r.x - i.x,
              n = r.y - i.y,
              a = Math.hypot(e, n);
            a < 120 &&
              ((r.x += (e / Math.max(a, 1)) * 18 * t),
              (r.y += (n / Math.max(a, 1)) * 18 * t));
          }
          (r.y < -16 &&
            ((r.y = a.height + 12), (r.x = Math.random() * a.width)),
            (n.globalAlpha = 0.2 + 0.08 * Math.sin(e / 900 + r.phase)),
            (n.fillStyle = r.color),
            n.save(),
            n.translate(r.x, r.y),
            n.rotate(Math.sin(e / 1200 + r.phase)),
            n.fillRect(-r.size / 2, -r.size / 2, r.size, r.size),
            n.restore());
        }),
        (n.globalAlpha = 1),
        (s = requestAnimationFrame(u)));
    };
  (e.addEventListener("pointermove", (t) => {
    const n = e.getBoundingClientRect();
    i = { x: t.clientX - n.left, y: t.clientY - n.top };
  }),
    e.addEventListener("pointerleave", () => {
      i = null;
    }),
    new ResizeObserver(l).observe(e),
    new IntersectionObserver(
      ([e]) => {
        ((c = e.isIntersecting), c && !s && (s = requestAnimationFrame(u)));
      },
      { threshold: 0.08 },
    ).observe(e),
    document.addEventListener("visibilitychange", () => {
      document.hidden || !c || s || (s = requestAnimationFrame(u));
    }),
    l());
}
function initSiteCursor() {
  if (finePointer && !reduceMotion)
    document.body.classList.add("has-custom-cursor");
}
(document.querySelectorAll(".document-open").forEach((e) =>
  e.addEventListener("click", () => {
    ((documentTitle.textContent = e.dataset.documentTitle),
      (documentKind.textContent = `${e.dataset.documentKind} · раздел документов`),
      (documentFeedback.textContent = ""),
      showSurface(documentViewer),
      documentViewer.focus({ preventScroll: !0 }),
      reduceMotion ||
        documentViewer.scrollIntoView({ behavior: "smooth", block: "center" }));
  }),
),
  document
    .querySelector("[data-document-close]")
    ?.addEventListener("click", () => {
      hideSurface(documentViewer);
    }),
  document.querySelectorAll("[data-document-pdf]").forEach((e) =>
    e.addEventListener("click", () => {
      documentFeedback.textContent =
        "PDF появится здесь после утверждения официальной версии документа.";
    }),
  ),
  document.querySelectorAll("[data-scrub-reveal]").forEach(initScrubbedWords),
  initHeroTrail(),
  initCallbackParticles(),
  initSiteCursor());

const videoReader = document.querySelector("[data-video-reader]");
document.querySelectorAll(".news-video-open").forEach((button) =>
  button.addEventListener("click", () => {
    showSurface(videoReader);
    reduceMotion ||
      videoReader.scrollIntoView({ behavior: "smooth", block: "center" });
  }),
);
document
  .querySelector("[data-video-reader-close]")
  ?.addEventListener("click", () => {
    videoReader?.querySelector("video")?.pause();
    hideSurface(videoReader);
  });
