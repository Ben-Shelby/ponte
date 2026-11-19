/* Ponte — l'appli. Aucune dépendance, aucun appel payant.
   - content/ : articles préparés chaque semaine par la routine Claude
   - js/library.js : contenus fixes (bibliothèque, alphabets)
   - la progression reste dans le navigateur du téléphone (localStorage) */
(function(){
'use strict';

const LIB = window.PONTE_LIB;
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- Icônes ---------- */
const ICON = {
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  chev:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  chevL:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  speaker:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z"/><path d="M15.5 9a4 4 0 010 6M18 6.5a7.5 7.5 0 010 11"/></svg>',
  mic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21"/></svg>',
  stop:'<svg viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="2.5" fill="currentColor"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 6.5C10 5 7 4.5 4 5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5zM12 6.5v13"/></svg>',
  wave:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 11v2M8 8v8M12 5v14M16 8v8M20 11v2"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  bubble:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M4.5 6.5A2.5 2.5 0 017 4h10a2.5 2.5 0 012.5 2.5v7A2.5 2.5 0 0117 16h-6l-4.5 3.5V16H7a2.5 2.5 0 01-2.5-2.5z"/></svg>',
  cup:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 9h11v4a5 5 0 01-5 5h-1a5 5 0 01-5-5zM15.5 10h1.5a2.5 2.5 0 010 5h-1.5M8 3.5v2.5M11.5 3.5v2.5"/></svg>',
  aid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 8v8M8 12h8"/></svg>',
  ball:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 8.2l3.3 2.4-1.3 3.9h-4l-1.3-3.9zM12 8.2V3.5M15.3 10.6l4.4-1.5M14 14.5l2.7 3.8M10 14.5l-2.7 3.8M8.7 10.6L4.3 9.1"/></svg>',
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="4" y="5.5" width="16" height="14" rx="2.5"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/></svg>',
  down:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19.5h14"/></svg>',
  up:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V4M7.5 8.5L12 4l4.5 4.5M5 19.5h14"/></svg>',
  trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12"/></svg>',
  share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V4M8 7.5L12 3.5l4 4M6 11v8.5h12V11"/></svg>',
  arrowUp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
  arrowDown:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>',
  sparkle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3.5l2 5.5 5.5 2-5.5 2-2 5.5-2-5.5-5.5-2 5.5-2z"/></svg>'
};

/* ---------- Arco, la mascotte ---------- */
let arcoN = 0;
const ARCO_BODY = 'M18 106V60a42 42 0 0 1 84 0v46H76V84a16 16 0 0 0-32 0v22z';
function arco(v, size, cls){
  const id = 'arco' + (++arcoN);
  const color = {pt:'var(--arco-pt)', ru:'var(--arco-ru)', ar:'var(--arco-ar)'}[v] || 'var(--arco-pt)';
  let defs = `<clipPath id="${id}c"><path d="${ARCO_BODY}"/></clipPath>`;
  let deco = '', hat = '';
  if(v === 'pt'){
    defs += `<pattern id="${id}p" width="11" height="11" patternUnits="userSpaceOnUse"><g style="fill:#fff" opacity=".6"><circle cx="5.5" cy="2.2" r="1.6"/><circle cx="5.5" cy="8.8" r="1.6"/><circle cx="2.2" cy="5.5" r="1.6"/><circle cx="8.8" cy="5.5" r="1.6"/><circle cx="5.5" cy="5.5" r="1"/></g></pattern>`;
    deco = `<rect x="0" y="74" width="120" height="40" fill="url(#${id}p)" clip-path="url(#${id}c)"/>`;
  }
  if(v === 'ar'){
    defs += `<pattern id="${id}p" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M5 .8L9.2 5 5 9.2.8 5z" style="fill:none;stroke:var(--arco-gold)" stroke-width="1.3"/></pattern>`;
    deco = `<rect x="0" y="74" width="120" height="40" fill="url(#${id}p)" clip-path="url(#${id}c)"/>`;
  }
  if(v === 'ru'){
    hat = `<path d="M31 30C32 10 44 3 60 3s28 7 29 27z" style="fill:var(--arco-fur-dark)"/>
      <ellipse cx="24" cy="44" rx="7" ry="12" style="fill:var(--arco-fur)"/><ellipse cx="96" cy="44" rx="7" ry="12" style="fill:var(--arco-fur)"/>
      <rect x="25" y="24" width="70" height="13" rx="6.5" style="fill:var(--arco-fur)"/>`;
  }
  return `<svg class="arco ${cls || ''}" viewBox="0 0 120 120" width="${size}" height="${size}" aria-hidden="true"><defs>${defs}</defs>
    <ellipse class="arco-shadow" cx="60" cy="114" rx="30" ry="3.5"/>
    <g class="arco-body">
      <path d="${ARCO_BODY}" style="fill:${color};stroke:${color}" stroke-width="5" stroke-linejoin="round"/>
      ${deco}
      <g class="arco-eyes"><ellipse cx="47" cy="49" rx="7.5" ry="8.5" style="fill:#fff"/><ellipse cx="73" cy="49" rx="7.5" ry="8.5" style="fill:#fff"/><circle cx="48.5" cy="50.5" r="3.8" style="fill:#15171C"/><circle cx="74.5" cy="50.5" r="3.8" style="fill:#15171C"/><circle cx="50" cy="48.6" r="1.2" style="fill:#fff"/><circle cx="76" cy="48.6" r="1.2" style="fill:#fff"/></g>
      <path d="M54 60.5q6 5 12 0" style="fill:none;stroke:#15171C" stroke-width="2.6" stroke-linecap="round"/>
      <ellipse cx="37" cy="59" rx="4.5" ry="2.6" style="fill:#FF8F9C" opacity=".45"/><ellipse cx="83" cy="59" rx="4.5" ry="2.6" style="fill:#FF8F9C" opacity=".45"/>
      ${hat}
    </g></svg>`;
}

/* ---------- Dates ---------- */
function iso(d){ return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function todayISO(){ return iso(new Date()); }
function parseISO(s){ const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); }
function addDays(s, n){ const d = parseISO(s); d.setDate(d.getDate() + n); return iso(d); }
function frDate(s, opts){ return parseISO(s).toLocaleDateString('fr-FR', opts || {weekday:'long', day:'numeric', month:'long'}); }
const MONTHS = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];

/* ---------- Progression (reste sur le téléphone) ---------- */
const STORE_KEY = 'ponte.v1';
function freshStore(){ return {started:todayISO(), days:{}, done:{}, deck:{}, ru:{session:0}, tests:{}, validated:{}, arcoLine:0}; }
let store = freshStore();
try{ const raw = localStorage.getItem(STORE_KEY); if(raw) store = Object.assign(freshStore(), JSON.parse(raw)); }catch(e){}
function save(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(store)); }catch(e){} }

function logDay(kind, minutes){
  const t = todayISO();
  const d = store.days[t] || (store.days[t] = {min:0});
  d[kind] = true; d.min = (d.min || 0) + minutes;
  save();
  pingActivity(kind);
}
function streak(){
  let day = todayISO(), n = 0;
  if(!store.days[day]) day = addDays(day, -1);
  while(store.days[day]){ n++; day = addDays(day, -1); }
  return n;
}
const totalMinutes = () => Object.values(store.days).reduce((s, d) => s + (d.min || 0), 0);

/* Révisions espacées : boîtes 0 à 5, un mot est « maîtrisé » à partir de la boîte 3. */
const GAPS = [1, 2, 4, 8, 16, 32];
function addToDeck(g, example, articleId){
  const key = 'pt|' + g.w;
  if(store.deck[key]) return false;
  store.deck[key] = {w:g.w, fr:g.fr, ex:example || '', box:0, due:addDays(todayISO(), 1), added:todayISO(), from:articleId};
  return true;
}
function dueCards(max){
  const t = todayISO();
  const due = Object.entries(store.deck).filter(([, c]) => c.due <= t).map(([k, c]) => Object.assign({key:k}, c));
  due.sort((a, b) => a.due < b.due ? -1 : 1);
  return due.slice(0, max);
}
function gradeCard(key, known){
  const c = store.deck[key]; if(!c) return;
  c.box = known ? Math.min(c.box + 1, 5) : 0;
  c.due = addDays(todayISO(), GAPS[c.box]);
  save();
}
const mastered = () => Object.values(store.deck).filter(c => c.box >= 3).length;

