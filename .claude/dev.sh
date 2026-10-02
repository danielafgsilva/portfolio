#!/bin/bash
# Herd-managed nvm; the desktop app doesn't source ~/.zshrc, so load it here.
export NVM_DIR="$HOME/Library/Application Support/Herd/config/nvm"
. "$NVM_DIR/nvm.sh"
cd "$(dirname "$0")/.."
exec pnpm dev
