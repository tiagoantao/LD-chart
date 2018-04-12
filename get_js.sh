#!/bin/bash

echo this will take a bit of time as three.js source is quite big
echo
echo

rm r91.tar.gz

wget https://github.com/mrdoob/three.js/archive/r91.tar.gz

tar zxf r91.tar.gz

cp three.js-r91/build/three.js three.js
# could be three.min.js or three.module.js

rm -rf three.js-r91 r91.tar.gz
