"use strict";(self["webpackChunkgames"]=self["webpackChunkgames"]||[]).push([[664],{664:function(e,l,a){a.r(l),a.d(l,{default:function(){return g}});a(7658);var t=a(3396),s=a(4870),u=a(7139),i=a(9242);const n=e=>((0,t.dD)("data-v-984d2dca"),e=e(),(0,t.Cn)(),e),c=n((()=>(0,t._)("h1",null,"빙고 이차배열",-1))),r={class:"gameBox bingo"},o={key:0,class:"reStart"},d=n((()=>(0,t._)("h2",null,"🎉게임 클리어",-1))),v={class:"drawArea"},f={class:"num"},h={class:"bingoArea"},p={class:"cardList"};var k=(0,t.aZ)({__name:"Bingo2",setup(e){const l=4,a=l**2,n="L",k="R",w=(0,s.iH)({width:`calc((100% - (${5*(l-1)}px))  / ${l})`,height:`calc((100% - (${5*(l-1)}px))  / ${l})`});let _=(0,s.iH)(!1),g=(0,s.iH)([]),m=(0,s.iH)(0),x=[],b=(0,s.iH)(0);(0,t.m0)((()=>{b.value>=4&&setTimeout((()=>{_.value=!0}),300)}));const H=e=>{g.value=[];for(let a=0;a<5;a++)g.value.push(e.splice(0,l))},O=e=>{const l=e;let t=[...l].sort((()=>Math.random()-.5));for(let s=0;s<a;s++)l[s].value===t[s].value&&(0===s?(t.push(t[s]),t.splice(s,1),s--):t.splice(s-1,2,t[s],t[s-1]));H(t)},y=()=>{const e=new Array(a).fill({}).map(((e,l)=>{const a={value:0,selected:!1};return a.value=l+1,a}));H([...e]),setTimeout((()=>{O(e)}),200)};y();let C=[],D=[],$=[],U=[],A=[];const S=()=>{for(let e=0;e<l;e++){let e=new Array(l).fill(!1);U.push([...e]),A.push([...e])}};S();const I=()=>{for(let t=0;t<l;t++)-1===U[t].indexOf(!1)&&-1===C.indexOf(t)&&(b.value++,C.push(t));for(let t=0;t<l;t++)-1===A[t].indexOf(!1)&&-1===D.indexOf(t)&&(b.value++,D.push(t));let e=!0;for(let t=0;t<l;t++){if(e=U[t][l-1-t],!e)break;t===l-1&&e&&-1===$.indexOf(k)&&($.push(k),b.value++)}let a=!0;for(let t=0;t<l;t++){if(a=U[t][t],!a)break;t===l-1&&a&&-1===$.indexOf(n)&&($.push(n),b.value++)}},M=(e,l)=>{g.value[e][l].selected=!0,U[e][l]=!0,A[l][e]=!0},Y=()=>{e:for(let e=0;e<l;e++)for(let a=0;a<l;a++)if(g.value[e][a].value===m.value){M(e,a),I();break e}},j=()=>{let e=0;if(e=Math.floor(Math.random()*a+1),-1===x.indexOf(e))return m.value=e,x.push(e),void Y();j()},z=()=>{g.value=[],m.value=0,x=[],b.value=0,C=[],D=[],$=[],U=[],A=[]},B=()=>{_.value=!1,z(),S(),y()};return(e,l)=>{const a=(0,t.up)("font-awesome-icon");return(0,t.wg)(),(0,t.iD)(t.HY,null,[c,(0,t._)("div",r,[(0,s.SU)(_)?((0,t.wg)(),(0,t.iD)("div",o,[d,(0,t._)("div",{class:"btn",onClick:l[0]||(l[0]=e=>B())},[(0,t.Wm)(a,{icon:"fa-solid fa-rotate-right"}),(0,t.Uk)(" 다시 시작 ")])])):(0,t.kq)("",!0),(0,t._)("div",v,[(0,t._)("h2",f,(0,u.zw)((0,s.SU)(m)),1),(0,t._)("div",{class:"btn",onClick:j},"번호 뽑기")]),(0,t._)("div",h,[(0,t._)("div",p,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,s.SU)(g),((e,l)=>((0,t.wg)(),(0,t.j4)(i.W3,{key:`cardIdx-${l}`},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(e,((e,l)=>((0,t.wg)(),(0,t.iD)("div",{key:`cardIdx-${l}`,class:"card",style:(0,u.j5)(w.value)},[(0,t.Uk)((0,u.zw)(e.value)+" ",1),(0,t._)("div",{class:(0,u.C_)(["selected",{check:e.selected}])},null,2)],4)))),128))])),_:2},1024)))),128))])])])],64)}}}),w=a(89);const _=(0,w.Z)(k,[["__scopeId","data-v-984d2dca"]]);var g=_}}]);
//# sourceMappingURL=664.0e3328a5.js.map