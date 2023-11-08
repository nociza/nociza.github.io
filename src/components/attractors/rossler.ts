const a = 0.2;
const b = 0.2;
const c = 5.7;
const dt = 0.05;
const maxTrailLength = 1000; // Adjust as needed

class RosslerAttractor {
  trail: {
    x: number;
    y: number;
    z: number;
    dx: number;
    dy: number;
    dz: number;
  }[];

  constructor() {
    this.trail = [];
  }

  addPoint(
    x: number,
    y: number,
    z: number,
    dx: number,
    dy: number,
    dz: number
  ) {
    this.trail.push({ x, y, z, dx, dy, dz });
    while (this.trail.length > maxTrailLength) {
      this.trail.shift(); // Remove the oldest segment
    }
  }

  update() {
    for (let i = 0; i < this.trail.length - 1; i++) {
      let point = this.trail[i];
      point.dx = -point.y - point.z;
      point.dy = point.x + a * point.y;
      point.dz = b + point.z * (point.x - c);
      point.x += point.dx * dt;
      point.y += point.dy * dt;
      point.z += point.dz * dt;
    }
  }
}

export default function rosslerAttractor() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const attractor = new RosslerAttractor();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    attractor.update();
    for (let i = 0; i < attractor.trail.length - 1; i++) {
      const point = attractor.trail[i];
      ctx.strokeStyle = `hsl(${(point.z * 360) / 30}, 100%, 50%)`;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 + point.x, canvas.height / 2 + point.y);
      ctx.lineTo(
        canvas.width / 2 + attractor.trail[i + 1].x,
        canvas.height / 2 + attractor.trail[i + 1].y
      );
      ctx.stroke();
    }
  }

  document.addEventListener("mousemove", (event) => {
    const canvasRect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;

    if (
      mouseX >= 0 &&
      mouseX <= canvasRect.width &&
      mouseY >= 0 &&
      mouseY <= canvasRect.height
    ) {
      const canvasX = mouseX;
      const canvasY = mouseY;

      attractor.addPoint(
        (canvasX - canvas.width / 2) / 10,
        (canvasY - canvas.height / 2) / 10,
        0, // Initial z value
        0,
        0,
        0 // Initial velocities
      );
    }
  });

  function animate() {
    draw();
    requestAnimationFrame(animate);
  }

  animate();
}
