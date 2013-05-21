!function(r,n,t){function u(t,i){if(!n[t]){if(!r[t]){var o=typeof require=="function"&&require;if(!i&&o)return o(t,!0);if(e)return e(t,!0);throw new Error("Cannot find module '"+t+"'")}var a=n[t]={exports:{}};r[t][0].call(a.exports,function(n){var e=r[t][1][n];return u(e?e:n)},a,a.exports)}return n[t].exports}var e=typeof require=="function"&&require;for(var i=0;i<t.length;i++)u(t[i]);return u}({1:[function(r,n,t){!function(){var n=r("./index");if(!window.fjs){window.fjs=n}else{throw new Error("fjs global variable already defined")}}()},{"./index":2}],2:[function(r,n,t){var u={};/*
 * FUNCTIONS
 */
var e=u.compose=function(){var r=G(arguments);return function(){return g(function(r,n){return n.apply(this,[r])},R(r).apply(this,arguments),k(r))}};var i=u.partial=function(r){var n=S(G(arguments));return function(){return r.apply(this,n.concat(G(arguments)))}};var o=u.id=function(r){return r};var a=u.functor=function(r){if(P(r))return r;else return function(){return r}};/*
 * COLLECTIONS
 */
var f=u.each=function(r,n){if(N(n)){f(function(t,u,e){return r(n[t],t,n)},x(n))}else{for(var t=0,u=n.length;t<u;t+=1){if(true===r(n[t],t,n))break}}};var c=u.eachRight=function(r,n){if(N(n)){c(function(t,u,e){r(n[t],t,n)},x(n))}else{for(var t=n.length-1;t>=0;t-=1){r(n[t],t,n)}}};var v=u.map=function(r,n){var t=[];f(function(n,u,e){t.push(r(n,u,e))},n);return t};var l=u.reduce=function(r,n,t){var u=n;f(function(n,t,e){u=r(u,n,t,e)},t);return u};var s=u.fold=l;var d=u.reduce1=function(r,n){var t;t=null;f(function(n,u,e){if(t!==null){return t=r(t,n,u,e)}else{return t=n}},n);return t};var p=u.fold1=d;var g=u.reduceRight=function(r,n,t){var u=n;c(function(n,t,e){u=r(u,n,t,e)},t);return u};var h=u.foldR=g;var b=u.reduceRight1=function(r,n){var t;t=null;c(function(n,u,e){if(t!==null){return t=r(t,n,u,e)}else{return t=n}},n);return t};var m=u.foldR1=b;var y=u.find=function(r,n){var t=null;f(function(u,e){if(r(u,e,n)){t=u;return true}},n);return t};var j=u.detect=y;var w=u.filter=function(r,n){return l(function(t,u,e){if(r(u,e,n))t.push(u);return t},[],n)};var q=u.select=w;/*
 * OBJECTS
 */
var x=u.keys=Object.keys||function(r){var n=[];for(var t in r){if(r.hasOwnProperty(t)){n.push(t)}}return n};/*
 * ARRAYS
 */
var O=u.first=function(r){return r[0]};var R=u.last=function(r){return r[r.length-1]};var S=u.rest=function(r){return r.slice(1)};var k=u.initial=function(r){return r.slice(0,r.length-1)};var A=u.concat=function(){var r=G(arguments);return d(function(r,n,t,u){return r.concat(n)},r)};/*
 * UTILITIES
 * =========
 */
// TYPES
// -----
objToString={}.toString;var F=u.typeOf=function(r){return objToString.call(r).slice(8,-1)};var T=u.isA=function(r,n){return r===F(n)};var B=u.isNumber=function(r){return T("Number",r)};var E=u.isArray=function(r){return T("Array",r)};var N=u.isObject=function(r){return T("Object",r)};var C=u.isString=function(r){return T("String",r)};var P=u.isFunction=function(r){return T("Function",r)};var z=u.isBoolean=function(r){return T("Boolean",r)};// ARGUMENTS
// ---------
var D=[].slice;var G=function(r){return D.call(r)};// TO FUNCTION
// -----------
var H=u.objToFunc=function(r){return function(n){return r[n]}};var I=u.prop=function(r){return function(n){return n[r]}};// OPERATORS as functions
// ----------------------
var J=u.add=function(r,n){return r+n};var K=u.sub=function(r,n){return r-n};var L=u.mul=function(r,n){return r*n};var M=u.div=function(r,n){return r/n};var Q=u.mod=function(r,n){return r%n};var U=u.eq=function(r,n){return r===n};var V=u.eqc=function(r,n){return r==n};var W=u.neq=function(r,n){return r!==n};var X=u.neqc=function(r,n){return r!=n};var Y=u.gt=function(r,n){return r>n};var Z=u.ge=function(r,n){return r>=n};var $=u.lt=function(r,n){return r<n};var _=u.le=function(r,n){return r<=n};var rn=u.not=function(r){return!r};var nn=u.and=function(r,n){return r&&n};var tn=u.or=function(r,n){return r||n};n.exports=u},{}]},{},[1]);