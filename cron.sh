#!/bin/bash
changed=0
git remote update && git status -uno | grep -q 'Your branch is behind' && changed=1
if [ $changed = 1 ]; then
    echo "Update needed, running..";
    git pull
    yarn install
    echo "Updated successfully";
fi