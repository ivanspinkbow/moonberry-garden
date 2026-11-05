const giftPalettes = [
  ["#a777c4","#d4a8e9","#684d85","#ffe1ac"],
  ["#9e89d1","#cab7f0","#645586","#f8c3db"],
  ["#8aad83","#bfdb9f","#4e745d","#fff1c8"],
  ["#d4bd9b","#fff1d1","#9b7a76","#ae86c5"]
];
const celebrationColors = ["#f698ba","#cbb3f4","#acd58e"];

function mountGame(kind, container, onWin) {
  const hunt = kind === "hunt";
  const goal = hunt ? 5 : 6;
  container.innerHTML = '<div class="gamebar"><strong id="score"></strong><button id="restart">Restart</button></div><canvas class="game" width="480" height="240" aria-label="Game field"></canvas><div class="controls"><button data-key="left" aria-label="Move left">◀</button><button data-key="right" aria-label="Move right">▶</button>'+(hunt?'<button data-key="jump">▲ Jump</button>':'')+'</div><p class="feedback" role="status"></p>';
  const canvas = container.querySelector("canvas");
  const emblem=hunt ? art.berry : art.present;
  canvas.insertAdjacentHTML("beforebegin",'<div class="game-stage"></div>');
  const stage=canvas.previousElementSibling;
  stage.append(canvas);
  stage.insertAdjacentHTML("beforeend",`
      <div class="game-victory" hidden>
        <section class="game-card" aria-labelledby="game-victory-title">
          <div class="game-emblems" aria-hidden="true">✦ ${emblem} ${art.fox} ${emblem} ✦</div>
          <h2 id="game-victory-title">${hunt ? "Strawberry Quest Complete! 🍓" : "Presents Secured! 🎁"}</h2>
          <p class="game-result">${hunt ? "5 strawberries secured!" : "6 presents collected!"}</p>
          <p>${hunt ? "The birthday cake has been saved from a tragic berry shortage." : "The fox council has officially approved your birthday."}</p>
          <div class="game-actions">
            <button class="primary" data-go="garden">Continue Adventure →</button>
            <button class="game-replay">Play Again ↻</button>
          </div>
        </section>
      </div>`);
  const victoryPanel=stage.querySelector(".game-victory");
  const continueButton=victoryPanel.querySelector("[data-go]");
  const ctx = canvas.getContext("2d");
  const background = document.createElement("canvas");
  background.width = 480; background.height = 210;
  drawGarden(background);
  const scoreText = container.querySelector("#score");
  const feedback = container.querySelector(".feedback");
  const platforms = [[0,218,480],[74,176,75],[176,139,72],[281,107,83],[383,158,73]];
  const brambles = [155, 349];
  const targets = [[47,199],[112,157],[212,120],[323,88],[420,139]];
  const mapping = {ArrowLeft:"left",a:"left",ArrowRight:"right",d:"right",ArrowUp:"jump"," ":"jump"};
  const sprites = Object.fromEntries(["fox","berry"].map(name => {
    const image = new Image();
    // Standalone SVG images need an explicit namespace, unlike inline HTML SVG.
    const svg = art[name].replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ');
    image.src = "data:image/svg+xml," + encodeURIComponent(svg);
    return [name,image];
  }));
  const pressed = new Set(), pointers = new Map();
  const held = key => pressed.has(key) || [...pointers.values()].includes(key);
  const controller = new AbortController();
  const listen = (target,type,fn) => target.addEventListener(type,fn,{signal:controller.signal});
  const reducedMotion=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const restart=container.querySelector("#restart");
  let frame, last, player, berries, items, time, spawn, score, won, jump, drops;
  let victory, itemFlight, reaction, dragPointer;
  function reset() {
    itemFlight?.cancel();
    victory=undefined; reaction=undefined; dragPointer=undefined;
    victoryPanel.hidden=true;
    player = {x:hunt?12:225,y:197,vy:0,ground:true,face:1};
    berries = targets.map(([x,y]) => ({x,y,taken:false}));
    items=[]; time=0; spawn=hunt ? .4 : .8; score=0; won=false; jump=false; drops=0;
    pressed.clear(); pointers.clear();
    feedback.textContent = hunt ? "Some berries are hiding up high." : "Catch six ribbon-wrapped presents!";
    updateScore();
  }
  function updateScore() { scoreText.textContent = hunt ? 'Strawberries '+score+' / 5' : 'Presents '+score+' / 6'; }
  function point(item) {
    score++; updateScore();
    if(score === goal) {
      won=true;
      feedback.textContent="";
      pressed.clear(); pointers.clear(); jump=false; dragPointer=undefined;
      victory={start:last, item};
      if(hunt && !reducedMotion) flyItem(item, document.querySelector("#inventory"), art.berry);
      onWin();
    } else feedback.textContent = hunt ? "Berry acquired!" : "A perfectly legitimate present!";
  }
  function flyItem(item, destination, markup) {
    itemFlight?.cancel();
    const field=canvas.getBoundingClientRect();
    const counter=destination.getBoundingClientRect();
    const x=field.left+item.x*field.width/canvas.width;
    const y=field.top+item.y*field.height/canvas.height;
    const icon=document.createElement("span");
    icon.className="game-item-flight";
    icon.setAttribute("aria-hidden","true");
    icon.innerHTML=markup;
    icon.style.left=x+"px";
    icon.style.top=y+"px";
    document.body.append(icon);
    const dx=counter.left+counter.width/2-x;
    const dy=counter.top+counter.height/2-y;
    itemFlight=icon.animate([
      {transform:"translate(-50%, -50%) scale(1)"},
      {transform:`translate(calc(-50% + ${dx*.35}px), calc(-50% + ${dy*.35-28}px)) scale(1.2)`,offset:.45},
      {transform:`translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(.4)`,opacity:0}
    ],{duration:650,easing:"ease-in-out"});
    itemFlight.onfinish=itemFlight.oncancel=()=>icon.remove();
  }
  function rect(x,y,w,h,color) { ctx.fillStyle=color; ctx.fillRect(Math.round(x),Math.round(y),w,h); }
  function sprite(name,x,y,w,h) {
    const image=sprites[name];
    if(image.complete && image.naturalWidth) ctx.drawImage(image,Math.round(x),Math.round(y),w,h);
  }
  function drawDrop(item) {
    const {x,y,fake,palette}=item;
    if(fake) {
      rect(x-8,y-6,17,12,"#62413d");
      rect(x-11,y-2,23,7,"#62413d");
      rect(x-7,y+5,16,3,"#62413d");
      rect(x-6,y-5,14,11,"#be8656");
      rect(x-9,y-2,19,6,"#be8656");
      rect(x-5,y-4,10,3,"#eac18a");
      rect(x+4,y+3,5,2,"#98613f");
      rect(x-6,y+1,2,2,"#86533e");
      rect(x+6,y-2,2,2,"#86533e");
      return;
    }
    const [body,light,shadow,ribbon]=giftPalettes[palette];
    if(!reducedMotion) {
      const glint=Math.sin(time*8+palette);
      ctx.globalAlpha=.25+Math.abs(glint)*.4;
      rect(x-13,y-11+glint*4,2,2,ribbon);
      rect(x+12,y-17-glint*3,2,2,light);
      ctx.globalAlpha=1;
    }
    rect(x-11,y-7,22,18,"#30213e");
    rect(x-10,y-2,20,12,body);
    rect(x-10,y+7,20,3,shadow);
    rect(x-12,y-8,24,7,"#30213e");
    rect(x-11,y-7,22,5,light);
    rect(x-9,y-6,6,1,"#fff1d1");
    rect(x-2,y-7,4,17,ribbon);
    rect(x-8,y-13,7,6,shadow);
    rect(x+1,y-13,7,6,shadow);
    rect(x-7,y-12,4,3,ribbon);
    rect(x+3,y-12,4,3,ribbon);
    rect(x-3,y-9,6,3,ribbon);
  }
  function drawBasket(x,y) {
    rect(x,y,56,7,"#563744");
    rect(x+2,y+7,52,7,"#563744");
    rect(x+6,y+14,44,6,"#563744");
    rect(x+4,y+6,48,7,"#ac704f");
    rect(x+8,y+13,40,5,"#9e6248");
    for(let offset=7;offset<49;offset+=7) {
      rect(x+offset,y+7,4,3,"#d39a66");
      rect(x+offset+2,y+11,4,2,"#d39a66");
      rect(x+offset,y+15,3,2,"#b77d51");
    }
    rect(x+1,y+1,54,5,"#d6a36e");
    rect(x+4,y+1,48,1,"#f4ca8d");
    rect(x+3,y+5,50,1,"#92604c");
    rect(x+12,y,4,4,"#f3c298");
    rect(x+40,y,4,4,"#f3c298");
  }
  function drawCatcher() {
    for(const item of items) drawDrop(item);
    const age=reaction ? (last-reaction.start)/1000 : 1;
    const celebrating=victory ? Math.min((last-victory.start)/850,1) : 1;
    const impact=reducedMotion ? 0 : Math.max(0,1-age/.36);
    const shake=reaction?.fake ? Math.sin(age*65)*3*impact : 0;
    const bounce=-Math.sin(impact*Math.PI)*7;
    const cheer=reducedMotion ? 0 : -Math.abs(Math.sin(celebrating*Math.PI*2))*17*(1-celebrating);
    const x=Math.round(player.x+shake);
    const y=200+Math.round(bounce+cheer);
    const idle=reducedMotion ? 0 : Math.round(Math.sin(last/360));
    sprite("fox",x+8,y-26+idle,40,30);
    if(reaction?.fake && age<.6) {
      rect(x+27,y-12+idle,3,4,"#fff1d1");
      rect(x+39,y-12+idle,3,4,"#fff1d1");
      rect(x+28,y-11+idle,1,2,"#382337");
      rect(x+40,y-11+idle,1,2,"#382337");
      rect(x+32,y-6+idle,3,3,"#382337");
    }
    drawBasket(x,y);
    if(!reaction || age>=.85) return;
    const colors=reaction.fake ? ["#bb825d","#eac18a","#fff1d1"] : celebrationColors;
    ctx.globalAlpha=Math.min(1,(.85-age)*3);
    if(!reducedMotion) {
      const count=victory ? 22 : 9;
      for(let i=0;i<count;i++) {
        const angle=i*2.4;
        const distance=age*(25+i%5*(victory?16:9));
        rect(reaction.x+Math.cos(angle)*distance,190+Math.sin(angle)*distance-age*22+age*age*30,2+i%2,2+i%3,colors[i%3]);
      }
    }
    ctx.font="bold 13px monospace";
    ctx.textAlign="center";
    ctx.fillStyle=reaction.fake ? "#ffe0aa" : "#e7ffc0";
    ctx.fillText(reaction.fake ? "!" : "+1",Math.max(15,Math.min(465,reaction.x)),171-(reducedMotion ? 0 : age*25));
    ctx.globalAlpha=1;
  }
  function step(dt) {
    const direction = Number(held("right")) - Number(held("left"));
    if(direction) player.face=direction;
    player.x=Math.max(0,Math.min(hunt?452:424,player.x+direction*(hunt?165:280)*dt));
    if(hunt) {
      if (jump && player.ground) { player.vy=-308; player.ground=false; }
      jump=false;
      const bottom=player.y+21;
      player.vy+=660*dt;
      player.y+=player.vy*dt;
      player.ground=false;
      for(const [x,y,w] of platforms) {
        if(player.vy>=0 && bottom<=y+.01 && player.y+21>=y && player.x+25>x && player.x+3<x+w) {
          player.y=y-21; player.vy=0; player.ground=true;
        }
      }
      if(player.ground && player.y===197 && brambles.some(x=>Math.abs(player.x+14-x)<10)) {
        player.vy=-185; player.ground=false; feedback.textContent="Boing! The brambles insist you jump.";
      }
      for(const berry of berries) if(!berry.taken && Math.abs(player.x+14-berry.x)<19 && Math.abs(player.y+10-berry.y)<17) {
        berry.taken=true; point(berry);
      }
    } else {
      time+=dt;
      if(time>=spawn) {
        const lane=24+Math.floor(Math.random()*432);
        items.push({lane,x:lane,y:-15,fake:drops%3===2,palette:drops%giftPalettes.length,speed:57+Math.min(drops,14)*1.6+Math.random()*5});
        drops++;
        spawn=time+3.65;
      }
      for(const item of items) {
        const prior=item.y;
        item.y+=item.speed*dt;
        item.x=item.lane+Math.sin(item.y/23)*4;
        const lowerEdge=item.fake ? 8 : 11;
        const halfWidth=item.fake ? 11 : 10;
        if(prior+lowerEdge<=207 && item.y+lowerEdge>=200 &&
          item.x+halfWidth>player.x+2 && item.x-halfWidth<player.x+54) {
          item.caught=true;
          reaction={start:last,x:item.x,fake:item.fake};
          if(item.fake) feedback.textContent="That's not how birthdays work..";
          else {
            if(!reducedMotion) flyItem(item,scoreText,art.present);
            point(item);
            if(won) { items=[]; return; }
          }
        }
      }
      items=items.filter(item=>!item.caught && item.y<249);
    }
  }
  function draw() {
    ctx.imageSmoothingEnabled=false;
    ctx.drawImage(background,0,0,480,240);
    if(!reducedMotion) {
        for(const [index,x,y] of [[0,64,150],[1,152,116],[2,260,143],[3,403,101]]) {
          const phase=last/650+index*1.8;
          ctx.globalAlpha=.35+Math.sin(phase)*.25;
          rect(x+Math.sin(phase)*5,y+Math.cos(phase)*4,2,2,"#f3df94");
        }
        ctx.globalAlpha=1;
        if(!hunt) {
          const drift=last/1000;
          for(const [x,y] of [[42,34],[169,25],[294,47],[447,21]]) {
            ctx.globalAlpha=.22+Math.abs(Math.sin(drift+x))*.45;
            rect(x,y,2,2,"#eed9be");
          }
          ctx.globalAlpha=.55;
          const leaf=drift%11;
          if(leaf<4) rect(70+leaf*12+Math.sin(leaf*4)*6,126+leaf*17,3,2,"#b9b783");
          for(const x of [24,104,334,443]) rect(x+Math.sin(drift*2+x)*2,227,2,3,"#80a174");
          ctx.globalAlpha=1;
        }
    }
    if(hunt) {
      const elapsed=victory ? (last-victory.start)/1000 : 0;
      for(const [x,y,w] of platforms) { rect(x,y,w,14,"#40304c"); rect(x,y,w,4,"#8db778"); rect(x+3,y+5,w-6,3,"#4d684c"); }
      for(const x of brambles) { rect(x-10,214,20,4,"#486653"); rect(x-7,210,3,4,"#91b96b"); rect(x,208,3,6,"#91b96b"); rect(x+6,211,3,3,"#91b96b"); }
      for(const berry of berries) if(!berry.taken) sprite("berry",berry.x-8,berry.y-8,16,16);
      ctx.save();
      if(player.face<0){ ctx.translate(player.x*2+28,0); ctx.scale(-1,1); }
      const bob=victory && !reducedMotion
        ? -Math.abs(Math.sin(Math.PI*Math.min(elapsed/.85,1)*2))*13*(1-Math.min(elapsed/.85,1))
        : player.ground && (held("left") || held("right")) ? Math.round(Math.sin(last/43)) : 0;
      sprite("fox",player.x,player.y+bob,28,21);
      ctx.restore();
      if(victory && !reducedMotion && elapsed<.85) {
        ctx.globalAlpha=1-elapsed/.85;
        for(let i=0;i<15;i++) {
          const angle=i*Math.PI*2/15;
          const distance=elapsed*(32+i%4*14);
          const origin=i%3===0 ? victory.item : {x:player.x+14,y:player.y+bob+7};
          rect(origin.x+Math.cos(angle)*distance,origin.y+Math.sin(angle)*distance+elapsed*elapsed*22,2+i%2,2+i%2,celebrationColors[i%3]);
        }
        ctx.globalAlpha=1;
      }
    } else drawCatcher();
  }
  function loop(now) {
    const dt=Math.min(.033,(now-last)/1000 || 0);
    last=now;
    if(!won) step(dt);
    draw();
    if(victory && victoryPanel.hidden && now-victory.start>=1200) {
      victoryPanel.hidden=false;
      continueButton.focus({preventScroll:true});
    }
    frame=requestAnimationFrame(loop);
  }
  listen(window,"keydown",event=>{
    const key=mapping[event.key] || mapping[event.key.toLowerCase()];
    if(!key || won || document.querySelector("dialog[open]") || (key==="jump" && (!hunt || (event.key===" " && event.target.closest?.("button"))))) return;
    event.preventDefault(); pressed.add(key);
    if(key==="jump" && !event.repeat) jump=true;
  });
  listen(window,"keyup",event=>pressed.delete(mapping[event.key] || mapping[event.key.toLowerCase()]));
  listen(window,"blur",()=>{pressed.clear(); pointers.clear(); dragPointer=undefined;});
  for(const button of container.querySelectorAll("[data-key]")) {
    listen(button,"pointerdown",event=>{
      if(won) return;
      button.setPointerCapture(event.pointerId);
      pointers.set(event.pointerId,button.dataset.key);
      if(button.dataset.key==="jump") jump=true;
    });
    for(const type of ["pointerup","pointercancel","lostpointercapture"]) listen(button,type,event=>pointers.delete(event.pointerId));
  }
  if(!hunt) {
    const move=event=>{
      const bounds=canvas.getBoundingClientRect();
      player.x=Math.max(0,Math.min(424,(event.clientX-bounds.left)*480/bounds.width-28));
    };
    listen(canvas,"pointerdown",event=>{
      if(won || event.button!==0 || dragPointer!==undefined) return;
      dragPointer=event.pointerId;
      canvas.setPointerCapture(event.pointerId);
      move(event);
    });
    listen(canvas,"pointermove",event=>{if(!won && dragPointer===event.pointerId) move(event);});
    for(const type of ["pointerup","pointercancel","lostpointercapture"]) {
      listen(canvas,type,event=>{if(dragPointer===event.pointerId) dragPointer=undefined;});
    }
  }
  listen(restart,"click",reset);
  listen(victoryPanel.querySelector(".game-replay"),"click",()=>{
    reset();
    restart.focus({preventScroll:true});
  });
  reset(); frame=requestAnimationFrame(loop);
  return ()=>{controller.abort(); cancelAnimationFrame(frame); itemFlight?.cancel();};
}

