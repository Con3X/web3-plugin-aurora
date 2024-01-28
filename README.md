web3.js plugin for Aurora NEAR engine
===========

[![Dependency Status][downloads-image]][npm-url]

This is an npm package containing a web3.js plugin for Aurora NEAR engine.

Aurora is an EVM-compatible blockchain built as a smart contract atop NEAR blockchain. This plugin would leverage Aurora custom RPC methods (https://doc.aurora.dev/evm/rpc/). And it also disable the unsupported methods.


Plugin usage by users
------------
At your typescript project first run:
`yarn add web3 @conx3/web3-plugin-aurora`

And here is how to use the plugin:
```ts
import { Web3 } from 'web3';
import { AuroraPlugin } from '@conx3/web3-plugin-aurora';

async function aurora() {
  const web3 = new Web3('https://mainnet.aurora.dev');
  web3.registerPlugin(new AuroraPlugin(web3.provider));

  const blockNumber = await web3.aurora.eth.getBlockNumber();
  console.log('aurora blockNumber', blockNumber);

  const parityPendingTransactions =
    await web3.aurora.parity.pendingTransactions();
  console.log('aurora parity_pendingTransactions', parityPendingTransactions);
}

aurora();
```

You can play with the npm package online at: https://codesandbox.io/p/sandbox/testing-web3-plugin-aurora-v7249s

Supported RPC Methods
------------

Here are all RPC methods and how to call them using the plugin. The original table of RPC methods is from: https://doc.aurora.dev/evm/rpc/ :

<table style="width:100%">
  <tr>
    <th style="max-width:20%">Method</th>
    <th></th>
    <th class="left-border">How to call</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>web3_clientVersion</td>
    <td>✅</td>
    <td class="left-border">
      <code>web3.aurora.web3<wbr />.clientVersion()</code>
    </td>
    <td>Same as calling <code>eth.getNodeInfo()</code></td>
  </tr>
  <tr>
    <td>web3_sha3</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.web3<wbr />.sha3<wbr />(value)</code></td>
    <td>It supposes to provide the same result as calling <code>web3.utils.sha3</code></td>
  </tr>
  <tr>
    <td>net_listening</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.net<wbr />.isListening()</code></td>
    <td></td>
  </tr>
  <tr>
    <td>net_peerCount</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.net<wbr />.getPeerCount()</code></td>
    <td></td>
  </tr>
  <tr>
    <td>net_version</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.net<wbr />.getId()</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_accounts</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth<wbr />.getAccounts()</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_blockNumber</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth<wbr />.getBlockNumber()</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_call</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth<wbr />.call({ <br />
      &nbsp;&nbsp;to: contractAddress,<br />
      &nbsp;&nbsp;input: '0x...')<br />
      })</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_chainId</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth<wbr />.getChainId()</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_coinbase</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth<wbr />.getCoinbase()</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_compileLLL</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Unsupported</td>
  </tr>
  <tr>
    <td>eth_compileSerpent</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Unsupported</td>
  </tr>
  <tr>
    <td>eth_compileSolidity</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Unsupported</td>
  </tr>
  <tr>
    <td>eth_estimateGas</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth<wbr />.estimateGas(transaction)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_gasPrice</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth<wbr />.getGasPrice()</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getBalance</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth<wbr />.getBalance<wbr />(address)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getBlock<wbr />ByHash</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth<wbr />.getBlock<wbr />(blockHash)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getBlock<wbr />ByNumber</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth<wbr />.getBlock<wbr />(blockNumber)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getBlock<wbr />Transaction<wbr />Count<wbr />ByHash</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth.<wbr />getBlock<wbr />TransactionCount(blockHash)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getBlock<wbr />Transaction<wbr />Count<wbr />ByNumber</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth<wbr />.getBlock<wbr />TransactionCount<wbr />(blockNumber)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getCode</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth<wbr />.getCode(address)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getCompilers</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth<wbr />.getCompilers()</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getFilter<wbr />Changes</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth<wbr />.getFilterChanges<wbr />(filterId)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getFilter<wbr />Logs</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth<wbr />.getFilterLogs<wbr />(filterId)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getLogs</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth<wbr />.getPastLogs(filter)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getProof</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>EIP-1186</td>
  </tr>
  <tr>
    <td>eth_getStorageAt</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth<wbr />.getStorageAt<wbr />(address, storageSlot)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getTransaction<wbr />ByBlockHash<wbr />AndIndex</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth.<wbr />getTransaction<wbr />FromBlock<wbr />(blockHash, transactionIndex)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getTransaction<wbr />ByBlockNumber<wbr />AndIndex</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth.<wbr />getTransaction<wbr />FromBlock<wbr />(blockNumber, transactionIndex)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getTransaction<wbr />ByHash</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth.<wbr />getTransaction<wbr />(transactionHash)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getTransaction<wbr />Count</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth.<wbr />getTransactionCount<wbr />(address [, block])</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getTransaction<wbr />Receipt</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth.<wbr />getTransactionReceipt<wbr />(transactionHash)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getUncleBy<wbr />BlockHash<wbr />AndIndex</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth.<wbr />getUncle<wbr />(blockHash, uncleIndex)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getUncleBy<wbr />BlockNumber<wbr />AndIndex</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth.<wbr />getUncle<wbr />(blockNumberOrTag, uncleIndex)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getUncleCount<wbr />ByBlockHash</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth.<wbr />getBlockUncleCount<wbr />(blockHash)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getUncleCount<wbr />ByBlockNumber</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth.<wbr />getBlockUncleCount<wbr />(blockNumber)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_getWork</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Unsupported</td>
  </tr>
  <tr>
    <td>eth_hashrate</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth.<wbr />getHashRate()</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_mining</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth.isMining()</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_newBlockFilter</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth.<wbr />newBlockFilter()</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_newFilter</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth.<wbr />newFilter()</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_newPending<wbr />TransactionFilter</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth.<wbr />newPending<wbr />Transaction<wbr />Filter()</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_pending<wbr />Transactions</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth.<wbr />getPending<wbr />Transactions()</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_protocolVersion</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth.<wbr />getProtocol<wbr />Version()</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_sendRaw<wbr />Transaction</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth.<wbr />sendSigned<wbr />Transaction(tx)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_sendTransaction</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Unsupported</td>
  </tr>
  <tr>
    <td>eth_sign</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_signTransaction</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Unsupported</td>
  </tr>
  <tr>
    <td>eth_signTypedData</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Unsupported</td>
  </tr>
  <tr>
    <td>eth_submitHashrate</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Unsupported</td>
  </tr>
  <tr>
    <td>eth_submitWork</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Unsupported</td>
  </tr>
  <tr>
    <td>eth_syncing</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth<wbr />.isSyncing()</code></td>
    <td></td>
  </tr>
  <tr>
    <td>eth_uninstall<wbr />Filter</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.eth<wbr />.uninstallFilter(filterId)</code></td>
    <td></td>
  </tr>
  <tr>
    <td>db_getHex</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Deprecated</td>
  </tr>
  <tr>
    <td>db_getString</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Deprecated</td>
  </tr>
  <tr>
    <td>db_putHex</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Deprecated</td>
  </tr>
  <tr>
    <td>db_putString</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Deprecated</td>
  </tr>
  <tr>
    <td>shh_addToGroup</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Discontinued</td>
  </tr>
  <tr>
    <td>shh_getFilter<wbr />Changes</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Discontinued</td>
  </tr>
  <tr>
    <td>shh_getMessages</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Discontinued</td>
  </tr>
  <tr>
    <td>shh_hasIdentity</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Discontinued</td>
  </tr>
  <tr>
    <td>shh_newFilter</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Discontinued</td>
  </tr>
  <tr>
    <td>shh_newGroup</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Discontinued</td>
  </tr>
  <tr>
    <td>shh_newIdentity</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Discontinued</td>
  </tr>
  <tr>
    <td>shh_post</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Discontinued</td>
  </tr>
  <tr>
    <td>shh_uninstallFilter</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Discontinued</td>
  </tr>
  <tr>
    <td>shh_version</td>
    <td>❌</td>
    <td class="left-border"></td>
    <td>Discontinued</td>
  </tr>
  <tr>
    <td>txpool_content</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.txpool.<wbr />content()</code></td>
    <td>
    Geth extension
    <br />
    Not available (issue: <a href='https://github.com/aurora-is-near/doc.aurora.dev/issues/94'>doc.aurora.dev/issues/94</a>)
    </td>
  </tr>  <tr>
    <td>txpool_inspect</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.txpool.<wbr />inspect()</code></td>
    <td>
    Geth extension
    <br />
    Not available (issue: <a href='https://github.com/aurora-is-near/doc.aurora.dev/issues/94'>doc.aurora.dev/issues/94</a>)
    </td>
  </tr>
  <tr>
    <td>txpool_status</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.txpool.<wbr />status()</code></td>
    <td>
    Geth extension
    <br />
    Not available (issue: <a href='https://github.com/aurora-is-near/doc.aurora.dev/issues/94'>doc.aurora.dev/issues/94</a>)
    </td>
  </tr>
  <tr>
    <td>parity_pending<wbr />Transactions</td>
    <td>✅</td>
    <td class="left-border"><code>web3.aurora.parity.<wbr />pendingTransactions()</code></td>
    <td>Parity extension</td> 
  </tr>
