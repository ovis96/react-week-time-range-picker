import e,{useState as t,useEffect as n}from"react";function r(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===n&&r.firstChild?r.insertBefore(o,r.firstChild):r.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}r(".wtrp-fl {\n  float: left;\n}\n.wtrp-fr {\n  float: right;\n}\n.wtrp-flex {\n  display: flex;\n}\n.wtrp-flex-1 {\n  flex: 1;\n}\n.wtrp-break {\n  word-break: break-all;\n}\n");r(".week-time-range-picker {\n  position: relative;\n  display: inline-block;\n}\n.week-time-range-picker .wtrp-schedule {\n  background: #598fe6;\n  width: 0;\n  height: 0;\n  position: fixed;\n  opacity: 0.6;\n  top: 0;\n  left: 0;\n  pointer-events: none;\n  -webkit-transition: all 0.4s ease;\n  -moz-transition: all 0.4s ease;\n  -ms-transition: all 0.4s ease;\n  transition: all 0.4s ease;\n}\n.week-time-range-picker .wtrp-table {\n  background-color: transparent;\n  border-collapse: collapse;\n}\n.week-time-range-picker .wtrp-byted-popover-wrapper {\n  text-align: left;\n  display: inline-block;\n}\n.week-time-range-picker .wtrp-byted-popover-wrapper .transition-popover-enter-active,\n.week-time-range-picker .wtrp-byted-popover-wrapper .transition-popover-appear {\n  opacity: 0;\n  animation: popoverTransitionIn 0.5s;\n}\n.week-time-range-picker .wtrp-byted-popover-wrapper .transition-drop-leave-active {\n  animation: popoverTransitionOut 0.5s;\n}\n@keyframes popoverTransitionIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes popoverTransitionOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n.week-time-range-picker .wtrp-byted-popover-wrapper .ant-tooltip {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  color: rgba(0, 0, 0, 0.65);\n  font-size: 14px;\n  font-variant: tabular-nums;\n  line-height: 1.5;\n  list-style: none;\n  font-feature-settings: 'tnum';\n  position: absolute;\n  z-index: 1060;\n  display: block;\n  max-width: 250px;\n  visibility: visible;\n}\n.week-time-range-picker .wtrp-byted-popover-wrapper .ant-tooltip-placement-top .ant-tooltip-arrow {\n  left: 50%;\n  transform: translateX(-50%);\n  position: absolute;\n  display: block;\n  width: 13.07106781px;\n  height: 13.07106781px;\n  overflow: hidden;\n  background: transparent;\n  pointer-events: none;\n  bottom: -12.07106781px;\n}\n.week-time-range-picker .wtrp-byted-popover-wrapper .ant-tooltip-placement-top .ant-tooltip-arrow::before {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: block;\n  width: 5px;\n  height: 5px;\n  margin: auto;\n  background-color: rgba(0, 0, 0, 0.75);\n  content: '';\n  pointer-events: auto;\n  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.07);\n  transform: translateY(-6.53553391px) rotate(45deg);\n}\n.week-time-range-picker .wtrp-byted-popover-wrapper .ant-tooltip-placement-top .ant-tooltip-inner {\n  min-width: 30px;\n  min-height: 32px;\n  padding: 6px 8px;\n  color: #fff;\n  text-align: left;\n  text-decoration: none;\n  word-wrap: break-word;\n  background-color: rgba(0, 0, 0, 0.75);\n  border-radius: 4px;\n  -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n}\n");
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function o(e,t,n){if(n||2===arguments.length)for(var r,o=0,a=t.length;o<a;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))}r(".week-time-range-picker,\n.week-time-range-picker :after,\n.week-time-range-picker :before {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.week-time-range-picker .wtrp-table tr,\n.week-time-range-picker .wtrp-table td,\n.week-time-range-picker .wtrp-table th {\n  border: 1px solid #DDDEE1;\n  font-size: 12px;\n  text-align: center;\n  -webkit-transition: background 0.2s ease;\n  -moz-transition: background 0.2s ease;\n  -ms-transition: background 0.2s ease;\n  transition: background 0.2s ease;\n  user-select: none;\n  margin: 0;\n  padding: 0;\n  min-width: 35px;\n  width: 16px;\n  height: 20px;\n  box-sizing: border-box;\n}\n.week-time-range-picker .wtrp-table tr .week-td,\n.week-time-range-picker .wtrp-table td .week-td,\n.week-time-range-picker .wtrp-table th .week-td {\n  width: 60px;\n}\n");const a=[{hour:0,time:"00:00"},{hour:30,time:"00:30"},{hour:1,time:"01:00"},{hour:30,time:"01:30"},{hour:2,time:"02:00"},{hour:30,time:"02:30"},{hour:3,time:"03:00"},{hour:30,time:"03:30"},{hour:4,time:"04:00"},{hour:30,time:"04:30"},{hour:5,time:"05:00"},{hour:30,time:"05:30"},{hour:6,time:"06:00"},{hour:30,time:"06:30"},{hour:7,time:"07:00"},{hour:30,time:"07:30"},{hour:8,time:"08:00"},{hour:30,time:"08:30"},{hour:9,time:"09:00"},{hour:30,time:"09:30"},{hour:10,time:"10:00"},{hour:30,time:"10:30"},{hour:11,time:"11:00"},{hour:30,time:"11:30"},{hour:12,time:"12:00"},{hour:30,time:"12:30"},{hour:13,time:"13:00"},{hour:30,time:"13:30"},{hour:14,time:"14:00"},{hour:30,time:"14:30"},{hour:15,time:"15:00"},{hour:30,time:"15:30"},{hour:16,time:"16:00"},{hour:30,time:"16:30"},{hour:17,time:"17:00"},{hour:30,time:"17:30"},{hour:18,time:"18:00"},{hour:30,time:"18:30"},{hour:19,time:"19:00"},{hour:30,time:"19:30"},{hour:20,time:"20:00"},{hour:30,time:"20:30"},{hour:21,time:"21:00"},{hour:30,time:"21:30"},{hour:22,time:"22:00"},{hour:30,time:"22:30"},{hour:23,time:"23:00"},{hour:30,time:"23:30"}],i=[{hour:0,time:"00:00"},{hour:1,time:"01:00"},{hour:2,time:"02:00"},{hour:3,time:"03:00"},{hour:4,time:"04:00"},{hour:5,time:"05:00"},{hour:6,time:"06:00"},{hour:7,time:"07:00"},{hour:8,time:"08:00"},{hour:9,time:"09:00"},{hour:10,time:"10:00"},{hour:11,time:"11:00"},{hour:12,time:"12:00"},{hour:13,time:"13:00"},{hour:14,time:"14:00"},{hour:15,time:"15:00"},{hour:16,time:"16:00"},{hour:17,time:"17:00"},{hour:18,time:"18:00"},{hour:19,time:"19:00"},{hour:20,time:"20:00"},{hour:21,time:"21:00"},{hour:22,time:"22:00"},{hour:23,time:"23:00"}],l=["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],c=["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"],s=[{iden:"1",dayName:"Monday"},{iden:"2",dayName:"Tuesday"},{iden:"3",dayName:"Wednesday"},{iden:"4",dayName:"Thursday"},{iden:"5",dayName:"Friday"},{iden:"6",dayName:"Saturday"},{iden:"7",dayName:"Sunday"}],d=new Map;s.forEach((e=>{d.set(e.iden,e.dayName)}));const u=(e,t)=>e-t,p=(e,t)=>e.substring(0,2)-t.substring(0,2),m=({cacheChecked:e,hasStart:t,has:n,idenIndex:r,iden:o,timeRange:a})=>{let i={iden:o,times:[]},l=-1;t||n||e.push(i);for(let o of a)if(l=n?e[r].times.indexOf(o):-1,t&&n){if(l>=0&&e[r].times.splice(l,1),0===e[r].times.length){e.splice(r,1);break}}else if(!t){if(-1===l&&r>=0){e[r].times.push(o);continue}i.times.push(o)}};r(".wtrp-tbody-tr > td + td {\n  cursor: pointer;\n}\n.wtrp-freeze-td {\n  background: #f5f5f5;\n}\n.wtrp-active-td {\n  background-color: #0590FF;\n}\n");r('.wtrp-selected-td {\n  padding: 0 10px!important;\n}\n.wtrp-selected-td .tip-text {\n  color: #999;\n}\n.wtrp-selected-td .wtrp-clearfix:before {\n  content: " ";\n  display: table;\n}\n.wtrp-selected-td .wtrp-clearfix:after {\n  content: " ";\n  display: table;\n  clear: both;\n}\n.wtrp-selected-td .wtrp-selected-td__selected-time {\n  text-align: left;\n  line-height: 1;\n}\n.wtrp-selected-td .wtrp-selected-td__selected-time .wtrp-selected-text {\n  padding-right: 5px;\n}\n.wtrp-selected-td a {\n  cursor: pointer;\n  color: #598fe6;\n}\n');var h=function(e,t){return e.iden?e.iden-t.iden:e.substring(0,2)===t.substring(0,2)?e.substring(3)-t.substring(3):e.substring(0,2)-t.substring(0,2)},f=function(e,t){e.forEach((function(n){var r=t.slice(-1)[0],o=n.substring(0,2)-r.slice(-1)[0].substring(0,2)==1;o&&r.push(n),o||n===e[0]||t.push([n])}))},g=function(e,t){e.forEach((function(n){var r=t.slice(-1)[0],o=r.slice(-1)[0],a=100*n.substring(0,2)+("30"===n.substring(3)?50:0)-(100*o.substring(0,2)+("30"===o.substring(3)?50:0))==50;a&&r.push(n),a||n===e[0]||t.push([n])})),t.forEach((function(e){var t=+e.slice(-1)[0].substring(0,2);"30"===e.slice(-1)[0].substring(3)?t>8?e.push("".concat(t+1,":00")):e.push("0".concat(t+1,":00")):t>8?e.push("".concat(t,":30")):e.push("0".concat(t,":30"))}))},b=function(t){var n=t.hasHalfHour,r=t.checkedDatas,o=t.handleEmpty,a=t.summaryColor,i=t.fontColor,l=r.filter((function(e){return""!==e.iden}))||[];l.sort(h),l.forEach((function(e,t){l[t].dayName=d.get(e.iden),e.times.sort(h),l[t].timeRanges=function(e,t){var n=[[t[0]]];return e?g(t,n):f(t,n),n}(n,e.times)}));return e.createElement("tr",{className:"wtrp-time-range-selected",style:{backgroundColor:a}},e.createElement("td",{colSpan:49,className:"wtrp-selected-td"},e.createElement("div",{className:"wtrp-clearfix"},0===r.length?e.createElement("span",{className:"wtrp-fl tip-text",style:{color:i}},"Drag the mouse to select the time period"):e.createElement("span",{className:"wtrp-fl tip-text",style:{color:i}},"Time period selected"),e.createElement("a",{className:"wtrp-fr",onClick:function(){o()},style:{color:i}},"clear selection")),l.map((function(t,n){return e.createElement("div",{className:"wtrp-selected-td__selected-time",key:n},e.createElement("p",{className:"wtrp-flex wtrp-break"},e.createElement("span",{className:"tip-text",style:{color:i}},t.dayName,"："),e.createElement("span",{className:"wtrp-flex-1"},t.timeRanges.map((function(t,n){return console.log(t),e.createElement("span",{className:"wtrp-selected-text",key:n,style:{color:i}},"".concat(t[0],"~").concat(t[t.length-1]))})))))}))))},w=!1,y=!1,k={cacheStart:{iden:"",hour:"",group:""},cacheEnd:{iden:"",hour:"",group:""}},v=function(r){var d=t(r.checkedDatas),h=d[0],f=d[1];n((function(){return document.body.addEventListener("mouseup",D),function(){return document.body.removeEventListener("mouseup",D)}}));var g=r.hasHalfHour,v=r.handleDrag,x=r.handleSelect,E=r.handleMoveOut,C=r.fontColor,N=g?a:i,S=g?1:2,D=function(e){e&&!e.target.dataset.hour&&(y=!1)},H=function(e,t){if(e.target.dataset.hour){var n=e.target.dataset.iden,r=e.target.dataset.hour;return k[t].iden=n,k[t].hour=r,k[t].group=n+r,"cacheStart"===t&&Y(n,r),"cacheEnd"===t&&k[t].group===k.cacheStart.group&&function(e,t){var n=h,r=Y(e,t),a=r.has,i=r.idenIndex,l=r.index;a?w?(1===n[i].times.length?n.splice(i,1):n[i].times.splice(l,1),f(o([],n,!0))):(n[i].times.push(t),f(o([],n,!0))):(n.push({iden:e,times:[t]}),f(o([],n,!0)))}(n,r),"cacheEnd"===t&&k[t].group!==k.cacheStart.group&&z(),!0}return!1},X=function(e){k[e].iden="",k[e].hour="",k[e].group=""},Y=function(e,t){w=!1;for(var n,r,o=h,a=o.length,i=!1,l=0;l<a;l++)if(o[l].iden===e){r=l,n=o[l].times.indexOf(t),i=!0,w=-1!==n;break}return{has:i,idenIndex:r,index:n}},z=function(){var e=[k.cacheStart.iden,k.cacheEnd.iden],t=[k.cacheStart.hour,k.cacheEnd.hour],n=w,r=JSON.parse(JSON.stringify(h));e.sort(u),t.sort(p);for(var o=(e=>{let t=[];for(let n=e[0];n<=e[1];n++)t.push(String(n));return t})(e),a=((e,t)=>{let n,r;return e?(n=c.indexOf(t[0]),r=c.indexOf(t[1]),c.slice(n,r+1)):(n=l.indexOf(t[0]),r=l.indexOf(t[1]),l.slice(n,r+1))})(g,t),i=0,s=o;i<s.length;i++){var d=s[i],b=Y(d),y=b.has,v=b.idenIndex;m({cacheChecked:r,hasStart:n,has:y,idenIndex:v,iden:d,timeRange:a})}f(r)};return e.createElement("tbody",{className:"wtrp-tbody",onMouseDown:function(e){if(e.preventDefault(),e.stopPropagation(),y=!0,H(e,"cacheStart")){var t={type:"down",clientX:e.clientX,clientY:e.clientY,layerX:e.nativeEvent.layerX,layerY:e.nativeEvent.layerY,iden:k.cacheStart.iden,hour:k.cacheStart.hour};v(t)}Y(k.cacheStart.iden,k.cacheStart.hour)},onMouseUp:function(e){e.preventDefault(),e.stopPropagation(),y=!1,H(e,"cacheEnd"),X("cacheStart"),X("cacheEnd"),v({type:"up"}),x(h)},onMouseMove:function(e){if(e.target.dataset.hour){E(!1);var t={type:"move",clientX:e.clientX,clientY:e.clientY,layerX:e.nativeEvent.layerX,layerY:e.nativeEvent.layerY,iden:e.target.dataset.iden,hour:e.target.dataset.hour,value:e.target.dataset.value,isDrag:y};v(t)}}},s.map((function(t,n){return e.createElement("tr",{className:"wtrp-tbody-tr",key:n},e.createElement("td",{className:"week-td",style:{backgroundColor:r.outerCellColor,color:C}},t.dayName),N.map((function(n,o){var a=h.some((function(e){return e.iden===t.iden&&-1!==e.times.indexOf(n.time)}));return e.createElement("td",{colSpan:S,style:a?null:{backgroundColor:r.innerCellColor},className:a?"wtrp-active-td":"wtrp-freeze-td",key:o,"data-hour":n.time,"data-iden":t.iden,"data-value":"".concat(t.dayName," ").concat(n.time)})})))})),e.createElement(b,{hasHalfHour:g,checkedDatas:h,handleEmpty:function(){w=!1,X("cacheStart"),X("cacheEnd"),f([])},summaryColor:r.summaryColor,fontColor:r.fontColor}))},x=function(t){var n=t.hasHalfHour?a:i,r=t.hasHalfHour?1:2;return e.createElement("thead",null,e.createElement("tr",null,e.createElement("th",{rowSpan:8,className:"week-td",style:{backgroundColor:t.outerCellColor,color:t.fontColor}},"day/hour"),n.map((function(n,o){return e.createElement("td",{colSpan:r,style:{backgroundColor:t.outerCellColor,color:t.fontColor},key:o},n.time)}))))},E=0,C=0,N=0,S=0,D=0,H=0,X=function(r){var o=t(!1),a=o[0],i=o[1],l=t(0),c=l[0],s=l[1],d=t(0),u=d[0],p=d[1],m=t(0),h=m[0],f=m[1],g=t(0),b=g[0],w=g[1],y=t(r.selectedData||[]),k=y[0],X=y[1];n((function(){return document.body.addEventListener("mouseup",_),document.body.addEventListener("mousemove",R),function(){document.body.removeEventListener("mouseup",_),document.body.removeEventListener("mousemove",R)}}));var Y=r.selectTimeRange,z=r.outerCellColor,O=r.innerCellColor,M=r.fontColor,T=r.summaryColor,I=r.hasHalfHour,L=void 0!==I&&I,_=function(e){e&&!e.target.dataset.hour&&i(!1)},R=function(e){e.target.dataset.hour},W=function(e){var t=e.clientX,n=e.clientY,r=e.layerX,o=e.layerY,a=e.iden,l=e.tdIndex;f(0),w(0),i(!0),E=t,H=r-16*l-60,N=16*l+60,S=20*~~a+40,s((C=n)-(D=o-20*a-40)),p(E-H)},A=function(e){var t=e.isDrag,n=e.layerX,r=e.layerY,o=e.tempWidth,a=e.tempHeight;if(e.iden,e.hour,e.value,t){var i=n-N,l=r-S;a=l>0?l:20-l;var c=(o=i>0?i:16-i)%20==0&&i>0?16*Math.ceil(o/16)+1:16*Math.ceil(o/16),d=a%20==0&&l>0?20*Math.ceil(a/20)+20:20*Math.ceil(a/20);f(c),w(d),p(i<0?E-H-h+25:E-H),s(l<0?C-D-b+10:C-D)}};return e.createElement("div",{className:"week-time-range-picker",style:L?{maxWidth:"830px"}:{maxWidth:"450px"}},a?e.createElement("div",{className:"wtrp-schedule",style:{left:"".concat(u,"px"),top:"".concat(c,"px"),width:"".concat(h,"px"),height:"".concat(b,"px")}}):null,e.createElement("table",{className:"wtrp-table"},e.createElement(x,{hasHalfHour:L,outerCellColor:z,fontColor:M}),e.createElement(v,{hasHalfHour:L,checkedDatas:k,handleDrag:function(e){var t=e.type,n=e.clientX,r=e.clientY,o=e.layerX,a=e.layerY,l=e.iden,c=e.hour,s=e.value,d=e.isDrag;if("up"!==t){var u=L?2:1,p=c.split(":"),m=~~p[1]?~~p[0]*u+1:~~p[0]*u;"down"===t?W({clientX:n,clientY:r,layerX:o,layerY:a,iden:l,tdIndex:m}):A({isDrag:d,layerX:o,layerY:a,tempWidth:undefined,tempHeight:undefined,iden:l,hour:c,value:s})}else i(!1)},handleSelect:function(e){X(e),Y&&Y(e)},handleMoveOut:function(e){},outerCellColor:z,innerCellColor:O,summaryColor:T,fontColor:M})))};export{X as ReactWeekTimeRangePicker};
//# sourceMappingURL=index.js.map
