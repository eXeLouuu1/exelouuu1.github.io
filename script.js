

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 90; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2.5,
    speed: Math.random() * 0.6 + 0.2
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,255,255,0.6)";

  particles.forEach(p => {
    ctx.fillRect(p.x, p.y, p.size, p.size);
    p.y += p.speed;

    if (p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(animate);
}
animate();

const glow = document.createElement("div");
glow.style.position = "fixed";
glow.style.width = "220px";
glow.style.height = "220px";
glow.style.background = "radial-gradient(circle, rgba(0,255,255,0.25) 0%, transparent 70%)";
glow.style.pointerEvents = "none";
glow.style.transform = "translate(-50%, -50%)";
glow.style.zIndex = "1";
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});
