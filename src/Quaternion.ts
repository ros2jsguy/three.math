import { MathUtils } from './MathUtils';
import type { Euler } from './Euler';
import type{ Matrix4 } from './Matrix4';
import type { Vector3 } from './Vector3';
import { Base } from './Base';

/**
 * Implementation of a quaternion.
 * Quaternions are used to represent rotations.
 *
 * @example
 * ```
 * const quaternion = new Quaternion();
 * quaternion.setFromAxisAngle( new Vector3( 0, 1, 0 ), Math.PI / 2 );
 *
 * const vector = new Vector3( 1, 0, 0 );
 * vector.applyQuaternion( quaternion );
 * ```
 */
export class Quaternion extends Base {

  /**
   * This SLERP implementation assumes the quaternion data are managed in flat arrays.
   * @param dist - The output array.
   * @param dstOffset - An offset into the output array.
   * @param src0 - The source array of the starting quaternion.
   * @param srcOffset0 - An offset into the array src0.
   * @param src1 -The source array of the target quatnerion.
   * @param srcOffset1 - An offset into the array src1.
   * @param t - Normalized interpolation factor (between 0 and 1).
   */
   static slerpFlat( dst: number[], dstOffset: number, 
        src0: number[], srcOffset0: number, 
        src1: number[], srcOffset1: number, 
        t: number ): void {

    // fuzz-free, array-based Quaternion SLERP operation

    let x0 = src0[ srcOffset0 + 0 ],
      y0 = src0[ srcOffset0 + 1 ],
      z0 = src0[ srcOffset0 + 2 ],
      w0 = src0[ srcOffset0 + 3 ];

    const x1 = src1[ srcOffset1 + 0 ],
      y1 = src1[ srcOffset1 + 1 ],
      z1 = src1[ srcOffset1 + 2 ],
      w1 = src1[ srcOffset1 + 3 ];

    if ( t === 0 ) {

      dst[ dstOffset + 0 ] = x0;
      dst[ dstOffset + 1 ] = y0;
      dst[ dstOffset + 2 ] = z0;
      dst[ dstOffset + 3 ] = w0;
      return;

    }

    if ( t === 1 ) {

      dst[ dstOffset + 0 ] = x1;
      dst[ dstOffset + 1 ] = y1;
      dst[ dstOffset + 2 ] = z1;
      dst[ dstOffset + 3 ] = w1;
      return;

    }

    if ( w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1 ) {

      let s = 1 - t;
      const cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,
        dir = ( cos >= 0 ? 1 : - 1 ),
        sqrSin = 1 - cos * cos;

      // Skip the Slerp for tiny steps to avoid numeric problems:
      if ( sqrSin > Number.EPSILON ) {

        const sin = Math.sqrt( sqrSin ),
          len = Math.atan2( sin, cos * dir );

        s = Math.sin( s * len ) / sin;
        t = Math.sin( t * len ) / sin;

      }

      const tDir = t * dir;

      x0 = x0 * s + x1 * tDir;
      y0 = y0 * s + y1 * tDir;
      z0 = z0 * s + z1 * tDir;
      w0 = w0 * s + w1 * tDir;

      // Normalize in case we just did a lerp:
      if ( s === 1 - t ) {

        const f = 1 / Math.sqrt( x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0 );

        x0 *= f;
        y0 *= f;
        z0 *= f;
        w0 *= f;

      }

    }

    dst[ dstOffset ] = x0;
    dst[ dstOffset + 1 ] = y0;
    dst[ dstOffset + 2 ] = z0;
    dst[ dstOffset + 3 ] = w0;

  }

  /**
   * Multiply 2 quaterions.
   * This multiplication implementation assumes the quaternion data are managed in flat arrays.
   * 
   * @param dst - The output array.
   * @param dstOffset - An offset into the output array.
   * @param src0 - The source array of the starting quaternion.
   * @param srcOffset0 - An offset into the array src0.
   * @param src1 - The source array of the target quaternion.
   * @param srcOffset1 - An offset into the array src1.
   */
  static multiplyQuaternionsFlat( dst: number[], dstOffset: number, 
        src0: number[], srcOffset0: number,
        src1: number[], srcOffset1: number ) {

    const x0 = src0[ srcOffset0 ];
    const y0 = src0[ srcOffset0 + 1 ];
    const z0 = src0[ srcOffset0 + 2 ];
    const w0 = src0[ srcOffset0 + 3 ];

    const x1 = src1[ srcOffset1 ];
    const y1 = src1[ srcOffset1 + 1 ];
    const z1 = src1[ srcOffset1 + 2 ];
    const w1 = src1[ srcOffset1 + 3 ];

    dst[ dstOffset ] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
    dst[ dstOffset + 1 ] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
    dst[ dstOffset + 2 ] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
    dst[ dstOffset + 3 ] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;

    return dst;

  }

