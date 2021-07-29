
import { assert } from 'chai';

import { Color } from '../lib/Color';
import { eps } from './Constants.tests';
// import { CONSOLE_LEVEL } from '../../utils/console-wrapper';

describe( 'Color', () => {

  // INSTANCING
  it( "Instancing", () => {

    // default ctor
    var c = new Color();
    assert.ok( c.r, "Red: " + c.r );
    assert.ok( c.g, "Green: " + c.g );
    assert.ok( c.b, "Blue: " + c.b );

    // rgb ctor
    var c = new Color( 1, 1, 1 );
    assert.ok( c.r == 1, "Passed" );
    assert.ok( c.g == 1, "Passed" );
    assert.ok( c.b == 1, "Passed" );

  } );

  // EXPOSED CONSTANTS
  it( "Color.NAMES", () => {

    assert.ok( Color.NAMES.aliceblue == 0xF0F8FF, "Exposed Color.NAMES" );

  } );

  // PUBLIC STUFF
  it( "isColor", () => {

    var a = new Color();
    assert.ok( a.isColor === true, "Passed!" );

    var b = new Object();
    assert.ok( ! b['isColor'], "Passed!" );

  } );

  it( "set", () => {

    var a = new Color();
    var b = new Color( 0.5, 0, 0 );
    var c = new Color( 0xFF0000 );
    var d = new Color( 0, 1.0, 0 );

    a.set( b );
    assert.ok( a.equals( b ), "Set with Color instance" );

    a.set( 0xFF0000 );
    assert.ok( a.equals( c ), "Set with number" );

    a.set( "rgb(0,255,0)" );
    assert.ok( a.equals( d ), "Set with style" );

  } );

  it( "setScalar", () => {

    var c = new Color();
    c.setScalar( 0.5 );
    assert.ok( c.r == 0.5, "Red: " + c.r );
    assert.ok( c.g == 0.5, "Green: " + c.g );
    assert.ok( c.b == 0.5, "Blue: " + c.b );

  } );

  it( "setHex", () => {

    var c = new Color();
    c.setHex( 0xFA8072 );
    assert.ok( c.getHex() == 0xFA8072, "Hex: " + c.getHex() );
    assert.ok( c.r == 0xFA / 0xFF, "Red: " + c.r );
    assert.ok( c.g == 0x80 / 0xFF, "Green: " + c.g );
    assert.ok( c.b == 0x72 / 0xFF, "Blue: " + c.b );

  } );

  it( "setRGB", () => {

    var c = new Color();
    c.setRGB( 0.3, 0.5, 0.7 );
    assert.ok( c.r == 0.3, "Red: " + c.r );
    assert.ok( c.g == 0.5, "Green: " + c.g );
    assert.ok( c.b == 0.7, "Blue: " + c.b );

  } );

  it( "setHSL", () => {

    var c = new Color();
    var hsl = { h: 0, s: 0, l: 0 };
    c.setHSL( 0.75, 1.0, 0.25 );
    c.getHSL( hsl );

    assert.ok( hsl.h == 0.75, "hue: " + hsl.h );
    assert.ok( hsl.s == 1.00, "saturation: " + hsl.s );
    assert.ok( hsl.l == 0.25, "lightness: " + hsl.l );

  } );

  it( "setStyle", () => {

    var a = new Color();

    var b = new Color( 8 / 255, 25 / 255, 178 / 255 );
    a.setStyle( "rgb(8,25,178)" );
    assert.ok( a.equals( b ), "Passed" );

    b = new Color( 8 / 255, 25 / 255, 178 / 255 );
    a.setStyle( "rgba(8,25,178,200)" );
    assert.ok( a.equals( b ), "Passed" );

    var hsl = { h: 0, s: 0, l: 0 };
    a.setStyle( "hsl(270,50%,75%)" );
    a.getHSL( hsl );
    assert.ok( hsl.h == 0.75, "hue: " + hsl.h );
    assert.ok( hsl.s == 0.5, "saturation: " + hsl.s );
    assert.ok( hsl.l == 0.75, "lightness: " + hsl.l );

    hsl = { h: 0, s: 0, l: 0 };
    a.setStyle( "hsl(270,50%,75%)" );
    a.getHSL( hsl );
    assert.ok( hsl.h == 0.75, "hue: " + hsl.h );
    assert.ok( hsl.s == 0.5, "saturation: " + hsl.s );
    assert.ok( hsl.l == 0.75, "lightness: " + hsl.l );

    a.setStyle( "#F8A" );
    assert.ok( a.r == 0xFF / 255, "Red: " + a.r );
    assert.ok( a.g == 0x88 / 255, "Green: " + a.g );
    assert.ok( a.b == 0xAA / 255, "Blue: " + a.b );

    a.setStyle( "#F8ABC1" );
    assert.ok( a.r == 0xF8 / 255, "Red: " + a.r );
    assert.ok( a.g == 0xAB / 255, "Green: " + a.g );
    assert.ok( a.b == 0xC1 / 255, "Blue: " + a.b );

    a.setStyle( "aliceblue" );
    assert.ok( a.r == 0xF0 / 255, "Red: " + a.r );
    assert.ok( a.g == 0xF8 / 255, "Green: " + a.g );
    assert.ok( a.b == 0xFF / 255, "Blue: " + a.b );

  } );

  it( "setColorName", () => {

    var c = new Color();
    var res = c.setColorName( "aliceblue" );

    assert.ok( c.getHex() == 0xF0F8FF, "Hex: " + c.getHex() );
    assert.ok( c == res, "Returns Self" );

  } );

  it( "clone", () => {

    var c = new Color( 'teal' );
    var c2 = c.clone();
    assert.ok( c2.getHex() == 0x008080, "Hex c2: " + c2.getHex() );

  } );

  it( "copy", () => {

    var a = new Color( 'teal' );
    var b = new Color();
    b.copy( a );
    assert.ok( b.r == 0x00 / 255, "Red: " + b.r );
    assert.ok( b.g == 0x80 / 255, "Green: " + b.g );
    assert.ok( b.b == 0x80 / 255, "Blue: " + b.b );

  } );

  it( "copyGammaToLinear", () => {

    var c = new Color();
    var c2 = new Color();
    c2.setRGB( 0.3, 0.5, 0.9 );
    c.copyGammaToLinear( c2 );
    assert.ok( c.r == 0.09, "Red c: " + c.r + " Red c2: " + c2.r );
    assert.ok( c.g == 0.25, "Green c: " + c.g + " Green c2: " + c2.g );
    assert.ok( c.b == 0.81, "Blue c: " + c.b + " Blue c2: " + c2.b );

  } );

  it( "copyLinearToGamma", () => {

    var c = new Color();
    var c2 = new Color();
    c2.setRGB( 0.09, 0.25, 0.81 );
    c.copyLinearToGamma( c2 );
    assert.ok( c.r == 0.3, "Red c: " + c.r + " Red c2: " + c2.r );
    assert.ok( c.g == 0.5, "Green c: " + c.g + " Green c2: " + c2.g );
    assert.ok( c.b == 0.9, "Blue c: " + c.b + " Blue c2: " + c2.b );

  } );

  it( "convertGammaToLinear", () => {

    var c = new Color();
    c.setRGB( 0.3, 0.5, 0.9 );
    c.convertGammaToLinear();
    assert.ok( c.r == 0.09, "Red: " + c.r );
    assert.ok( c.g == 0.25, "Green: " + c.g );
    assert.ok( c.b == 0.81, "Blue: " + c.b );

  } );

  it( "convertLinearToGamma", () => {

    var c = new Color();
    c.setRGB( 4, 9, 16 );
    c.convertLinearToGamma();
    assert.ok( c.r == 2, "Red: " + c.r );
    assert.ok( c.g == 3, "Green: " + c.g );
    assert.ok( c.b == 4, "Blue: " + c.b );

  } );

  it( "getHex", () => {

    var c = new Color( 'red' );
    var res = c.getHex();
    assert.ok( res == 0xFF0000, "Hex: " + res );

  } );

  it( "getHexString", () => {

    var c = new Color( 'tomato' );
    var res = c.getHexString();
    assert.ok( res == 'ff6347', "Hex: " + res );

  } );

  it( "getHSL", () => {

    var c = new Color( 0x80ffff );
    var hsl = { h: 0, s: 0, l: 0 };
    c.getHSL( hsl );

    assert.ok( hsl.h == 0.5, "hue: " + hsl.h );
    assert.ok( hsl.s == 1.0, "saturation: " + hsl.s );
    assert.ok( ( Math.round( parseFloat( hsl.l.toString() ) * 100 ) / 100 ) == 0.75, "lightness: " + hsl.l );

  } );

  it( "getStyle", () => {

    var c = new Color( 'plum' );
    var res = c.getStyle();
    assert.ok( res == 'rgb(221,160,221)', "style: " + res );

  } );

  it( "offsetHSL", () => {

    var a = new Color( "hsl(120,50%,50%)" );
    var b = new Color( 0.36, 0.84, 0.648 );

    a.offsetHSL( 0.1, 0.1, 0.1 );

    assert.ok( Math.abs( a.r - b.r ) <= eps, "Check r" );
    assert.ok( Math.abs( a.g - b.g ) <= eps, "Check g" );
    assert.ok( Math.abs( a.b - b.b ) <= eps, "Check b" );

  } );

  it( "add", () => {

    var a = new Color( 0x0000FF );
    var b = new Color( 0xFF0000 );
    var c = new Color( 0xFF00FF );

    a.add( b );

    assert.ok( a.equals( c ), "Check new value" );

  } );

  it( "addColors", () => {

    var a = new Color( 0x0000FF );
    var b = new Color( 0xFF0000 );
    var c = new Color( 0xFF00FF );
    var d = new Color();

    d.addColors( a, b );

    assert.ok( d.equals( c ), "Passed" );


  } );

  it( "addScalar", () => {

    var a = new Color( 0.1, 0.0, 0.0 );
    var b = new Color( 0.6, 0.5, 0.5 );

    a.addScalar( 0.5 );

    assert.ok( a.equals( b ), "Check new value" );

  } );

  it( "sub", () => {

    var a = new Color( 0x0000CC );
    var b = new Color( 0xFF0000 );
    var c = new Color( 0x0000AA );

    a.sub( b );
    assert.strictEqual( a.getHex(), 0xCC, "Difference too large" );

    a.sub( c );
    assert.strictEqual( a.getHex(), 0x22, "Difference fine" );

  } );

  it( "multiply", () => {

    var a = new Color( 1, 0, 0.5 );
    var b = new Color( 0.5, 1, 0.5 );
    var c = new Color( 0.5, 0, 0.25 );

    a.multiply( b );
    assert.ok( a.equals( c ), "Check new value" );

  } );

  it( "multiplyScalar", () => {

    var a = new Color( 0.25, 0, 0.5 );
    var b = new Color( 0.5, 0, 1 );

    a.multiplyScalar( 2 );
    assert.ok( a.equals( b ), "Check new value" );

  } );

  it( "copyHex", () => {

    var c = new Color();
    var c2 = new Color( 0xF5FFFA );
    c.copy( c2 );
    assert.ok( c.getHex() == c2.getHex(), "Hex c: " + c.getHex() + " Hex c2: " + c2.getHex() );

  } );

  it( "copyColorString", () => {

    var c = new Color();
    var c2 = new Color( 'ivory' );
    c.copy( c2 );
    assert.ok( c.getHex() == c2.getHex(), "Hex c: " + c.getHex() + " Hex c2: " + c2.getHex() );

  } );

  it( "lerp", () => {

    var c = new Color();
    var c2 = new Color();
    c.setRGB( 0, 0, 0 );
    c.lerp( c2, 0.2 );
    assert.ok( c.r == 0.2, "Red: " + c.r );
    assert.ok( c.g == 0.2, "Green: " + c.g );
    assert.ok( c.b == 0.2, "Blue: " + c.b );

  } );

  it( "equals", () => {

    var a = new Color( 0.5, 0.0, 1.0 );
    var b = new Color( 0.5, 1.0, 0.0 );

    assert.strictEqual( a.r, b.r, "Components: r is equal" );
    assert.notStrictEqual( a.g, b.g, "Components: g is not equal" );
    assert.notStrictEqual( a.b, b.b, "Components: b is not equal" );

    assert.notOk( a.equals( b ), "equals(): a not equal b" );
    assert.notOk( b.equals( a ), "equals(): b not equal a" );

    a.copy( b );
    assert.strictEqual( a.r, b.r, "Components after copy(): r is equal" );
    assert.strictEqual( a.g, b.g, "Components after copy(): g is equal" );
    assert.strictEqual( a.b, b.b, "Components after copy(): b is equal" );

    assert.ok( a.equals( b ), "equals() after copy(): a equals b" );
    assert.ok( b.equals( a ), "equals() after copy(): b equals a" );

  } );

  it( "fromArray", () => {

    var a = new Color();
    var array = [ 0.5, 0.6, 0.7, 0, 1, 0 ];

    a.fromArray( array );
    assert.strictEqual( a.r, 0.5, "No offset: check r" );
    assert.strictEqual( a.g, 0.6, "No offset: check g" );
    assert.strictEqual( a.b, 0.7, "No offset: check b" );

    a.fromArray( array, 3 );
    assert.strictEqual( a.r, 0, "With offset: check r" );
    assert.strictEqual( a.g, 1, "With offset: check g" );
    assert.strictEqual( a.b, 0, "With offset: check b" );

  } );

  it( "toArray", () => {

    var r = 0.5, g = 1.0, b = 0.0;
    var a = new Color( r, g, b );

    var array = a.toArray();
    assert.strictEqual( array[ 0 ], r, "No array, no offset: check r" );
    assert.strictEqual( array[ 1 ], g, "No array, no offset: check g" );
    assert.strictEqual( array[ 2 ], b, "No array, no offset: check b" );

    array = [];
    a.toArray( array );
    assert.strictEqual( array[ 0 ], r, "With array, no offset: check r" );
    assert.strictEqual( array[ 1 ], g, "With array, no offset: check g" );
    assert.strictEqual( array[ 2 ], b, "With array, no offset: check b" );

    array = [];
    a.toArray( array, 1 );
    assert.strictEqual( array[ 0 ], undefined, "With array and offset: check [0]" );
    assert.strictEqual( array[ 1 ], r, "With array and offset: check r" );
    assert.strictEqual( array[ 2 ], g, "With array and offset: check g" );
    assert.strictEqual( array[ 3 ], b, "With array and offset: check b" );

  } );

  it( "toJSON", () => {

    var a = new Color( 0.0, 0.0, 0.0 );
    var b = new Color( 0.0, 0.5, 0.0 );
    var c = new Color( 1.0, 0.0, 0.0 );
    var d = new Color( 1.0, 1.0, 1.0 );

    assert.strictEqual( a.toJSON(), 0x000000, "Check black" );
    assert.strictEqual( b.toJSON(), 0x007F00, "Check half-blue" );
    assert.strictEqual( c.toJSON(), 0xFF0000, "Check red" );
    assert.strictEqual( d.toJSON(), 0xFFFFFF, "Check white" );

  } );

  // OTHERS
  it( "setWithNum", () => {

    var c = new Color();
    c.set( 0xFF0000 );
    assert.ok( c.r == 1, "Red: " + c.r );
    assert.ok( c.g === 0, "Green: " + c.g );
    assert.ok( c.b === 0, "Blue: " + c.b );

  } );

  it( "setWithString", () => {

    var c = new Color();
    c.set( 'silver' );
    assert.ok( c.getHex() == 0xC0C0C0, "Hex c: " + c.getHex() );

  } );

  it( "setStyleRGBRed", () => {

    var c = new Color();
    c.setStyle( 'rgb(255,0,0)' );
    assert.ok( c.r == 1, "Red: " + c.r );
    assert.ok( c.g === 0, "Green: " + c.g );
    assert.ok( c.b === 0, "Blue: " + c.b );

  } );

  it( "setStyleRGBARed", () => {

    var c = new Color();

    // console.level = CONSOLE_LEVEL.ERROR;
    c.setStyle( 'rgba(255,0,0,0.5)' );
    // console.level = CONSOLE_LEVEL.DEFAULT;

    assert.ok( c.r == 1, "Red: " + c.r );
    assert.ok( c.g === 0, "Green: " + c.g );
    assert.ok( c.b === 0, "Blue: " + c.b );

  } );

  it( "setStyleRGBRedWithSpaces", () => {

    var c = new Color();
    c.setStyle( 'rgb( 255 , 0,   0 )' );
    assert.ok( c.r == 1, "Red: " + c.r );
    assert.ok( c.g === 0, "Green: " + c.g );
    assert.ok( c.b === 0, "Blue: " + c.b );

  } );

  it( "setStyleRGBARedWithSpaces", () => {

    var c = new Color();
    c.setStyle( 'rgba( 255,  0,  0  , 1 )' );
    assert.ok( c.r == 1, "Red: " + c.r );
    assert.ok( c.g === 0, "Green: " + c.g );
    assert.ok( c.b === 0, "Blue: " + c.b );

  } );

  it( "setStyleRGBPercent", () => {

    var c = new Color();
    c.setStyle( 'rgb(100%,50%,10%)' );
    assert.ok( c.r == 1, "Red: " + c.r );
    assert.ok( c.g == 0.5, "Green: " + c.g );
    assert.ok( c.b == 0.1, "Blue: " + c.b );

  } );

  it( "setStyleRGBAPercent", () => {

    var c = new Color();

    // console.level = CONSOLE_LEVEL.ERROR;
    c.setStyle( 'rgba(100%,50%,10%, 0.5)' );
    // console.level = CONSOLE_LEVEL.DEFAULT;

    assert.ok( c.r == 1, "Red: " + c.r );
    assert.ok( c.g == 0.5, "Green: " + c.g );
    assert.ok( c.b == 0.1, "Blue: " + c.b );

  } );

  it( "setStyleRGBPercentWithSpaces", () => {

    var c = new Color();
    c.setStyle( 'rgb( 100% ,50%  , 10% )' );
    assert.ok( c.r == 1, "Red: " + c.r );
    assert.ok( c.g == 0.5, "Green: " + c.g );
    assert.ok( c.b == 0.1, "Blue: " + c.b );

  } );

  it( "setStyleRGBAPercentWithSpaces", () => {

    var c = new Color();

    // console.level = CONSOLE_LEVEL.ERROR;
    c.setStyle( 'rgba( 100% ,50%  ,  10%, 0.5 )' );
    // console.level = CONSOLE_LEVEL.DEFAULT;

    assert.ok( c.r == 1, "Red: " + c.r );
    assert.ok( c.g == 0.5, "Green: " + c.g );
    assert.ok( c.b == 0.1, "Blue: " + c.b );

  } );

  it( "setStyleHSLRed", () => {

    var c = new Color();
    c.setStyle( 'hsl(360,100%,50%)' );
    assert.ok( c.r == 1, "Red: " + c.r );
    assert.ok( c.g === 0, "Green: " + c.g );
    assert.ok( c.b === 0, "Blue: " + c.b );

  } );

  it( "setStyleHSLARed", () => {

    var c = new Color();

    // console.level = CONSOLE_LEVEL.ERROR;
    c.setStyle( 'hsla(360,100%,50%,0.5)' );
    // console.level = CONSOLE_LEVEL.DEFAULT;

    assert.ok( c.r == 1, "Red: " + c.r );
    assert.ok( c.g === 0, "Green: " + c.g );
    assert.ok( c.b === 0, "Blue: " + c.b );

  } );

  it( "setStyleHSLRedWithSpaces", () => {

    var c = new Color();
    c.setStyle( 'hsl(360,  100% , 50% )' );
    assert.ok( c.r == 1, "Red: " + c.r );
    assert.ok( c.g === 0, "Green: " + c.g );
    assert.ok( c.b === 0, "Blue: " + c.b );

  } );

  it( "setStyleHSLARedWithSpaces", () => {

    var c = new Color();

    // console.level = CONSOLE_LEVEL.ERROR;
    c.setStyle( 'hsla( 360,  100% , 50%,  0.5 )' );
    // console.level = CONSOLE_LEVEL.DEFAULT;

    assert.ok( c.r == 1, "Red: " + c.r );
    assert.ok( c.g === 0, "Green: " + c.g );
    assert.ok( c.b === 0, "Blue: " + c.b );

  } );

  it( "setStyleHexSkyBlue", () => {

    var c = new Color();
    c.setStyle( '#87CEEB' );
    assert.ok( c.getHex() == 0x87CEEB, "Hex c: " + c.getHex() );

  } );

  it( "setStyleHexSkyBlueMixed", () => {

    var c = new Color();
    c.setStyle( '#87cEeB' );
    assert.ok( c.getHex() == 0x87CEEB, "Hex c: " + c.getHex() );

  } );

  it( "setStyleHex2Olive", () => {

    var c = new Color();
    c.setStyle( '#F00' );
    assert.ok( c.getHex() == 0xFF0000, "Hex c: " + c.getHex() );

  } );

  it( "setStyleHex2OliveMixed", () => {

    var c = new Color();
    c.setStyle( '#f00' );
    assert.ok( c.getHex() == 0xFF0000, "Hex c: " + c.getHex() );

  } );

  it( "setStyleColorName", () => {

    var c = new Color();
    c.setStyle( 'powderblue' );
    assert.ok( c.getHex() == 0xB0E0E6, "Hex c: " + c.getHex() );

  } );


} );

