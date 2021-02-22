# fluent-decoders

[![npm latest version](https://img.shields.io/npm/v/@tdreyno/fluent-decoders/latest.svg)](https://www.npmjs.com/package/@tdreyno/fluent-decoders)
[![Minified Size](https://badgen.net/bundlephobia/minzip/@tdreyno/fluent-decoders)](https://bundlephobia.com/result?p=@tdreyno/fluent-decoders)

fluent-decoders is a Fluent-style API wrapper around [nvie/decoders](https://github.com/nvie/decoders).

**Note: Version is ALWAYS locked to same number as upstream `decoders` library**

## Example

```typescript
import { array, boolean, string, tuple3 } from "@tdreyno/fluent-decoders"

interface Person {
  name: string
  age: string
  isActive: boolean
}

const toPerson = ([name, age, isActive]): Person => ({ name, age, isActive })

const containsInt = (s: any): s is StringInt => !isNaN(parseInt(s, 10))

const personDecoder = tuple3(string, string.refine(containsInt), boolean).map(
  toPerson,
)

const person = personDecoder.validate(["Name", "42", true])

// Compose
const people = array(personDecoder).validate([
  ["A", "4", true],
  ["B", "2", false],
])
```

## Installation

### Yarn

```sh
yarn add @tdreyno/fluent-decoders
```

### NPM

```sh
npm install --save @tdreyno/fluent-decoders
```

## License

fluent-decoders is licensed under the Hippocratic License. It is an [Ethical Source license](https://ethicalsource.dev) derived from the MIT License, amended to limit the impact of the unethical use of open source software.
