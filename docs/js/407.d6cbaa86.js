"use strict";(self["webpackChunkgames"]=self["webpackChunkgames"]||[]).push([[407],{6407:function(e,l,a){a.r(l),a.d(l,{default:function(){return b}});a(7658);var u=a(3396),i=a(4870),t=a(9242),v=a(7139);const s=e=>((0,u.dD)("data-v-4eb7de34"),e=e(),(0,u.Cn)(),e),n=s((()=>(0,u._)("h1",null,"빙고",-1))),o={class:"gameBox bingo"},r={key:0,class:"reStart"},d=s((()=>(0,u._)("h2",null,"🎉게임 클리어",-1))),f={class:"drawArea"},c={key:0},h={key:1},g={class:"num"},m={class:"bingoArea"},_={class:"top"},p={class:"cardList"};var k=(0,u.aZ)({__name:"Bingo",setup(e){let l=6,a=Math.pow(l,2),s="col",k="row",w="L",x="R",b=(0,i.iH)({width:`calc((100% - (${5*(l-1)}px))  / ${l})`,height:`calc((100% - (${5*(l-1)}px))  / ${l})`}),O=(0,i.iH)([]),H=(0,i.iH)(!1),C=(0,i.iH)(!1),B=(0,i.iH)(0),U=(0,i.iH)([]),D=(0,i.iH)([]);const S=(0,i.iH)(0),y=(0,i.iH)([]),M=(0,i.iH)([]),$=(0,i.iH)([]);(0,u.m0)((()=>{S.value>=4&&setTimeout((()=>{C.value=!0}),300)}));const T=()=>{let e=O.value,l=[...O.value].sort((()=>Math.random()-.5));for(let u=0;u<a;u++)e[u].value===l[u].value&&(0===u?(l.push(l[u]),l.splice(u,1),u--):l.splice(u-1,2,l[u],l[u-1]));O.value=l},W=()=>{if(H.value){let e=confirm("게임중입니다! 게임을 다시 시작하시겠습니까?");e&&(H.value=!1,K(),W())}else{T();for(let e=0;e<4;e++)setTimeout((()=>{T()}),500*(e+1));H.value=!0}},A=(e,a=0)=>{if(e===s)for(let u=0;u<l;u++)O.value[a+u*l].isBingo=!0;else if(e===k)for(let u=0;u<l;u++)O.value[a+u].isBingo=!0;else if(e===w)for(let u=0;u<l;u++)O.value[u*(l+1)].isBingo=!0;else for(let u=0;u<l;u++)O.value[(u+1)*(l-1)].isBingo=!0},I=e=>{let a=!0;for(let u=0;u<l;u++)if(-1===D.value.indexOf(e+u*l)){a=!a;break}a&&-1===y.value.indexOf(e)&&(S.value++,y.value.push(e),A(s,e))},z=e=>{let a=!0;for(let u=0;u<l;u++)if(-1===D.value.indexOf(e+u)){a=!a;break}a&&-1===M.value.indexOf(e)&&(S.value++,M.value.push(e),A(k,e))},L=e=>{let a=!0;if(e===w){for(let u=0;u<l;u++)if(-1===D.value.indexOf(u*(l+1))){a=!a;break}}else for(let u=0;u<l;u++)if(-1===D.value.indexOf((u+1)*(l-1))){a=!a;break}a&&-1===$.value.indexOf(e)&&(S.value++,$.value.push(e),A(e))},Y=()=>{if(D.value.sort(((e,l)=>e-l)),D.value.length>=l){for(let e=0;e<D.value.length;e++)e<l&&-1!==D.value.indexOf(e)&&I(e),-1!==D.value.indexOf(e*l)&&z(e*l);-1!==D.value.indexOf(l+1)&&-1!==D.value.indexOf(0)&&L(w),-1!==D.value.indexOf(Math.floor(2*l-2))&&-1!==D.value.indexOf(l-1)&&L(x)}},Z=()=>{U.value.push(B.value);let e=0;O.value.map(((l,a)=>{l.value===B.value&&(l.selected=!0,e=a)})),D.value.push(e)},j=e=>{let l=30*a,u=setInterval((()=>{e++,B.value=e%a===0?a:e%a}),l/(2*a));setTimeout((()=>{clearInterval(u),Z(),Y()}),l)},q=()=>{let e=0;e=Math.floor(Math.random()*a+1),-1!==U.value.indexOf(e)?q():j(e)},K=()=>{O.value=[],B.value=0,U.value=[],D.value=[],S.value=0,y.value=[],M.value=[],$.value=[];let e=new Array(a).fill({}).map(((e,l)=>{const a={value:0,selected:!1,isBingo:!1};return a.value=l+1,a}));O.value=e};K();const R=()=>{H.value=!1,C.value=!1,K(),W()};return(e,l)=>{const a=(0,u.up)("font-awesome-icon");return(0,u.wg)(),(0,u.iD)(u.HY,null,[n,(0,u._)("div",o,[(0,i.SU)(C)?((0,u.wg)(),(0,u.iD)("div",r,[d,(0,u._)("div",{class:"btn",onClick:l[0]||(l[0]=e=>R())},[(0,u.Wm)(a,{icon:"fa-solid fa-rotate-right"}),(0,u.Uk)(" 다시 시작 ")])])):(0,u.kq)("",!0),(0,u._)("div",f,[(0,u.Wm)(t.uT,{name:"fade",mode:"out-in"},{default:(0,u.w5)((()=>[(0,i.SU)(H)?((0,u.wg)(),(0,u.iD)("div",h,[(0,u._)("h2",g,(0,v.zw)((0,i.SU)(B)),1),(0,u._)("div",{class:"btn",onClick:q},"번호 뽑기")])):((0,u.wg)(),(0,u.iD)("h2",c,"빙고 번호를 섞어 주세요!"))])),_:1})]),(0,u._)("div",m,[(0,u._)("div",_,[(0,u._)("div",{class:(0,v.C_)(["btn",{disable:(0,i.SU)(H)}]),onClick:W},"빙고 번호 섞기",2)]),(0,u._)("div",p,[(0,u.Wm)(t.W3,null,{default:(0,u.w5)((()=>[((0,u.wg)(!0),(0,u.iD)(u.HY,null,(0,u.Ko)((0,i.SU)(O),(e=>((0,u.wg)(),(0,u.iD)("div",{key:`number-${e.value}`,class:(0,v.C_)(["card",{bingo:e.isBingo}]),style:(0,v.j5)((0,i.SU)(b))},[(0,u.Uk)((0,v.zw)(e.value)+" ",1),(0,u._)("div",{class:(0,v.C_)(["selected",{check:e.selected}])},null,2)],6)))),128))])),_:1})])])])],64)}}}),w=a(89);const x=(0,w.Z)(k,[["__scopeId","data-v-4eb7de34"]]);var b=x}}]);
//# sourceMappingURL=407.d6cbaa86.js.map