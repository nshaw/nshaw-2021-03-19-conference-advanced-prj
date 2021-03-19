INLINE_RUNTIME_CHUNK=false npm run build

pushd build/static/js

mv -f 2*.js vendor.session-table.js
mv -f main*.js main.session-table.js
mv -f runtime~main*.js runtime.session-table.js

popd

serve -l 5002 build