  _x: number;
  _y: number;
  _z: number;
  _w: number;

  /**
   * Create a new instance. Default is a unit quaternion
   * @param x - x coordinate
   * @param y - y coordinate
   * @param z - z coordinate
   * @param w - w coordinate
   */
  constructor(x = 0, y = 0, z = 0, w = 1) {
    super();
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
  }

  /**
   * Read-only flag to check if a given object is of type Quaternion.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isQuaternion(): boolean {
    return true;
  }

  get x() {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
    this._onChangeCallback();
  }

  get y() {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
    this._onChangeCallback();
  }

  get z() {
    return this._z;
  }

  set z(value: number) {
    this._z = value;
    this._onChangeCallback();
  }

  get w() {
    return this._w;
  }

  set w(value: number) {
    this._w = value;
    this._onChangeCallback();
  }

  /**
   * Sets x, y, z, w properties of this quaternion.
   * @param x
   * @param y
   * @param z
   * @param w
   * @returns This instance.
   */
  set(x: number, y: number, z: number, w: number): this {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;

    this._onChangeCallback();

    return this;
  }

  /**
   * Creates a new Quaternion with identical x, y, z and w properties to this one.
   * @returns A new instance.
   */
  clone(): Quaternion {
    return new Quaternion(this._x, this._y, this._z, this._w);
  }

  /**
   * Copies the x, y, z and w properties of q into this quaternion.
   * @param quaternion
   * @returns This instance.
   */
  copy(quaternion: Quaternion): this {
    this._x = quaternion.x;
    this._y = quaternion.y;
    this._z = quaternion.z;
    this._w = quaternion.w;

    this._onChangeCallback();

    return this;
  }

  /**
   * Sets this quaternion from the rotation specified by Euler angle.
   * @param euler
   * @returns This instance.
   */
  setFromEuler(euler: Euler, update?: boolean): this {
    if (!(euler && euler.isEuler)) {
      throw new Error('THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.');
    }

    const x = euler._x; const y = euler._y; const z = euler._z; const
      order = euler._order;

    // http://www.mathworks.com/matlabcentral/fileexchange/
    // 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
    //	content/SpinCalc.m

    const { cos } = Math;
    const { sin } = Math;

    const c1 = cos(x / 2);
    const c2 = cos(y / 2);
    const c3 = cos(z / 2);

    const s1 = sin(x / 2);
    const s2 = sin(y / 2);
    const s3 = sin(z / 2);

    switch (order) {
      case 'XYZ':
        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;

      case 'YXZ':
        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;
        break;

      case 'ZXY':
        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;

      case 'ZYX':
        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;
        break;

      case 'YZX':
        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;

      case 'XZY':
        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;
        break;

      default:
        console.warn(`THREE.Quaternion: .setFromEuler() encountered an unknown order: ${ order}`);
    }

    if (update !== false) this._onChangeCallback();

    return this;
  }

  /**
   * Sets this quaternion from rotation specified by axis and angle.
   * Axis is assumed to be normalized, angle is in radians.
   * @see http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
   * @param axis
   * @param angle
   * @returns This instance.
   */
  setFromAxisAngle(axis: Vector3, angle: number): this {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

    // assumes axis is normalized

    const halfAngle = angle / 2; const
      s = Math.sin(halfAngle);

    this._x = axis.x * s;
    this._y = axis.y * s;
    this._z = axis.z * s;
    this._w = Math.cos(halfAngle);

    this._onChangeCallback();

    return this;
  }

  /**
   * Sets this quaternion from rotation component of m.
   * @param m - a Matrix4 of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @returns This instance.
   */
  setFromRotationMatrix(m: Matrix4): this {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

    // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

    const te = m.elements;

    const m11 = te[0]; const m12 = te[4]; const m13 = te[8];
    const m21 = te[1]; const m22 = te[5]; const m23 = te[9];
    const m31 = te[2]; const m32 = te[6]; const m33 = te[10];

    const trace = m11 + m22 + m33;

    if (trace > 0) {
      const s = 0.5 / Math.sqrt(trace + 1.0);

      this._w = 0.25 / s;
      this._x = (m32 - m23) * s;
      this._y = (m13 - m31) * s;
      this._z = (m21 - m12) * s;
    } else if (m11 > m22 && m11 > m33) {
      const s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);

      this._w = (m32 - m23) / s;
      this._x = 0.25 * s;
      this._y = (m12 + m21) / s;
      this._z = (m13 + m31) / s;
    } else if (m22 > m33) {
      const s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);

