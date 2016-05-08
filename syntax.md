# `import`/`export` syntax

```js
import defaultMember from "module-name";
import * as name from "module-name";
import { member } from "module-name";
import { member as alias } from "module-name";
import { member1 , member2 } from "module-name";
import { member1 , member2 as alias2 , [...] } from "module-name";
import defaultMember, { member [ , [...] ] } from "module-name";
import defaultMember, * as name from "module-name";
import "module-name";

export * from "module-name";
export { name1, name2, …, nameN } from "module-name";
export { import1 as name1, import2 as name2, …, nameN } from "module-name";
```

https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import
https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export
