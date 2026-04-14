
// script.js

const glow = document.createElement("div");
glow.style.position = "fixed";
glow.style.width = "200px";
glow.style.height = "200px";
glow.style.background = "radial-gradient(circle, rgba(0,255,255,0.3) 0%, transparent 70%)";
glow.style.pointerEvents = "none";
glow.style.transform = "translate(-50%, -50%)";
glow.style.zIndex = "0";
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});
