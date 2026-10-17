import { Lesson } from '@/types';

export const INITIAL_LESSONS: Lesson[] = [
  // ==========================================
  // ETAPA 1: DOMOVSKÁ ŘADA (Základní poloha)
  // ==========================================
  {
    id: 'lesson-1',
    stage: 1,
    stageTitle: '1. Domovská řada',
    title: 'Lekce 1: Základní ukazováčky (J a F) a mezerník',
    description: 'Položte ukazováčky na klávesy s hmatovými výstupky (F pro levý, J pro pravý ukazováček). Mezerník tiskněte palcem.',
    targetKeys: ['j', 'f', ' '],
    content: 'f j f j fj jf ff jj fjf jfj f f j j fj fj j f jf jj ff j j f f jfj fjf',
    minAccuracy: 95,
    minCpm: 80,
    handGuide: {
      leftHome: 'Klávesa F (levý ukazováček na výstupku)',
      rightHome: 'Klávesa J (pravý ukazováček na výstupku)',
      targetFinger: 'Ukazováčky a palce',
      hint: 'Vnímejte hmatové výstupky na klávesách F a J. Ruce mějte uvolněné a nedívejte se dolů.',
    },
  },
  {
    id: 'lesson-2',
    stage: 1,
    stageTitle: '1. Domovská řada',
    title: 'Lekce 2: Prostředníčky (D a K)',
    description: 'Levý prostředníček ovládá D, pravý prostředníček ovládá K. Doplňujeme k výchozím ukazováčkům F a J.',
    targetKeys: ['d', 'k', 'f', 'j', ' '],
    content: 'd k d k dk kd dd kk f d j k fd jk df kj d f k j ddd kkk dfjk kfjd dkdk fjkd',
    minAccuracy: 95,
    minCpm: 90,
    handGuide: {
      leftHome: 'D (prostředníček) a F (ukazováček)',
      rightHome: 'J (ukazováček) a K (prostředníček)',
      targetFinger: 'Prostředníčky a ukazováčky',
      hint: 'Při stisku klávesy D zůstává ukazováček ležet volně na výstupku F.',
    },
  },
  {
    id: 'lesson-3',
    stage: 1,
    stageTitle: '1. Domovská řada',
    title: 'Lekce 3: Prsteníčky a malíčky (S, A a L, ů)',
    description: 'Kompletní domovská řada! Levá ruka: A-S-D-F, pravá ruka: J-K-L-ů. Základní výchozí pozice.',
    targetKeys: ['a', 's', 'l', 'ů', 'd', 'k', 'f', 'j'],
    content: 'asdf jklů as df jk lů fasd jklů sa la da ka fů jů skald lůza asdfjklů',
    minAccuracy: 95,
    minCpm: 100,
    handGuide: {
      leftHome: 'A (malíček), S (prsteníček), D (prostředníček), F (ukazováček)',
      rightHome: 'J (ukazováček), K (prostředníček), L (prsteníček), ů (malíček)',
      targetFinger: 'Všechny prsty obou rukou',
      hint: 'Základní poloha. Každý prst má svoji domovskou klávesu.',
    },
  },
  {
    id: 'lesson-4',
    stage: 1,
    stageTitle: '1. Domovská řada',
    title: 'Lekce 4: Středové klávesy domovské řady (G a H)',
    description: 'Ukazováčky se natahují směrem do středu: levý ukazováček tiskne G a vrací se na F, pravý tiskne H a vrací se na J.',
    targetKeys: ['g', 'h', 'f', 'j', 'd', 'k', 's', 'l', 'a', 'ů'],
    content: 'fg jh gh hg fgh jhg flag hlad shoda had hala hlas gah hag alf sah jag gha',
    minAccuracy: 95,
    minCpm: 110,
    handGuide: {
      leftHome: 'Levý ukazováček se natahuje z F na G a hned se vrací',
      rightHome: 'Pravý ukazováček se natahuje z J na H a hned se vrací',
      targetFinger: 'Oba ukazováčky (pohyb do středu)',
      hint: 'Po stisku G nebo H okamžitě vraťte ukazováček zpět na domovské F či J.',
    },
  },

  // ==========================================
  // ETAPA 2: HORNÍ ŘADA (E, I, U, O, R, T, Z...)
  // ==========================================
  {
    id: 'lesson-5',
    stage: 2,
    stageTitle: '2. Horní řada',
    title: 'Lekce 5: Samohlásky horní řady (E a I)',
    description: 'Levý prostředníček se posouvá z D nahoru na E. Pravý prostředníček se posouvá z K nahoru na I.',
    targetKeys: ['e', 'i', 'd', 'k', 'f', 'j'],
    content: 'de ki ed ik ded kik jede klesl sedi deka led kde lid kila sek kedi jezek',
    minAccuracy: 95,
    minCpm: 115,
    handGuide: {
      leftHome: 'Levý prostředníček: posun z D nahoru na E',
      rightHome: 'Pravý prostředníček: posun z K nahoru na I',
      targetFinger: 'Oba prostředníčky',
      hint: 'Ostatní prsty zůstávají lehce v domovské řadě, hýbe se jen prostředníček.',
    },
  },
  {
    id: 'lesson-6',
    stage: 2,
    stageTitle: '2. Horní řada',
    title: 'Lekce 6: Ukazováčky nahoře (R, T a U, Z)',
    description: 'Levý ukazováček obsluhuje R a T, pravý ukazováček obsluhuje U a Z (v QWERTZ).',
    targetKeys: ['r', 't', 'u', 'z', 'f', 'j', 'e', 'i'],
    content: 'fr ft ju jz rtu zut truhla rust teta ruka zima jitro titul statek trajekt',
    minAccuracy: 95,
    minCpm: 120,
    handGuide: {
      leftHome: 'Levý ukazováček: šikmo nahoru na R a T',
      rightHome: 'Pravý ukazováček: šikmo nahoru na U a Z',
      targetFinger: 'Ukazováčky v horní řadě',
      hint: 'Dbejte na návrat ukazováčků na výchozí hmatové body F a J.',
    },
  },
  {
    id: 'lesson-7',
    stage: 2,
    stageTitle: '2. Horní řada',
    title: 'Lekce 7: Okraje horní řady (Q, W a O, P, ú)',
    description: 'Prsteníčky a malíčky: levá ruka Q a W, pravá ruka O, P a ú.',
    targetKeys: ['q', 'w', 'o', 'p', 'ú', 's', 'a', 'l', 'ů'],
    content: 'wo op qu pl proutek posta pokoj papir voda vosk uhel louka popel pokus',
    minAccuracy: 95,
    minCpm: 120,
    handGuide: {
      leftHome: 'Malíček na Q, prsteníček na W',
      rightHome: 'Prsteníček na O, malíček na P a ú',
      targetFinger: 'Malíčky a prsteníčky v horní řadě',
      hint: 'Zápěstí mějte rovně, nenaklánějte celou ruku do stran.',
    },
  },

  // ==========================================
  // ETAPA 3: SPODNÍ ŘADA (V, B, N, M, C, X, Y...)
  // ==========================================
  {
    id: 'lesson-8',
    stage: 3,
    stageTitle: '3. Spodní řada',
    title: 'Lekce 8: Ukazováčky dole (V, B a N, M)',
    description: 'Levý ukazováček sahá dolů na V a B, pravý ukazováček dolů na N a M.',
    targetKeys: ['v', 'b', 'n', 'm', 'f', 'j'],
    content: 'fv fb jn jm vana bota most noha vana balon banan novina minuta vino buben',
    minAccuracy: 95,
    minCpm: 125,
    handGuide: {
      leftHome: 'Levý ukazováček: pohyb z F šikmo dolů na V a B',
      rightHome: 'Pravý ukazováček: pohyb z J šikmo dolů na N a M',
      targetFinger: 'Ukazováčky ve spodní řadě',
      hint: 'Stisk dolní klávesy provádějte ohnutím prstu, nikoli posunem celého zápěstí dolů.',
    },
  },
  {
    id: 'lesson-9',
    stage: 3,
    stageTitle: '3. Spodní řada',
    title: 'Lekce 9: Prostředníčky a kraje dole (C, X, Y a čárka, tečka)',
    description: 'Kompletní spodní řada: C (prostředníček), X a Y (prsteníček a malíček), čárka a tečka.',
    targetKeys: ['c', 'x', 'y', ',', '.'],
    content: 'dc sx ay k, l. cesta cvik taxi cyprys pole, louka, les. pes, kocka. domov.',
    minAccuracy: 95,
    minCpm: 125,
    handGuide: {
      leftHome: 'C (prostředníček), X (prsteníček), Y (malíček)',
      rightHome: 'Čárka (prostředníček), tečka (prsteníček), pomlčka (malíček)',
      targetFinger: 'Celá spodní řada včetně interpunkce',
      hint: 'Tečku a čárku píšeme pravým prostředníčkem a prsteníčkem.',
    },
  },

  // ==========================================
  // ETAPA 4: ČESKÁ DIAKRITIKA (ě, š, č, ř, ž, ý, á, í, é)
  // ==========================================
  {
    id: 'lesson-10',
    stage: 4,
    stageTitle: '4. Česká diakritika',
    title: 'Lekce 10: Háčky a čárky (ě, š, č, ř, ž, ý, á, í, é)',
    description: 'Číselná řada s českými diakritickými znaky. Prsty sahají nahoru nad horní řadu.',
    targetKeys: ['ě', 'š', 'č', 'ř', 'ž', 'ý', 'á', 'í', 'é'],
    content: 'pes štěká, kočka běží. říční proud, těžká práce, krásný den, velký úspěch.',
    minAccuracy: 95,
    minCpm: 130,
    handGuide: {
      leftHome: 'ě (prsteníček), š (prostředníček), č a ř (ukazováček)',
      rightHome: 'ž a ý (ukazováček), á (prostředníček), í (prsteníček), é (malíček)',
      targetFinger: 'Číselná / diakritická řada',
      hint: 'Prsty se natahují nahoru, domovská poloha zůstává referenčním bodem.',
    },
  },

  // ==========================================
  // ETAPA 5: PLYNULÝ TEXT & VELKÁ PÍSMENA (SHIFT)
  // ==========================================
  {
    id: 'lesson-11',
    stage: 5,
    stageTitle: '5. Plynulý text & Shift',
    title: 'Lekce 11: Velká písmena a reálné věty',
    description: 'Protější malíček drží Shift: při psaní levé ruky drží Shift pravý malíček a naopak.',
    targetKeys: ['Shift', 'A-Z'],
    content: 'Praha je hlavní město České republiky. Každý den se učíme něco nového a jdeme kupředu.',
    minAccuracy: 95,
    minCpm: 135,
    handGuide: {
      leftHome: 'Levý Shift: pravá ruka píše písmeno, levý malíček drží Shift',
      rightHome: 'Pravý Shift: levá ruka píše písmeno, pravý malíček drží Shift',
      targetFinger: 'Malíčky na klávesách Shift',
      hint: 'Zlaté pravidlo psaní velkých písmen: Shift drží VŽDY malíček opačné ruky!',
    },
  },
  {
    id: 'lesson-12',
    stage: 5,
    stageTitle: '5. Plynulý text & Shift',
    title: 'Lekce 12: Mistrovský text (Plynulé psaní všemi deseti)',
    description: 'Komplexní reálný odstavec s interpunkcí, diakritikou a čísly pro ověření kompletního prstokladu.',
    targetKeys: ['všechny klávesy'],
    content: 'Rychlé a přesné psaní na klávesnici šetří desítky hodin času každý měsíc. Když píšete všemi deseti prsty bez dívání, vaše myšlenky plynou přímo na monitor.',
    minAccuracy: 96,
    minCpm: 140,
    handGuide: {
      leftHome: 'A-S-D-F',
      rightHome: 'J-K-L-ů',
      targetFinger: 'Všech deset prstů v plné synchronizaci',
      hint: 'Dívejte se výhradně na monitor, dýchejte zhluboka a udržujte plynulý rytmus úhozů.',
    },
  },
];
