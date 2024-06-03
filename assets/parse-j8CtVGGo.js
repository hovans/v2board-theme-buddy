const I={};function v(e){let s=I[e];if(s)return s;s=I[e]=[];for(let n=0;n<128;n++){const i=String.fromCharCode(n);s.push(i)}for(let n=0;n<e.length;n++){const i=e.charCodeAt(n);s[i]="%"+("0"+i.toString(16).toUpperCase()).slice(-2)}return s}function b(e,s){typeof s!="string"&&(s=b.defaultChars);const n=v(s);return e.replace(/(%[a-f0-9]{2})+/gi,function(i){let r="";for(let t=0,h=i.length;t<h;t+=3){const f=parseInt(i.slice(t+1,t+3),16);if(f<128){r+=n[f];continue}if((f&224)===192&&t+3<h){const a=parseInt(i.slice(t+4,t+6),16);if((a&192)===128){const o=f<<6&1984|a&63;o<128?r+="��":r+=String.fromCharCode(o),t+=3;continue}}if((f&240)===224&&t+6<h){const a=parseInt(i.slice(t+4,t+6),16),o=parseInt(i.slice(t+7,t+9),16);if((a&192)===128&&(o&192)===128){const u=f<<12&61440|a<<6&4032|o&63;u<2048||u>=55296&&u<=57343?r+="���":r+=String.fromCharCode(u),t+=6;continue}}if((f&248)===240&&t+9<h){const a=parseInt(i.slice(t+4,t+6),16),o=parseInt(i.slice(t+7,t+9),16),u=parseInt(i.slice(t+10,t+12),16);if((a&192)===128&&(o&192)===128&&(u&192)===128){let l=f<<18&1835008|a<<12&258048|o<<6&4032|u&63;l<65536||l>1114111?r+="����":(l-=65536,r+=String.fromCharCode(55296+(l>>10),56320+(l&1023))),t+=9;continue}}r+="�"}return r})}b.defaultChars=";/?:@&=+$,#";b.componentChars="";const S={};function z(e){let s=S[e];if(s)return s;s=S[e]=[];for(let n=0;n<128;n++){const i=String.fromCharCode(n);/^[0-9a-z]$/i.test(i)?s.push(i):s.push("%"+("0"+n.toString(16).toUpperCase()).slice(-2))}for(let n=0;n<e.length;n++)s[e.charCodeAt(n)]=e[n];return s}function P(e,s,n){typeof s!="string"&&(n=s,s=P.defaultChars),typeof n>"u"&&(n=!0);const i=z(s);let r="";for(let t=0,h=e.length;t<h;t++){const f=e.charCodeAt(t);if(n&&f===37&&t+2<h&&/^[0-9a-f]{2}$/i.test(e.slice(t+1,t+3))){r+=e.slice(t,t+3),t+=2;continue}if(f<128){r+=i[f];continue}if(f>=55296&&f<=57343){if(f>=55296&&f<=56319&&t+1<h){const a=e.charCodeAt(t+1);if(a>=56320&&a<=57343){r+=encodeURIComponent(e[t]+e[t+1]),t++;continue}}r+="%EF%BF%BD";continue}r+=encodeURIComponent(e[t])}return r}P.defaultChars=";/?:@&=+$,-_.!~*'()#";P.componentChars="-_.!~*'()";function d(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const E=/^([a-z0-9.+-]+:)/i,H=/:[0-9]*$/,_=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,B=["<",">",'"',"`"," ","\r",`
`,"	"],L=["{","}","|","\\","^","`"].concat(B),R=["'"].concat(L),$=["%","/","?",";","#"].concat(R),A=["/","?","#"],Z=255,O=/^[+a-z0-9A-Z_-]{0,63}$/,M=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,j={javascript:!0,"javascript:":!0},w={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function G(e,s){if(e&&e instanceof d)return e;const n=new d;return n.parse(e,s),n}d.prototype.parse=function(e,s){let n,i,r,t=e;if(t=t.trim(),!s&&e.split("#").length===1){const o=_.exec(t);if(o)return this.pathname=o[1],o[2]&&(this.search=o[2]),this}let h=E.exec(t);if(h&&(h=h[0],n=h.toLowerCase(),this.protocol=h,t=t.substr(h.length)),(s||h||t.match(/^\/\/[^@\/]+@[^@\/]+/))&&(r=t.substr(0,2)==="//",r&&!(h&&j[h])&&(t=t.substr(2),this.slashes=!0)),!j[h]&&(r||h&&!w[h])){let o=-1;for(let c=0;c<A.length;c++)i=t.indexOf(A[c]),i!==-1&&(o===-1||i<o)&&(o=i);let u,l;o===-1?l=t.lastIndexOf("@"):l=t.lastIndexOf("@",o),l!==-1&&(u=t.slice(0,l),t=t.slice(l+1),this.auth=u),o=-1;for(let c=0;c<$.length;c++)i=t.indexOf($[c]),i!==-1&&(o===-1||i<o)&&(o=i);o===-1&&(o=t.length),t[o-1]===":"&&o--;const y=t.slice(0,o);t=t.slice(o),this.parseHost(y),this.hostname=this.hostname||"";const D=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!D){const c=this.hostname.split(/\./);for(let C=0,U=c.length;C<U;C++){const x=c[C];if(x&&!x.match(O)){let F="";for(let p=0,m=x.length;p<m;p++)x.charCodeAt(p)>127?F+="x":F+=x[p];if(!F.match(O)){const p=c.slice(0,C),m=c.slice(C+1),g=x.match(M);g&&(p.push(g[1]),m.unshift(g[2])),m.length&&(t=m.join(".")+t),this.hostname=p.join(".");break}}}}this.hostname.length>Z&&(this.hostname=""),D&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const f=t.indexOf("#");f!==-1&&(this.hash=t.substr(f),t=t.slice(0,f));const a=t.indexOf("?");return a!==-1&&(this.search=t.substr(a),t=t.slice(0,a)),t&&(this.pathname=t),w[n]&&this.hostname&&!this.pathname&&(this.pathname=""),this};d.prototype.parseHost=function(e){let s=H.exec(e);s&&(s=s[0],s!==":"&&(this.port=s.substr(1)),e=e.substr(0,e.length-s.length)),e&&(this.hostname=e)};export{b as d,P as e,G as u};