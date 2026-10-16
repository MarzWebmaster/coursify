import{p as a,j as e,n as t,R as d}from"./index-CdRPss5l.js";/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M5 12l5 5l10 -10",key:"svg-0"}]],i=a("outline","check","Check",u);/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["path",{d:"M12 9h.01",key:"svg-0"}],["path",{d:"M11 12h1v4h1",key:"svg-1"}]],f=a("outline","info-small","InfoSmall",x),m=(o,n=e.jsx(i,{}))=>{t.show({message:o,color:"green",icon:n,position:"top-center"})},y=(o,n=e.jsx(f,{}))=>{t.show({message:o,color:"blue",icon:n,position:"top-center"})},k=(o,n=e.jsx(d,{}))=>{t.show({message:o,color:"red",icon:n,position:"top-center"})},w=(o,n,l={})=>{const{undoLabel:p="Undo",autoClose:h=5e3}=l,c=`undo-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,r=()=>{t.hide(c),n()};t.show({id:c,color:"green",icon:e.jsx(i,{}),position:"top-center",autoClose:h,message:e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:12,justifyContent:"space-between"},children:[e.jsx("span",{style:{flex:1},children:o}),e.jsx("button",{type:"button",onClick:r,onKeyDown:s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),r())},style:{background:"transparent",border:"none",padding:"2px 8px",color:"var(--mantine-color-green-8)",fontWeight:700,cursor:"pointer",textTransform:"uppercase",fontSize:12,letterSpacing:"0.05em",flexShrink:0},children:p})]})})};export{i as I,k as a,m as b,w as c,y as s};
