#!/bin/bash
# Production build + server for perf/asset checks (port 3001, dev stays on 3000).
export NVM_DIR="$HOME/Library/Application Support/Herd/config/nvm"
. "$NVM_DIR/nvm.sh"
cd "$(dirname "$0")/.."
export NEXT_DIST_DIR=.next-prod
pnpm build && exec pnpm start -p 3001
