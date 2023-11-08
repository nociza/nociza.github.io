interface IPosition {
  x: number;
  y: number;
  z: number;
}

const mouse: IPosition = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  z: 0,
};

class Point {
  position: IPosition;
  velocity: IPosition;
  sigma: number;
  rho: number;
  beta: number;
  dt: number;

  constructor(x: number, y: number, z: number) {
    this.position = { x, y, z };
    this.velocity = { x: 0, y: 0, z: 0 };
    this.sigma = 10;
    this.rho = 28;
    this.beta = 8 / 3;
    this.dt = 0.01;
  }

  update(): void {
    // Compute the Lorenz attractor
    let dx = this.sigma * (this.position.y - this.position.x);
    let dy = this.position.x * (this.rho - this.position.z) - this.position.y;
    let dz = this.position.x * this.position.y - this.beta * this.position.z;

    // Update velocities based on acceleration
    this.velocity.x += dx * this.dt;
    this.velocity.y += dy * this.dt;
    this.velocity.z += dz * this.dt;

    // Update positions based on velocity
    this.position.x += this.velocity.x * this.dt;
    this.position.y += this.velocity.y * this.dt;
    this.position.z += this.velocity.z * this.dt;
  }
}

class Line {
  points: Point[];
  trailLength: number;
  ctx: CanvasRenderingContext2D;
  scale: number;
  offsetX: number;
  offsetY: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    trailLength: number = 100,
    scale: number = 0.000000000000001
  ) {
    this.ctx = ctx;
    this.trailLength = trailLength;
    this.points = [];
    this.scale = scale;
    this.offsetX = ctx.canvas.width / 2;
    this.offsetY = ctx.canvas.height / 2;

    // Initialize the first node where the mouse is located
    this.points.push(new Point(mouse.x, mouse.y, 0));
    // Initialize the rest of the points
    for (let i = 1; i < this.trailLength; i++) {
      this.points.push(new Point(mouse.x, mouse.y, 0));
    }
  }

  update(mouse: IPosition): void {
    // Directly set the first point to follow the mouse
    this.points[0].position.x = mouse.x;
    this.points[0].position.y = mouse.y;

    // Update the rest of the points based on the Lorenz attractor
    for (let i = 1; i < this.points.length; i++) {
      this.points[i].update();
    }
  }

  draw(): void {
    this.ctx.strokeStyle = "rgba(255, 0, 0, 0.6)";
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.moveTo(
      this.points[0].position.x * this.scale + this.offsetX,
      this.points[0].position.y * this.scale + this.offsetY
    );
    for (let i = 1; i < this.points.length; i++) {
      this.ctx.lineTo(
        this.points[i].position.x * this.scale + this.offsetX,
        this.points[i].position.y * this.scale + this.offsetY
      );
    }
    this.ctx.stroke();
  }
}

// Assuming other necessary functions like render, resizeCanvas, etc. are defined
export default function renderCanvas() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d")!;
  const line = new Line(ctx, 1000);

  canvas.addEventListener("mousemove", (event: MouseEvent) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });

  function animate(): void {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    line.update(mouse);
    line.draw();
  }

  animate();
}
