#!/usr/bin/env bash
# build-map.cjs 의 입력 데이터를 다시 수집한다.
#   data/docs_urls.txt    : docs.robotis.com sitemap 의 영문 URL 목록
#   data/emanual_urls.txt : 이 저장소 md 파일들의 permalink 목록
#   data/legacy_pairs.tsv : docs/redirect/*.md 의 permalink -> redirecturl 쌍
#
# 사용법:  cd redirects && ./collect.sh && node build-map.cjs
set -euo pipefail

cd "$(dirname "$0")"
mkdir -p data
REPO=..

echo "[1/3] docs.robotis.com sitemap 수집"
curl -sfL https://docs.robotis.com/sitemap.xml \
  | grep -o '<loc>[^<]*</loc>' | sed 's|</\?loc>||g' > data/docs_urls.txt
echo "      $(wc -l < data/docs_urls.txt) URL"

echo "[2/3] e-Manual URL 추출"
# (a) front matter 의 permalink.
#     느슨하게 찾으면 안 된다. docs/kr/faq/contents_guide.md 처럼 본문에서
#     permalink 작성법을 설명하는 들여쓰기된 예시가 섞여 들어온다.
grep -rh --include='*.md' '^permalink:' "$REPO/docs" "$REPO/_pages" "$REPO/index.md" \
  | sed 's/^permalink:[[:space:]]*//; s/[[:space:]]*$//' > data/emanual_urls.tmp
n_perma=$(wc -l < data/emanual_urls.tmp)

# (b) permalink 이 없는 md 는 파일 경로가 곧 URL 이 된다.
#       docs/en/popup/arduino_api/begin.md -> /docs/en/popup/arduino_api/begin/
#     layout 이나 front matter 유무로 거르면 안 된다. GitHub Pages 는 저장소의
#     Gemfile 을 무시하고 자체 플러그인 세트로 빌드하는데, 그중
#     jekyll-optional-front-matter 가 front matter 없는 md 까지 페이지로 만들고
#     jekyll-default-layout 이 레이아웃을 붙인다. 로컬 `jekyll build` 로는
#     이 파일들이 정적 파일로 남아 보이지 않는다 (docs/en/faq/op.md 가 그 예다).
grep -rL --include='*.md' '^permalink:' "$REPO/docs" \
  | sed "s|^$REPO||; s|\.md$|/|" >> data/emanual_urls.tmp
n_path=$(( $(wc -l < data/emanual_urls.tmp) - n_perma ))

sort -u data/emanual_urls.tmp > data/emanual_urls.txt
rm -f data/emanual_urls.tmp
echo "      permalink $n_perma / 경로 기반 $n_path -> 중복 제거 후 $(wc -l < data/emanual_urls.txt)"

echo "[3/3] 기존 리다이렉트 페이지 매핑 추출"
: > data/legacy_pairs.tsv
for f in "$REPO"/docs/redirect/*.md; do
  p=$(grep -m1 '^permalink:'   "$f" | sed 's/^permalink:[[:space:]]*//;   s/[[:space:]]*$//') || true
  r=$(grep -m1 '^redirecturl:' "$f" | sed 's/^redirecturl:[[:space:]]*//; s/[[:space:]]*$//') || true
  [ -n "${p:-}" ] && [ -n "${r:-}" ] && printf '%s\t%s\n' "$p" "$r" >> data/legacy_pairs.tsv
done
echo "      $(wc -l < data/legacy_pairs.tsv) 쌍"
