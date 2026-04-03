#!/bin/bash
export PATH="/Users/amypendleton/.nvm/versions/node/v24.14.1/bin:$PATH"
cd "/Users/amypendleton/Library/Mobile Documents/com~apple~CloudDocs/Design Portfolio"
npx wrangler pages deploy . --project-name=portfolio --commit-dirty=true
