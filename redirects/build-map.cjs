/**
 * emanual.robotis.com -> docs.robotis.com 301 리다이렉트 매핑 생성기
 *
 * 입력 (collect.sh 로 갱신)
 *   data/emanual_urls.txt : e-Manual 저장소 md 파일들의 permalink 목록
 *   data/docs_urls.txt    : https://docs.robotis.com/sitemap.xml 의 <loc> 목록 (영문)
 *   data/legacy_pairs.tsv : docs/redirect/*.md 의 permalink -> redirecturl 쌍
 *
 * 출력
 *   redirects.csv     : Cloudflare Bulk Redirects 업로드용
 *   redirect-map.json : 경로 -> 경로 매핑
 *   worker.js         : Cloudflare Worker (플랜 제한 없이 전량 처리)
 *   report-*.txt      : 검토용 리포트
 */
const fs = require('fs');
const path = require('path');

const DEST = 'https://docs.robotis.com';

process.chdir(__dirname);
const read = f => fs.readFileSync(f, 'utf8').split('\n').map(s => s.trim()).filter(Boolean);

const docsUrls = read('data/docs_urls.txt')
  .map(u => u.replace('https://docs.robotis.com', ''))
  .filter(p => p.startsWith('/docs/'))
  .filter(p => !p.startsWith('/docs/tags'));

const emanual = read('data/emanual_urls.txt')
  .filter(p => p.startsWith('/docs/en/') || p.startsWith('/docs/kr/'));

const legacyPairs = read('data/legacy_pairs.tsv').map(l => l.split('\t')).filter(([a, b]) => a && b);

const segs = p => p.split('/').filter(Boolean);
const norm = s => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const leaf = p => { const s = segs(p); return s[s.length - 1] || ''; };
const tail2 = p => segs(p).slice(-2).join('');
const canon = p => (p.split('#')[0].replace(/\/+$/, '') || '/');

// ---------------------------------------------------------------------------
// 섹션 / 제품 대응표 — 슬러그만 보고 매칭하면 제품이 뒤바뀐다
// (예: platform/turtlebot3/quick-start -> systems/op3/quick_start)
// ---------------------------------------------------------------------------
const SECTION_MAP = {
  platform: 'systems', dxl: 'dxl', 'all-dyd': 'dxl', dyd: 'dxl',
  software: 'software', parts: 'parts', edu: 'edu', faq: 'faq',
};

// e-Manual platform/<X> -> docs systems/<Y>. 값이 없으면 docs 미이관으로 간주.
const PLATFORM_ALIAS = {
  turtlebot3: 'turtlebot3', thormang3: 'thormang3', op3: 'op3', op3_jointpose_msg: 'op3',
  msgs: 'msgs', omy: 'omy',
  openmanipulator: 'openmanipulator_x', openmanipulator_x: 'openmanipulator_x',
  openmanipulator_p: 'openmanipulator_p', openmanipulator_pro: 'openmanipulator_p',
  rh_p12_rn: 'rh_p12_rn', rh_p12_rn_main: 'rh_p12_rn', rh_p12_rn_ur: 'rh_p12_rn', rh_p12_rna: 'rh_p12_rn',
  // op / op2 / manipulator_h / ai_manipulator_main 은 docs에 대응 문서 없음
};

// e-Manual software/<X[/Y]> -> docs software/<Z>
const SOFTWARE_ALIAS = {
  'dynamixel/dynamixel_sdk': 'dynamixel_sdk',
  'dynamixel/dynamixel_easy_sdk': 'dynamixel_easy_sdk',
  'dynamixel/dynamixel_wizard2': 'dynamixel_wizard_2_0',
  'dynamixel/dynamixel_workbench': 'dynamixel_workbench',
  'dynamixel/dynamixel_workbench_jp': 'dynamixel_workbench',
  'arduino_ide': 'arduino_ide', 'arduino_ide_jp': 'arduino_ide',
  'rplus1': 'rplus_1_0', 'rplus2': 'rplus_manager_2_0', 'rplustask3': 'rplus_task_3_0',
  // embedded_sdk / mobile_app / opencm_ide / rplus_mobile / robotis_* 는 docs 미이관
};

