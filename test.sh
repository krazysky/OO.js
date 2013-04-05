echo "var assert = require('assert');" > temp_test.js
cat OO.js test.js >> temp_test.js
nodejs temp_test.js

cat header.html test.js footer.html > test.html