</table>

</body>
</html>


Project progress:
------------

### NEAR Aurora Plugin

![](https://us-central1-progress-markdown.cloudfunctions.net/progress/100?dangerColor=ccee00&warningColor=eeff00&successColor=006600) Create NEAR Aurora Plugin and publish it to the `npm` registry

The web3.js plugin for NEAR Aurora has been publish to  
https://www.npmjs.com/package/@conx3/web3-plugin-aurora and it is useable inside this example playground: https://codesandbox.io/p/sandbox/misty-leftpad-v7249s?file=%2Findex.js. Additionally, some tests has been written to test some of the basic functionality. 

![](https://us-central1-progress-markdown.cloudfunctions.net/progress/100?dangerColor=ccee00&warningColor=eeff00&successColor=006600) `web3.aurora` is also accessible as `web3.near.aurora`

Aurora plugin could be used also as `web3.near.aurora`.
```ts
const web3 = new Web3("https://mainnet.aurora.dev");

const nearPlugin = new NearPlugin();
// registering the NearPlugin has to be done before registering the AuroraPlugin
// this will allow the provider to be passed from the Web3 instance to NearPlugin to AuroraPlugin
web3.registerPlugin(nearPlugin);
nearPlugin.registerPlugin(new AuroraPlugin());

const result = await web3.near.aurora.eth.getBlockNumber();
```

![](https://us-central1-progress-markdown.cloudfunctions.net/progress/100?dangerColor=ccee00&warningColor=eeff00&successColor=006600) Enable all Ethereum RPC methods on `AuroraPlugin`

Now all Ethereum RPC methods are callable on `web3.aurora.eth` (and on `web3.near.aurora.eth` as a consequence). Additionally, all not-supported methods are not exposed as callable methods.


![](https://us-central1-progress-markdown.cloudfunctions.net/progress/100?dangerColor=ccee00&warningColor=eeff00&successColor=006600) Support all RPC methods on `AuroraPlugin` organized in namespaces

### NEAR Plugin

There is a web3.js plugin for the NEAR protocol. Check its repository at: https://github.com/conx3/web3-plugin-near

Running Tests
--------------

### Testing AuroraPlugin

Executing `yarn test aurora.test.ts` would give something like:
```bash
 PASS  test/aurora.test.ts (42.118 s)
  AuroraPlugin Tests
    AuroraPlugin can call `web3` endpoints
      ✓ should be able to call `web3_clientVersion` (4264 ms)
      ✓ should be able to call `web3_sha3` (691 ms)
    AuroraPlugin can call `net` RPC endpoints
      ✓ should be able to call `net_listening` method (669 ms)
      ✓ should be able to call `net_peerCount` method (685 ms)
      ✓ should be able to call `net_version` method (670 ms)
    AuroraPlugin can call Ethereum standard RPC endpoints
      ✓ should be able to call `eth_accounts` method with expected param (1315 ms)
      ✓ should be able to call `eth_blockNumber` method with expected param (734 ms)
      ✓ should be able to call `eth_call` method with expected params (700 ms)
      ✓ should be able to call `eth_chainId` method with expected param (688 ms)
      ✓ should be able to call `eth_coinbase` method with expected param (684 ms)
      ✓ should be able to call `eth_estimateGas` method with expected param (1690 ms)
      ✓ should be able to call `eth_gasPrice` method with expected param (748 ms)
      ✓ should be able to call `eth_getBalance` method with expected param (692 ms)
      ✓ should be able to call `eth_getBlockByHash` method with expected param (3718 ms)
      ✓ should be able to call `eth_getBlockByNumber` method with expected param (1515 ms)
      ✓ should be able to call `eth_getBlockTransactionCountByHash` method with expected param (695 ms)
      ✓ should be able to call `eth_getBlockTransactionCountByNumber` method with expected param (706 ms)
      ✓ should be able to call `eth_getCode` (777 ms)
      ✓ should be able to call `eth_getCompilers` (1710 ms)
      ✓ should be able to call `eth_getFilterChanges` (1989 ms)
      ✓ should be able to call `eth_getFilterLogs` (1354 ms)
      ✓ should be able to call `eth_getLogs` (694 ms)
      ✓ should be able to call `eth_newFilter` (1343 ms)
      ✓ should be able to call `eth_protocolVersion` (676 ms)
      ✓ should be able to call `eth_syncing` (625 ms)
      ✓ should be able to call `eth_uninstallFilter` (3813 ms)
      ✓ should be able to call `eth_gasPrice` (714 ms)
      ✓ should be able to call `eth_coinbase` (745 ms)
      ✓ should be able to call `eth_getBalance` (2826 ms)
      ✓ should be able to call `eth_getCompilers` (660 ms)
      ✓ should calling `eth_getProof` throws (1 ms)
      ✓ should calling `eth_getWork` throws (1 ms)
      ✓ should have the rest of the methods at web3.aurora.eth all available (6 ms)
      ✓ should have the unavailable  methods at web3.aurora.eth as undefined (2 ms)
    AuroraPlugin can call `parity` endpoints
      ✓ should be able to call `parity_pendingTransactions` (1857 ms)
    AuroraPlugin can call the `txpool` endpoints
      ○ skipped should be able to call `txpool.status`
      ○ skipped should be able to call `txpool.inspect`
      ○ skipped should be able to call `txpool.content`

Test Suites: 1 passed, 1 total
Tests:       3 skipped, 35 passed, 38 total
Snapshots:   0 total
Time:        42.151 s
```


Executing `yarn test near.aurora.test.ts` would give something like:
```bash
 PASS  test/near.aurora.test.ts
  web3.near.aurora Tests
    ✓ should have `web3.near.aurora` setup (1 ms)
    ✓ should call `getBlockNumber` method on `web3.near.aurora.eth` (395 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        2.658 s, estimated 3 s
```

Contributing
------------

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

And for your proposed changes, please make sure to add and/or update tests as needed.


[npm-url]: https://npmjs.org/package/@conx3/web3-plugin-near
[downloads-image]: https://img.shields.io/npm/dm/@conx3/web3-plugin-near?label=npm%20downloads