// 소스 경로에서 docs 쪽 "허용 접두어"를 계산.
//   prefix       : 후보를 이 접두어 아래로 제한. null 이면 1:1 매칭 대상 아님.
//   productLevel : 접두어가 이미 제품/도구 단위인가. false 면 1:1 실패 시 랜딩 유도를
//                  하지 않는다 (단종 부품을 엉뚱한 제품 페이지로 보내지 않기 위함).
function allowedPrefix(src) {
  const s = segs(src);            // ['docs', 'en', section, ...]
  const section = s[2];
  const docsSection = SECTION_MAP[section];
  if (section === 'common') return { prefix: '/docs/common/', productLevel: true };

  // 팝업 조각. 본문에서 AJAX 로 불러 쓰지만 그 자체로도 접근 가능한 URL 이고,
  // 상당수는 docs 에 같은 이름의 문서가 있다.
  if (section === 'popup') {
    const sub = (s[3] || '').toLowerCase();
    if (sub === 'arduino_api') return { prefix: '/docs/software/arduino_ide/arduino_api/', productLevel: true };
    if (sub === 'engineer')    return { prefix: '/docs/edu/engineer/', productLevel: true };
    if (sub === 'op3_ros2')    return { prefix: '/docs/systems/op3/', productLevel: true };
    if (sub === 'turtlebot3')  return { prefix: '/docs/systems/turtlebot3/', productLevel: true };
    if (sub === 'general')     return { prefix: '/docs/faq/', productLevel: false };
    // 최상위 조각은 msg/srv 정의가 대부분이라 이름이 충분히 고유하다.
    return { prefix: '/docs/', productLevel: false };
  }

  if (!docsSection) return null;

  if (section === 'platform') {
    // platform/common/* 은 humanoid_navigation, robotis_math 등 OP3 계열 공용 문서
    if (s[3] === 'common') return { prefix: '/docs/systems/op3/', productLevel: true };
    // platform/msgs/* 는 docs 에서 systems/msgs 와 systems/<제품>/msgs 로 나뉘었다
    if ((s[3] || '').toLowerCase() === 'msgs') return { prefix: '/docs/systems/', productLevel: false };
    const prod = PLATFORM_ALIAS[(s[3] || '').toLowerCase()];
    return prod ? { prefix: `/docs/systems/${prod}/`, productLevel: true } : null;
  }
  if (section === 'software') {
    const two = `${s[3]}/${s[4]}`.toLowerCase();
    const one = (s[3] || '').toLowerCase();
    const sw = SOFTWARE_ALIAS[two] || SOFTWARE_ALIAS[one];
    return sw ? { prefix: `/docs/software/${sw}/`, productLevel: true } : null;
  }
  return { prefix: `/docs/${docsSection}/`, productLevel: false };
}

// --- docs 인덱스 -------------------------------------------------------------
const idxLeaf = new Map();   // norm(마지막 세그먼트)      -> [docs 경로]
const idxTail2 = new Map();  // norm(상위+마지막 세그먼트) -> [docs 경로]
const push = (m, k, v) => { if (!k) return; if (!m.has(k)) m.set(k, []); m.get(k).push(v); };
for (const d of docsUrls) {
  push(idxLeaf, norm(leaf(d)), d);
  push(idxTail2, norm(tail2(d)), d);
}

// 후보가 여럿이면 상위 경로 세그먼트 일치 개수로 선택
function score(src, cand) {
  const a = new Set(segs(src).slice(2).map(norm));
  const b = new Set(segs(cand).slice(1).map(norm));
  let n = 0;
  for (const x of a) if (b.has(x)) n++;
  return n;
}

