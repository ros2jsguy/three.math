import type { Box3 } from './Box3';
import { Vector2 } from './Vector2';
import { Vector3 } from './Vector3';
import { Plane } from './Plane';
import { Base } from './Base';

const _v0 = new Vector3();
const _v1 = new Vector3();
const _v2 = new Vector3();
const _v3 = new Vector3();

const _vab = new Vector3();
const _vac = new Vector3();
const _vbc = new Vector3();
const _vap = new Vector3();
const _vbp = new Vector3();
const _vcp = new Vector3();

/**
 * A geometric triangle as defined by three Vector3s representing its three corners.
 */
export class Triangle extends Base {

  /**
   * 
   * @param a 
   * @param b 
   * @param c 
   * @param target 
   * @returns 
   */
  static getNormal(a: Vector3, b: Vector3, c: Vector3, target = new Vector3()): Vector3 {
    target.subVectors(c, b);
    _v0.subVectors(a, b);
    target.cross(_v0);

    const targetLengthSq = target.lengthSq();
    if (targetLengthSq > 0) {
      return target.multiplyScalar(1 / Math.sqrt(targetLengthSq));
    }

    return target.set(0, 0, 0);
  }

  /**
   * 
   * @param point 
   * @param a 
   * @param b 
   * @param c 
   * @param target 
   * @returns 
   */
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  // eslint-disable-next-line max-len
  static getBarycoord(point: Vector3, a: Vector3, b: Vector3, c: Vector3, target = new Vector3()): Vector3 {
    _v0.subVectors(c, a);
    _v1.subVectors(b, a);
    _v2.subVectors(point, a);

    const dot00 = _v0.dot(_v0);
    const dot01 = _v0.dot(_v1);
    const dot02 = _v0.dot(_v2);
    const dot11 = _v1.dot(_v1);
    const dot12 = _v1.dot(_v2);

    const denom = (dot00 * dot11 - dot01 * dot01);

    // collinear or singular triangle
    if (denom === 0) {
      // arbitrary location outside of triangle?
      // not sure if this is the best idea, maybe should be returning undefined
      return target.set(-2, -1, -1);
    }

    const invDenom = 1 / denom;
    const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

    // barycentric coordinates must always sum to 1
    return target.set(1 - u - v, v, u);
  }

  static containsPoint(point: Vector3, a: Vector3, b: Vector3, c: Vector3): boolean {
    this.getBarycoord(point, a, b, c, _v3);

    return (_v3.x >= 0) && (_v3.y >= 0) && ((_v3.x + _v3.y) <= 1);
  }

  static getUV(point: Vector3, p1: Vector3, p2: Vector3, p3: Vector3,
    uv1: Vector2, uv2: Vector2, uv3: Vector2, target: Vector2): Vector2 {
    this.getBarycoord(point, p1, p2, p3, _v3);

    target.set(0, 0);
    target.addScaledVector(uv1, _v3.x);
    target.addScaledVector(uv2, _v3.y);
    target.addScaledVector(uv3, _v3.z);

    return target;
  }

  static isFrontFacing(a: Vector3, b: Vector3, c: Vector3, direction: Vector3): boolean {
    _v0.subVectors(c, b);
    _v1.subVectors(a, b);

    // strictly front facing
    return (_v0.cross(_v1).dot(direction) < 0);
  }

  /**
   * The first corner of the triangle. Default is a Vector3 at (0, 0, 0).
   */
  a: Vector3;

  /**
   * The second corner of the triangle. Default is a Vector3 at (0, 0, 0).
   */
  b: Vector3;

  /**
   * The final corner of the triangle. Default is a Vector3 at (0, 0, 0).
   */
  c: Vector3;

  /**
   * Creates a new Triangle.
   * @param a - The first corner of the triangle. Default is a Vector3 at (0, 0, 0).
   * @param b - The second corner of the triangle. Default is a Vector3 at (0, 0, 0).
   * @param c - The third corner of the triangle. Default is a Vector3 at (0, 0, 0).
   */
  constructor(a = new Vector3(), b = new Vector3(), c = new Vector3()) {
    super();
    this.a = a;
    this.b = b;
    this.c = c;
  }

