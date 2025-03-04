import{r as vt,_ as Ce,u as yn,R as K,T as vn,a as Ee,c as Ne,P as m,t as xn,b as qt,s as An}from"./index-ArzCe3um.js";var Ie=vt.forwardRef(function(t,e){var n=t.className,a=n===void 0?"modal-backdrop":n,r=t.visible,s=Ce(t,["className","visible"]),o=vt.useRef(null),i=yn(e,o);return K.createElement(vn,{in:r,mountOnEnter:!0,nodeRef:o,timeout:150,unmountOnExit:!0},function(f){return K.createElement("div",Ee({className:Ne(a,"fade",{show:f==="entered"})},s,{ref:i}))})});Ie.propTypes={className:m.string,visible:m.bool};Ie.displayName="CBackdrop";var Te=vt.forwardRef(function(t,e){var n,a=t.children,r=t.as,s=r===void 0?"span":r,o=t.className,i=t.color,f=t.position,c=t.shape,d=t.size,g=t.textBgColor,p=t.textColor,b=Ce(t,["children","as","className","color","position","shape","size","textBgColor","textColor"]);return K.createElement(s,Ee({className:Ne("badge",(n={},n["bg-".concat(i)]=i,n["position-absolute translate-middle"]=f,n["top-0"]=f==null?void 0:f.includes("top"),n["top-100"]=f==null?void 0:f.includes("bottom"),n["start-100"]=f==null?void 0:f.includes("end"),n["start-0"]=f==null?void 0:f.includes("start"),n["badge-".concat(d)]=d,n["text-".concat(p)]=p,n["text-bg-".concat(g)]=g,n),c,o)},b,{ref:e}),a)});Te.propTypes={as:m.elementType,children:m.node,className:m.string,color:qt,position:m.oneOf(["top-start","top-end","bottom-end","bottom-start"]),shape:An,size:m.oneOf(["sm"]),textBgColor:qt,textColor:xn};Te.displayName="CBadge";/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */function wn(t,e,n){return(e=On(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Qt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,a)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Qt(Object(n),!0).forEach(function(a){wn(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Qt(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function kn(t,e){if(typeof t!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var a=n.call(t,e);if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function On(t){var e=kn(t,"string");return typeof e=="symbol"?e:e+""}const Jt=()=>{};let jt={},Me={},Le=null,Fe={mark:Jt,measure:Jt};try{typeof window<"u"&&(jt=window),typeof document<"u"&&(Me=document),typeof MutationObserver<"u"&&(Le=MutationObserver),typeof performance<"u"&&(Fe=performance)}catch{}const{userAgent:Zt=""}=jt.navigator||{},_=jt,h=Me,te=Le,tt=Fe;_.document;const L=!!h.documentElement&&!!h.head&&typeof h.addEventListener=="function"&&typeof h.createElement=="function",_e=~Zt.indexOf("MSIE")||~Zt.indexOf("Trident/");var Pn=/fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,Sn=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,ze={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"}},Cn={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},Re=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],A="classic",it="duotone",En="sharp",Nn="sharp-duotone",De=[A,it,En,Nn],In={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"}},Tn={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"}},Mn=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}]]),Ln={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",brands:"fab"},duotone:{solid:"fad",regular:"fadr",light:"fadl",thin:"fadt"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds",regular:"fasdr",light:"fasdl",thin:"fasdt"}},Fn=["fak","fa-kit","fakd","fa-kit-duotone"],ee={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},_n=["kit"],zn={kit:{"fa-kit":"fak"}},Rn=["fak","fakd"],Dn={kit:{fak:"fa-kit"}},ne={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},et={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},jn=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],Yn=["fak","fa-kit","fakd","fa-kit-duotone"],Un={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},Wn={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"}},Hn={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"]},xt={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"}},Gn=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands"],At=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt",...jn,...Gn],Bn=["solid","regular","light","thin","duotone","brands"],je=[1,2,3,4,5,6,7,8,9,10],Xn=je.concat([11,12,13,14,15,16,17,18,19,20]),$n=[...Object.keys(Hn),...Bn,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",et.GROUP,et.SWAP_OPACITY,et.PRIMARY,et.SECONDARY].concat(je.map(t=>"".concat(t,"x"))).concat(Xn.map(t=>"w-".concat(t))),Vn={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}};const T="___FONT_AWESOME___",wt=16,Ye="fa",Ue="svg-inline--fa",j="data-fa-i2svg",kt="data-fa-pseudo-element",Kn="data-fa-pseudo-element-pending",Yt="data-prefix",Ut="data-icon",ae="fontawesome-i2svg",qn="async",Qn=["HTML","HEAD","STYLE","SCRIPT"],We=(()=>{try{return!0}catch{return!1}})();function J(t){return new Proxy(t,{get(e,n){return n in e?e[n]:e[A]}})}const He=l({},ze);He[A]=l(l(l(l({},{"fa-duotone":"duotone"}),ze[A]),ee.kit),ee["kit-duotone"]);const Jn=J(He),Ot=l({},Ln);Ot[A]=l(l(l(l({},{duotone:"fad"}),Ot[A]),ne.kit),ne["kit-duotone"]);const re=J(Ot),Pt=l({},xt);Pt[A]=l(l({},Pt[A]),Dn.kit);const Wt=J(Pt),St=l({},Wn);St[A]=l(l({},St[A]),zn.kit);J(St);const Zn=Pn,Ge="fa-layers-text",ta=Sn,ea=l({},In);J(ea);const na=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],mt=Cn,aa=[..._n,...$n],$=_.FontAwesomeConfig||{};function ra(t){var e=h.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function sa(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}h&&typeof h.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(e=>{let[n,a]=e;const r=sa(ra(n));r!=null&&($[a]=r)});const Be={styleDefault:"solid",familyDefault:A,cssPrefix:Ye,replacementClass:Ue,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};$.familyPrefix&&($.cssPrefix=$.familyPrefix);const G=l(l({},Be),$);G.autoReplaceSvg||(G.observeMutations=!1);const u={};Object.keys(Be).forEach(t=>{Object.defineProperty(u,t,{enumerable:!0,set:function(e){G[t]=e,V.forEach(n=>n(u))},get:function(){return G[t]}})});Object.defineProperty(u,"familyPrefix",{enumerable:!0,set:function(t){G.cssPrefix=t,V.forEach(e=>e(u))},get:function(){return G.cssPrefix}});_.FontAwesomeConfig=u;const V=[];function oa(t){return V.push(t),()=>{V.splice(V.indexOf(t),1)}}const F=wt,E={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function ia(t){if(!t||!L)return;const e=h.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;const n=h.head.childNodes;let a=null;for(let r=n.length-1;r>-1;r--){const s=n[r],o=(s.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(a=s)}return h.head.insertBefore(e,a),t}const la="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function q(){let t=12,e="";for(;t-- >0;)e+=la[Math.random()*62|0];return e}function B(t){const e=[];for(let n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function Ht(t){return t.classList?B(t.classList):(t.getAttribute("class")||"").split(" ").filter(e=>e)}function Xe(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function fa(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,'="').concat(Xe(t[n]),'" '),"").trim()}function lt(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,": ").concat(t[n].trim(),";"),"")}function Gt(t){return t.size!==E.size||t.x!==E.x||t.y!==E.y||t.rotate!==E.rotate||t.flipX||t.flipY}function ca(t){let{transform:e,containerWidth:n,iconWidth:a}=t;const r={transform:"translate(".concat(n/2," 256)")},s="translate(".concat(e.x*32,", ").concat(e.y*32,") "),o="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),i="rotate(".concat(e.rotate," 0 0)"),f={transform:"".concat(s," ").concat(o," ").concat(i)},c={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:f,path:c}}function ua(t){let{transform:e,width:n=wt,height:a=wt,startCentered:r=!1}=t,s="";return r&&_e?s+="translate(".concat(e.x/F-n/2,"em, ").concat(e.y/F-a/2,"em) "):r?s+="translate(calc(-50% + ".concat(e.x/F,"em), calc(-50% + ").concat(e.y/F,"em)) "):s+="translate(".concat(e.x/F,"em, ").concat(e.y/F,"em) "),s+="scale(".concat(e.size/F*(e.flipX?-1:1),", ").concat(e.size/F*(e.flipY?-1:1),") "),s+="rotate(".concat(e.rotate,"deg) "),s}var da=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}`;function $e(){const t=Ye,e=Ue,n=u.cssPrefix,a=u.replacementClass;let r=da;if(n!==t||a!==e){const s=new RegExp("\\.".concat(t,"\\-"),"g"),o=new RegExp("\\--".concat(t,"\\-"),"g"),i=new RegExp("\\.".concat(e),"g");r=r.replace(s,".".concat(n,"-")).replace(o,"--".concat(n,"-")).replace(i,".".concat(a))}return r}let se=!1;function pt(){u.autoAddCss&&!se&&(ia($e()),se=!0)}var ma={mixout(){return{dom:{css:$e,insertCss:pt}}},hooks(){return{beforeDOMElementCreation(){pt()},beforeI2svg(){pt()}}}};const M=_||{};M[T]||(M[T]={});M[T].styles||(M[T].styles={});M[T].hooks||(M[T].hooks={});M[T].shims||(M[T].shims=[]);var N=M[T];const Ve=[],Ke=function(){h.removeEventListener("DOMContentLoaded",Ke),rt=1,Ve.map(t=>t())};let rt=!1;L&&(rt=(h.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(h.readyState),rt||h.addEventListener("DOMContentLoaded",Ke));function pa(t){L&&(rt?setTimeout(t,0):Ve.push(t))}function Z(t){const{tag:e,attributes:n={},children:a=[]}=t;return typeof t=="string"?Xe(t):"<".concat(e," ").concat(fa(n),">").concat(a.map(Z).join(""),"</").concat(e,">")}function oe(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var gt=function(e,n,a,r){var s=Object.keys(e),o=s.length,i=n,f,c,d;for(a===void 0?(f=1,d=e[s[0]]):(f=0,d=a);f<o;f++)c=s[f],d=i(d,e[c],c,e);return d};function ga(t){const e=[];let n=0;const a=t.length;for(;n<a;){const r=t.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){const s=t.charCodeAt(n++);(s&64512)==56320?e.push(((r&1023)<<10)+(s&1023)+65536):(e.push(r),n--)}else e.push(r)}return e}function Ct(t){const e=ga(t);return e.length===1?e[0].toString(16):null}function ha(t,e){const n=t.length;let a=t.charCodeAt(e),r;return a>=55296&&a<=56319&&n>e+1&&(r=t.charCodeAt(e+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function ie(t){return Object.keys(t).reduce((e,n)=>{const a=t[n];return!!a.icon?e[a.iconName]=a.icon:e[n]=a,e},{})}function Et(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:a=!1}=n,r=ie(e);typeof N.hooks.addPack=="function"&&!a?N.hooks.addPack(t,ie(e)):N.styles[t]=l(l({},N.styles[t]||{}),r),t==="fas"&&Et("fa",e)}const{styles:Q,shims:ba}=N,qe=Object.keys(Wt),ya=qe.reduce((t,e)=>(t[e]=Object.keys(Wt[e]),t),{});let Bt=null,Qe={},Je={},Ze={},tn={},en={};function va(t){return~aa.indexOf(t)}function xa(t,e){const n=e.split("-"),a=n[0],r=n.slice(1).join("-");return a===t&&r!==""&&!va(r)?r:null}const nn=()=>{const t=a=>gt(Q,(r,s,o)=>(r[o]=gt(s,a,{}),r),{});Qe=t((a,r,s)=>(r[3]&&(a[r[3]]=s),r[2]&&r[2].filter(i=>typeof i=="number").forEach(i=>{a[i.toString(16)]=s}),a)),Je=t((a,r,s)=>(a[s]=s,r[2]&&r[2].filter(i=>typeof i=="string").forEach(i=>{a[i]=s}),a)),en=t((a,r,s)=>{const o=r[2];return a[s]=s,o.forEach(i=>{a[i]=s}),a});const e="far"in Q||u.autoFetchSvg,n=gt(ba,(a,r)=>{const s=r[0];let o=r[1];const i=r[2];return o==="far"&&!e&&(o="fas"),typeof s=="string"&&(a.names[s]={prefix:o,iconName:i}),typeof s=="number"&&(a.unicodes[s.toString(16)]={prefix:o,iconName:i}),a},{names:{},unicodes:{}});Ze=n.names,tn=n.unicodes,Bt=ft(u.styleDefault,{family:u.familyDefault})};oa(t=>{Bt=ft(t.styleDefault,{family:u.familyDefault})});nn();function Xt(t,e){return(Qe[t]||{})[e]}function Aa(t,e){return(Je[t]||{})[e]}function D(t,e){return(en[t]||{})[e]}function an(t){return Ze[t]||{prefix:null,iconName:null}}function wa(t){const e=tn[t],n=Xt("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function z(){return Bt}const rn=()=>({prefix:null,iconName:null,rest:[]});function ka(t){let e=A;const n=qe.reduce((a,r)=>(a[r]="".concat(u.cssPrefix,"-").concat(r),a),{});return De.forEach(a=>{(t.includes(n[a])||t.some(r=>ya[a].includes(r)))&&(e=a)}),e}function ft(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:n=A}=e,a=Jn[n][t];if(n===it&&!t)return"fad";const r=re[n][t]||re[n][a],s=t in N.styles?t:null;return r||s||null}function Oa(t){let e=[],n=null;return t.forEach(a=>{const r=xa(u.cssPrefix,a);r?n=r:a&&e.push(a)}),{iconName:n,rest:e}}function le(t){return t.sort().filter((e,n,a)=>a.indexOf(e)===n)}function ct(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:n=!1}=e;let a=null;const r=At.concat(Yn),s=le(t.filter(g=>r.includes(g))),o=le(t.filter(g=>!At.includes(g))),i=s.filter(g=>(a=g,!Re.includes(g))),[f=null]=i,c=ka(s),d=l(l({},Oa(o)),{},{prefix:ft(f,{family:c})});return l(l(l({},d),Ea({values:t,family:c,styles:Q,config:u,canonical:d,givenPrefix:a})),Pa(n,a,d))}function Pa(t,e,n){let{prefix:a,iconName:r}=n;if(t||!a||!r)return{prefix:a,iconName:r};const s=e==="fa"?an(r):{},o=D(a,r);return r=s.iconName||o||r,a=s.prefix||a,a==="far"&&!Q.far&&Q.fas&&!u.autoFetchSvg&&(a="fas"),{prefix:a,iconName:r}}const Sa=De.filter(t=>t!==A||t!==it),Ca=Object.keys(xt).filter(t=>t!==A).map(t=>Object.keys(xt[t])).flat();function Ea(t){const{values:e,family:n,canonical:a,givenPrefix:r="",styles:s={},config:o={}}=t,i=n===it,f=e.includes("fa-duotone")||e.includes("fad"),c=o.familyDefault==="duotone",d=a.prefix==="fad"||a.prefix==="fa-duotone";if(!i&&(f||c||d)&&(a.prefix="fad"),(e.includes("fa-brands")||e.includes("fab"))&&(a.prefix="fab"),!a.prefix&&Sa.includes(n)&&(Object.keys(s).find(p=>Ca.includes(p))||o.autoFetchSvg)){const p=Mn.get(n).defaultShortPrefixId;a.prefix=p,a.iconName=D(a.prefix,a.iconName)||a.iconName}return(a.prefix==="fa"||r==="fa")&&(a.prefix=z()||"fas"),a}class Na{constructor(){this.definitions={}}add(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];const r=n.reduce(this._pullDefinitions,{});Object.keys(r).forEach(s=>{this.definitions[s]=l(l({},this.definitions[s]||{}),r[s]),Et(s,r[s]);const o=Wt[A][s];o&&Et(o,r[s]),nn()})}reset(){this.definitions={}}_pullDefinitions(e,n){const a=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(a).map(r=>{const{prefix:s,iconName:o,icon:i}=a[r],f=i[2];e[s]||(e[s]={}),f.length>0&&f.forEach(c=>{typeof c=="string"&&(e[s][c]=i)}),e[s][o]=i}),e}}let fe=[],U={};const H={},Ia=Object.keys(H);function Ta(t,e){let{mixoutsTo:n}=e;return fe=t,U={},Object.keys(H).forEach(a=>{Ia.indexOf(a)===-1&&delete H[a]}),fe.forEach(a=>{const r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(s=>{typeof r[s]=="function"&&(n[s]=r[s]),typeof r[s]=="object"&&Object.keys(r[s]).forEach(o=>{n[s]||(n[s]={}),n[s][o]=r[s][o]})}),a.hooks){const s=a.hooks();Object.keys(s).forEach(o=>{U[o]||(U[o]=[]),U[o].push(s[o])})}a.provides&&a.provides(H)}),n}function Nt(t,e){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];return(U[t]||[]).forEach(o=>{e=o.apply(null,[e,...a])}),e}function Y(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),a=1;a<e;a++)n[a-1]=arguments[a];(U[t]||[]).forEach(s=>{s.apply(null,n)})}function R(){const t=arguments[0],e=Array.prototype.slice.call(arguments,1);return H[t]?H[t].apply(null,e):void 0}function It(t){t.prefix==="fa"&&(t.prefix="fas");let{iconName:e}=t;const n=t.prefix||z();if(e)return e=D(n,e)||e,oe(sn.definitions,n,e)||oe(N.styles,n,e)}const sn=new Na,Ma=()=>{u.autoReplaceSvg=!1,u.observeMutations=!1,Y("noAuto")},La={i2svg:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return L?(Y("beforeI2svg",t),R("pseudoElements2svg",t),R("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e}=t;u.autoReplaceSvg===!1&&(u.autoReplaceSvg=!0),u.observeMutations=!0,pa(()=>{_a({autoReplaceSvgRoot:e}),Y("watch",t)})}},Fa={icon:t=>{if(t===null)return null;if(typeof t=="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:D(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){const e=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],n=ft(t[0]);return{prefix:n,iconName:D(n,e)||e}}if(typeof t=="string"&&(t.indexOf("".concat(u.cssPrefix,"-"))>-1||t.match(Zn))){const e=ct(t.split(" "),{skipLookups:!0});return{prefix:e.prefix||z(),iconName:D(e.prefix,e.iconName)||e.iconName}}if(typeof t=="string"){const e=z();return{prefix:e,iconName:D(e,t)||t}}}},O={noAuto:Ma,config:u,dom:La,parse:Fa,library:sn,findIconDefinition:It,toHtml:Z},_a=function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e=h}=t;(Object.keys(N.styles).length>0||u.autoFetchSvg)&&L&&u.autoReplaceSvg&&O.dom.i2svg({node:e})};function ut(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(n=>Z(n))}}),Object.defineProperty(t,"node",{get:function(){if(!L)return;const n=h.createElement("div");return n.innerHTML=t.html,n.children}}),t}function za(t){let{children:e,main:n,mask:a,attributes:r,styles:s,transform:o}=t;if(Gt(o)&&n.found&&!a.found){const{width:i,height:f}=n,c={x:i/f/2,y:.5};r.style=lt(l(l({},s),{},{"transform-origin":"".concat(c.x+o.x/16,"em ").concat(c.y+o.y/16,"em")}))}return[{tag:"svg",attributes:r,children:e}]}function Ra(t){let{prefix:e,iconName:n,children:a,attributes:r,symbol:s}=t;const o=s===!0?"".concat(e,"-").concat(u.cssPrefix,"-").concat(n):s;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:l(l({},r),{},{id:o}),children:a}]}]}function $t(t){const{icons:{main:e,mask:n},prefix:a,iconName:r,transform:s,symbol:o,title:i,maskId:f,titleId:c,extra:d,watchable:g=!1}=t,{width:p,height:b}=n.found?n:e,k=Rn.includes(a),P=[u.replacementClass,r?"".concat(u.cssPrefix,"-").concat(r):""].filter(S=>d.classes.indexOf(S)===-1).filter(S=>S!==""||!!S).concat(d.classes).join(" ");let y={children:[],attributes:l(l({},d.attributes),{},{"data-prefix":a,"data-icon":r,class:P,role:d.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(p," ").concat(b)})};const x=k&&!~d.classes.indexOf("fa-fw")?{width:"".concat(p/b*16*.0625,"em")}:{};g&&(y.attributes[j]=""),i&&(y.children.push({tag:"title",attributes:{id:y.attributes["aria-labelledby"]||"title-".concat(c||q())},children:[i]}),delete y.attributes.title);const v=l(l({},y),{},{prefix:a,iconName:r,main:e,mask:n,maskId:f,transform:s,symbol:o,styles:l(l({},x),d.styles)}),{children:w,attributes:I}=n.found&&e.found?R("generateAbstractMask",v)||{children:[],attributes:{}}:R("generateAbstractIcon",v)||{children:[],attributes:{}};return v.children=w,v.attributes=I,o?Ra(v):za(v)}function ce(t){const{content:e,width:n,height:a,transform:r,title:s,extra:o,watchable:i=!1}=t,f=l(l(l({},o.attributes),s?{title:s}:{}),{},{class:o.classes.join(" ")});i&&(f[j]="");const c=l({},o.styles);Gt(r)&&(c.transform=ua({transform:r,startCentered:!0,width:n,height:a}),c["-webkit-transform"]=c.transform);const d=lt(c);d.length>0&&(f.style=d);const g=[];return g.push({tag:"span",attributes:f,children:[e]}),s&&g.push({tag:"span",attributes:{class:"sr-only"},children:[s]}),g}function Da(t){const{content:e,title:n,extra:a}=t,r=l(l(l({},a.attributes),n?{title:n}:{}),{},{class:a.classes.join(" ")}),s=lt(a.styles);s.length>0&&(r.style=s);const o=[];return o.push({tag:"span",attributes:r,children:[e]}),n&&o.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),o}const{styles:ht}=N;function Tt(t){const e=t[0],n=t[1],[a]=t.slice(4);let r=null;return Array.isArray(a)?r={tag:"g",attributes:{class:"".concat(u.cssPrefix,"-").concat(mt.GROUP)},children:[{tag:"path",attributes:{class:"".concat(u.cssPrefix,"-").concat(mt.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(u.cssPrefix,"-").concat(mt.PRIMARY),fill:"currentColor",d:a[1]}}]}:r={tag:"path",attributes:{fill:"currentColor",d:a}},{found:!0,width:e,height:n,icon:r}}const ja={found:!1,width:512,height:512};function Ya(t,e){!We&&!u.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function Mt(t,e){let n=e;return e==="fa"&&u.styleDefault!==null&&(e=z()),new Promise((a,r)=>{if(n==="fa"){const s=an(t)||{};t=s.iconName||t,e=s.prefix||e}if(t&&e&&ht[e]&&ht[e][t]){const s=ht[e][t];return a(Tt(s))}Ya(t,e),a(l(l({},ja),{},{icon:u.showMissingIcons&&t?R("missingIconAbstract")||{}:{}}))})}const ue=()=>{},Lt=u.measurePerformance&&tt&&tt.mark&&tt.measure?tt:{mark:ue,measure:ue},X='FA "6.7.2"',Ua=t=>(Lt.mark("".concat(X," ").concat(t," begins")),()=>on(t)),on=t=>{Lt.mark("".concat(X," ").concat(t," ends")),Lt.measure("".concat(X," ").concat(t),"".concat(X," ").concat(t," begins"),"".concat(X," ").concat(t," ends"))};var Vt={begin:Ua,end:on};const nt=()=>{};function de(t){return typeof(t.getAttribute?t.getAttribute(j):null)=="string"}function Wa(t){const e=t.getAttribute?t.getAttribute(Yt):null,n=t.getAttribute?t.getAttribute(Ut):null;return e&&n}function Ha(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(u.replacementClass)}function Ga(){return u.autoReplaceSvg===!0?at.replace:at[u.autoReplaceSvg]||at.replace}function Ba(t){return h.createElementNS("http://www.w3.org/2000/svg",t)}function Xa(t){return h.createElement(t)}function ln(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:n=t.tag==="svg"?Ba:Xa}=e;if(typeof t=="string")return h.createTextNode(t);const a=n(t.tag);return Object.keys(t.attributes||[]).forEach(function(s){a.setAttribute(s,t.attributes[s])}),(t.children||[]).forEach(function(s){a.appendChild(ln(s,{ceFn:n}))}),a}function $a(t){let e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}const at={replace:function(t){const e=t[0];if(e.parentNode)if(t[1].forEach(n=>{e.parentNode.insertBefore(ln(n),e)}),e.getAttribute(j)===null&&u.keepOriginalSource){let n=h.createComment($a(e));e.parentNode.replaceChild(n,e)}else e.remove()},nest:function(t){const e=t[0],n=t[1];if(~Ht(e).indexOf(u.replacementClass))return at.replace(t);const a=new RegExp("".concat(u.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){const s=n[0].attributes.class.split(" ").reduce((o,i)=>(i===u.replacementClass||i.match(a)?o.toSvg.push(i):o.toNode.push(i),o),{toNode:[],toSvg:[]});n[0].attributes.class=s.toSvg.join(" "),s.toNode.length===0?e.removeAttribute("class"):e.setAttribute("class",s.toNode.join(" "))}const r=n.map(s=>Z(s)).join(`
`);e.setAttribute(j,""),e.innerHTML=r}};function me(t){t()}function fn(t,e){const n=typeof e=="function"?e:nt;if(t.length===0)n();else{let a=me;u.mutateApproach===qn&&(a=_.requestAnimationFrame||me),a(()=>{const r=Ga(),s=Vt.begin("mutate");t.map(r),s(),n()})}}let Kt=!1;function cn(){Kt=!0}function Ft(){Kt=!1}let st=null;function pe(t){if(!te||!u.observeMutations)return;const{treeCallback:e=nt,nodeCallback:n=nt,pseudoElementsCallback:a=nt,observeMutationsRoot:r=h}=t;st=new te(s=>{if(Kt)return;const o=z();B(s).forEach(i=>{if(i.type==="childList"&&i.addedNodes.length>0&&!de(i.addedNodes[0])&&(u.searchPseudoElements&&a(i.target),e(i.target)),i.type==="attributes"&&i.target.parentNode&&u.searchPseudoElements&&a(i.target.parentNode),i.type==="attributes"&&de(i.target)&&~na.indexOf(i.attributeName))if(i.attributeName==="class"&&Wa(i.target)){const{prefix:f,iconName:c}=ct(Ht(i.target));i.target.setAttribute(Yt,f||o),c&&i.target.setAttribute(Ut,c)}else Ha(i.target)&&n(i.target)})}),L&&st.observe(r,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function Va(){st&&st.disconnect()}function Ka(t){const e=t.getAttribute("style");let n=[];return e&&(n=e.split(";").reduce((a,r)=>{const s=r.split(":"),o=s[0],i=s.slice(1);return o&&i.length>0&&(a[o]=i.join(":").trim()),a},{})),n}function qa(t){const e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),a=t.innerText!==void 0?t.innerText.trim():"";let r=ct(Ht(t));return r.prefix||(r.prefix=z()),e&&n&&(r.prefix=e,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=Aa(r.prefix,t.innerText)||Xt(r.prefix,Ct(t.innerText))),!r.iconName&&u.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=t.firstChild.data)),r}function Qa(t){const e=B(t.attributes).reduce((r,s)=>(r.name!=="class"&&r.name!=="style"&&(r[s.name]=s.value),r),{}),n=t.getAttribute("title"),a=t.getAttribute("data-fa-title-id");return u.autoA11y&&(n?e["aria-labelledby"]="".concat(u.replacementClass,"-title-").concat(a||q()):(e["aria-hidden"]="true",e.focusable="false")),e}function Ja(){return{iconName:null,title:null,titleId:null,prefix:null,transform:E,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function ge(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:n,prefix:a,rest:r}=qa(t),s=Qa(t),o=Nt("parseNodeAttributes",{},t);let i=e.styleParser?Ka(t):[];return l({iconName:n,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:a,transform:E,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:r,styles:i,attributes:s}},o)}const{styles:Za}=N;function un(t){const e=u.autoReplaceSvg==="nest"?ge(t,{styleParser:!1}):ge(t);return~e.extra.classes.indexOf(Ge)?R("generateLayersText",t,e):R("generateSvgReplacementMutation",t,e)}function tr(){return[...Fn,...At]}function he(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!L)return Promise.resolve();const n=h.documentElement.classList,a=d=>n.add("".concat(ae,"-").concat(d)),r=d=>n.remove("".concat(ae,"-").concat(d)),s=u.autoFetchSvg?tr():Re.concat(Object.keys(Za));s.includes("fa")||s.push("fa");const o=[".".concat(Ge,":not([").concat(j,"])")].concat(s.map(d=>".".concat(d,":not([").concat(j,"])"))).join(", ");if(o.length===0)return Promise.resolve();let i=[];try{i=B(t.querySelectorAll(o))}catch{}if(i.length>0)a("pending"),r("complete");else return Promise.resolve();const f=Vt.begin("onTree"),c=i.reduce((d,g)=>{try{const p=un(g);p&&d.push(p)}catch(p){We||p.name==="MissingIcon"&&console.error(p)}return d},[]);return new Promise((d,g)=>{Promise.all(c).then(p=>{fn(p,()=>{a("active"),a("complete"),r("pending"),typeof e=="function"&&e(),f(),d()})}).catch(p=>{f(),g(p)})})}function er(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;un(t).then(n=>{n&&fn([n],e)})}function nr(t){return function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const a=(e||{}).icon?e:It(e||{});let{mask:r}=n;return r&&(r=(r||{}).icon?r:It(r||{})),t(a,l(l({},n),{},{mask:r}))}}const ar=function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=E,symbol:a=!1,mask:r=null,maskId:s=null,title:o=null,titleId:i=null,classes:f=[],attributes:c={},styles:d={}}=e;if(!t)return;const{prefix:g,iconName:p,icon:b}=t;return ut(l({type:"icon"},t),()=>(Y("beforeDOMElementCreation",{iconDefinition:t,params:e}),u.autoA11y&&(o?c["aria-labelledby"]="".concat(u.replacementClass,"-title-").concat(i||q()):(c["aria-hidden"]="true",c.focusable="false")),$t({icons:{main:Tt(b),mask:r?Tt(r.icon):{found:!1,width:null,height:null,icon:{}}},prefix:g,iconName:p,transform:l(l({},E),n),symbol:a,title:o,maskId:s,titleId:i,extra:{attributes:c,styles:d,classes:f}})))};var rr={mixout(){return{icon:nr(ar)}},hooks(){return{mutationObserverCallbacks(t){return t.treeCallback=he,t.nodeCallback=er,t}}},provides(t){t.i2svg=function(e){const{node:n=h,callback:a=()=>{}}=e;return he(n,a)},t.generateSvgReplacementMutation=function(e,n){const{iconName:a,title:r,titleId:s,prefix:o,transform:i,symbol:f,mask:c,maskId:d,extra:g}=n;return new Promise((p,b)=>{Promise.all([Mt(a,o),c.iconName?Mt(c.iconName,c.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(k=>{let[P,y]=k;p([e,$t({icons:{main:P,mask:y},prefix:o,iconName:a,transform:i,symbol:f,maskId:d,title:r,titleId:s,extra:g,watchable:!0})])}).catch(b)})},t.generateAbstractIcon=function(e){let{children:n,attributes:a,main:r,transform:s,styles:o}=e;const i=lt(o);i.length>0&&(a.style=i);let f;return Gt(s)&&(f=R("generateAbstractTransformGrouping",{main:r,transform:s,containerWidth:r.width,iconWidth:r.width})),n.push(f||r.icon),{children:n,attributes:a}}}},sr={mixout(){return{layer(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:n=[]}=e;return ut({type:"layer"},()=>{Y("beforeDOMElementCreation",{assembler:t,params:e});let a=[];return t(r=>{Array.isArray(r)?r.map(s=>{a=a.concat(s.abstract)}):a=a.concat(r.abstract)}),[{tag:"span",attributes:{class:["".concat(u.cssPrefix,"-layers"),...n].join(" ")},children:a}]})}}}},or={mixout(){return{counter(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:n=null,classes:a=[],attributes:r={},styles:s={}}=e;return ut({type:"counter",content:t},()=>(Y("beforeDOMElementCreation",{content:t,params:e}),Da({content:t.toString(),title:n,extra:{attributes:r,styles:s,classes:["".concat(u.cssPrefix,"-layers-counter"),...a]}})))}}}},ir={mixout(){return{text(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=E,title:a=null,classes:r=[],attributes:s={},styles:o={}}=e;return ut({type:"text",content:t},()=>(Y("beforeDOMElementCreation",{content:t,params:e}),ce({content:t,transform:l(l({},E),n),title:a,extra:{attributes:s,styles:o,classes:["".concat(u.cssPrefix,"-layers-text"),...r]}})))}}},provides(t){t.generateLayersText=function(e,n){const{title:a,transform:r,extra:s}=n;let o=null,i=null;if(_e){const f=parseInt(getComputedStyle(e).fontSize,10),c=e.getBoundingClientRect();o=c.width/f,i=c.height/f}return u.autoA11y&&!a&&(s.attributes["aria-hidden"]="true"),Promise.resolve([e,ce({content:e.innerHTML,width:o,height:i,transform:r,title:a,extra:s,watchable:!0})])}}};const lr=new RegExp('"',"ug"),be=[1105920,1112319],ye=l(l(l(l({},{FontAwesome:{normal:"fas",400:"fas"}}),Tn),Vn),Un),_t=Object.keys(ye).reduce((t,e)=>(t[e.toLowerCase()]=ye[e],t),{}),fr=Object.keys(_t).reduce((t,e)=>{const n=_t[e];return t[e]=n[900]||[...Object.entries(n)][0][1],t},{});function cr(t){const e=t.replace(lr,""),n=ha(e,0),a=n>=be[0]&&n<=be[1],r=e.length===2?e[0]===e[1]:!1;return{value:Ct(r?e[0]:e),isSecondary:a||r}}function ur(t,e){const n=t.replace(/^['"]|['"]$/g,"").toLowerCase(),a=parseInt(e),r=isNaN(a)?"normal":a;return(_t[n]||{})[r]||fr[n]}function ve(t,e){const n="".concat(Kn).concat(e.replace(":","-"));return new Promise((a,r)=>{if(t.getAttribute(n)!==null)return a();const o=B(t.children).filter(p=>p.getAttribute(kt)===e)[0],i=_.getComputedStyle(t,e),f=i.getPropertyValue("font-family"),c=f.match(ta),d=i.getPropertyValue("font-weight"),g=i.getPropertyValue("content");if(o&&!c)return t.removeChild(o),a();if(c&&g!=="none"&&g!==""){const p=i.getPropertyValue("content");let b=ur(f,d);const{value:k,isSecondary:P}=cr(p),y=c[0].startsWith("FontAwesome");let x=Xt(b,k),v=x;if(y){const w=wa(k);w.iconName&&w.prefix&&(x=w.iconName,b=w.prefix)}if(x&&!P&&(!o||o.getAttribute(Yt)!==b||o.getAttribute(Ut)!==v)){t.setAttribute(n,v),o&&t.removeChild(o);const w=Ja(),{extra:I}=w;I.attributes[kt]=e,Mt(x,b).then(S=>{const hn=$t(l(l({},w),{},{icons:{main:S,mask:rn()},prefix:b,iconName:v,extra:I,watchable:!0})),dt=h.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?t.insertBefore(dt,t.firstChild):t.appendChild(dt),dt.outerHTML=hn.map(bn=>Z(bn)).join(`
`),t.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function dr(t){return Promise.all([ve(t,"::before"),ve(t,"::after")])}function mr(t){return t.parentNode!==document.head&&!~Qn.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(kt)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function xe(t){if(L)return new Promise((e,n)=>{const a=B(t.querySelectorAll("*")).filter(mr).map(dr),r=Vt.begin("searchPseudoElements");cn(),Promise.all(a).then(()=>{r(),Ft(),e()}).catch(()=>{r(),Ft(),n()})})}var pr={hooks(){return{mutationObserverCallbacks(t){return t.pseudoElementsCallback=xe,t}}},provides(t){t.pseudoElements2svg=function(e){const{node:n=h}=e;u.searchPseudoElements&&xe(n)}}};let Ae=!1;var gr={mixout(){return{dom:{unwatch(){cn(),Ae=!0}}}},hooks(){return{bootstrap(){pe(Nt("mutationObserverCallbacks",{}))},noAuto(){Va()},watch(t){const{observeMutationsRoot:e}=t;Ae?Ft():pe(Nt("mutationObserverCallbacks",{observeMutationsRoot:e}))}}}};const we=t=>{let e={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce((n,a)=>{const r=a.toLowerCase().split("-"),s=r[0];let o=r.slice(1).join("-");if(s&&o==="h")return n.flipX=!0,n;if(s&&o==="v")return n.flipY=!0,n;if(o=parseFloat(o),isNaN(o))return n;switch(s){case"grow":n.size=n.size+o;break;case"shrink":n.size=n.size-o;break;case"left":n.x=n.x-o;break;case"right":n.x=n.x+o;break;case"up":n.y=n.y-o;break;case"down":n.y=n.y+o;break;case"rotate":n.rotate=n.rotate+o;break}return n},e)};var hr={mixout(){return{parse:{transform:t=>we(t)}}},hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-transform");return n&&(t.transform=we(n)),t}}},provides(t){t.generateAbstractTransformGrouping=function(e){let{main:n,transform:a,containerWidth:r,iconWidth:s}=e;const o={transform:"translate(".concat(r/2," 256)")},i="translate(".concat(a.x*32,", ").concat(a.y*32,") "),f="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),c="rotate(".concat(a.rotate," 0 0)"),d={transform:"".concat(i," ").concat(f," ").concat(c)},g={transform:"translate(".concat(s/2*-1," -256)")},p={outer:o,inner:d,path:g};return{tag:"g",attributes:l({},p.outer),children:[{tag:"g",attributes:l({},p.inner),children:[{tag:n.icon.tag,children:n.icon.children,attributes:l(l({},n.icon.attributes),p.path)}]}]}}}};const bt={x:0,y:0,width:"100%",height:"100%"};function ke(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function br(t){return t.tag==="g"?t.children:[t]}var yr={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-mask"),a=n?ct(n.split(" ").map(r=>r.trim())):rn();return a.prefix||(a.prefix=z()),t.mask=a,t.maskId=e.getAttribute("data-fa-mask-id"),t}}},provides(t){t.generateAbstractMask=function(e){let{children:n,attributes:a,main:r,mask:s,maskId:o,transform:i}=e;const{width:f,icon:c}=r,{width:d,icon:g}=s,p=ca({transform:i,containerWidth:d,iconWidth:f}),b={tag:"rect",attributes:l(l({},bt),{},{fill:"white"})},k=c.children?{children:c.children.map(ke)}:{},P={tag:"g",attributes:l({},p.inner),children:[ke(l({tag:c.tag,attributes:l(l({},c.attributes),p.path)},k))]},y={tag:"g",attributes:l({},p.outer),children:[P]},x="mask-".concat(o||q()),v="clip-".concat(o||q()),w={tag:"mask",attributes:l(l({},bt),{},{id:x,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[b,y]},I={tag:"defs",children:[{tag:"clipPath",attributes:{id:v},children:br(g)},w]};return n.push(I,{tag:"rect",attributes:l({fill:"currentColor","clip-path":"url(#".concat(v,")"),mask:"url(#".concat(x,")")},bt)}),{children:n,attributes:a}}}},vr={provides(t){let e=!1;_.matchMedia&&(e=_.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){const n=[],a={fill:"currentColor"},r={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:l(l({},a),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});const s=l(l({},r),{},{attributeName:"opacity"}),o={tag:"circle",attributes:l(l({},a),{},{cx:"256",cy:"364",r:"28"}),children:[]};return e||o.children.push({tag:"animate",attributes:l(l({},r),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:l(l({},s),{},{values:"1;0;1;1;0;1;"})}),n.push(o),n.push({tag:"path",attributes:l(l({},a),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:e?[]:[{tag:"animate",attributes:l(l({},s),{},{values:"1;0;0;0;0;1;"})}]}),e||n.push({tag:"path",attributes:l(l({},a),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:l(l({},s),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},xr={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-symbol"),a=n===null?!1:n===""?!0:n;return t.symbol=a,t}}}},Ar=[ma,rr,sr,or,ir,pr,gr,hr,yr,vr,xr];Ta(Ar,{mixoutsTo:O});O.noAuto;O.config;O.library;O.dom;const zt=O.parse;O.findIconDefinition;O.toHtml;const wr=O.icon;O.layer;O.text;O.counter;function Oe(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,a)}return n}function C(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Oe(Object(n),!0).forEach(function(a){W(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Oe(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function ot(t){"@babel/helpers - typeof";return ot=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ot(t)}function W(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function kr(t,e){if(t==null)return{};var n={},a=Object.keys(t),r,s;for(s=0;s<a.length;s++)r=a[s],!(e.indexOf(r)>=0)&&(n[r]=t[r]);return n}function Or(t,e){if(t==null)return{};var n=kr(t,e),a,r;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(r=0;r<s.length;r++)a=s[r],!(e.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(t,a)&&(n[a]=t[a])}return n}function Rt(t){return Pr(t)||Sr(t)||Cr(t)||Er()}function Pr(t){if(Array.isArray(t))return Dt(t)}function Sr(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Cr(t,e){if(t){if(typeof t=="string")return Dt(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Dt(t,e)}}function Dt(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function Er(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Nr(t){var e,n=t.beat,a=t.fade,r=t.beatFade,s=t.bounce,o=t.shake,i=t.flash,f=t.spin,c=t.spinPulse,d=t.spinReverse,g=t.pulse,p=t.fixedWidth,b=t.inverse,k=t.border,P=t.listItem,y=t.flip,x=t.size,v=t.rotation,w=t.pull,I=(e={"fa-beat":n,"fa-fade":a,"fa-beat-fade":r,"fa-bounce":s,"fa-shake":o,"fa-flash":i,"fa-spin":f,"fa-spin-reverse":d,"fa-spin-pulse":c,"fa-pulse":g,"fa-fw":p,"fa-inverse":b,"fa-border":k,"fa-li":P,"fa-flip":y===!0,"fa-flip-horizontal":y==="horizontal"||y==="both","fa-flip-vertical":y==="vertical"||y==="both"},W(e,"fa-".concat(x),typeof x<"u"&&x!==null),W(e,"fa-rotate-".concat(v),typeof v<"u"&&v!==null&&v!==0),W(e,"fa-pull-".concat(w),typeof w<"u"&&w!==null),W(e,"fa-swap-opacity",t.swapOpacity),e);return Object.keys(I).map(function(S){return I[S]?S:null}).filter(function(S){return S})}function Ir(t){return t=t-0,t===t}function dn(t){return Ir(t)?t:(t=t.replace(/[\-_\s]+(.)?/g,function(e,n){return n?n.toUpperCase():""}),t.substr(0,1).toLowerCase()+t.substr(1))}var Tr=["style"];function Mr(t){return t.charAt(0).toUpperCase()+t.slice(1)}function Lr(t){return t.split(";").map(function(e){return e.trim()}).filter(function(e){return e}).reduce(function(e,n){var a=n.indexOf(":"),r=dn(n.slice(0,a)),s=n.slice(a+1).trim();return r.startsWith("webkit")?e[Mr(r)]=s:e[r]=s,e},{})}function mn(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof e=="string")return e;var a=(e.children||[]).map(function(f){return mn(t,f)}),r=Object.keys(e.attributes||{}).reduce(function(f,c){var d=e.attributes[c];switch(c){case"class":f.attrs.className=d,delete e.attributes.class;break;case"style":f.attrs.style=Lr(d);break;default:c.indexOf("aria-")===0||c.indexOf("data-")===0?f.attrs[c.toLowerCase()]=d:f.attrs[dn(c)]=d}return f},{attrs:{}}),s=n.style,o=s===void 0?{}:s,i=Or(n,Tr);return r.attrs.style=C(C({},r.attrs.style),o),t.apply(void 0,[e.tag,C(C({},r.attrs),i)].concat(Rt(a)))}var pn=!1;try{pn=!0}catch{}function Fr(){if(!pn&&console&&typeof console.error=="function"){var t;(t=console).error.apply(t,arguments)}}function Pe(t){if(t&&ot(t)==="object"&&t.prefix&&t.iconName&&t.icon)return t;if(zt.icon)return zt.icon(t);if(t===null)return null;if(t&&ot(t)==="object"&&t.prefix&&t.iconName)return t;if(Array.isArray(t)&&t.length===2)return{prefix:t[0],iconName:t[1]};if(typeof t=="string")return{prefix:"fas",iconName:t}}function yt(t,e){return Array.isArray(e)&&e.length>0||!Array.isArray(e)&&e?W({},t,e):{}}var Se={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1},gn=K.forwardRef(function(t,e){var n=C(C({},Se),t),a=n.icon,r=n.mask,s=n.symbol,o=n.className,i=n.title,f=n.titleId,c=n.maskId,d=Pe(a),g=yt("classes",[].concat(Rt(Nr(n)),Rt((o||"").split(" ")))),p=yt("transform",typeof n.transform=="string"?zt.transform(n.transform):n.transform),b=yt("mask",Pe(r)),k=wr(d,C(C(C(C({},g),p),b),{},{symbol:s,title:i,titleId:f,maskId:c}));if(!k)return Fr("Could not find icon",d),null;var P=k.abstract,y={ref:e};return Object.keys(n).forEach(function(x){Se.hasOwnProperty(x)||(y[x]=n[x])}),_r(P[0],y)});gn.displayName="FontAwesomeIcon";gn.propTypes={beat:m.bool,border:m.bool,beatFade:m.bool,bounce:m.bool,className:m.string,fade:m.bool,flash:m.bool,mask:m.oneOfType([m.object,m.array,m.string]),maskId:m.string,fixedWidth:m.bool,inverse:m.bool,flip:m.oneOf([!0,!1,"horizontal","vertical","both"]),icon:m.oneOfType([m.object,m.array,m.string]),listItem:m.bool,pull:m.oneOf(["right","left"]),pulse:m.bool,rotation:m.oneOf([0,90,180,270]),shake:m.bool,size:m.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:m.bool,spinPulse:m.bool,spinReverse:m.bool,symbol:m.oneOfType([m.bool,m.string]),title:m.string,titleId:m.string,transform:m.oneOfType([m.string,m.object]),swapOpacity:m.bool};var _r=mn.bind(null,K.createElement);/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */const jr={prefix:"fas",iconName:"calendar-days",icon:[448,512,["calendar-alt"],"f073","M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"]},Yr={prefix:"fas",iconName:"sort-down",icon:[320,512,["sort-desc"],"f0dd","M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"]},zr={prefix:"fas",iconName:"pen-to-square",icon:[512,512,["edit"],"f044","M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"]},Ur=zr,Wr={prefix:"fas",iconName:"circle",icon:[512,512,[128308,128309,128992,128993,128994,128995,128996,9679,9898,9899,11044,61708,61915],"f111","M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"]},Hr={prefix:"fas",iconName:"eye",icon:[576,512,[128065],"f06e","M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"]},Gr={prefix:"fas",iconName:"sort-up",icon:[320,512,["sort-asc"],"f0de","M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"]},Br={prefix:"fas",iconName:"trash",icon:[448,512,[],"f1f8","M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"]},Xr={prefix:"fas",iconName:"truck",icon:[640,512,[128666,9951],"f0d1","M48 0C21.5 0 0 21.5 0 48L0 368c0 26.5 21.5 48 48 48l16 0c0 53 43 96 96 96s96-43 96-96l128 0c0 53 43 96 96 96s96-43 96-96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L48 0zM416 160l50.7 0L544 237.3l0 18.7-128 0 0-96zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"]},$r={prefix:"fas",iconName:"house",icon:[576,512,[127968,63498,63500,"home","home-alt","home-lg-alt"],"f015","M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"]},Rr={prefix:"fas",iconName:"magnifying-glass",icon:[512,512,[128269,"search"],"f002","M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"]},Vr=Rr,Kr={prefix:"fas",iconName:"plus",icon:[448,512,[10133,61543,"add"],"2b","M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"]},qr={prefix:"fas",iconName:"warehouse",icon:[640,512,[],"f494","M0 488L0 171.3c0-26.2 15.9-49.7 40.2-59.4L308.1 4.8c7.6-3.1 16.1-3.1 23.8 0L599.8 111.9c24.3 9.7 40.2 33.3 40.2 59.4L640 488c0 13.3-10.7 24-24 24l-48 0c-13.3 0-24-10.7-24-24l0-264c0-17.7-14.3-32-32-32l-384 0c-17.7 0-32 14.3-32 32l0 264c0 13.3-10.7 24-24 24l-48 0c-13.3 0-24-10.7-24-24zm488 24l-336 0c-13.3 0-24-10.7-24-24l0-56 384 0 0 56c0 13.3-10.7 24-24 24zM128 400l0-64 384 0 0 64-384 0zm0-96l0-80 384 0 0 80-384 0z"]};export{Ie as C,gn as F,Te as a,jr as b,qr as c,$r as d,Vr as e,Xr as f,Ur as g,Kr as h,Br as i,zr as j,Rr as k,Wr as l,Gr as m,Yr as n,Hr as o};
