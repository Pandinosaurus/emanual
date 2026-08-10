# emanual.robotis.com → docs.robotis.com 리다이렉트

구형 e-Manual의 모든 URL을 신규 ROBOTIS Docs(Docusaurus)로 **301 리다이렉트**하기 위한 매핑과 배포 자산입니다.

## 왜 매핑 테이블이 필요한가

두 사이트의 URL 체계가 다릅니다. 단순 접두어 치환으로는 해결되지 않습니다.

| | e-Manual | docs |
|---|---|---|
| 영어 | `/docs/en/…` | `/docs/…` (접두어 없음) |
| 한국어 | `/docs/kr/…` | `/ko/docs/…` |

경로 구조도 재편되었습니다.

```
/docs/en/platform/turtlebot3/sbc_setup       →  /docs/systems/turtlebot3/quick_start_guide/sbc_setup
/docs/en/platform/turtlebot3/additional_sensors →  /docs/systems/turtlebot3/more_info/additional_sensors
/docs/en/dxl/x/xl430-w250                    →  /docs/dxl/model_reference/x_series/xl_series/xl430-w250
/docs/en/software/dynamixel/dynamixel_sdk/sample_code/c_ping_protocol_2_0
                                             →  /docs/software/dynamixel_sdk/sample_code/c/ping_protocol_2_0
/docs/kr/dxl/dx/dx-117                       →  /ko/docs/dxl/model_reference/dx_series/dx-117
```

- `platform` → `systems`, 제품 아래 계층 신설(`model_reference`, `more_info`, `quick_start_guide`)
- e-Manual은 평면 구조(`appendix_dynamixel`), docs는 중첩 구조(`more_info/dynamixel`)
- docs의 **섹션 루트는 대부분 404**입니다 (`/docs/`, `/docs/parts/`, `/docs/systems/` 모두 없음). 폴백 타깃을 아무거나 쓰면 안 됩니다.

## 현재 커버리지

| 구분 | 건수 | 비고 |
|---|---:|---|
| e-Manual permalink | 938 | `docs/**/*.md` 의 `permalink` |
| docs 페이지 | 877 | sitemap 기준 (ko 미러 881) |
| **1:1 매칭** | **573 (61.1%)** | 같은 문서로 직접 연결 |
| 제품/도구 랜딩 폴백 | 287 | 대응 문서는 없지만 같은 제품 페이지로 |
| 섹션 폴백 | 78 | docs 미이관 (BIOLOID·DREAM·OLLO·PLAY, CM-5/100/150/510, BT/ZIG 등 단종 제품) |
| 구주소 체인 | 22 | `docs/redirect/*.md` 의 짧은 주소 (`/en/dynamixel_sdk` 등) |
| **매핑 총계** | **944** | |

고유 타깃 **587개 전부 HTTP 200 확인 완료** (`node verify.mjs`).

1:1 매칭률이 61%인 이유는 매칭 실패가 아니라 **해당 문서가 docs에 존재하지 않기 때문**입니다. 단종된 교육 키트와 구형 컨트롤러 문서가 신규 사이트로 이관되지 않았습니다.

## 파일

| 파일 | 설명 |
|---|---|
| `worker.js` | **배포 대상.** 매핑 테이블을 내장한 Cloudflare Worker (자동 생성) |
| `redirects.csv` | Cloudflare Bulk Redirects 업로드용 (`source,target,status`) |
| `redirect-map.json` | 경로 → 경로 매핑 원본 |
| `build-map.cjs` | 매핑 생성기 |
| `collect.sh` | `build-map.cjs` 의 입력 데이터 재수집 |
| `verify.mjs` | 리다이렉트 및 타깃 상태 검증 |
| `wrangler.toml` | Worker 배포 설정 |
| `report-matched.txt` | 1:1 매칭 내역 (매칭 방식·점수 포함) |
| `report-fallback.txt` | 폴백 처리된 경로 |
| `report-ambiguous.txt` | 후보가 여럿이라 사람 확인이 필요한 건 (3건) |
| `data/` | 생성 입력 (docs sitemap, e-Manual permalink, 구주소 쌍) |

## 배포

### 사전 조건

`emanual.robotis.com` 이 Cloudflare를 거쳐야 합니다.

1. `robotis.com` 존을 Cloudflare에 등록 (이미 되어 있다면 생략)
2. `emanual` 레코드를 **프록시 상태(주황 구름)** 로 설정
   - Worker가 origin 앞에서 응답하므로 GitHub Pages를 계속 가리켜도 무방합니다.
   - 리다이렉트 문제 발생 시 Worker route만 지우면 즉시 기존 사이트로 롤백됩니다.

### Worker 배포

```bash
cd redirects
npx wrangler login
npx wrangler deploy
```

`wrangler.toml` 의 route가 `emanual.robotis.com/*` 이므로 배포 즉시 전 경로에 적용됩니다.

### 대안: Bulk Redirects

코드 배포 없이 대시보드에서 처리하려면 `redirects.csv` 를
**Rules → Bulk Redirects → 목록 생성 → CSV 업로드** 하면 됩니다.

주의할 점:
- Bulk Redirects는 플랜별 건수 쿼터가 있습니다. 944건이 수용되는지 먼저 확인하세요.
- 매핑에 없는 경로(`.html` 꼬리, 대소문자 변형, 오래된 외부 링크)는 처리되지 않습니다. Worker는 이를 접두어 규칙으로 흡수합니다.

## 검증

```bash
cd redirects
node verify.mjs --sample   # 표본 50건 (빠름)
node verify.mjs            # 전체 587건 (수 분)
```

배포 후 실제 응답 확인:

```bash
curl -sI https://emanual.robotis.com/docs/en/dxl/x/xl430-w250/ | grep -i '^location'
# → location: https://docs.robotis.com/docs/dxl/model_reference/x_series/xl_series/xl430-w250
```

## 매핑 갱신

docs 사이트에 문서가 추가되거나 경로가 바뀌면:

```bash
cd redirects
./collect.sh        # sitemap 및 permalink 재수집
node build-map.cjs   # 매핑·worker.js·CSV 재생성
node verify.mjs     # 검증
npx wrangler deploy
```

`worker.js` 는 자동 생성 파일입니다. 직접 수정하지 말고 `build-map.cjs` 를 고치세요.

### 매핑을 손으로 고쳐야 할 때

`build-map.cjs` 상단의 대응표를 수정합니다.

- `PLATFORM_ALIAS` — e-Manual `platform/<X>` → docs `systems/<Y>`. 값이 없으면 docs 미이관으로 간주해 폴백 처리합니다.
- `SOFTWARE_ALIAS` — e-Manual `software/<X[/Y]>` → docs `software/<Z>`
- `LANDING_OVERRIDE` — 폴백 랜딩 페이지를 직접 지정
- `SECTION_FALLBACK` — 제품 대응조차 없을 때의 최종 목적지

슬러그만 보고 매칭하면 제품이 뒤바뀌므로(예: `platform/turtlebot3/quick-start` 가 `systems/op3/quick_start` 로 매칭됨)
`allowedPrefix()` 가 섹션·제품 단위로 후보를 제한합니다. 이 제약을 풀지 마세요.

## 기존 e-Manual 사이트

Worker가 요청을 먼저 가로채므로 GitHub Pages 빌드는 그대로 두어도 됩니다.
`_layouts/default.html` 의 이전 안내 팝업도 리다이렉트가 적용되면 노출되지 않습니다.
