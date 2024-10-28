import{r as y,_ as P,R as p,a as h,c as I,P as i,b as ae}from"./index-BbgKQuKZ.js";import{u as Qn,T as Zn,C as Jn}from"./CCloseButton-D5oIMQLk.js";import{C as St,a as ea}from"./DefaultLayout-KSssRpzt.js";var ot=y.forwardRef(function(e,t){var n=e.children,a=e.className,r=P(e,["children","className"]);return p.createElement("div",h({className:I("modal-content",a)},r,{ref:t}),n)});ot.propTypes={children:i.node,className:i.string};ot.displayName="CModalContent";var st=y.forwardRef(function(e,t){var n,a=e.children,r=e.alignment,o=e.className,s=e.fullscreen,l=e.scrollable,c=e.size,f=P(e,["children","alignment","className","fullscreen","scrollable","size"]);return p.createElement("div",h({className:I("modal-dialog",(n={"modal-dialog-centered":r==="center"},n[typeof s=="boolean"?"modal-fullscreen":"modal-fullscreen-".concat(s,"-down")]=s,n["modal-dialog-scrollable"]=l,n["modal-".concat(c)]=c,n),o)},f,{ref:t}),a)});st.propTypes={alignment:i.oneOf(["top","center"]),children:i.node,className:i.string,fullscreen:i.oneOfType([i.bool,i.oneOf(["sm","md","lg","xl","xxl"])]),scrollable:i.bool,size:i.oneOf(["sm","lg","xl"])};st.displayName="CModalDialog";var on=y.createContext({}),sn=y.forwardRef(function(e,t){var n=e.children,a=e.alignment,r=e.backdrop,o=r===void 0?!0:r,s=e.className,l=e.container,c=e.duration,f=c===void 0?150:c,m=e.focus,g=m===void 0?!0:m,d=e.fullscreen,N=e.keyboard,w=N===void 0?!0:N,E=e.onClose,v=e.onClosePrevented,A=e.onShow,C=e.portal,O=C===void 0?!0:C,M=e.scrollable,T=e.size,re=e.transition,z=re===void 0?!0:re,b=e.unmountOnClose,Q=b===void 0?!0:b,B=e.visible,Fe=P(e,["children","alignment","backdrop","className","container","duration","focus","fullscreen","keyboard","onClose","onClosePrevented","onShow","portal","scrollable","size","transition","unmountOnClose","visible"]),kt=y.useRef(null),ue=y.useRef(null),$n=y.useRef(null),Kn=Qn(t,ue),Ct=y.useState(B),G=Ct[0],Re=Ct[1],At=y.useState(!1),Et=At[0],Ot=At[1],qn={visible:G,setVisible:Re};y.useEffect(function(){Re(B)},[B]),y.useEffect(function(){var S;return G?(kt.current=document.activeElement,document.addEventListener("mouseup",Pt),document.addEventListener("keydown",Tt)):(S=kt.current)===null||S===void 0||S.focus(),function(){document.removeEventListener("mouseup",Pt),document.removeEventListener("keydown",Tt)}},[G]);var wt=function(){return o==="static"?Ot(!0):(Re(!1),E&&E())};y.useLayoutEffect(function(){v&&v(),setTimeout(function(){return Ot(!1)},f)},[Et]),y.useLayoutEffect(function(){return G?(document.body.classList.add("modal-open"),o&&(document.body.style.overflow="hidden",document.body.style.paddingRight="0px"),setTimeout(function(){var S;g&&((S=ue.current)===null||S===void 0||S.focus())},z?f:0)):(document.body.classList.remove("modal-open"),o&&(document.body.style.removeProperty("overflow"),document.body.style.removeProperty("padding-right"))),function(){document.body.classList.remove("modal-open"),o&&(document.body.style.removeProperty("overflow"),document.body.style.removeProperty("padding-right"))}},[G]);var Pt=function(S){ue.current&&ue.current==S.target&&wt()},Tt=function(S){S.key==="Escape"&&w&&wt()};return p.createElement(p.Fragment,null,p.createElement(Zn,{in:G,mountOnEnter:!0,nodeRef:ue,onEnter:A,onExit:E,unmountOnExit:Q,timeout:z?f:0},function(S){return p.createElement(St,{container:l,portal:O},p.createElement(on.Provider,{value:qn},p.createElement("div",h({className:I("modal",{"modal-static":Et,fade:z,show:S==="entered"},s),tabIndex:-1},G?{"aria-modal":!0,role:"dialog"}:{"aria-hidden":"true"},{style:h({},S!=="exited"&&{display:"block"})},Fe,{ref:Kn}),p.createElement(st,{alignment:a,fullscreen:d,scrollable:M,size:T},p.createElement(ot,{ref:$n},n)))))}),o&&p.createElement(St,{container:l,portal:O},p.createElement(ea,{visible:G})))});sn.propTypes={alignment:i.oneOf(["top","center"]),backdrop:i.oneOfType([i.bool,i.oneOf(["static"])]),children:i.node,className:i.string,container:i.any,duration:i.number,focus:i.bool,fullscreen:i.oneOfType([i.bool,i.oneOf(["sm","md","lg","xl","xxl"])]),keyboard:i.bool,onClose:i.func,onClosePrevented:i.func,onShow:i.func,portal:i.bool,scrollable:i.bool,size:i.oneOf(["sm","lg","xl"]),transition:i.bool,unmountOnClose:i.bool,visible:i.bool};sn.displayName="CModal";var ln=y.forwardRef(function(e,t){var n=e.children,a=e.className,r=P(e,["children","className"]);return p.createElement("div",h({className:I("modal-body",a)},r,{ref:t}),n)});ln.propTypes={children:i.node,className:i.string};ln.displayName="CModalBody";var cn=y.forwardRef(function(e,t){var n=e.children,a=e.className,r=P(e,["children","className"]);return p.createElement("div",h({className:I("modal-footer",a)},r,{ref:t}),n)});cn.propTypes={children:i.node,className:i.string};cn.displayName="CModalFooter";var fn=y.forwardRef(function(e,t){var n=e.children,a=e.className,r=e.closeButton,o=r===void 0?!0:r,s=P(e,["children","className","closeButton"]),l=y.useContext(on).setVisible;return p.createElement("div",h({className:I("modal-header",a)},s,{ref:t}),n,o&&p.createElement(Jn,{onClick:function(){return l(!1)}}))});fn.propTypes={children:i.node,className:i.string,closeButton:i.bool};fn.displayName="CModalHeader";var un=y.forwardRef(function(e,t){var n=e.children,a=e.as,r=a===void 0?"h5":a,o=e.className,s=P(e,["children","as","className"]);return p.createElement(r,h({className:I("modal-title",o)},s,{ref:t}),n)});un.propTypes={as:i.elementType,children:i.node,className:i.string};un.displayName="CModalTitle";var Pe=y.forwardRef(function(e,t){var n,a=e.children,r=e.className,o=e.color,s=P(e,["children","className","color"]);return p.createElement("thead",h({className:I((n={},n["table-".concat(o)]=o,n),r)||void 0},s,{ref:t}),a)});Pe.propTypes={children:i.node,className:i.string,color:ae};Pe.displayName="CTableHead";var it=y.forwardRef(function(e,t){var n,a=e.children,r=e.className,o=e.color,s=P(e,["children","className","color"]);return p.createElement("th",h({className:I((n={},n["table-".concat(o)]=o,n),r)||void 0},s,{ref:t}),a)});it.propTypes={children:i.node,className:i.string,color:ae};it.displayName="CTableHeaderCell";var lt=y.forwardRef(function(e,t){var n,a=e.children,r=e.className,o=e.color,s=P(e,["children","className","color"]);return p.createElement("tbody",h({className:I((n={},n["table-".concat(o)]=o,n),r)||void 0},s,{ref:t}),a)});lt.propTypes={children:i.node,className:i.string,color:ae};lt.displayName="CTableBody";var Ae=y.forwardRef(function(e,t){var n,a=e.children,r=e.active,o=e.align,s=e.className,l=e.color,c=P(e,["children","active","align","className","color"]),f=c.scope?"th":"td";return p.createElement(f,h({className:I((n={},n["align-".concat(o)]=o,n["table-active"]=r,n["table-".concat(l)]=l,n),s)||void 0},c,{ref:t}),a)});Ae.propTypes={active:i.bool,align:i.oneOf(["bottom","middle","top"]),children:i.node,className:i.string,color:ae};Ae.displayName="CTableDataCell";var pe=y.forwardRef(function(e,t){var n,a=e.children,r=e.active,o=e.align,s=e.className,l=e.color,c=P(e,["children","active","align","className","color"]);return p.createElement("tr",h({className:I((n={},n["align-".concat(o)]=o,n["table-active"]=r,n["table-".concat(l)]=l,n),s)||void 0},c,{ref:t}),a)});pe.propTypes={active:i.bool,align:i.oneOf(["bottom","middle","top"]),children:i.node,className:i.string,color:ae};pe.displayName="CTableRow";var Te=y.forwardRef(function(e,t){var n,a=e.children,r=e.className,o=e.color,s=P(e,["children","className","color"]);return p.createElement("tfoot",h({className:I((n={},n["table-".concat(o)]=o,n),r)||void 0},s,{ref:t}),a)});Te.propTypes={children:i.node,className:i.string,color:ae};Te.displayName="CTableFoot";var ct=y.forwardRef(function(e,t){var n=e.children,a=P(e,["children"]);return p.createElement("caption",h({},a,{ref:t}),n)});ct.propTypes={children:i.node};ct.displayName="CTableCaption";var ft=function(e){var t=e.children,n=e.responsive,a=P(e,["children","responsive"]);return n?p.createElement("div",h({className:typeof n=="boolean"?"table-responsive":"table-responsive-".concat(n)},a),t):p.createElement(p.Fragment,null,t)};ft.propTypes={children:i.node,responsive:i.oneOfType([i.bool,i.oneOf(["sm","md","lg","xl","xxl"])])};ft.displayName="CTableResponsiveWrapper";var It=function(e){return e.replace(/[-_.]/g," ").replace(/ +/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").split(" ").map(function(t){return t.charAt(0).toUpperCase()+t.slice(1)}).join(" ")},ta=function(e){var t;return typeof e=="object"?(t=e.label)!==null&&t!==void 0?t:It(e.key):It(e)},na=function(e,t){return e?e.map(function(n){return typeof n=="object"?n.key:n}):t&&aa(t)},aa=function(e){return Object.keys(e[0]||{}).filter(function(t){return t.charAt(0)!=="_"})},mn=y.forwardRef(function(e,t){var n,a=e.children,r=e.align,o=e.borderColor,s=e.bordered,l=e.borderless,c=e.caption,f=e.captionTop,m=e.className,g=e.color,d=e.columns,N=e.footer,w=e.hover,E=e.items,v=e.responsive,A=e.small,C=e.striped,O=e.stripedColumns,M=e.tableFootProps,T=e.tableHeadProps,re=P(e,["children","align","borderColor","bordered","borderless","caption","captionTop","className","color","columns","footer","hover","items","responsive","small","striped","stripedColumns","tableFootProps","tableHeadProps"]),z=y.useMemo(function(){return na(d,E)},[d,E]);return p.createElement(ft,{responsive:v},p.createElement("table",h({className:I("table",(n={},n["align-".concat(r)]=r,n["border-".concat(o)]=o,n["caption-top"]=f||c==="top",n["table-bordered"]=s,n["table-borderless"]=l,n["table-".concat(g)]=g,n["table-hover"]=w,n["table-sm"]=A,n["table-striped"]=C,n["table-striped-columns"]=O,n),m)},re,{ref:t}),(c&&c!=="top"||f)&&p.createElement(ct,null,c||f),d&&p.createElement(Pe,h({},T),p.createElement(pe,null,d.map(function(b,Q){return p.createElement(it,h({},b._props&&h({},b._props),b._style&&{style:h({},b._style)},{key:Q}),ta(b))}))),E&&p.createElement(lt,null,E.map(function(b,Q){return p.createElement(pe,h({},b._props&&h({},b._props),{key:Q}),z&&z.map(function(B,Fe){return b[B]!==void 0?p.createElement(Ae,h({},b._cellProps&&h(h({},b._cellProps.all&&h({},b._cellProps.all)),b._cellProps[B]&&h({},b._cellProps[B])),{key:Fe}),b[B]):null}))})),a,N&&p.createElement(Te,h({},M),p.createElement(pe,null,N.map(function(b,Q){return p.createElement(Ae,h({},typeof b=="object"&&b._props&&h({},b._props),{key:Q}),typeof b=="object"?b.label:b)})))))});mn.propTypes={align:i.oneOf(["bottom","middle","top"]),borderColor:i.string,bordered:i.bool,borderless:i.bool,caption:i.oneOfType([i.string,i.oneOf(["top"])]),captionTop:i.string,children:i.node,className:i.string,color:ae,columns:i.array,footer:i.array,hover:i.bool,items:i.array,responsive:i.oneOfType([i.bool,i.oneOf(["sm","md","lg","xl","xxl"])]),small:i.bool,striped:i.bool,stripedColumns:i.bool,tableFootProps:i.shape(h({},Te.propTypes)),tableHeadProps:i.shape(h({},Pe.propTypes))};mn.displayName="CTable";const Mt=()=>{};let ut={},dn={},pn=null,gn={mark:Mt,measure:Mt};try{typeof window<"u"&&(ut=window),typeof document<"u"&&(dn=document),typeof MutationObserver<"u"&&(pn=MutationObserver),typeof performance<"u"&&(gn=performance)}catch{}const{userAgent:Lt=""}=ut.navigator||{},$=ut,x=dn,Ft=pn,Ne=gn;$.document;const H=!!x.documentElement&&!!x.head&&typeof x.addEventListener=="function"&&typeof x.createElement=="function",hn=~Lt.indexOf("MSIE")||~Lt.indexOf("Trident/");var k="classic",bn="duotone",L="sharp",F="sharp-duotone",ra=[k,bn,L,F],oa={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds"}},Rt={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},sa=["kit"],ia=/fa(s|r|l|t|d|b|k|kd|ss|sr|sl|st|sds)?[\-\ ]/,la=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,ca={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},fa={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds"}},ua={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds"}},ma={classic:["fas","far","fal","fat"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds"]},da={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid"}},pa={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds"}},yn={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid"}},ga=["solid","regular","light","thin","duotone","brands"],vn=[1,2,3,4,5,6,7,8,9,10],ha=vn.concat([11,12,13,14,15,16,17,18,19,20]),me={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},ba=[...Object.keys(ma),...ga,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",me.GROUP,me.SWAP_OPACITY,me.PRIMARY,me.SECONDARY].concat(vn.map(e=>"".concat(e,"x"))).concat(ha.map(e=>"w-".concat(e))),ya={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},va={kit:{"fa-kit":"fak"},"kit-duotone":{"fa-kit-duotone":"fakd"}},xa={kit:{fak:"fa-kit"},"kit-duotone":{fakd:"fa-kit-duotone"}},zt={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}};const U="___FONT_AWESOME___",We=16,xn="fa",Nn="svg-inline--fa",te="data-fa-i2svg",He="data-fa-pseudo-element",Na="data-fa-pseudo-element-pending",mt="data-prefix",dt="data-icon",_t="fontawesome-i2svg",ka="async",Ca=["HTML","HEAD","STYLE","SCRIPT"],kn=(()=>{try{return!0}catch{return!1}})(),Cn=[k,L,F];function ve(e){return new Proxy(e,{get(t,n){return n in t?t[n]:t[k]}})}const An={...yn};An[k]={...yn[k],...Rt.kit,...Rt["kit-duotone"]};const J=ve(An),Be={...pa};Be[k]={...Be[k],...zt.kit,...zt["kit-duotone"]};const be=ve(Be),Ge={...da};Ge[k]={...Ge[k],...xa.kit};const ee=ve(Ge),Xe={...ua};Xe[k]={...Xe[k],...va.kit};const Aa=ve(Xe),Ea=ia,En="fa-layers-text",Oa=la,wa={...oa};ve(wa);const Pa=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],ze=me,le=new Set;Object.keys(be[k]).map(le.add.bind(le));Object.keys(be[L]).map(le.add.bind(le));Object.keys(be[F]).map(le.add.bind(le));const Ta=[...sa,...ba],ge=$.FontAwesomeConfig||{};function Sa(e){var t=x.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function Ia(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}x&&typeof x.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(t=>{let[n,a]=t;const r=Ia(Sa(n));r!=null&&(ge[a]=r)});const On={styleDefault:"solid",familyDefault:"classic",cssPrefix:xn,replacementClass:Nn,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};ge.familyPrefix&&(ge.cssPrefix=ge.familyPrefix);const ce={...On,...ge};ce.autoReplaceSvg||(ce.observeMutations=!1);const u={};Object.keys(On).forEach(e=>{Object.defineProperty(u,e,{enumerable:!0,set:function(t){ce[e]=t,he.forEach(n=>n(u))},get:function(){return ce[e]}})});Object.defineProperty(u,"familyPrefix",{enumerable:!0,set:function(e){ce.cssPrefix=e,he.forEach(t=>t(u))},get:function(){return ce.cssPrefix}});$.FontAwesomeConfig=u;const he=[];function Ma(e){return he.push(e),()=>{he.splice(he.indexOf(e),1)}}const X=We,j={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function La(e){if(!e||!H)return;const t=x.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;const n=x.head.childNodes;let a=null;for(let r=n.length-1;r>-1;r--){const o=n[r],s=(o.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(s)>-1&&(a=o)}return x.head.insertBefore(t,a),e}const Fa="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function ye(){let e=12,t="";for(;e-- >0;)t+=Fa[Math.random()*62|0];return t}function fe(e){const t=[];for(let n=(e||[]).length>>>0;n--;)t[n]=e[n];return t}function pt(e){return e.classList?fe(e.classList):(e.getAttribute("class")||"").split(" ").filter(t=>t)}function wn(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Ra(e){return Object.keys(e||{}).reduce((t,n)=>t+"".concat(n,'="').concat(wn(e[n]),'" '),"").trim()}function Se(e){return Object.keys(e||{}).reduce((t,n)=>t+"".concat(n,": ").concat(e[n].trim(),";"),"")}function gt(e){return e.size!==j.size||e.x!==j.x||e.y!==j.y||e.rotate!==j.rotate||e.flipX||e.flipY}function za(e){let{transform:t,containerWidth:n,iconWidth:a}=e;const r={transform:"translate(".concat(n/2," 256)")},o="translate(".concat(t.x*32,", ").concat(t.y*32,") "),s="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),l="rotate(".concat(t.rotate," 0 0)"),c={transform:"".concat(o," ").concat(s," ").concat(l)},f={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:c,path:f}}function _a(e){let{transform:t,width:n=We,height:a=We,startCentered:r=!1}=e,o="";return r&&hn?o+="translate(".concat(t.x/X-n/2,"em, ").concat(t.y/X-a/2,"em) "):r?o+="translate(calc(-50% + ".concat(t.x/X,"em), calc(-50% + ").concat(t.y/X,"em)) "):o+="translate(".concat(t.x/X,"em, ").concat(t.y/X,"em) "),o+="scale(".concat(t.size/X*(t.flipX?-1:1),", ").concat(t.size/X*(t.flipY?-1:1),") "),o+="rotate(".concat(t.rotate,"deg) "),o}var ja=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
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
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function Pn(){const e=xn,t=Nn,n=u.cssPrefix,a=u.replacementClass;let r=ja;if(n!==e||a!==t){const o=new RegExp("\\.".concat(e,"\\-"),"g"),s=new RegExp("\\--".concat(e,"\\-"),"g"),l=new RegExp("\\.".concat(t),"g");r=r.replace(o,".".concat(n,"-")).replace(s,"--".concat(n,"-")).replace(l,".".concat(a))}return r}let jt=!1;function _e(){u.autoAddCss&&!jt&&(La(Pn()),jt=!0)}var Da={mixout(){return{dom:{css:Pn,insertCss:_e}}},hooks(){return{beforeDOMElementCreation(){_e()},beforeI2svg(){_e()}}}};const W=$||{};W[U]||(W[U]={});W[U].styles||(W[U].styles={});W[U].hooks||(W[U].hooks={});W[U].shims||(W[U].shims=[]);var D=W[U];const Tn=[],Sn=function(){x.removeEventListener("DOMContentLoaded",Sn),Ee=1,Tn.map(e=>e())};let Ee=!1;H&&(Ee=(x.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(x.readyState),Ee||x.addEventListener("DOMContentLoaded",Sn));function Ya(e){H&&(Ee?setTimeout(e,0):Tn.push(e))}function xe(e){const{tag:t,attributes:n={},children:a=[]}=e;return typeof e=="string"?wn(e):"<".concat(t," ").concat(Ra(n),">").concat(a.map(xe).join(""),"</").concat(t,">")}function Dt(e,t,n){if(e&&e[t]&&e[t][n])return{prefix:t,iconName:n,icon:e[t][n]}}var je=function(t,n,a,r){var o=Object.keys(t),s=o.length,l=n,c,f,m;for(a===void 0?(c=1,m=t[o[0]]):(c=0,m=a);c<s;c++)f=o[c],m=l(m,t[f],f,t);return m};function Ua(e){const t=[];let n=0;const a=e.length;for(;n<a;){const r=e.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){const o=e.charCodeAt(n++);(o&64512)==56320?t.push(((r&1023)<<10)+(o&1023)+65536):(t.push(r),n--)}else t.push(r)}return t}function Ve(e){const t=Ua(e);return t.length===1?t[0].toString(16):null}function Wa(e,t){const n=e.length;let a=e.charCodeAt(t),r;return a>=55296&&a<=56319&&n>t+1&&(r=e.charCodeAt(t+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function Yt(e){return Object.keys(e).reduce((t,n)=>{const a=e[n];return!!a.icon?t[a.iconName]=a.icon:t[n]=a,t},{})}function $e(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:a=!1}=n,r=Yt(t);typeof D.hooks.addPack=="function"&&!a?D.hooks.addPack(e,Yt(t)):D.styles[e]={...D.styles[e]||{},...r},e==="fas"&&$e("fa",t)}const{styles:Z,shims:Ha}=D,Ba={[k]:Object.values(ee[k]),[L]:Object.values(ee[L]),[F]:Object.values(ee[F])};let ht=null,In={},Mn={},Ln={},Fn={},Rn={};const Ga={[k]:Object.keys(J[k]),[L]:Object.keys(J[L]),[F]:Object.keys(J[F])};function Xa(e){return~Ta.indexOf(e)}function Va(e,t){const n=t.split("-"),a=n[0],r=n.slice(1).join("-");return a===e&&r!==""&&!Xa(r)?r:null}const zn=()=>{const e=a=>je(Z,(r,o,s)=>(r[s]=je(o,a,{}),r),{});In=e((a,r,o)=>(r[3]&&(a[r[3]]=o),r[2]&&r[2].filter(l=>typeof l=="number").forEach(l=>{a[l.toString(16)]=o}),a)),Mn=e((a,r,o)=>(a[o]=o,r[2]&&r[2].filter(l=>typeof l=="string").forEach(l=>{a[l]=o}),a)),Rn=e((a,r,o)=>{const s=r[2];return a[o]=o,s.forEach(l=>{a[l]=o}),a});const t="far"in Z||u.autoFetchSvg,n=je(Ha,(a,r)=>{const o=r[0];let s=r[1];const l=r[2];return s==="far"&&!t&&(s="fas"),typeof o=="string"&&(a.names[o]={prefix:s,iconName:l}),typeof o=="number"&&(a.unicodes[o.toString(16)]={prefix:s,iconName:l}),a},{names:{},unicodes:{}});Ln=n.names,Fn=n.unicodes,ht=Ie(u.styleDefault,{family:u.familyDefault})};Ma(e=>{ht=Ie(e.styleDefault,{family:u.familyDefault})});zn();function bt(e,t){return(In[e]||{})[t]}function $a(e,t){return(Mn[e]||{})[t]}function V(e,t){return(Rn[e]||{})[t]}function _n(e){return Ln[e]||{prefix:null,iconName:null}}function Ka(e){const t=Fn[e],n=bt("fas",e);return t||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function K(){return ht}const yt=()=>({prefix:null,iconName:null,rest:[]});function Ie(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:n=k}=t,a=J[n][e],r=be[n][e]||be[n][a],o=e in D.styles?e:null;return r||o||null}const qa={[k]:Object.keys(ee[k]),[L]:Object.keys(ee[L]),[F]:Object.keys(ee[F])};function Me(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:n=!1}=t,a={[k]:"".concat(u.cssPrefix,"-").concat(k),[L]:"".concat(u.cssPrefix,"-").concat(L),[F]:"".concat(u.cssPrefix,"-").concat(F)};let r=null,o=k;const s=ra.filter(c=>c!==bn);s.forEach(c=>{(e.includes(a[c])||e.some(f=>qa[c].includes(f)))&&(o=c)});const l=e.reduce((c,f)=>{const m=Va(u.cssPrefix,f);if(Z[f]?(f=Ba[o].includes(f)?Aa[o][f]:f,r=f,c.prefix=f):Ga[o].indexOf(f)>-1?(r=f,c.prefix=Ie(f,{family:o})):m?c.iconName=m:f!==u.replacementClass&&!s.some(g=>f===a[g])&&c.rest.push(f),!n&&c.prefix&&c.iconName){const g=r==="fa"?_n(c.iconName):{},d=V(c.prefix,c.iconName);g.prefix&&(r=null),c.iconName=g.iconName||d||c.iconName,c.prefix=g.prefix||c.prefix,c.prefix==="far"&&!Z.far&&Z.fas&&!u.autoFetchSvg&&(c.prefix="fas")}return c},yt());return(e.includes("fa-brands")||e.includes("fab"))&&(l.prefix="fab"),(e.includes("fa-duotone")||e.includes("fad"))&&(l.prefix="fad"),!l.prefix&&o===L&&(Z.fass||u.autoFetchSvg)&&(l.prefix="fass",l.iconName=V(l.prefix,l.iconName)||l.iconName),!l.prefix&&o===F&&(Z.fasds||u.autoFetchSvg)&&(l.prefix="fasds",l.iconName=V(l.prefix,l.iconName)||l.iconName),(l.prefix==="fa"||r==="fa")&&(l.prefix=K()||"fas"),l}class Qa{constructor(){this.definitions={}}add(){for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];const r=n.reduce(this._pullDefinitions,{});Object.keys(r).forEach(o=>{this.definitions[o]={...this.definitions[o]||{},...r[o]},$e(o,r[o]);const s=ee[k][o];s&&$e(s,r[o]),zn()})}reset(){this.definitions={}}_pullDefinitions(t,n){const a=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(a).map(r=>{const{prefix:o,iconName:s,icon:l}=a[r],c=l[2];t[o]||(t[o]={}),c.length>0&&c.forEach(f=>{typeof f=="string"&&(t[o][f]=l)}),t[o][s]=l}),t}}let Ut=[],oe={};const ie={},Za=Object.keys(ie);function Ja(e,t){let{mixoutsTo:n}=t;return Ut=e,oe={},Object.keys(ie).forEach(a=>{Za.indexOf(a)===-1&&delete ie[a]}),Ut.forEach(a=>{const r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(o=>{typeof r[o]=="function"&&(n[o]=r[o]),typeof r[o]=="object"&&Object.keys(r[o]).forEach(s=>{n[o]||(n[o]={}),n[o][s]=r[o][s]})}),a.hooks){const o=a.hooks();Object.keys(o).forEach(s=>{oe[s]||(oe[s]=[]),oe[s].push(o[s])})}a.provides&&a.provides(ie)}),n}function Ke(e,t){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];return(oe[e]||[]).forEach(s=>{t=s.apply(null,[t,...a])}),t}function ne(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];(oe[e]||[]).forEach(o=>{o.apply(null,n)})}function q(){const e=arguments[0],t=Array.prototype.slice.call(arguments,1);return ie[e]?ie[e].apply(null,t):void 0}function qe(e){e.prefix==="fa"&&(e.prefix="fas");let{iconName:t}=e;const n=e.prefix||K();if(t)return t=V(n,t)||t,Dt(jn.definitions,n,t)||Dt(D.styles,n,t)}const jn=new Qa,er=()=>{u.autoReplaceSvg=!1,u.observeMutations=!1,ne("noAuto")},tr={i2svg:function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return H?(ne("beforeI2svg",e),q("pseudoElements2svg",e),q("i2svg",e)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:t}=e;u.autoReplaceSvg===!1&&(u.autoReplaceSvg=!0),u.observeMutations=!0,Ya(()=>{ar({autoReplaceSvgRoot:t}),ne("watch",e)})}},nr={icon:e=>{if(e===null)return null;if(typeof e=="object"&&e.prefix&&e.iconName)return{prefix:e.prefix,iconName:V(e.prefix,e.iconName)||e.iconName};if(Array.isArray(e)&&e.length===2){const t=e[1].indexOf("fa-")===0?e[1].slice(3):e[1],n=Ie(e[0]);return{prefix:n,iconName:V(n,t)||t}}if(typeof e=="string"&&(e.indexOf("".concat(u.cssPrefix,"-"))>-1||e.match(Ea))){const t=Me(e.split(" "),{skipLookups:!0});return{prefix:t.prefix||K(),iconName:V(t.prefix,t.iconName)||t.iconName}}if(typeof e=="string"){const t=K();return{prefix:t,iconName:V(t,e)||e}}}},R={noAuto:er,config:u,dom:tr,parse:nr,library:jn,findIconDefinition:qe,toHtml:xe},ar=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:t=x}=e;(Object.keys(D.styles).length>0||u.autoFetchSvg)&&H&&u.autoReplaceSvg&&R.dom.i2svg({node:t})};function Le(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(n=>xe(n))}}),Object.defineProperty(e,"node",{get:function(){if(!H)return;const n=x.createElement("div");return n.innerHTML=e.html,n.children}}),e}function rr(e){let{children:t,main:n,mask:a,attributes:r,styles:o,transform:s}=e;if(gt(s)&&n.found&&!a.found){const{width:l,height:c}=n,f={x:l/c/2,y:.5};r.style=Se({...o,"transform-origin":"".concat(f.x+s.x/16,"em ").concat(f.y+s.y/16,"em")})}return[{tag:"svg",attributes:r,children:t}]}function or(e){let{prefix:t,iconName:n,children:a,attributes:r,symbol:o}=e;const s=o===!0?"".concat(t,"-").concat(u.cssPrefix,"-").concat(n):o;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:{...r,id:s},children:a}]}]}function vt(e){const{icons:{main:t,mask:n},prefix:a,iconName:r,transform:o,symbol:s,title:l,maskId:c,titleId:f,extra:m,watchable:g=!1}=e,{width:d,height:N}=n.found?n:t,w=a==="fak",E=[u.replacementClass,r?"".concat(u.cssPrefix,"-").concat(r):""].filter(T=>m.classes.indexOf(T)===-1).filter(T=>T!==""||!!T).concat(m.classes).join(" ");let v={children:[],attributes:{...m.attributes,"data-prefix":a,"data-icon":r,class:E,role:m.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(d," ").concat(N)}};const A=w&&!~m.classes.indexOf("fa-fw")?{width:"".concat(d/N*16*.0625,"em")}:{};g&&(v.attributes[te]=""),l&&(v.children.push({tag:"title",attributes:{id:v.attributes["aria-labelledby"]||"title-".concat(f||ye())},children:[l]}),delete v.attributes.title);const C={...v,prefix:a,iconName:r,main:t,mask:n,maskId:c,transform:o,symbol:s,styles:{...A,...m.styles}},{children:O,attributes:M}=n.found&&t.found?q("generateAbstractMask",C)||{children:[],attributes:{}}:q("generateAbstractIcon",C)||{children:[],attributes:{}};return C.children=O,C.attributes=M,s?or(C):rr(C)}function Wt(e){const{content:t,width:n,height:a,transform:r,title:o,extra:s,watchable:l=!1}=e,c={...s.attributes,...o?{title:o}:{},class:s.classes.join(" ")};l&&(c[te]="");const f={...s.styles};gt(r)&&(f.transform=_a({transform:r,startCentered:!0,width:n,height:a}),f["-webkit-transform"]=f.transform);const m=Se(f);m.length>0&&(c.style=m);const g=[];return g.push({tag:"span",attributes:c,children:[t]}),o&&g.push({tag:"span",attributes:{class:"sr-only"},children:[o]}),g}function sr(e){const{content:t,title:n,extra:a}=e,r={...a.attributes,...n?{title:n}:{},class:a.classes.join(" ")},o=Se(a.styles);o.length>0&&(r.style=o);const s=[];return s.push({tag:"span",attributes:r,children:[t]}),n&&s.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),s}const{styles:De}=D;function Qe(e){const t=e[0],n=e[1],[a]=e.slice(4);let r=null;return Array.isArray(a)?r={tag:"g",attributes:{class:"".concat(u.cssPrefix,"-").concat(ze.GROUP)},children:[{tag:"path",attributes:{class:"".concat(u.cssPrefix,"-").concat(ze.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(u.cssPrefix,"-").concat(ze.PRIMARY),fill:"currentColor",d:a[1]}}]}:r={tag:"path",attributes:{fill:"currentColor",d:a}},{found:!0,width:t,height:n,icon:r}}const ir={found:!1,width:512,height:512};function lr(e,t){!kn&&!u.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function Ze(e,t){let n=t;return t==="fa"&&u.styleDefault!==null&&(t=K()),new Promise((a,r)=>{if(n==="fa"){const o=_n(e)||{};e=o.iconName||e,t=o.prefix||t}if(e&&t&&De[t]&&De[t][e]){const o=De[t][e];return a(Qe(o))}lr(e,t),a({...ir,icon:u.showMissingIcons&&e?q("missingIconAbstract")||{}:{}})})}const Ht=()=>{},Je=u.measurePerformance&&Ne&&Ne.mark&&Ne.measure?Ne:{mark:Ht,measure:Ht},de='FA "6.6.0"',cr=e=>(Je.mark("".concat(de," ").concat(e," begins")),()=>Dn(e)),Dn=e=>{Je.mark("".concat(de," ").concat(e," ends")),Je.measure("".concat(de," ").concat(e),"".concat(de," ").concat(e," begins"),"".concat(de," ").concat(e," ends"))};var xt={begin:cr,end:Dn};const ke=()=>{};function Bt(e){return typeof(e.getAttribute?e.getAttribute(te):null)=="string"}function fr(e){const t=e.getAttribute?e.getAttribute(mt):null,n=e.getAttribute?e.getAttribute(dt):null;return t&&n}function ur(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(u.replacementClass)}function mr(){return u.autoReplaceSvg===!0?Ce.replace:Ce[u.autoReplaceSvg]||Ce.replace}function dr(e){return x.createElementNS("http://www.w3.org/2000/svg",e)}function pr(e){return x.createElement(e)}function Yn(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:n=e.tag==="svg"?dr:pr}=t;if(typeof e=="string")return x.createTextNode(e);const a=n(e.tag);return Object.keys(e.attributes||[]).forEach(function(o){a.setAttribute(o,e.attributes[o])}),(e.children||[]).forEach(function(o){a.appendChild(Yn(o,{ceFn:n}))}),a}function gr(e){let t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}const Ce={replace:function(e){const t=e[0];if(t.parentNode)if(e[1].forEach(n=>{t.parentNode.insertBefore(Yn(n),t)}),t.getAttribute(te)===null&&u.keepOriginalSource){let n=x.createComment(gr(t));t.parentNode.replaceChild(n,t)}else t.remove()},nest:function(e){const t=e[0],n=e[1];if(~pt(t).indexOf(u.replacementClass))return Ce.replace(e);const a=new RegExp("".concat(u.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){const o=n[0].attributes.class.split(" ").reduce((s,l)=>(l===u.replacementClass||l.match(a)?s.toSvg.push(l):s.toNode.push(l),s),{toNode:[],toSvg:[]});n[0].attributes.class=o.toSvg.join(" "),o.toNode.length===0?t.removeAttribute("class"):t.setAttribute("class",o.toNode.join(" "))}const r=n.map(o=>xe(o)).join(`
`);t.setAttribute(te,""),t.innerHTML=r}};function Gt(e){e()}function Un(e,t){const n=typeof t=="function"?t:ke;if(e.length===0)n();else{let a=Gt;u.mutateApproach===ka&&(a=$.requestAnimationFrame||Gt),a(()=>{const r=mr(),o=xt.begin("mutate");e.map(r),o(),n()})}}let Nt=!1;function Wn(){Nt=!0}function et(){Nt=!1}let Oe=null;function Xt(e){if(!Ft||!u.observeMutations)return;const{treeCallback:t=ke,nodeCallback:n=ke,pseudoElementsCallback:a=ke,observeMutationsRoot:r=x}=e;Oe=new Ft(o=>{if(Nt)return;const s=K();fe(o).forEach(l=>{if(l.type==="childList"&&l.addedNodes.length>0&&!Bt(l.addedNodes[0])&&(u.searchPseudoElements&&a(l.target),t(l.target)),l.type==="attributes"&&l.target.parentNode&&u.searchPseudoElements&&a(l.target.parentNode),l.type==="attributes"&&Bt(l.target)&&~Pa.indexOf(l.attributeName))if(l.attributeName==="class"&&fr(l.target)){const{prefix:c,iconName:f}=Me(pt(l.target));l.target.setAttribute(mt,c||s),f&&l.target.setAttribute(dt,f)}else ur(l.target)&&n(l.target)})}),H&&Oe.observe(r,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function hr(){Oe&&Oe.disconnect()}function br(e){const t=e.getAttribute("style");let n=[];return t&&(n=t.split(";").reduce((a,r)=>{const o=r.split(":"),s=o[0],l=o.slice(1);return s&&l.length>0&&(a[s]=l.join(":").trim()),a},{})),n}function yr(e){const t=e.getAttribute("data-prefix"),n=e.getAttribute("data-icon"),a=e.innerText!==void 0?e.innerText.trim():"";let r=Me(pt(e));return r.prefix||(r.prefix=K()),t&&n&&(r.prefix=t,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=$a(r.prefix,e.innerText)||bt(r.prefix,Ve(e.innerText))),!r.iconName&&u.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=e.firstChild.data)),r}function vr(e){const t=fe(e.attributes).reduce((r,o)=>(r.name!=="class"&&r.name!=="style"&&(r[o.name]=o.value),r),{}),n=e.getAttribute("title"),a=e.getAttribute("data-fa-title-id");return u.autoA11y&&(n?t["aria-labelledby"]="".concat(u.replacementClass,"-title-").concat(a||ye()):(t["aria-hidden"]="true",t.focusable="false")),t}function xr(){return{iconName:null,title:null,titleId:null,prefix:null,transform:j,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Vt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:n,prefix:a,rest:r}=yr(e),o=vr(e),s=Ke("parseNodeAttributes",{},e);let l=t.styleParser?br(e):[];return{iconName:n,title:e.getAttribute("title"),titleId:e.getAttribute("data-fa-title-id"),prefix:a,transform:j,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:r,styles:l,attributes:o},...s}}const{styles:Nr}=D;function Hn(e){const t=u.autoReplaceSvg==="nest"?Vt(e,{styleParser:!1}):Vt(e);return~t.extra.classes.indexOf(En)?q("generateLayersText",e,t):q("generateSvgReplacementMutation",e,t)}let Y=new Set;Cn.map(e=>{Y.add("fa-".concat(e))});Object.keys(J[k]).map(Y.add.bind(Y));Object.keys(J[L]).map(Y.add.bind(Y));Object.keys(J[F]).map(Y.add.bind(Y));Y=[...Y];function $t(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!H)return Promise.resolve();const n=x.documentElement.classList,a=m=>n.add("".concat(_t,"-").concat(m)),r=m=>n.remove("".concat(_t,"-").concat(m)),o=u.autoFetchSvg?Y:Cn.map(m=>"fa-".concat(m)).concat(Object.keys(Nr));o.includes("fa")||o.push("fa");const s=[".".concat(En,":not([").concat(te,"])")].concat(o.map(m=>".".concat(m,":not([").concat(te,"])"))).join(", ");if(s.length===0)return Promise.resolve();let l=[];try{l=fe(e.querySelectorAll(s))}catch{}if(l.length>0)a("pending"),r("complete");else return Promise.resolve();const c=xt.begin("onTree"),f=l.reduce((m,g)=>{try{const d=Hn(g);d&&m.push(d)}catch(d){kn||d.name==="MissingIcon"&&console.error(d)}return m},[]);return new Promise((m,g)=>{Promise.all(f).then(d=>{Un(d,()=>{a("active"),a("complete"),r("pending"),typeof t=="function"&&t(),c(),m()})}).catch(d=>{c(),g(d)})})}function kr(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Hn(e).then(n=>{n&&Un([n],t)})}function Cr(e){return function(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const a=(t||{}).icon?t:qe(t||{});let{mask:r}=n;return r&&(r=(r||{}).icon?r:qe(r||{})),e(a,{...n,mask:r})}}const Ar=function(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=j,symbol:a=!1,mask:r=null,maskId:o=null,title:s=null,titleId:l=null,classes:c=[],attributes:f={},styles:m={}}=t;if(!e)return;const{prefix:g,iconName:d,icon:N}=e;return Le({type:"icon",...e},()=>(ne("beforeDOMElementCreation",{iconDefinition:e,params:t}),u.autoA11y&&(s?f["aria-labelledby"]="".concat(u.replacementClass,"-title-").concat(l||ye()):(f["aria-hidden"]="true",f.focusable="false")),vt({icons:{main:Qe(N),mask:r?Qe(r.icon):{found:!1,width:null,height:null,icon:{}}},prefix:g,iconName:d,transform:{...j,...n},symbol:a,title:s,maskId:o,titleId:l,extra:{attributes:f,styles:m,classes:c}})))};var Er={mixout(){return{icon:Cr(Ar)}},hooks(){return{mutationObserverCallbacks(e){return e.treeCallback=$t,e.nodeCallback=kr,e}}},provides(e){e.i2svg=function(t){const{node:n=x,callback:a=()=>{}}=t;return $t(n,a)},e.generateSvgReplacementMutation=function(t,n){const{iconName:a,title:r,titleId:o,prefix:s,transform:l,symbol:c,mask:f,maskId:m,extra:g}=n;return new Promise((d,N)=>{Promise.all([Ze(a,s),f.iconName?Ze(f.iconName,f.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(w=>{let[E,v]=w;d([t,vt({icons:{main:E,mask:v},prefix:s,iconName:a,transform:l,symbol:c,maskId:m,title:r,titleId:o,extra:g,watchable:!0})])}).catch(N)})},e.generateAbstractIcon=function(t){let{children:n,attributes:a,main:r,transform:o,styles:s}=t;const l=Se(s);l.length>0&&(a.style=l);let c;return gt(o)&&(c=q("generateAbstractTransformGrouping",{main:r,transform:o,containerWidth:r.width,iconWidth:r.width})),n.push(c||r.icon),{children:n,attributes:a}}}},Or={mixout(){return{layer(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:n=[]}=t;return Le({type:"layer"},()=>{ne("beforeDOMElementCreation",{assembler:e,params:t});let a=[];return e(r=>{Array.isArray(r)?r.map(o=>{a=a.concat(o.abstract)}):a=a.concat(r.abstract)}),[{tag:"span",attributes:{class:["".concat(u.cssPrefix,"-layers"),...n].join(" ")},children:a}]})}}}},wr={mixout(){return{counter(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:n=null,classes:a=[],attributes:r={},styles:o={}}=t;return Le({type:"counter",content:e},()=>(ne("beforeDOMElementCreation",{content:e,params:t}),sr({content:e.toString(),title:n,extra:{attributes:r,styles:o,classes:["".concat(u.cssPrefix,"-layers-counter"),...a]}})))}}}},Pr={mixout(){return{text(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=j,title:a=null,classes:r=[],attributes:o={},styles:s={}}=t;return Le({type:"text",content:e},()=>(ne("beforeDOMElementCreation",{content:e,params:t}),Wt({content:e,transform:{...j,...n},title:a,extra:{attributes:o,styles:s,classes:["".concat(u.cssPrefix,"-layers-text"),...r]}})))}}},provides(e){e.generateLayersText=function(t,n){const{title:a,transform:r,extra:o}=n;let s=null,l=null;if(hn){const c=parseInt(getComputedStyle(t).fontSize,10),f=t.getBoundingClientRect();s=f.width/c,l=f.height/c}return u.autoA11y&&!a&&(o.attributes["aria-hidden"]="true"),Promise.resolve([t,Wt({content:t.innerHTML,width:s,height:l,transform:r,title:a,extra:o,watchable:!0})])}}};const Tr=new RegExp('"',"ug"),Kt=[1105920,1112319],qt={FontAwesome:{normal:"fas",400:"fas"},...fa,...ca,...ya},tt=Object.keys(qt).reduce((e,t)=>(e[t.toLowerCase()]=qt[t],e),{}),Sr=Object.keys(tt).reduce((e,t)=>{const n=tt[t];return e[t]=n[900]||[...Object.entries(n)][0][1],e},{});function Ir(e){const t=e.replace(Tr,""),n=Wa(t,0),a=n>=Kt[0]&&n<=Kt[1],r=t.length===2?t[0]===t[1]:!1;return{value:Ve(r?t[0]:t),isSecondary:a||r}}function Mr(e,t){const n=e.replace(/^['"]|['"]$/g,"").toLowerCase(),a=parseInt(t),r=isNaN(a)?"normal":a;return(tt[n]||{})[r]||Sr[n]}function Qt(e,t){const n="".concat(Na).concat(t.replace(":","-"));return new Promise((a,r)=>{if(e.getAttribute(n)!==null)return a();const s=fe(e.children).filter(d=>d.getAttribute(He)===t)[0],l=$.getComputedStyle(e,t),c=l.getPropertyValue("font-family"),f=c.match(Oa),m=l.getPropertyValue("font-weight"),g=l.getPropertyValue("content");if(s&&!f)return e.removeChild(s),a();if(f&&g!=="none"&&g!==""){const d=l.getPropertyValue("content");let N=Mr(c,m);const{value:w,isSecondary:E}=Ir(d),v=f[0].startsWith("FontAwesome");let A=bt(N,w),C=A;if(v){const O=Ka(w);O.iconName&&O.prefix&&(A=O.iconName,N=O.prefix)}if(A&&!E&&(!s||s.getAttribute(mt)!==N||s.getAttribute(dt)!==C)){e.setAttribute(n,C),s&&e.removeChild(s);const O=xr(),{extra:M}=O;M.attributes[He]=t,Ze(A,N).then(T=>{const re=vt({...O,icons:{main:T,mask:yt()},prefix:N,iconName:C,extra:M,watchable:!0}),z=x.createElementNS("http://www.w3.org/2000/svg","svg");t==="::before"?e.insertBefore(z,e.firstChild):e.appendChild(z),z.outerHTML=re.map(b=>xe(b)).join(`
`),e.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function Lr(e){return Promise.all([Qt(e,"::before"),Qt(e,"::after")])}function Fr(e){return e.parentNode!==document.head&&!~Ca.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(He)&&(!e.parentNode||e.parentNode.tagName!=="svg")}function Zt(e){if(H)return new Promise((t,n)=>{const a=fe(e.querySelectorAll("*")).filter(Fr).map(Lr),r=xt.begin("searchPseudoElements");Wn(),Promise.all(a).then(()=>{r(),et(),t()}).catch(()=>{r(),et(),n()})})}var Rr={hooks(){return{mutationObserverCallbacks(e){return e.pseudoElementsCallback=Zt,e}}},provides(e){e.pseudoElements2svg=function(t){const{node:n=x}=t;u.searchPseudoElements&&Zt(n)}}};let Jt=!1;var zr={mixout(){return{dom:{unwatch(){Wn(),Jt=!0}}}},hooks(){return{bootstrap(){Xt(Ke("mutationObserverCallbacks",{}))},noAuto(){hr()},watch(e){const{observeMutationsRoot:t}=e;Jt?et():Xt(Ke("mutationObserverCallbacks",{observeMutationsRoot:t}))}}}};const en=e=>{let t={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return e.toLowerCase().split(" ").reduce((n,a)=>{const r=a.toLowerCase().split("-"),o=r[0];let s=r.slice(1).join("-");if(o&&s==="h")return n.flipX=!0,n;if(o&&s==="v")return n.flipY=!0,n;if(s=parseFloat(s),isNaN(s))return n;switch(o){case"grow":n.size=n.size+s;break;case"shrink":n.size=n.size-s;break;case"left":n.x=n.x-s;break;case"right":n.x=n.x+s;break;case"up":n.y=n.y-s;break;case"down":n.y=n.y+s;break;case"rotate":n.rotate=n.rotate+s;break}return n},t)};var _r={mixout(){return{parse:{transform:e=>en(e)}}},hooks(){return{parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-transform");return n&&(e.transform=en(n)),e}}},provides(e){e.generateAbstractTransformGrouping=function(t){let{main:n,transform:a,containerWidth:r,iconWidth:o}=t;const s={transform:"translate(".concat(r/2," 256)")},l="translate(".concat(a.x*32,", ").concat(a.y*32,") "),c="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),f="rotate(".concat(a.rotate," 0 0)"),m={transform:"".concat(l," ").concat(c," ").concat(f)},g={transform:"translate(".concat(o/2*-1," -256)")},d={outer:s,inner:m,path:g};return{tag:"g",attributes:{...d.outer},children:[{tag:"g",attributes:{...d.inner},children:[{tag:n.icon.tag,children:n.icon.children,attributes:{...n.icon.attributes,...d.path}}]}]}}}};const Ye={x:0,y:0,width:"100%",height:"100%"};function tn(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function jr(e){return e.tag==="g"?e.children:[e]}var Dr={hooks(){return{parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-mask"),a=n?Me(n.split(" ").map(r=>r.trim())):yt();return a.prefix||(a.prefix=K()),e.mask=a,e.maskId=t.getAttribute("data-fa-mask-id"),e}}},provides(e){e.generateAbstractMask=function(t){let{children:n,attributes:a,main:r,mask:o,maskId:s,transform:l}=t;const{width:c,icon:f}=r,{width:m,icon:g}=o,d=za({transform:l,containerWidth:m,iconWidth:c}),N={tag:"rect",attributes:{...Ye,fill:"white"}},w=f.children?{children:f.children.map(tn)}:{},E={tag:"g",attributes:{...d.inner},children:[tn({tag:f.tag,attributes:{...f.attributes,...d.path},...w})]},v={tag:"g",attributes:{...d.outer},children:[E]},A="mask-".concat(s||ye()),C="clip-".concat(s||ye()),O={tag:"mask",attributes:{...Ye,id:A,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"},children:[N,v]},M={tag:"defs",children:[{tag:"clipPath",attributes:{id:C},children:jr(g)},O]};return n.push(M,{tag:"rect",attributes:{fill:"currentColor","clip-path":"url(#".concat(C,")"),mask:"url(#".concat(A,")"),...Ye}}),{children:n,attributes:a}}}},Yr={provides(e){let t=!1;$.matchMedia&&(t=$.matchMedia("(prefers-reduced-motion: reduce)").matches),e.missingIconAbstract=function(){const n=[],a={fill:"currentColor"},r={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:{...a,d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"}});const o={...r,attributeName:"opacity"},s={tag:"circle",attributes:{...a,cx:"256",cy:"364",r:"28"},children:[]};return t||s.children.push({tag:"animate",attributes:{...r,attributeName:"r",values:"28;14;28;28;14;28;"}},{tag:"animate",attributes:{...o,values:"1;0;1;1;0;1;"}}),n.push(s),n.push({tag:"path",attributes:{...a,opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"},children:t?[]:[{tag:"animate",attributes:{...o,values:"1;0;0;0;0;1;"}}]}),t||n.push({tag:"path",attributes:{...a,opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"},children:[{tag:"animate",attributes:{...o,values:"0;0;1;1;0;0;"}}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},Ur={hooks(){return{parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-symbol"),a=n===null?!1:n===""?!0:n;return e.symbol=a,e}}}},Wr=[Da,Er,Or,wr,Pr,Rr,zr,_r,Dr,Yr,Ur];Ja(Wr,{mixoutsTo:R});R.noAuto;R.config;R.library;R.dom;const nt=R.parse;R.findIconDefinition;R.toHtml;const Hr=R.icon;R.layer;R.text;R.counter;function nn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,a)}return n}function _(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?nn(Object(n),!0).forEach(function(a){se(e,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):nn(Object(n)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})}return e}function we(e){"@babel/helpers - typeof";return we=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},we(e)}function se(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Br(e,t){if(e==null)return{};var n={},a=Object.keys(e),r,o;for(o=0;o<a.length;o++)r=a[o],!(t.indexOf(r)>=0)&&(n[r]=e[r]);return n}function Gr(e,t){if(e==null)return{};var n=Br(e,t),a,r;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],!(t.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}function at(e){return Xr(e)||Vr(e)||$r(e)||Kr()}function Xr(e){if(Array.isArray(e))return rt(e)}function Vr(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function $r(e,t){if(e){if(typeof e=="string")return rt(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return rt(e,t)}}function rt(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function Kr(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function qr(e){var t,n=e.beat,a=e.fade,r=e.beatFade,o=e.bounce,s=e.shake,l=e.flash,c=e.spin,f=e.spinPulse,m=e.spinReverse,g=e.pulse,d=e.fixedWidth,N=e.inverse,w=e.border,E=e.listItem,v=e.flip,A=e.size,C=e.rotation,O=e.pull,M=(t={"fa-beat":n,"fa-fade":a,"fa-beat-fade":r,"fa-bounce":o,"fa-shake":s,"fa-flash":l,"fa-spin":c,"fa-spin-reverse":m,"fa-spin-pulse":f,"fa-pulse":g,"fa-fw":d,"fa-inverse":N,"fa-border":w,"fa-li":E,"fa-flip":v===!0,"fa-flip-horizontal":v==="horizontal"||v==="both","fa-flip-vertical":v==="vertical"||v==="both"},se(t,"fa-".concat(A),typeof A<"u"&&A!==null),se(t,"fa-rotate-".concat(C),typeof C<"u"&&C!==null&&C!==0),se(t,"fa-pull-".concat(O),typeof O<"u"&&O!==null),se(t,"fa-swap-opacity",e.swapOpacity),t);return Object.keys(M).map(function(T){return M[T]?T:null}).filter(function(T){return T})}function Qr(e){return e=e-0,e===e}function Bn(e){return Qr(e)?e:(e=e.replace(/[\-_\s]+(.)?/g,function(t,n){return n?n.toUpperCase():""}),e.substr(0,1).toLowerCase()+e.substr(1))}var Zr=["style"];function Jr(e){return e.charAt(0).toUpperCase()+e.slice(1)}function eo(e){return e.split(";").map(function(t){return t.trim()}).filter(function(t){return t}).reduce(function(t,n){var a=n.indexOf(":"),r=Bn(n.slice(0,a)),o=n.slice(a+1).trim();return r.startsWith("webkit")?t[Jr(r)]=o:t[r]=o,t},{})}function Gn(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof t=="string")return t;var a=(t.children||[]).map(function(c){return Gn(e,c)}),r=Object.keys(t.attributes||{}).reduce(function(c,f){var m=t.attributes[f];switch(f){case"class":c.attrs.className=m,delete t.attributes.class;break;case"style":c.attrs.style=eo(m);break;default:f.indexOf("aria-")===0||f.indexOf("data-")===0?c.attrs[f.toLowerCase()]=m:c.attrs[Bn(f)]=m}return c},{attrs:{}}),o=n.style,s=o===void 0?{}:o,l=Gr(n,Zr);return r.attrs.style=_(_({},r.attrs.style),s),e.apply(void 0,[t.tag,_(_({},r.attrs),l)].concat(at(a)))}var Xn=!1;try{Xn=!0}catch{}function to(){if(!Xn&&console&&typeof console.error=="function"){var e;(e=console).error.apply(e,arguments)}}function an(e){if(e&&we(e)==="object"&&e.prefix&&e.iconName&&e.icon)return e;if(nt.icon)return nt.icon(e);if(e===null)return null;if(e&&we(e)==="object"&&e.prefix&&e.iconName)return e;if(Array.isArray(e)&&e.length===2)return{prefix:e[0],iconName:e[1]};if(typeof e=="string")return{prefix:"fas",iconName:e}}function Ue(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?se({},e,t):{}}var rn={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1},Vn=p.forwardRef(function(e,t){var n=_(_({},rn),e),a=n.icon,r=n.mask,o=n.symbol,s=n.className,l=n.title,c=n.titleId,f=n.maskId,m=an(a),g=Ue("classes",[].concat(at(qr(n)),at((s||"").split(" ")))),d=Ue("transform",typeof n.transform=="string"?nt.transform(n.transform):n.transform),N=Ue("mask",an(r)),w=Hr(m,_(_(_(_({},g),d),N),{},{symbol:o,title:l,titleId:c,maskId:f}));if(!w)return to("Could not find icon",m),null;var E=w.abstract,v={ref:t};return Object.keys(n).forEach(function(A){rn.hasOwnProperty(A)||(v[A]=n[A])}),no(E[0],v)});Vn.displayName="FontAwesomeIcon";Vn.propTypes={beat:i.bool,border:i.bool,beatFade:i.bool,bounce:i.bool,className:i.string,fade:i.bool,flash:i.bool,mask:i.oneOfType([i.object,i.array,i.string]),maskId:i.string,fixedWidth:i.bool,inverse:i.bool,flip:i.oneOf([!0,!1,"horizontal","vertical","both"]),icon:i.oneOfType([i.object,i.array,i.string]),listItem:i.bool,pull:i.oneOf(["right","left"]),pulse:i.bool,rotation:i.oneOf([0,90,180,270]),shake:i.bool,size:i.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:i.bool,spinPulse:i.bool,spinReverse:i.bool,symbol:i.oneOfType([i.bool,i.string]),title:i.string,titleId:i.string,transform:i.oneOfType([i.string,i.object]),swapOpacity:i.bool};var no=Gn.bind(null,p.createElement);const so={prefix:"fas",iconName:"pen-to-square",icon:[512,512,["edit"],"f044","M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"]},io={prefix:"fas",iconName:"trash",icon:[448,512,[],"f1f8","M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"]},lo={prefix:"fas",iconName:"magnifying-glass",icon:[512,512,[128269,"search"],"f002","M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"]};export{sn as C,Vn as F,io as a,fn as b,un as c,ln as d,cn as e,so as f,lo as g,mn as h,Pe as i,pe as j,it as k,Ae as l,lt as m};
