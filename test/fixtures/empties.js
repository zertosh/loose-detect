from('a');

require();
require(123);

require.resolve();
require.resolve('c');

x.require('d');
x.y.require('e');

z[require]('f');
