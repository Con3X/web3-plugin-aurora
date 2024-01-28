web3.js plugin for Aurora NEAR engine
===========

[![Dependency Status][downloads-image]][npm-url]

This is an npm package containing a web3.js plugin for Aurora NEAR engine.

Aurora is an EVM-compatible blockchain built as a smart contract atop NEAR blockchain. This plugin would leverage Aurora custom RPC methods (https://doc.aurora.dev/evm/rpc/) and other custom behavior enabled at Aurora especially Cross-Contract Calls (XCC). More on Aurora XCC at https://github.com/aurora-is-near/aurora-contracts-sdk.


Plugin usage by users
------------
At your typescript project first run:
`yarn add web3 @con3x/web3-plugin-aurora`

And here is how to use the plugin:
```ts
import { Web3 } from 'web3';
import { AuroraPlugin } from '@con3x/web3-plugin-aurora';

async function aurora() {
  const web3 = new Web3('https://mainnet.aurora.dev');
  web3.registerPlugin(new AuroraPlugin(web3.provider));

  const blockNumber = await web3.aurora.getBlockNumber();
  console.log('aurora blockNumber', blockNumber);

  const parityPendingTransactions =
    await web3.aurora.parityPendingTransactions();
  console.log('aurora parityPendingTransactions', parityPendingTransactions);
}

aurora();
```

You can play with the npm package online at: https://codesandbox.io/p/devbox/testing-web3-plugin-aurora-v7249s?file=%2Findex.js

Project progress:
------------

### NEAR Aurora Plugin

![](https://us-central1-progress-markdown.cloudfunctions.net/progress/100?dangerColor=ccee00&warningColor=eeff00&successColor=006600) Create NEAR Aurora Plugin and publish it to the `npm` registry

The web3.js plugin for NEAR Aurora has been publish to  
https://www.npmjs.com/package/@con3x/web3-plugin-aurora and it is useable inside this example playground: https://codesandbox.io/p/devbox/testing-web3-plugin-aurora-v7249s?file=%2Findex.js. Additionally, some tests has been written to test the basic functionality. 

![](https://us-central1-progress-markdown.cloudfunctions.net/progress/50?dangerColor=ccee00&warningColor=eeff00&successColor=006600) `web3.aurora` is also accessible as `web3.near.aurora`

Aurora plugin could be used now as `web3.near.aurora`.
However, its registration needs a bit of simplification. A PR would be opened later on web3.js registry for this and similar use cases.


![](https://us-central1-progress-markdown.cloudfunctions.net/progress/90?dangerColor=ccee00&warningColor=eeff00&successColor=006600) Enable all Ethereum RPC methods on `AuroraPlugin`

Now all Ethereum RPC methods are callable on `web3.aurora` (and on `web3.near.aurora` as a consequence). However, there is a small modification needed to not expose the unsupported methods on `web3.aurora` and the `AuroraPlugin` class.


![](https://us-central1-progress-markdown.cloudfunctions.net/progress/10?dangerColor=ccee00&warningColor=eeff00&successColor=006600) Support custom RPC methods on `AuroraPlugin` (the non-basic-Ethereum)

Some of the custom RPC endpoints available at Aurora Engine are now callable on `AuroraPlugin` as an example of this functionality. However, some of them seems to not be yet implemented in the current version running the main net and test net. Even though, they is marked as completed at:  https://doc.aurora.dev/evm/rpc. So, this need to be double checked.
    

### NEAR Plugin

There is a web3.js plugin for the NEAR protocol. Check its repository at: https://github.com/con3x/web3-plugin-near

Running Tests
--------------

### Testing AuroraPlugin

Executing `yarn test aurora.test.ts` would give something like:
```bash

 PASS  test/aurora.test.ts
  AuroraPlugin Tests
    AuroraPlugin can call Ethereum standard RPC endpoints
      ✓ should call `getBlockNumber` method with expected param (429 ms)
      ✓ should call `block` method with expected param (189 ms)
      ✓ should call `getProtocolVersion` (198 ms)
      ✓ should call `isSyncing` (194 ms)
      ✓ should call `getGasPrice` (196 ms)
      ✓ should call `getCoinbase` (129 ms)
      ✓ should call `getCoinbase` (153 ms)
    AuroraPlugin can call the additional Aurora endpoints
      ✓ should call `parityPendingTransactions` (195 ms)
      ○ skipped should call `txpoolStatus`
      ○ skipped should call `txpoolInspect`
      ○ skipped should call `txpoolContent`

Test Suites: 1 passed, 1 total
Tests:       3 skipped, 8 passed, 11 total
Snapshots:   0 total
Time:        3.969 s, estimated 4 s
Ran all test suites matching /aurora.test.ts/i.
Done in 4.42s.
```


Executing `yarn test near.aurora.test.ts` would give something like:
```bash
 PASS  test/near.aurora.test.ts
  AuroraPlugin Tests
    ✓ should have `web3.near.aurora` setup (1 ms)
    ✓ should call `getBlockNumber` method on `web3.near.aurora` (395 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        2.658 s, estimated 3 s
Ran all test suites matching /near.aurora.test/i.
Done in 3.19s.
```

Contributing
------------

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.



[npm-url]: https://npmjs.org/package/@con3x/web3-plugin-near
[downloads-image]: https://img.shields.io/npm/dm/@con3x/web3-plugin-near?label=npm%20downloads
