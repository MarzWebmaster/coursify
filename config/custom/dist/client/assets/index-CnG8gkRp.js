import{p as c,r as p,j as e,S as M,i as t,I as h,F as r}from"./index-CdRPss5l.js";import{C as _}from"./ColorInput-D5ZxgjIl.js";import{T as j}from"./Tooltip-WndNd4Pd.js";import{S as b}from"./SegmentedControl-BlE3eWge.js";import{d as f,v as E,h as C,H as k,D as v,b as z,a as u}from"./themeUtils-CtJ__vKm.js";import{S as F}from"./Select-hoOPFn3R.js";import{e as S}from"./fontLoader-BXZMdumh.js";/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["path",{d:"M11 7l6 6",key:"svg-0"}],["path",{d:"M4 16l11.7 -11.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-11.7 11.7h-4v-4z",key:"svg-1"}]],V=c("outline","color-picker","ColorPicker",I);/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["path",{d:"M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0",key:"svg-0"}],["path",{d:"M11.102 17.957c-3.204 -.307 -5.904 -2.294 -8.102 -5.957c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6a19.5 19.5 0 0 1 -.663 1.032",key:"svg-1"}],["path",{d:"M15 19l2 2l4 -4",key:"svg-2"}]],N=c("outline","eye-check","EyeCheck",T);/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["path",{d:"M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0",key:"svg-0"}],["path",{d:"M15.03 17.478a8.797 8.797 0 0 1 -3.03 .522c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6a20.48 20.48 0 0 1 -.258 .419",key:"svg-1"}],["path",{d:"M19 16v3",key:"svg-2"}],["path",{d:"M19 22v.01",key:"svg-3"}]],H=c("outline","eye-exclamation","EyeExclamation",w);/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z",key:"svg-0"}]],A=c("outline","moon","Moon",P);/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M15 8h.01",key:"svg-0"}],["path",{d:"M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z",key:"svg-1"}],["path",{d:"M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5",key:"svg-2"}],["path",{d:"M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3",key:"svg-3"}]],Q=c("outline","photo","Photo",L);/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",key:"svg-0"}],["path",{d:"M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7",key:"svg-1"}]],$=c("outline","sun","Sun",O);/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["path",{d:"M4 20l3 0",key:"svg-0"}],["path",{d:"M14 20l7 0",key:"svg-1"}],["path",{d:"M6.9 15l6.9 0",key:"svg-2"}],["path",{d:"M10.2 6.3l5.8 13.7",key:"svg-3"}],["path",{d:"M5 20l6 -16l2 0l7 16",key:"svg-4"}]],Y=c("outline","typography","Typography",D),ee=({values:o,onChange:l,disabled:d=!1})=>{const a=n=>{l({...o,accent:n})},m=n=>{const i=f(n);l({...o,background:n,mode:i})},g=n=>{l({...o,mode:n})};p.useEffect(()=>{if(o.background&&!o.mode){const n=f(o.background);l({...o,mode:n})}},[o.background]);const y=o.mode||"light",s=p.useMemo(()=>{const n=E(o);return C(n)},[o.accent,o.background,o.mode]);return e.jsxs(M,{gap:"md",children:[e.jsx(_,{format:"hexa",label:t._({id:"1uJlG9"}),description:t._({id:"HxxXZO"}),size:"sm",value:o.accent||"#8b5cf6",onChange:a,disabled:d}),e.jsx(_,{format:"hexa",label:t._({id:"k1bLf+"}),description:t._({id:"KfmPRW"}),size:"sm",value:o.background||"#f5f3ff",onChange:m,disabled:d}),e.jsxs("div",{children:[e.jsx(h,{size:"sm",fw:500,mb:4,children:t._({id:"FpsvqB"})}),e.jsx(h,{size:"xs",c:"dimmed",mb:8,children:t._({id:"PZ7FTW"})}),e.jsx(b,{fullWidth:!0,value:y,onChange:g,disabled:d,data:[{label:e.jsxs(r,{gap:6,justify:"center",children:[e.jsx($,{size:16}),e.jsx("span",{children:t._({id:"1njn7W"})})]}),value:"light"},{label:e.jsxs(r,{gap:6,justify:"center",children:[e.jsx(A,{size:16}),e.jsx("span",{children:t._({id:"pvnfJD"})})]}),value:"dark"}]})]}),e.jsx(r,{gap:6,style:{minHeight:20},children:s?e.jsx(j,{label:t._({id:"AaP0M+"}),multiline:!0,w:220,children:e.jsxs(r,{gap:6,style:{cursor:"help"},children:[e.jsx(H,{size:30,color:"var(--mantine-color-yellow-6)"}),e.jsx(h,{size:"xs",c:"yellow.7",children:t._({id:"6K0GjX"})})]})}):e.jsxs(r,{gap:6,children:[e.jsx(N,{size:30,color:"var(--mantine-color-teal-6)"}),e.jsx(h,{size:"xs",c:"dimmed",children:t._({id:"6nDzTl"})})]})})]})},G="_option_3w2xo_1",W="_optionLabel_3w2xo_9",B="_optionSample_3w2xo_14",x={option:G,optionLabel:W,optionSample:B},oe=({value:o,onChange:l,disabled:d=!1})=>{const a=o||v,m=p.useMemo(()=>k.map(s=>({value:s.value,label:s.label})),[]);p.useEffect(()=>{k.forEach(s=>{if(s.value===v||typeof document>"u")return;const n=`hi-font-preview-${s.bunnyFamily}`;if(document.getElementById(n))return;const i=document.createElement("link");i.id=n,i.rel="stylesheet",i.href=z(s.value),document.head.appendChild(i)})},[]),p.useEffect(()=>{S(a)},[a]);const g=s=>{s&&l(s)},y=({option:s})=>e.jsxs("div",{className:x.option,style:{fontFamily:u(s.value)},children:[e.jsx("span",{className:x.optionLabel,children:s.label}),e.jsx("span",{className:x.optionSample,children:"Aa 123"})]});return e.jsxs("div",{children:[e.jsx(F,{label:t._({id:"X+U6/w"}),description:t._({id:"pHEhf+"}),size:"sm",value:a,onChange:g,data:m,disabled:d,searchable:!0,allowDeselect:!1,nothingFoundMessage:t._({id:"IcAC6J"}),renderOption:y,styles:{input:{fontFamily:u(a)}}}),e.jsx(h,{size:"xs",c:"dimmed",mt:6,style:{fontFamily:u(a)},children:t._({id:"OVSkIF"})})]})};export{Q as I,ee as T,V as a,Y as b,oe as c};
