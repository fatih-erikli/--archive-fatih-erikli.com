(this["webpackJsonpicon-designer"]=this["webpackJsonpicon-designer"]||[]).push([[0],{200:function(e,t,n){},202:function(e,t,n){"use strict";n.r(t);var a,c,i=n(0),r=n.n(i),s=n(81),o=n.n(s),l=(n(91),n(53)),d=n(5),j=n(20),h=n(7),b=n(16),u=n(6),x=n(86),p=(n(200),n(3)),f=function(e,t,n){var a,c,i,r;return i=((a=n.x-t.x)*a-(c=n.y-t.y)*c)/(a*a+c*c),r=2*a*c/(a*a+c*c),{x:Math.round(i*(e.x-t.x)+r*(e.y-t.y)+t.x),y:Math.round(r*(e.x-t.x)-i*(e.y-t.y)+t.y)}},g=11,m=(a={},Object(u.a)(a,1,"Click on canvas and drag it to start drawing"),Object(u.a)(a,2,"Click on another point to connect with the latest"),Object(u.a)(a,3,"Moving a segment of a shape"),Object(u.a)(a,4,"Click on the a point on the line to insert a segment"),Object(u.a)(a,5,"Select points to move"),Object(u.a)(a,7,"Drag the shape to move"),Object(u.a)(a,6,"Moving a shape"),Object(u.a)(a,8,"Drag the segment to move it"),Object(u.a)(a,9,"Click on the segment to remove"),Object(u.a)(a,10,"Click on the shape to remove"),Object(u.a)(a,g,"Selection started"),Object(u.a)(a,12,"Move selected segments"),Object(u.a)(a,13,"Moving selected segments"),Object(u.a)(a,14,"Selection set"),a);function O(e,t,n,a,c,i,r,s,o,l,d,j,u,x,p){return function(m){if(1===e){var O=document.querySelector(".canvas").getBoundingClientRect(),y={x:m.clientX-O.left,y:m.clientY-O.top};d(y),t(g)}if(8===e){var v=m.target.dataset,w=v.shapeIndex,S=v.pointIndex;n(Number(w)),a(Number(w)),c(Number(S)),t(3)}if(14===e){var k=document.querySelector(".canvas").getBoundingClientRect(),C={x:m.clientX-k.left,y:m.clientY-k.top},I=!m.target.dataset.isSegmentLine&&!m.target.dataset.isSegment&&!m.target.dataset.isPolygon;if(d(C),I)t(g);else{var N=i.map((function(e){return e.points})).flat();j(N);var P=N.map((function(e,t){return M(e,u)?{index:t}:null})).filter(Boolean).map((function(e){return e.index}));x({x:u.x,y:u.y}),p(P),t(13)}}if(7===e){var E=document.querySelector(".canvas").getBoundingClientRect(),R={x:m.clientX-E.left,y:m.clientY-E.top};a(s),d(R),j(i[s].points),t(6)}if(4===e){var L=i[s],B=L.points[o],T=L.points[o-1],U=f(l,B,T),A={x:(U.x+l.x)/2,y:(U.y+l.y)/2},D=Object(b.a)(L.points);D.splice(o,0,A),r(i.map((function(e,t){return t===s?Object(h.a)(Object(h.a)({},e),{},{points:D}):e}))),t(3)}}}function y(e){return e.findIndex((function(e){var t=e.points,n=t[t.length-1],a=t[0];return t.length<3||!(a.x===n.x&&a.y===n.y)}))}function v(e,t,n,a,c,i,r,s,o,l,d,u){return function(x){if(3===c&&(t(1),i(-1),r(-1)),c===g){var p,f=C(l,e);d(f);var m,O=Object(j.a)(n);try{for(O.s();!(m=O.n()).done;){var v,w=m.value,k=Object(j.a)(w.points);try{e:for(k.s();!(v=k.n()).done;){if(p=M(v.value,f))break e}}catch(B){k.e(B)}finally{k.f()}if(p)break}}catch(B){O.e(B)}finally{O.f()}t(p?14:1)}13===c&&t(14),6===c&&t(7),10===c&&a(n.filter((function(e,t){return t!==s}))),9===c&&a(n.map((function(e,t){return Object(h.a)(Object(h.a)({},e),{},{points:e.points.filter((function(e,n){return!(t===s)||t===s&&o!==n}))})})));var I=l.x!==e.x&&l.y!==e.y,N=!x.target.dataset.isSegmentLine&&!x.target.dataset.isSegment&&!x.target.dataset.isPolygon;if(2===c||!I&&N){var P=document.querySelector(".canvas").getBoundingClientRect();if(x.clientX<P.left||x.clientX>P.right||x.clientY<P.top||x.clientY>P.bottom)return;var E,R=y(n),L=2;E=-1===R?[].concat(Object(b.a)(n),[{points:[e]}]):n.map((function(t,n){var a,c;n===R?(S(e.x,e.y,t.points[0].x,t.points[0].y)<2?(c=t.points[0],L=1):c=e,a={fill:u,points:[].concat(Object(b.a)(t.points),[c])}):a=t;return a})),t(L),a(E)}}}function w(e,t,n,a,c,i,r,s,o,l,d,j,b,u,x,p){return function(g){var m=g.clientX,O=g.clientY,y=g.target,v=document.querySelector(".canvas").getBoundingClientRect(),w={x:m-v.left,y:O-v.top};if(e(w),3===t&&i(c.map((function(e,t){return Object(h.a)(Object(h.a)({},e),{},{points:e.points.map((function(c,i){return n===t&&(a===i||a===e.points.length-1&&0===i)?w:c}))})}))),13===t){var k=0;u(Object(h.a)(Object(h.a)({},b),{},{x:x.x-(l.x-w.x),y:x.y-(l.y-w.y)})),i(c.map((function(e,t){return Object(h.a)(Object(h.a)({},e),{},{points:e.points.map((function(e,t){var n=k;return k++,p.indexOf(n)>-1?{x:d[n].x-(l.x-w.x),y:d[n].y-(l.y-w.y)}:e}))})})))}if(1===t||7===t||8===t||12===t||10===t||9===t){var C=y.dataset,M=C.isSegmentLine,I=C.isSegment,N=C.isPolygon,P=C.shapeIndex,E=C.segmentIndex,R=C.pointIndex;M?(r(4),s(Number(P)),o(Number(E))):N?(r(j.isShiftPressed?10:7),s(Number(P))):I?(r(j.isShiftPressed?9:b?12:8),s(Number(P)),o(Number(R))):r(1)}if(6===t&&i(c.map((function(e,t){return Object(h.a)(Object(h.a)({},e),{},{points:e.points.map((function(e,a){return t===n?{x:d[a].x-(l.x-w.x),y:d[a].y-(l.y-w.y)}:e}))})}))),4===t){var L=c[n],B=L.points[a],T=L.points[a-1],U=f(w,B,T),A={x:(U.x+w.x)/2,y:(U.y+w.y)/2};(S(A.x,A.y,w.x,w.y)>1||A.y>Math.max(B.y,T.y)||A.y<Math.min(B.y,T.y)||A.x>Math.max(B.x,T.x)||A.x<Math.min(B.x,T.x))&&(r(1),s(-1),o(-1))}}}function S(e,t,n,a){var c=e-n,i=t-a;return Math.sqrt(c*c+i*i)}function k(e){return function(t){e({isCtrlPressed:!1,isShiftPressed:!1})}}function C(e,t){var n=Math.min(e.x,t.x),a=Math.min(e.y,t.y);return{x:n,y:a,width:Math.max(e.x,t.x)-n,height:Math.max(e.y,t.y)-a}}function M(e,t){return e.x>t.x&&e.x<t.x+t.width&&e.y>t.y&&e.y<t.y+t.height}var I=function(){var e,t=Object(i.useState)(1),n=Object(d.a)(t,2),a=n[0],r=n[1],s=Object(i.useState)({x:-1,y:-1}),o=Object(d.a)(s,2),u=o[0],I=o[1],N=Object(i.useState)({x:-1,y:-1}),P=Object(d.a)(N,2),E=P[0],R=P[1],L=Object(i.useState)([]),B=Object(d.a)(L,2),T=B[0],U=B[1],A=Object(i.useState)(-1),D=Object(d.a)(A,2),F=D[0],q=D[1],J=Object(i.useState)(-1),X=Object(d.a)(J,2),Y=X[0],H=X[1],K=Object(i.useState)(-1),W=Object(d.a)(K,2),G=W[0],Q=W[1],z=function(e,t){var n=Object(i.useState)(t),a=Object(d.a)(n,2),r=a[0],s=a[1];return[r,function(t){c&&clearTimeout(c),c=setTimeout((function(){var n=(window.location.href.indexOf("#")>-1?window.location.href.split("#"):[null]).filter(Boolean),a=Object(l.a)(n),c=(a[0],a.slice(1)),i=!1,r=c.reduce((function(n,a){var c=a.split("="),r=Object(d.a)(c,2),s=r[0],o=r[1];return e===s&&(i=!0,o=JSON.stringify(t),s=e),[].concat(Object(b.a)(n),["".concat(s,"=").concat(o)])}),[]).join("#");i?window.history.pushState(null,null,"#".concat(r)):window.history.pushState(null,null,"".concat(r&&"#".concat(r),"#").concat(e,"=").concat(JSON.stringify(t)))}),50),s(t)},function(){var t=window.location.href.split("#".concat(e,"=")),n=Object(d.a)(t,2),a=(n[0],n[1]);if(a){var c=a.split("#"),i=Object(d.a)(c,1)[0];s(JSON.parse(decodeURIComponent(i)))}}]}("shapes",[]),V=Object(d.a)(z,3),Z=V[0],$=V[1],_=V[2],ee=Object(i.useState)({isCtrlPressed:!1,isShiftPressed:!1}),te=Object(d.a)(ee,2),ne=te[0],ae=te[1],ce=Object(i.useState)(null),ie=Object(d.a)(ce,2),re=ie[0],se=ie[1],oe=Object(i.useState)({x:-1,y:-1}),le=Object(d.a)(oe,2),de=le[0],je=le[1],he=Object(i.useState)([]),be=Object(d.a)(he,2),ue=be[0],xe=be[1],pe=y(Z),fe=Object(i.useState)({r:238,g:238,b:238,a:.9}),ge=Object(d.a)(fe,2),me=ge[0],Oe=ge[1],ye=Object(i.useState)(!1),ve=Object(d.a)(ye,2),we=ve[0],Se=ve[1];return Object(i.useEffect)((function(){_(),window.onpopstate=_,window.onhashchange=_}),[]),Object(p.jsxs)("div",{tabIndex:0,onKeyDown:(e=ae,function(t){var n={};t.shiftKey&&(n.isShiftPressed=!0),t.ctrlKey&&(n.isCtrlPressed=!0),e(n)}),onKeyUp:k(ae),className:"app-container",onMouseDown:O(a,r,q,H,Q,Z,$,F,G,u,R,U,re,je,xe),onMouseMove:w(I,a,F,G,Z,$,r,q,Q,E,T,ne,re,se,de,ue),onMouseUp:v(u,r,Z,$,a,q,Q,F,G,E,se,me),children:[Object(p.jsxs)("h1",{children:["Hello, my name is Fatih.",Object(p.jsxs)("div",{className:"color-picker",children:[Object(p.jsx)("span",{style:{borderRadius:5,backgroundColor:"rgba(".concat(me.r,", ").concat(me.g,", ").concat(me.b,", ").concat(me.a,")"),width:20,height:20,display:"inline-block",cursor:"pointer"},onClick:function(){Se(!we)}}),we&&Object(p.jsx)("div",{style:{position:"absolute"},children:Object(p.jsx)(x.a,{color:me,onChange:function(e){var t="rgba(".concat(e.rgb.r,", ").concat(e.rgb.g,", ").concat(e.rgb.b,", ").concat(e.rgb.a,")");Oe({r:e.rgb.r,g:e.rgb.g,b:e.rgb.b,a:e.rgb.a}),function(e,t,n,a){t(e.map((function(e,t){return t===n?Object(h.a)(Object(h.a)({},e),{},{fill:a}):e})))}(Z,$,Y,t)}})})]}),ne.isShiftPressed&&"shift",ne.isCtrlPressed&&"ctrl"]}),Object(p.jsxs)("div",{className:"editor",children:[Object(p.jsxs)("div",{className:"canvas-wrapper",children:[Object(p.jsxs)("h3",{children:["#Canvas"," ",Object(p.jsx)("span",{className:"drawing-info",children:m[a]})]}),Object(p.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"canvas",width:512,height:512,style:{},children:[new Array(128).fill(void 0).map((function(e,t){return Object(p.jsx)("line",{x1:0,x2:512,style:{stroke:"silver"},y1:8*t,y2:8*t},"y-".concat(t))})),new Array(128).fill(void 0).map((function(e,t){return Object(p.jsx)("line",{y1:0,y2:512,style:{stroke:"silver"},x1:8*t,x2:8*t},"x-".concat(t))})),Object(p.jsx)("line",{x1:0,x2:512,style:{stroke:"blue"},y1:256,y2:256}),Object(p.jsx)("line",{y1:0,y2:512,style:{stroke:"blue"},x1:256,x2:256}),Z.map((function(e,t){var n=[].concat(Object(b.a)(e.points),[u]),c=n.map((function(e){var t=e.x,n=e.y;return"".concat(t,",").concat(n)})).join(" ");return Object(p.jsxs)("g",{children:[Object(p.jsx)("polygon",{points:c,"data-is-polygon":!0,"data-shape-index":t,fill:e.fill||"transparent"}),function(){var c,i=2===a&&pe===t?n:e.points,r=Object(l.a)(i),s=r[0],o=r.slice(1),d=S(s.x,s.y,u.x,u.y)>2,b=[Object(p.jsx)("circle",{"data-shape-index":t,"data-point-index":0,className:"segment","data-is-segment":!0,"data-is-closing-point":!0,cx:s.x,cy:s.y,fill:d?"orange":"blue",r:1},"closing-point-".concat(t))],x=0,m=Object(j.a)(o);try{var O=function(){var n=c.value;x++,b.push(Object(p.jsxs)("g",{children:[4===a&&F===t&&G===x&&Object(p.jsx)("circle",Object(h.a)({className:"segment","data-is-segment":!0,cx:100,cy:200,fill:"black",r:1},function(){var e=f(u,s,n);return{cx:(e.x+u.x)/2,cy:(e.y+u.y)/2}}())),Object(p.jsx)("circle",{"data-shape-index":t,"data-point-index":x,className:"segment","data-is-segment":!0,cx:n.x,cy:n.y,fill:function(){var c;if(14===a)c=M(n,re);else{if(13===a){var i,r=0,s=0,o=Object(j.a)(Z);try{for(o.s();!(i=o.n()).done&&(e=i.value,t!==r);)r++,s+=e.points.length}catch(d){o.e(d)}finally{o.f()}return ue.indexOf(s+x)>-1}c=!1}var l=a===g&&M(n,C(E,u));return c||l}()?"blue":"gray",r:1}),Object(p.jsx)("line",{stroke:"black",x1:s.x,y1:s.y,x2:n.x,y2:n.y,"data-is-segment-line":!0,"data-shape-index":t,"data-segment-index":x})]},"segments-".concat(t,"-").concat(x))),s=n};for(m.s();!(c=m.n()).done;)O()}catch(y){m.e(y)}finally{m.f()}return b}()]},t)})),a===g&&function(){var e=C(E,u),t=e.x,n=e.y,a=e.width,c=e.height;return Object(p.jsx)("rect",{x:t,y:n,width:a,height:c,className:"selection-rectangle"})}()]})]}),Object(p.jsxs)("div",{className:"tools",children:[Object(p.jsx)("div",{className:"preview",children:[256,128].map((function(e,t){return Object(p.jsxs)("div",{className:"preview-square",style:{width:e},children:[Object(p.jsxs)("h3",{children:[e,"x",e]}),Object(p.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"canvas",id:"preview-".concat(t),width:e,height:e,children:Z.map((function(t,n){var a=512/e,c=t.points.map((function(e){var t=e.x,n=e.y;return"".concat(t/a,",").concat(n/a)})).join(" ");return Object(p.jsx)("g",{children:Object(p.jsx)("polygon",{points:c,fill:t.fill})},n)}))}),Object(p.jsx)("a",{href:"#",className:"download-link",onClick:function(n){n.preventDefault();var a=document.createElement("img");a.width=e,a.height=e,document.body.appendChild(a),a.onload=function(){var t=document.createElement("canvas");t.width=a.clientWidth,t.height=a.clientHeight,t.getContext("2d").drawImage(a,0,0);var n=t.toDataURL("image/png");a.parentElement.removeChild(a),URL.revokeObjectURL(a.src);var c=document.createElement("a");c.href=n,c.download="icon-".concat(e,".png"),c.click()},a.src=URL.createObjectURL(new Blob([document.getElementById("preview-".concat(t)).outerHTML],{type:"image/svg+xml"}))},children:"download"})]},"preview-".concat(t))}))}),Object(p.jsx)("div",{id:"bio",children:"I am a software developer."})]}),Object(p.jsxs)("div",{id:"page",children:[Object(p.jsx)("h1",{children:"Experiences"}),Object(p.jsxs)("div",{class:"work-experience",children:[Object(p.jsx)("h1",{children:"EPAM Systems"}),Object(p.jsx)("h2",{children:"Resource Manager & Senior Software Engineer"}),Object(p.jsx)("p",{children:"I was responsible for the UI development of an embedded smart-tv application. I mainly worked on the networking interface of the application. It is a NodeJS application that using Wayland compositor to interact with the backend services."})]}),Object(p.jsxs)("div",{class:"work-experience",children:[Object(p.jsx)("h1",{children:"EPAM Systems"}),Object(p.jsx)("h2",{children:"Lead Software Engineer"}),Object(p.jsx)("p",{children:"I mainly worked on development of an interactive map for a seat selection in a ticket-selling web site. I worked with React and GraphQL."})]}),Object(p.jsxs)("div",{class:"work-experience",children:[Object(p.jsx)("h1",{children:"Adphorus"}),Object(p.jsx)("h2",{children:"Senior Software Engineer"}),Object(p.jsx)("p",{children:"Adphorus is an intelligent ad and creative management tool. I worked on the development of the UI with React and Redux. Basically the tool allows you to create an ad and publish it on several platforms such as Facebook and Twitter. I was working closely with the Product team to provide users an abstract interface which works for all the platforms."})]}),Object(p.jsxs)("div",{class:"work-experience",children:[Object(p.jsx)("h1",{children:"Hipolabs"}),Object(p.jsx)("h2",{children:"Senior Software Engineer"}),Object(p.jsx)("p",{children:"I worked on the application chroma; which is an attribution editor for collec- tion items and natural species. I worked as a full-stack developer. Backend system built with Python and Tornado web framework and running on AWS. The frontend and the attribution editor is built with AngularJS."})]}),Object(p.jsxs)("div",{class:"work-experience",children:[Object(p.jsx)("h1",{children:"Metglobal"}),Object(p.jsx)("h2",{children:"Senior Software Engineer & Community Manager"}),Object(p.jsx)("p",{children:"Metglobal is a leading travel-tech company in Turkey. I was responsible for the development travel websites and hotel search engines. I also lead the development relationships community and initiated a software development and research lab in the company."})]}),Object(p.jsxs)("div",{class:"work-experience",children:[Object(p.jsx)("h1",{children:"Freelancer"}),Object(p.jsx)("p",{children:"Worked on several projects in both backend and frontend sites. Most of them are not active anymore. I mainly used Django web framework and pure javascript without any framework."})]}),Object(p.jsxs)("div",{class:"languages",children:[Object(p.jsx)("h1",{children:"Languages"}),Object(p.jsxs)("p",{children:["Turkish \u2014 My Native Language ",Object(p.jsx)("br",{}),"English \u2014 Professional working efficiency ",Object(p.jsx)("br",{}),"Polish \u2014 I lived in Poland for 4 years."]})]}),Object(p.jsxs)("div",{class:"open-source-projects",children:[Object(p.jsx)("h1",{children:"Open-source projects"}),Object(p.jsxs)("p",{children:["github.com/inveniosoftware/dictdiffer ",Object(p.jsx)("br",{}),"github.com/arguman/arguman/arguman.org ",Object(p.jsx)("br",{}),"github.com/react-designer/react-designer ",Object(p.jsx)("br",{}),"github.com/fatih-erikli/disease-simulation"]})]})]})]}),Object(p.jsx)("footer",{children:"Fatih Erikli \u2014 2021 \u2014 Creative Commons"})]})},N=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,204)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),i(e),r(e)}))};o.a.render(Object(p.jsx)(r.a.StrictMode,{children:Object(p.jsx)(I,{})}),document.getElementById("root")),N()},91:function(e,t,n){}},[[202,1,2]]]);
//# sourceMappingURL=main.7a3fbb10.chunk.js.map