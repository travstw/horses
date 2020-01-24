!function(t){var e={};function s(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=e,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(n,i,function(e){return t[e]}.bind(null,i));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=4)}([,function(t,e,s){var n,i,r=s(2),o=s(3),a=0,c=0;t.exports=function(t,e,s){var u=e&&s||0,h=e||[],d=(t=t||{}).node||n,l=void 0!==t.clockseq?t.clockseq:i;if(null==d||null==l){var p=r();null==d&&(d=n=[1|p[0],p[1],p[2],p[3],p[4],p[5]]),null==l&&(l=i=16383&(p[6]<<8|p[7]))}var f=void 0!==t.msecs?t.msecs:(new Date).getTime(),g=void 0!==t.nsecs?t.nsecs:c+1,v=f-a+(g-c)/1e4;if(v<0&&void 0===t.clockseq&&(l=l+1&16383),(v<0||f>a)&&void 0===t.nsecs&&(g=0),g>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");a=f,c=g,i=l;var b=(1e4*(268435455&(f+=122192928e5))+g)%4294967296;h[u++]=b>>>24&255,h[u++]=b>>>16&255,h[u++]=b>>>8&255,h[u++]=255&b;var m=f/4294967296*1e4&268435455;h[u++]=m>>>8&255,h[u++]=255&m,h[u++]=m>>>24&15|16,h[u++]=m>>>16&255,h[u++]=l>>>8|128,h[u++]=255&l;for(var y=0;y<6;++y)h[u+y]=d[y];return e||o(h)}},function(t,e){var s="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(s){var n=new Uint8Array(16);t.exports=function(){return s(n),n}}else{var i=new Array(16);t.exports=function(){for(var t,e=0;e<16;e++)0==(3&e)&&(t=4294967296*Math.random()),i[e]=t>>>((3&e)<<3)&255;return i}}},function(t,e){for(var s=[],n=0;n<256;++n)s[n]=(n+256).toString(16).substr(1);t.exports=function(t,e){var n=e||0,i=s;return[i[t[n++]],i[t[n++]],i[t[n++]],i[t[n++]],"-",i[t[n++]],i[t[n++]],"-",i[t[n++]],i[t[n++]],"-",i[t[n++]],i[t[n++]],"-",i[t[n++]],i[t[n++]],i[t[n++]],i[t[n++]],i[t[n++]],i[t[n++]]].join("")}},function(t,e,s){"use strict";s.r(e);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s])})(t,e)};function i(t,e){function s(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(s.prototype=e.prototype,new s)}function r(t){return"function"==typeof t}var o=!1,a={Promise:void 0,set useDeprecatedSynchronousErrorHandling(t){t&&(new Error).stack;o=t},get useDeprecatedSynchronousErrorHandling(){return o}};function c(t){setTimeout((function(){throw t}),0)}var u={closed:!0,next:function(t){},error:function(t){if(a.useDeprecatedSynchronousErrorHandling)throw t;c(t)},complete:function(){}},h=function(){return Array.isArray||function(t){return t&&"number"==typeof t.length}}();var d=function(){function t(t){return Error.call(this),this.message=t?t.length+" errors occurred during unsubscription:\n"+t.map((function(t,e){return e+1+") "+t.toString()})).join("\n  "):"",this.name="UnsubscriptionError",this.errors=t,this}return t.prototype=Object.create(Error.prototype),t}(),l=function(){function t(t){this.closed=!1,this._parentOrParents=null,this._subscriptions=null,t&&(this._unsubscribe=t)}return t.prototype.unsubscribe=function(){var e;if(!this.closed){var s,n=this._parentOrParents,i=this._unsubscribe,o=this._subscriptions;if(this.closed=!0,this._parentOrParents=null,this._subscriptions=null,n instanceof t)n.remove(this);else if(null!==n)for(var a=0;a<n.length;++a){n[a].remove(this)}if(r(i))try{i.call(this)}catch(t){e=t instanceof d?p(t.errors):[t]}if(h(o)){a=-1;for(var c=o.length;++a<c;){var u=o[a];if(null!==(s=u)&&"object"==typeof s)try{u.unsubscribe()}catch(t){e=e||[],t instanceof d?e=e.concat(p(t.errors)):e.push(t)}}}if(e)throw new d(e)}},t.prototype.add=function(e){var s=e;if(!e)return t.EMPTY;switch(typeof e){case"function":s=new t(e);case"object":if(s===this||s.closed||"function"!=typeof s.unsubscribe)return s;if(this.closed)return s.unsubscribe(),s;if(!(s instanceof t)){var n=s;(s=new t)._subscriptions=[n]}break;default:throw new Error("unrecognized teardown "+e+" added to Subscription.")}var i=s._parentOrParents;if(null===i)s._parentOrParents=this;else if(i instanceof t){if(i===this)return s;s._parentOrParents=[i,this]}else{if(-1!==i.indexOf(this))return s;i.push(this)}var r=this._subscriptions;return null===r?this._subscriptions=[s]:r.push(s),s},t.prototype.remove=function(t){var e=this._subscriptions;if(e){var s=e.indexOf(t);-1!==s&&e.splice(s,1)}},t.EMPTY=function(t){return t.closed=!0,t}(new t),t}();function p(t){return t.reduce((function(t,e){return t.concat(e instanceof d?e.errors:e)}),[])}var f=function(){return"function"==typeof Symbol?Symbol("rxSubscriber"):"@@rxSubscriber_"+Math.random()}(),g=function(t){function e(s,n,i){var r=t.call(this)||this;switch(r.syncErrorValue=null,r.syncErrorThrown=!1,r.syncErrorThrowable=!1,r.isStopped=!1,arguments.length){case 0:r.destination=u;break;case 1:if(!s){r.destination=u;break}if("object"==typeof s){s instanceof e?(r.syncErrorThrowable=s.syncErrorThrowable,r.destination=s,s.add(r)):(r.syncErrorThrowable=!0,r.destination=new v(r,s));break}default:r.syncErrorThrowable=!0,r.destination=new v(r,s,n,i)}return r}return i(e,t),e.prototype[f]=function(){return this},e.create=function(t,s,n){var i=new e(t,s,n);return i.syncErrorThrowable=!1,i},e.prototype.next=function(t){this.isStopped||this._next(t)},e.prototype.error=function(t){this.isStopped||(this.isStopped=!0,this._error(t))},e.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,t.prototype.unsubscribe.call(this))},e.prototype._next=function(t){this.destination.next(t)},e.prototype._error=function(t){this.destination.error(t),this.unsubscribe()},e.prototype._complete=function(){this.destination.complete(),this.unsubscribe()},e.prototype._unsubscribeAndRecycle=function(){var t=this._parentOrParents;return this._parentOrParents=null,this.unsubscribe(),this.closed=!1,this.isStopped=!1,this._parentOrParents=t,this},e}(l),v=function(t){function e(e,s,n,i){var o,a=t.call(this)||this;a._parentSubscriber=e;var c=a;return r(s)?o=s:s&&(o=s.next,n=s.error,i=s.complete,s!==u&&(r((c=Object.create(s)).unsubscribe)&&a.add(c.unsubscribe.bind(c)),c.unsubscribe=a.unsubscribe.bind(a))),a._context=c,a._next=o,a._error=n,a._complete=i,a}return i(e,t),e.prototype.next=function(t){if(!this.isStopped&&this._next){var e=this._parentSubscriber;a.useDeprecatedSynchronousErrorHandling&&e.syncErrorThrowable?this.__tryOrSetError(e,this._next,t)&&this.unsubscribe():this.__tryOrUnsub(this._next,t)}},e.prototype.error=function(t){if(!this.isStopped){var e=this._parentSubscriber,s=a.useDeprecatedSynchronousErrorHandling;if(this._error)s&&e.syncErrorThrowable?(this.__tryOrSetError(e,this._error,t),this.unsubscribe()):(this.__tryOrUnsub(this._error,t),this.unsubscribe());else if(e.syncErrorThrowable)s?(e.syncErrorValue=t,e.syncErrorThrown=!0):c(t),this.unsubscribe();else{if(this.unsubscribe(),s)throw t;c(t)}}},e.prototype.complete=function(){var t=this;if(!this.isStopped){var e=this._parentSubscriber;if(this._complete){var s=function(){return t._complete.call(t._context)};a.useDeprecatedSynchronousErrorHandling&&e.syncErrorThrowable?(this.__tryOrSetError(e,s),this.unsubscribe()):(this.__tryOrUnsub(s),this.unsubscribe())}else this.unsubscribe()}},e.prototype.__tryOrUnsub=function(t,e){try{t.call(this._context,e)}catch(t){if(this.unsubscribe(),a.useDeprecatedSynchronousErrorHandling)throw t;c(t)}},e.prototype.__tryOrSetError=function(t,e,s){if(!a.useDeprecatedSynchronousErrorHandling)throw new Error("bad call");try{e.call(this._context,s)}catch(e){return a.useDeprecatedSynchronousErrorHandling?(t.syncErrorValue=e,t.syncErrorThrown=!0,!0):(c(e),!0)}return!1},e.prototype._unsubscribe=function(){var t=this._parentSubscriber;this._context=null,this._parentSubscriber=null,t.unsubscribe()},e}(g);var b=function(){return"function"==typeof Symbol&&Symbol.observable||"@@observable"}();function m(){}function y(t){return t?1===t.length?t[0]:function(e){return t.reduce((function(t,e){return e(t)}),e)}:m}var E=function(){function t(t){this._isScalar=!1,t&&(this._subscribe=t)}return t.prototype.lift=function(e){var s=new t;return s.source=this,s.operator=e,s},t.prototype.subscribe=function(t,e,s){var n=this.operator,i=function(t,e,s){if(t){if(t instanceof g)return t;if(t[f])return t[f]()}return t||e||s?new g(t,e,s):new g(u)}(t,e,s);if(n?i.add(n.call(i,this.source)):i.add(this.source||a.useDeprecatedSynchronousErrorHandling&&!i.syncErrorThrowable?this._subscribe(i):this._trySubscribe(i)),a.useDeprecatedSynchronousErrorHandling&&i.syncErrorThrowable&&(i.syncErrorThrowable=!1,i.syncErrorThrown))throw i.syncErrorValue;return i},t.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(e){a.useDeprecatedSynchronousErrorHandling&&(t.syncErrorThrown=!0,t.syncErrorValue=e),!function(t){for(;t;){var e=t,s=e.closed,n=e.destination,i=e.isStopped;if(s||i)return!1;t=n&&n instanceof g?n:null}return!0}(t)?console.warn(e):t.error(e)}},t.prototype.forEach=function(t,e){var s=this;return new(e=w(e))((function(e,n){var i;i=s.subscribe((function(e){try{t(e)}catch(t){n(t),i&&i.unsubscribe()}}),n,e)}))},t.prototype._subscribe=function(t){var e=this.source;return e&&e.subscribe(t)},t.prototype[b]=function(){return this},t.prototype.pipe=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return 0===t.length?this:y(t)(this)},t.prototype.toPromise=function(t){var e=this;return new(t=w(t))((function(t,s){var n;e.subscribe((function(t){return n=t}),(function(t){return s(t)}),(function(){return t(n)}))}))},t.create=function(e){return new t(e)},t}();function w(t){if(t||(t=a.Promise||Promise),!t)throw new Error("no Promise impl found");return t}var x=function(){function t(){return Error.call(this),this.message="object unsubscribed",this.name="ObjectUnsubscribedError",this}return t.prototype=Object.create(Error.prototype),t}(),S=function(t){function e(e,s){var n=t.call(this)||this;return n.subject=e,n.subscriber=s,n.closed=!1,n}return i(e,t),e.prototype.unsubscribe=function(){if(!this.closed){this.closed=!0;var t=this.subject,e=t.observers;if(this.subject=null,e&&0!==e.length&&!t.isStopped&&!t.closed){var s=e.indexOf(this.subscriber);-1!==s&&e.splice(s,1)}}},e}(l),T=function(t){function e(e){var s=t.call(this,e)||this;return s.destination=e,s}return i(e,t),e}(g),_=function(t){function e(){var e=t.call(this)||this;return e.observers=[],e.closed=!1,e.isStopped=!1,e.hasError=!1,e.thrownError=null,e}return i(e,t),e.prototype[f]=function(){return new T(this)},e.prototype.lift=function(t){var e=new k(this,this);return e.operator=t,e},e.prototype.next=function(t){if(this.closed)throw new x;if(!this.isStopped)for(var e=this.observers,s=e.length,n=e.slice(),i=0;i<s;i++)n[i].next(t)},e.prototype.error=function(t){if(this.closed)throw new x;this.hasError=!0,this.thrownError=t,this.isStopped=!0;for(var e=this.observers,s=e.length,n=e.slice(),i=0;i<s;i++)n[i].error(t);this.observers.length=0},e.prototype.complete=function(){if(this.closed)throw new x;this.isStopped=!0;for(var t=this.observers,e=t.length,s=t.slice(),n=0;n<e;n++)s[n].complete();this.observers.length=0},e.prototype.unsubscribe=function(){this.isStopped=!0,this.closed=!0,this.observers=null},e.prototype._trySubscribe=function(e){if(this.closed)throw new x;return t.prototype._trySubscribe.call(this,e)},e.prototype._subscribe=function(t){if(this.closed)throw new x;return this.hasError?(t.error(this.thrownError),l.EMPTY):this.isStopped?(t.complete(),l.EMPTY):(this.observers.push(t),new S(this,t))},e.prototype.asObservable=function(){var t=new E;return t.source=this,t},e.create=function(t,e){return new k(t,e)},e}(E),k=function(t){function e(e,s){var n=t.call(this)||this;return n.destination=e,n.source=s,n}return i(e,t),e.prototype.next=function(t){var e=this.destination;e&&e.next&&e.next(t)},e.prototype.error=function(t){var e=this.destination;e&&e.error&&this.destination.error(t)},e.prototype.complete=function(){var t=this.destination;t&&t.complete&&this.destination.complete()},e.prototype._subscribe=function(t){return this.source?this.source.subscribe(t):l.EMPTY},e}(_),B=function(t){function e(e){var s=t.call(this)||this;return s._value=e,s}return i(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return this.getValue()},enumerable:!0,configurable:!0}),e.prototype._subscribe=function(e){var s=t.prototype._subscribe.call(this,e);return s&&!s.closed&&e.next(this._value),s},e.prototype.getValue=function(){if(this.hasError)throw this.thrownError;if(this.closed)throw new x;return this._value},e.prototype.next=function(e){t.prototype.next.call(this,this._value=e)},e}(_);class P{constructor(){this.logs=[],this.element=document.getElementById("logs")}log(t){}render(){this.logs.forEach(t=>{console.log(t)}),this.element.innerHTML=""}}const R=t=>{const e=new Request(t);return fetch(e).then(t=>t.arrayBuffer())},A=(t,e)=>(t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t+1))+t),O=(t,e)=>"string"==typeof e?t.getAudioParam(e):e;class L{static setValueAtTime(t,e,s,n){const i=O(t,e);i?i.setValueAtTime(s,n):console.error("No audio param found",t.name,e)}static linearRampToValueAtTime(t,e,s,n){const i=O(t,e);i?i.linearRampToValueAtTime(s,n):console.error("No audio param found",t.name,e)}static exponentialRampToValueAtTime(t,e,s,n){const i=O(t,e);i?i.linearRampToValueAtTime(s,n):console.error("No audio param found",t.name,e)}static setTargetAtTime(t,e,s,n,i){const r=O(t,e);r?r.setTargetAtTime(s,n,i):console.error("No audio param found",t.name,e)}static setValueCurveAtTime(t,e,s,n,i){const r=O(t,e);r?r.setValueCurveAtTime(s,n,i):console.error("No audio param found",t.name,e)}static cancelScheduledValues(t,e,s){const n=O(t,e);n?n.cancelScheduledValues(s):console.error("No audio param found",t.name,e)}static cancelAndHoldAtTime(t,e,s){const n=this.setAudioParam(t,e);n?n.cancelAndHoldAtTime(s):console.error("No audio param found",t.name,e)}}class M{constructor(t,e,s){this.schedulers=t,this.scheduleEvent$=e,this.timers=[],this.density=1,this.started=!1,this.settings$=s,this.settings$.subscribe(t=>{this.density=t.song.density,t.changed&&"density"===t.changed&&this.started&&(this.stop(),this.start(!0))})}schedule(t,e){const s=e?0:A(t.range[0],t.range[1]),n=setTimeout(()=>{this.scheduleEvent$.next(t.event),this.timers=this.timers.reduce((t,e)=>e===n?t:(t.push(e),t),[]),this.schedule(t)},1e3*s);this.timers.push(n)}start(t){console.log("scheduler started"),this.started=!0,this.active=!0,this.schedulers.forEach(e=>{for(let s=0;s<this.density;s++)this.schedule(e,t)})}stop(){this.timers.forEach(t=>clearTimeout(t)),this.timers=[],this.active=!1}}class ${constructor(t){this.context=t.context,this.name=t.name,this.type="audio",this.isReady=!1,this.ready$=new B(!1),this.ended$=new _,this.context.decodeAudioData(t.buffer).then(e=>{this.decodedBuffer=e,this.createSourceNode(t.params)})}createSourceNode(t={}){this.node=this.context.createBufferSource(),this.node.buffer=this.decodedBuffer,this.node.loop=t.loop||!0,this.isReady=!0,this.ready$.next(!0),this.node.onended=t=>{this.ended$.next(!0)}}connect(t){this.node.connect(t)}disconnect(t){this.node.disconnect(t)}ended(){return this.ended$}start(t){this.isReady&&this.node.start(t,0)}stop(t){this.node.stop(t)}getAllAudioParams(){return{audio:{detune:this.node.detune,playbackRate:this.node.playbackRate}}}getAudioParam(t){return{detune:this.node.detune,playbackRate:this.node.playbackRate}[t]}ready(){return this.ready$}}class C{constructor(t){this.context=t.context,this.node=this.context.createGain()}get value(){return this.node.gain.value}set value(t){this.node.gain.value=t}connect(t){this.node.connect(t)}disconnect(t){this.node.disconnect(t)}getAllAudioParams(){return{gain:{gain:this.node.gain}}}getAudioParam(t){return{gain:this.node.gain}[t]}}class V{constructor(t){this.context=t.context,this.node=this.context.createStereoPanner()}connect(t){this.node.connect(t)}disconnect(t){this.node.disconnect(t)}getAllAudioParams(){return{pan:{pan:this.node.pan}}}getAudioParam(t){return{pan:this.node.pan}[t]}}class N{constructor(t){this.context=t.context,this.node=this.context.createDelay(),this.feedbackNode=this.context.createGain(),this.lpfNode=this.context.createBiquadfilter(),this.delay=t.delay,this.node.delayTime.value=this.delay,this.feedback=t.feedback||.3,this.feedbackNode.gain.value=this.feedback,this.lpfNode.frequency.value=t.lfp||5e3,this.node.connect(this.feedbackNode),this.feedbackNode.connect(this.lpfNode),this.lpfNode.connect(this.node)}connect(t){this.node.connect(t)}disconnect(t){this.node.disconnect(t)}getAllAudioParams(){return{delay:{delay:this.node.delayTime,feedback:this.feedbackNode.gain,lpf:this.lpfNode.frequency}}}getAudioParam(t){return{delay:this.node.delayTime,feedback:this.feedbackNode.gain,lpf:this.lpfNode.frequency}[t]}}class I{constructor(t){this.context=t.context,this.gain=new D(t.gain),this.curve=this.createCurve(),this.node=this.context.createWaveShaper(),this.node.curve=this.createCurve(),this.node.oversample="2x"}connect(t){this.node.connect(t)}disconnect(t){this.node.disconnect(t)}createCurve(){const t=this.context.sampleRate;this.curve=new Float32Array(t);const e=Math.PI/180;let s,n=0;for(;n<t;++n)s=2*n/t-1,curve[n]=(3+this.gain)*s*20*e/(Math.PI+this.gain*Math.abs(s));return curve}getAllAudioParams(){return{distortion:{gain:this.gain}}}getAudioParam(t){return{gain:this.gain}[t]}}class D extends AudioParam{constructor(t){super(),this.name="gain",this.defaultValue=0,this.maxValue=100,this.minValue=0,this.value=t}}class j{constructor(t){this.context=t.context,this.node=new ConstantSourceNode(this.context,{offset:0})}get value(){return this.node.offset.value}connect(t){this.node.connect(t)}disconnect(t){this.node.disconnect(t)}start(t=0){this.node.start(t)}stop(t=0){this.node.stop(t)}getAllAudioParams(){return{constantSource:{offset:this.node.offset}}}getAudioParam(t){return{offset:this.node.offset}[t]}}class F{constructor(t){this.context=t.context,this.node=this.context.createConvolver(),this.type="convolver",this.ready$=new B(!1),this.context.decodeAudioData(t.buffer).then(t=>{this.node.buffer=t,this.ready$.next(!0)})}connect(t){this.node.connect(t)}disconnect(t){this.node.disconnect(t)}ready(){return this.ready$}}class H{static createNode(t,e){switch(t){case"audio":return new $(e);case"gain":return new C(e);case"pan":return new V(e);case"convolver":case"reverb":return new F(e);case"delay":return new N(e);case"distortion":return new I(e);case"constantSource":return new j(e);default:console.error(`${t} is not a known node type`)}}}var q=s(1);class G{constructor(t){this.id=q(),this.context=t.context,this.logger=t.logger,this.trackMetadata=t.trackMetadata,this.audio=t.audio,this.name=t.name,this.endedEvent$=t.endedEvent$,this.output=H.createNode("gain",{context:this.context}),this.nodes=[this.audio,...t.nodes||[],this.output],this.analyser=this.context.createAnalyser(),this.drift=t.drift,this.secondsPerBeat=t.secondsPerBeat,this.duration=t.duration,this.fadeIn=t.fadeIn,this.fadeOut=t.fadeOut,this.automationService=t.automationService,this.audio.ready().subscribe(t=>{if(t){this.patchSignalChain(),L.setValueAtTime(this.output,"gain",0,this.context.currentTime);const t=this.calculateStartOffset();console.log(this.name,t,this.context.currentTime),this.start(t+this.drift),L.linearRampToValueAtTime(this.output,"gain",.75,t+this.drift+this.fadeIn),this.duration&&L.setTargetAtTime(this.output,"gain",0,t+(this.duration-this.fadeOut),this.fadeOut/3),this.duration&&this.stop(t+this.drift+this.duration),this.audio.ended().subscribe(()=>{this.audio=null,this.endedEvent$.next(this.id)})}})}calculateStartOffset(){const t=this.trackMetadata.startOffset||0,e=this.trackMetadata.lengthInBeats;let s,n=this.secondsPerBeat*e;if(this.context.currentTime<n)s=n+t*this.secondsPerBeat;else{s=(Math.floor(this.context.currentTime/(this.secondsPerBeat*e))+1)*n+t*this.secondsPerBeat}return s}playing(){}patchSignalChain(){for(let t=0;t<this.nodes.length;t++)0!==t&&this.nodes[t-1].connect(this.nodes[t].node)}start(t=0){this.audio.start(t)}stop(t=0){this.audio.stop(t)}getChannelAudioParams(){return this.nodes.reduce((t,e)=>{const s=e.getAllAudioParams();return Object.assign(t,s),t},{})}}class U{constructor(t,e,s,n,i){this.context=t,this.channels=[],this.logger=new P,this.scheduleEvent$=new _,this.endedEvent$=new _,this.playEvent$=new _,this.currentPlaying$=new B([]),this.mediaService=i,this.settingsService=n,this.impulseService=s,this.stereoBus=e,this.settingsService.settings$.subscribe(t=>{this.settings=t,this.tracks||(this.tracks=this.settings.tracks),this.updateOnSettingsChange()})}async init(){if(this.startTime=this.context.currentTime,this.secondsPerBeat=60/this.settings.song.bpm,this.scheduler=new M(this.settings.song.schedulers,this.scheduleEvent$,this.settingsService.settings$),this.scheduleEvent$.subscribe(t=>this.onScheduleEvent(t)),this.endedEvent$.subscribe(t=>this.onEndedEvent(t)),this.settings.song.length){const t=this.settings.song.length-30;this.stereoBus.setFadeOut(t,30)}this.envelope=H.createNode("gain",{context:this.context}),this.envelope.value=0,this.stereoBus.connect(this.envelope.node),this.updateEnvelope(this.envelope,this.settings.song.envelope),this.driftEnvelope=H.createNode("gain",{context:this.context}),this.driftEnvelope.value=0,this.stereoBus.connect(this.driftEnvelope.node),this.updateEnvelope(this.driftEnvelope,this.settings.song.driftEnvelope),await this.loadStaticTracks()}updateOnSettingsChange(){if(this.settings&&this.settings.changed&&this.startTime)switch(this.settings.changed.field){case"length":this.updateStereoBusFadeOut(),this.updateEnvelope(this.envelope,this.settings.song.envelope),this.updateEnvelope(this.driftEnvelope,this.settings.song.driftEnvelope);break;case"envelope":this.updateEnvelope(this.envelope,this.settings.song.envelope);break;case"driftEnvelope":this.updateEnvelope(this.driftEnvelope,this.settings.song.driftEnvelope);break;case"mode":"free"===this.settings.song.mode?(console.log("here"),this.killChannelsByQuery(t=>!!t.trackMetadata.static)):this.loadStaticTracks();break;case"tracks":const t=this.settings.song.tracks;console.log("type",t);const e="all"===t?["vocals","instrument","ambient"]:t.split("-");this.killChannelsByQuery(t=>!e.includes(t.trackMetadata.type))}}start(){const t="free"===this.settings.song.mode?0:15e3;setTimeout(()=>{this.scheduler.start(!!t)},t)}async loadStaticTracks(){const t="structured"===this.settings.song.mode?["instrument","ambient","vocals","nature"]:["nature"];for(let e=0;e<this.tracks.length;e++)if(this.tracks[e].static&&t.includes(this.tracks[e].type)){const t=this.tracks[e],s=t.title;this.logger.log(`Loading Track '${s}'`);const n=await this.getBuffer(t.filename);if(!n)return;const i=H.createNode("audio",{context:this.context,name:s,buffer:n}),{fadeIn:r}=this.getFadeTimes(),o={context:this.context,logger:this.logger,trackMetadata:t,audio:i,nodes:[],name:s,playEvent$:this.playEvent$,endedEvent$:this.endedEvent$,drift:0,secondsPerBeat:this.secondsPerBeat,fadeIn:r};this.createChannel(o)}}async onScheduleEvent(t){const e=this.settings.song.tracks;if(!("all"===e?["vocals","instrument","ambient"]:e.split("-")).includes(t))return;const s=this.tracks.filter(e=>{const s="free"===this.settings.song.mode||!e.static,n=this.envelope.value>=e.playThreshold,i=e.type===t;return s&&n&&i});if(!s.length)return void console.log("why no tracks?",this.envelope.value);const n=s[A(0,s.length-1)],i=n.title,r=await this.getBuffer(n.filename);if(!r)return;const o=H.createNode("audio",{context:this.context,name:i,buffer:r}),{fadeIn:a,fadeOut:c}=this.getFadeTimes(),u=this.getDuration(),h=this.getTheDrift(n);console.log("drift:",h);const d={context:this.context,logger:this.logger,trackMetadata:n,audio:o,nodes:[],name:i,playEvent$:this.playEvent$,endedEvent$:this.endedEvent$,drift:h,secondsPerBeat:this.secondsPerBeat,duration:u,fadeIn:a,fadeOut:c};this.createChannel(d)}async getBuffer(t){try{return await this.mediaService.getTrack(t)}catch(t){return void console.error(t)}}createChannel(t){const e=new G(t);this.channels.push(e),this.stereoBus.connect(e.output.node)}stopAll(){this.channels.forEach(t=>t.stop(0)),this.scheduler.stop(),this.channels=[]}onEndedEvent(t){const e=this.channels.find(e=>e.id===t);e&&(this.stereoBus.disconnect(e.output),this.logger.log(`Track '${e.name}' ended`),this.channels=this.channels.filter(e=>e.id!==t))}updateEnvelope(t,e){L.cancelScheduledValues(t,"gain",0);const s=(this.settings.song.length?this.settings.song.length:300)-(this.context.currentTime-this.startTime)-30,n=t.value;switch(e){case"linear":n>.5&&(t.value=this.startTime?.5:0),L.linearRampToValueAtTime(t,"gain",1,this.context.currentTime+s);break;case"exponential":n>.5&&(t.value=this.startTime?.5:0),L.exponentialRampToValueAtTime(t,"gain",1,this.context.currentTime+s);break;case"flat":t.value=1;break;case"exponentialReverse":n<.5&&(t.value=this.startTime?.5:1),L.exponentialRampToValueAtTime(t,"gain",0,this.context.currentTime+s);break;case"linearReverse":n<.5&&(t.value=this.startTime?.5:1),L.linearRampToValueAtTime(t,"gain",0,this.context.currentTime+s)}}updateStereoBusFadeOut(){if(!this.settings.song.length)return void this.stereoBus.cancelFadeOut();let t=this.settings.song.length-(this.context.currentTime-this.startTime);t=t>0?t:30,this.stereoBus.setFadeOut(t,30)}killChannelsByQuery(t){this.channels.filter(t).forEach(t=>{L.cancelScheduledValues(t.output,"gain",0),L.exponentialRampToValueAtTime(t.output,"gain",0,this.context.currentTime+10),console.log(t.trackMetadata),t.stop(this.context.currentTime+11)})}getFadeTimes(){return{fadeIn:A(this.settings.song.trackFadeRange[0],this.settings.song.trackFadeRange[1]),fadeOut:A(this.settings.song.trackFadeRange[0],this.settings.song.trackFadeRange[1])}}getDuration(){return A(this.settings.song.trackDurationRange[0],this.settings.song.trackDurationRange[1])}getTheDrift(t){if("flat"===this.settings.song.driftEnvelope||!t.drift)return 0;const e=this.driftEnvelope.value,s=this.settings.song.driftType,n=this.settings.song.driftCoEff,i=Math.random()*Math.floor(10*e*n);return"quantized"===s?i>90?4*this.secondsPerBeat/2:i>80?4*this.secondsPerBeat/4:i>70?4*this.secondsPerBeat/8:i>60?4*this.secondsPerBeat/16:i>50?4*this.secondsPerBeat/32:i>40?4*this.secondsPerBeat/64:i>30?4*this.secondsPerBeat/128:i>20?4*this.secondsPerBeat/256:0:i/10}}class Y{constructor(){this.container=document.getElementById("bg-video"),this.videos=["horses.mp4","cowboy.mp4","fence.mp4","tree.mp4","desert.mp4"]}async start(){const t=document.createElement("video"),e=this.videos[A(0,this.videos.length-1)];t.src=`src/assets/video/${e}`,t.classList.add("bg-video_content"),t.style.opacity=0,this.container.insertBefore(t,this.container.childNodes[0]);try{await t.play(),t.style.opacity=.85}catch(t){console.error("Video could not play",t)}setTimeout(()=>{t.style.opacity=0,setTimeout(()=>{this.container.removeChild(t)},2e3),this.start()},1e4)}}class Q{getTrack(t){return R(`src/assets/audio/${t}`)}getImpulse(t){return R(`src/assets/audio/impulses/${t}`)}}class z{constructor(){this.modals=document.getElementsByClassName("modals"),this.modalBG=document.getElementById("modal-background"),this.about=document.getElementById("about"),this.settings=document.getElementById("settings"),this.aboutModal=document.getElementById("about-modal"),this.settingsModal=document.getElementById("settings-modal"),this.modalClose=document.getElementsByClassName("modal-close"),this.addListeners()}addListeners(){this.about.addEventListener("click",()=>{this.clearModals(),this.aboutModal.style.opacity=1,this.aboutModal.style.pointerEvents="auto",this.modalBG.style.display="block"}),this.settings.addEventListener("click",()=>{this.clearModals(),this.settingsModal.style.opacity=1,this.settingsModal.style.pointerEvents="auto",this.modalBG.style.display="block"}),this.modalBG.addEventListener("click",()=>{this.clearModals(),this.modalBG.style.display="none"});for(let t of this.modalClose)t.addEventListener("click",()=>{this.clearModals(),this.modalBG.style.display="none"})}clearModals(){window.location.hash.replace("#",""),window.location.hash="";for(let t of this.modals)t.style.pointerEvents="none",t.style.opacity=0}}class W{constructor(){this.settings,this.settings$=new B(void 0),this.settings$.subscribe(t=>{this.settings=t})}async fetchSettings(){try{const t=await(()=>{const t=new Request("src/assets/settings.json");return fetch(t).then(t=>t.json())})(),e=t.impulses.find(t=>t.default);return t.song.selectedReverb=e?e.title:"",this.update(t),void this.initDom()}catch(t){console.error(t)}}getSetting(t){return t(this.settings)}update(t){this.settings=t,this.publish(),this.settings.changed&&this.showMessage()}publish(){this.settings$.next(this.settings)}initDom(){const t=document.getElementById("settings-song-length");t.value=this.settings.song.length/60;const e=document.getElementById("settings-density");e.value=this.settings.song.density;const s=document.getElementById("settings-mode");s.value=this.settings.song.mode;const n=document.getElementById("settings-tracks");n.value=this.settings.song.tracks;const i=document.getElementById("settings-envelope");i.value=this.settings.song.envelope;const r=document.getElementById("settings-drift-envelope");r.value=this.settings.song.driftEnvelope;const o=document.getElementById("settings-drift-coeff");o.value=this.settings.song.driftCoEff;const a=document.getElementById("settings-drift-type");a.value=this.settings.song.driftType;const c=document.getElementById("settings-reverb-type");this.buildReverbSelect(c);const u=document.getElementById("settings-reverb-level");u.value=this.settings.song.outputReverbLevel;const h=document.getElementById("settings-master-level");h.value=this.settings.song.outputLevel,t.addEventListener("change",t=>{const e={...this.settings};e.song.length=60*+t.target.value,e.changed={field:"length",title:"Length"},this.update(e)}),e.addEventListener("change",t=>{const e={...this.settings};e.song.density=+t.target.value,e.changed={field:"density",title:"Density"},this.update(e)}),s.addEventListener("change",t=>{const e={...this.settings};e.song.mode=t.target.value,e.changed={field:"mode",title:"Mode"},this.update(e)}),n.addEventListener("change",t=>{const e={...this.settings};e.song.tracks=t.target.value,e.changed={field:"tracks",title:"Tracks"},this.update(e)}),i.addEventListener("change",t=>{const e={...this.settings};e.song.envelope=t.target.value,e.changed={field:"envelope",title:"Envelope"},this.update(e)}),r.addEventListener("change",t=>{const e={...this.settings};e.song.driftEnvelope=t.target.value,e.changed={field:"driftEnvelope",title:"Drift Envelope"},this.update(e)}),a.addEventListener("change",t=>{const e={...this.settings};e.song.driftType=t.target.value,e.changed={field:"driftType",title:"Drift Type"},this.update(e)}),o.addEventListener("change",t=>{const e={...this.settings};e.song.driftCoEff=+t.target.value,e.changed={field:"driftCoEff",title:"Drift Depth"},this.update(e)}),c.addEventListener("change",t=>{const e={...this.settings},s=e.impulses.find(e=>e.title===t.target.value);e.song.selectedReverb=s.title,e.changed={field:"selectedReverb",title:"Reverb Type"},this.update(e)}),u.addEventListener("change",t=>{const e={...this.settings};e.song.outputReverbLevel=+t.target.value,e.changed={field:"outputReverbLevel",title:"Reverb Level"},this.update(e)}),h.addEventListener("change",t=>{const e={...this.settings};e.song.outputLevel=+t.target.value,e.changed={field:"outputLevel",title:"Master Level"},this.update(e)})}buildReverbSelect(t){for(let e of this.settings.impulses){const s=document.createElement("option");s.setAttribute("value",e.title);const n=document.createTextNode(e.title);s.appendChild(n),t.appendChild(s)}t.value=this.settings.song.selectedReverb}showMessage(t){const e=document.getElementById("settings-message");e.innerHTML=`&#936; ${this.settings.changed.title} Updated &#936;`,e.style.opacity="1",setTimeout(()=>{e.style.opacity="0"},2e3)}}class J{constructor(t,e){this.context=t,this.mediaService=e}async getImpulse(t){try{return await new Promise(async(e,s)=>{const n=await this.mediaService.getImpulse(t),i=H.createNode("reverb",{context:this.context,buffer:n});i.ready().subscribe(t=>{t&&e(i)})})}catch(t){console.error(t)}}}class K{constructor(t,e,s,n=[]){this.context=t,this.impulseService=e,this.settingsService=s,this.settings,this.input=H.createNode("gain",{context:this.context}),this.output=H.createNode("gain",{context:this.context}),this.reverbReturnLevel=H.createNode("gain",{context:this.context}),this.nodes=[this.input,...n,this.output],this.patchSignalChain(),this.setReverb(),this.settingsService.settings$.subscribe(t=>{if(this.settings=t,this.settings&&this.settings.changed)switch(this.settings.changed.field){case"outputLevel":const t=this.settings.song.outputLevel/10;this.setOutputLevel(t);break;case"outputReverbLevel":const e=this.settings.song.outputReverbLevel/10;this.setReverbReturnLevel(e);break;case"selectedReverb":this.setReverb(this.settings.song.selectedReverb)}})}patchSignalChain(){for(let t=0;t<this.nodes.length;t++)0!==t&&this.nodes[t-1].connect(this.nodes[t].node);this.connectDestination()}connectDestination(){this.output.node.connect(this.context.destination)}connect(t){t.connect(this.input.node)}disconnect(t){t.disconnect(this.input.node)}async setReverb(){const t=this.settingsService.getSetting(t=>t.impulses.find(e=>e.title===t.song.selectedReverb));if(!t)return;const e=await this.impulseService.getImpulse(t.filename);this.setReverbReturnLevel(0,.1);const s=this.reverb;this.reverb=e;const n=this.settings.song.outputReverbLevel;this.setReverbReturnLevel(n,.5),this.input.connect(this.reverb.node),this.reverb.connect(this.reverbReturnLevel.node),this.reverbReturnLevel.connect(this.output.node),s&&(this.input.disconnect(s.node),s.disconnect(this.reverbReturnLevel.node))}setReverbReturnLevel(t,e=.5){const s=this.context.currentTime+e;L.exponentialRampToValueAtTime(this.reverbReturnLevel,"gain",t,s)}setOutputLevel(t,e=.5){const s=this.context.currentTime+e;L.exponentialRampToValueAtTime(this.output,"gain",t,s)}cancelFadeOut(){L.cancelScheduledValues(this.output,"gain",0)}setFadeOut(t,e){this.cancelFadeOut();const s=this.context.currentTime+t;L.setTargetAtTime(this.output,"gain",0,s,e/3)}getOutputAudioParams(){return this.nodes.reduce((t,e)=>{const s=e.getAudioParams();return Object.assign(t,s),t},{})}}new class{constructor(){this.build()}async build(){this.context=new AudioContext,this.videoService=new Y,this.mediaService=new Q,this.modalService=new z,this.impulseService=new J(this.context,this.mediaService),this.settingsService=new W,await this.settingsService.fetchSettings(),this.stereoBus=new K(this.context,this.impulseService,this.settingsService),this.composer=new U(this.context,this.stereoBus,this.impulseService,this.settingsService,this.mediaService),this.addEventListener()}addEventListener(){const t=document.getElementById("start");t.addEventListener("click",()=>{t.style.opacity=0,this.start()})}async start(){await this.composer.init(),this.composer.start(),this.videoService.start()}}}]);