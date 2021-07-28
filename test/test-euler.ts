/**
 * @author bhouston / http://exocortex.com
 * @author TristanVALCKE / https://github.com/Itee
 */

'use strict';

/* global QUnit */

import { assert } from 'chai';

import { Euler, IOrder } from '../lib/Euler';
import { Matrix4 } from '../lib/Matrix4';
import { Quaternion } from '../lib/Quaternion';
import { Vector3 } from '../lib/Vector3';
import { x, y, z } from './constants.tests';

const eulerZero = new Euler( 0, 0, 0, "XYZ" );
const eulerAxyz = new Euler( 1, 0, 0, "XYZ" );
const eulerAzyx = new Euler( 0, 1, 0, "ZYX" );

function matrixEquals4( a, b, tolerance=0.0001 ) {

  if ( a.elements.length != b.elements.length ) {

    return false;

  }

  for ( var i = 0, il = a.elements.length; i < il; i ++ ) {

    var delta = a.elements[ i ] - b.elements[ i ];
    if ( delta > tolerance ) {

      return false;

    }

  }

  return true;

}

function eulerEquals( a, b, tolerance=0.0001 ) {

var diff = Math.abs( a.x - b.x ) + Math.abs( a.y - b.y ) + Math.abs( a.z - b.z );

return ( diff < tolerance );

}

function quatEquals( a, b, tolerance=0.0001 ) {

tolerance = tolerance || 0.0001;
var diff = Math.abs( a.x - b.x ) + Math.abs( a.y - b.y ) + Math.abs( a.z - b.z ) + Math.abs( a.w - b.w );

return ( diff < tolerance );

}

