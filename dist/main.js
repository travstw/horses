!function(t){var e={};function r(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(n,s,function(e){return t[e]}.bind(null,s));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=4)}([function(t,e,r){var n,s,o=r(2),i=r(3),c=0,a=0;t.exports=function(t,e,r){var u=e&&r||0,h=e||[],d=(t=t||{}).node||n,l=void 0!==t.clockseq?t.clockseq:s;if(null==d||null==l){var p=o();null==d&&(d=n=[1|p[0],p[1],p[2],p[3],p[4],p[5]]),null==l&&(l=s=16383&(p[6]<<8|p[7]))}var f=void 0!==t.msecs?t.msecs:(new Date).getTime(),b=void 0!==t.nsecs?t.nsecs:a+1,y=f-c+(b-a)/1e4;if(y<0&&void 0===t.clockseq&&(l=l+1&16383),(y<0||f>c)&&void 0===t.nsecs&&(b=0),b>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");c=f,a=b,s=l;var g=(1e4*(268435455&(f+=122192928e5))+b)%4294967296;h[u++]=g>>>24&255,h[u++]=g>>>16&255,h[u++]=g>>>8&255,h[u++]=255&g;var v=f/4294967296*1e4&268435455;h[u++]=v>>>8&255,h[u++]=255&v,h[u++]=v>>>24&15|16,h[u++]=v>>>16&255,h[u++]=l>>>8|128,h[u++]=255&l;for(var m=0;m<6;++m)h[u+m]=d[m];return e||i(h)}},,function(t,e){var r="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(r){var n=new Uint8Array(16);t.exports=function(){return r(n),n}}else{var s=new Array(16);t.exports=function(){for(var t,e=0;e<16;e++)0==(3&e)&&(t=4294967296*Math.random()),s[e]=t>>>((3&e)<<3)&255;return s}}},function(t,e){for(var r=[],n=0;n<256;++n)r[n]=(n+256).toString(16).substr(1);t.exports=function(t,e){var n=e||0,s=r;return[s[t[n++]],s[t[n++]],s[t[n++]],s[t[n++]],"-",s[t[n++]],s[t[n++]],"-",s[t[n++]],s[t[n++]],"-",s[t[n++]],s[t[n++]],"-",s[t[n++]],s[t[n++]],s[t[n++]],s[t[n++]],s[t[n++]],s[t[n++]]].join("")}},function(t,e,r){"use strict";r.r(e);
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
var n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)};function s(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}function o(t){return"function"==typeof t}var i=!1,c={Promise:void 0,set useDeprecatedSynchronousErrorHandling(t){t&&(new Error).stack;i=t},get useDeprecatedSynchronousErrorHandling(){return i}};function a(t){setTimeout((function(){throw t}),0)}var u={closed:!0,next:function(t){},error:function(t){if(c.useDeprecatedSynchronousErrorHandling)throw t;a(t)},complete:function(){}},h=function(){return Array.isArray||function(t){return t&&"number"==typeof t.length}}();var d=function(){function t(t){return Error.call(this),this.message=t?t.length+" errors occurred during unsubscription:\n"+t.map((function(t,e){return e+1+") "+t.toString()})).join("\n  "):"",this.name="UnsubscriptionError",this.errors=t,this}return t.prototype=Object.create(Error.prototype),t}(),l=function(){function t(t){this.closed=!1,this._parentOrParents=null,this._subscriptions=null,t&&(this._unsubscribe=t)}return t.prototype.unsubscribe=function(){var e;if(!this.closed){var r,n=this._parentOrParents,s=this._unsubscribe,i=this._subscriptions;if(this.closed=!0,this._parentOrParents=null,this._subscriptions=null,n instanceof t)n.remove(this);else if(null!==n)for(var c=0;c<n.length;++c){n[c].remove(this)}if(o(s))try{s.call(this)}catch(t){e=t instanceof d?p(t.errors):[t]}if(h(i)){c=-1;for(var a=i.length;++c<a;){var u=i[c];if(null!==(r=u)&&"object"==typeof r)try{u.unsubscribe()}catch(t){e=e||[],t instanceof d?e=e.concat(p(t.errors)):e.push(t)}}}if(e)throw new d(e)}},t.prototype.add=function(e){var r=e;if(!e)return t.EMPTY;switch(typeof e){case"function":r=new t(e);case"object":if(r===this||r.closed||"function"!=typeof r.unsubscribe)return r;if(this.closed)return r.unsubscribe(),r;if(!(r instanceof t)){var n=r;(r=new t)._subscriptions=[n]}break;default:throw new Error("unrecognized teardown "+e+" added to Subscription.")}var s=r._parentOrParents;if(null===s)r._parentOrParents=this;else if(s instanceof t){if(s===this)return r;r._parentOrParents=[s,this]}else{if(-1!==s.indexOf(this))return r;s.push(this)}var o=this._subscriptions;return null===o?this._subscriptions=[r]:o.push(r),r},t.prototype.remove=function(t){var e=this._subscriptions;if(e){var r=e.indexOf(t);-1!==r&&e.splice(r,1)}},t.EMPTY=function(t){return t.closed=!0,t}(new t),t}();function p(t){return t.reduce((function(t,e){return t.concat(e instanceof d?e.errors:e)}),[])}var f=function(){return"function"==typeof Symbol?Symbol("rxSubscriber"):"@@rxSubscriber_"+Math.random()}(),b=function(t){function e(r,n,s){var o=t.call(this)||this;switch(o.syncErrorValue=null,o.syncErrorThrown=!1,o.syncErrorThrowable=!1,o.isStopped=!1,arguments.length){case 0:o.destination=u;break;case 1:if(!r){o.destination=u;break}if("object"==typeof r){r instanceof e?(o.syncErrorThrowable=r.syncErrorThrowable,o.destination=r,r.add(o)):(o.syncErrorThrowable=!0,o.destination=new y(o,r));break}default:o.syncErrorThrowable=!0,o.destination=new y(o,r,n,s)}return o}return s(e,t),e.prototype[f]=function(){return this},e.create=function(t,r,n){var s=new e(t,r,n);return s.syncErrorThrowable=!1,s},e.prototype.next=function(t){this.isStopped||this._next(t)},e.prototype.error=function(t){this.isStopped||(this.isStopped=!0,this._error(t))},e.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,t.prototype.unsubscribe.call(this))},e.prototype._next=function(t){this.destination.next(t)},e.prototype._error=function(t){this.destination.error(t),this.unsubscribe()},e.prototype._complete=function(){this.destination.complete(),this.unsubscribe()},e.prototype._unsubscribeAndRecycle=function(){var t=this._parentOrParents;return this._parentOrParents=null,this.unsubscribe(),this.closed=!1,this.isStopped=!1,this._parentOrParents=t,this},e}(l),y=function(t){function e(e,r,n,s){var i,c=t.call(this)||this;c._parentSubscriber=e;var a=c;return o(r)?i=r:r&&(i=r.next,n=r.error,s=r.complete,r!==u&&(o((a=Object.create(r)).unsubscribe)&&c.add(a.unsubscribe.bind(a)),a.unsubscribe=c.unsubscribe.bind(c))),c._context=a,c._next=i,c._error=n,c._complete=s,c}return s(e,t),e.prototype.next=function(t){if(!this.isStopped&&this._next){var e=this._parentSubscriber;c.useDeprecatedSynchronousErrorHandling&&e.syncErrorThrowable?this.__tryOrSetError(e,this._next,t)&&this.unsubscribe():this.__tryOrUnsub(this._next,t)}},e.prototype.error=function(t){if(!this.isStopped){var e=this._parentSubscriber,r=c.useDeprecatedSynchronousErrorHandling;if(this._error)r&&e.syncErrorThrowable?(this.__tryOrSetError(e,this._error,t),this.unsubscribe()):(this.__tryOrUnsub(this._error,t),this.unsubscribe());else if(e.syncErrorThrowable)r?(e.syncErrorValue=t,e.syncErrorThrown=!0):a(t),this.unsubscribe();else{if(this.unsubscribe(),r)throw t;a(t)}}},e.prototype.complete=function(){var t=this;if(!this.isStopped){var e=this._parentSubscriber;if(this._complete){var r=function(){return t._complete.call(t._context)};c.useDeprecatedSynchronousErrorHandling&&e.syncErrorThrowable?(this.__tryOrSetError(e,r),this.unsubscribe()):(this.__tryOrUnsub(r),this.unsubscribe())}else this.unsubscribe()}},e.prototype.__tryOrUnsub=function(t,e){try{t.call(this._context,e)}catch(t){if(this.unsubscribe(),c.useDeprecatedSynchronousErrorHandling)throw t;a(t)}},e.prototype.__tryOrSetError=function(t,e,r){if(!c.useDeprecatedSynchronousErrorHandling)throw new Error("bad call");try{e.call(this._context,r)}catch(e){return c.useDeprecatedSynchronousErrorHandling?(t.syncErrorValue=e,t.syncErrorThrown=!0,!0):(a(e),!0)}return!1},e.prototype._unsubscribe=function(){var t=this._parentSubscriber;this._context=null,this._parentSubscriber=null,t.unsubscribe()},e}(b);var g=function(){return"function"==typeof Symbol&&Symbol.observable||"@@observable"}();function v(){}function m(t){return t?1===t.length?t[0]:function(e){return t.reduce((function(t,e){return e(t)}),e)}:v}var w=function(){function t(t){this._isScalar=!1,t&&(this._subscribe=t)}return t.prototype.lift=function(e){var r=new t;return r.source=this,r.operator=e,r},t.prototype.subscribe=function(t,e,r){var n=this.operator,s=function(t,e,r){if(t){if(t instanceof b)return t;if(t[f])return t[f]()}return t||e||r?new b(t,e,r):new b(u)}(t,e,r);if(n?s.add(n.call(s,this.source)):s.add(this.source||c.useDeprecatedSynchronousErrorHandling&&!s.syncErrorThrowable?this._subscribe(s):this._trySubscribe(s)),c.useDeprecatedSynchronousErrorHandling&&s.syncErrorThrowable&&(s.syncErrorThrowable=!1,s.syncErrorThrown))throw s.syncErrorValue;return s},t.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(e){c.useDeprecatedSynchronousErrorHandling&&(t.syncErrorThrown=!0,t.syncErrorValue=e),!function(t){for(;t;){var e=t,r=e.closed,n=e.destination,s=e.isStopped;if(r||s)return!1;t=n&&n instanceof b?n:null}return!0}(t)?console.warn(e):t.error(e)}},t.prototype.forEach=function(t,e){var r=this;return new(e=E(e))((function(e,n){var s;s=r.subscribe((function(e){try{t(e)}catch(t){n(t),s&&s.unsubscribe()}}),n,e)}))},t.prototype._subscribe=function(t){var e=this.source;return e&&e.subscribe(t)},t.prototype[g]=function(){return this},t.prototype.pipe=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return 0===t.length?this:m(t)(this)},t.prototype.toPromise=function(t){var e=this;return new(t=E(t))((function(t,r){var n;e.subscribe((function(t){return n=t}),(function(t){return r(t)}),(function(){return t(n)}))}))},t.create=function(e){return new t(e)},t}();function E(t){if(t||(t=c.Promise||Promise),!t)throw new Error("no Promise impl found");return t}var x=function(){function t(){return Error.call(this),this.message="object unsubscribed",this.name="ObjectUnsubscribedError",this}return t.prototype=Object.create(Error.prototype),t}(),_=function(t){function e(e,r){var n=t.call(this)||this;return n.subject=e,n.subscriber=r,n.closed=!1,n}return s(e,t),e.prototype.unsubscribe=function(){if(!this.closed){this.closed=!0;var t=this.subject,e=t.observers;if(this.subject=null,e&&0!==e.length&&!t.isStopped&&!t.closed){var r=e.indexOf(this.subscriber);-1!==r&&e.splice(r,1)}}},e}(l),S=function(t){function e(e){var r=t.call(this,e)||this;return r.destination=e,r}return s(e,t),e}(b),T=function(t){function e(){var e=t.call(this)||this;return e.observers=[],e.closed=!1,e.isStopped=!1,e.hasError=!1,e.thrownError=null,e}return s(e,t),e.prototype[f]=function(){return new S(this)},e.prototype.lift=function(t){var e=new P(this,this);return e.operator=t,e},e.prototype.next=function(t){if(this.closed)throw new x;if(!this.isStopped)for(var e=this.observers,r=e.length,n=e.slice(),s=0;s<r;s++)n[s].next(t)},e.prototype.error=function(t){if(this.closed)throw new x;this.hasError=!0,this.thrownError=t,this.isStopped=!0;for(var e=this.observers,r=e.length,n=e.slice(),s=0;s<r;s++)n[s].error(t);this.observers.length=0},e.prototype.complete=function(){if(this.closed)throw new x;this.isStopped=!0;for(var t=this.observers,e=t.length,r=t.slice(),n=0;n<e;n++)r[n].complete();this.observers.length=0},e.prototype.unsubscribe=function(){this.isStopped=!0,this.closed=!0,this.observers=null},e.prototype._trySubscribe=function(e){if(this.closed)throw new x;return t.prototype._trySubscribe.call(this,e)},e.prototype._subscribe=function(t){if(this.closed)throw new x;return this.hasError?(t.error(this.thrownError),l.EMPTY):this.isStopped?(t.complete(),l.EMPTY):(this.observers.push(t),new _(this,t))},e.prototype.asObservable=function(){var t=new w;return t.source=this,t},e.create=function(t,e){return new P(t,e)},e}(w),P=function(t){function e(e,r){var n=t.call(this)||this;return n.destination=e,n.source=r,n}return s(e,t),e.prototype.next=function(t){var e=this.destination;e&&e.next&&e.next(t)},e.prototype.error=function(t){var e=this.destination;e&&e.error&&this.destination.error(t)},e.prototype.complete=function(){var t=this.destination;t&&t.complete&&this.destination.complete()},e.prototype._subscribe=function(t){return this.source?this.source.subscribe(t):l.EMPTY},e}(T),O=function(t){function e(e){var r=t.call(this)||this;return r._value=e,r}return s(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return this.getValue()},enumerable:!0,configurable:!0}),e.prototype._subscribe=function(e){var r=t.prototype._subscribe.call(this,e);return r&&!r.closed&&e.next(this._value),r},e.prototype.getValue=function(){if(this.hasError)throw this.thrownError;if(this.closed)throw new x;return this._value},e.prototype.next=function(e){t.prototype.next.call(this,this._value=e)},e}(T);class k{constructor(){this.logs=[],this.element=document.getElementById("logs")}log(t){const e=`${(new Date).toISOString()} -- ${t}`;this.logs.push(e),this.logs.length>10&&this.logs.shift(),this.render()}render(){let t="";this.logs.forEach(e=>{t+=`<p>${e}</p>`}),this.element.innerHTML=t}}const M=(t,e)=>(t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t+1))+t);class ${constructor(t){this.tracks=t}getTrack(t){return(t=>{const e=new Request(t);return fetch(e).then(t=>t.arrayBuffer())})(`../../assets/audio/${this.tracks[t].filename}`)}getFilteredTrackList(t){return this.tracks.filter(t)}}class j{constructor(t,e,r=3e4,n=5e3){this.numTimers=t,this.scheduleEvent$=e,this.max=r,this.min=n,this.timers=[]}schedule(){const t=M(this.min,this.max);console.log(t);const e=setTimeout(()=>{this.scheduleEvent$.next(!0),this.timers=this.timers.reduce((t,r)=>r===e?t:(t.push(r),t),[]),this.schedule()},t);this.timers.push(e)}start(){console.log("scheduler started"),this.active=!0;for(let t=0;t<this.numTimers;t++)this.schedule()}stop(){this.timers.forEach(t=>clearTimeout(t)),this.active=!1}}class A{constructor(t){this.context=t.context,this.input=this.context.createGain(),this.output=this.context.createGain(),this.nodes=[this.input,...t.nodes||[],this.output],this.patchSignalChain()}patchSignalChain(){for(let t=0;t<this.nodes.length;t++)0!==t&&this.nodes[t-1].connect(this.nodes[t]);this.output.connect(this.context.destination)}connect(t){t.connect(this.input)}getOutputAudioParams(){return this.nodes.reduce((t,e)=>{const r=e.getAudioParms();return Object.assign(t,r),t},{})}}class R{constructor(t){this.context=t.context,this.name=t.name,this.type="audio",this.isReady=!1,this.audioReady$=new O(!1),this.ended$=new T,this.context.decodeAudioData(t.buffer).then(e=>{this.decodedBuffer=e,this.createSourceNode(t.params)})}createSourceNode(t={}){this.node=this.context.createBufferSource(),this.node.buffer=this.decodedBuffer,this.node.loop=t.loop||!0,this.isReady=!0,this.audioReady$.next(!0),this.node.onended=t=>{this.ended$.next(!0)}}connect(t){this.node.connect(t.node)}ended(){return this.ended$}start(t){this.isReady&&this.node.start(t)}stop(t){this.node.stop(t)}getAudioParams(){return{audio:{detune:this.node.detune,playbackRate:this.node.playbackRate}}}audioReady(){return this.audioReady$}}class B{constructor(t){this.context=t.context,this.node=this.context.createGain()}connect(t){this.node.connect(t)}getAudioParams(){return{gain:{gain:this.node.gain}}}}class C{constructor(t){this.context=t.context,this.node=this.context.createStereoPanner()}connect(t){this.node.connect(t)}getAudioParams(){return{pan:{pan:this.node.pan}}}}class N{constructor(t){this.context=t.context,this.node=this.context.createDelay(),this.feedbackNode=this.context.createGain(),this.lpfNode=this.context.createBiquadfilter(),this.delay=t.delay,this.node.delayTime.value=this.delay,this.feedback=t.feedback||.3,this.feedbackNode.gain.value=this.feedback,this.lpfNode.frequency.value=t.lfp||5e3,this.node.connect(this.feedbackNode),this.feedbackNode.connect(this.lpfNode),this.lpfNode.connect(this.node)}connect(t){this.node.connect(t.node)}getAudioParams(){return{delay:{delay:this.node.delayTime,feedback:this.feedbackNode.gain,lpf:this.lpfNode.frequency}}}}class D{constructor(t){this.context=t.context,this.gain=new I(t.gain),this.curve=this.createCurve(),this.node=this.context.createWaveShaper(),this.node.curve=this.createCurve(),this.node.oversample="2x"}connect(t){this.node.connect(t.node)}createCurve(){const t=this.context.sampleRate;this.curve=new Float32Array(t);const e=Math.PI/180;let r,n=0;for(;n<t;++n)r=2*n/t-1,curve[n]=(3+this.gain)*r*20*e/(Math.PI+this.gain*Math.abs(r));return curve}getAudioParams(){return{distortion:{gain:this.gain}}}}class I extends AudioParam{constructor(t){super(),this.name="gain",this.defaultValue=0,this.maxValue=100,this.minValue=0,this.value=t}}class V{static createNode(t,e){switch(t){case"audio":return new R(e);case"gain":return new B(e);case"pan":return new C(e);case"delay":return new N(e);case"distortion":return new D(e);default:console.error(`${t} is not a known node type`)}}}var H=r(0);class L{constructor(t){this.id=H(),this.context=t.context,this.logger=t.logger,this.audio=t.audio,this.name=t.name,this.endedEvent$=t.endedEvent$,this.output=V.createNode("gain",{context:this.context}),this.nodes=[this.audio,...t.nodes,this.output],this.analyser=this.context.createAnalyser(),this.drift=t.drift,this.secondsPerMeasure=t.secondsPerMeasure,this.startMeasure=t.startMeasure,this.duration=t.duration,this.fadeIn=t.fadeIn,this.fadeOut=t.fadeOut,this.audio.audioReady().subscribe(t=>{if(t){this.patchSignalChain(),this.output.node.gain.setValueAtTime(0,this.context.currentTime),this.output.node.gain.linearRampToValueAtTime(1,this.context.currentTime+this.drift+this.fadeIn),this.duration&&this.output.node.gain.setTargetAtTime(0,this.context.currentTime+(this.duration-this.fadeOut),this.fadeOut/3);const t=this.calculateStartOffset(this.startMeasure,this.drift);this.start(this.context.currentTime+t),this.duration&&this.stop(this.context.currentTime+t+this.drift+this.duration),this.audio.ended().subscribe(()=>this.endedEvent$.next(this.id))}})}calculateStartOffset(t=0,e=0){let r,n;return r=t?4*this.secondsPerMeasure*t:4*this.secondsPerMeasure,this.context.currentTime<r?n=r-this.context.currentTime+e:(console.log("here"),n=4*this.secondsPerMeasure-this.context.currentTime%(4*this.secondsPerMeasure)+e),this.logger.log(`Track '${this.name}' scheduled to start in ${n.toFixed(4)} seconds`),n}playing(){}patchSignalChain(){for(let t=0;t<this.nodes.length;t++)0!==t&&this.nodes[t-1].connect(this.nodes[t])}start(t=0){this.audio.start(t)}stop(t=0){this.audio.stop(t)}getChannelAudioParams(){return this.nodes.reduce((t,e)=>{const r=e.getAudioParams();return Object.assign(t,r),t},{})}}class q{constructor(t){this.context=t,this.channels=[],this.logger=new k,this.scheduleEvent$=new T,this.endedEvent$=new T,this.playEvent$=new T,this.currentPlaying$=new O([]),this.stereoBus=new A({context:t})}async init(){this.logger.log("Priming the horses..."),await this.getConfig(),this.secondsPerMeasure=60/this.config.song.bpm*4,this.mediaService=new $(this.config.tracks),this.scheduler=new j(this.config.song.numSchedulers,this.scheduleEvent$,...this.config.song.schedulerRange),this.scheduleEvent$.subscribe(()=>this.onScheduleEvent()),this.endedEvent$.subscribe(t=>this.onEndedEvent(t)),await this.loadStaticTracks()}async getConfig(){try{const t=await(t=>{const e=new Request(t);return fetch(e).then(t=>t.json())})("../../config.json");this.config=t}catch(t){throw new Error("Failed to fetch config")}}start(){this.scheduler.start()}async loadStaticTracks(){const t=this.mediaService.tracks;for(let e=0;e<t.length;e++)if(t[e].static){const r=t[e].title;let n;this.logger.log(`Loading Track '${r}'`);try{n=await this.mediaService.getTrack(e)}catch(t){console.error(t);continue}const s=V.createNode("audio",{context:this.context,name:r,buffer:n}),o={context:this.context,logger:this.logger,audio:s,nodes:[],name:s.name,playEvent$:this.playEvent$,endedEvent$:this.endedEvent$,drift:0,secondsPerMeasure:this.secondsPerMeasure,startMeasure:t[e].startMeasure,duration:this.config.song.length,fadeIn:5,fadeOut:30},i=new L(o);this.channels.push(i),this.stereoBus.connect(i.output)}}async onScheduleEvent(){this.logger.log("Schedule Event Fired");const t=this.mediaService.getFilteredTrackList(t=>!t.static),e=M(0,t.length-1),r=t[e].title;let n;this.logger.log(`Loading Track '${t[e].title}'`);try{n=await this.mediaService.getTrack(e)}catch(t){return void console.error(t)}const s=V.createNode("audio",{context:this.context,name:r,buffer:n}),o={context:this.context,logger:this.logger,audio:s,nodes:[],name:s.name,playEvent$:this.playEvent$,endedEvent$:this.endedEvent$,drift:0,secondsPerMeasure:this.secondsPerMeasure,duration:30,fadeIn:5,fadeOut:5},i=new L(o);this.channels.push(i),this.stereoBus.connect(i.output)}onEndedEvent(t){const e=this.channels.find(e=>e.id===t);this.logger.log(`Track '${e.name}' ended`),this.channels=this.channels.filter(e=>e.id!==t)}setFadeTimes(){}}const F=new AudioContext,U=document.getElementById("horses1"),Y=document.getElementsByClassName("modals"),G=document.getElementById("modal-background"),z=document.getElementById("about"),W=document.getElementById("settings"),J=document.getElementById("about-modal"),K=document.getElementById("settings-modal"),Q=document.getElementsByClassName("modal-close");document.getElementById("start").addEventListener("click",(function(){this.style.opacity=0,U.play(),U.style.opacity=1,async function(){const t=new q(F);await t.init(),t.start()}()})),z.addEventListener("click",()=>{for(let t of Y)t.style.pointerEvents="none",t.style.opacity=0;J.style.opacity=1,J.style.pointerEvents="auto",G.style.display="block"}),W.addEventListener("click",()=>{for(let t of Y)t.style.pointerEvents="none",t.style.opacity=0;K.style.opacity=1,K.style.pointerEvents="auto",G.style.display="block"}),G.addEventListener("click",()=>{for(let t of Y)t.style.pointerEvents="none",t.style.opacity=0;G.style.display="none"});for(let t of Q)t.addEventListener("click",()=>{for(let t of Y)t.style.pointerEvents="none",t.style.opacity=0;G.style.display="none"})}]);