# emanual.robotis.com → docs.robotis.com 리다이렉트

구형 e-Manual의 모든 URL을 신규 ROBOTIS Docs(Docusaurus)로 넘기기 위한 매핑과 배포 자산입니다.

## 왜 매핑 테이블이 필요한가

두 사이트의 URL 체계가 다릅니다. 단순 접두어 치환으로는 해결되지 않습니다.

| | e-Manual | docs |
|---|---|---|
| 영어 | `/docs/en/…` | `/docs/…` (접두어 없음) |
| 한국어 | `/docs/kr/…` | `/ko/docs/…` |

경로 구조도 재편되었습니다.

```
/docs/en/platform/turtlebot3/sbc_setup          →  /docs/systems/turtlebot3/quick_start_guide/sbc_setup
/docs/en/platform/turtlebot3/additional_sensors →  /docs/systems/turtlebot3/more_info/additional_sensors
/docs/en/dxl/x/xl430-w250                       →  /docs/dxl/model_reference/x_series/xl_series/xl430-w250
/docs/en/software/dynamixel/dynamixel_sdk/sample_code/c_ping_protocol_2_0
                                                →  /docs/software/dynamixel_sdk/sample_code/c/ping_protocol_2_0
/docs/kr/dxl/dx/dx-117                          →  /ko/docs/dxl/model_reference/dx_series/dx-117
```

- `platform` → `systems`, 제품 아래 계층 신설(`model_reference`, `more_info`, `quick_start_guide`)
- e-Manual은 평면 구조(`appendix_dynamixel`), docs는 중첩 구조(`more_info/dynamixel`)
- docs의 **섹션 루트는 대부분 404**입니다 (`/docs/`, `/docs/parts/`, `/docs/systems/` 모두 없음). 폴백 타깃을 아무거나 쓰면 안 됩니다.

## 커버리지

| 구분 | 건수 | 비고 |
|---|---:|---|
| e-Manual URL | 1,178 | permalink 938 + 팝업 조각 240 |
| docs 페이지 | 877 | sitemap 기준 (ko 미러 881) |
| **1:1 매칭** | **824 (69.9%)** | 같은 문서로 직접 연결 |
| 제품/도구 랜딩 폴백 | 115 | 문서는 없지만 같은 제품이 docs에 있어 그 제품 페이지로 |
| 섹션 폴백 | 239 | docs 미이관 (BIOLOID·DREAM·OLLO·PLAY, CM-5/100/150/510, BT/ZIG 등 단종 제품) |
| 구주소 체인 | 22 | `docs/redirect/*.md` 의 짧은 주소 (`/en/dynamixel_sdk` 등) |
| 수동 지정 | 4 | `/engineer/`, `/openmanipulator/`, `/smart3/` 등 |
| **매핑 총계** | **1,188** | |

고유 타깃 **787개 전부 HTTP 200**이고, **그중 추가 리다이렉트가 발생하는 것은 0건**입니다 (`node verify.mjs`).

1:1 매칭률이 70%인 이유는 매칭 실패가 아니라 **해당 문서가 docs에 존재하지 않기 때문**입니다.
단종된 교육 키트와 구형 컨트롤러 문서가 신규 사이트로 이관되지 않았습니다.
대응 제품이 docs에 없는 경우에는 엉뚱한 제품 페이지 대신 docs 첫 화면으로 보냅니다.

### 주의해서 다룬 것

- **끝 슬래시** — docs 는 슬래시 없는 주소를 슬래시 붙은 주소로 301 하는데 sitemap 에는 슬래시 없이
  실려 있다. 그대로 쓰면 방문자가 매번 두 번 이동한다. 모든 타깃에 슬래시를 붙여 둔다.
- **팝업 조각** — `layout: popup` 인 240개는 permalink 가 없지만 그 자체로 접근 가능한 URL 이다
  (`/docs/en/popup/arduino_api/begin/` 은 실제로 200 이다). `collect.sh` 가 파일 경로에서 URL 을
  만들어 매핑에 포함한다. `arduino_api` 42개는 docs 와 이름까지 1:1 로 일치한다.
- **제품 교차 방지** — 슬러그만 보면 `platform/turtlebot3/quick-start` 가 `systems/op3/quick_start` 로
  매칭된다. `allowedPrefix()` 가 섹션·제품 단위로 후보를 제한한다.

## 적용 방식

### 현재 적용: GitHub Pages (DNS 변경 불필요)

이 저장소를 그대로 빌드하면 모든 페이지가 docs로 이동합니다. 추가 인프라가 필요 없습니다.

| 파일 | 역할 |
|---|---|
| `_data/redirect_map.json` | 경로 → docs 절대 URL (자동 생성) |
| `_includes/redirect-to-docs.html` | `<head>` 에 meta refresh + `location.replace()` 삽입 |
| `_includes/head.html` | 위 include 를 `seo.html` 보다 **먼저** 호출 |
| `_includes/seo.html` | canonical 을 docs 대상 문서로 지정 (순위 승계) |
| `_layouts/popup.html` | 팝업 조각도 직접 접근 가능하므로 함께 처리 |
| `_layouts/redirect.html` | 기존 내부 리다이렉트를 docs 로 **한 번에** (2단 이동 제거) |