function match(src) {
  const scope = allowedPrefix(src);
  if (!scope) return null;
  const ok = c => (c + '/').startsWith(scope.prefix);

  const l = norm(leaf(src)), t2 = norm(tail2(src));
  // e-Manual 은 평면 구조(appendix_dynamixel), docs 는 중첩 구조(more_info/dynamixel)
  const bare = norm(leaf(src).replace(/^(appendix|appendixes)[-_]/, ''));
  const passes = [
    ['leaf',       idxLeaf.get(l)],
    ['leaf~tail2', idxTail2.get(l)],           // c_ping_2_0        -> .../c/ping_2_0
    ['series',     idxLeaf.get(l + 'series')], // dxl/ax/           -> .../ax_series/
    ['guide',      idxLeaf.get(l + 'guide')],  // quick_start       -> .../quick_start_guide
    ['unprefixed', bare !== l ? idxLeaf.get(bare) : null],   // appendix_lds_02 -> .../lds_02
    ['unprefix~2', bare !== l ? idxTail2.get(bare) : null],
    ['tail2',      idxTail2.get(t2)],
    ['tail2~leaf', idxLeaf.get(t2)],
  ];
  for (const [how, cands] of passes) {
    const filtered = (cands || []).filter(ok);
    if (!filtered.length) continue;
    let best = null, bestScore = -1;
    for (const c of filtered) { const sc = score(src, c); if (sc > bestScore) { bestScore = sc; best = c; } }
    return { dst: best, score: bestScore, ambiguous: filtered.length > 1, how };
  }
  return null;
}

// --- 제품별 랜딩 페이지 (1:1 매칭 실패 시 최소한 같은 제품으로 보냄) ----------
const LANDING_ORDER = ['introduction', 'overview', 'getting_started', 'quick_start', 'features', 'specification', 'specifications'];

// 자동 선택이 어색한 구간은 직접 지정 (모두 200 확인)
const LANDING_OVERRIDE = {
  '/docs/faq/': '/docs/faq/faq_general',
  '/docs/parts/controller/': '/docs/parts/controller/controller_compatibility',
  '/docs/common/': '/docs/common/ecosystem',
};

function landingFor(prefix) {
  if (LANDING_OVERRIDE[prefix]) return LANDING_OVERRIDE[prefix];
  const under = docsUrls.filter(d => (d + '/').startsWith(prefix));
  if (!under.length) return null;
  const rank = d => {
    const i = LANDING_ORDER.indexOf(leaf(d));
    return i === -1 ? LANDING_ORDER.length : i;
  };
  return under.sort((a, b) =>
    rank(a) - rank(b) || segs(a).length - segs(b).length || a.length - b.length)[0];
}
const landingCache = new Map();
const landing = prefix => {
  if (!landingCache.has(prefix)) landingCache.set(prefix, landingFor(prefix));
  return landingCache.get(prefix);
};

// 소스의 남은 경로 세그먼트로 docs 하위 디렉터리를 좁힌다.
// (parts/controller/cm-5 는 /docs/parts/ 가 아니라 /docs/parts/controller/ 안에서 찾아야 한다)
function docsChildren(prefix) {
  const n = segs(prefix).length;
  const set = new Set();
  for (const d of docsUrls) {
    if (!(d + '/').startsWith(prefix)) continue;
    const s = segs(d);
    if (s.length > n) set.add(s[n]);
  }
  return [...set];
}
function refinePrefix(src, prefix) {
  const srcRest = segs(src).slice(2);   // 'docs', 언어 제거
  let cur = prefix;
  for (const seg of srcRest) {
    const hit = docsChildren(cur).find(c => norm(c) === norm(seg));
    if (!hit) continue;
    const next = `${cur}${hit}/`;
    if (next.length > cur.length) cur = next;
  }
  return cur;
}

