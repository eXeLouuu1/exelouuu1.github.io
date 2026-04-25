// --- TEMEL KURULUM ---
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
const eyeCanvas = document.getElementById("dragon-eye");
const ectx = eyeCanvas.getContext("2d");
const themeBtn = document.getElementById('theme-switcher');
const lavaContainer = document.getElementById("lava-container");

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function resize() {
    canvas.width = eyeCanvas.width = window.innerWidth;
    canvas.height = eyeCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// --- TERRARIA PARTİKÜLLERİ ---
let particles = [];
for (let i = 0; i < 90; i++) {
    particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2.5,
        speed: Math.random() * 0.6 + 0.2
    });
}

function animateParticles() {
    if (document.body.classList.contains('dragon-theme')) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return; // Dragon temasında kar yağmasın
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,255,255,0.6)";
    particles.forEach(p => {
        ctx.fillRect(p.x, p.y, p.size, p.size);
        p.y += p.speed;
        if (p.y > canvas.height) { p.y = 0; p.x = Math.random() * canvas.width; }
    });
    requestAnimationFrame(animateParticles);
}

// --- GLOW EFEKTİ ---
const glow = document.createElement("div");
glow.className = "mouse-glow";
document.body.appendChild(glow);

// --- EJDERHA GÖZÜ VE LAV ---
for (let i = 0; i < 8; i++) {
    const lava = document.createElement('div');
    lava.className = 'lava-stream';
    lava.style.left = `${Math.random() * 100}%`;
    lava.style.animationDuration = `${Math.random() * 4 + 3}s`;
    lava.style.width = `${Math.random() * 15 + 5}px`;
    lavaContainer.appendChild(lava);
}

function drawDragonEye() {
    if (!document.body.classList.contains('dragon-theme')) {
        ectx.clearRect(0, 0, eyeCanvas.width, eyeCanvas.height);
        return;
    }
    ectx.clearRect(0, 0, eyeCanvas.width, eyeCanvas.height);
    
    const card = document.querySelector('.card').getBoundingClientRect();
    const eyeX = card.left + card.width / 2;
    const eyeY = card.top + 100;
    const eyeSize = 80;

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

    let angle = Math.atan2(mouse.y - eyeY, mouse.x - eyeX);
    let dist = Math.min(eyeSize / 2.5, Math.hypot(mouse.x - eyeX, mouse.y - eyeY) / 10);
    let pupilX = eyeX + Math.cos(angle) * dist;
    let pupilY = eyeY + Math.sin(angle) * dist;

    ectx.save();
    ectx.translate(pupilX, pupilY);
    ectx.scale(0.5, 1);
    ectx.fillStyle = "#ffcc00";
    ectx.beginPath();
    ectx.arc(0, 0, eyeSize / 1.5, 0, Math.PI * 2);
    ectx.fill();
    ectx.restore();
    
    ectx.fillStyle = "#ff4500";
    ectx.beginPath();
    ectx.arc(pupilX, pupilY, 5, 0, Math.PI * 2);
    ectx.fill();

    requestAnimationFrame(drawDragonEye);
}

// --- OLAY İZLEYİCİLER ---
document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (!document.body.classList.contains('dragon-theme')) {
        glow.style.display = "block";
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    } else {
        glow.style.display = "none";
    }
});

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dragon-theme');
    if (document.body.classList.contains('dragon-theme')) {
        themeBtn.innerText = "Terraria Modu";
        drawDragonEye();
    } else {
        themeBtn.innerText = "Ejderha Modu";
        animateParticles();
    }
});

// Başlat
animateParticles();
