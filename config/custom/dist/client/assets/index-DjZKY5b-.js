import{p as o,r as i,j as t,B as p,a6 as b}from"./index-CdRPss5l.js";/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M10 3.2a9 9 0 1 0 10.8 10.8a1 1 0 0 0 -1 -1h-6.8a2 2 0 0 1 -2 -2v-7a.9 .9 0 0 0 -1 -.8",key:"svg-0"}],["path",{d:"M15 3.5a9 9 0 0 1 5.5 5.5h-4.5a1 1 0 0 1 -1 -1v-4.5",key:"svg-1"}]],D=o("outline","chart-pie","ChartPie",k);/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",key:"svg-0"}],["path",{d:"M13.45 11.55l2.05 -2.05",key:"svg-1"}],["path",{d:"M6.4 20a9 9 0 1 1 11.2 0z",key:"svg-2"}]],E=o("outline","dashboard","Dashboard",M);/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z",key:"svg-0"}],["path",{d:"M19 6h1a2 2 0 0 1 2 2a5 5 0 0 1 -5 5l-5 0v2",key:"svg-1"}],["path",{d:"M10 15m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z",key:"svg-2"}]],R=o("outline","paint","Paint",g);/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0",key:"svg-0"}],["path",{d:"M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1",key:"svg-1"}],["path",{d:"M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0",key:"svg-2"}],["path",{d:"M17 10h2a2 2 0 0 1 2 2v1",key:"svg-3"}],["path",{d:"M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0",key:"svg-4"}],["path",{d:"M3 13v-1a2 2 0 0 1 2 -2h2",key:"svg-5"}]],w=o("outline","users-group","UsersGroup",j),I="_topBarButton_1sljz_1",N={topBarButton:I},f=i.forwardRef(({children:l,className:e,...c},n)=>t.jsx(p,{ref:n,className:`${N.topBarButton} ${e||""}`,...c,children:l}));f.displayName="TopBarButton";const T="_calloutBox_1vb7h_1",y="_closeButton_1vb7h_32",z="_calloutIcon_1vb7h_45",S="_calloutTitle_1vb7h_62",$="_calloutText_1vb7h_71",P="_calloutButton_1vb7h_80",s={calloutBox:T,closeButton:y,calloutIcon:z,calloutTitle:S,calloutText:$,calloutButton:P},G=({icon:l,heading:e,description:c,buttonIcon:n,buttonText:v,onClick:_,onClose:u,storageKey:a="sidebar-callout-dismissed",customButton:h,isDismissible:B=!0})=>{const[r,d]=i.useState(null);i.useEffect(()=>{if(!a||a.includes("undefined")||a.includes("[object Object]"))return;const x=localStorage.getItem(a)==="true";d(!x)},[a]);const m=()=>{d(!1),localStorage.setItem(a,"true"),u==null||u()};return r===null||!r?null:t.jsxs("div",{className:s.calloutBox,children:[B&&t.jsx(b,{className:s.closeButton,onClick:m,size:"sm",iconSize:16}),t.jsx("div",{className:s.calloutIcon,children:l}),t.jsx("h4",{className:s.calloutTitle,children:e}),t.jsx("p",{className:s.calloutText,children:c}),h||t.jsx(p,{fullWidth:!0,variant:"white",size:"sm",leftSection:n,onClick:_,className:s.calloutButton,children:v})]})};export{E as I,G as S,f as T,D as a,R as b,w as c};
