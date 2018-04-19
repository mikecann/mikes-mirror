#/bin/bash

git fetch;
LOCAL=$(git rev-parse HEAD);
REMOTE=$(git rev-parse @{u});

#if our local revision id doesn't match the remote, we will need to pull the changes
if [ $LOCAL != $REMOTE ]; then
    echo "detected changes on remote, updating.."
    git pull origin master;
    yarn install
    echo "updated."
else
    echo "no changes"
fi