  /**
   * Read-only flag to check if a given object is of type Triangle.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isTriangle(): boolean {
    return true;
  }

  /**
   * Sets the triangle's a, b and c properties to the passed vector3s.
   * Please note that this method only copies the values from the given objects.
   * @param a - The first point
   * @param b - The second point
   * @param c - The third point.
   * @returns This instance.
   */
  set(a: Vector3, b: Vector3, c: Vector3): this {
    this.a.copy(a);
    this.b.copy(b);
    this.c.copy(c);

    return this;
  }

  /**
   * Sets the triangle's vectors to the vectors in the array.
   * @param points - Array of Vector3s
   * @param i0 - index into points array
   * @param i1 - index into points array
   * @param i2 - index into points array
   * @returns This instance
   */
  setFromPointsAndIndices(points: Vector3[], i0: number, i1: number, i2: number): this {
    this.a.copy(points[i0]);
    this.b.copy(points[i1]);
    this.c.copy(points[i2]);

    return this;
  }

  /**
   * Create a new triangle with the same a, b and c properties as this one.
   * @returns A new Triangle instance equal to this triangle.
   */
  clone(): Triangle {
    return new Triangle().copy(this);
  }

  /**
   * Copies the values of the passed triangles's a, b and c properties to this triangle.
   * @param triangle - The source triangle.
   * @returns This instance.
   */
  copy(triangle: Triangle): this {
    this.a.copy(triangle.a);
    this.b.copy(triangle.b);
    this.c.copy(triangle.c);

    return this;
  }

  /**
   * Copmute the area of the triangle.
   * @returns The area of the triangle.
   */
  getArea(): number {
    _v0.subVectors(this.c, this.b);
    _v1.subVectors(this.a, this.b);

    return _v0.cross(_v1).length() * 0.5;
  }

  /**
   * Calculate the midpoint of the triangle.
   * @param target - (Optional) The result will be copied into this Vector3.
   * @returns The midpoint.
   */
  getMidpoint(target = new Vector3()): Vector3 {
    return target.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }

  /**
   * Calculate the normal vector of the triangle.
   * @param target - (Optional) The result will be copied into this Vector3.
   * @returns The normal vector.
   */
  getNormal(target?: Vector3): Vector3 {
    return Triangle.getNormal(this.a, this.b, this.c, target);
  }

  /**
   * Calculate a plane based on the triangle. .
   * @param target - (Optional) The result will be copied into this Plane.
   * @returns The plane.
   */
  getPlane(target = new Plane()): Plane {
    return target.setFromCoplanarPoints(this.a, this.b, this.c);
  }

  /**
   * Compute a barycentric coordinate from the given vector.
   * @param point - Vector3
   * @param target - (Optional) The result will be copied into this Vector3.
   * @returns The barycentric coordinate.
   */
  getBarycoord(point: Vector3, target: Vector3 = new Vector3()): Vector3 {
    return Triangle.getBarycoord(point, this.a, this.b, this.c, target);
  }

  /**
   * Compute the uv coordinates for the given point on the triangle.
   * @param point - The point on the triangle.
   * @param uv1 - The uv coordinate of the triangle's first vertex.
   * @param uv2 - The uv coordinate of the triangle's second vertex.
   * @param uv3 - The uv coordinate of the triangle's third vertex.
   * @param target — (optional) The result will be copied into this Vector2
   * @returns The UV coordinate
   */
  getUV(point: Vector3, uv1: Vector2, uv2: Vector2, uv3: Vector2, target: Vector2 =  new Vector2()): Vector2 {
    return Triangle.getUV(point, this.a, this.b, this.c, uv1, uv2, uv3, target);
  }

