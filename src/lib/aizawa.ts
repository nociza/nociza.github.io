export type AizawaPoint = readonly [number, number, number];

// Standard Aizawa parameters and initial condition; integrate with RK4 at dt=0.01.
// https://www.frontiersin.org/journals/big-data/articles/10.3389/fdata.2024.1506443/full
function derivative([x, y, z]: AizawaPoint): AizawaPoint {
  return [
    (z - 0.7) * x - 3.5 * y,
    3.5 * x + (z - 0.7) * y,
    0.6 + 0.95 * z - z ** 3 / 3 - (x * x + y * y) * (1 + 0.25 * z) + 0.1 * z * x ** 3,
  ];
}

function offset(point: AizawaPoint, delta: AizawaPoint, step: number): AizawaPoint {
  return [point[0] + delta[0] * step, point[1] + delta[1] * step, point[2] + delta[2] * step];
}

export function createAizawaTrajectory(): AizawaPoint[] {
  const points: AizawaPoint[] = [];
  let point: AizawaPoint = [0.1, 0, 0.1];
  const step = 0.01;

  for (let index = 0; index < 9500; index++) {
    const k1 = derivative(point);
    const k2 = derivative(offset(point, k1, step / 2));
    const k3 = derivative(offset(point, k2, step / 2));
    const k4 = derivative(offset(point, k3, step));
    const next = (axis: number) => point[axis] + step * (k1[axis] + 2 * k2[axis] + 2 * k3[axis] + k4[axis]) / 6;
    point = [next(0), next(1), next(2)];

    // Discard the initial transient; keep a bounded, inexpensive drawing buffer.
    if (index >= 500 && index % 2 === 0) points.push(point);
  }

  return points;
}