      this._w = (m13 - m31) / s;
      this._x = (m12 + m21) / s;
      this._y = 0.25 * s;
      this._z = (m23 + m32) / s;
    } else {
      const s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);

      this._w = (m21 - m12) / s;
      this._x = (m13 + m31) / s;
      this._y = (m23 + m32) / s;
      this._z = 0.25 * s;
    }

    this._onChangeCallback();

    return this;
  }

  /**
   * Sets this quaternion to the rotation required to rotate direction
   * vector vFrom to direction vector vTo.
   * @param vFrom
   * @param vTo
   * @returns This instance.
   */
  setFromUnitVectors(vFrom: Vector3, vTo: Vector3): this {
    // assumes direction vectors vFrom and vTo are normalized

    let r = vFrom.dot(vTo) + 1;

    if (r < Number.EPSILON) {
      // vFrom and vTo point in opposite directions

      r = 0;

      if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
        this._x = -vFrom.y;
        this._y = vFrom.x;
        this._z = 0;
        this._w = r;
      } else {
        this._x = 0;
        this._y = -vFrom.z;
        this._z = vFrom.y;
        this._w = r;
      }
    } else {
      // crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3

      this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
      this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
      this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
      this._w = r;
    }

    return this.normalize();
  }

  /**
   * Find the angle between this quaternion and quaternion q in radians.
   * @param q
   * @returns The angle.
   */
  angleTo(q: Quaternion): number {
    return 2 * Math.acos(Math.abs(MathUtils.clamp(this.dot(q), -1, 1)));
  }

  /**
   * Rotates this quaternion by a given angular step to the defined quaternion q.
   * The method ensures that the final quaternion will not overshoot q.
   * @param q - THe target quaternion
   * @param step - The angular step in radians
   * @returns This instance.
   */
  rotateTowards(q: Quaternion, step: number): this {
    const angle = this.angleTo(q);

    if (angle === 0) return this;

    const t = Math.min(1, step / angle);

    this.slerp(q, t);

    return this;
  }

  /**
   * Sets this quaternion to the identity quaternion; that is,
   * to the quaternion that represents "no rotation".
   * @returns This instance
   */
  identity(): this {
    return this.set(0, 0, 0, 1);
  }

  /**
   * Inverts this quaternion - calculates the conjugate.
   * The quaternion is assumed to have unit length.
   * @returns This instance.
   */
  invert(): this {
    // quaternion is assumed to have unit length

    return this.conjugate();
  }

  /**
   * Compute the rotational conjugate of this quaternion.
   * The conjugate of a quaternion represents the same rotation
   * in the opposite direction about the rotational axis.
   * @returns The conjugate quaternion.
   */
  conjugate(): this {
    this._x *= -1;
    this._y *= -1;
    this._z *= -1;

    this._onChangeCallback();

    return this;
  }

  /**
   * Calculates the dot product of quaternions v and this one.
   * @param v
   * @returns The dot product.
   */
  dot(v: Quaternion): number {
    return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
  }

  /**
   * Computes the squared Euclidean length (straight-line length) of this
   * quaternion, considered as a 4 dimensional vector. This can be useful
   * if you are comparing the lengths of two quaternions, as this is a
   * slightly more efficient calculation than length().
   * @returns The squared Euclidean length.
   */
  lengthSq(): number {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }

  /**
   * Computes the Euclidean length (straight-line length) of this quaternion,
   * considered as a 4 dimensional vector.
   * @returns The Euclidean length.
   */
  length(): number {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }

  /**
   * Normalizes this quaternion - that is, calculated the quaternion that
   * performs the same rotation as this one, but has length equal to 1.
   * @returns This instance.
   */
  normalize(): this {
    let l = this.length();

    if (l === 0) {
      this._x = 0;
      this._y = 0;
      this._z = 0;
      this._w = 1;
    } else {
      l = 1 / l;

      this._x *= l;
      this._y *= l;
      this._z *= l;
      this._w *= l;
    }

    this._onChangeCallback();

    return this;
  }

  /**
   * Multiplies this quaternion by q.
   * @param q
   * @returns This instance.
   */
  multiply(q: Quaternion): this {
    return this.multiplyQuaternions(this, q);
  }

  /**
   * Pre-multiplies this quaternion by q.
   * @param q
   * @returns This instance.
   */
  premultiply(q: Quaternion): this {
    return this.multiplyQuaternions(q, this);
  }

  /**
   * Sets this quaternion to a x b.
   * @param a
   * @param b
   * @returns This instance.
   */
  multiplyQuaternions(a: Quaternion, b: Quaternion): this {
    // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

    const qax = a._x; const qay = a._y; const qaz = a._z; const
      qaw = a._w;
    const qbx = b._x; const qby = b._y; const qbz = b._z; const
      qbw = b._w;

    this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
    this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
    this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
    this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

    this._onChangeCallback();

    return this;
  }

  /**
   * Handles the spherical linear interpolation between quaternions.
   * t represents the amount of rotation between this quaternion (where t is 0)
   * and qb (where t is 1). This quaternion is set to the result.
   * Also see the static version of the slerp below.
   * @param qb - The other quaternion rotation
   * @param t - interpolation factor in the closed interval [0, 1].
   * @returns This instance.
   */
  slerp(qb: Quaternion, t: number): this {
    if (t === 0) return this;
    if (t === 1) return this.copy(qb);

    const x = this._x; const y = this._y; const z = this._z; const
      w = this._w;

    // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

    let cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

    if (cosHalfTheta < 0) {
      this._w = -qb._w;
      this._x = -qb._x;
      this._y = -qb._y;
      this._z = -qb._z;

      cosHalfTheta = -cosHalfTheta;
    } else {
      this.copy(qb);
    }

    if (cosHalfTheta >= 1.0) {
      this._w = w;
      this._x = x;
      this._y = y;
      this._z = z;

      return this;
    }

    const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

    if (sqrSinHalfTheta <= Number.EPSILON) {
      const s = 1 - t;
      this._w = s * w + t * this._w;
      this._x = s * x + t * this._x;
      this._y = s * y + t * this._y;
      this._z = s * z + t * this._z;

      this.normalize();
      this._onChangeCallback();

      return this;
    }

    const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
    const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
    const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
    const ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

    this._w = (w * ratioA + this._w * ratioB);
    this._x = (x * ratioA + this._x * ratioB);
    this._y = (y * ratioA + this._y * ratioB);
    this._z = (z * ratioA + this._z * ratioB);

    this._onChangeCallback();

    return this;
  }

  /**
   * Performs a spherical linear interpolation between the given
   * quaternions and stores the result in this quaternion.
   * @param qa
   * @param qb
   * @param t
   * @returns This instance.
   */
  slerpQuaternions(qa: Quaternion, qb: Quaternion, t: number): this {
    this.copy(qa).slerp(qb, t);

    return this;
  }

  /**
   * Sets this quaternion to a uniformly random, normalized quaternion.
   * @returns This instance.
   */
  random(): this {

    // Derived from http://planning.cs.uiuc.edu/node198.html
    // Note, this source uses w, x, y, z ordering,
    // so we swap the order below.

    const u1 = Math.random();
    const sqrt1u1 = Math.sqrt( 1 - u1 );
    const sqrtu1 = Math.sqrt( u1 );

    const u2 = 2 * Math.PI * Math.random();

    const u3 = 2 * Math.PI * Math.random();

    return this.set(
      sqrt1u1 * Math.cos( u2 ),
      sqrtu1 * Math.sin( u3 ),
      sqrtu1 * Math.cos( u3 ),
      sqrt1u1 * Math.sin( u2 ),
    );
  }

  /**
   * Compares the x, y, z and w properties of v to the equivalent properties
   * of this quaternion to determine if they represent the same rotation.
   * @param quaternion - quaternion that this quaternion will be compared to.
   * @returns True when equivalance is found; false otherwise.
   */
  equals(quaternion: Quaternion): boolean {
    return (quaternion._x === this._x) && (quaternion._y === this._y)
    && (quaternion._z === this._z) && (quaternion._w === this._w);
  }

  /**
   * Sets this quaternion's x, y, z and w properties from an array.
   * @param array - array of format (x, y, z, w) used to construct the quaternion.
   * @param [offset] - an offset into the array.
   * @returns This instance.
   */
  fromArray(array: number[], offset = 0): this {
    this._x = array[offset];
    this._y = array[offset + 1];
    this._z = array[offset + 2];
    this._w = array[offset + 3];

    this._onChangeCallback();

    return this;
  }

  /**
   * Calculates the numerical elements of this quaternion
   * in an array of format [x, y, z, w].
   * @param array - An optional array to store the quaternion. If not specified, a new array will be created.
   * @param offset - if specified, the result will be copied into this Array.
   * @returns The array equivalent of this quaternion.
   */
  toArray(array: number[] = [], offset = 0): number[] {
    array[offset] = this._x;
    array[offset + 1] = this._y;
    array[offset + 2] = this._z;
    array[offset + 3] = this._w;

    return array;
  }

  _onChange(callback: () => void) {
    this._onChangeCallback = callback;

    return this;
  }

  _onChangeCallback() {}

  *[ Symbol.iterator ](): IterableIterator<number> {
    yield this._x;
    yield this._y;
    yield this._z;
    yield this._w;
  }
}