// 접두어를 못 구한 경우의 섹션 폴백 (모두 200 확인된 경로)
const SECTION_FALLBACK = [
  [/^\/docs\/(en|kr)\/software\/dynamixel\/dynamixel_sdk\//, '/docs/software/dynamixel_sdk/overview/'],
  [/^\/docs\/(en|kr)\/software\//,                           '/docs/software/overview/'],
  [/^\/docs\/(en|kr)\/(dxl|all-dyd|dyd)\//,                  '/docs/dxl/model_reference/'],
  [/^\/docs\/(en|kr)\/faq\//,                                '/docs/faq/faq_general/'],
];

const matched = [], fallback = [];
for (const src of emanual) {
  const ko = src.startsWith('/docs/kr/');
  const withLang = d => (ko ? (d === '/' ? '/ko/' : '/ko' + d) : d);

  const m = match(src);
  if (m) { matched.push({ ...m, src, dst: withLang(m.dst) }); continue; }

  // 같은 제품/도구(가능하면 같은 하위 섹션)의 랜딩으로 유도.
  // 섹션 루트에서 더 좁히지 못했다면 랜딩을 쓰지 않는다 — 단종 부품을
  // 관계없는 제품 페이지로 보내느니 docs 첫 화면에서 검색하게 두는 편이 낫다.
  const scope = allowedPrefix(src);
  let dst = null;
  if (scope) {
    const refined = refinePrefix(src, scope.prefix);
    if (scope.productLevel || refined !== scope.prefix) dst = landing(refined);
  }
  let how = dst ? 'landing' : 'section';
  if (!dst) {
    dst = '/';                                    // /docs/ 는 인덱스가 없어 404
    for (const [re, t] of SECTION_FALLBACK) if (re.test(src)) { dst = t; break; }
  }
  fallback.push({ src, dst: withLang(dst), how });
}

// --- 매핑 테이블 -------------------------------------------------------------
const mapObj = {};
for (const m of [...matched, ...fallback]) mapObj[canon(m.src)] = m.dst;

// docs/redirect/*.md 는 사람이 직접 관리한 매핑이므로 자동 매칭보다 우선한다.
// (예: turtlebot3/appendix_ld08 -> appendix_lds_02, dxl/pro_plus/h42p-... -> dxl/p/ph42-...)
const GENERIC = new Set(['/', '/ko/']);
let chained = 0;
for (let i = 0; i < 3; i++) {          // 다단 체인 대비 반복
  for (const [from, to] of legacyPairs) {
    const k = canon(from);
    const resolved = mapObj[canon(to)];
    if (!resolved || GENERIC.has(resolved)) continue;   // 일반 폴백으로는 덮어쓰지 않음
    if (mapObj[k] === resolved) continue;
    mapObj[k] = resolved;
    chained++;
  }
}

// 자동 매칭 대상이 아닌 예외 경로 (docs/** 밖에 있거나 언어 접두어가 없는 구주소)
const MANUAL_OVERRIDE = {
  '/engineer': '/docs/edu/engineer/kit1',
  '/openmanipulator': '/docs/systems/openmanipulator_x/assembly',
  '/docs/turtlebot3_textbook': '/ko/docs/systems/turtlebot3/overview/',
  '/smart3': '/ko/docs/software/overview',
};
for (const [k, v] of Object.entries(MANUAL_OVERRIDE)) mapObj[k] = v;

// docs 는 끝 슬래시가 없는 주소를 슬래시 붙은 주소로 301 한다.
// sitemap 에는 슬래시 없이 실려 있으므로 그대로 쓰면 방문자가 매번 두 번 이동한다.
// 슬래시를 붙인 형태는 전수 확인 결과 항상 곧바로 200 이다.
for (const k of Object.keys(mapObj)) {
  if (!mapObj[k].endsWith('/')) mapObj[k] += '/';
}

// --- 출력 --------------------------------------------------------------------
const entries = Object.entries(mapObj).sort(([a], [b]) => a.localeCompare(b));

fs.writeFileSync('redirects.csv',
  ['source,target,status',
   ...entries.map(([s, d]) => `https://emanual.robotis.com${s},https://docs.robotis.com${d},301`)
  ].join('\n') + '\n');

fs.writeFileSync('redirect-map.json', JSON.stringify(Object.fromEntries(entries), null, 0) + '\n');

// Jekyll(GitHub Pages)용 데이터 파일.
// _includes/redirect-to-docs.html 이 site.data.redirect_map[page.url] 로 조회한다.
// page.url 은 permalink 의 끝 슬래시 유무를 그대로 따르므로 두 형태를 모두 넣는다.
const jekyllMap = { '/': DEST + '/' };
for (const [src, dst] of entries) {
  const abs = DEST + dst;
  jekyllMap[src] = abs;
  jekyllMap[src.endsWith('/') ? src.slice(0, -1) : src + '/'] = abs;
}
fs.writeFileSync(path.join('..', '_data', 'redirect_map.json'),
  JSON.stringify(jekyllMap, null, 0) + '\n');

fs.writeFileSync('report-matched.txt',
  matched.map(m => `${m.how.padEnd(11)} score=${m.score} ${m.ambiguous ? 'AMBIG' : '     '}  ${m.src}  ->  ${m.dst}`)
    .sort().join('\n') + '\n');
fs.writeFileSync('report-fallback.txt',
  fallback.map(m => `${m.how.padEnd(8)} ${m.src}  ->  ${m.dst}`).sort().join('\n') + '\n');
fs.writeFileSync('report-ambiguous.txt',
  matched.filter(m => m.ambiguous).map(m => `score=${m.score}  ${m.src}  ->  ${m.dst}`).sort().join('\n') + '\n');

// --- Cloudflare Worker -------------------------------------------------------
fs.writeFileSync('worker.js', `/**
 * emanual.robotis.com -> docs.robotis.com 301 리다이렉트 Worker
 * 자동 생성 파일 — 직접 수정하지 말고 build-map.js 를 다시 실행할 것.
 * Routes: emanual.robotis.com/*
 */
const DEST = 'https://docs.robotis.com';

// e-Manual 경로 -> docs 경로 (${entries.length}건)
const MAP = ${JSON.stringify(Object.fromEntries(entries), null, 0)};

// MAP 에 없는 경로용 접두어 규칙 (모두 200 확인된 타깃)
const PREFIX_RULES = [
  [/^\\/docs\\/kr\\/software\\/dynamixel\\/dynamixel_sdk\\//, '/ko/docs/software/dynamixel_sdk/overview/'],
  [/^\\/docs\\/en\\/software\\/dynamixel\\/dynamixel_sdk\\//, '/docs/software/dynamixel_sdk/overview/'],
  [/^\\/docs\\/kr\\/software\\//,                             '/ko/docs/software/overview/'],
  [/^\\/docs\\/en\\/software\\//,                             '/docs/software/overview/'],
  [/^\\/docs\\/kr\\/(dxl|all-dyd|dyd)\\//,                    '/ko/docs/dxl/model_reference/'],
  [/^\\/docs\\/en\\/(dxl|all-dyd|dyd)\\//,                    '/docs/dxl/model_reference/'],
  [/^\\/docs\\/kr\\/faq\\//,                                  '/ko/docs/faq/faq_general/'],
  [/^\\/docs\\/en\\/faq\\//,                                  '/docs/faq/faq_general/'],
  [/^\\/docs\\/kr\\//,                                        '/ko/'],
  [/^\\/(kr|ko)\\//,                                          '/ko/'],
];

function resolve(pathname) {
  let p;
  try { p = decodeURIComponent(pathname); } catch { p = pathname; }
  p = p.replace(/\\/+$/, '') || '/';

  if (MAP[p]) return MAP[p];
  if (MAP[p.toLowerCase()]) return MAP[p.toLowerCase()];

  const stripped = p.replace(/\\/index\\.html$/, '').replace(/\\.html$/, '') || '/';
  if (MAP[stripped]) return MAP[stripped];

  for (const [re, target] of PREFIX_RULES) if (re.test(p + '/')) return target;
  return '/';
}

export default {
  fetch(request) {
    const url = new URL(request.url);
    const target = new URL(resolve(url.pathname), DEST);
    target.hash = url.hash;
    return Response.redirect(target.toString(), 301);
  },
};
`);

// --- 요약 --------------------------------------------------------------------
const tally = arr => arr.reduce((o, m) => (o[m.how] = (o[m.how] || 0) + 1, o), {});
console.log(`e-Manual 페이지  : ${emanual.length}`);
console.log(`docs 페이지      : ${docsUrls.length}`);
console.log(`1:1 매칭         : ${matched.length} (${(matched.length / emanual.length * 100).toFixed(1)}%)  ${JSON.stringify(tally(matched))}`);
console.log(`  후보 복수      : ${matched.filter(m => m.ambiguous).length}`);
console.log(`폴백             : ${fallback.length}  ${JSON.stringify(tally(fallback))}`);
console.log(`구주소 체인      : ${chained}`);
console.log(`매핑 총계        : ${entries.length}`);
