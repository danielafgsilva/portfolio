#!/bin/bash
export PATH="/Users/danielasilva/Library/Application Support/Herd/config/nvm/versions/node/v22.19.0/bin:$PATH"
cd "$(dirname "$0")/.."
exec pnpm dev
