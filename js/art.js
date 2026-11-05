const art = {
  present: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#30213e" d="M3 8h5V3h8v5h5v5h-2v9H5v-9H3z"/><path fill="#ae83cc" d="M6 13h12v8H6z"/><path fill="#c7a5e4" d="M4 9h16v4H4z"/><path fill="#f4dfad" d="M11 9h2v12h-2zM8 4h3v2h2V4h3v4H8z"/><path fill="#e6c8f2" d="M5 10h5v1H5z"/><path fill="#78578f" d="M6 19h5v2H6zm7 0h5v2h-5z"/></svg>',
  fox: '<svg viewBox="0 0 40 30" aria-hidden="true"><path fill="#28152e" d="M1 16h4v-3h7V2h6v4h11V2h6v12h4v10h-4v4H9v-3H4v-3H1z"/><path fill="#de754b" d="M3 16h7v3h6V5h3v4h10V5h4v11h4v7h-4v3H10v-3H6v-3H3z"/><path fill="#f2a165" d="M16 8h4v3h10v-2h3v9H16z"/><path fill="#fff0d1" d="M3 16h6v4H6v-1H3zm13 3h7v3h4v-3h8v4h-4v2H20v-2h-4z"/><path fill="#382337" d="M19 16h2v3h-2zm12 0h2v3h-2zm-7 5h4v2h-4zm-10 4h4v2h-4zm15 0h4v2h-4z"/><path fill="#f69191" d="M16 20h3v1h-3zm17 0h3v1h-3z"/></svg>',
  berry: '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="#37213f" d="M2 3h4V1h4v2h4v2h2v6h-2v2h-3v2H5v-2H2v-2H0V5h2z"/><path fill="#ec6687" d="M2 6h12v5h-2v2H5v-2H2z"/><path fill="#ffa6b7" d="M3 7h2v1H3zm4 3h2v1H7zm4-2h2v1h-2z"/><path fill="#a8d480" d="M3 4h4V2h2v2h4v2H9v1H7V6H3z"/></svg>',
  cake: '<svg viewBox="0 0 72 52" aria-hidden="true"><path fill="#2c193d" d="M4 39h64v8H4zM10 16h52v26H10z"/><path fill="#aaa0dc" d="M5 40h62v4H5z"/><path fill="#e984af" d="M12 18h48v22H12z"/><path fill="#c75d92" d="M12 34h48v4H12z"/><path fill="#fbb3ca" d="M12 18h48v9H12zM16 26h6v4h-6zm16 0h7v5h-7zm16 0h8v4h-8z"/><path fill="#fff0e2" d="M15 15h8v5h-8zm17 0h8v5h-8zm17 0h8v5h-8z"/><path fill="#e95b7b" d="M16 11h6v5h-6zm17 0h6v5h-6zm17 0h6v5h-6z"/><path fill="#97c774" d="M17 10h4v2h-4zm17 0h4v2h-4zm17 0h4v2h-4z"/></svg>'
};
const birthdayTable = `
<svg viewBox="0 0 320 220" aria-hidden="true">
  <path fill="#342644" d="M0 0h320v170H0z"/>
  <path fill="#412e50" d="M0 0h22v168H0zm52 0h22v168H52zm52 0h22v168h-22zm52 0h22v168h-22zm52 0h22v168h-22zm52 0h22v168h-22zm52 0h8v168h-8z"/>
  <path fill="none" stroke="#20192f" stroke-width="2" d="M0 12l28 10 36 6 38 4 58 2 58-2 38-4 36-6 28-10"/>
  <path fill="#ffd591" d="M13 16h4v6h-4zm31 8h4v6h-4zm35 5h4v6h-4zm40 3h4v6h-4zm39 2h4v6h-4zm40-2h4v6h-4zm40-3h4v6h-4zm36-5h4v6h-4zm30-8h4v6h-4z"/>
  <path fill="#a780aa" d="M41 68h2v11h-2zm-5 5h12v2H36zm245 27h2v11h-2zm-5 5h12v2h-12z"/>
  <path fill="#825568" d="M0 169h320v51H0z"/>
  <path fill="#9f697e" d="M0 169h320v4H0zm0 30h320v3H0z"/>
  <path fill="#70495e" d="M0 209h320v11H0z"/>
  <path fill="#634455" d="M65 197h190v5H65zm22 5h146v4H87z"/>
  <path fill="#536d68" d="M97 177h126v6H97zm49 5h28v11h-28zm-25 11h78v6h-78z"/>
  <path fill="#87aaa0" d="M97 177h126v3H97zm54 7h18v9h-18zm-24 9h66v3h-66z"/>
  <path fill="#b9d2b0" d="M108 177h104v2H108z"/>
  <path fill="#713e60" d="M63 113h8v-7h178v7h8v53h-8v8H71v-8h-8z"/>
  <path fill="#e790b2" d="M67 115h8v-6h170v6h8v49h-8v6H75v-6h-8z"/>
  <path fill="#bf527e" d="M67 145h186v10H67z"/>
  <path fill="#f6b5c6" d="M67 137h186v8H67zm0 20h186v5H67z"/>
  <path fill="#ed87a4" d="M78 147h13v3H78zm26 4h15v2h-15zm28-3h15v3h-15zm37 1h12v3h-12zm28-2h13v3h-13zm28 4h15v2h-15z"/>
  <path fill="#ffcedb" d="M67 116h186v16h-10v7h-7v-7h-20v5h-8v-5h-24v9h-8v-9h-24v6h-7v-6h-24v8h-8v-8H88v5h-8v-5H67z"/>
  <path fill="#fff0eb" d="M75 110h170v6h8v7H67v-7h8z"/>
  <path fill="#86466b" d="M102 68h8v-7h100v7h8v53h-8v7H110v-7h-8z"/>
  <path fill="#ef9fb9" d="M106 70h8v-6h92v6h8v49h-8v5h-92v-5h-8z"/>
  <path fill="#c75e86" d="M106 102h108v8H106z"/>
  <path fill="#f9c1cc" d="M106 94h108v8H106zm0 16h108v5H106z"/>
  <path fill="#ffcfda" d="M106 72h108v15h-8v8h-7v-8h-16v5h-7v-5h-21v9h-8v-9h-18v6h-7v-6h-16z"/>
  <path fill="#fff1e9" d="M114 64h92v6h8v8H106v-8h8z"/>
  <path fill="#e78cab" d="M68 124h7v38h-7zm176 1h8v38h-8zM107 78h6v39h-6zm100 0h6v39h-6z"/>
  <path fill="#c46f97" d="M76 167h168v3H76zm39-46h90v3h-90z"/>
  <path fill="#ffdae3" d="M77 114h24v4H77zm143 0h23v4h-23zm-101-46h80v3h-80z"/>
  <path fill="#fff1e9" d="M77 122h11v5h-3v8h-5v-8h-3zm23 0h8v4h-2v6h-4v-6h-2zm123 0h9v5h-3v7h-4v-7h-2zm16 0h8v6h-2v6h-4v-6h-2zM114 76h10v5h-3v8h-4v-8h-3zm22 0h8v4h-2v6h-4v-6h-2zm34 0h9v5h-3v8h-4v-8h-2zm27 0h9v5h-3v8h-4v-8h-2z"/>
  <path fill="#a94471" d="M76 154h168v2H76zm38-45h92v2h-92z"/>
  <path fill="#f386a6" d="M120 104h8v2h-8zm22 2h10v2h-10zm19-3h8v2h-8zm21 2h13v2h-13z"/>
  <path fill="#f8bccb" d="M86 158h5v2h-5zm29-1h6v2h-6zm36 1h5v2h-5zm32 0h6v2h-6zm33-1h5v2h-5zm-92-44h5v2h-5zm25 1h4v2h-4zm28-1h5v2h-5z"/>
  <path fill="#fff2ed" d="M76 162h8v5h-8zm18 1h8v5h-8zm18 0h8v5h-8zm18 0h8v5h-8zm18 0h8v5h-8zm18 0h8v5h-8zm18 0h8v5h-8zm18 0h8v5h-8zm18 0h8v5h-8zm18-1h8v5h-8z"/>
  <path fill="#bc8bad" d="M18 179h31v6H18zm5-8h21v8H23z"/>
  <path fill="#c4d7a4" d="M26 167h5v5h-5zm8-3h5v8h-5z"/>
  <path fill="#ef9db4" d="M25 164h7v5h-7zm8-3h8v5h-8z"/>
  <path fill="#746080" d="M270 181h34v6h-34z"/>
  <path fill="#f0a3b7" d="M278 173h8v8h-8zm10-3h8v11h-8z"/>
  <path fill="#acd099" d="M278 172h7v2h-7zm10-3h7v2h-7z"/>
</svg>`;