/* ---------- Contenus ---------- */
let CONFIG = {}, INDEX = {days:[], reserve:[]}, TODAY = null, LOADED_ON = null, LOAD_ERROR = false;
async function fetchJSON(path){
  const r = await fetch(path + '?v=' + Date.now(), {cache:'no-store'});
  if(!r.ok) throw new Error(path + ' ' + r.status);
  return r.json();
}
function articlePath(entry){ return entry.reserve ? `content/reserve/${entry.id}.json` : `content/days/${entry.id}.json`; }
async function loadContent(){
  LOAD_ERROR = false;
  LOADED_ON = todayISO();
  try{ CONFIG = await fetchJSON('content/config.json'); }catch(e){ CONFIG = {}; }
  try{ INDEX = await fetchJSON('content/index.json'); }catch(e){ INDEX = {days:[], reserve:[]}; LOAD_ERROR = true; }
  TODAY = null;
  const t = todayISO();
  let entry = (INDEX.days || []).find(d => d.id === t);
  if(!entry){
    const r = (INDEX.reserve || []).find(x => !(store.done[x.id] && store.done[x.id].m))
           || (INDEX.reserve || []).find(x => store.done[x.id] && store.done[x.id].m === t);
    if(r) entry = Object.assign({reserve:true}, r);
  }
  if(entry){
    try{ TODAY = {entry, data: await fetchJSON(articlePath(entry))}; }
    catch(e){ LOAD_ERROR = true; }
  }
}
function bonusEntries(){
  const t = todayISO();
  const past = (INDEX.days || []).filter(d => d.id < t && !(store.done[d.id] && store.done[d.id].m)).reverse();
  const res = (INDEX.reserve || []).filter(r => !(store.done[r.id] && store.done[r.id].m) && (!TODAY || TODAY.entry.id !== r.id)).map(r => Object.assign({reserve:true}, r));
  return past.concat(res);
}

/* Balisage des articles : [[mot affiché|clé du glossaire]] */
const MARK = /\[\[([^|\]]+)\|([^\]]+)\]\]/g;
const plain = (s) => String(s).replace(MARK, '$1');
function markup(s, gloss){
  return esc(s).replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, (m, text, key) => {
    const g = gloss[key];
    if(!g) return text;
    return `<span class="w${g.new ? ' new' : ''}" data-action="word" data-k="${esc(key)}" role="button" tabindex="0">${text}</span>`;
  });
}
function sentences(data){ return (data.paragraphs || []).flat(); }
function exampleFor(data, key){
  const s = sentences(data).find(x => x.pt.includes('|' + key + ']]'));
  return s ? plain(s.pt) : '';
}
const wordCount = (data) => sentences(data).map(s => plain(s.pt)).join(' ').split(/\s+/).filter(Boolean).length;
const newWords = (data) => Object.keys(data.glossary || {}).filter(k => data.glossary[k].new);

/* ---------- Signal d'activité (pour mettre la routine en pause si tu décroches) ---------- */
function pingActivity(kind){
  const a = CONFIG.activity || {};
  if(!a.form_url || !a.field) return;
  try{
    const body = new URLSearchParams();
    body.append(a.field, `${todayISO()} ${kind}`);
    fetch(a.form_url, {method:'POST', mode:'no-cors', body}).catch(() => {});
  }catch(e){}
}

/* ---------- Audio ---------- */
const VOICE_NAME = {pt:'portugaise', ru:'russe', ar:'arabe'};
function speak(text, lang){
  const synth = window.speechSynthesis;
  if(!synth || typeof SpeechSynthesisUtterance === 'undefined'){ toast('La lecture audio n’est pas disponible sur cet appareil.'); return; }
  try{
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang; u.rate = 0.88;
    const voices = synth.getVoices();
    const norm = (l) => (l || '').replace('_', '-').toLowerCase();
    const v = voices.find(x => norm(x.lang) === lang.toLowerCase()) || voices.find(x => norm(x.lang).startsWith(lang.slice(0, 2)));
    if(v) u.voice = v;
    else if(voices.length) toast(`Pas de voix ${VOICE_NAME[lang.slice(0, 2)] || ''} sur cet appareil.`);
    synth.speak(u);
  }catch(err){ toast('La lecture audio n’est pas disponible ici.'); }
}
try{ if(window.speechSynthesis) window.speechSynthesis.getVoices(); }catch(err){}

/* Reconnaissance vocale de l'appareil (gratuite). Repli : champ texte + micro du clavier. */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = null;
function startListening(lang, onText, onEnd){
  if(!SR) return false;
  try{
    rec = new SR();
    rec.lang = lang; rec.interimResults = true; rec.continuous = false; rec.maxAlternatives = 1;
    let text = '';
    rec.onresult = (e) => { text = Array.from(e.results).map(r => r[0].transcript).join(' '); onText(text); };
    rec.onerror = (e) => { rec = null; onEnd(text, e.error || 'error'); };
    rec.onend = () => { if(rec){ rec = null; onEnd(text, null); } };
    rec.start();
    return true;
  }catch(e){ rec = null; return false; }
}
function stopListening(){ try{ if(rec) rec.stop(); }catch(e){} }

/* Comparaison simple de phrases, sans IA : mots communs, accents ignorés. */
function tokens(s){ return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).filter(Boolean); }
function keywordHits(answer, keywords){
  const t = tokens(answer);
  return (keywords || []).map(k => { const kk = tokens(k)[0] || ''; return {k, hit: t.some(x => x === kk || (kk.length > 4 && x.startsWith(kk.slice(0, kk.length - 1))))}; });
}
function similarity(said, model){
  const s = new Set(tokens(said)), m = tokens(model);
  if(!m.length) return 0;
  return m.filter(x => s.has(x)).length / m.length;
}
function highlight(model, said){
  const s = new Set(tokens(said));
  return esc(model).split(/(\s+)/).map(part => {
    const t = tokens(part)[0];
    if(!t) return part;
    return s.has(t) ? `<span class="hit">${part}</span>` : `<span class="miss">${part}</span>`;
  }).join('');
}

