const scene = document.querySelector("#scene");
const modal = document.querySelector("#modal");
const content = document.querySelector("#dialog-content");
const inventory = document.querySelector("#inventory");
const toast = document.querySelector("#toast");
const key = "ren-strawberry-adventure-v1";
const empty = () => ({ berries:[], done:[], cake:[] });
const secrets = {
  welcome:"Open Welcome garden from the adventure map, then look near the bottom-right edge of the opening scene.",
  catcher:"Check beneath the Present Catcher game.",
  quiz:"Finish the quiz and inspect your results.",
  memory:"Check near the fox plushie.",
  grove:"Look under the lantern in the quiet grove."
};
const toppings = {
  berry:["Strawberry",art.berry],
  cream:["Whipped cream",'<path fill="#c69aab" d="M2 11h2V8h2V5h3V2h2v4h2v4h2v5H2z"/><path fill="#fff2df" d="M3 11h3V8h2V6h2V4h1v4h2v4h1v2H3z"/><path fill="#e7bfcb" d="M6 11h6v1H6z"/>'],
  sprinkle:["Sprinkles",'<path fill="#fff0ad" d="M3 3h4v2H3zm8 9h3v2h-3z"/><path fill="#9acb94" d="M10 3h2v4h-2zM3 11h2v4H3z"/><path fill="#db638d" d="M7 7h4v2H7zm6-1h2v3h-2z"/>'],
  candle:["Candle",'<path fill="#624269" d="M7 1h2v3H7zM4 4h8v12H4z"/><path fill="#fff2de" d="M5 5h6v10H5z"/><path fill="#db78a1" d="M5 6h3v2H5zm3 3h3v2H8zm-3 3h3v2H5z"/>'],
  bow:["Sugar bow",'<path fill="#ac487b" d="M1 3h4v2h6V3h4v9h-4v-2H5v2H1zM6 9h4v6H6z"/><path fill="#ffa8cb" d="M2 4h3v2h2v3H5v2H2zm12 0h-3v2H9v3h2v2h3z"/><path fill="#e271a0" d="M7 6h2v4H7z"/>'],
  frosting:["Frosting star",'<path fill="#a87577" d="M7 1h2v4h6v3h-3v3h1v4h-3v-2H6v2H3v-4h1V8H1V5h6z"/><path fill="#fff0a6" d="M7 3h2v3h5v1h-3v3h1v3h-2v-1H6v1H4v-3h1V7H2V6h5z"/>']
};
function toppingArt(type) {
  return type==="berry" ? art.berry : '<svg viewBox="0 0 16 16" aria-hidden="true">'+toppings[type][1]+'</svg>';
}
let state = empty();
try {
  const saved = JSON.parse(localStorage.getItem(key));
  if(saved && ["berries","done","cake"].every(field=>Array.isArray(saved[field]))) state=saved;
} catch {}
let cleanup = ()=>{}, toastTimer, dialogueTimer;
const escapeHTML = value => String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[char]);
const button = (label,action,classes="") => '<button class="'+classes+'" data-go="'+action+'">'+label+'</button>';
const fox = '<span class="fox">'+art.fox+'</span>';
const berry = '<span class="berry">'+art.berry+'</span>';
const cake = '<span class="cake">'+art.cake+'</span>';
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const count = () => state.berries.length;
const complete = id => state.done.includes(id);
function save() {
  try { localStorage.setItem(key,JSON.stringify(state)); } catch {}
  inventory.innerHTML=berry+' <strong>'+count()+' <small>/ 10</small></strong>';
  inventory.setAttribute("aria-label","Strawberry inventory, "+count()+" of 10");
}
function notify(message) {
  toast.textContent=message; toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove("show"),3900);
}
function award(id) {
  if(complete(id)) return "";
  state.done.push(id); save();
  return config.achievements[id] ? "Achievement unlocked: "+config.achievements[id] : "";
}
function collect(ids,message,announce=true) {
  const found=ids.filter(id=>!state.berries.includes(id));
  if(!found.length) return;
  state.berries.push(...found); save();
  const bonus=count()===10 ? award("all") : "";
  if(announce || bonus) notify([announce && (message || "You found a hidden strawberry!"),bonus].filter(Boolean).join(" · "));
}
function hidden(id,cls="") {
  return state.berries.includes(id) ? "" : '<button class="secret '+cls+'" data-berry="'+id+'" aria-label="Pick the hidden strawberry">'+berry+'</button>';
}
function backdrop() {
  return '<div class="landscape"><canvas width="480" height="210" aria-hidden="true"></canvas><i class="firefly"></i><i class="firefly"></i><i class="firefly"></i><i class="firefly"></i></div>';
}
function paint() { scene.querySelectorAll(".landscape canvas").forEach(drawGarden); }
function heading(kicker,title,description) {
  return '<div class="section-head"><span class="eyebrow">'+kicker+'</span><h1 tabindex="-1">'+title+'</h1><p>'+description+'</p></div>';
}
function shell(kicker,title,description,body) {
  return '<section class="panel">'+button("← Garden","garden","back")+heading(kicker,title,description)+body+'</section>';
}
function showDialog(html, isIntro=false) {
  clearInterval(dialogueTimer);
  modal.classList.toggle("intro-modal",isIntro);
  content.innerHTML=html;
  if(!modal.open) modal.showModal();
}
modal.addEventListener("close",()=>{
  if(modal.open) return;
  clearInterval(dialogueTimer);
  content.querySelectorAll("video").forEach(video=>video.pause());
});
document.querySelector("#close").onclick=()=>modal.close();
function intro(index=0) {
  const line=config.intro[index];
  const last=index+1===config.intro.length;
  const nextLabel=last?"Enter Garden":"Next line";
  showDialog('<button class="intro-advance" data-go="intro-'+(index+1)+'" aria-label="'+nextLabel+'" aria-describedby="intro-speaker intro-line"></button>'+
    '<div class="intro-layout"><div class="intro-portrait" aria-hidden="true">'+fox+'</div>'+
    '<div class="intro-copy"><span class="eyebrow" id="intro-speaker">THE BIRTHDAY FOX</span>'+
    '<p class="dialogue-line" id="intro-line">'+escapeHTML(line)+'</p>'+
    '<span class="intro-hint" aria-hidden="true">'+(last?"Tap to enter the garden":"Tap anywhere to continue")+' ▾</span></div></div>'+
    button("Skip","garden","intro-skip"),true);
  if(!reduced.matches) {
    const text=content.querySelector(".dialogue-line");
    text.setAttribute("aria-label",line);
    let pos=0; text.textContent="";
    dialogueTimer=setInterval(()=>{
      text.textContent=line.slice(0,++pos);
      if(pos>=line.length) clearInterval(dialogueTimer);
    },21);
  }
  content.querySelector(".intro-advance").focus();
}
const trails = [
  ["hunt","01","Strawberry Hunt","Leap through the brambles.",art.berry],
  ["catcher","02","Present Catcher","Catch the gifts. NOT the potatoes.","▣"],
  ["quiz","03","Quiz","Revisit three Fortnite memories.","?"],
  ["memory","04","Ren's Little Hideout","Open the cottage keepsakes.", "⌂"],
  ["grove","05","The Great Strawberry Crime","Investigate the Secret Grove.","✧"],
  ["cake","06","Birthday Cake","Frost it. Sprinkle it. Make a wish.",art.cake]
];
function render(next,focus=true) {
  cleanup(); cleanup=()=>{};
  if(modal.open) modal.close();

  if(next==="welcome") {
    scene.innerHTML='<section class="hero">'+backdrop()+'<div class="hero-copy"><span class="eyebrow">✦ &nbsp; THE BIRTHDAY EDITION &nbsp; ✦</span><h1 tabindex="-1">'+escapeHTML(config.name)+'’s Strawberry<br><em>Birthday Adventure</em></h1><p>A little birthday quest made just for you ♡</p><div class="actions">'+button("Start Adventure →","intro","primary")+button("How to Play","help")+'</div></div><div class="hero-mascots">'+fox+cake+'</div>'+hidden("welcome","garden-secret")+'<span class="area-label">✧ &nbsp; MOONBERRY WOODS</span></section>';
  } else if(next==="garden") {
    scene.innerHTML='<section class="hub">'+backdrop()+heading("✦  THE ADVENTURE MAP","Moonberry Garden","Follow any trail. The cake is ready whenever you are.")+'<div class="trail-grid">'+trails.map(([id,number,title,note,icon])=>'<button class="trail" data-go="'+id+'"><span class="trail-icon">'+icon+'</span><span class="trail-info"><small>TRAIL '+number+(complete(id)?" · COMPLETE":"")+'</small><strong>'+title+'</strong><span>'+note+'</span></span><span aria-hidden="true">→</span></button>').join("")+'</div><div class="hub-actions">'+button("Achievements","achievements")+button("Strawberry hints","hints")+button("Welcome garden","welcome")+(complete("finale")?button("Birthday surprise","finale"):"")+'</div></section>';
  } else if(next==="hunt" || next==="catcher") {
    const hunt=next==="hunt";
    scene.innerHTML=shell(hunt?"TRAIL 01 · THE BRAMBLES":"TRAIL 02 · THE GIFT ORCHARD",hunt?"Strawberry Hunt":"Present Catcher",hunt?"Move with ← → or A / D. Jump with ↑ or Space.":"Move with ← → or A / D, or drag across the game field.",'<div id="game"></div>'+(hunt?"":'<div class="secret-nook">'+hidden("catcher")+'</div>'));
    cleanup=mountGame(next,document.querySelector("#game"),()=>{
      const message=award(next);
      if(hunt) {
        collect(["hunt-1","hunt-2","hunt-3","hunt-4","hunt-5"],message,false);
      }
    });
  } else if(next==="quiz") {
    mountQuiz();
  } else if(next==="memory") {
    mountMemoryRoom();
  } else if(next==="grove") {
    mountGrove();
  } else if(next==="cake" || next==="candles" || next==="completed-cake") {
    renderCake(next);
  } else if(next==="finale") {
    finale();
  }
  paint();
  if(focus) { scene.querySelector("h1")?.focus({preventScroll:true}); window.scrollTo(0,0); }
}
function mountGrove() {
  const clues=[
    ["crumbs",24,"The Crime Scene","Strawberry crumbs everywhere. Whoever did this wasn't even trying to be subtle.",
      '<path fill="#bf5f7d" d="M6 9h7v3H6zm12-5h5v3h-5zm10 4h8v3h-8z"/><path fill="#ffa8b8" d="M8 8h3v2H8zm12-5h2v2h-2zm11 4h3v2h-3z"/>'],
    ["trail",45,"Suspicious Pawprints","Four tiny paws. A very suspicious trail. Who could it POSSIBLY be?",
      '<path fill="#b19391" d="M4 10h6v3H4zm-1-3h2v2H3zm4-1h2v2H7zm3 1h2v2h-2zm7-2h6v3h-6zm-1-3h2v2h-2zm4-1h2v2h-2zm3 1h2v2h-2zm8 8h6v3h-6zm-1-3h2v2h-2zm4-1h2v2h-2zm3 1h2v2h-2z"/>'],
    ["napkin",83,"The Worst Alibi Ever","A napkin covered in strawberry jam. At least the criminal had the decency to wipe their mouth.",
      '<path fill="#b99bab" d="M12 3h22v3h5v6H5V8h3V5h4z"/><path fill="#f3d7c3" d="M13 3h20v3h4v4H8V8h4z"/><path fill="#c9698e" d="M16 5h8v2h4v2H15V7h1zm14 1h3v2h-3z"/>']
  ];
  const found=new Set(Array.isArray(state.groveClues) ? state.groveClues : []);
  const hotspots=clues.map(([id,x,label,,art],index)=>`
    <button class="cottage-object grove-clue" data-clue="${id}" aria-label="Inspect ${label}" style="--x:${x}%;--delay:${index*-2.8}s">
      <span class="cottage-object-art"><svg viewBox="0 0 44 14" aria-hidden="true">${art}</svg></span>
      <span class="cottage-sparkle" aria-hidden="true"></span>
      <span class="cottage-tooltip" aria-hidden="true">${label}</span>
    </button>`).join("");
  scene.innerHTML=shell("TRAIL 05 · SECRET GROVE","The Great Strawberry Crime",
    "Someone ate all the strawberries. I have a suspect, but apparently we need evidence.",
    '<div class="grove">'+backdrop()+
    '<span class="grove-lantern" aria-hidden="true"><svg viewBox="0 0 24 36"><path fill="#342535" d="M9 2h6v5h4v5h3v19h-3v4H5v-4H2V12h3V7h4z"/><path fill="#b47961" d="M6 10h12v4H6zm0 17h12v5H6z"/><path fill="#efac69" d="M5 14h14v13H5z"/><path fill="#ffe2a0" d="M9 17h6v10H9z"/></svg></span>'+
    '<span class="grove-bush" aria-hidden="true"><svg viewBox="0 0 58 23"><path fill="#233c3b" d="M0 15h5V9h9V4h13V1h13v6h9v5h6v8h3v3H0z"/><path fill="#50785c" d="M8 12h7V7h12v4h6V5h7v7h9v4H38v-3H23v3H8z"/></svg></span>'+
    '<div class="grove-fox">'+fox+'</div>'+hotspots+hidden("grove","grove-secret")+'</div>'+
    '<div class="grove-case"><strong class="grove-progress" role="status"></strong><div class="actions">'+
    '<button class="grove-hint" aria-expanded="false">Need me to solve it for you?..</button>'+
    '<button class="grove-solve primary" hidden>Expose the Criminal →</button></div>'+
    '<p class="grove-hint-text" hidden>Check beside the lantern, follow the pawprints near the bushes, and look around the fox. VERY suspicious, if you ask me.</p></div>');
  const grove=scene.querySelector(".grove");
  const progress=scene.querySelector(".grove-progress");
  const solve=scene.querySelector(".grove-solve");
  const hint=scene.querySelector(".grove-hint");
  const hintText=scene.querySelector(".grove-hint-text");
  const clueButtons=grove.querySelectorAll("[data-clue]");
  function updateInvestigation() {
    const count=clues.filter(([id])=>found.has(id)).length;
    progress.textContent=count+" / "+clues.length+" clues found"+(complete("grove") ? " · Case closed" : "");
    solve.hidden=count<clues.length;
    solve.textContent=complete("grove") ? "Relive the Embarrassment →" : "Expose the Criminal →";
    clueButtons.forEach((target,index)=>{
      const [id,,label]=clues[index];
      target.classList.toggle("grove-found",found.has(id));
      target.setAttribute("aria-label","Inspect "+label+(found.has(id) ? " (clue found)" : ""));
    });
  }
  clueButtons.forEach((target,index)=>target.onclick=()=>{
    const [id,,label,message]=clues[index];
    if(!found.has(id)) {
      found.add(id);
      state.groveClues=[...found];
      save();
      updateInvestigation();
    }
    showDialog('<span class="eyebrow">✦ Evidence</span><h2>'+label+'</h2><p>'+message+'</p>');
  });
  hint.onclick=()=>{
    hintText.hidden=!hintText.hidden;
    hint.textContent=hintText.hidden ? "Need me to solve it for you?.." : "Okay, hide the hint.";
    hint.setAttribute("aria-expanded",String(!hintText.hidden));
    grove.classList.toggle("show-keepsakes",!hintText.hidden);
  };
  solve.onclick=()=>{
    if(solve.hidden) return;
    const achievement=award("grove");
    updateInvestigation();
    showDialog('<span class="eyebrow">✦ CASE CLOSED ✦</span><h2>CAUGHT IN 4K</h2>'+
      '<div class="grove-reveal">'+fox+'<div class="grove-berries" aria-hidden="true">'+berry.repeat(3)+'</div></div>'+
      '<p>The fox ate every single strawberry and is showing absolutely no remorse.</p>'+
      '<p><strong>Fox:</strong> “I was just checking if they were poisonous.”<br>'+
      '<strong>Eda:</strong> “All of them??”<br>'+
      '<strong>Fox:</strong> “...I had to be sure.”</p>'+
      '<p>Case closed. The criminal has been sentenced to attending one birthday party.</p>'+
      (achievement ? '<p class="grove-progress">'+escapeHTML(achievement)+'</p>' : ""));
  };
  updateInvestigation();
}
function mountMemoryRoom() {
  const objects=cottageKeepsakes.map(([x,y,width,height,tooltip,illustration],index)=>{
    const item=config.memories[index];
    const position=`--x:${(x+width/2)/4}%;--y:${(y+height/2)/3}%;--w:${width/4}%;--h:${height/3}%`;
    if(item.decorative) return `<span class="cottage-decoration" style="${position}" aria-hidden="true"><span class="cottage-object-art">${illustration}</span></span>`;
    const title=escapeHTML(item.title);
    return `<button class="cottage-object" data-memory="${index}" aria-label="Inspect ${title}"
      style="${position};--delay:${index*-1.4}s">
      <span class="cottage-object-art">${illustration}</span>
      <span class="cottage-sparkle" aria-hidden="true"></span>
      <span class="cottage-tooltip" aria-hidden="true">${tooltip}</span>
    </button>`;
  }).join("");
  scene.innerHTML=shell("TRAIL 04 · THE COTTAGE","Ren's Little Hideout","Go on, snoop around. I won't tell.",
    '<div class="cottage"><div class="cottage-room">'+cottageScene+objects+
    hidden("memory","room-secret")+
    '</div><div class="cottage-footer"><p>✧ Look for a little twinkle, then tap an object to peek.</p>'+
    '<button class="cottage-hint">Lost already?</button><span class="cottage-status" role="status"></span></div></div>');
  const room=scene.querySelector(".cottage-room");
  const status=scene.querySelector(".cottage-status");
  let timer;
  scene.querySelector(".cottage-hint").onclick=()=>{
    clearTimeout(timer);
    room.classList.add("show-keepsakes");
    status.textContent="The clickable keepsakes are highlighted.";
    timer=setTimeout(()=>{
      room.classList.remove("show-keepsakes");
      status.textContent="";
    },3400);
  };
  cleanup=()=>clearTimeout(timer);
}
function mountQuiz() {
  const clips=config.quizClips;
  let index=0, correct=0, missing=0, muted=false;
  function finish() {
    const score=correct+" / "+clips.length;
    if(!missing) {
      const previous=Number.isInteger(state.quizBest) ? state.quizBest : 0;
      state.quizBest=Math.max(previous,correct);
      award("quiz");
      save();
    }
    const remarks=[
      "0/3??? Girl were you even there",
      "1/3. At least you remember SOME of our lore.",
      "2/3. I'm still judging you tho.",
      "3/3. Congratulations, you remember your own lore."
    ];
    const message=missing ? "Some footage was unavailable. Replay all three clips to finish the archive." : remarks[correct];
    scene.innerHTML=shell("THE FOX COUNCIL HAS SPOKEN",missing?"Memory archives incomplete":"MEMORY ARCHIVES COMPLETE!",message,
      '<div class="quiz-results"><div class="quiz-mascot">'+fox+(missing?"":hidden("quiz"))+'</div>'+
      '<p class="quiz-score">'+score+'</p>'+(missing?"":'<p>Best score · '+state.quizBest+' / '+clips.length+'</p>')+
      '<div class="actions">'+button("Continue Adventure →","garden","primary")+button("Replay Memories ↻","quiz")+'</div></div>');
    scene.querySelector("h1").focus();
  }
  function showClip() {
    const clip=clips[index];
    scene.innerHTML=shell("TRAIL 03 · MEMORY "+(index+1)+"/"+clips.length,"Fortnite Memory Archives",
      "Watch the clip and answer when the fox pauses the footage.",`
      <div class="quiz-player">
        <div class="quiz-frame">
          <video playsinline preload="metadata" aria-label="Fortnite memory ${index+1}"></video>
          <section class="quiz-question" aria-labelledby="quiz-prompt" hidden>
            <div class="quiz-question-heading">${fox}<h2 id="quiz-prompt" tabindex="-1">${escapeHTML(clip.question)}</h2></div>
            <div class="answers">${clip.choices.map((label,i)=>'<button data-answer="'+i+'"><span>'+String.fromCharCode(65+i)+'</span>'+escapeHTML(label)+'</button>').join("")}</div>
          </section>
        </div>
        <div class="quiz-controls">
          <button class="primary" id="quiz-play">Play Memory →</button>
          <button id="quiz-mute" aria-pressed="false">Mute video</button>
          <button class="primary" id="quiz-next" hidden></button>
        </div>
        <div class="quiz-feedback" role="status" hidden>${fox}<p></p></div>
      </div>`);
    const video=scene.querySelector("video");
    const question=scene.querySelector(".quiz-question");
    const play=scene.querySelector("#quiz-play");
    const mute=scene.querySelector("#quiz-mute");
    const next=scene.querySelector("#quiz-next");
    const feedback=scene.querySelector(".quiz-feedback");
    const controller=new AbortController();
    let phase="ready", playbackRequest=0;
    cleanup=()=>{
      controller.abort();
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
    function updateMute() {
      muted=video.muted;
      mute.setAttribute("aria-pressed",String(muted));
    }
    function announce(message) {
      feedback.querySelector("p").textContent=message;
      feedback.hidden=false;
    }
    function pauseForQuestion() {
      if(phase!=="watching") return;
      phase="question";
      video.pause();
      video.controls=false;
      if(Number.isFinite(video.duration)) {
        video.currentTime=clip.pauseAt<video.duration ? clip.pauseAt : Math.max(0,video.duration-.5);
      }
      play.hidden=true;
      question.hidden=false;
      question.querySelector("h2").focus();
    }
    async function playVideo() {
      const request=++playbackRequest;
      play.hidden=true;
      video.controls=true;
      try {
        await video.play();
      } catch {
        if(controller.signal.aborted || request!==playbackRequest || !["watching","answered"].includes(phase)) return;
        play.textContent="Resume Video";
        play.hidden=false;
        play.focus();
      }
    }
    function offerNext(unavailable=false) {
      phase=unavailable ? "unavailable" : "finished";
      play.hidden=true;
      video.controls=false;
      question.hidden=true;
      mute.hidden=true;
      next.textContent=unavailable ? "Continue Without Clip →" : "Next Memory →";
      next.hidden=false;
      next.focus();
    }
    const listen=(event,fn)=>video.addEventListener(event,fn,{signal:controller.signal});
    listen("volumechange",updateMute);
    listen("play",()=>{
      if(phase==="question") video.pause();
      else play.hidden=true;
    });
    listen("timeupdate",()=>{
      if(video.currentTime>=clip.pauseAt) pauseForQuestion();
    });
    listen("ended",()=>{
      if(phase==="watching") pauseForQuestion();
      else if(phase==="answered") {
        if(index+1===clips.length) advance();
        else offerNext();
      }
    });
    listen("error",()=>{
      if(["finished","unavailable"].includes(phase)) return;
      announce("This clip couldn’t play. Check the MP4 at "+clip.video+" or continue with the archive.");
      offerNext(true);
    });
    video.muted=muted;
    updateMute();
    video.src=clip.video;
    play.onclick=()=>{
      if(phase==="ready") phase="watching";
      if(["watching","answered"].includes(phase)) playVideo();
    };
    mute.onclick=()=>{video.muted=!video.muted; updateMute();};
    question.querySelectorAll("[data-answer]").forEach(choice=>choice.onclick=()=>{
      if(phase!=="question") return;
      phase="answered";
      const match=Number(choice.dataset.answer)===clip.answer;
      correct+=Number(match);
      announce(match ? clip.correctFeedback : clip.incorrectFeedback);
      question.hidden=true;
      video.focus();
      playVideo();
    });
    function advance() {
      if(phase==="unavailable") missing++;
      phase="leaving";
      cleanup();
      cleanup=()=>{};
      index++;
      if(index===clips.length) finish();
      else {
        showClip();
        scene.querySelector("h1").focus();
      }
    }
    next.onclick=()=>{
      if(["finished","unavailable"].includes(phase)) advance();
    };
  }
  showClip();
}
const legacyCakePositions = [[115,94],[137,94],[160,94],[183,94],[205,94],[96,126],[131,135],[188,135],[224,126],[109,154],[160,154],[211,154],[139,72],[181,72],[79,148],[241,148],[160,127],[160,72]];
const cakeCursor={x:160,y:75};
let selected="berry";
function cakeDecorations() {
  return state.cake.flatMap((entry,index)=>{
    if(typeof entry==="string" && Object.hasOwn(toppings,entry) && legacyCakePositions[index]) {
      const [x,y]=legacyCakePositions[index];
      return [{type:entry,x,y}];
    }
    return entry && Object.hasOwn(toppings,entry.type) && Number.isFinite(entry.x) && Number.isFinite(entry.y) ? [entry] : [];
  });
}
function cakeMarkup(decorations,{lit=false,editable=false,withFox=lit}={}) {
  const placed=decorations.map(({type,x,y})=>
    '<span class="cake-topping'+(lit && type==="candle"?" cake-lit":"")+'" style="left:'+x/3.2+'%;top:'+y/2.2+'%">'+toppingArt(type)+'</span>').join("");
  const surface=editable ? '<button class="cake-surface" aria-label="Cake decorating surface. Use arrow keys to aim and Enter or Space to place."></button><span class="cake-cursor" aria-hidden="true"></span>' : "";
  const friend=withFox ? '<div class="cake-friend">'+fox+'</div>' : "";
  const celebration=lit ? '<div class="cake-shower" aria-hidden="true">'+
    Array.from({length:15},(_,i)=>'<i style="--x:'+(7+i*6)+'%;--delay:'+(i%5)*.13+'s;--drift:'+((i%3)-1)*24+'px">'+
      (i%5===0?art.berry:i%3===0?"✦":"")+'</i>').join("")+'</div>' : "";
  return '<div class="cake-stage'+(lit?" cake-wish":"")+'">'+birthdayTable+'<div class="cake-placed" aria-hidden="true">'+placed+'</div>'+
    friend+celebration+surface+'</div>';
}
function cakeBounds(y) {
  return y<120 ? [114,206] : [75,245];
}
function renderCake(mode,focusTarget="") {
  const editable=mode==="cake";
  const wishing=mode==="candles";
  const decorations=cakeDecorations();
  const remaining=Math.max(0,count()-decorations.filter(({type})=>type==="berry").length);
  const tray=editable ? '<div class="cake-tray"><p>'+berry+' <strong>'+remaining+'</strong> of '+count()+' collected strawberries available</p>'+
    '<div class="palette" aria-label="Topping tray">'+Object.entries(toppings).map(([type,[name]])=>
      '<button data-topping="'+type+'" aria-pressed="'+(selected===type)+'">'+toppingArt(type)+'<span>'+name+'</span></button>').join("")+'</div></div>' : "";
  const title=editable ? "Decorate the Birthday Cake" : wishing ? "I'm choosing to trust your decorating skills" : "Your birthday cake";
  const instructions=editable ? "Pick a topping, then tap the pink cake to place it." : wishing ? "" : "A very official birthday masterpiece.";
  const wish=wishing ? '<p class="cake-wish-message">Gordon Ramsay is shaking &lt;3</p>' : "";
  const controls=editable ? button("Undo last","undo-cake")+button("Clear decorations","clear-cake")+button("Finish Cake →","candles","primary") :
    wishing ? button("Continue →","blow","primary")+button("Edit cake","cake") : button("Edit cake","cake")+button("Birthday surprise","finale","primary");
  scene.innerHTML=shell("TRAIL 06 · THE BIRTHDAY TABLE",title,instructions,
    '<div class="birthday-table">'+cakeMarkup(decorations,{lit:wishing,editable})+tray+wish+'<div class="actions">'+controls+'</div></div>');
  if(editable) {
    const surface=scene.querySelector(".cake-surface");
    const cursor=scene.querySelector(".cake-cursor");
    function drawCursor() {
      cursor.style.left=cakeCursor.x/3.2+"%";
      cursor.style.top=cakeCursor.y/2.2+"%";
    }
    drawCursor();
    surface.onkeydown=event=>{
      const direction={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[event.key];
      if(!direction) return;
      event.preventDefault();
      cakeCursor.y=Math.max(72,Math.min(162,cakeCursor.y+direction[1]*8));
      const [left,right]=cakeBounds(cakeCursor.y);
      cakeCursor.x=Math.max(left,Math.min(right,cakeCursor.x+direction[0]*8));
      drawCursor();
    };
    surface.onclick=event=>{
      const bounds=surface.getBoundingClientRect();
      const x=event.detail ? (event.clientX-bounds.left)*320/bounds.width : cakeCursor.x;
      const y=event.detail ? (event.clientY-bounds.top)*220/bounds.height : cakeCursor.y;
      const [left,right]=cakeBounds(y);
      if(y<72 || y>162 || x<left || x>right) {
        notify("Tap a spot a little farther inside the pink cake.");
        return;
      }
      if(selected==="berry" && remaining===0) {
        notify("Your berry basket is empty. Pick another topping or explore a trail.");
        return;
      }
      if(decorations.some(item=>item.type===selected && Math.hypot(item.x-x,item.y-y)<1)) {
        notify("That topping is already right there.");
        return;
      }
      decorations.push({type:selected,x,y});
      state.cake=decorations;
      Object.assign(cakeCursor,{x,y});
      save();
      renderCake("cake",".cake-surface");
    };
  }
  if(focusTarget) scene.querySelector(focusTarget)?.focus({preventScroll:true});
}
function finale() {
  const message=config.birthday.slice(1).map(paragraph=>'<p>'+escapeHTML(paragraph)+'</p>').join("");
  const confetti=Array.from({length:30},(_,i)=>'<i style="--x:'+((i*37)%100)+'%;--delay:'+(i%10)*.08+'s;--h:'+(i*39)%360+'"></i>').join("");
  const achievement=count()===10 ? '<p class="finale-achievement">✦ Ten strawberries! The fox council names you Keeper of the Moonberry Patch.</p>' : "";
  scene.innerHTML='<section class="finale panel">'+backdrop()+
    '<div class="confetti" aria-hidden="true">'+confetti+'</div><div class="fireworks" aria-hidden="true"><i></i><i></i><i></i></div>'+
    '<div class="finale-content">'+heading("✦  NOVEMBER 6  ✦",escapeHTML(config.birthday[0]),"A celebration in Moonberry Garden")+
    cakeMarkup(cakeDecorations(),{withFox:true})+
    '<article class="letter"><h2>A little note for you ♡</h2>'+message+'</article>'+achievement+
    '<div class="actions">'+button("Ren's Little Hideout","memory")+button("Replay minigames","garden")+button("View completed cake","completed-cake","primary")+'</div></div></section>';
}
function action(id) {
  if(id==="intro") { intro(); return; }
  if(id.startsWith("intro-")) {
    const index=Number(id.slice(6));
    if(index<config.intro.length) intro(index); else render("garden");
    return;
  }
  if(id==="help") {
    showDialog('<h2>How to Play</h2><p>Explore the garden at your own pace. Find five berries in Strawberry Hunt and five more tucked around the trails.</p><p>Use arrow keys or the touch buttons in the games. The birthday cake is available whenever you feel like decorating.</p>'); return;
  }
  if(id==="achievements") {
    const achievements=Object.entries(config.achievements);
    const earned=achievements.filter(([key])=>complete(key)).length;
    const list=achievements.map(([key,name])=>'<li>'+escapeHTML(name)+' · '+(complete(key)?"✓ Earned":"Locked")+'</li>').join("");
    showDialog('<h2>Achievements</h2><p>'+earned+' / '+achievements.length+' earned</p><ul>'+list+'</ul>');
    return;
  }
  if(id==="hints") {
    showDialog('<h2>Strawberry hints</h2><ul>'+Object.entries(secrets).map(([id,hint])=>'<li>'+(state.berries.includes(id)?"✓ Found · ":"")+hint+'</li>').join("")+'</ul>'); return;
  }
  if(id==="clear-cake") { state.cake=[]; save(); renderCake("cake",'[data-go="clear-cake"]'); return; }
  if(id==="undo-cake") {
    const decorations=cakeDecorations();
    if(!decorations.pop()) return;
    state.cake=decorations;
    save();
    renderCake("cake",'[data-go="undo-cake"]');
    return;
  }
  if(id==="candles") award("cake");
  if(id==="blow") {
    award("finale");
    render("finale");
    return;
  }
  render(id);
}
document.addEventListener("click",event=>{
  const target=event.target.closest("button");
  if(!target) return;
  const {go,berry:id,memory,topping}=target.dataset;
  if(go) action(go);
  if(id) {
    collect([id]); target.remove();
    scene.querySelector("h1")?.focus({preventScroll:true});
  }
  if(memory!==undefined) {
    const item=config.memories[Number(memory)];
    const videos=item.videos || (item.video ? [item.video] : []);
    const media=(item.image?'<img class="memory-media" src="'+escapeHTML(item.image)+'" alt="'+escapeHTML(item.title)+'">':'')+
      (videos.length?'<video class="memory-media" src="'+escapeHTML(videos[0])+'" controls playsinline preload="metadata"></video>':'');
    const playlist=videos.length>1 ? '<div class="actions memory-playlist"><span class="memory-clip-count" role="status">Clip 1 / '+videos.length+'</span><button class="memory-next">Next clip →</button></div>' : "";
    const paragraphs=[item.note].flat().map(note=>'<p>'+escapeHTML(note)+'</p>').join("");
    showDialog('<span class="eyebrow">✦ Cottage keepsake</span><h2>'+escapeHTML(item.heading || item.title)+'</h2>'+media+playlist+paragraphs);
    if(playlist) {
      let index=0;
      const video=content.querySelector("video");
      const next=content.querySelector(".memory-next");
      const counter=content.querySelector(".memory-clip-count");
      next.onclick=()=>{
        if(index+1>=videos.length) return;
        index++;
        video.src=videos[index];
        counter.textContent="Clip "+(index+1)+" / "+videos.length;
        next.disabled=index+1===videos.length;
        video.play().catch(()=>{}); // Native controls remain available if autoplay is blocked.
      };
    }
  }
  if(topping) { selected=topping; renderCake("cake",'[data-topping="'+topping+'"]'); }
});
document.querySelector("#home").onclick=()=>render("garden");
inventory.onclick=()=>{
  showDialog('<h2>Strawberry inventory</h2><p>'+berry+' '+count()+' / 10 collected</p><div class="actions">'+button("Achievements","achievements")+button("Show hints","hints")+'</div>');
};
document.querySelector("#reset").onclick=()=>{
  showDialog('<h2>Reset progress?</h2><p>This clears collected strawberries, achievements, and cake decorations on this browser.</p><button id="confirm-reset">Reset my adventure</button>');
  document.querySelector("#confirm-reset").onclick=()=>{state=empty();save();render("welcome");};
};
const music=document.querySelector("#music");
const sound=document.querySelector("#sound");
let audioContext, musicTimer, phrase=0;
const melody=[392,493.88,587.33,493.88,349.23,440,523.25,440,329.63,392,493.88,392,293.66,349.23,440,349.23];
function playNote() {
  const start=audioContext.currentTime;
  for(const [frequency,volume] of [[melody[phrase],.026],[melody[phrase]/2,.012]]) {
    const oscillator=audioContext.createOscillator();
    const gain=audioContext.createGain();
    oscillator.type="sine"; oscillator.frequency.value=frequency;
    gain.gain.setValueAtTime(0,start);
    gain.gain.linearRampToValueAtTime(volume,start+.04);
    gain.gain.exponentialRampToValueAtTime(.0001,start+.65);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(start); oscillator.stop(start+.66);
  }
  phrase=(phrase+1)%melody.length;
}
if(config.music) music.src=config.music;
sound.onclick=async()=>{
  const playing=sound.getAttribute("aria-pressed")==="true";
  try {
    if(playing) { music.pause(); clearInterval(musicTimer); await audioContext?.suspend(); }
    else if(config.music) await music.play();
    else {
      audioContext ||= new AudioContext();
      await audioContext.resume(); playNote(); musicTimer=setInterval(playNote,460);
    }
    sound.setAttribute("aria-pressed",String(!playing));
    sound.textContent=playing?"♫":"♫ On";
  } catch { notify("The garden music couldn’t start."); }
};
save();
render("welcome",false);