const cottageScene = `
<svg class="cottage-scene" viewBox="0 0 400 300" shape-rendering="crispEdges" aria-hidden="true">
  <defs>
    <pattern id="cottage-wall" width="28" height="28" patternUnits="userSpaceOnUse">
      <path fill="#594367" d="M0 0h28v28H0z"/>
      <path fill="#60496e" d="M0 0h12v28H0z"/>
      <path fill="#73567d" d="M6 8h2v2H6zm14 12h2v2h-2z"/>
    </pattern>
    <pattern id="cottage-floor" width="72" height="24" patternUnits="userSpaceOnUse">
      <path fill="#694957" d="M0 0h72v24H0z"/>
      <path fill="#513849" d="M0 0h72v2H0zm0 12h72v2H0zM18 2h2v10h-2zm37 12h2v12h-2z"/>
      <path fill="#795363" d="M25 5h16v1H25zm-15 13h21v1H10zm51 3h7v1h-7z"/>
    </pattern>
    <radialGradient id="cottage-glow">
      <stop stop-color="#ffd88a" stop-opacity=".45"/>
      <stop offset="1" stop-color="#ffd88a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <path fill="url(#cottage-wall)" d="M0 0h400v202H0z"/>
  <path fill="url(#cottage-floor)" d="M0 202h400v98H0z"/>
  <path fill="#35263e" d="M0 0h400v10H0zm0 185h400v17H0z"/>
  <path fill="#8d6581" d="M0 185h400v3H0zm0 12h400v2H0z"/>
  <path fill="#31243e" d="M150 30h90v8h8v88H142V38h8z"/>
  <path fill="#a67e9e" d="M154 34h82v8h8v77h-98V42h8z"/>
  <path fill="#262646" d="M157 39h76v8h6v66h-88V47h6z"/>
  <path fill="#3e3b62" d="M151 92h13v-7h10v8h14v-6h10v8h17v-10h13v8h11v20h-88z"/>
  <path fill="#59627b" d="M151 103h16v-6h17v6h22v-5h21v5h12v10h-88z"/>
  <path fill="#ffe0a0" d="M207 46h7v5h-4v9h4v4h7v4h-14v-4h-5V51h5z"/>
  <path fill="#dac6ed" d="M163 54h2v2h-2zm10 13h2v2h-2zm48 11h2v2h-2zm-37-29h2v2h-2zm48 6h2v2h-2zm-56 31h2v2h-2z"/>
  <path fill="#b58bad" d="M193 39h4v75h-4zm-42 35h88v3h-88z"/>
  <path fill="#6d527b" d="M143 41h14v43h-4v16h-15V48h5zm90 0h13v7h5v52h-15V84h-3z"/>
  <path fill="#c88fae" d="M139 84h16v4h-16zm95 0h16v4h-16z"/>
  <path fill="#45304c" d="M138 115h115v10H138z"/>
  <path fill="#ac7f9d" d="M138 115h115v4H138z"/>
  <path d="M4 20l31 9 40 4 40-4 33-11m95 0 35 10 39 5 42-4 37-11" fill="none" stroke="#37283f" stroke-width="2"/>
  <g fill="#efbc84">
    <path d="M21 23h4v5h-4zm26 6h4v5h-4zm27 2h4v5h-4zm27-3h4v5h-4zm27-5h4v5h-4zm131-2h4v5h-4zm27 6h4v5h-4zm28 4h4v5h-4zm29-3h4v5h-4zm28-4h4v5h-4z"/>
  </g>
  <path fill="#4e384f" d="M12 204h147v16H12zm222 17h146v15H234z"/>
  <path fill="#493247" d="M16 155h154v10H16zm8 9h11v43H24zm106 0h11v43h-11z"/>
  <path fill="#a47688" d="M13 151h159v7H13z"/>
  <path fill="#79536d" d="M35 164h38v26H35z"/>
  <path fill="#b588a0" d="M37 166h34v9H37zm0 12h34v9H37z"/>
  <path fill="#e4bb8e" d="M50 169h8v2h-8zm0 12h8v2h-8z"/>
  <path fill="#493247" d="M96 181h31v7H96zm4 7h5v24h-5zm18 0h5v24h-5z"/>
  <path fill="#9b789e" d="M97 179h29v5H97z"/>
  <ellipse cx="43" cy="127" rx="41" ry="37" fill="url(#cottage-glow)" shape-rendering="auto"/>
  <path fill="#684961" d="M41 125h4v23h-4zm-8 23h20v3H33z"/>
  <path fill="#d79c77" d="M33 118h20v5h4v8H29v-8h4z"/>
  <path fill="#ffda9b" d="M35 119h16v5h4v5H31v-5h4z"/>
  <path fill="#422e47" d="M237 133h9v-7h23v7h7v35h93v-8h7v64H237z"/>
  <path fill="#936880" d="M242 134h27v37h102v47H242z"/>
  <path fill="#4e3c63" d="M245 169h124v42H245z"/>
  <path fill="#cda7c5" d="M248 159h34v4h8v19h-43v-18h1z"/>
  <path fill="#e5c1d2" d="M250 161h29v3h8v13h-39v-13h2z"/>
  <path fill="#9f80ad" d="M285 171h81v5h6v34h-87z"/>
  <path fill="#ba94bc" d="M286 176h82v24h-82z"/>
  <path fill="#d5afc9" d="M293 180h68v3h-68zm0 13h68v3h-68z"/>
  <path fill="#ad789d" d="M289 202h81v9h-81z"/>
  <path fill="#705472" d="M242 213h130v7H242zm3 7h7v8h-7zm115 0h7v8h-7z"/>
  <path fill="#51394f" d="M72 224h204v6h16v12h12v25h-14v8h-24v7H75v-7H58v-9H48v-23h12v-12h12z"/>
  <path fill="#8b6d94" d="M74 229h200v6h16v11h9v18h-13v8h-23v5H77v-6H62v-9H53v-16h11v-12h10z"/>
  <path fill="#b38da9" d="M77 235h195v5h15v7h7v14h-12v6h-21v5H79v-6H65v-7h-7v-11h10v-10h9z"/>
  <path fill="#796687" d="M81 241h189v5h13v13h-25v7H82v-5H70v-15h11z"/>
  <path fill="#cda6be" d="M78 249h18v4H78zm190 0h10v4h-10zm-109 4h12v3h-12zm18-5h6v3h-6zm12 5h12v3h-12z"/>
  <path fill="#4d6557" d="M381 190h4v31h-4zm-12 8h12v6h-9v-3h-3zm16-7h10v4h-4v4h-6z"/>
  <path fill="#a0b888" d="M372 190h9v5h-7zm13-7h8v5h-8zm-4-7h4v14h-4z"/>
  <path fill="#a5758e" d="M373 216h22v6h-3v12h-15v-12h-4z"/>
  <path fill="#ddb0be" d="M373 216h22v3h-22z"/>
  <path fill="#927083" d="M158 125h17v4h-17zm57 0h18v4h-18z"/>
  <path fill="#bb829e" d="M215 107h15v8h-15z"/>
  <path fill="#9db389" d="M220 99h5v8h-5zm-5 1h5v4h-5zm10-4h5v5h-5z"/>
</svg>`;

