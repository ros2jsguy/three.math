/* eslint-disable no-redeclare */
/* eslint-disable no-var */
/* global QUnit */

import { assert } from 'chai';

import { Plane } from '../lib/Plane';
import { Vector3 } from '../lib/Vector3';
import { Line3 } from '../lib/Line3';
import { Sphere } from '../lib/Sphere';
import { Box3 } from '../lib/Box3';
import { Matrix4 } from '../lib/Matrix4';
import {
  x,
  y,
  z,
  w,
  zero3,
  one3,
} from './Constants.tests';

function comparePlane(a, b, threshold = 0.0001) {
  return (a.normal.distanceTo(b.normal) < threshold &&
  Math.abs(a.constant - b.constant) < threshold);
}

describe('Plane', () => {
  // INSTANCING
  it('Instancing', () => {
    var a = new Plane();
    assert.ok(a.normal.x === 1, 'Passed!');
    assert.ok(a.normal.y === 0, 'Passed!');
    assert.ok(a.normal.z === 0, 'Passed!');
    assert.ok(a.constant === 0, 'Passed!');

    var a = new Plane(one3.clone(), 0);
    assert.ok(a.normal.x === 1, 'Passed!');
    assert.ok(a.normal.y === 1, 'Passed!');
    assert.ok(a.normal.z === 1, 'Passed!');
    assert.ok(a.constant === 0, 'Passed!');

    var a = new Plane(one3.clone(), 1);
    assert.ok(a.normal.x === 1, 'Passed!');
    assert.ok(a.normal.y === 1, 'Passed!');
    assert.ok(a.normal.z === 1, 'Passed!');
    assert.ok(a.constant === 1, 'Passed!');
  });

  // PUBLIC STUFF
  it('isPlane', () => {
    const a = new Plane();
    assert.ok(a.isPlane === true, 'Passed!');
  });

  it('set', () => {
    const a = new Plane();
    assert.ok(a.normal.x === 1, 'Passed!');
    assert.ok(a.normal.y === 0, 'Passed!');
    assert.ok(a.normal.z === 0, 'Passed!');
    assert.ok(a.constant === 0, 'Passed!');

    const b = a.clone().set(new Vector3(x, y, z), w);
    assert.ok(b.normal.x === x, 'Passed!');
    assert.ok(b.normal.y === y, 'Passed!');
    assert.ok(b.normal.z === z, 'Passed!');
    assert.ok(b.constant === w, 'Passed!');
  });

  it('setComponents', () => {
    const a = new Plane();
    assert.ok(a.normal.x === 1, 'Passed!');
    assert.ok(a.normal.y === 0, 'Passed!');
    assert.ok(a.normal.z === 0, 'Passed!');
    assert.ok(a.constant === 0, 'Passed!');

    const b = a.clone().setComponents(x, y, z, w);
    assert.ok(b.normal.x === x, 'Passed!');
    assert.ok(b.normal.y === y, 'Passed!');
    assert.ok(b.normal.z === z, 'Passed!');
    assert.ok(b.constant === w, 'Passed!');
  });

  it('setFromNormalAndCoplanarPoint', () => {
    const normal = one3.clone().normalize();
    const a = new Plane().setFromNormalAndCoplanarPoint(normal, zero3);

    assert.ok(a.normal.equals(normal), 'Passed!');
    assert.ok(a.constant === 0, 'Passed!');
  });

  it('setFromCoplanarPoints', () => {
    const a = new Plane();
    const v1 = new Vector3(2.0, 0.5, 0.25);
    const v2 = new Vector3(2.0, -0.5, 1.25);
    const v3 = new Vector3(2.0, -3.5, 2.2);
    const normal = new Vector3(1, 0, 0);
    const constant = -2;

    a.setFromCoplanarPoints(v1, v2, v3);

    assert.ok(a.normal.equals(normal), 'Check normal');
    assert.strictEqual(a.constant, constant, 'Check constant');
  });

  it('clone', () => {
    const a = new Plane(new Vector3(2.0, 0.5, 0.25));
    const b = a.clone();

    assert.ok(a.equals(b), 'clones are equal');
  });

  it('copy', () => {
    const a = new Plane(new Vector3(x, y, z), w);
    const b = new Plane().copy(a);
    assert.ok(b.normal.x === x, 'Passed!');
    assert.ok(b.normal.y === y, 'Passed!');
    assert.ok(b.normal.z === z, 'Passed!');
    assert.ok(b.constant === w, 'Passed!');

    // ensure that it is a true copy
    a.normal.x = 0;
    a.normal.y = -1;
    a.normal.z = -2;
    a.constant = -3;
    assert.ok(b.normal.x === x, 'Passed!');
    assert.ok(b.normal.y === y, 'Passed!');
    assert.ok(b.normal.z === z, 'Passed!');
    assert.ok(b.constant === w, 'Passed!');
  });

  it('normalize', () => {
    const a = new Plane(new Vector3(2, 0, 0), 2);

    a.normalize();
    assert.ok(a.normal.length() === 1, 'Passed!');
    assert.ok(a.normal.equals(new Vector3(1, 0, 0)), 'Passed!');
    assert.ok(a.constant === 1, 'Passed!');
  });

  it('negate/distanceToPoint', () => {
    const a = new Plane(new Vector3(2, 0, 0), -2);

    a.normalize();
    assert.ok(a.distanceToPoint(new Vector3(4, 0, 0)) === 3, 'Passed!');
    assert.ok(a.distanceToPoint(new Vector3(1, 0, 0)) === 0, 'Passed!');

    a.negate();
    assert.ok(a.distanceToPoint(new Vector3(4, 0, 0)) === -3, 'Passed!');
    assert.ok(a.distanceToPoint(new Vector3(1, 0, 0)) === 0, 'Passed!');
  });

  it('distanceToPoint', () => {
    const a = new Plane(new Vector3(2, 0, 0), -2);
    const point = new Vector3();

    a.normalize().projectPoint(zero3.clone(), point);
    assert.ok(a.distanceToPoint(point) === 0, 'Passed!');
    assert.ok(a.distanceToPoint(new Vector3(4, 0, 0)) === 3, 'Passed!');
  });

  it('distanceToSphere', () => {
    const a = new Plane(new Vector3(1, 0, 0), 0);

    const b = new Sphere(new Vector3(2, 0, 0), 1);

    assert.ok(a.distanceToSphere(b) === 1, 'Passed!');

    a.set(new Vector3(1, 0, 0), 2);
    assert.ok(a.distanceToSphere(b) === 3, 'Passed!');
    a.set(new Vector3(1, 0, 0), -2);
    assert.ok(a.distanceToSphere(b) === -1, 'Passed!');
  });

  it('projectPoint', () => {
    var a = new Plane(new Vector3(1, 0, 0), 0);
    const point = new Vector3();

    a.projectPoint(new Vector3(10, 0, 0), point);
    assert.ok(point.equals(zero3), 'Passed!');
    a.projectPoint(new Vector3(-10, 0, 0), point);
    assert.ok(point.equals(zero3), 'Passed!');

    var a = new Plane(new Vector3(0, 1, 0), -1);
    a.projectPoint(new Vector3(0, 0, 0), point);
    assert.ok(point.equals(new Vector3(0, 1, 0)), 'Passed!');
    a.projectPoint(new Vector3(0, 1, 0), point);
    assert.ok(point.equals(new Vector3(0, 1, 0)), 'Passed!');
  });

  it('isInterestionLine/intersectLine', () => {
    var a = new Plane(new Vector3(1, 0, 0), 0);
    const point = new Vector3();

    const l1 = new Line3(new Vector3(-10, 0, 0), new Vector3(10, 0, 0));
    a.intersectLine(l1, point);
    assert.ok(point.equals(new Vector3(0, 0, 0)), 'Passed!');

    var a = new Plane(new Vector3(1, 0, 0), -3);
    a.intersectLine(l1, point);
    assert.ok(point.equals(new Vector3(3, 0, 0)), 'Passed!');
  });

  it('intersectsBox', () => {
    const a = new Box3(zero3.clone(), one3.clone());
    const b = new Plane(new Vector3(0, 1, 0), 1);
    const c = new Plane(new Vector3(0, 1, 0), 1.25);
    const d = new Plane(new Vector3(0, -1, 0), 1.25);
    const e = new Plane(new Vector3(0, 1, 0), 0.25);
    const f = new Plane(new Vector3(0, 1, 0), -0.25);
    const g = new Plane(new Vector3(0, 1, 0), -0.75);
    const h = new Plane(new Vector3(0, 1, 0), -1);
    const i = new Plane(new Vector3(1, 1, 1).normalize(), -1.732);
    const j = new Plane(new Vector3(1, 1, 1).normalize(), -1.733);

    assert.ok(!b.intersectsBox(a), 'Passed!');
    assert.ok(!c.intersectsBox(a), 'Passed!');
    assert.ok(!d.intersectsBox(a), 'Passed!');
    assert.ok(!e.intersectsBox(a), 'Passed!');
    assert.ok(f.intersectsBox(a), 'Passed!');
    assert.ok(g.intersectsBox(a), 'Passed!');
    assert.ok(h.intersectsBox(a), 'Passed!');
    assert.ok(i.intersectsBox(a), 'Passed!');
    assert.ok(!j.intersectsBox(a), 'Passed!');
  });

  it('intersectsSphere', () => {
    const a = new Sphere(zero3.clone(), 1);
    const b = new Plane(new Vector3(0, 1, 0), 1);
    const c = new Plane(new Vector3(0, 1, 0), 1.25);
    const d = new Plane(new Vector3(0, -1, 0), 1.25);

    assert.ok(b.intersectsSphere(a), 'Passed!');
    assert.ok(!c.intersectsSphere(a), 'Passed!');
    assert.ok(!d.intersectsSphere(a), 'Passed!');
  });

  it('coplanarPoint', () => {
    const point = new Vector3();

    var a = new Plane(new Vector3(1, 0, 0), 0);
    a.coplanarPoint(point);
    assert.ok(a.distanceToPoint(point) === 0, 'Passed!');

    var a = new Plane(new Vector3(0, 1, 0), -1);
    a.coplanarPoint(point);
    assert.ok(a.distanceToPoint(point) === 0, 'Passed!');
  });

  it('applyMatrix4/translate', () => {
    var a = new Plane(new Vector3(1, 0, 0), 0);

    const m = new Matrix4();
    m.makeRotationZ(Math.PI * 0.5);

    assert.ok(comparePlane(a.clone().applyMatrix4(m), new Plane(new Vector3(0, 1, 0), 0)), 'Passed!');

    var a = new Plane(new Vector3(0, 1, 0), -1);
    assert.ok(comparePlane(a.clone().applyMatrix4(m), new Plane(new Vector3(-1, 0, 0), -1)), 'Passed!');

    m.makeTranslation(1, 1, 1);
    assert.ok(comparePlane(a.clone().applyMatrix4(m), a.clone().translate(new Vector3(1, 1, 1))), 'Passed!');
  });

  it('equals', () => {
    const a = new Plane(new Vector3(1, 0, 0), 0);
    const b = new Plane(new Vector3(1, 0, 0), 1);
    const c = new Plane(new Vector3(0, 1, 0), 0);

    assert.ok(a.normal.equals(b.normal), 'Normals: equal');
    assert.notOk(a.normal.equals(c.normal), 'Normals: not equal');

    assert.notStrictEqual(a.constant, b.constant, 'Constants: not equal');
    assert.strictEqual(a.constant, c.constant, 'Constants: equal');

    assert.notOk(a.equals(b), 'Planes: not equal');
    assert.notOk(a.equals(c), 'Planes: not equal');

    a.copy(b);
    assert.ok(a.normal.equals(b.normal), 'Normals after copy(): equal');
    assert.strictEqual(a.constant, b.constant, 'Constants after copy(): equal');
    assert.ok(a.equals(b), 'Planes after copy(): equal');
  });
});

