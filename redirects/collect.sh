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
# (a) front matter 의 permalink
grep -rh --include='*.md' '^permalink:' "$REPO/docs" "$REPO/_pages" "$REPO/index.md" \
  | sed 's/^permalink:[[:space:]]*//; s/[[:space:]]*$//' > data/emanual_urls.tmp
n_perma=$(wc -l < data/emanual_urls.tmp)

# (b) permalink 이 없는 팝업 조각. Jekyll 이 파일 경로 그대로 URL 을 만든다.
#     docs/en/popup/arduino_api/begin.md -> /docs/en/popup/arduino_api/begin/
grep -rl --include='*.md' '^layout: popup' "$REPO/docs" \
  | sed "s|^$REPO||; s|\.md$|/|" >> data/emanual_urls.tmp
n_popup=$(( $(wc -l < data/emanual_urls.tmp) - n_perma ))

sort -u data/emanual_urls.tmp > data/emanual_urls.txt
rm -f data/emanual_urls.tmp
echo "      permalink $n_perma / 팝업 조각 $n_popup -> 중복 제거 후 $(wc -l < data/emanual_urls.txt)"

echo "[3/3] 기존 리다이렉트 페이지 매핑 추출"
: > data/legacy_pairs.tsv
for f in "$REPO"/docs/redirect/*.md; do
  p=$(grep -m1 '^permalink:'   "$f" | sed 's/^permalink:[[:space:]]*//;   s/[[:space:]]*$//') || true
  r=$(grep -m1 '^redirecturl:' "$f" | sed 's/^redirecturl:[[:space:]]*//; s/[[:space:]]*$//') || true
  [ -n "${p:-}" ] && [ -n "${r:-}" ] && printf '%s\t%s\n' "$p" "$r" >> data/legacy_pairs.tsv
done
echo "      $(wc -l < data/legacy_pairs.tsv) 쌍"
