/**
 * 생성된 리다이렉트를 검증한다.
 *   1) worker.js 의 resolve() 가 모든 e-Manual 경로에 대해 타깃을 내는지
 *   2) 모든 고유 타깃이 곧바로 HTTP 200 인지
 *      — 리다이렉트를 따라가지 않고 확인한다. docs 는 끝 슬래시가 없는 주소를
 *        슬래시 붙은 주소로 301 하므로, 따라가며 검사하면 방문자가 두 번
 *        이동하고 있다는 사실을 놓친다.
 *
 * 사용법:  node verify.mjs           (전체 검증, 수 분 소요)
 *          node verify.mjs --sample  (타깃 50개만 표본 검증)
 */
import fs from 'node:fs';
import worker from './worker.js';

const DEST = 'https://docs.robotis.com';
const CONCURRENCY = 16;
const sampleOnly = process.argv.includes('--sample');

const map = JSON.parse(fs.readFileSync(new URL('./redirect-map.json', import.meta.url), 'utf8'));
const sources = Object.keys(map);

// 1) Worker 가 모든 소스에 대해 리다이렉트를 내는지
const missing = [];
for (const src of sources) {
  const res = await worker.fetch(new Request('https://emanual.robotis.com' + src));
  const loc = res.headers.get('location');
  if (res.status !== 301 || !loc) missing.push(src);
}
console.log(`소스 ${sources.length}건 중 리다이렉트 미생성: ${missing.length}`);
missing.slice(0, 10).forEach(s => console.log('  ', s));

// 2) 타깃 HTTP 상태
let targets = [...new Set(Object.values(map))].map(p => DEST + p).sort();
if (sampleOnly) targets = targets.filter((_, i) => i % Math.ceil(targets.length / 50) === 0);
console.log(`\n타깃 ${targets.length}건 HTTP 상태 확인 중...`);

const bad = [], hops = [];
let done = 0;
const sleep = ms => new Promise(r => setTimeout(r, ms));

// 동시 요청이 많으면 간헐적으로 503 이 섞여 나오므로 재시도한다.
async function check(url, attempt = 1) {
  try {
    const res = await fetch(url, { redirect: 'manual' });
    if (res.status === 200) return null;
    if (res.status >= 300 && res.status < 400) {
      hops.push(`${url.replace(DEST, '')}  ->  ${res.headers.get('location')}`);
      return null;                      // 도달은 하지만 한 번 더 이동한다
    }
    if (attempt < 3) { await sleep(500 * attempt); return check(url, attempt + 1); }
    return `${res.status} ${url}`;
  } catch (e) {
    if (attempt < 3) { await sleep(500 * attempt); return check(url, attempt + 1); }
    return `ERR ${url} (${e.message})`;
  }
}

async function worker_(queue) {
  for (;;) {
    const url = queue.pop();
    if (!url) return;
    const fail = await check(url);
    if (fail) bad.push(fail);
    if (++done % 100 === 0) process.stdout.write(`  ${done}/${targets.length}\r`);
  }
}
const queue = [...targets];
await Promise.all(Array.from({ length: CONCURRENCY }, () => worker_(queue)));

console.log(`\n도달 불가 타깃          : ${bad.length}`);
bad.forEach(b => console.log('  ', b));
console.log(`추가 리다이렉트 발생    : ${hops.length}  (끝 슬래시 정규화가 빠졌다는 뜻)`);
hops.slice(0, 15).forEach(h => console.log('  ', h));
process.exit(missing.length || bad.length || hops.length ? 1 : 0);