/* ---------- État de l'interface ---------- */
const state = {
  tab:'today', flow:null,
  article:null, steps:[], stepIdx:0, review:{cards:[], i:0, shown:false}, cloze:{i:0, picked:null, score:0, orders:[]},
  addedNow:new Set(), newAdded:0, showTr:false,
  oral:{phase:'ask', mode:'voice', answer:'', live:'', repeat:'', score:0},
  alpha:{words:[], i:0, shown:false, finished:false, known:new Set(), review:false},
  test:{items:[], i:0, picked:null, score:0, finished:false, official:false, month:''},
  lib:{lang:null, view:null}
};
function shuffle(a){ const b = a.slice(); for(let i = b.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

/* ---------- Petits composants ---------- */
function flowbar(total, doneCount, partial){
  let segs = '';
  for(let i = 0; i < total; i++){
    const p = i < doneCount ? 1 : (i === doneCount ? partial : 0);
    segs += `<span class="seg"><i style="transform:scaleX(${p})"></i></span>`;
  }
  return `<div class="flowbar"><button class="icon-btn" data-action="close" aria-label="Fermer">${ICON.x}</button><div class="segs">${segs}</div></div>`;
}
function doneHead(v, title, text){
  return `<div class="done-arco">${arco(v, 96, 'cheer')}<span class="done-badge">${ICON.check}</span></div><h2>${title}</h2><p>${text}</p>`;
}
function ruKnownBefore(session){
  const k = new Set();
  LIB.RU_SESSIONS.slice(0, session).flat().forEach(w => [...w.cy.toLowerCase()].forEach(ch => k.add(ch)));
  return k;
}
const lettersKnown = () => ruKnownBefore(store.ru.session || 0).size;

/* ---------- Écran : Aujourd'hui ---------- */
function todayHTML(){
  const t = todayISO();
  const head = `<div class="eyebrow">${frDate(t)}</div>
  <div class="titlebar"><h1 class="large">Aujourd’hui</h1><div class="streak"><b>${streak()}</b> jour${streak() > 1 ? 's' : ''} de suite</div></div>`;
  if(!TODAY){
    return `${head}${arcoGreeting(false, false)}
      <div class="pcard"><div class="pname">L’article du jour n’a pas pu être chargé</div>
      <p class="pnote">${LOAD_ERROR ? 'Vérifie ta connexion, puis réessaie.' : 'Aucun article n’est prêt pour aujourd’hui.'}</p>
      <button class="btn btn-secondary" data-action="reload">Réessayer</button></div>
      ${extrasHTML()}`;
  }
  const d = TODAY.data, done = store.done[d.id] || {};
  const m = !!done.m, e = !!done.e;
  const detente = d.kind === 'detente';
  return `${head}${arcoGreeting(m, e)}
  ${TODAY.entry.reserve ? '<div class="notice">Pas de nouvel article aujourd’hui : voici un article de réserve.</div>' : ''}
  <div class="stack">
    <button class="lesson" data-action="start-morning">
      <span class="lesson-meta"><span class="tile">${detente ? ICON.cup : ICON.book}</span><span class="time">08:00</span><span>${detente ? 'Détente' : 'Lecture'} · 4 min</span></span>
      <span class="lesson-title">${esc(d.title.fr)}</span>
      <span class="lesson-sub">Un article court en portugais, à ton niveau. ${newWords(d).length} mots nouveaux, puis un texte à trous.</span>
      ${m ? `<span class="lesson-cta done"><span>Fait · relire l’article</span>${ICON.check}</span>` : `<span class="lesson-cta"><span>Commencer</span>${ICON.chev}</span>`}
    </button>
    <button class="lesson" data-action="start-evening">
      <span class="lesson-meta"><span class="tile">${ICON.wave}</span><span class="time">18:30</span><span>Oral · 2 min</span></span>
      <span class="lesson-title">${detente ? 'Une petite scène, à voix haute' : 'Une question, une réponse à voix haute'}</span>
      <span class="lesson-sub">Sur l’article du matin. Tu compares ta réponse à la réponse modèle, puis tu la redis.</span>
      ${e ? `<span class="lesson-cta done"><span>Fait</span>${ICON.check}</span>` : `<span class="lesson-cta${m ? '' : ' soft'}"><span>${m ? 'Faire maintenant' : 'Mieux après la lecture du matin'}</span>${ICON.chev}</span>`}
    </button>
  </div>
  ${extrasHTML()}
  ${m && bonusEntries().length ? '<button class="more" data-action="bonus">Envie d’en faire plus ? Un autre article est prêt.</button>' : ''}`;
}
function arcoGreeting(m, e){
  let line = LIB.ARCO_LINES[(store.arcoLine || 0) % LIB.ARCO_LINES.length];
  if(m && e) line = {pt:'Muito bem! Até amanhã.', fr:'Très bien ! À demain.'};
  else if(m) line = {pt:'Muito bem! Até logo.', fr:'Très bien ! À tout à l’heure.'};
  return `<button class="arco-card" data-action="arco" aria-label="Arco, touche pour l’entendre">${arco('pt', 62, '')}
    <span class="bubble"><span class="bubble-pt" lang="pt-PT" id="arco-say">${esc(line.pt)}</span><span class="bubble-fr" id="arco-fr">${esc(line.fr)}</span></span></button>`;
}
function extrasHTML(){
  const s = store.ru.session || 0, doneToday = store.days[todayISO()] && store.days[todayISO()].a;
  const next = (INDEX.days || []).find(d => d.id > todayISO());
  return `<div class="section-label">En plus</div>
  <div class="group">
    <button class="row" data-action="start-alpha">
      <span class="tile" lang="ru">Аб</span>
      <span class="row-main"><span class="row-title">Alphabet cyrillique</span><span class="row-sub">2 min · ${lettersKnown()} lettres sur 33${s >= LIB.RU_SESSIONS.length ? ' · révision' : ''}</span></span>
      ${doneToday ? '<span class="tag good">Fait</span>' : `<span class="chev">${ICON.chev}</span>`}
    </button>
  </div>
  ${next ? `<div class="section-label">${next.id === addDays(todayISO(), 1) ? 'Demain' : frDate(next.id, {weekday:'long', day:'numeric'})}${next.kind === 'detente' ? ', version détente' : ''}</div>
  <div class="group"><div class="row static"><span class="tile">${next.kind === 'detente' ? ICON.cup : ICON.book}</span>
    <span class="row-main"><span class="row-title" lang="pt-PT">${esc(next.title.pt)}</span><span class="row-sub">${esc(next.title.fr)}</span></span></div></div>` : ''}`;
}

/* ---------- Parcours du matin ---------- */
function startMorning(article){
  closeSheet();
  state.article = article;
  state.review = {cards:dueCards(5), i:0, shown:false};
  state.steps = (state.review.cards.length ? ['review'] : []).concat(['read', 'cloze', 'done']);
  state.stepIdx = 0;
  state.cloze = {i:0, picked:null, score:0, orders:(article.data.cloze || []).map(c => shuffle(c.options))};
  state.addedNow = new Set(); state.newAdded = 0; state.showTr = false;
  state.flow = 'morning';
  render();
}
function nextStep(){ state.stepIdx++; render(); }
function morningHTML(){
  const step = state.steps[state.stepIdx], total = state.steps.length - 1, d = state.article.data;
  if(step === 'review'){
    const r = state.review, c = r.cards[r.i];
    return `${flowbar(total, state.stepIdx, r.i / r.cards.length)}
    <div class="eyebrow">Révision · ${r.i + 1} sur ${r.cards.length}</div>
    <div class="flashcard">
      <div class="row-sub">Ajouté le ${frDate(c.added, {day:'numeric', month:'long'})}</div>
      <div class="spacer"></div>
      <div class="fc-word" lang="pt-PT"><span>${esc(c.w)}</span><button class="icon-btn" data-action="speak" data-text="${esc(c.w)}" data-lang="pt-PT" aria-label="Écouter">${ICON.speaker}</button></div>
      ${r.shown ? `<div class="fc-answer">${esc(c.fr)}${c.ex ? `<small lang="pt-PT">${esc(c.ex)}</small>` : ''}</div>` : '<div class="fc-hint">Tu te souviens du sens ?</div>'}
      <div class="spacer"></div>
    </div>
    <div class="cta-bar">${r.shown
      ? '<div class="btn-row"><button class="btn btn-secondary" data-action="grade" data-v="0">À revoir</button><button class="btn btn-primary" data-action="grade" data-v="1">Je savais</button></div>'
      : '<button class="btn btn-primary" data-action="reveal">Afficher le sens</button>'}</div>`;
  }
  if(step === 'read'){
    const paras = d.paragraphs || [];
    const body = state.showTr
      ? paras.flat().map(s => `<div class="pair"><p>${markup(s.pt, d.glossary)}</p><p class="tr">${esc(s.fr)}</p></div>`).join('')
      : paras.map(p => `<p>${p.map(s => markup(s.pt, d.glossary)).join(' ')}</p>`).join('');
    return `${flowbar(total, state.stepIdx, .5)}
    <div class="src"><span class="tag accent">${esc(d.theme)}</span><span>niveau ${esc(d.level || 'A1')} · ${wordCount(d)} mots</span></div>
    <h2 class="article-title" lang="pt-PT">${esc(d.title.pt)}</h2>
    <div class="tools">
      <button class="chip" data-action="speak-article">${ICON.speaker}Écouter</button>
      <button class="chip" data-action="toggle-tr" aria-pressed="${state.showTr}">Traduction</button>
    </div>
    <div class="article" lang="pt-PT">${body}</div>
    <div class="legend"><span><i></i>Mot nouveau</span><span><i class="dotted"></i>Touche un mot pour le traduire</span></div>
    ${d.source && d.source.url ? `<div class="source">Source : <a href="${esc(d.source.url)}" target="_blank" rel="noopener">${esc(d.source.name || d.source.url)}</a></div>` : ''}
    <div class="cta-bar"><button class="btn btn-primary" data-action="read-done">J’ai lu, continuer</button></div>`;
  }
  if(step === 'cloze'){
    const c = state.cloze, q = d.cloze[c.i], opts = c.orders[c.i], answered = c.picked !== null, right = answered && opts[c.picked] === q.answer;
    const buttons = opts.map((o, i) => {
      let cls = '';
      if(answered){ if(o === q.answer) cls = 'ok'; else if(i === c.picked) cls = 'ko'; }
      const ic = cls === 'ok' ? ICON.check : cls === 'ko' ? ICON.x : '';
      return `<button class="opt ${cls}" data-action="pick" data-i="${i}" ${answered ? 'disabled' : ''} lang="pt-PT"><span>${esc(o)}</span>${ic}</button>`;
    }).join('');
    return `${flowbar(total, state.stepIdx, (c.i + (answered ? 1 : 0)) / d.cloze.length)}
    <div class="eyebrow">Texte à trous · ${c.i + 1} sur ${d.cloze.length}</div>
    <p class="cloze-sentence" lang="pt-PT">${esc(q.before)} <span class="blank${answered ? ' ok' : ''}">${answered ? esc(q.answer) : '&nbsp;'}</span>${/^[.,!?;:]/.test(q.after || '') ? '' : ' '}${esc(q.after)}</p>
    <div class="options">${buttons}</div>
    ${answered ? `<div class="explain ${right ? 'good' : 'bad'}"><b>${right ? 'Juste' : 'Pas tout à fait'}</b>${esc(q.why)}</div>
    <div class="cta-bar"><button class="btn btn-primary" data-action="cloze-next">${c.i < d.cloze.length - 1 ? 'Continuer' : 'Terminer'}</button></div>` : ''}`;
  }
  return `<div class="done">
    ${doneHead('pt', 'Matin terminé', 'Rendez-vous ce soir pour l’oral. Il porte sur cet article.')}
    <div class="stats">
      <div class="stat"><b>${state.newAdded}</b><span>mots ajoutés</span></div>
      <div class="stat"><b>${state.cloze.score}/${d.cloze.length}</b><span>texte à trous</span></div>
      <div class="stat"><b>${streak()}</b><span>jour${streak() > 1 ? 's' : ''} de suite</span></div>
    </div>
    <button class="btn btn-primary" data-action="finish">Retour à Aujourd’hui</button>
  </div>`;
}
function finishMorning(){
  const d = state.article.data;
  let n = 0;
  newWords(d).forEach(k => { if(addToDeck(d.glossary[k], exampleFor(d, k), d.id)) n++; });
  state.addedNow.forEach(k => { if(!d.glossary[k].new && addToDeck(d.glossary[k], exampleFor(d, k), d.id)) n++; });
  state.newAdded = n;
  const firstTime = !(store.done[d.id] && store.done[d.id].m);
  store.done[d.id] = Object.assign(store.done[d.id] || {}, {m: (store.done[d.id] && store.done[d.id].m) || todayISO(), title:d.title, theme:d.theme, kind:d.kind});
  save();
  if(firstTime) logDay('m', 4); else save();
}

/* ---------- Parcours du soir : oral guidé ---------- */
function startEvening(){
  if(!TODAY){ toast('L’article du jour n’est pas chargé.'); return; }
  closeSheet();
  state.article = TODAY;
  state.oral = {phase:'ask', mode: SR ? 'voice' : 'text', answer:'', live:'', repeat:'', score:0};
  state.flow = 'evening';
  render();
}
function eveningHTML(){
  const o = state.oral, d = state.article.data, q = d.oral;
  const prog = {ask:.15, listen:.3, review:.55, repeat:.75, 'repeat-listen':.8, result:.95}[o.phase] || 0;
  const top = flowbar(1, 0, prog);
  const question = `<div class="question">
    <div class="q-pt" lang="pt-PT"><span>${esc(q.question.pt)}</span><button class="icon-btn" data-action="speak" data-text="${esc(q.question.pt)}" data-lang="pt-PT" aria-label="Écouter la question">${ICON.speaker}</button></div>
    <div class="q-fr">${esc(q.question.fr)}</div>
    <div class="help">Réponds par une phrase complète. Pour démarrer : <em lang="pt-PT">${esc(q.starter)}</em></div>
  </div>`;
  if(o.phase === 'ask' || o.phase === 'listen'){
    return `${top}<div class="eyebrow">Défi oral</div>${question}${answerZone('Touche pour répondre', 'Écris ta réponse, ou dicte-la avec le micro du clavier.', 'submit-answer', o.phase === 'listen')}`;
  }
  if(o.phase === 'review'){
    const hits = keywordHits(o.answer, q.keywords), n = hits.filter(h => h.hit).length;
    return `${top}
    <div class="eyebrow">Ta réponse</div>
    <p class="heard" lang="pt-PT">${esc(o.answer)}</p>
    <div class="eyebrow">Réponse modèle</div>
    <div class="fixed-row"><p class="compare" lang="pt-PT">${highlight(q.model.pt, o.answer)}</p><button class="icon-btn" data-action="speak" data-text="${esc(q.model.pt)}" data-lang="pt-PT" aria-label="Écouter la réponse modèle">${ICON.speaker}</button></div>
    <p class="pnote" style="margin:-8px 0 14px">${esc(q.model.fr)}</p>
    <div class="pills">${hits.map(h => `<span class="pill ${h.hit ? 'good' : 'bad'}">${esc(h.k)}</span>`).join('')}</div>
    <p class="pnote">${n === hits.length ? 'Tous les mots clés y sont.' : `${n} mot${n > 1 ? 's' : ''} clé${n > 1 ? 's' : ''} sur ${hits.length}. Compare avec la réponse modèle.`}</p>
    ${q.tip ? `<div class="explain"><b>${esc(q.tip.title)}</b>${esc(q.tip.text)}</div>` : ''}
    <div class="cta-bar"><div class="btn-stack">
      <button class="btn btn-primary" data-action="to-repeat">${ICON.mic}Redire la réponse modèle</button>
      <button class="btn btn-secondary" data-action="ask-claude">${ICON.sparkle}Faire corriger par Claude</button>
    </div></div>`;
  }
  if(o.phase === 'repeat' || o.phase === 'repeat-listen'){
    return `${top}<div class="eyebrow">À toi</div>
    <div class="question"><div class="q-pt" lang="pt-PT"><span>${esc(q.model.pt)}</span><button class="icon-btn" data-action="speak" data-text="${esc(q.model.pt)}" data-lang="pt-PT" aria-label="Écouter">${ICON.speaker}</button></div><div class="q-fr">Lis cette phrase à voix haute.</div></div>
    ${answerZone('Touche et lis la phrase', 'Dicte la phrase avec le micro du clavier.', 'submit-repeat', o.phase === 'repeat-listen')}`;
  }
  const ok = o.score >= .75;
  return `${top}
    <div class="done">
      ${ok ? doneHead('pt', 'C’est juste', 'Ta phrase correspond à la réponse modèle. Journée terminée.') : `<div class="done-arco">${arco('pt', 96, 'hop')}</div><h2>Presque</h2><p>Les mots en rouge n’ont pas été reconnus. Écoute la phrase, puis réessaie.</p>`}
      <p class="compare" lang="pt-PT">${highlight(q.model.pt, o.repeat)}</p>
      <div class="btn-stack">
        ${ok ? '' : '<button class="btn btn-secondary" data-action="to-repeat">Réessayer</button>'}
        <button class="btn btn-primary" data-action="evening-done">Terminer</button>
      </div>
    </div>`;
}
function answerZone(voiceLabel, textLabel, submitAction, listening){
  const o = state.oral;
  if(o.mode === 'voice'){
    if(listening){
      return `<div class="mic-zone"><div class="live" lang="pt-PT" id="live">${esc(o.live) || '…'}</div><button class="mic rec" data-action="mic-stop" aria-label="Arrêter">${ICON.stop}</button><div class="mic-label">Je t’écoute. Touche pour arrêter.</div></div>`;
    }
    return `<div class="mic-zone"><button class="mic" data-action="mic-start" data-then="${submitAction}" aria-label="Parler">${ICON.mic}</button><div class="mic-label">${voiceLabel}</div><button class="linkbtn" data-action="mode-text">Écrire plutôt</button></div>`;
  }
  return `<div class="mic-zone" style="align-items:stretch">
    <textarea class="answer-box" id="answer" lang="pt-PT" rows="3" placeholder="${esc(textLabel)}" autocapitalize="sentences"></textarea>
    <button class="btn btn-primary" data-action="${submitAction}">Valider</button>
    ${SR ? '<button class="linkbtn" data-action="mode-voice">Parler plutôt</button>' : ''}
  </div>`;
}
function onSpoken(then, text){
  text = (text || '').trim();
  if(!text){ toast('Je n’ai rien entendu. Réessaie, ou écris ta réponse.'); state.oral.phase = then === 'submit-answer' ? 'ask' : 'repeat'; render(); return; }
  submitOral(then, text);
}
function submitOral(action, text){
  const o = state.oral, q = state.article.data.oral;
  if(action === 'submit-answer'){ o.answer = text; o.phase = 'review'; }
  else { o.repeat = text; o.score = similarity(text, q.model.pt); o.phase = 'result'; }
  render();
}
function askClaude(){
  const q = state.article.data.oral, o = state.oral;
  const prompt = `J’apprends le portugais du Portugal (niveau débutant, A1). Corrige ma réponse à la question « ${q.question.pt} » : « ${o.answer} ». Explique simplement, en français, mes erreurs de grammaire et de conjugaison, puis donne-moi la version correcte.`;
  try{ navigator.clipboard.writeText(prompt).catch(() => {}); }catch(e){}
  window.open('https://claude.ai/new?q=' + encodeURIComponent(prompt), '_blank');
  toast('Message copié : si Claude s’ouvre vide, colle-le.');
}
function finishEvening(){
  const d = state.article.data;
  const firstTime = !(store.done[d.id] && store.done[d.id].e);
  store.done[d.id] = Object.assign(store.done[d.id] || {title:d.title, theme:d.theme, kind:d.kind}, {e:todayISO()});
  save();
  if(firstTime) logDay('e', 2);
}

/* ---------- Alphabet cyrillique ---------- */
function startAlpha(){
  closeSheet();
  const s = store.ru.session || 0, review = s >= LIB.RU_SESSIONS.length;
  const words = review ? shuffle(LIB.RU_SESSIONS.flat()).slice(0, 4) : LIB.RU_SESSIONS[s];
  state.alpha = {words, i:0, shown:false, finished:false, known: review ? ruKnownBefore(LIB.RU_SESSIONS.length) : ruKnownBefore(s), review};
  state.flow = 'alpha';
  render();
}
function alphaHTML(){
  const a = state.alpha;
  if(a.finished){
    const known = lettersKnown();
    const fresh = a.review ? [] : [...new Set(a.words.flatMap(w => [...w.cy.toLowerCase()]))].filter(ch => !a.known.has(ch));
    return `<div class="done">
      ${doneHead('ru', a.review ? 'Révision faite' : `${fresh.length} nouvelle${fresh.length > 1 ? 's' : ''} lettre${fresh.length > 1 ? 's' : ''}`, a.review ? 'Tu connais les 33 lettres. Les mots reviennent au hasard pour t’entraîner.' : `<span lang="ru">${fresh.join(', ')}</span>. Tu en connais maintenant ${known} sur 33.`)}
      <div class="pcard"><div class="bar-legend flush"><span>Alphabet cyrillique</span><span>${known} / 33</span></div><div class="bar"><i style="width:${(known / 33 * 100).toFixed(1)}%"></i></div></div>
      <button class="btn btn-primary" data-action="finish">Retour à Aujourd’hui</button>
    </div>`;
  }
  const x = a.words[a.i];
  const letters = [...x.cy].map(ch => { const l = ch.toLowerCase(); return `<div class="letter${a.known.has(l) ? '' : ' new'}"><b lang="ru">${ch}</b><span>${esc(LIB.RU_SOUND[l] || '')}</span></div>`; }).join('');
  const back = a.shown
    ? `<div class="translit">${esc(x.tr)}</div><div class="meaning">${esc(x.fr)}</div><div class="letters">${letters}</div>${x.note ? `<div class="note">${esc(x.note)}</div>` : ''}`
    : `<div class="cyr-hint">Devine comment ça se lit, puis retourne la carte. ${esc(x.hint)}</div>`;
  return `${flowbar(a.words.length, a.i, a.shown ? .6 : .15)}
    <div class="eyebrow">Alphabet cyrillique · ${a.i + 1} sur ${a.words.length}</div>
    <div class="flashcard alpha"><div class="cyr-word" lang="ru">${x.cy}</div>${back}</div>
    <div class="cta-bar">${a.shown
      ? `<button class="btn btn-primary" data-action="alpha-next">${a.i < a.words.length - 1 ? 'Suivant' : 'Terminer'}</button>`
      : `<div class="btn-row"><button class="btn btn-secondary" data-action="speak" data-text="${x.cy}" data-lang="ru-RU">${ICON.speaker}Écouter</button><button class="btn btn-primary" data-action="alpha-flip">Retourner</button></div>`}</div>`;
}
function finishAlpha(){
  if(!state.alpha.review) store.ru.session = Math.min((store.ru.session || 0) + 1, LIB.RU_SESSIONS.length);
  save();
  if(!(store.days[todayISO()] && store.days[todayISO()].a)) logDay('a', 2);
}

/* ---------- Bilan du mois ---------- */
function testInfo(){
  const t = todayISO(), day = parseISO(t).getDate();
  const prev = new Date(parseISO(t).getFullYear(), parseISO(t).getMonth() - 1, 1);
  const official = day <= 7, monthKey = official ? iso(prev).slice(0, 7) : t.slice(0, 7);
  const monthName = MONTHS[Number(monthKey.slice(5, 7)) - 1];
  return {official, monthKey, monthName, done: store.tests[monthKey]};
}
function startTest(){
  const info = testInfo();
  let pool = Object.values(store.deck).filter(c => c.added.slice(0, 7) === info.monthKey);
  if(pool.length < 8) pool = Object.values(store.deck);
  if(pool.length < 4){ toast('Il faut au moins 4 mots dans tes révisions.'); return; }
  const picked = shuffle(pool).slice(0, 12);
  const all = Object.values(store.deck).map(c => c.fr);
  const fallback = ['la maison','le travail','la ville','le temps','la mer','le soir','l’ami','la rue'];
  const items = picked.map(c => {
    const wrong = shuffle([...new Set(all.concat(fallback))].filter(f => f !== c.fr)).slice(0, 3);
    return {w:c.w, answer:c.fr, options:shuffle(wrong.concat([c.fr]))};
  });
  state.test = {items, i:0, picked:null, score:0, finished:false, official:info.official, month:info.monthKey, monthName:info.monthName};
  state.flow = 'test';
  render();
}
function testHTML(){
  const s = state.test;
  if(s.finished){
    const pct = Math.round(s.score / s.items.length * 100), ok = pct >= 70;
    return `<div class="done">
      ${doneHead('pt', `${s.score} sur ${s.items.length}`, s.official
        ? (ok ? `Bilan de ${s.monthName} réussi (${pct} %). Les articles du mois passent en « Validé » dans la Bibliothèque.` : `${pct} %. Il faut 70 % pour valider le mois : les mots ratés reviennent dans tes révisions.`)
        : `${pct} % à ce bilan d’entraînement. Le vrai bilan a lieu la première semaine du mois.`)}
      <button class="btn btn-primary" data-action="finish">Retour</button>
    </div>`;
  }
  const q = s.items[s.i], answered = s.picked !== null;
  const buttons = q.options.map((o, i) => {
    let cls = 'ui';
    if(answered){ if(o === q.answer) cls += ' ok'; else if(i === s.picked) cls += ' ko'; }
    return `<button class="opt ${cls}" data-action="test-pick" data-i="${i}" ${answered ? 'disabled' : ''}><span>${esc(o)}</span></button>`;
  }).join('');
  return `${flowbar(s.items.length, s.i, answered ? 1 : 0)}
    <div class="eyebrow">${s.official ? `Bilan de ${s.monthName}` : 'Bilan d’entraînement'} · ${s.i + 1} sur ${s.items.length}</div>
    <div class="question"><div class="q-pt" lang="pt-PT"><span>${esc(q.w)}</span><button class="icon-btn" data-action="speak" data-text="${esc(q.w)}" data-lang="pt-PT" aria-label="Écouter">${ICON.speaker}</button></div><div class="q-fr">Que veut dire ce mot ?</div></div>
    <div class="options" style="margin-top:16px">${buttons}</div>
    ${answered ? `<div class="cta-bar"><button class="btn btn-primary" data-action="test-next">${s.i < s.items.length - 1 ? 'Continuer' : 'Voir le résultat'}</button></div>` : ''}`;
}
function finishTest(){
  const s = state.test;
  if(!s.official) return;
  const pct = s.score / s.items.length;
  store.tests[s.month] = {score:Math.round(pct * 100), date:todayISO()};
  if(pct >= .7) Object.entries(store.done).forEach(([id, d]) => { if(d.m && d.m.slice(0, 7) === s.month) store.validated[id] = true; });
  save();
}

/* ---------- Bibliothèque ---------- */
const LANGS = {
  pt:{name:'Portugais', native:'Português', variant:'du Portugal', code:'pt-PT', voice:'pt-PT', alphaTile:'Ãç', alphaTitle:'Les sons du portugais',
      alphaSub:() => 'Même alphabet que le français, 10 sons à connaître', status:() => `Focus · ${mastered()} mot${mastered() > 1 ? 's' : ''} maîtrisé${mastered() > 1 ? 's' : ''}`},
  ru:{name:'Russe', native:'Русский', variant:'', code:'ru', voice:'ru-RU', alphaTile:'Аб', alphaTitle:'L’alphabet cyrillique',
      alphaSub:() => `${lettersKnown()} lettres connues sur 33`, status:() => `Alphabet ${lettersKnown()} / 33 · ${nextLabel('ru')}`},
  ar:{name:'Arabe', native:'العربية', variant:'arabe standard', code:'ar', voice:'ar-SA', alphaTile:'أب', alphaTitle:'L’alphabet arabe',
      alphaSub:() => '28 lettres, en aperçu', status:() => `Aperçu · ${nextLabel('ar')}`}
};
function nextLabel(code){
  const i = langQueue().indexOf(code);
  return i === 0 ? 'focus en février' : i > 0 ? `${i + 1}ᵉ dans ta liste` : 'hors de ta liste';
}
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
function nativeHTML(k){
  const l = LANGS[k];
  return k === 'ar' ? `<span class="native-ar" lang="ar" dir="rtl">${l.native}</span>` : `<span lang="${l.code}">${l.native}</span>`;
}
function libraryHTML(){
  const L = state.lib;
  if(!L.lang) return libRootHTML();
  if(!L.view) return langHomeHTML(L.lang);
  if(L.view === 'alpha') return alphaRefHTML(L.lang);
  return phrasesHTML(L.lang, L.view);
}
function libRootHTML(){
  return `<h1 class="large screen-title">Bibliothèque</h1>
  <p class="lead">L’essentiel pour te débrouiller, l’alphabet, et tout ce que tu as déjà travaillé.</p>
  ${['pt', 'ru', 'ar'].map(k => `<button class="lang-card" data-action="lib-lang" data-l="${k}">${arco(k, 58, 'still')}
      <span class="row-main"><span class="lang-name">${LANGS[k].name}</span><span class="lang-native">${nativeHTML(k)}</span><span class="lang-status">${LANGS[k].status()}</span></span>
      <span class="chev">${ICON.chev}</span></button>`).join('')}`;
}
function langHomeHTML(k){
  const l = LANGS[k];
  const cats = LIB.CATS.map(c => `<button class="row" data-action="lib-view" data-v="${c.id}"><span class="tile">${ICON[c.icon]}</span><span class="row-main"><span class="row-title">${c.label}</span><span class="row-sub">${c.sub}</span></span><span class="count">${LIB.PHRASES[k][c.id].length}</span><span class="chev">${ICON.chev}</span></button>`).join('');
  return `<button class="back" data-action="lib-back">${ICON.chevL}<span>Bibliothèque</span></button>
  <div class="lang-hero">${arco(k, 78, '')}<div><h1 class="large">${l.name}</h1><div class="lang-native">${nativeHTML(k)}${l.variant ? ' · ' + l.variant : ''}</div></div></div>
  <div class="section-label">Lire et prononcer</div>
  <div class="group"><button class="row" data-action="lib-view" data-v="alpha"><span class="tile${k === 'ar' ? ' ar-tile' : ''}" lang="${l.code}">${l.alphaTile}</span><span class="row-main"><span class="row-title">${l.alphaTitle}</span><span class="row-sub">${l.alphaSub()}</span></span><span class="chev">${ICON.chev}</span></button></div>
  <div class="section-label">L’essentiel</div>
  <div class="group">${cats}</div>
  <div class="section-label">Avancé · thèmes travaillés</div>
  ${advHTML(k)}`;
}
function advHTML(k){
  if(k === 'pt'){
    const items = Object.entries(store.done).filter(([, d]) => d.m).sort((a, b) => a[1].m < b[1].m ? 1 : -1);
    if(!items.length) return `<div class="group"><div class="empty">${arco('pt', 48, 'still')}<span>Les articles que tu termines apparaîtront ici. Après chaque bilan mensuel réussi, ils passent en « Validé ».</span></div></div>`;
    return `<div class="group plain">${items.map(([id, d]) => `<div class="row static"><span class="row-main"><span class="adv-title" lang="pt-PT">${esc(d.title.pt)}</span><span class="row-sub">${esc(d.title.fr)} · ${esc(d.theme)}</span></span>${store.validated[id] ? '<span class="tag good">Validé</span>' : '<span class="tag">Lu</span>'}</div>`).join('')}</div>`;
  }
  return `<div class="group"><div class="empty">${arco(k, 48, 'still')}<span>Tes thèmes apparaîtront ici dès tes premiers articles en ${k === 'ru' ? 'russe' : 'arabe'}.</span></div></div>`;
}
function phrasesHTML(k, catId){
  const l = LANGS[k], c = LIB.CATS.find(x => x.id === catId), list = LIB.PHRASES[k][catId], rtl = k === 'ar';
  const callout = k === 'ar'
    ? '<div class="callout"><b>Arabe standard, voyelles notées.</b> Les phrases s’adressent à un homme ; pour une femme, la fin change. ḥ : h soufflé fort · ʿ : son de gorge · ṭ, ḍ, ṣ : sons appuyés.</div>'
    : k === 'ru' ? '<div class="callout">L’accent ´ montre la syllabe à appuyer. Il n’apparaît pas dans les vrais textes russes.</div>' : '';
  return `<button class="back" data-action="lib-back">${ICON.chevL}<span>${l.name}</span></button>
  <h1 class="large screen-title">${c.label}</h1>${callout}
  <div class="phrase-list">${list.map(p => `
    <div class="phrase">
      <div class="phrase-fr">${esc(p.fr)}</div>
      <div class="phrase-row${rtl ? ' rtl' : ''}"><span class="phrase-t${rtl ? ' ar-text' : ''}" lang="${l.code}"${rtl ? ' dir="rtl"' : ''}>${esc(p.t)}</span><button class="icon-btn" data-action="speak" data-text="${esc(p.t.replace(/́/g, ''))}" data-lang="${l.voice}" aria-label="Écouter">${ICON.speaker}</button></div>
      ${p.tr ? `<div class="phrase-tr">${esc(p.tr)}</div>` : ''}
      ${p.note ? `<div class="phrase-note">${esc(p.note)}</div>` : ''}
    </div>`).join('')}</div>`;
}
function alphaRefHTML(k){
  const l = LANGS[k];
  const back = `<button class="back" data-action="lib-back">${ICON.chevL}<span>${l.name}</span></button>`;
  if(k === 'pt'){
    return `${back}<h1 class="large screen-title">Les sons du portugais</h1>
    <div class="callout">Même alphabet que le français. Ces dix sons font toute la différence. Touche le haut-parleur pour entendre l’exemple.</div>
    <div class="group">${LIB.SOUNDS_PT.map(s => `<div class="sound"><b lang="pt-PT">${s[0]}</b><span class="sound-main"><span class="sound-hint">Se dit ${s[1]}</span><span class="sound-ex"><span lang="pt-PT">${s[2]}</span> · ${s[3]}</span></span><button class="icon-btn" data-action="speak" data-text="${s[2]}" data-lang="pt-PT" aria-label="Écouter ${s[2]}">${ICON.speaker}</button></div>`).join('')}</div>`;
  }
  if(k === 'ru'){
    const known = ruKnownBefore(store.ru.session || 0);
    return `${back}<h1 class="large screen-title">L’alphabet cyrillique</h1>
    <div class="callout"><b>${known.size} lettre${known.size > 1 ? 's' : ''} connue${known.size > 1 ? 's' : ''} sur 33</b>, en bleu. Pièges : <span lang="ru">В</span> se lit v, <span lang="ru">Н</span> se lit n, <span lang="ru">Р</span> se lit r, <span lang="ru">С</span> se lit s, <span lang="ru">У</span> se lit ou, <span lang="ru">Х</span> se lit kh.</div>
    <div class="glyphs">${LIB.RU_ALPHA.map(a => `<button class="glyph${known.has(a[1]) ? ' known' : ''}" data-action="speak" data-text="${a[1]}" data-lang="ru-RU" aria-label="${a[0]}, se lit ${a[2]}"><b lang="ru">${a[0]} ${a[1]}</b><span>${a[2]}</span></button>`).join('')}</div>`;
  }
  return `${back}<h1 class="large screen-title">L’alphabet arabe</h1>
  <div class="callout"><b>Aperçu : on commence en mars 2027.</b> L’arabe se lit de droite à gauche. Chaque lettre est montrée seule ; dans un mot, la plupart se lient à la suivante et changent un peu de forme.</div>
  <div class="glyphs" dir="rtl">${LIB.AR_ALPHA.map(a => `<button class="glyph" data-action="speak" data-text="${a[0]}" data-lang="ar-SA" aria-label="${a[1]}, ${a[2]}"><b class="ar-glyph" lang="ar">${a[0]}</b><span dir="ltr">${a[1]}</span><span dir="ltr">${a[2]}</span></button>`).join('')}</div>`;
}

/* ---------- Progrès ---------- */
const LEVELS = [[0, 'Débutant (A0)', 150], [150, 'A1', 500], [500, 'A2', 1000], [1000, 'B1', 2000]];
function progressHTML(){
  const t = todayISO(), todayCol = (parseISO(t).getDay() + 6) % 7, todayIdx = 21 + todayCol;
  let cells = ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(h => `<div class="h">${h}</div>`).join('');
  for(let i = 0; i < 28; i++){
    const day = addDays(t, i - todayIdx);
    let c = 'd';
    if(i > todayIdx) c += ' future';
    else { if(store.days[day]) c += ' on'; if(i === todayIdx) c += ' today'; }
    cells += `<div class="${c}" title="${day}"></div>`;
  }
  const m = mastered(), deck = Object.keys(store.deck).length;
  const lv = LEVELS.slice().reverse().find(l => m >= l[0]) || LEVELS[0];
  const pct = Math.min(100, Math.round((m - lv[0]) / (lv[2] - lv[0]) * 100));
  const letters = lettersKnown(), info = testInfo();
  const canTest = deck >= 4;
  return `
  <h1 class="large screen-title">Progrès</h1>
  <div class="pcard">
    <div class="phead"><span class="pname">Portugais du Portugal</span><span class="tag accent">Focus</span></div>
    <div class="big">${m}<small>mot${m > 1 ? 's' : ''} maîtrisé${m > 1 ? 's' : ''} · ${deck} en révision</small></div>
    <div class="bar-legend"><span>Niveau estimé : ${lv[1]}</span><span>${lv[2]} mots</span></div>
    <div class="bar"><i style="width:${pct}%"></i></div>
    <div class="minis">
      <div class="mini"><b>${streak()} jour${streak() > 1 ? 's' : ''}</b><span>de suite</span></div>
      <div class="mini"><b>${totalMinutes()} min</b><span>au total</span></div>
    </div>
  </div>
  <div class="pcard"><div class="phead"><span class="pname">4 dernières semaines</span></div><div class="cal">${cells}</div></div>
  <div class="pcard">
    <div class="phead"><span class="pname">${info.official ? `Bilan de ${info.monthName}` : 'Bilan du mois'}</span>${info.done ? `<span class="tag ${info.done.score >= 70 ? 'good' : ''}">${info.done.score} %</span>` : ''}</div>
    <p class="pnote">${info.official
      ? (info.done ? 'Bilan fait. Tu peux le refaire pour t’entraîner.' : 'C’est la semaine du bilan : 12 mots du mois, 2 minutes. À 70 %, les articles du mois sont validés.')
      : 'Le vrai bilan a lieu du 1er au 7 de chaque mois. D’ici là, tu peux t’entraîner.'}</p>
    <button class="btn ${info.official && !info.done ? 'btn-primary' : 'btn-secondary'}" data-action="start-test" ${canTest ? '' : 'disabled'}>${canTest ? (info.official && !info.done ? 'Faire le bilan' : 'Bilan d’entraînement') : 'Disponible après tes premiers articles'}</button>
  </div>
  <div class="pcard">
    <div class="phead"><span class="pname">Russe</span><span class="tag">${cap(nextLabel('ru'))}</span></div>
    <div class="bar-legend"><span>Alphabet</span><span>${letters} / 33 lettres</span></div>
    <div class="bar"><i style="width:${(letters / 33 * 100).toFixed(1)}%"></i></div>
  </div>
  <div class="pcard">
    <div class="phead"><span class="pname">Arabe standard</span><span class="ar" lang="ar" dir="rtl">العربية</span></div>
    <p class="pnote">${cap(nextLabel('ar'))}. Les textes auront les voyelles notées.</p>
  </div>`;
}

/* ---------- Réglages ---------- */
function settingsHTML(){
  const th = CONFIG.themes || {};
  const chips = (list) => (list || []).map(x => `<span class="topic">${esc(x)}</span>`).join('');
  return `
  <h1 class="large screen-title">Réglages</h1>
  <div class="section-label first">Rappels</div>
  <div class="group">
    <a class="row" href="${calendarUrl()}"><span class="tile">${ICON.cal}</span><span class="row-main"><span class="row-title accent">S’abonner aux rappels</span><span class="row-sub">08:00 lecture, 18:30 oral, avec le titre du jour</span></span></a>
  </div>
  <p class="foot">Ton iPhone propose de s’abonner au calendrier « Ponte ». Si l’option « Supprimer les alertes » apparaît, désactive-la pour recevoir les notifications. Les rappels suivent les articles préparés : sans séance pendant deux semaines, ils s’arrêtent tout seuls, et reprennent quand tu reviens.</p>
  <div class="section-label">Ordre des langues</div>
  <div class="group">
    <div class="row static"><span class="tile">PT</span><span class="row-main"><span class="row-title">Portugais du Portugal</span><span class="row-sub">En cours, jusqu’à fin janvier</span></span><span class="tag accent">Focus</span></div>
    ${queueRows()}
    <button class="row" data-action="lang-add"><span class="tile">${ICON.plus}</span><span class="row-main"><span class="row-title accent">Ajouter ou retirer une langue</span></span></button>
  </div>
  <p class="foot">La première de la liste prend le relais quand le portugais passe en simple entretien. Avant de préparer des cours dans une nouvelle langue, Claude te demandera de valider le format.</p>
  <div class="section-label">Actualité, en semaine</div>
  <div class="chips">${chips(th.semaine)}</div>
  <div class="section-label">Le week-end, détente</div>
  <div class="chips">${chips(th.weekend)}</div>
  <p class="foot" style="margin-left:4px">Les articles sont préparés chaque dimanche par une routine Claude, à partir de ces thèmes. Pour les changer, demande-le à Claude.</p>
  <div class="section-label">Ma progression</div>
  <div class="group">
    <button class="row" data-action="export"><span class="tile">${ICON.down}</span><span class="row-main"><span class="row-title">Sauvegarder ma progression</span><span class="row-sub">Un fichier à garder, au cas où</span></span></button>
    <label class="row" for="import-file"><span class="tile">${ICON.up}</span><span class="row-main"><span class="row-title">Restaurer une sauvegarde</span><span class="row-sub">Depuis un fichier ponte-progression.json</span></span></label>
    <button class="row" data-action="reset"><span class="tile muted">${ICON.trash}</span><span class="row-main"><span class="row-title danger">Tout remettre à zéro</span></span></button>
  </div>
  <input type="file" id="import-file" accept="application/json,.json" hidden>
  <p class="foot">Ta progression reste sur ce téléphone, dans le navigateur. Rien n’est envoyé ailleurs.</p>
  <p class="foot">Contenu mis à jour le ${INDEX.updated ? frDate(INDEX.updated, {day:'numeric', month:'long', year:'numeric'}) : '—'}.</p>`;
}

/* Abonnement au calendrier : l'iPhone relit content/rappels.ics régulièrement. */
function calendarUrl(){ return 'webcal://' + location.host + location.pathname.replace(/[^/]*$/, '') + 'content/rappels.ics'; }

/* Ordre des langues : gardé sur le téléphone et envoyé dans la feuille d'activité,
   pour que Claude sache quelle langue préparer ensuite. */
const LANG_CATALOG = {
  ru:{name:'Russe', tile:'Ру'}, ar:{name:'Arabe standard', tile:'ع', ar:true}, es:{name:'Espagnol', tile:'ES'},
  it:{name:'Italien', tile:'IT'}, de:{name:'Allemand', tile:'DE'}, en:{name:'Anglais des affaires', tile:'EN'},
  zh:{name:'Chinois mandarin', tile:'中'}, tr:{name:'Turc', tile:'TR'}, ja:{name:'Japonais', tile:'あ'}
};
function langQueue(){ if(!Array.isArray(store.langQueue)) store.langQueue = ['ru', 'ar']; return store.langQueue; }
function queueRows(){
  const q = langQueue();
  return q.map((code, i) => {
    const l = LANG_CATALOG[code] || {name:code, tile:code.toUpperCase()};
    const sub = i === 0 ? 'Prend le relais en février' : `En ${i + 1}ᵉ position`;
    return `<div class="row static"><span class="rank">${i + 1}</span><span class="row-main"><span class="row-title">${esc(l.name)}</span><span class="row-sub">${sub}</span></span>
      <span class="row-actions"><button class="icon-btn" data-action="lang-up" data-i="${i}" ${i === 0 ? 'disabled' : ''} aria-label="Monter ${esc(l.name)}">${ICON.arrowUp}</button><button class="icon-btn" data-action="lang-down" data-i="${i}" ${i === q.length - 1 ? 'disabled' : ''} aria-label="Descendre ${esc(l.name)}">${ICON.arrowDown}</button></span></div>`;
  }).join('');
}
function langSheet(){
  const q = langQueue();
  const row = (code, inList) => {
    const l = LANG_CATALOG[code];
    return `<button class="row" data-action="${inList ? 'lang-remove' : 'lang-include'}" data-code="${code}"><span class="tile${l.ar ? ' ar-tile' : ''}">${l.tile}</span><span class="row-main"><span class="row-title">${l.name}</span></span><span class="tag ${inList ? '' : 'accent'}">${inList ? 'Retirer' : 'Ajouter'}</span></button>`;
  };
  openSheet(`<h3 class="plain">Tes prochaines langues</h3><p>Le portugais reste ta langue du moment. Choisis celles qui suivront.</p>
    ${q.length ? `<div class="section-label">Dans ta liste</div><div class="group">${q.map(c => row(c, true)).join('')}</div>` : ''}
    <div class="section-label">À ajouter</div><div class="group">${Object.keys(LANG_CATALOG).filter(c => !q.includes(c)).map(c => row(c, false)).join('') || '<div class="row static"><span class="row-sub">Toutes les langues sont dans ta liste.</span></div>'}</div>
    <button class="btn btn-secondary" data-action="close-sheet">Fermer</button>`);
}
let orderTimer;
function sendOrder(){
  save();
  clearTimeout(orderTimer);
  orderTimer = setTimeout(() => pingActivity('ordre:' + ['pt'].concat(langQueue()).join(',')), 1500);
}

/* ---------- Feuille du bas ---------- */
function openSheet(html){
  $('#sheet-body').innerHTML = html;
  $('#sheet').classList.add('open'); $('#sheet').setAttribute('aria-hidden', 'false');
  $('#scrim').classList.add('show');
}
function closeSheet(){
  $('#sheet').classList.remove('open'); $('#sheet').setAttribute('aria-hidden', 'true');
  $('#scrim').classList.remove('show');
  document.querySelectorAll('.w.active').forEach(x => x.classList.remove('active'));
}
function wordSheet(k){
  const g = state.article.data.glossary[k]; if(!g) return;
  const inDeck = g.new || state.addedNow.has(k) || !!store.deck['pt|' + g.w];
  openSheet(`
    <div class="sheet-word"><h3 lang="pt-PT">${esc(g.w)}</h3><button class="icon-btn" data-action="speak" data-text="${esc(g.w)}" data-lang="pt-PT" aria-label="Écouter">${ICON.speaker}</button></div>
    <div class="sheet-fr">${esc(g.fr)}</div>
    ${g.note ? `<div class="sheet-note">${esc(g.note)}</div>` : ''}
    ${g.new ? `<button class="btn btn-secondary" disabled>${ICON.check}Ajouté automatiquement</button>`
      : `<button class="btn ${inDeck ? 'btn-secondary' : 'btn-primary'}" data-action="add-word" data-k="${esc(k)}">${inDeck ? ICON.check + 'Dans tes révisions' : ICON.plus + 'Ajouter à mes révisions'}</button>`}`);
}

/* ---------- Toast ---------- */
let toastT;
function toast(msg){
  const t = $('#toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 3000);
}

/* ---------- Rendu ---------- */
let lastKey = '';
function render(){
  const app = $('#app'), view = $('#view');
  app.classList.toggle('in-flow', !!state.flow);
  let html;
  if(state.flow === 'morning') html = morningHTML();
  else if(state.flow === 'evening') html = eveningHTML();
  else if(state.flow === 'alpha') html = alphaHTML();
  else if(state.flow === 'test') html = testHTML();
  else html = ({today:todayHTML, library:libraryHTML, progress:progressHTML, settings:settingsHTML})[state.tab]();
  view.innerHTML = html;
  const key = state.flow
    ? [state.flow, state.stepIdx, state.review.i, state.cloze.i, state.alpha.i, state.alpha.finished, state.oral.phase, state.test.i, state.test.finished].join('-')
    : [state.tab, state.lib.lang, state.lib.view].join('-');
  if(key !== lastKey){ view.scrollTop = 0; lastKey = key; }
  document.querySelectorAll('.tab').forEach(t => t.setAttribute('aria-current', (!state.flow && t.dataset.tab === state.tab) ? 'page' : 'false'));
}

/* ---------- Actions ---------- */
async function loadBonus(){
  const e = bonusEntries()[0]; if(!e) return;
  try{ startMorning({entry:e, data: await fetchJSON(articlePath(e))}); }
  catch(err){ toast('Impossible de charger cet article.'); }
}
function exportProgress(){
  const blob = new Blob([JSON.stringify(store, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = 'ponte-progression.json';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]'); if(!el) return;
  const a = el.dataset.action;
  switch(a){
    case 'tab':
      closeSheet(); stopListening();
      if(!state.flow && state.tab === 'library' && el.dataset.tab === 'library') state.lib = {lang:null, view:null};
      state.flow = null; state.tab = el.dataset.tab; render(); break;
    case 'reload': loadContent().then(render); break;
    case 'start-morning': if(TODAY) startMorning(TODAY); else toast('L’article du jour n’est pas chargé.'); break;
    case 'start-evening': startEvening(); break;
    case 'start-alpha': startAlpha(); break;
    case 'start-test': startTest(); break;
    case 'bonus': loadBonus(); break;
    case 'close': stopListening(); closeSheet(); state.flow = null; render(); break;
    case 'arco': {
      store.arcoLine = ((store.arcoLine || 0) + 1) % LIB.ARCO_LINES.length; save();
      const ln = LIB.ARCO_LINES[store.arcoLine];
      $('#arco-say').textContent = ln.pt; $('#arco-fr').textContent = ln.fr;
      const svg = el.querySelector('.arco');
      if(svg){ svg.classList.remove('hop'); void svg.getBoundingClientRect(); svg.classList.add('hop'); }
      speak(ln.pt, 'pt-PT'); break;
    }
    case 'reveal': state.review.shown = true; render(); break;
    case 'grade': {
      const r = state.review;
      gradeCard(r.cards[r.i].key, el.dataset.v === '1');
      r.i++; r.shown = false;
      if(r.i >= r.cards.length) nextStep(); else render();
      break;
    }
    case 'speak': speak(el.dataset.text, el.dataset.lang); break;
    case 'speak-article': {
      const d = state.article.data;
      speak(d.title.pt + '. ' + sentences(d).map(s => plain(s.pt)).join(' '), 'pt-PT'); break;
    }
    case 'toggle-tr': state.showTr = !state.showTr; render(); break;
    case 'word':
      document.querySelectorAll('.w.active').forEach(x => x.classList.remove('active'));
      el.classList.add('active'); wordSheet(el.dataset.k); break;
    case 'add-word': {
      const k = el.dataset.k;
      if(state.addedNow.has(k)) state.addedNow.delete(k); else state.addedNow.add(k);
      wordSheet(k); break;
    }
    case 'close-sheet': closeSheet(); break;
    case 'read-done': closeSheet(); nextStep(); break;
    case 'pick': {
      const c = state.cloze; if(c.picked !== null) break;
      c.picked = +el.dataset.i;
      if(c.orders[c.i][c.picked] === state.article.data.cloze[c.i].answer) c.score++;
      render(); break;
    }
    case 'cloze-next': {
      const c = state.cloze; c.i++; c.picked = null;
      if(c.i >= state.article.data.cloze.length){ finishMorning(); nextStep(); } else render();
      break;
    }
    case 'finish': state.flow = null; state.tab = 'today'; render(); break;
    case 'mode-text': state.oral.mode = 'text'; render(); break;
    case 'mode-voice': state.oral.mode = 'voice'; render(); break;
    case 'mic-start': {
      const then = el.dataset.then, o = state.oral;
      o.live = '';
      o.phase = then === 'submit-answer' ? 'listen' : 'repeat-listen';
      render();
      const ok = startListening('pt-PT', (txt) => { o.live = txt; const l = $('#live'); if(l) l.textContent = txt; }, (txt, err) => {
        if(err === 'not-allowed' || err === 'service-not-allowed'){ toast('Le micro est refusé. Tu peux écrire ta réponse.'); o.mode = 'text'; o.phase = then === 'submit-answer' ? 'ask' : 'repeat'; render(); return; }
        onSpoken(then, txt || o.live);
      });
      if(!ok){ o.mode = 'text'; o.phase = then === 'submit-answer' ? 'ask' : 'repeat'; render(); }
      break;
    }
    case 'mic-stop': stopListening(); break;
    case 'submit-answer': case 'submit-repeat': {
      const v = ($('#answer') || {}).value || '';
      if(!v.trim()){ toast('Écris ou dicte d’abord ta phrase.'); break; }
      submitOral(a, v.trim()); break;
    }
    case 'to-repeat': state.oral.phase = 'repeat'; state.oral.repeat = ''; render(); break;
    case 'ask-claude': askClaude(); break;
    case 'evening-done':
      finishEvening(); state.flow = null; state.tab = 'today'; render();
      toast('Journée terminée. À demain !'); break;
    case 'alpha-flip': state.alpha.shown = true; render(); break;
    case 'alpha-next': {
      const al = state.alpha;
      if(al.i >= al.words.length - 1){ al.finished = true; finishAlpha(); }
      else { al.i++; al.shown = false; }
      render(); break;
    }
    case 'test-pick': {
      const s = state.test; if(s.picked !== null) break;
      s.picked = +el.dataset.i;
      const q = s.items[s.i];
      if(q.options[s.picked] === q.answer) s.score++;
      else { const card = store.deck['pt|' + q.w]; if(card){ card.box = 0; card.due = addDays(todayISO(), 1); save(); } }
      render(); break;
    }
    case 'test-next': {
      const s = state.test; s.i++; s.picked = null;
      if(s.i >= s.items.length){ s.finished = true; finishTest(); }
      render(); break;
    }
    case 'lib-lang': state.lib = {lang:el.dataset.l, view:null}; render(); break;
    case 'lib-view': state.lib.view = el.dataset.v; render(); break;
    case 'lib-back': if(state.lib.view) state.lib.view = null; else state.lib.lang = null; render(); break;
    case 'lang-up': case 'lang-down': {
      const q = langQueue(), i = +el.dataset.i, j = a === 'lang-up' ? i - 1 : i + 1;
      if(j < 0 || j >= q.length) break;
      [q[i], q[j]] = [q[j], q[i]];
      sendOrder(); render(); break;
    }
    case 'lang-add': langSheet(); break;
    case 'lang-include': langQueue().push(el.dataset.code); sendOrder(); langSheet(); render(); break;
    case 'lang-remove': store.langQueue = langQueue().filter(c => c !== el.dataset.code); sendOrder(); langSheet(); render(); break;
    case 'export': exportProgress(); break;
    case 'reset':
      openSheet(`<h3 class="plain">Tout remettre à zéro ?</h3><p>Ta série, tes mots en révision et tes bilans seront effacés de ce téléphone. Pense à sauvegarder ta progression avant.</p>
        <button class="btn btn-primary" data-action="reset-confirm" style="background:var(--bad);color:var(--card)">Effacer ma progression</button>
        <button class="btn btn-secondary" data-action="close-sheet" style="margin-top:10px">Annuler</button>`); break;
    case 'reset-confirm':
      store = freshStore(); save(); closeSheet(); render(); toast('Progression remise à zéro.'); break;
  }
});

document.addEventListener('change', (e) => {
  if(e.target.id !== 'import-file') return;
  const f = e.target.files && e.target.files[0]; if(!f) return;
  const r = new FileReader();
  r.onload = () => {
    try{
      const data = JSON.parse(r.result);
      if(!data || typeof data !== 'object' || !data.deck || !data.days) throw new Error('format');
      store = Object.assign(freshStore(), data); save(); render(); toast('Progression restaurée.');
    }catch(err){ toast('Ce fichier n’est pas une sauvegarde Ponte.'); }
  };
  r.readAsText(f);
});

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeSheet();
  const el = e.target;
  if((e.key === 'Enter' || e.key === ' ') && el.getAttribute && el.getAttribute('role') === 'button'){ e.preventDefault(); el.click(); }
});

/* L'appli peut rester ouverte en arrière-plan sur l'iPhone : on recharge le contenu si la date a changé. */
document.addEventListener('visibilitychange', () => {
  if(document.visibilityState === 'visible' && LOADED_ON !== todayISO() && !state.flow) loadContent().then(render);
});

/* ---------- Démarrage ---------- */
$('#view').innerHTML = `<div class="loading">${arco('pt', 64, '')}<span>Chargement…</span></div>`;
loadContent().then(render);
})();
