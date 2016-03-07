export * from 'a';
export { name1, name2 } from 'b';
export { import1 as name1, import2 as name2 } from 'c';

import defaultMember from 'd';
import * as name from 'e';
import { member } from 'f';
import { member as alias } from 'g';
import { member1 , member2 } from 'h';
import { member1 , member2 as alias2 } from 'i';
import defaultMember, { member } from 'j';
import defaultMember, * as name from 'k';
import 'l';

import type typeName from 'm';
import typeof typeName from 'n';
import typeof * as typeName from 'o';

export default 1;
export var foo = 1;
