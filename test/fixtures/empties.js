from('a');
from = 1;

require();
require(123);

require.resolve();
require.resolve('c');

z[require]('f');

require,('a');

function require() {}
function require(a) {}

function a(): require {}

require('a' + 'c');
