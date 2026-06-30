(function () {
  const canvas = document.createElement("canvas");
  canvas.id = "fireworks";
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.45 + canvas.height * 0.08;
    const colors = ["#bf0a30", "#ffffff", "#002868", "#d4af37"];

    for (let i = 0; i < 42; i++) {
      const angle = Math.PI * 2 * (i / 42);
      const speed = Math.random() * 2.2 + 1.2;

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 80,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.015;
      p.life--;

      ctx.globalAlpha = Math.max(p.life / 80, 0);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();

      if (p.life <= 0) particles.splice(index, 1);
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  setInterval(createFirework, 1800);
  setTimeout(createFirework, 600);
  animate();

  const sparks = document.createElement("div");
  sparks.className = "july-sparks";

  for (let i = 0; i < 35; i++) {
    const spark = document.createElement("span");
    spark.style.left = Math.random() * 100 + "%";
    spark.style.animationDelay = Math.random() * 9 + "s";
    spark.style.animationDuration = Math.random() * 6 + 7 + "s";
    sparks.appendChild(spark);
  }

  document.body.appendChild(sparks);
})();
