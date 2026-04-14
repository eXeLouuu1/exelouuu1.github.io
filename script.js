// --- VARSAYILAN TERRARIA PARTİKÜLLERİ (Senin Kodun) ---
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let particles = [];
for (let i = 0; i < 90; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5,
        speed: Math.random() * 0.6 + 0.2
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,255,255,0.6)";
    particles.forEach(p => {
        ctx.fillRect(p.x, p.y, p.size, p.size);
        p.y += p.speed;
        if (p.y > canvas.height) { p.y = 0; p.x = Math.random() * canvas.width; }
    });
    requestAnimationFrame(animateParticles);
}

// --- ESKİ GLOW EFEKTİ (Modifiye Edildi) ---
const glow = document.createElement("div");
glow.style.position = "fixed";
glow.style.width = "220px";
glow.style.height = "220px";
glow.style.background = "radial-gradient(circle, rgba(0,255,255,0.25) 0%, transparent 70%)";
glow.style.pointerEvents = "none";
glow.style.transform = "translate(-50%, -50%)";
glow.style.zIndex = "1";
document.body.appendChild(glow);

// --- EJDERHA GÖZÜ VE LAV SİSTEMİ (Yeni) ---
const themeBtn = document.getElementById('theme-switcher');
const eyeCanvas = document.getElementById("dragon-eye");
const ectx = eyeCanvas.getContext("2d");
const lavaContainer = document.getElementById("lava-container");

function resizeEyeCanvas() {
    eyeCanvas.width = window.innerWidth;
    eyeCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeEyeCanvas);
resizeEyeCanvas();

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

// Lav akıntılarını oluştur
for (let i = 0; i < 8; i++) {
    const lava = document.createElement('div');
    lava.className = 'lava-stream';
    lava.style.left = `${Math.random() * 100}%`;
    lava.style.animationDuration = `${Math.random() * 4 + 3}s`; // 3-7sn arası hız
    lava.style.width = `${Math.random() * 15 + 5}px`; // 5-20px kalınlık
    lavaContainer.appendChild(lava);
}

// Gözü çiz
function drawDragonEye() {
    if (!document.body.classList.contains('dragon-theme')) return;

    ectx.clearRect(0, 0, eyeCanvas.width, eyeCanvas.height);

    // Kartın ortasını bulalım (Göz orada olacak)
    const card = document.querySelector('.card').getBoundingClientRect();
    const eyeX = card.left + card.width / 2;
    const eyeY = card.top + 100; // Profil resminin biraz altına

    const eyeSize = 80;

    // 1. Göz Akı (Koyu Kırmızı/Siyah Gradyan)
    let grd = ectx.createRadialGradient(eyeX, eyeY, 10, eyeX, eyeY, eyeSize);
    grd.addColorStop(0, "#300");
    grd.addColorStop(1, "#100");
    ectx.fillStyle = grd;
    ectx.beginPath();
    ectx.arc(eyeX, eyeY, eyeSize, 0, Math.PI * 2);
    ectx.fill();
    ectx.strokeStyle = "#8b0000";
    ectx.lineWidth = 4;
    ectx.stroke();

    // 2. Gözbebeği Hesaplaması (Fare Takibi)
    let angle = Math.atan2(mouse.y - eyeY, mouse.x - eyeX);
    let dist = Math.min(eyeSize / 2.5, Math.hypot(mouse.x - eyeX, mouse.y - eyeY) / 10);
    
    let pupilX = eyeX + Math.cos(angle) * dist;
    let pupilY = eyeY + Math.sin(angle) * dist;

    // 3. Gözbebeği Çizimi (Dik, Kedi Gözü gibi)
    ectx.save();
    ectx.translate(pupilX, pupilY);
    ectx.scale(0.5, 1); // Yatayda daraltarak dikleştir
    ectx.fillStyle = "#ffcc00"; // Altın sarısı
    ectx.beginPath();
    ectx.arc(0, 0, eyeSize / 1.5, 0, Math.PI * 2);
    ectx.fill();
    ectx.restore();
    
    // Gözbebeği parlaması
    ectx.fillStyle = "#ff4500";
    ectx.beginPath();
    ectx.arc(pupilX, pupilY, 5, 0, Math.PI * 2);
    ectx.fill();

    requestAnimationFrame(drawDragonEye);
}

// Fare hareketlerini takip et
document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Eski glow efekti (Terraria modundayken çalışsın)
    if (!document.body.classList.contains('dragon-theme')) {
        glow.style.display = "block";
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    } else {
        glow.style.display = "none"; // Dragon modunda kapat
    }
});

// --- TEMA DEĞİŞTİRME MANTIĞI ---
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dragon-theme');

    if (document.body.classList.contains('dragon-theme')) {
        themeBtn.innerText = "Terraria Modu";
        animateParticles(); // Animasyon döngüsünü tetiklesin (aslında durmuyor ama...)
        drawDragonEye(); // Gözü çizmeye başla
    } else {
        themeBtn.innerText = "Ejderha Modu";
        // Göz çizimi `if` kontrolüyle otomatik duracak
    }
});

// Başlangıç animasyonları
animateParticles();

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
