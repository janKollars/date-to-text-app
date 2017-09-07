"use strict";function getTag(t){return t<=20?ordinalNr[t-1]:30==t?"thirtieth":zehnerArr[t[0]-2]+"-"+ordinalNr[t[1]-1]}function getMonat(t){return monthNames[t-1]}function getJahr(t){var e=t[0],n=t[1],r=t[2],u=t[3];return t<2e3?0==r&&0==u?countArr[e+n]+" hundred":0==r?countArr[e+n]+" hundred and "+countArr[u]:r+u<20?countArr[e+n]+" "+countArr[r+u]:0==u?countArr[e+n]+" "+zehnerArr[r-2]:countArr[e+n]+" "+zehnerArr[r-2]+"-"+countArr[u]:2e3==t?"two thousand":0==r?"two thousand and "+countArr[u]:r+u<20?"two thousand and "+countArr[r+u]:0==u?"two thousand and "+zehnerArr[r-2]:"two thousand and "+zehnerArr[r-2]+"-"+countArr[u]}var datum=document.getElementById("datum"),result=document.getElementById("result"),ordinalNr=["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth","eleventh","twelfth","thirteenth","fourteenth","fifteenth","sixteenth","seventeenth","eighteenth","nineteenth","twentieth"],zehnerArr=["twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"],monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"],countArr=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],d=new Date,aktt=d.getDate(),aktm=d.getMonth()+1,aktj=d.getFullYear();aktt<10&&(aktt="0"+aktt),aktm<10&&(aktm="0"+aktm),datum.value=aktt+"."+aktm+"."+aktj,document.getElementById("form").addEventListener("submit",function(t){t.preventDefault();var e=datum.value.split(".");result.innerHTML="the "+getTag(e[0])+" of "+getMonat(e[1])+" "+getJahr(e[2]),result.select(),document.execCommand("copy")});