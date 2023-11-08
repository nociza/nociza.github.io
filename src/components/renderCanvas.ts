const sigma = 10;
const rho = 28;
const beta = 8 / 3;
const dt = 0.01;
const maxTrailLength = 1000; // This will make the segments extremely short

class LorenzAttractor {
  trail: { x: number; y: number; z: number }[];

  constructor() {
    this.trail = [];
  }

  addPoint(x: number, y: number, z: number) {
    this.trail.push({ x, y, z });
    while (this.trail.length > maxTrailLength) {
      this.trail.shift(); // Remove the oldest segment
    }
  }

  update() {
    // Update all points except for the last one which follows the mouse
    for (let i = 0; i < this.trail.length - 1; i++) {
      let point = this.trail[i];
      let dx = sigma * (point.y - point.x) * dt;
      let dy = (point.x * (rho - point.z) - point.y) * dt;
      let dz = (point.x * point.y - beta * point.z) * dt;
      point.x += dx;
      point.y += dy;
      point.z += dz;
    }
  }
}

export default function renderCanvas() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const line = new LorenzAttractor();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    line.update();
    // Draw each segment
    for (let i = 0; i < line.trail.length - 1; i++) {
      ctx.beginPath();
      // Draw a small line segment (point)
      ctx.arc(
        canvas.width / 2 + line.trail[i].x * 10,
        canvas.height / 2 + line.trail[i].y * 10,
        4, // radius
        0, // start angle
        2 * Math.PI // end angle
      );
      ctx.fill();
    }
  }

  canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;

    line.addPoint(
      (mouseX - canvas.width / 2) / 10,
      (mouseY - canvas.height / 2) / 10,
      0 // For a 2D effect, the z value can remain constant
    );
  });

  function animate() {
    draw();
    requestAnimationFrame(animate);
  }

  animate();
}