describe( 'Euler', () => {

  // INSTANCING
  it( "Instancing", () => {

    var a = new Euler();
    assert.ok( a.equals( eulerZero ), "Passed!" );
    assert.ok( ! a.equals( eulerAxyz ), "Passed!" );
    assert.ok( ! a.equals( eulerAzyx ), "Passed!" );

  } );

  // STATIC STUFF
  it( "RotationOrders", () => {

    assert.ok( Array.isArray( Euler.RotationOrders ), "Passed!" );
    assert.deepEqual( Euler.RotationOrders, [ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ], "Passed!" );

  } );

  it( "DefaultOrder", () => {

    assert.equal( Euler.DefaultOrder, "XYZ", "Passed!" );


  } );

  // PROPERTIES STUFF
  it( "x", () => {

    var a = new Euler();
    assert.ok( a.x === 0, "Passed!" );

    a = new Euler( 1, 2, 3 );
    assert.ok( a.x === 1, "Passed!" );

    a = new Euler( 4, 5, 6, "XYZ" );
    assert.ok( a.x === 4, "Passed!" );

    a = new Euler( 7, 8, 9, "XYZ" );
    a.x = 10;
    assert.ok( a.x === 10, "Passed!" );

    a = new Euler( 11, 12, 13, "XYZ" );
    var b = false;
    a._onChange( function () {

      b = true;

    } );
    a.x = 14;
    assert.ok( b, "Passed!" );
    assert.ok( a.x === 14, "Passed!" );

  } );

  it( "y", () => {


    var a = new Euler();
    assert.ok( a.y === 0, "Passed!" );

    a = new Euler( 1, 2, 3 );
    assert.ok( a.y === 2, "Passed!" );

    a = new Euler( 4, 5, 6, "XYZ" );
    assert.ok( a.y === 5, "Passed!" );

    a = new Euler( 7, 8, 9, "XYZ" );
    a.y = 10;
    assert.ok( a.y === 10, "Passed!" );

    a = new Euler( 11, 12, 13, "XYZ" );
    var b = false;
    a._onChange( function () {

      b = true;

    } );
    a.y = 14;
    assert.ok( b, "Passed!" );
    assert.ok( a.y === 14, "Passed!" );

  } );

  it( "z", () => {


    var a = new Euler();
    assert.ok( a.z === 0, "Passed!" );

    a = new Euler( 1, 2, 3 );
    assert.ok( a.z === 3, "Passed!" );

    a = new Euler( 4, 5, 6, "XYZ" );
    assert.ok( a.z === 6, "Passed!" );

    a = new Euler( 7, 8, 9, "XYZ" );
    a.z = 10;
    assert.ok( a.z === 10, "Passed!" );

    a = new Euler( 11, 12, 13, "XYZ" );
    var b = false;
    a._onChange( function () {

      b = true;

    } );
    a.z = 14;
    assert.ok( b, "Passed!" );
    assert.ok( a.z === 14, "Passed!" );

  } );

  it( "order", () => {


    var a = new Euler();
    assert.ok( a.order === Euler.DefaultOrder, "Passed!" );

    a = new Euler( 1, 2, 3 );
    assert.ok( a.order === Euler.DefaultOrder, "Passed!" );

    a = new Euler( 4, 5, 6, "YZX" );
    assert.ok( a.order === "YZX", "Passed!" );

    a = new Euler( 7, 8, 9, "YZX" );
    a.order = "ZXY";
    assert.ok( a.order === "ZXY", "Passed!" );

    a = new Euler( 11, 12, 13, "YZX" );
    var b = false;
    a._onChange( function () {

      b = true;

    } );
    a.order = "ZXY";
    assert.ok( b, "Passed!" );
    assert.ok( a.order === "ZXY", "Passed!" );


  } );

  // PUBLIC STUFF
  it( "isEuler", () => {

    var a = new Euler();
    assert.ok( a.isEuler, "Passed!" );
    var b = new Vector3();
    assert.ok( ! b['isEuler'], "Passed!" );


  } );

  it( "set/setFromVector3/toVector3", () => {

    var a = new Euler();

    a.set( 0, 1, 0, "ZYX" );
    assert.ok( a.equals( eulerAzyx ), "Passed!" );
    assert.ok( ! a.equals( eulerAxyz ), "Passed!" );
    assert.ok( ! a.equals( eulerZero ), "Passed!" );

    var vec = new Vector3( 0, 1, 0 );

    var b = new Euler().setFromVector3( vec, "ZYX" );
    assert.ok( a.equals( b ), "Passed!" );

    var c = b.toVector3();
    assert.ok( c.equals( vec ), "Passed!" );

  } );

  it( "clone/copy/equals", () => {

    var a = eulerAxyz.clone();
    assert.ok( a.equals( eulerAxyz ), "Passed!" );
    assert.ok( ! a.equals( eulerZero ), "Passed!" );
    assert.ok( ! a.equals( eulerAzyx ), "Passed!" );

    a.copy( eulerAzyx );
    assert.ok( a.equals( eulerAzyx ), "Passed!" );
    assert.ok( ! a.equals( eulerAxyz ), "Passed!" );
    assert.ok( ! a.equals( eulerZero ), "Passed!" );

  } );

  it( "Quaternion.setFromEuler/Euler.fromQuaternion", () => {

    var testValues = [ eulerZero, eulerAxyz, eulerAzyx ];
    for ( var i = 0; i < testValues.length; i ++ ) {

      var v = testValues[ i ];
      var q = new Quaternion().setFromEuler( v );

      var v2 = new Euler().setFromQuaternion( q, v.order );
      var q2 = new Quaternion().setFromEuler( v2 );
      assert.ok( quatEquals( q, q2 ), "Passed!" );

    }

  } );

  it( "Matrix4.setFromEuler/Euler.fromRotationMatrix", () => {

    var testValues = [ eulerZero, eulerAxyz, eulerAzyx ];
    for ( var i = 0; i < testValues.length; i ++ ) {

      var v = testValues[ i ];
      var m = new Matrix4().makeRotationFromEuler( v );

      var v2 = new Euler().setFromRotationMatrix( m, v.order );
      var m2 = new Matrix4().makeRotationFromEuler( v2 );
      assert.ok( matrixEquals4( m, m2, 0.0001 ), "Passed!" );

    }

  } );

  it( "reorder", () => {

    var testValues = [ eulerZero, eulerAxyz, eulerAzyx ];
    for ( var i = 0; i < testValues.length; i ++ ) {

      var v = testValues[ i ];
      var q = new Quaternion().setFromEuler( v );

      v.reorder( 'YZX' );
      var q2 = new Quaternion().setFromEuler( v );
      assert.ok( quatEquals( q, q2 ), "Passed!" );

      v.reorder( 'ZXY' );
      var q3 = new Quaternion().setFromEuler( v );
      assert.ok( quatEquals( q, q3 ), "Passed!" );

    }

  } );

  it( "set/get properties, check callbacks", () => {

    var a = new Euler();
    // a._onChange( function () {

    // 	assert.step( "set: onChange called" );

    // } );

    a.x = 1;
    a.y = 2;
    a.z = 3;
    a.order = "ZYX";

    assert.strictEqual( a.x, 1, "get: check x" );
    assert.strictEqual( a.y, 2, "get: check y" );
    assert.strictEqual( a.z, 3, "get: check z" );
    assert.strictEqual( a.order, "ZYX", "get: check order" );

    // assert.verifySteps( Array( 4 ).fill( "set: onChange called" ) );

  } );

  it( "clone/copy, check callbacks", () => {

    var a = new Euler( 1, 2, 3, "ZXY" );
    var b = new Euler( 4, 5, 6, "XZY" );
    var cbSucceed = function () {

      assert.ok( true );
      // assert.step( "onChange called" );

    };
    var cbFail = function () {

      assert.ok( false );

    };
    a._onChange( cbFail );
    b._onChange( cbFail );

    // clone doesn't trigger onChange
    a = b.clone();
    assert.ok( a.equals( b ), "clone: check if a equals b" );

    // copy triggers onChange once
    a = new Euler( 1, 2, 3, "ZXY" );
    a._onChange( cbSucceed );
    a.copy( b );
    assert.ok( a.equals( b ), "copy: check if a equals b" );
    // assert.verifySteps( [ "onChange called" ] );

  } );

  it( "toArray", () => {

    var order = "YXZ";
    var a = new Euler( x, y, z, "YXZ" );

    var array = a.toArray();
    assert.strictEqual( array[ 0 ], x, "No array, no offset: check x" );
    assert.strictEqual( array[ 1 ], y, "No array, no offset: check y" );
    assert.strictEqual( array[ 2 ], z, "No array, no offset: check z" );
    assert.strictEqual( array[ 3 ], "YXZ", "No array, no offset: check order" );

    array = [];
    a.toArray( array );
    assert.strictEqual( array[ 0 ], x, "With array, no offset: check x" );
    assert.strictEqual( array[ 1 ], y, "With array, no offset: check y" );
    assert.strictEqual( array[ 2 ], z, "With array, no offset: check z" );
    assert.strictEqual( array[ 3 ],  "YXZ", "With array, no offset: check order" );

    array = [];
    a.toArray( array, 1 );
    assert.strictEqual( array[ 0 ], undefined, "With array and offset: check [0]" );
    assert.strictEqual( array[ 1 ], x, "With array and offset: check x" );
    assert.strictEqual( array[ 2 ], y, "With array and offset: check y" );
    assert.strictEqual( array[ 3 ], z, "With array and offset: check z" );
    assert.strictEqual( array[ 4 ],  "YXZ", "With array and offset: check order" );

  } );

  it( "fromArray", () => {

    var a = new Euler();
    var array: [number,number,number,IOrder?] = [ x, y, z ];
    var cb = function () {

      // assert.step( "onChange called" );

    };
    a._onChange( cb );

    a.fromArray( array );
    assert.strictEqual( a.x, x, "No order: check x" );
    assert.strictEqual( a.y, y, "No order: check y" );
    assert.strictEqual( a.z, z, "No order: check z" );
    assert.strictEqual( a.order, "XYZ", "No order: check order" );

    a = new Euler();
    array = [ x, y, z, 'ZYX' ];
    a._onChange( cb );
    a.fromArray( array );
    assert.strictEqual( a.x, x, "With order: check x" );
    assert.strictEqual( a.y, y, "With order: check y" );
    assert.strictEqual( a.z, z, "With order: check z" );
    assert.strictEqual( a.order, "ZYX", "With order: check order" );

    // assert.verifySteps( Array( 2 ).fill( "onChange called" ) );

  } );

  it( "_onChange", () => {

    var f = function () {

      var b = true;

    };

    var a = new Euler( 11, 12, 13, "XYZ" );
    a._onChange( f );
    assert.ok( a._onChangeCallback === f, "Passed!" );

  } );

  // it( "_onChangeCallback", () => {

  // 	var b = false;
  // 	var a = new Euler( 11, 12, 13, "XYZ" );
  // 	var f = function () {

  // 		b = true;
  // 		assert.ok( a === this, "Passed!" );

  // 	};

  // 	a._onChangeCallback = f;
  // 	assert.ok( a._onChangeCallback === f, "Passed!" );


  // 	a._onChangeCallback();
  // 	assert.ok( b, "Passed!" );

  // } );

  // OTHERS
  it( "gimbalLocalQuat", () => {

    // known problematic quaternions
    var q1 = new Quaternion( 0.5207769385244341, - 0.4783214164122354, 0.520776938524434, 0.47832141641223547 );
    var q2 = new Quaternion( 0.11284905712620674, 0.6980437630368944, - 0.11284905712620674, 0.6980437630368944 );

    var eulerOrder = "ZYX";

    // create Euler directly from a Quaternion
    var eViaQ1 = new Euler().setFromQuaternion( q1, "ZYX" ); // there is likely a bug here

    // create Euler from Quaternion via an intermediate Matrix4
    var mViaQ1 = new Matrix4().makeRotationFromQuaternion( q1 );
    var eViaMViaQ1 = new Euler().setFromRotationMatrix( mViaQ1, "ZYX" );

    // the results here are different
    assert.ok( eulerEquals( eViaQ1, eViaMViaQ1 ), "Passed!" ); // this result is correct

  } );

} );

