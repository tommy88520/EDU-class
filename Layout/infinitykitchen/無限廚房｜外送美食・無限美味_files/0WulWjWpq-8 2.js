if (self.CavalryLogger) { CavalryLogger.start_js(["KKXWHVR"]); }

__d("getVendorPrefixedName",["invariant","ExecutionEnvironment","UserAgent","camelize"],(function(a,b,c,d,e,f,g,h){var i={},j=["Webkit","ms","Moz","O"],k=new RegExp("^("+j.join("|")+")"),l=d("ExecutionEnvironment").canUseDOM?document.createElement("div").style:{};function m(a){for(var b=0;b<j.length;b++){var c=j[b]+a;if(c in l)return c}return null}function n(a){switch(a){case"lineClamp":return c("UserAgent").isEngine("WebKit >= 315.14.2")?"WebkitLineClamp":null;default:return null}}function a(a){var b=c("camelize")(a);if(i[b]===void 0){var e=b.charAt(0).toUpperCase()+b.slice(1);k.test(e)&&h(0,957,a);d("ExecutionEnvironment").canUseDOM?i[b]=b in l?b:m(e):i[b]=n(b)}return i[b]}g["default"]=a}),98);
__d("BrowserSupportCore",["getVendorPrefixedName"],(function(a,b,c,d,e,f){a={hasCSSAnimations:function(){return!!b("getVendorPrefixedName")("animationName")},hasCSSTransforms:function(){return!!b("getVendorPrefixedName")("transform")},hasCSS3DTransforms:function(){return!!b("getVendorPrefixedName")("perspective")},hasCSSTransitions:function(){return!!b("getVendorPrefixedName")("transition")}};c=a;f["default"]=c}),66);
__d("BrowserSupport",["BrowserSupportCore","ExecutionEnvironment","UserAgent_DEPRECATED","getVendorPrefixedName","memoize"],(function(a,b,c,d,e,f,g){var h=null;function i(){if(d("ExecutionEnvironment").canUseDOM){h||(h=document.createElement("div"));return h}return null}b=function(a){return c("memoize")(function(){var b=i();return!b?!1:a(b)})};e=b(function(a){a.style.cssText="position:-moz-sticky;position:-webkit-sticky;position:-o-sticky;position:-ms-sticky;position:sticky;";return/sticky/.test(a.style.position)});f=b(function(a){return"scrollSnapType"in a.style||"webkitScrollSnapType"in a.style||"msScrollSnapType"in a.style});var j=b(function(a){return"scrollBehavior"in a.style});b=b(function(a){if(!("pointerEvents"in a.style))return!1;a.style.cssText="pointer-events:auto";return a.style.pointerEvents==="auto"});var k=c("memoize")(function(){return!(d("UserAgent_DEPRECATED").webkit()&&!d("UserAgent_DEPRECATED").chrome()&&d("UserAgent_DEPRECATED").windows())&&"FileList"in window&&"FormData"in window}),l=c("memoize")(function(){return!!a.blob}),m=c("memoize")(function(){return d("ExecutionEnvironment").canUseDOM&&document.createElementNS&&document.createElementNS("http://www.w3.org/2000/svg","foreignObject").toString().includes("SVGForeignObject")}),n=c("memoize")(function(){return!!window.MutationObserver}),o=c("memoize")(function(){var a={transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"mozTransitionEnd",OTransition:"oTransitionEnd"},b=c("getVendorPrefixedName")("transition");return a[b]||null}),p=function(){return!!window.CanvasRenderingContext2D};g.hasCSSAnimations=c("BrowserSupportCore").hasCSSAnimations;g.hasCSSTransforms=c("BrowserSupportCore").hasCSSTransforms;g.hasCSS3DTransforms=c("BrowserSupportCore").hasCSS3DTransforms;g.hasCSSTransitions=c("BrowserSupportCore").hasCSSTransitions;g.hasPositionSticky=e;g.hasScrollSnapPoints=f;g.hasScrollBehavior=j;g.hasPointerEvents=b;g.hasFileAPI=k;g.hasBlobFactory=l;g.hasSVGForeignObject=m;g.hasMutationObserver=n;g.getTransitionEndEvent=o;g.hasCanvasRenderingContext2D=p}),98);
__d("WaitTimeContext",["react"],(function(a,b,c,d,e,f,g){"use strict";a=d("react");b={waitTimeAreaName:void 0,waitTimeAreaOwner:void 0};c=a.createContext(b);g["default"]=c}),98);
__d("LoadingMarker.react",["LoadingMarkerGated","WaitTimeContext","cr:1581213","react"],(function(a,b,c,d,e,f,g){"use strict";var h=d("react"),i=d("react").useContext;function a(a){return a.children}a.displayName=a.name+" [from "+f.id+"]";function e(a){return function(d){var e=i(c("WaitTimeContext"));if(b("cr:1581213")!=null){return h.jsxs(h.Fragment,{children:[h.jsx(b("cr:1581213"),{hold:!0,description:"LoadingMarker("+((e=e.waitTimeAreaName)!=null?e:"unnamed")+")"}),h.jsx(a,babelHelpers["extends"]({},d))]})}}}d=c("LoadingMarkerGated").component||a;b("cr:1581213")!=null&&(d=e(d));f=d;g["default"]=f}),98);
__d("ReactFbPropTypes",["FbtResultBase","warning"],(function(a,b,c,d,e,f){function a(a){var c=function(c,d,e,f,g,h,i){var j=d[e];if(j instanceof b("FbtResultBase"))return null;if(c)return a.isRequired(d,e,f,g,h,i);else return a(d,e,f,g,h,i)},d=c.bind(null,!1);d.isRequired=c.bind(null,!0);return d}f.wrapStringTypeChecker=a}),null);
__d("fbjs/lib/emptyFunction",["emptyFunction"],(function(a,b,c,d,e,f){"use strict";e.exports=b("emptyFunction")}),null);
__d("fbjs/lib/invariant",["invariant"],(function(a,b,c,d,e,f){"use strict";e.exports=b("invariant")}),null);
__d("fbjs/lib/warning",["warning"],(function(a,b,c,d,e,f){"use strict";e.exports=b("warning")}),null);
__d("prop-types/lib/ReactPropTypesSecret",[],(function(a,b,c,d,e,f){"use strict";a="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";e.exports=a}),null);
__d("prop-types/checkPropTypes",["fbjs/lib/invariant","fbjs/lib/warning","prop-types/lib/ReactPropTypesSecret"],(function(a,b,c,d,e,f){"use strict";var g;function a(a,b,c,d,e){}e.exports=a}),null);
__d("prop-types/prop-types",["fbjs/lib/emptyFunction","fbjs/lib/invariant","fbjs/lib/warning","prop-types/checkPropTypes","prop-types/lib/ReactPropTypesSecret"],(function(a,b,c,d,e,f){var g,h=function(){b("fbjs/lib/invariant")(0,1492)};a=function(){return h};h.isRequired=h;c={array:h,bool:h,func:h,number:h,object:h,string:h,symbol:h,any:h,arrayOf:a,element:h,instanceOf:a,node:h,objectOf:a,oneOf:a,oneOfType:a,shape:a};c.checkPropTypes=b("fbjs/lib/emptyFunction");c.PropTypes=c;e.exports=c}),null);
__d("prop-types",["ReactFbPropTypes","prop-types/prop-types"],(function(a,b,c,d,e,f){e.exports=b("prop-types/prop-types")}),null);
__d("XUISpinner.react",["cx","fbt","BrowserSupport","LoadingMarker.react","UserAgent","joinClasses","prop-types","react"],(function(a,b,c,d,e,f,g,h,i){var j=d("react"),k=d("BrowserSupport").hasCSSAnimations()&&!(c("UserAgent").isEngine("Trident < 6")||c("UserAgent").isEngine("Gecko < 39")||c("UserAgent").isBrowser("Safari < 6"));a=function(a){babelHelpers.inheritsLoose(b,a);function b(){var b,c;for(var d=arguments.length,e=new Array(d),f=0;f<d;f++)e[f]=arguments[f];return(b=c=a.call.apply(a,[this].concat(e))||this,c.$1=j.createRef(),b)||babelHelpers.assertThisInitialized(c)}var d=b.prototype;d.render=function(){var a=this.props,b=a.showOnAsync,d=a.background,e=a.paused;a=babelHelpers.objectWithoutPropertiesLoose(a,["showOnAsync","background","paused"]);d="img _55ym"+(this.props.size=="small"?" _55yn":"")+(this.props.size=="large"?" _55yq":"")+(d=="light"?" _55yo":"")+(d=="dark"?" _55yp":"")+(b?" _5tqs":"")+(k?"":" _5d9-")+(k&&e?" _2y32":"");return j.jsx(c("LoadingMarker.react"),{nodeRef:this.$1,children:j.jsx("span",babelHelpers["extends"]({},a,{className:c("joinClasses")(this.props.className,d),ref:this.$1,role:"progressbar","aria-valuetext":i._("\u8f09\u5165\u4e2d\u2026\u2026"),"aria-busy":"true","aria-valuemin":"0","aria-valuemax":"100"}))})};return b}(j.Component);a.propTypes={paused:c("prop-types").bool,showOnAsync:c("prop-types").bool,size:c("prop-types").oneOf(["small","large"]),background:c("prop-types").oneOf(["light","dark"])};a.defaultProps={showOnAsync:!1,size:"small",background:"light"};g["default"]=a}),98);
__d("WarningFilter",["CoreWarningGK"],(function(a,b,c,d,e,f){var g=22;b=a;c=function(){return{}};function a(a){return{finalFormat:a,forceDialogImmediately:!1,monitorEvent:null,monitorListVersion:g,monitorSampleRate:1,suppressCompletely:!1,suppressDialog_LEGACY:!0}}e.exports={prepareWarning:b,getReactWarnings:c}}),null);
__d("warningBlue",["Bootloader","SiteData","WarningFilter","cr:983844"],(function(a,b,c,d,e,f,g){function a(a,b){}b=a;c=b;g["default"]=c}),98);
__d("destroyOnUnload",["Run"],(function(a,b,c,d,e,f,g){function a(a){return d("Run").onLeave(a)}g["default"]=a}),98);
__d("PageTransitions",["cr:917439"],(function(a,b,c,d,e,f,g){g["default"]=b("cr:917439")}),98);
__d("isKeyActivation",["Keys"],(function(a,b,c,d,e,f,g){"use strict";function a(a){var b=0,d=a.charCode;a=a.keyCode;d!=null&&d!==0?b=d:a!=null&&a!==0&&(b=a);return[c("Keys").RETURN,c("Keys").SPACE].includes(b)}g["default"]=a}),98);
__d("KeyActivationToClickHOC.react",["isKeyActivation","react"],(function(a,b,c,d,e,f,g){"use strict";var h=d("react");function a(a){var b,d;return d=b=function(b){babelHelpers.inheritsLoose(d,b);function d(){var a;for(var d=arguments.length,e=new Array(d),f=0;f<d;f++)e[f]=arguments[f];a=b.call.apply(b,[this].concat(e))||this;a.$2=function(b){c("isKeyActivation")(b)&&(b.preventDefault(),b.stopPropagation(),a.$1&&a.$1.click())};a.$3=function(b){a.$1=b};a.$1=null;return a}var e=d.prototype;e.render=function(){return h.jsx(a,babelHelpers["extends"]({keyActivationToClickEvent:this.$2,keyActivationToClickRef:this.$3},this.props))};return d}(h.Component),b.displayName="KeyActivationToClickHOC",d}g["default"]=a}),98);
__d("Base64",[],(function(a,b,c,d,e,f){var g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function h(a){a=a.charCodeAt(0)<<16|a.charCodeAt(1)<<8|a.charCodeAt(2);return String.fromCharCode(g.charCodeAt(a>>>18),g.charCodeAt(a>>>12&63),g.charCodeAt(a>>>6&63),g.charCodeAt(a&63))}var i=">___?456789:;<=_______\0\x01\x02\x03\x04\x05\x06\x07\b\t\n\v\f\r\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19______\x1a\x1b\x1c\x1d\x1e\x1f !\"#$%&'()*+,-./0123";function j(a){a=i.charCodeAt(a.charCodeAt(0)-43)<<18|i.charCodeAt(a.charCodeAt(1)-43)<<12|i.charCodeAt(a.charCodeAt(2)-43)<<6|i.charCodeAt(a.charCodeAt(3)-43);return String.fromCharCode(a>>>16,a>>>8&255,a&255)}var k={encode:function(a){a=unescape(encodeURI(a));var b=(a.length+2)%3;a=(a+"\0\0".slice(b)).replace(/[\s\S]{3}/g,h);return a.slice(0,a.length+b-2)+"==".slice(b)},decode:function(a){a=a.replace(/[^A-Za-z0-9+\/]/g,"");var b=a.length+3&3;a=(a+"AAA".slice(b)).replace(/..../g,j);a=a.slice(0,a.length+b-3);try{return decodeURIComponent(escape(a))}catch(a){throw new Error("Not valid UTF-8")}},encodeObject:function(a){return k.encode(JSON.stringify(a))},decodeObject:function(a){return JSON.parse(k.decode(a))},encodeNums:function(a){return String.fromCharCode.apply(String,a.map(function(a){return g.charCodeAt((a|-(a>63?1:0))&-(a>0?1:0)&63)}))}};a=k;f["default"]=a}),66);
__d("shield",[],(function(a,b,c,d,e,f){function a(a,b){for(var c=arguments.length,d=new Array(c>2?c-2:0),e=2;e<c;e++)d[e-2]=arguments[e];if(typeof a!=="function")throw new TypeError("shield expects a function as the first argument");return function(){return a.apply(b,d)}}f["default"]=a}),66);
__d("ShimButton.react",["KeyActivationToClickHOC.react","emptyFunction","killswitch","prop-types","react"],(function(a,b,c,d,e,f){var g,h=g||b("react");a=function(a){"use strict";babelHelpers.inheritsLoose(c,a);function c(){var b,c;for(var d=arguments.length,e=new Array(d),f=0;f<d;f++)e[f]=arguments[f];return(b=c=a.call.apply(a,[this].concat(e))||this,c.$1=function(a){c.props.keyActivationToClickRef(a),c.props.onRef(a)},b)||babelHelpers.assertThisInitialized(c)}var d=c.prototype;d.render=function(){var a=this.props,c=a.children,d=a.form,e=a.inline,f=a.keyActivationToClickEvent;a.keyActivationToClickRef;a.onRef;var g=a.pressed;a=babelHelpers.objectWithoutPropertiesLoose(a,["children","form","inline","keyActivationToClickEvent","keyActivationToClickRef","onRef","pressed"]);e=e?"span":"div";d==="link"&&(e="a");f=(d={},d[b("killswitch")("SHIM_BUTTON_USE_ONKEYDOWN_INSTEAD_OF_ONKEYPRESS")?"onKeyPress":"onKeyDown"]=f,d);return h.jsx(e,babelHelpers["extends"]({},a,{"aria-pressed":g,ref:this.$1,role:"button"},f,{children:c}))};return c}(h.Component);a.defaultProps={form:"none",inline:!1,keyActivationToClickEvent:b("emptyFunction"),keyActivationToClickRef:b("emptyFunction"),onClick:b("emptyFunction"),onRef:b("emptyFunction"),tabIndex:"0"};a.propTypes={children:b("prop-types").any,form:b("prop-types").oneOf(["none","link"]),inline:b("prop-types").bool,tabIndex:b("prop-types").oneOf(["-1","0",-1,0]),onClick:b("prop-types").func,onRef:b("prop-types").func};e.exports=b("KeyActivationToClickHOC.react")(a)}),null);
__d("keyMirrorRecursive",["invariant","isTruthy"],(function(a,b,c,d,e,f,g,h){"use strict";a=function a(b,d){var e={};i(b)||h(0,580);for(var f in b){if(!Object.prototype.hasOwnProperty.call(b,f))continue;var g=b[f],j=c("isTruthy")(d)?d+"."+f:f;i(g)?g=a(g,j):g=j;e[f]=g}return e};function i(a){return a instanceof Object&&!Array.isArray(a)}b=a;g["default"]=b}),98);
__d("ImmutableValue",["invariant","isNode"],(function(a,b,c,d,e,f,g){"use strict";var h="_DONT_EVER_TYPE_THIS_SECRET_KEY";a=function(){function a(b){b===a[h]||g(0,5608)}a.mergeAllPropertiesInto=function(a,b){var c=b.length;for(var d=0;d<c;d++)Object.assign(a,b[d])};a.deepFreezeRootNode=function(c){if(b("isNode")(c))return;Object.freeze(c);for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&a.recurseDeepFreeze(c[d]);Object.seal(c)};a.recurseDeepFreeze=function(c){if(b("isNode")(c)||!a.shouldRecurseFreeze(c))return;Object.freeze(c);for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&a.recurseDeepFreeze(c[d]);Object.seal(c)};a.shouldRecurseFreeze=function(b){return typeof b==="object"&&!(b instanceof a)&&b!==null};return a}();a._DONT_EVER_TYPE_THIS_SECRET_KEY=Math.random();f["default"]=a}),66);
__d("mergeHelpers",["invariant","FbtResultBase"],(function(a,b,c,d,e,f,g,h){"use strict";var i=36,j=function(a){return typeof a!=="object"||a instanceof Date||a===null||a instanceof c("FbtResultBase")},k={MAX_MERGE_DEPTH:i,isTerminal:j,normalizeMergeArg:function(a){return a==null?{}:a},checkMergeArrayArgs:function(a,b){Array.isArray(a)&&Array.isArray(b)||h(0,3714,a,b)},checkMergeObjectArgs:function(a,b){k.checkMergeObjectArg(a),k.checkMergeObjectArg(b)},checkMergeObjectArg:function(a){!j(a)&&!Array.isArray(a)||h(0,3715,a)},checkMergeIntoObjectArg:function(a){(!j(a)||typeof a==="function")&&!Array.isArray(a)||h(0,3716,a)},checkMergeLevel:function(a){a<i||h(0,3717)},checkArrayStrategy:function(a){a==null||a in k.ArrayStrategies||h(0,3718)},ArrayStrategies:{Clobber:"Clobber",Concat:"Concat",IndexByIndex:"IndexByIndex"}};a=k;g["default"]=a}),98);
__d("ImmutableObject",["invariant","ImmutableValue","mergeHelpers"],(function(a,b,c,d,e,f,g){"use strict";var h=b("mergeHelpers").checkMergeObjectArgs,i=b("mergeHelpers").isTerminal,j="_DONT_EVER_TYPE_THIS_SECRET_KEY";function k(a){a instanceof b("ImmutableValue")||g(0,3884)}var l=function(c){babelHelpers.inheritsLoose(a,c);function a(){var a;a=c.call(this,b("ImmutableValue")[j])||this;b("ImmutableValue").mergeAllPropertiesInto(babelHelpers.assertThisInitialized(a),arguments);return a}a.set=function(b,c){k(b);typeof c==="object"&&c!==void 0&&!Array.isArray(c)||g(0,3885);return new a(b,c)};a.setProperty=function(b,c,d){var e={};e[c]=d;return a.set(b,e)};a.deleteProperty=function(b,c){var d={};for(var e in b)e!==c&&Object.prototype.hasOwnProperty.call(b,e)&&(d[e]=b[e]);return new a(d)};a.setDeep=function(a,b){k(a);return m(a,b)};a.values=function(a){return Object.keys(a).map(function(b){return a[b]})};return a}(b("ImmutableValue"));function m(a,c){h(a,c);var d={},e=Object.keys(a);for(var f=0;f<e.length;f++){var g=e[f];!Object.prototype.hasOwnProperty.call(c,g)?d[g]=a[g]:i(a[g])||i(c[g])?d[g]=c[g]:d[g]=m(a[g],c[g])}g=Object.keys(c);for(f=0;f<g.length;f++){e=g[f];if(Object.prototype.hasOwnProperty.call(a,e))continue;d[e]=c[e]}return a instanceof b("ImmutableValue")?new l(d):c instanceof b("ImmutableValue")?new l(d):d}e.exports=l}),null);
__d("ReactDOMLegacy_DEPRECATED",["cr:1108857","cr:1294246"],(function(a,b,c,d,e,f,g){g.createPortal=b("cr:1294246").createPortal,g.findDOMNode=b("cr:1294246").findDOMNode,g.flushSync=b("cr:1294246").flushSync,g.hydrate=b("cr:1294246").hydrate,g.render=b("cr:1294246").render,g.unmountComponentAtNode=b("cr:1294246").unmountComponentAtNode,g.unstable_batchedUpdates=b("cr:1294246").unstable_batchedUpdates,g.unstable_renderSubtreeIntoContainer=b("cr:1294246").unstable_renderSubtreeIntoContainer,g.version=b("cr:1294246").version,g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=b("cr:1294246").__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED}),98);
__d("ReactDOM",["ReactDOMLegacy_DEPRECATED"],(function(a,b,c,d,e,f){Object.keys(importNamespace("ReactDOMLegacy_DEPRECATED")).forEach(function(a){if(a==="default"||a==="__esModule")return;f[a]=importNamespace("ReactDOMLegacy_DEPRECATED")[a]})}),null);