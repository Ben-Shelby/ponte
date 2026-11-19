/* Ponte — contenus fixes : bibliothèque, alphabets, sessions d'alphabet cyrillique.
   Les articles du jour, eux, sont dans content/ et changent chaque semaine. */
window.PONTE_LIB = (function(){

const CATS = [
  {id:'hello', label:'Se présenter', sub:'Bonjour, ton prénom, comment ça va', icon:'bubble'},
  {id:'daily', label:'Au quotidien', sub:'Commander, payer, trouver les toilettes', icon:'cup'},
  {id:'urgent', label:'Urgences', sub:'Demander de l’aide, se faire comprendre', icon:'aid'},
  {id:'fun', label:'Détente', sub:'Café, sport, week-end, trinquer', icon:'ball'}
];

const PHRASES = {
  pt:{
    hello:[
      {fr:'Bonjour', t:'Bom dia'},
      {fr:'Ça va ?', t:'Tudo bem?'},
      {fr:'Je m’appelle…', t:'Chamo-me…', note:'Au Brésil, on dit plutôt « Meu nome é… ».'},
      {fr:'Comment tu t’appelles ?', t:'Como te chamas?'},
      {fr:'Enchanté', t:'Muito prazer'}
    ],
    daily:[
      {fr:'Je voudrais de l’eau, s’il vous plaît', t:'Queria água, por favor.'},
      {fr:'Combien ça coûte ?', t:'Quanto custa?'},
      {fr:'L’addition, s’il vous plaît', t:'A conta, por favor.'},
      {fr:'Où sont les toilettes ?', t:'Onde é a casa de banho?', note:'Expression du Portugal. Au Brésil : « Onde fica o banheiro? »'},
      {fr:'Merci', t:'Obrigado', note:'« Obrigado » si tu es un homme, « obrigada » si tu es une femme.'}
    ],
    urgent:[
      {fr:'Au secours !', t:'Socorro!'},
      {fr:'J’ai besoin d’un médecin', t:'Preciso de um médico.'},
      {fr:'Je ne comprends pas', t:'Não percebo.'},
      {fr:'Vous parlez anglais ?', t:'Fala inglês?'},
      {fr:'Je suis perdu', t:'Estou perdido.', note:'Au féminin : « Estou perdida ».'}
    ],
    fun:[
      {fr:'On prend un café ?', t:'Vamos tomar um café?'},
      {fr:'Tu fais quoi ce week-end ?', t:'O que vais fazer no fim de semana?'},
      {fr:'J’adore le football', t:'Adoro futebol.'},
      {fr:'Santé !', t:'Saúde!'},
      {fr:'À bientôt !', t:'Até breve!'}
    ]
  },
  ru:{
    hello:[
      {fr:'Bonjour', t:'Здра́вствуйте', tr:'zdrástvouïtié', note:'Forme polie. Entre amis : Приве́т (priviét).'},
      {fr:'Ça va ?', t:'Как дела́?', tr:'kak dilá ?'},
      {fr:'Je m’appelle…', t:'Меня́ зову́т…', tr:'miniá zavoút…'},
      {fr:'Comment tu t’appelles ?', t:'Как тебя́ зову́т?', tr:'kak tibiá zavoút ?'},
      {fr:'Enchanté', t:'О́чень прия́тно', tr:'ótchin’ priiátna'}
    ],
    daily:[
      {fr:'Je voudrais de l’eau, s’il vous plaît', t:'Мо́жно воды́, пожа́луйста?', tr:'mójna vadý, pajálsta ?'},
      {fr:'Combien ça coûte ?', t:'Ско́лько э́то сто́ит?', tr:'skól’ka éta stóit ?'},
      {fr:'L’addition, s’il vous plaît', t:'Счёт, пожа́луйста.', tr:'chiot, pajálsta'},
      {fr:'Où sont les toilettes ?', t:'Где туале́т?', tr:'gdié toualiét ?'},
      {fr:'Merci', t:'Спаси́бо', tr:'spassíba'}
    ],
    urgent:[
      {fr:'Au secours !', t:'Помоги́те!', tr:'pamaguítié !'},
      {fr:'J’ai besoin d’un médecin', t:'Мне ну́жен врач.', tr:'mnié noújin vratch'},
      {fr:'Je ne comprends pas', t:'Я не понима́ю.', tr:'ia ni panimáiou'},
      {fr:'Vous parlez anglais ?', t:'Вы говори́те по-англи́йски?', tr:'vy gavarítié pa-anglíïski ?'},
      {fr:'Je suis perdu', t:'Я заблуди́лся.', tr:'ia zabloudílsia', note:'Au féminin : Я заблуди́лась (ia zabloudílas’).'}
    ],
    fun:[
      {fr:'On prend un café ?', t:'Вы́пьем ко́фе?', tr:'výpiem kófié ?'},
      {fr:'Tu fais quoi ce week-end ?', t:'Что ты де́лаешь в выходны́е?', tr:'chto ty diélaiech’ v vykhadnýié ?'},
      {fr:'J’adore le football', t:'Я люблю́ футбо́л.', tr:'ia lioubliou foutból'},
      {fr:'Santé !', t:'За здоро́вье!', tr:'za zdaróvié !'},
      {fr:'À bientôt !', t:'До ско́рого!', tr:'da skórava !'}
    ]
  },
  ar:{
    hello:[
      {fr:'Bonjour', t:'السَّلَامُ عَلَيْكُمْ', tr:'as-salâmou ʿalaykoum', note:'On te répond : wa ʿalaykoum as-salâm.'},
      {fr:'Ça va ?', t:'كَيْفَ حَالُكَ؟', tr:'kayfa ḥâlouka ?', note:'À une femme : kayfa ḥâlouki ?'},
      {fr:'Je m’appelle…', t:'اِسْمِي…', tr:'ismî…'},
      {fr:'Comment tu t’appelles ?', t:'مَا اسْمُكَ؟', tr:'mâ smouka ?'},
      {fr:'Enchanté', t:'تَشَرَّفْنَا', tr:'tacharrafnâ'}
    ],
    daily:[
      {fr:'Je voudrais de l’eau, s’il vous plaît', t:'أُرِيدُ مَاءً، مِنْ فَضْلِكَ', tr:'ourîdou mâʾan, min faḍlik'},
      {fr:'Combien ça coûte ?', t:'بِكَمْ هَذَا؟', tr:'bikam hâdhâ ?'},
      {fr:'L’addition, s’il vous plaît', t:'الحِسَابُ، مِنْ فَضْلِكَ', tr:'al-ḥisâb, min faḍlik'},
      {fr:'Où sont les toilettes ?', t:'أَيْنَ الحَمَّامُ؟', tr:'ayna l-ḥammâm ?'},
      {fr:'Merci', t:'شُكْرًا', tr:'choukran'}
    ],
    urgent:[
      {fr:'Aidez-moi !', t:'سَاعِدُونِي!', tr:'sâʿidounî !'},
      {fr:'J’ai besoin d’un médecin', t:'أَحْتَاجُ إِلَى طَبِيبٍ', tr:'aḥtâjou ilâ ṭabîb'},
      {fr:'Je ne comprends pas', t:'لَا أَفْهَمُ', tr:'lâ afham'},
      {fr:'Vous parlez anglais ?', t:'هَلْ تَتَكَلَّمُ الإِنْجِلِيزِيَّةَ؟', tr:'hal tatakallamou l-injlîziyya ?'}
    ],
    fun:[
      {fr:'On prend un café ?', t:'هَلْ نَشْرَبُ قَهْوَةً؟', tr:'hal nachrabou qahwa ?'},
      {fr:'J’adore le football', t:'أُحِبُّ كُرَةَ القَدَمِ', tr:'ouḥibbou kourata l-qadam'},
      {fr:'Avec plaisir', t:'بِكُلِّ سُرُورٍ', tr:'bikoulli sourour'},
      {fr:'Au revoir', t:'إِلَى اللِّقَاءِ', tr:'ilâ l-liqâʾ'}
    ]
  }
};

const SOUNDS_PT = [
  ['ç','« s »','começar','commencer'],
  ['ão','« an » nasal, qui finit en « ou »','não','non'],
  ['ã','« an » nasal','amanhã','demain'],
  ['lh','« ill », comme dans « fille »','trabalho','travail'],
  ['nh','« gn », comme dans « montagne »','vinho','vin'],
  ['ch','« ch »','chave','clé'],
  ['s final','« ch », au Portugal','mais','plus'],
  ['r, rr','r de gorge, plus fort qu’en français','carro','voiture'],
  ['e final','presque muet','noite','nuit'],
  ['ou','« ô »','ouro','or']
];

const RU_ALPHA = [['А','а','a'],['Б','б','b'],['В','в','v'],['Г','г','g'],['Д','д','d'],['Е','е','ié'],['Ё','ё','io'],['Ж','ж','j'],['З','з','z'],['И','и','i'],['Й','й','ï'],['К','к','k'],['Л','л','l'],['М','м','m'],['Н','н','n'],['О','о','o'],['П','п','p'],['Р','р','r roulé'],['С','с','s'],['Т','т','t'],['У','у','ou'],['Ф','ф','f'],['Х','х','kh'],['Ц','ц','ts'],['Ч','ч','tch'],['Ш','ш','ch'],['Щ','щ','chtch'],['Ъ','ъ','signe dur'],['Ы','ы','y'],['Ь','ь','signe mou'],['Э','э','è'],['Ю','ю','iou'],['Я','я','ia']];
const RU_SOUND = Object.fromEntries(RU_ALPHA.map(a => [a[1], a[2]]));

/* Six sessions de 2 minutes : chaque mot est un mot « transparent » pour un francophone,
   et chaque session apporte de nouvelles lettres. 33 lettres à la fin. */
const RU_SESSIONS = [
  [
    {cy:'газ', tr:'gaz', fr:'le gaz', hint:'Un mot de l’énergie.', note:'En fin de mot, « з » se prononce « s » : on dit « gass ».'},
    {cy:'атом', tr:'atom', fr:'l’atome', hint:'Un mot de l’énergie.'},
    {cy:'метро', tr:'metro', fr:'le métro', hint:'Un mot que tu prends souvent.', note:'Le « е » non accentué s’affaiblit : on entend presque « mitro ».'},
    {cy:'нефть', tr:'neft’', fr:'le pétrole', hint:'Un mot de l’énergie, plus dur.', note:'« ь » ne se prononce pas : il adoucit la consonne d’avant.'}
  ],
  [
    {cy:'банк', tr:'bank', fr:'la banque', hint:'On y garde son argent.'},
    {cy:'парк', tr:'park', fr:'le parc', hint:'On s’y promène.'},
    {cy:'кафе', tr:'kafe', fr:'le café (le lieu)', hint:'On s’y assoit pour boire quelque chose.', note:'Se dit « kafé ».'},
    {cy:'спорт', tr:'sport', fr:'le sport', hint:'Facile, celui-là.'}
  ],
  [
    {cy:'такси', tr:'taksi', fr:'le taxi', hint:'Pour rentrer à l’hôtel.'},
    {cy:'лимон', tr:'limon', fr:'le citron', hint:'Jaune et acide.'},
    {cy:'музей', tr:'mouzeï', fr:'le musée', hint:'On y voit des tableaux.', note:'« й » est un « i » très bref, comme dans « travail ».'},
    {cy:'суп', tr:'soup', fr:'la soupe', hint:'Chaude, en hiver.'}
  ],
  [
    {cy:'дом', tr:'dom', fr:'la maison', hint:'Pense à « domicile ».'},
    {cy:'вода', tr:'voda', fr:'l’eau', hint:'Pense à « vodka », la « petite eau ».', note:'Le « о » non accentué se dit « a » : on dit « vada ».'},
    {cy:'чай', tr:'tchaï', fr:'le thé', hint:'Une boisson chaude.'},
    {cy:'хлеб', tr:'khleb', fr:'le pain', hint:'Chez le boulanger.', note:'« х » se prononce comme la jota espagnole.'}
  ],
  [
    {cy:'журнал', tr:'journal', fr:'le magazine', hint:'Pense à « journal ».'},
    {cy:'центр', tr:'tsentr', fr:'le centre', hint:'Le cœur de la ville.'},
    {cy:'шоколад', tr:'chokolad', fr:'le chocolat', hint:'Sucré.', note:'Se dit presque « chakalat ».'},
    {cy:'борщ', tr:'borchtch', fr:'le bortsch', hint:'Une soupe de betterave.'}
  ],
  [
    {cy:'музыка', tr:'mouzyka', fr:'la musique', hint:'On l’écoute.', note:'« ы » est un « i » prononcé au fond de la bouche.'},
    {cy:'экономика', tr:'ekonomika', fr:'l’économie', hint:'Un mot du business.'},
    {cy:'меню', tr:'meniou', fr:'le menu', hint:'Au restaurant.'},
    {cy:'Россия', tr:'Rossiia', fr:'la Russie', hint:'Un pays.', note:'Se dit « Rassiia ».'},
    {cy:'ёлка', tr:'iolka', fr:'le sapin de Noël', hint:'En décembre, dans le salon.'},
    {cy:'объект', tr:'obiekt', fr:'l’objet, le site', hint:'Un mot des chantiers.', note:'« ъ » ne se prononce pas : il sépare les deux sons.'}
  ]
];

const AR_ALPHA = [['ا','alif','a long'],['ب','bâʾ','b'],['ت','tâʾ','t'],['ث','thâʾ','th de « think »'],['ج','jîm','dj'],['ح','ḥâʾ','h soufflé fort'],['خ','khâʾ','kh, la jota'],['د','dâl','d'],['ذ','dhâl','th de « this »'],['ر','râʾ','r roulé'],['ز','zây','z'],['س','sîn','s'],['ش','chîn','ch'],['ص','ṣâd','s appuyé'],['ض','ḍâd','d appuyé'],['ط','ṭâʾ','t appuyé'],['ظ','ẓâʾ','dh appuyé'],['ع','ʿayn','son de gorge'],['غ','ghayn','r grasseyé'],['ف','fâʾ','f'],['ق','qâf','k profond'],['ك','kâf','k'],['ل','lâm','l'],['م','mîm','m'],['ن','noûn','n'],['ه','hâʾ','h expiré'],['و','wâw','w, ou'],['ي','yâʾ','y, î']];

const ARCO_LINES = [
  {pt:'Bom dia! Vamos lá?', fr:'Bonjour ! On y va ?'},
  {pt:'Tudo bem contigo?', fr:'Tout va bien pour toi ?'},
  {pt:'Só quatro minutos!', fr:'Juste quatre minutes !'},
  {pt:'Devagar se vai ao longe.', fr:'Qui va doucement va loin.'}
];

return {CATS, PHRASES, SOUNDS_PT, RU_ALPHA, RU_SOUND, RU_SESSIONS, AR_ALPHA, ARCO_LINES};
})();