const cottageKeepsakes = [
  [67,39,73,47,"Tiny time capsules",`<svg viewBox="0 0 73 47" aria-hidden="true"><path fill="#392a42" d="M2 7h34v29H2zm37 4h32v34H39z"/><path fill="#c49a9b" d="M4 8h30v24H4zm37 5h27v28H41z"/><path fill="#e7c2a7" d="M7 11h24v18H7zm37 5h21v22H44z"/><path fill="#8c8aad" d="M9 13h20v14H9zm37 5h17v18H46z"/><path fill="#526d65" d="M9 23h6v-5h5v4h5v2h4v3H9z"/><path fill="#e1a2b8" d="M48 24h5v-3h4v3h4v5h-4v4h-5v-4h-4z"/><path fill="#fae0a8" d="M24 15h3v3h-3z"/></svg>`],
  [132,136,40,28,"Controller of chaos",`<svg viewBox="0 0 40 28" aria-hidden="true"><path fill="#382740" d="M6 6h28v4h3v13h-8v-4H11v4H3V10h3z"/><path fill="#c3abd4" d="M7 8h26v4h2v9h-5v-4H10v4H5v-9h2z"/><path fill="#694f77" d="M11 10h3v3h3v3h-3v3h-3v-3H8v-3h3z"/><path fill="#95b686" d="M27 10h3v3h-3z"/><path fill="#d881a2" d="M30 14h3v3h-3z"/></svg>`],
  [231,249,48,48,"Definitely a surprise",art.present],
  [319,49,80,114,"A shelf full of lore",`<svg viewBox="0 0 80 114" aria-hidden="true"><path fill="#3c2c45" d="M2 3h76v105H2z"/><path fill="#87617c" d="M6 7h68v97H6z"/><path fill="#50364e" d="M10 12h60v26H10zm0 31h60v24H10zm0 29h60v24H10z"/><path fill="#b1849b" d="M4 6h72v5H4zm4 32h64v5H8zm0 29h64v5H8zm0 29h64v5H8z"/><path fill="#c48daa" d="M13 18h8v20h-8zm25-3h7v23h-7zm14 36h7v16h-7zm-27 28h8v17h-8z"/><path fill="#92ae88" d="M23 15h7v23h-7zm28 13h14v10H51zM15 47h8v20h-8zm22 32h8v17h-8z"/><path fill="#b099cb" d="M31 21h6v17h-6zM25 51h9v16h-9zm35-2h6v18h-6zM14 84h9v12h-9z"/><path fill="#e5b983" d="M14 22h6v2h-6zm10-2h5v2h-5zm3 35h5v2h-5zm12 29h4v2h-4zM49 82h17v14H49z"/><path fill="#b47990" d="M51 85h13v3H51z"/></svg>`],
  [50,106,58,50,"Portal to the lobby",`<svg viewBox="0 0 58 50" aria-hidden="true"><path fill="#3c2b47" d="M2 3h54v34H2zm20 34h14v8h-14zm-8 8h30v4H14z"/><path fill="#9c81ac" d="M5 6h48v27H5z"/><path fill="#292847" d="M8 8h42v23H8z"/><path fill="#516c6c" d="M8 26h9v-5h8v-5h7v5h7v5h11v5H8z"/><path fill="#a6a2c8" d="M14 12h2v2h-2zm22 0h2v2h-2zm6 6h2v2h-2z"/><path fill="#d3cce7" d="M45 34h4v2h-4z"/><path fill="#745982" d="M24 38h10v7H24z"/></svg>`],
  [274,159,54,45,"The bedtime fox",art.fox]
];