빌드 결과 검증 기준 **1,186개 페이지가 매핑대로** 이동하고, 리다이렉트가 없는 것은 Jekyll 이 처리하지 않는 doxygen 정적 파일뿐입니다.
매핑에 없는 경로(검색, 아카이브, 404 등)는 언어에 따라 docs 첫 화면 또는 `/ko/` 로 보냅니다.

**한계**: meta refresh + JS 방식이라 진짜 301이 아닙니다. 순위 승계는 canonical 로 보완했지만 301보다 약합니다.
장기적으로는 아래 301 방식으로 교체하는 편이 좋습니다.

### 향후 교체: 진짜 301

**현재 `robotis.com` 은 Cloudflare가 아니라 가비아(`ns.gabia.co.kr`) 네임서버를 씁니다.**
Cloudflare Worker를 쓰려면 도메인 전체의 네임서버를 옮겨야 하고, 그러면 `www`, 메일(MX) 등
`robotis.com` 의 모든 레코드가 함께 영향을 받습니다. 리다이렉트 하나 때문에 감수할 위험이 아닙니다.

DNS를 **한 줄만** 바꾸는 방법을 권합니다.

1. `redirects.csv` 를 `_redirects` 형식으로 변환해 Cloudflare Pages 또는 Netlify에 배포
2. 가비아 DNS에서 `emanual` 레코드만 변경

```
emanual   CNAME   robotis-git.github.io        ← 현재
emanual   CNAME   emanual-redirect.pages.dev   ← 변경 후
```

`worker.js` 와 `wrangler.toml` 은 네임서버를 Cloudflare로 옮기는 경우를 위해 함께 생성해 둡니다.
Worker 쪽은 매핑에 없는 경로도 `.html` 꼬리 제거, 대소문자 보정, 접두어 규칙으로 흡수합니다.

## 파일

| 파일 | 설명 |
|---|---|
| `build-map.cjs` | 매핑 생성기. `redirect-map.json`, `_data/redirect_map.json`, `redirects.csv`, `worker.js` 를 만든다 |
| `collect.sh` | 생성기의 입력 데이터 재수집 |
| `verify.mjs` | 리다이렉트 누락 및 타깃 HTTP 상태 검증 |
| `redirect-map.json` | 경로 → 경로 매핑 원본 |
| `redirects.csv` | Cloudflare Bulk Redirects 업로드용 (`source,target,status`) |
| `worker.js` | Cloudflare Worker (자동 생성) |
| `wrangler.toml` | Worker 배포 설정 |
| `report-matched.txt` | 1:1 매칭 내역 (매칭 방식·점수 포함) |
| `report-fallback.txt` | 폴백 처리된 경로 |
| `report-ambiguous.txt` | 후보가 여럿이라 사람 확인이 필요한 건 (5건) |
| `data/` | 생성 입력 (docs sitemap, e-Manual permalink, 구주소 쌍) |

## 매핑 갱신

docs 사이트에 문서가 추가되거나 경로가 바뀌면:

```bash
cd redirects
./collect.sh          # sitemap 및 permalink 재수집
node build-map.cjs    # 매핑·_data/redirect_map.json·worker.js·CSV 재생성
node verify.mjs       # 검증 (--sample 로 표본만)
```

`_data/redirect_map.json` 과 `worker.js` 는 **자동 생성 파일**입니다. 직접 고치지 말고 `build-map.cjs` 를 수정하세요.

### 매핑을 손으로 고쳐야 할 때

`build-map.cjs` 상단의 대응표를 수정합니다.

- `PLATFORM_ALIAS` — e-Manual `platform/<X>` → docs `systems/<Y>`. 값이 없으면 docs 미이관으로 간주해 폴백 처리
- `SOFTWARE_ALIAS` — e-Manual `software/<X[/Y]>` → docs `software/<Z>`
- `LANDING_OVERRIDE` — 폴백 랜딩 페이지 직접 지정
- `SECTION_FALLBACK` — 제품 대응조차 없을 때의 최종 목적지
- `MANUAL_OVERRIDE` — `docs/**` 밖의 예외 경로

슬러그만 보고 매칭하면 제품이 뒤바뀝니다 (예: `platform/turtlebot3/quick-start` 가 `systems/op3/quick_start` 로 매칭됨).
`allowedPrefix()` 가 섹션·제품 단위로 후보를 제한하니 이 제약을 풀지 마세요.

## 검증

```bash
cd redirects
node verify.mjs --sample   # 표본 (빠름)
node verify.mjs            # 전체 787건 (수 분)
```

Jekyll 빌드 결과까지 확인하려면:

```bash
bundle exec jekyll build --destination /tmp/emanual_site
grep -c 'http-equiv="refresh"' -r /tmp/emanual_site --include='*.html'
```

## 남은 것

- **doxygen 정적 파일 276개** — `docs/en/software/robotis_manipulator_libs/doxygen/html/` 아래.
  Jekyll이 처리하지 않고 그대로 복사하는 파일이라 리다이렉트가 들어가지 않습니다.
  이 라이브러리 문서는 docs로 이관되지 않았으므로 그대로 두어도 무방합니다.
- `_layouts/default.html` 의 이전 안내 팝업은 남겨 두었습니다.
  리다이렉트가 먼저 걸려 노출되지 않지만, 리다이렉트를 되돌릴 경우의 대비책입니다.
