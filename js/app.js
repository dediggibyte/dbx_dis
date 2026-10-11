/*
 * dbt_dis behaviour: industry dial, reveal, attract mode and the event countdown.
 * Content comes from js/storylines.js (window.DIS).
 */
(function () {
  "use strict";

  const { EVENT, FACTS, DIGGIBYTE, TECH, SUMMIT_STAGES, STAGES, ACCELERATORS } = window.DIS;
  const N = STAGES.length;
  const SEG = 360 / N; // degrees per segment
  const LABEL_RADIUS = 60; // label distance from centre, % of dial size

  // Attract mode: spin on its own after IDLE_MS without interaction, then every AUTO_MS.
  const IDLE_MS = 40000;
  const AUTO_MS = 20000;
  const SPIN_MS = 1850;

  const $ = (id) => document.getElementById(id);
  const dial = $("dial");
  const needle = $("needle");
  const spinBtn = $("spin");
  const buttonsEl = $("stage-buttons");
  const stageEl = $("stage");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let current = -1;
  let angle = SEG / 2; // needle angle in degrees, clockwise from top
  let spinning = false;
  let idleTimer = null;
  let autoTimer = null;

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Centre angle of segment i, clockwise from the top.
  function target(i) { return SEG * i + SEG / 2; }

  const EXT_ICON =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>';

  function buildAccelerators() {
    $("accelerators").innerHTML = ACCELERATORS.map((a) =>
      '<article class="acc">' +
      '<p class="acc-tag">' + esc(a.tag) + "</p>" +
      "<h3>" + esc(a.name) + "</h3>" +
      '<p class="acc-text">' + esc(a.text) + "</p>" +
      '<ul class="acc-points">' + a.highlights.map((h) => "<li>" + esc(h) + "</li>").join("") + "</ul>" +
      '<div class="acc-links">' + a.links.map((l) =>
        '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + EXT_ICON + "</a>").join("") +
      "</div></article>").join("");
  }

  /* ---------- Static content ---------- */

  function fillStatic() {
    document.querySelectorAll("[data-event]").forEach((el) => {
      const v = EVENT[el.getAttribute("data-event")];
      if (v) el.textContent = v;
    });
    $("event-link").href = EVENT.url;
    $("schedule-link").href = EVENT.scheduleUrl;

    $("diggibyte-summary").textContent = DIGGIBYTE.summary;
    $("diggibyte-link").href = DIGGIBYTE.url;
    $("diggibyte-proof").innerHTML = DIGGIBYTE.proof.map((p) =>
      "<div><dt>" + esc(p.label) + "</dt><dd>" + esc(p.value) + "</dd></div>").join("");

    $("facts").innerHTML = FACTS.map((f) =>
      "<div><dt>" + esc(f.label) + "</dt><dd>" + esc(f.value) + "</dd></div>").join("");

    buttonsEl.innerHTML = STAGES.map((s, i) => {
      const rad = (target(i) * Math.PI) / 180;
      const left = 50 + LABEL_RADIUS * Math.sin(rad);
      const top = 50 - LABEL_RADIUS * Math.cos(rad);
      // An industry with a demo URL gets a hyperlinked name: clicking it opens the demo in a
      // new tab and also selects the industry on the dial. Others get a plain select button.
      const label = s.url
        ? '<a class="stage-btn is-link" data-index="' + i + '" href="' + esc(s.url) + '" ' +
          'target="_blank" rel="noopener" title="Open the ' + esc(s.short) + ' demo in a new tab">' +
          '<span>' + esc(s.short) + "</span>" + EXT_ICON + "</a>"
        : '<button type="button" class="stage-btn" data-index="' + i + '" aria-pressed="false">' +
          esc(s.short) + "</button>";
      return '<div class="stage-item" style="left:' + left.toFixed(2) + '%;top:' + top.toFixed(2) + '%">' +
        label + "</div>";
    }).join("");
    buttonsEl.addEventListener("click", (e) => {
      const b = e.target.closest(".stage-btn");
      if (!b) return;
      userAct();
      spinTo(Number(b.dataset.index), 0);
    });
  }

  /* ---------- Dial ---------- */



  function spinTo(i, turns) {
    if (spinning || i < 0 || i >= N) return;
    if (i === current && turns === 0) return;
    spinning = true;
    spinBtn.disabled = true;

    // Always turn clockwise: next angle >= current, plus extra full turns.
    let next = target(i);
    while (next <= angle) next += 360;
    next += 360 * turns;
    const travel = next - angle;
    angle = next;

    const ms = reducedMotion.matches ? 10 : Math.max(450, Math.min(SPIN_MS, travel * 1.6));
    needle.style.transitionDuration = ms + "ms";
    needle.style.transform = "rotate(" + angle + "deg)";

    setTimeout(() => {
      spinning = false;
      spinBtn.disabled = false;
      reveal(i, true);
    }, ms + 40);
  }

  function spin() {
    let i = Math.floor(Math.random() * N);
    if (i === current) i = (i + 1 + Math.floor(Math.random() * (N - 1))) % N;
    spinTo(i, 2);
  }

  /* ---------- Reveal ---------- */

  function reveal(i, animate) {
    const s = STAGES[i];
    current = i;
    dial.style.setProperty("--sel-angle", (SEG * i) + "deg");

    $("stage-icon").src = s.icon;
    $("stage-name").textContent = s.name;
    $("stage-tag").textContent = "At the summit: " + (SUMMIT_STAGES[s.stage] || "") + " stage";
    $("stage-audience").textContent = "For " + s.audience;
    $("stage-focus").textContent = s.focus;

    $("offer-title").textContent = s.offer.title;
    $("offer-text").textContent = s.offer.text;
    $("offer-tech").innerHTML = s.offer.tech.map((t) => "<li>" + esc(TECH[t] || t) + "</li>").join("");

    $("usecase-who").textContent = s.useCase.who;
    $("usecase-problem").textContent = s.useCase.problem;
    $("usecase-outcome").textContent = s.useCase.outcome;
    $("usecase-metric").textContent = s.useCase.metric;

    const link = $("demo-link");
    if (s.url) {
      link.href = s.url;
      link.innerHTML = "Open the " + esc(s.short) + " demo" + EXT_ICON;
      link.removeAttribute("aria-disabled");
      link.classList.remove("is-pending");
    } else {
      link.removeAttribute("href");
      link.textContent = "Demo link coming soon";
      link.setAttribute("aria-disabled", "true");
      link.classList.add("is-pending");
    }

    $("demo-steps").innerHTML = s.demo.map((d) => "<li>" + esc(d) + "</li>").join("");

    buttonsEl.querySelectorAll(".stage-btn").forEach((b) => {
      const on = Number(b.dataset.index) === i;
      b.classList.toggle("is-active", on);
      if (b.tagName === "BUTTON") b.setAttribute("aria-pressed", on ? "true" : "false");
      else if (on) b.setAttribute("aria-current", "true");
      else b.removeAttribute("aria-current");
    });

    stageEl.classList.remove("is-revealing");
    if (animate) { void stageEl.offsetWidth; stageEl.classList.add("is-revealing"); }

    try { history.replaceState(null, "", "#" + s.id); } catch (e) { /* file:// or sandboxed */ }
  }

  /* ---------- Attract mode ---------- */

  function userAct() {
    clearTimeout(idleTimer);
    clearInterval(autoTimer);
    idleTimer = setTimeout(() => { spin(); autoTimer = setInterval(spin, AUTO_MS); }, IDLE_MS);
  }

  /* ---------- Countdown ---------- */

  function countdown() {
    const box = document.querySelector(".countdown");
    const label = $("countdown-label");
    const u = {};
    ["d", "h", "m", "s"].forEach((k) => { u[k] = box.querySelector('[data-unit="' + k + '"]'); });
    const start = Date.parse(EVENT.start);
    const end = Date.parse(EVENT.end);
    const pad = (n) => String(n).padStart(2, "0");
    let state = "";

    function tick() {
      const now = Date.now();
      const next = now < start ? "soon" : now < end ? "live" : "over";
      if (next !== state) {
        state = next;
        box.classList.toggle("is-live", state === "live");
        box.classList.toggle("is-over", state === "over");
        label.textContent =
          state === "soon" ? "Doors open in" :
          state === "live" ? "The summit is live. Come and spin the dial at our booth." :
          "Thanks for visiting Diggibyte at Data Innovation Summit MEA 2026.";
      }
      if (state !== "soon") return;
      let t = Math.floor((start - now) / 1000);
      const d = Math.floor(t / 86400); t -= d * 86400;
      const h = Math.floor(t / 3600);  t -= h * 3600;
      const m = Math.floor(t / 60);    t -= m * 60;
      u.d.textContent = pad(d); u.h.textContent = pad(h); u.m.textContent = pad(m); u.s.textContent = pad(t);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Start ---------- */

  function init() {
    fillStatic();
    buildAccelerators();

    spinBtn.addEventListener("click", () => { userAct(); spin(); });

    document.addEventListener("keydown", (e) => {
      if (e.repeat) return;
      const tag = (e.target.tagName || "").toLowerCase();
      if (e.code === "Space" && tag !== "button" && tag !== "a") {
        e.preventDefault(); userAct(); spin();
      } else if ((e.key === "ArrowRight" || e.key === "ArrowLeft") && tag !== "input") {
        userAct();
        const step = e.key === "ArrowRight" ? 1 : N - 1;
        spinTo((current + step) % N, 0);
      }
    });
    ["pointerdown", "wheel", "touchstart"].forEach((ev) =>
      document.addEventListener(ev, userAct, { passive: true }));

    const fromHash = STAGES.findIndex((s) => "#" + s.id === location.hash);
    const first = fromHash >= 0 ? fromHash : 0;
    angle = target(first);
    needle.style.transitionDuration = "0ms";
    needle.style.transform = "rotate(" + angle + "deg)";
    reveal(first, false);

    countdown();
    userAct();
  }

  init();
})();
