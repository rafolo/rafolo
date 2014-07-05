#/usr/bin/env/sh
set -e
components="bulbasaur squirtle charmander"

for component in $components
do
    echo "Testing component: $component"
    cd $component
    npm install
    npm test
    cd ..
done