  /**
   * Determine if a point, when projected onto the
   * plane of the triangle, lies within the triangle.
   * @param point - Vector3 to check.
   * @returns True if the triangle contains the point.
   */
  containsPoint(point: Vector3): boolean {
    return Triangle.containsPoint(point, this.a, this.b, this.c);
  }

  /**
   * Determine if the triangle is oriented towards the given direction or not.
   * @param direction  - The direction to test.
   * @returns True if the triangle is oriented towards the direction parameter.
   */
  isFrontFacing(direction: Vector3): boolean {
    return Triangle.isFrontFacing(this.a, this.b, this.c, direction);
  }

  /**
   * Determines whether or not this triangle intersects box.
   * @param box - Box to check for intersection against.
   * @returns True if the box intersects this triangle.
   */
  intersectsBox(box: Box3): boolean {
    return box.intersectsTriangle(this);
  }

  /**
   * Returns the closest point on the triangle to point.
   * 
   * Algorithm thanks to Real-Time Collision Detection by Christer Ericson,
   * published by Morgan Kaufmann Publishers, (c) 2005 Elsevier Inc.,
   * under the accompanying license; see chapter 5.1.5 for detailed explanation.
   * basically, we're distinguishing which of the voronoi regions of the triangle
   * the point lies in with the minimum amount of redundant computation.

   * @param pt - Vector3
   * @param target — (Optional) The result will be copied into this Vector3.
   * @returns The closest point.
   */
  closestPointToPoint(pt: Vector3, target = new Vector3()): Vector3 {
    const { a, b, c } = this;
    let v; let w;

    _vab.subVectors(b, a);
    _vac.subVectors(c, a);
    _vap.subVectors(pt, a);
    const d1 = _vab.dot(_vap);
    const d2 = _vac.dot(_vap);
    if (d1 <= 0 && d2 <= 0) {
      // vertex region of A; barycentric coords (1, 0, 0)
      return target.copy(a);
    }

    _vbp.subVectors(pt, b);
    const d3 = _vab.dot(_vbp);
    const d4 = _vac.dot(_vbp);
    if (d3 >= 0 && d4 <= d3) {
      // vertex region of B; barycentric coords (0, 1, 0)
      return target.copy(b);
    }

    const vc = d1 * d4 - d3 * d2;
    if (vc <= 0 && d1 >= 0 && d3 <= 0) {
      v = d1 / (d1 - d3);
      // edge region of AB; barycentric coords (1-v, v, 0)
      return target.copy(a).addScaledVector(_vab, v);
    }

    _vcp.subVectors(pt, c);
    const d5 = _vab.dot(_vcp);
    const d6 = _vac.dot(_vcp);
    if (d6 >= 0 && d5 <= d6) {
      // vertex region of C; barycentric coords (0, 0, 1)
      return target.copy(c);
    }

    const vb = d5 * d2 - d1 * d6;
    if (vb <= 0 && d2 >= 0 && d6 <= 0) {
      w = d2 / (d2 - d6);
      // edge region of AC; barycentric coords (1-w, 0, w)
      return target.copy(a).addScaledVector(_vac, w);
    }

    const va = d3 * d6 - d5 * d4;
    if (va <= 0 && (d4 - d3) >= 0 && (d5 - d6) >= 0) {
      _vbc.subVectors(c, b);
      w = (d4 - d3) / ((d4 - d3) + (d5 - d6));
      // edge region of BC; barycentric coords (0, 1-w, w)
      return target.copy(b).addScaledVector(_vbc, w); // edge region of BC
    }

    // face region
    const denom = 1 / (va + vb + vc);
    // u = va * denom
    v = vb * denom;
    w = vc * denom;

    return target.copy(a).addScaledVector(_vab, v).addScaledVector(_vac, w);
  }

  /**
   * Determing if the two triangles have identical a, b and c properties.
   * @param triangle - The source triangle 
   * @returns True if triangle has the same component values as this triangle.
   */
  equals(triangle: Triangle): boolean {
    return triangle.a.equals(this.a) && triangle.b.equals(this.b) && triangle.c.equals(this.c);
  }
}

