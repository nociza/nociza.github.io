const sigma = 10;
const rho = 28;
const beta = 8 / 3;
const dt = 0.01;
const maxTrailLength = 1000; // Maximum number of segments for the trail
const K = 60; // Max points per second
const pointGenerationInterval = 1000 / K; // Interval in milliseconds
let lastPointTime = 0; // Last time a point was added

class LorenzAttractor {
  trail: { x: number; y: number; z: number; velocity: number }[];

  constructor() {
    this.trail = [];
  }

  addPoint(x: number, y: number, z: number, velocity: number) {
    this.trail.push({ x, y, z, velocity });
    while (this.trail.length > maxTrailLength) {
      this.trail.shift(); // Remove the oldest segment
    }
  }

  update() {
    for (let i = 0; i < this.trail.length - 1; i++) {
      let point = this.trail[i];
      let dx = sigma * (point.y - point.x) * dt;
      let dy = (point.x * (rho - point.z) - point.y) * dt;
      let dz = (point.x * point.y - beta * point.z) * dt;
      point.x += dx;
      point.y += dy;
      point.z += dz;
      point.velocity = Math.sqrt(dx * dx + dy * dy + dz * dz); // Calculate velocity
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
    for (let i = 0; i < line.trail.length - 1; i++) {
      const point = line.trail[i];
      ctx.fillStyle = getVelocityColor(point.velocity);
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2 + point.x * 10,
        canvas.height / 2 + point.y * 10,
        4, // radius
        0, // start angle
        2 * Math.PI // end angle
      );
      ctx.fill();
    }
  }

  function getVelocityColor(velocity: number): string {
    // Convert velocity to a color
    const normalizedVelocity = Math.min(velocity, 20); // Cap the velocity so color doesn't go too bright
    const hue = (normalizedVelocity / 20) * 240; // Map velocity to 0-240 degrees of the hue (red to blue spectrum)
    return `hsl(${240 - hue}, 100%, 50%)`; // 240 is blue in HSL, 0 is red
  }

  canvas.addEventListener("mousemove", (event) => {
    const currentTime = performance.now();
    if (currentTime - lastPointTime > pointGenerationInterval) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const mouseX = (event.clientX - rect.left) * scaleX;
      const mouseY = (event.clientY - rect.top) * scaleY;
      const velocity = 0; // Initial velocity of a new point is 0

      line.addPoint(
        (mouseX - canvas.width / 2) / 10,
        (mouseY - canvas.height / 2) / 10,
        0, // Z value is not used for a 2D effect
        velocity
      );
      lastPointTime = currentTime;
    }
  });

  function animate() {
    draw();
    requestAnimationFrame(animate);
  }

  animate();
}