function drawGarden(canvas) {
  const ctx = canvas.getContext("2d");
  const rect = (x,y,w,h,color) => { ctx.fillStyle=color; ctx.fillRect(x,y,w,h); };
  let seed = 391;
  const rand = n => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed % n; };
  const poly = (points,color) => { ctx.fillStyle=color; ctx.beginPath(); points.forEach(([x,y],i) => i ? ctx.lineTo(x,y) : ctx.moveTo(x,y)); ctx.closePath(); ctx.fill(); };
  const sky=ctx.createLinearGradient(0,0,0,170);
  sky.addColorStop(0,"#1a1237"); sky.addColorStop(1,"#594473"); rect(0,0,480,210,sky);
  for(let i=0;i<85;i++) rect(rand(480),rand(136),i%9===0?2:1,1,i%3 ? "#8876a7":"#e4cda9");
  for(let y=0;y<40;y++) for(let x=0;x<40;x++) {
    if ((x-19)**2+(y-20)**2<339 && (x-27)**2+(y-15)**2>275) rect(350+x,26+y,1,1,"#e8c99d");
  }
  for(let layer=0;layer<3;layer++) {
    const base=155+layer*17;
    for(let x=-18;x<500;x+=10+rand(14)) {
      const h=20+rand(45)+layer*8, w=9+rand(14);
      poly([[x,base-h],[x-w/2,base-18],[x-w/3,base-18],[x-w,base],[x+w,base],[x+w/3,base-18],[x+w/2,base-18]],["#41365d","#333653","#242e44"][layer]);
    }
    rect(0,base,480,210-base,["#41365d","#333653","#242e44"][layer]);
  }
  poly([[0,170],[73,167],[117,181],[171,192],[246,187],[316,174],[386,173],[480,155],[480,210],[0,210]],"#283d3d");
  poly([[230,179],[245,179],[241,188],[263,194],[319,210],[131,210],[211,194],[224,190]],"#69566d");
  for(let i=0;i<260;i++) {
    const x=rand(480),y=180+rand(30);
    if(y>195 && x>145 && x<300) continue;
    rect(x,y,2+rand(4),1,["#47604a","#384e42","#76906a","#9a75a7"][rand(4)]);
    if(i%13===0){ rect(x,y-4,1,4,"#668659"); rect(x-1,y-5,3,2,i%2?"#d896b2":"#d5b57d"); }
  }
  for(const x of [22,54,413,455]) {
    rect(x,162,2,34,"#171d31"); rect(x-3,158,8,3,"#171d31"); rect(x-3,161,8,9,"#91614f"); rect(x-2,162,6,6,"#f1c984"); rect(x,163,2,4,"#fff0bb");
  }
  for(const [x,y] of [[19,193],[88,190],[396,192],[453,199],[73,202]]) {
    rect(x,y,2,4,"#eacbb0"); rect(x-3,y-3,8,3,"#d47c92"); rect(x-1,y-5,4,2,"#d47c92"); rect(x+2,y-3,1,1,"#fff0d1");
  }
}
