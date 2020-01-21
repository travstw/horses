!function(t){var e={};function n(s){if(e[s])return e[s].exports;var r=e[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(s,r,function(e){return t[e]}.bind(null,r));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=4)}([,function(t,e,n){var s,r,o=n(2),i=n(3),c=0,a=0;t.exports=function(t,e,n){var u=e&&n||0,h=e||[],d=(t=t||{}).node||s,l=void 0!==t.clockseq?t.clockseq:r;if(null==d||null==l){var p=o();null==d&&(d=s=[1|p[0],p[1],p[2],p[3],p[4],p[5]]),null==l&&(l=r=16383&(p[6]<<8|p[7]))}var f=void 0!==t.msecs?t.msecs:(new Date).getTime(),y=void 0!==t.nsecs?t.nsecs:a+1,g=f-c+(y-a)/1e4;if(g<0&&void 0===t.clockseq&&(l=l+1&16383),(g<0||f>c)&&void 0===t.nsecs&&(y=0),y>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");c=f,a=y,r=l;var b=(1e4*(268435455&(f+=122192928e5))+y)%4294967296;h[u++]=b>>>24&255,h[u++]=b>>>16&255,h[u++]=b>>>8&255,h[u++]=255&b;var v=f/4294967296*1e4&268435455;h[u++]=v>>>8&255,h[u++]=255&v,h[u++]=v>>>24&15|16,h[u++]=v>>>16&255,h[u++]=l>>>8|128,h[u++]=255&l;for(var m=0;m<6;++m)h[u+m]=d[m];return e||i(h)}},function(t,e){var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(n){var s=new Uint8Array(16);t.exports=function(){return n(s),s}}else{var r=new Array(16);t.exports=function(){for(var t,e=0;e<16;e++)0==(3&e)&&(t=4294967296*Math.random()),r[e]=t>>>((3&e)<<3)&255;return r}}},function(t,e){for(var n=[],s=0;s<256;++s)n[s]=(s+256).toString(16).substr(1);t.exports=function(t,e){var s=e||0,r=n;return[r[t[s++]],r[t[s++]],r[t[s++]],r[t[s++]],"-",r[t[s++]],r[t[s++]],"-",r[t[s++]],r[t[s++]],"-",r[t[s++]],r[t[s++]],"-",r[t[s++]],r[t[s++]],r[t[s++]],r[t[s++]],r[t[s++]],r[t[s++]]].join("")}},function(t,e,n){"use strict";n.r(e);
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
var s=function(t,e){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};function r(t,e){function n(){this.constructor=t}s(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}function o(t){return"function"==typeof t}var i=!1,c={Promise:void 0,set useDeprecatedSynchronousErrorHandling(t){t&&(new Error).stack;i=t},get useDeprecatedSynchronousErrorHandling(){return i}};function a(t){setTimeout((function(){throw t}),0)}var u={closed:!0,next:function(t){},error:function(t){if(c.useDeprecatedSynchronousErrorHandling)throw t;a(t)},complete:function(){}},h=function(){return Array.isArray||function(t){return t&&"number"==typeof t.length}}();var d=function(){function t(t){return Error.call(this),this.message=t?t.length+" errors occurred during unsubscription:\n"+t.map((function(t,e){return e+1+") "+t.toString()})).join("\n  "):"",this.name="UnsubscriptionError",this.errors=t,this}return t.prototype=Object.create(Error.prototype),t}(),l=function(){function t(t){this.closed=!1,this._parentOrParents=null,this._subscriptions=null,t&&(this._unsubscribe=t)}return t.prototype.unsubscribe=function(){var e;if(!this.closed){var n,s=this._parentOrParents,r=this._unsubscribe,i=this._subscriptions;if(this.closed=!0,this._parentOrParents=null,this._subscriptions=null,s instanceof t)s.remove(this);else if(null!==s)for(var c=0;c<s.length;++c){s[c].remove(this)}if(o(r))try{r.call(this)}catch(t){e=t instanceof d?p(t.errors):[t]}if(h(i)){c=-1;for(var a=i.length;++c<a;){var u=i[c];if(null!==(n=u)&&"object"==typeof n)try{u.unsubscribe()}catch(t){e=e||[],t instanceof d?e=e.concat(p(t.errors)):e.push(t)}}}if(e)throw new d(e)}},t.prototype.add=function(e){var n=e;if(!e)return t.EMPTY;switch(typeof e){case"function":n=new t(e);case"object":if(n===this||n.closed||"function"!=typeof n.unsubscribe)return n;if(this.closed)return n.unsubscribe(),n;if(!(n instanceof t)){var s=n;(n=new t)._subscriptions=[s]}break;default:throw new Error("unrecognized teardown "+e+" added to Subscription.")}var r=n._parentOrParents;if(null===r)n._parentOrParents=this;else if(r instanceof t){if(r===this)return n;n._parentOrParents=[r,this]}else{if(-1!==r.indexOf(this))return n;r.push(this)}var o=this._subscriptions;return null===o?this._subscriptions=[n]:o.push(n),n},t.prototype.remove=function(t){var e=this._subscriptions;if(e){var n=e.indexOf(t);-1!==n&&e.splice(n,1)}},t.EMPTY=function(t){return t.closed=!0,t}(new t),t}();function p(t){return t.reduce((function(t,e){return t.concat(e instanceof d?e.errors:e)}),[])}var f=function(){return"function"==typeof Symbol?Symbol("rxSubscriber"):"@@rxSubscriber_"+Math.random()}(),y=function(t){function e(n,s,r){var o=t.call(this)||this;switch(o.syncErrorValue=null,o.syncErrorThrown=!1,o.syncErrorThrowable=!1,o.isStopped=!1,arguments.length){case 0:o.destination=u;break;case 1:if(!n){o.destination=u;break}if("object"==typeof n){n instanceof e?(o.syncErrorThrowable=n.syncErrorThrowable,o.destination=n,n.add(o)):(o.syncErrorThrowable=!0,o.destination=new g(o,n));break}default:o.syncErrorThrowable=!0,o.destination=new g(o,n,s,r)}return o}return r(e,t),e.prototype[f]=function(){return this},e.create=function(t,n,s){var r=new e(t,n,s);return r.syncErrorThrowable=!1,r},e.prototype.next=function(t){this.isStopped||this._next(t)},e.prototype.error=function(t){this.isStopped||(this.isStopped=!0,this._error(t))},e.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,t.prototype.unsubscribe.call(this))},e.prototype._next=function(t){this.destination.next(t)},e.prototype._error=function(t){this.destination.error(t),this.unsubscribe()},e.prototype._complete=function(){this.destination.complete(),this.unsubscribe()},e.prototype._unsubscribeAndRecycle=function(){var t=this._parentOrParents;return this._parentOrParents=null,this.unsubscribe(),this.closed=!1,this.isStopped=!1,this._parentOrParents=t,this},e}(l),g=function(t){function e(e,n,s,r){var i,c=t.call(this)||this;c._parentSubscriber=e;var a=c;return o(n)?i=n:n&&(i=n.next,s=n.error,r=n.complete,n!==u&&(o((a=Object.create(n)).unsubscribe)&&c.add(a.unsubscribe.bind(a)),a.unsubscribe=c.unsubscribe.bind(c))),c._context=a,c._next=i,c._error=s,c._complete=r,c}return r(e,t),e.prototype.next=function(t){if(!this.isStopped&&this._next){var e=this._parentSubscriber;c.useDeprecatedSynchronousErrorHandling&&e.syncErrorThrowable?this.__tryOrSetError(e,this._next,t)&&this.unsubscribe():this.__tryOrUnsub(this._next,t)}},e.prototype.error=function(t){if(!this.isStopped){var e=this._parentSubscriber,n=c.useDeprecatedSynchronousErrorHandling;if(this._error)n&&e.syncErrorThrowable?(this.__tryOrSetError(e,this._error,t),this.unsubscribe()):(this.__tryOrUnsub(this._error,t),this.unsubscribe());else if(e.syncErrorThrowable)n?(e.syncErrorValue=t,e.syncErrorThrown=!0):a(t),this.unsubscribe();else{if(this.unsubscribe(),n)throw t;a(t)}}},e.prototype.complete=function(){var t=this;if(!this.isStopped){var e=this._parentSubscriber;if(this._complete){var n=function(){return t._complete.call(t._context)};c.useDeprecatedSynchronousErrorHandling&&e.syncErrorThrowable?(this.__tryOrSetError(e,n),this.unsubscribe()):(this.__tryOrUnsub(n),this.unsubscribe())}else this.unsubscribe()}},e.prototype.__tryOrUnsub=function(t,e){try{t.call(this._context,e)}catch(t){if(this.unsubscribe(),c.useDeprecatedSynchronousErrorHandling)throw t;a(t)}},e.prototype.__tryOrSetError=function(t,e,n){if(!c.useDeprecatedSynchronousErrorHandling)throw new Error("bad call");try{e.call(this._context,n)}catch(e){return c.useDeprecatedSynchronousErrorHandling?(t.syncErrorValue=e,t.syncErrorThrown=!0,!0):(a(e),!0)}return!1},e.prototype._unsubscribe=function(){var t=this._parentSubscriber;this._context=null,this._parentSubscriber=null,t.unsubscribe()},e}(y);var b=function(){return"function"==typeof Symbol&&Symbol.observable||"@@observable"}();function v(){}function m(t){return t?1===t.length?t[0]:function(e){return t.reduce((function(t,e){return e(t)}),e)}:v}var E=function(){function t(t){this._isScalar=!1,t&&(this._subscribe=t)}return t.prototype.lift=function(e){var n=new t;return n.source=this,n.operator=e,n},t.prototype.subscribe=function(t,e,n){var s=this.operator,r=function(t,e,n){if(t){if(t instanceof y)return t;if(t[f])return t[f]()}return t||e||n?new y(t,e,n):new y(u)}(t,e,n);if(s?r.add(s.call(r,this.source)):r.add(this.source||c.useDeprecatedSynchronousErrorHandling&&!r.syncErrorThrowable?this._subscribe(r):this._trySubscribe(r)),c.useDeprecatedSynchronousErrorHandling&&r.syncErrorThrowable&&(r.syncErrorThrowable=!1,r.syncErrorThrown))throw r.syncErrorValue;return r},t.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(e){c.useDeprecatedSynchronousErrorHandling&&(t.syncErrorThrown=!0,t.syncErrorValue=e),!function(t){for(;t;){var e=t,n=e.closed,s=e.destination,r=e.isStopped;if(n||r)return!1;t=s&&s instanceof y?s:null}return!0}(t)?console.warn(e):t.error(e)}},t.prototype.forEach=function(t,e){var n=this;return new(e=w(e))((function(e,s){var r;r=n.subscribe((function(e){try{t(e)}catch(t){s(t),r&&r.unsubscribe()}}),s,e)}))},t.prototype._subscribe=function(t){var e=this.source;return e&&e.subscribe(t)},t.prototype[b]=function(){return this},t.prototype.pipe=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return 0===t.length?this:m(t)(this)},t.prototype.toPromise=function(t){var e=this;return new(t=w(t))((function(t,n){var s;e.subscribe((function(t){return s=t}),(function(t){return n(t)}),(function(){return t(s)}))}))},t.create=function(e){return new t(e)},t}();function w(t){if(t||(t=c.Promise||Promise),!t)throw new Error("no Promise impl found");return t}var x=function(){function t(){return Error.call(this),this.message="object unsubscribed",this.name="ObjectUnsubscribedError",this}return t.prototype=Object.create(Error.prototype),t}(),_=function(t){function e(e,n){var s=t.call(this)||this;return s.subject=e,s.subscriber=n,s.closed=!1,s}return r(e,t),e.prototype.unsubscribe=function(){if(!this.closed){this.closed=!0;var t=this.subject,e=t.observers;if(this.subject=null,e&&0!==e.length&&!t.isStopped&&!t.closed){var n=e.indexOf(this.subscriber);-1!==n&&e.splice(n,1)}}},e}(l),S=function(t){function e(e){var n=t.call(this,e)||this;return n.destination=e,n}return r(e,t),e}(y),T=function(t){function e(){var e=t.call(this)||this;return e.observers=[],e.closed=!1,e.isStopped=!1,e.hasError=!1,e.thrownError=null,e}return r(e,t),e.prototype[f]=function(){return new S(this)},e.prototype.lift=function(t){var e=new O(this,this);return e.operator=t,e},e.prototype.next=function(t){if(this.closed)throw new x;if(!this.isStopped)for(var e=this.observers,n=e.length,s=e.slice(),r=0;r<n;r++)s[r].next(t)},e.prototype.error=function(t){if(this.closed)throw new x;this.hasError=!0,this.thrownError=t,this.isStopped=!0;for(var e=this.observers,n=e.length,s=e.slice(),r=0;r<n;r++)s[r].error(t);this.observers.length=0},e.prototype.complete=function(){if(this.closed)throw new x;this.isStopped=!0;for(var t=this.observers,e=t.length,n=t.slice(),s=0;s<e;s++)n[s].complete();this.observers.length=0},e.prototype.unsubscribe=function(){this.isStopped=!0,this.closed=!0,this.observers=null},e.prototype._trySubscribe=function(e){if(this.closed)throw new x;return t.prototype._trySubscribe.call(this,e)},e.prototype._subscribe=function(t){if(this.closed)throw new x;return this.hasError?(t.error(this.thrownError),l.EMPTY):this.isStopped?(t.complete(),l.EMPTY):(this.observers.push(t),new _(this,t))},e.prototype.asObservable=function(){var t=new E;return t.source=this,t},e.create=function(t,e){return new O(t,e)},e}(E),O=function(t){function e(e,n){var s=t.call(this)||this;return s.destination=e,s.source=n,s}return r(e,t),e.prototype.next=function(t){var e=this.destination;e&&e.next&&e.next(t)},e.prototype.error=function(t){var e=this.destination;e&&e.error&&this.destination.error(t)},e.prototype.complete=function(){var t=this.destination;t&&t.complete&&this.destination.complete()},e.prototype._subscribe=function(t){return this.source?this.source.subscribe(t):l.EMPTY},e}(T),P=function(t){function e(e){var n=t.call(this)||this;return n._value=e,n}return r(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return this.getValue()},enumerable:!0,configurable:!0}),e.prototype._subscribe=function(e){var n=t.prototype._subscribe.call(this,e);return n&&!n.closed&&e.next(this._value),n},e.prototype.getValue=function(){if(this.hasError)throw this.thrownError;if(this.closed)throw new x;return this._value},e.prototype.next=function(e){t.prototype.next.call(this,this._value=e)},e}(T);class M{constructor(){this.logs=[],this.element=document.getElementById("logs")}log(t){}render(){this.logs.forEach(t=>{console.log(t)}),this.element.innerHTML=""}}const k=(t,e)=>(t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t+1))+t);class B{constructor(t){this.context=t,this.node=new ConstantSourceNode(this.context,{offset:0}),console.log(this.node),this.node.start(0)}get value(){return this.node.offset.value}setValueAtTime(t,e){this.node.offset.setValueAtTime(t,e)}linearRampToValueAtTime(t,e){console.log(t,e),this.node.offset.linearRampToValueAtTime(t,e)}exponentialRampToValueAtTime(t,e){this.node.offset.exponentialRampToValueAtTime(t,e)}setTargetAtTime(t,e,n){this.node.offset.setTargetAtTime(t,e,n)}}class ${constructor(t){this.tracks=t}getTrack(t){return(t=>{const e=new Request(t);return fetch(e).then(t=>t.arrayBuffer())})(`src/assets/audio/${this.tracks[t].filename}`)}getFilteredTrackList(t){return this.tracks.filter(t)}}class A{constructor(t,e,n=3e4,s=5e3){this.numTimers=t,this.scheduleEvent$=e,this.max=n,this.min=s,this.timers=[]}schedule(){const t=k(this.min,this.max);console.log(t);const e=setTimeout(()=>{this.scheduleEvent$.next(!0),this.timers=this.timers.reduce((t,n)=>n===e?t:(t.push(n),t),[]),this.schedule()},t);this.timers.push(e)}start(){console.log("scheduler started"),this.active=!0;for(let t=0;t<this.numTimers;t++)this.schedule()}stop(){this.timers.forEach(t=>clearTimeout(t)),this.active=!1}}class C{constructor(t){this.context=t.context,this.input=this.context.createGain(),this.output=this.context.createGain(),this.nodes=[this.input,...t.nodes||[],this.output],this.patchSignalChain()}patchSignalChain(){for(let t=0;t<this.nodes.length;t++)0!==t&&this.nodes[t-1].connect(this.nodes[t]);this.output.connect(this.context.destination)}connect(t){t.connect(this.input)}disconnect(t){this.input.disconnect(t)}getOutputAudioParams(){return this.nodes.reduce((t,e)=>{const n=e.getAudioParms();return Object.assign(t,n),t},{})}}class j{constructor(t){this.context=t.context,this.name=t.name,this.type="audio",this.isReady=!1,this.audioReady$=new P(!1),this.ended$=new T,this.context.decodeAudioData(t.buffer).then(e=>{this.decodedBuffer=e,this.createSourceNode(t.params)})}createSourceNode(t={}){this.node=this.context.createBufferSource(),this.node.buffer=this.decodedBuffer,this.node.loop=t.loop||!0,this.isReady=!0,this.audioReady$.next(!0),this.node.onended=t=>{this.ended$.next(!0)}}connect(t){this.node.connect(t.node)}ended(){return this.ended$}start(t){this.isReady&&this.node.start(t,0)}stop(t){this.node.stop(t)}getAudioParams(){return{audio:{detune:this.node.detune,playbackRate:this.node.playbackRate}}}audioReady(){return this.audioReady$}}class I{constructor(t){this.context=t.context,this.node=this.context.createGain()}get gain(){return this.node.gain}connect(t){this.node.connect(t)}getAudioParams(){return{gain:{gain:this.node.gain}}}}class R{constructor(t){this.context=t.context,this.node=this.context.createStereoPanner()}connect(t){this.node.connect(t)}getAudioParams(){return{pan:{pan:this.node.pan}}}}class V{constructor(t){this.context=t.context,this.node=this.context.createDelay(),this.feedbackNode=this.context.createGain(),this.lpfNode=this.context.createBiquadfilter(),this.delay=t.delay,this.node.delayTime.value=this.delay,this.feedback=t.feedback||.3,this.feedbackNode.gain.value=this.feedback,this.lpfNode.frequency.value=t.lfp||5e3,this.node.connect(this.feedbackNode),this.feedbackNode.connect(this.lpfNode),this.lpfNode.connect(this.node)}connect(t){this.node.connect(t.node)}getAudioParams(){return{delay:{delay:this.node.delayTime,feedback:this.feedbackNode.gain,lpf:this.lpfNode.frequency}}}}class L{constructor(t){this.context=t.context,this.gain=new N(t.gain),this.curve=this.createCurve(),this.node=this.context.createWaveShaper(),this.node.curve=this.createCurve(),this.node.oversample="2x"}connect(t){this.node.connect(t.node)}createCurve(){const t=this.context.sampleRate;this.curve=new Float32Array(t);const e=Math.PI/180;let n,s=0;for(;s<t;++s)n=2*s/t-1,curve[s]=(3+this.gain)*n*20*e/(Math.PI+this.gain*Math.abs(n));return curve}getAudioParams(){return{distortion:{gain:this.gain}}}}class N extends AudioParam{constructor(t){super(),this.name="gain",this.defaultValue=0,this.maxValue=100,this.minValue=0,this.value=t}}class D{static createNode(t,e){switch(t){case"audio":return new j(e);case"gain":return new I(e);case"pan":return new R(e);case"delay":return new V(e);case"distortion":return new L(e);default:console.error(`${t} is not a known node type`)}}}var H=n(1);class G{constructor(t){this.id=H(),this.context=t.context,this.logger=t.logger,this.audio=t.audio,this.name=t.name,this.endedEvent$=t.endedEvent$,this.output=D.createNode("gain",{context:this.context}),this.nodes=[this.audio,...t.nodes,this.output],this.analyser=this.context.createAnalyser(),this.drift=t.drift,this.secondsPerMeasure=t.secondsPerMeasure,this.startMeasureOffset=t.startMeasureOffset,this.duration=t.duration,this.fadeIn=t.fadeIn,this.fadeOut=t.fadeOut,this.audio.audioReady().subscribe(t=>{if(t){this.patchSignalChain(),this.output.node.gain.setValueAtTime(0,this.context.currentTime);const t=this.calculateStartOffset(this.startMeasureOffset,this.drift);this.start(t),this.output.node.gain.linearRampToValueAtTime(1,t+this.drift+this.fadeIn),this.duration&&this.output.node.gain.setTargetAtTime(0,t+(this.duration-this.fadeOut),this.fadeOut/3),this.duration&&this.stop(t+this.drift+this.duration),this.audio.ended().subscribe(()=>{this.audio=null,this.endedEvent$.next(this.id)})}})}calculateStartOffset(t=1,e=0){let n,s;if(n=t?4*this.secondsPerMeasure*t:4*this.secondsPerMeasure,this.context.currentTime<n)s=n,console.log(this.name,Math.floor(s/(4*this.secondsPerMeasure)));else{const t=Math.floor(this.context.currentTime/n)+1;s=t*n,console.log(this.name,t)}return s}playing(){}patchSignalChain(){for(let t=0;t<this.nodes.length;t++)0!==t&&this.nodes[t-1].connect(this.nodes[t])}start(t=0){this.audio.start(t)}stop(t=0){this.audio.stop(t)}getChannelAudioParams(){return this.nodes.reduce((t,e)=>{const n=e.getAudioParams();return Object.assign(t,n),t},{})}}class q{constructor(t,e){this.context=t,this.channels=[],this.logger=new M,this.scheduleEvent$=new T,this.endedEvent$=new T,this.playEvent$=new T,this.currentPlaying$=new P([]),this.stereoBus=new C({context:t}),e.subscribe(t=>{this.settings=t,console.log(this.settings)})}async init(){this.logger.log("Priming the horses..."),this.secondsPerMeasure=60/this.settings.song.bpm*4,this.mediaService=new $(this.settings.tracks),this.scheduler=new A(this.settings.song.numSchedulers,this.scheduleEvent$,...this.settings.song.schedulerRange),this.scheduleEvent$.subscribe(()=>this.onScheduleEvent()),this.endedEvent$.subscribe(t=>this.onEndedEvent(t)),await this.loadStaticTracks()}start(){setTimeout(()=>{this.envelope=new B(this.context),this.envelope.linearRampToValueAtTime(1,this.context.currentTime+10),this.scheduler.start()},15e3)}async loadStaticTracks(){const t=this.mediaService.tracks;for(let e=0;e<t.length;e++)if(t[e].static){const n=t[e].title;this.logger.log(`Loading Track '${n}'`);const s=await this.getBuffer(e);if(!s)return;const r=D.createNode("audio",{context:this.context,name:n,buffer:s}),o={context:this.context,logger:this.logger,audio:r,nodes:[],name:r.name,playEvent$:this.playEvent$,endedEvent$:this.endedEvent$,drift:0,secondsPerMeasure:this.secondsPerMeasure,startMeasureOffset:t[e].startMeasureOffset,fadeIn:15};this.createChannel(o)}}async onScheduleEvent(){this.logger.log("Schedule Event Fired"),console.log("envelope",this.envelope.value);const t=this.mediaService.getFilteredTrackList(t=>!t.static),e=k(0,t.length-1),n=t[e].title;this.logger.log(`Loading Track '${t[e].title}'`);const s=await this.getBuffer(e);if(!s)return;const r=D.createNode("audio",{context:this.context,name:n,buffer:s}),o={context:this.context,logger:this.logger,audio:r,nodes:[],name:r.name,playEvent$:this.playEvent$,endedEvent$:this.endedEvent$,drift:0,secondsPerMeasure:this.secondsPerMeasure,duration:30,fadeIn:10,fadeOut:10};this.createChannel(o)}async getBuffer(t){try{return await this.mediaService.getTrack(t)}catch(t){return void console.error(t)}}createChannel(t){const e=new G(t);this.channels.push(e),this.stereoBus.connect(e.output)}onEndedEvent(t){const e=this.channels.find(e=>e.id===t);this.logger.log(`Track '${e.name}' ended`),this.channels=this.channels.filter(e=>e.id!==t)}setFadeTimes(){}}class U{constructor(){this.container=document.getElementById("bg-video"),this.videos=["horses.mp4","cowboy.mp4","fence.mp4","tree.mp4","desert.mp4"]}async start(){const t=document.createElement("video"),e=this.videos[k(0,this.videos.length-1)];t.src=`src/assets/video/${e}`,t.classList.add("bg-video_content"),t.style.opacity=0,this.container.appendChild(t);try{await t.play(),t.style.opacity=.85}catch(t){console.error("Video could not play",t)}console.log("new video"),setTimeout(()=>{t.style.opacity=0,setTimeout(()=>{console.log("remove"),this.container.removeChild(t)},2e3),this.start()},1e4)}}class F{constructor(){this.modals=document.getElementsByClassName("modals"),this.modalBG=document.getElementById("modal-background"),this.about=document.getElementById("about"),this.settings=document.getElementById("settings"),this.aboutModal=document.getElementById("about-modal"),this.settingsModal=document.getElementById("settings-modal"),this.modalClose=document.getElementsByClassName("modal-close"),this.addListeners()}addListeners(){this.about.addEventListener("click",()=>{this.clearModals(),this.aboutModal.style.opacity=1,this.aboutModal.style.pointerEvents="auto",this.modalBG.style.display="block"}),this.settings.addEventListener("click",()=>{this.clearModals(),this.settingsModal.style.opacity=1,this.settingsModal.style.pointerEvents="auto",this.modalBG.style.display="block"}),this.modalBG.addEventListener("click",()=>{this.clearModals(),this.modalBG.style.display="none"});for(let t of this.modalClose)t.addEventListener("click",()=>{this.clearModals(),this.modalBG.style.display="none"})}clearModals(){for(let t of this.modals)t.style.pointerEvents="none",t.style.opacity=0}}class Y{constructor(){this.settings,this.settings$=new P(void 0),this.settings$.subscribe(t=>this.settings=t)}async getSettings(){try{const t=await(()=>{const t=new Request("src/assets/settings.json");return fetch(t).then(t=>t.json())})();return this.update(t),this.publish(),void this.initDom()}catch(t){console.error(t)}}update(t){this.settings=t}publish(){this.settings$.next(this.settings)}initDom(){const t=document.getElementById("song-length");t.value=this.settings.song.length/60;const e=document.getElementById("envelope");e.value=this.settings.song.envelope;const n=document.getElementById("envelope-coeff");n.value=this.settings.song.envelopeCoEff;const s=document.getElementById("drift-envelope");s.value=this.settings.song.driftEnvelope;const r=document.getElementById("drift-coeff");r.value=this.settings.song.driftCoEff,document.getElementById("drift-type").value=this.settings.song.driftType;const o=document.getElementById("decay-envelope");o.value=this.settings.song.decayEnvelope;const i=document.getElementById("decay-coeff");i.value=this.settings.song.decayCoEff;const c=document.getElementById("settings-submit");t.addEventListener("change",t=>{const e={...this.settings};e.song.length="infinite"!==t.target.value?60*+t.target.value:void 0,this.update(e)}),e.addEventListener("change",t=>{const e={...this.settings};e.song.envelope=t.target.value,this.update(e)}),n.addEventListener("change",t=>{const e={...this.settings};e.song.envelopeCoEff=t.target.value,this.update(e)}),s.addEventListener("change",t=>{const e={...this.settings};e.song.driftEnvelope=t.target.value,this.update(e)}),r.addEventListener("change",t=>{const e={...this.settings};e.song.driftCoEff=t.target.value,this.update(e)}),o.addEventListener("change",t=>{const e={...this.settings};e.song.decayEnvelope=t.target.value,this.update(e)}),i.addEventListener("change",t=>{const e={...this.settings};e.song.decayCoEff=t.target.value,this.update(e)}),c.addEventListener("click",()=>{this.publish(),this.showMessage()})}showMessage(){const t=document.getElementById("settings-message");t.style.opacity="1",setTimeout(()=>{t.style.opacity="0"},3e3)}}let z,W,J,K;(async()=>{z=new U,new F,W=new Y,await W.getSettings(),J=new AudioContext,K=new q(J,W.settings$)})(),document.getElementById("start").addEventListener("click",(function(){this.style.opacity=0,async function(){await K.init(),K.start(),z.start()}()}))}]);