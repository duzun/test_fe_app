/*
 MIT
 @repo    https://github.com/duzun/classifyed.js
*/
(function(n,q){("function"===typeof define&&define.amd?define:"undefined"!=typeof module&&module.exports?function(h,g){module.exports=g()}:function(h,g){n[q]=g()})([],function(){function h(a,d){if(!a)return a;var b,c,e;for(b in a)if(l.call(a,b)&&(c=a[b],!1===d.call(c,b,c,a)))return b;if(t)for(e=u;0<e--;)if(l.call(a,b=r[e])&&(c=a[b],!1===d.call(c,b,c,a)))return b;return a}function g(a){function d(b,c){a[b]=c}h(arguments,function(a,c){a&&h(c,d)});return a}function k(){}function s(a){var d=a.displayName||
a.name;d||(d=(d=(a+"").match(/function\s+([^\(]*)/))?d[1]:n);return d}var n,l=Object.prototype.hasOwnProperty,p=Object.create,t=!{toString:null}.propertyIsEnumerable("toString"),r="propertyIsEnumerable isPrototypeOf toLocaleString hasOwnProperty valueOf toString constructor".split(" "),u=r.length;k.type=q;var m=k.prototype;k.extend=function(a,d){var b=this,c,e;"function"==typeof a&&(a={constructor:a});a&&l.call(a,"constructor")&&(c=a.constructor)&&c!==Object||(c=function(){return b.apply(this,arguments)});
g(c,b,d);var f=b.prototype;c.prototype=e=p(f);e.constructor=c;g(e,a);c.__super__=f;return c};k.parent=function(a,d){var b=this;return(b=b.__super__)&&b.constructor};m.__super__=function(a,d){var b="[super@"+a+"]:cons",c=b in this?this[b]:this.constructor,e;for(;e=c.__super__;)if(c=e.constructor,l.call(e,a)){var f=e[a];e=b in this;if(!f.apply&&!f.call)throw Error("Invalid method for "+s(c)+".__super__("+a+")",f);this[b]=c;c=f.apply?f.apply(this,d||[]):f.call(this,d&&d[0]);e||delete this[b];return c}};
m.each=h;m.assign=g;m.funcName=s;"function"!=typeof p&&(p=function(a){return function(d){a.prototype=d;var b=new a;a.prototype=null;b.__proto__=d;b.__proto__=d;return b}}(function(){}));return k})})(this,"Classifyed");
