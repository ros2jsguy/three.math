/* eslint-disable max-len */
/* eslint-disable no-redeclare */
/* eslint-disable no-var */

import { assert } from 'chai';

import { Vector2 } from '../lib/Vector2';
import { Matrix3 } from '../lib/Matrix3';
import {
  x,
  y,
  eps,
} from './Constants.tests';


function vector2Equals(v1: Vector2, v2: Vector2): boolean {
  return v1.x === v2.x && v1.y === v2.y;
}


describe('Vector2', () => {
  // INSTANCING
  it('Instancing', () => {
    var a = new Vector2();
    assert.ok(a.x == 0, 'Passed!');
    assert.ok(a.y == 0, 'Passed!');

    var a = new Vector2(x, y);
    assert.ok(a.x === x, 'Passed!');
    assert.ok(a.y === y, 'Passed!');
  });

  // PROPERTIES // ( [Itee] WHAT ??? o_O )
  it('properties', () => {
    const a = new Vector2(0, 0);
    const width = 100;
    const height = 200;

    assert.ok(a.width = width, 'Set width');
    assert.ok(a.height = height, 'Set height');

    a.set(width, height);
    assert.strictEqual(a.width, width, 'Get width');
    assert.strictEqual(a.height, height, 'Get height');
  });

  // QUnit.todo( "width", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "height", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // // PUBLIC STUFF
  // QUnit.todo( "isVector2", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  it('set', () => {
    const a = new Vector2();
    assert.ok(a.x === 0, 'Passed!');
    assert.ok(a.y === 0, 'Passed!');

    a.set(x, y);
    assert.ok(a.x === x, 'Passed!');
    assert.ok(a.y === y, 'Passed!');
  });

  // QUnit.todo( "setScalar", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "setX", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "setY", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "setComponent", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "getComponent", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "clone", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  it('copy', () => {
    const a = new Vector2(x, y);
    const b = new Vector2().copy(a);
    assert.ok(b.x === x, 'Passed!');
    assert.ok(b.y === y, 'Passed!');

    // ensure that it is a true copy
    a.x = 0;
    a.y = -1;
    assert.ok(b.x === x, 'Passed!');
    assert.ok(b.y === y, 'Passed!');
  });

  it('add', () => {
    const a = new Vector2(x, y);
    const b = new Vector2(-x, -y);

    a.add(b);
    assert.ok(a.x === 0, 'Passed!');
    assert.ok(a.y === 0, 'Passed!');

    const c = new Vector2().addVectors(b, b);
    assert.ok(c.x === -2 * x, 'Passed!');
    assert.ok(c.y === -2 * y, 'Passed!');
  });

  // QUnit.todo( "addScalar", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "addVectors", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  it('addScaledVector', () => {
    const a = new Vector2(x, y);
    const b = new Vector2(2, 3);
    const s = 3;

    a.addScaledVector(b, s);
    assert.strictEqual(a.x, x + b.x * s, 'Check x');
    assert.strictEqual(a.y, y + b.y * s, 'Check y');
  });

  it('sub', () => {
    const a = new Vector2(x, y);
    const b = new Vector2(-x, -y);

    a.sub(b);
    assert.ok(a.x === 2 * x, 'Passed!');
    assert.ok(a.y === 2 * y, 'Passed!');

    const c = new Vector2().subVectors(a, a);
    assert.ok(c.x === 0, 'Passed!');
    assert.ok(c.y === 0, 'Passed!');
  });

  // QUnit.todo( "subScalar", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "subVectors", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "multiply", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "multiplyScalar", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "divide", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "divideScalar", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  it('applyMatrix3', () => {
    const a = new Vector2(x, y);
    const m = new Matrix3().set(2, 3, 5, 7, 11, 13, 17, 19, 23);

    a.applyMatrix3(m);
    assert.strictEqual(a.x, 18, 'Check x');
    assert.strictEqual(a.y, 60, 'Check y');
  });

  // QUnit.todo( "min", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "max", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "clamp", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "clampScalar", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "clampLength", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "floor", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "ceil", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "round", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "roundToZero", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  it('negate', () => {
    const a = new Vector2(x, y);

    a.negate();
    assert.ok(a.x === -x, 'Passed!');
    assert.ok(a.y === -y, 'Passed!');
  });

  it('dot', () => {
    const a = new Vector2(x, y);
    const b = new Vector2(-x, -y);
    const c = new Vector2();

    var result = a.dot(b);
    assert.ok(result === (-x * x - y * y), 'Passed!');

    var result = a.dot(c);
    assert.ok(result === 0, 'Passed!');
  });

  it('cross', () => {
    const a = new Vector2(x, y);
    const b = new Vector2(2 * x, -y);
    const answer = -18;
    const crossed = a.cross(b);

    assert.ok(Math.abs(answer - crossed) <= eps, 'Check cross');
  });

  // QUnit.todo( "lengthSq", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "length", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  it('manhattanLength', () => {
    const a = new Vector2(x, 0);
    const b = new Vector2(0, -y);
    const c = new Vector2();

    assert.strictEqual(a.manhattanLength(), x, 'Positive component');
    assert.strictEqual(b.manhattanLength(), y, 'Negative component');
    assert.strictEqual(c.manhattanLength(), 0, 'Empty component');

    a.set(x, y);
    assert.strictEqual(a.manhattanLength(), Math.abs(x) + Math.abs(y), 'Two components');
  });

  it('normalize', () => {
    const a = new Vector2(x, 0);
    const b = new Vector2(0, -y);

    a.normalize();
    assert.ok(a.length() === 1, 'Passed!');
    assert.ok(a.x === 1, 'Passed!');

    b.normalize();
    assert.ok(b.length() === 1, 'Passed!');
    assert.ok(b.y === -1, 'Passed!');
  });

  // QUnit.todo( "angle", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "distanceTo", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "distanceToSquared", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "manhattanDistanceTo", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  it('setLength', () => {
    var a = new Vector2(x, 0);

    assert.ok(a.length() === x, 'Passed!');
    a.setLength(y);
    assert.ok(a.length() === y, 'Passed!');

    var a = new Vector2(0, 0);
    assert.ok(a.length() === 0, 'Passed!');
    a.setLength(y);
    assert.ok(a.length() === 0, 'Passed!');
    // a.setLength();
    // assert.ok( isNaN( a.length() ), "Passed!" );
  });

  // QUnit.todo( "lerp", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  // QUnit.todo( "lerpVectors", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );

  it('equals', () => {
    const a = new Vector2(x, 0);
    const b = new Vector2(0, -y);

    assert.ok(a.x !== b.x, 'Passed!');
    assert.ok(a.y !== b.y, 'Passed!');

    assert.ok(!a.equals(b), 'Passed!');
    assert.ok(!b.equals(a), 'Passed!');

    a.copy(b);
    assert.ok(a.x === b.x, 'Passed!');
    assert.ok(a.y === b.y, 'Passed!');

    assert.ok(a.equals(b), 'Passed!');
    assert.ok(b.equals(a), 'Passed!');
  });

  it('fromArray', () => {
    const a = new Vector2();
    const array = [1, 2, 3, 4];

    a.fromArray(array);
    assert.strictEqual(a.x, 1, 'No offset: check x');
    assert.strictEqual(a.y, 2, 'No offset: check y');

    a.fromArray(array, 2);
    assert.strictEqual(a.x, 3, 'With offset: check x');
    assert.strictEqual(a.y, 4, 'With offset: check y');
  });

  it('toArray', () => {
    const a = new Vector2(x, y);

    let array = a.toArray();
    assert.strictEqual(array[0], x, 'No array, no offset: check x');
    assert.strictEqual(array[1], y, 'No array, no offset: check y');

    array = [];
    a.toArray(array);
    assert.strictEqual(array[0], x, 'With array, no offset: check x');
    assert.strictEqual(array[1], y, 'With array, no offset: check y');

    array = [];
    a.toArray(array, 1);
    assert.strictEqual(array[0], undefined, 'With array and offset: check [0]');
    assert.strictEqual(array[1], x, 'With array and offset: check x');
    assert.strictEqual(array[2], y, 'With array and offset: check y');
  });

  // QUnit.todo( "rotateAround", () => {

  // 	assert.ok( false, "everything's gonna be alright" );

  // } );


  // TODO (Itee) refactor/split
  it('setX,setY', () => {
    const a = new Vector2();
    assert.ok(a.x === 0, 'Passed!');
    assert.ok(a.y === 0, 'Passed!');

    a.setX(x);
    a.setY(y);
    assert.ok(a.x === x, 'Passed!');
    assert.ok(a.y === y, 'Passed!');
  });
  it('setComponent,getComponent', () => {
    const a = new Vector2();
    assert.ok(a.x === 0, 'Passed!');
    assert.ok(a.y === 0, 'Passed!');

    a.setComponent(0, 1);
    a.setComponent(1, 2);
    assert.ok(a.getComponent(0) === 1, 'Passed!');
    assert.ok(a.getComponent(1) === 2, 'Passed!');
  });
  it('multiply/divide', () => {
    const a = new Vector2(x, y);
    const b = new Vector2(-x, -y);

    a.multiplyScalar(-2);
    assert.ok(a.x === x * -2, 'Passed!');
    assert.ok(a.y === y * -2, 'Passed!');

    b.multiplyScalar(-2);
    assert.ok(b.x === 2 * x, 'Passed!');
    assert.ok(b.y === 2 * y, 'Passed!');

    a.divideScalar(-2);
    assert.ok(a.x === x, 'Passed!');
    assert.ok(a.y === y, 'Passed!');

    b.divideScalar(-2);
    assert.ok(b.x === -x, 'Passed!');
    assert.ok(b.y === -y, 'Passed!');
  });
  it('min/max/clamp', () => {
    const a = new Vector2(x, y);
    const b = new Vector2(-x, -y);
    const c = new Vector2();

    c.copy(a).min(b);
    assert.ok(c.x === -x, 'Passed!');
    assert.ok(c.y === -y, 'Passed!');

    c.copy(a).max(b);
    assert.ok(c.x === x, 'Passed!');
    assert.ok(c.y === y, 'Passed!');

    c.set(-2 * x, 2 * y);
    c.clamp(b, a);
    assert.ok(c.x === -x, 'Passed!');
    assert.ok(c.y === y, 'Passed!');

    c.set(-2 * x, 2 * x);
    c.clampScalar(-x, x);
    assert.equal(c.x, -x, 'scalar clamp x');
    assert.equal(c.y, x, 'scalar clamp y');
  });

  //  Some Math methods such as Math.ceil(-0.1) returns -0.
  // assert.deepEqual has an issue comparing a result which is -0 with 0.
  // Thus using vector2Equals() in its place for now.

  it('rounding', () => {
    assert.deepEqual(new Vector2(-0.1, 0.1).floor(), new Vector2(-1, 0), 'floor .1');
    assert.deepEqual(new Vector2(-0.5, 0.5).floor(), new Vector2(-1, 0), 'floor .5');
    assert.deepEqual(new Vector2(-0.9, 0.9).floor(), new Vector2(-1, 0), 'floor .9');

    // assert.deepEqual( new Vector2( - 1.1, 0.1 ).ceil(), new Vector2( -1, 1 ), "ceil .1" );
    // assert.deepEqual( new Vector2( - 0.5, 0.5 ).ceil(), new Vector2( 0, 1 ), "ceil .5" );
    // assert.deepEqual( new Vector2( - 0.9, 0.9 ).ceil(), new Vector2( 0, 1 ), "ceil .9" );
    assert.ok(vector2Equals(new Vector2(-1.1, 0.1).ceil(), new Vector2(-1, 1)), 'ceil .1');
    assert.ok(vector2Equals(new Vector2(-0.5, 0.5).ceil(), new Vector2(0, 1)), 'ceil .5');
    assert.ok(vector2Equals(new Vector2(-0.9, 0.9).ceil(), new Vector2(0, 1)), 'ceil .9');

    // assert.deepEqual( new Vector2( - 0.1, 0.1 ).round(), new Vector2( 0, 0 ), "round .1" );
    // assert.deepEqual( new Vector2( - 0.5, 0.5 ).round(), new Vector2( 0, 1 ), "round .5" );
    // assert.deepEqual( new Vector2( - 0.9, 0.9 ).round(), new Vector2( - 1, 1 ), "round .9" );
    assert.ok(vector2Equals(new Vector2(-0.1, 0.1).round(), new Vector2(0, 0)), 'round .1');
    assert.ok(vector2Equals(new Vector2(-0.5, 0.5).round(), new Vector2(0, 1)), 'round .5');
    assert.ok(vector2Equals(new Vector2(-0.9, 0.9).round(), new Vector2(-1, 1)), 'round .9');

    // assert.deepEqual( new Vector2( - 0.1, 0.1 ).roundToZero(), new Vector2( 0, 0 ), "roundToZero .1" );
    // assert.deepEqual( new Vector2( - 0.5, 0.5 ).roundToZero(), new Vector2( 0, 0 ), "roundToZero .5" );
    // assert.deepEqual( new Vector2( - 0.9, 0.9 ).roundToZero(), new Vector2( 0, 0 ), "roundToZero .9" );
    // assert.deepEqual( new Vector2( - 1.1, 1.1 ).roundToZero(), new Vector2( - 1, 1 ), "roundToZero 1.1" );
    // assert.deepEqual( new Vector2( - 1.5, 1.5 ).roundToZero(), new Vector2( - 1, 1 ), "roundToZero 1.5" );
    // assert.deepEqual( new Vector2( - 1.9, 1.9 ).roundToZero(), new Vector2( - 1, 1 ), "roundToZero 1.9" );
    assert.ok(vector2Equals(new Vector2(-0.1, 0.1).roundToZero(), new Vector2(0, 0)), 'roundToZero .1');
    assert.ok(vector2Equals(new Vector2(-0.5, 0.5).roundToZero(), new Vector2(0, 0)), 'roundToZero .5');
    assert.ok(vector2Equals(new Vector2(-0.9, 0.9).roundToZero(), new Vector2(0, 0)), 'roundToZero .9');
    assert.ok(vector2Equals(new Vector2(-1.1, 1.1).roundToZero(), new Vector2(-1, 1)), 'roundToZero 1.1');
    assert.ok(vector2Equals(new Vector2(-1.5, 1.5).roundToZero(), new Vector2(-1, 1)), 'roundToZero 1.5');
    assert.ok(vector2Equals(new Vector2(-1.9, 1.9).roundToZero(), new Vector2(-1, 1)), 'roundToZero 1.9');
  });

  it('length/lengthSq', () => {
    const a = new Vector2(x, 0);
    const b = new Vector2(0, -y);
    const c = new Vector2();

    assert.ok(a.length() === x, 'Passed!');
    assert.ok(a.lengthSq() === x * x, 'Passed!');
    assert.ok(b.length() === y, 'Passed!');
    assert.ok(b.lengthSq() === y * y, 'Passed!');
    assert.ok(c.length() === 0, 'Passed!');
    assert.ok(c.lengthSq() === 0, 'Passed!');

    a.set(x, y);
    assert.ok(a.length() === Math.sqrt(x * x + y * y), 'Passed!');
    assert.ok(a.lengthSq() === (x * x + y * y), 'Passed!');
  });

  it('distanceTo/distanceToSquared', () => {
    const a = new Vector2(x, 0);
    const b = new Vector2(0, -y);
    const c = new Vector2();

    assert.ok(a.distanceTo(c) === x, 'Passed!');
    assert.ok(a.distanceToSquared(c) === x * x, 'Passed!');

    assert.ok(b.distanceTo(c) === y, 'Passed!');
    assert.ok(b.distanceToSquared(c) === y * y, 'Passed!');
  });

  it('lerp/clone', () => {
    const a = new Vector2(x, 0);
    const b = new Vector2(0, -y);

    assert.ok(a.lerp(a, 0).equals(a.lerp(a, 0.5)), 'Passed!');
    assert.ok(a.lerp(a, 0).equals(a.lerp(a, 1)), 'Passed!');

    assert.ok(a.clone().lerp(b, 0).equals(a), 'Passed!');

    assert.ok(a.clone().lerp(b, 0.5).x == x * 0.5, 'Passed!');
    assert.ok(a.clone().lerp(b, 0.5).y == -y * 0.5, 'Passed!');

    assert.ok(a.clone().lerp(b, 1).equals(b), 'Passed!');
  });

  it('setComponent/getComponent exceptions', () => {
    const a = new Vector2(0, 0);

    assert.throws(
      () => {
        a.setComponent(2, 0);
      },
      /index is out of range/,
      'setComponent with an out of range index throws Error',
    );
    assert.throws(
      () => {
        a.getComponent(2);
      },
      /index is out of range/,
      'getComponent with an out of range index throws Error',
    );
  });

  it('setScalar/addScalar/subScalar', () => {
    const a = new Vector2(1, 1);
    const s = 3;

    a.setScalar(s);
    assert.strictEqual(a.x, s, 'setScalar: check x');
    assert.strictEqual(a.y, s, 'setScalar: check y');

    a.addScalar(s);
    assert.strictEqual(a.x, 2 * s, 'addScalar: check x');
    assert.strictEqual(a.y, 2 * s, 'addScalar: check y');

    a.subScalar(2 * s);
    assert.strictEqual(a.x, 0, 'subScalar: check x');
    assert.strictEqual(a.y, 0, 'subScalar: check y');
  });

  it('multiply/divide', () => {
    const a = new Vector2(x, y);
    const b = new Vector2(2 * x, 2 * y);
    const c = new Vector2(4 * x, 4 * y);

    a.multiply(b);
    assert.strictEqual(a.x, x * b.x, 'multiply: check x');
    assert.strictEqual(a.y, y * b.y, 'multiply: check y');

    b.divide(c);
    assert.strictEqual(b.x, 0.5, 'divide: check x');
    assert.strictEqual(b.y, 0.5, 'divide: check y');
  });

  it( 'iterable', () => {
    const v = new Vector2( 0, 1 );
    const array = [ ...v ];
    assert.strictEqual( array[ 0 ], 0, 'Vector2 is iterable.' );
    assert.strictEqual( array[ 1 ], 1, 'Vector2 is iterable.' );
  } );

});
