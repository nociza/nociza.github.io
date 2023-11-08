const sigma = 10;
const rho = 28;
const beta = 8 / 3;
const dt = 0.01;
const maxTrailLength = 1000; // Maximum number of segments for the trail
const maxSpeed = 20; // Define a max speed for color scaling

class LorenzAttractor {
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
      point.dx = sigma * (point.y - point.x) * dt;
      point.dy = (point.x * (rho - point.z) - point.y) * dt;
      point.dz = (point.x * point.y - beta * point.z) * dt;
      point.x += point.dx;
      point.y += point.dy;
      point.z += point.dz;
    }
  }
}

export default function lorenzAttractor() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const line = new LorenzAttractor();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    line.update();
    for (let i = 0; i < line.trail.length - 1; i++) {
      const point = line.trail[i];
      const speed = Math.sqrt(
        point.dx * point.dx + point.dy * point.dy + point.dz * point.dz
      );
      const normalizedSpeed = Math.min(speed, maxSpeed); // Normalize speed for color calculation
      ctx.strokeStyle = getVelocityColor(normalizedSpeed);
      ctx.beginPath();
      ctx.moveTo(
        canvas.width / 2 + point.x * 10,
        canvas.height / 2 + point.y * 10
      );
      // Draw the tail in the opposite direction of the velocity
      ctx.lineTo(
        canvas.width / 2 + point.x * 10 - point.dx * 10,
        canvas.height / 2 + point.y * 10 - point.dy * 10
      );
      ctx.stroke();
    }
  }

  function getVelocityColor(speed: number): string {
    // Convert speed to a color
    const hue = (1 - speed / maxSpeed) * 240; // Map speed to 0-240 degrees of the hue (blue to red spectrum)
    return `hsl(${hue}, 100%, 50%)`; // Lower speed is blue, higher speed is red
  }

  document.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // The velocity components for a new point are initially 0
    line.addPoint(
      (mouseX - canvas.width / 2) / 10,
      (mouseY - canvas.height / 2) / 10,
      0, // Z value is not used for a 2D effect
      0,
      0,
      0
    );
  });

  function animate() {
    draw();
    requestAnimationFrame(animate);
  }

  animate();
}
