---
slug: /roles/validator/external-chains
---

# Overview

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

As a validator for the Axelar network, your Axelar node will vote on the status of external blockchains such as Ethereum, Cosmos, etc. Specifically:

1. Select which external chains your Axelar node will support.  Set up and configure your own nodes for the chains you selected.
2. Provide RPC endpoints for these nodes to your Axelar validator node and register as a maintainer for these chains on the Axelar network.

## External chains you can support on Axelar

* EVM-compatible chains
    * [Avalanche](external-chains/avalanche) 
    * [Ethereum](external-chains/ethereum)
    * [Fantom](external-chains/fantom)
    * [Moonbeam](external-chains/moonbeam)
    * [Polygon](external-chains/polygon)
    
    
* Cosmos chains
    * Nothing to do. All Cosmos chains are automatically supported by default.

## Add external chain info to your validator's configuration

In the `axelarate-community` git repo edit the file `configuration/config.toml`: set the `rpc_addr` and `start-with-bridge` entries corresponding to the external chain you wish to connect.

Your `config.toml` file should already contain a snippet like the following:

```toml
##### EVM bridges options #####
# Each EVM chain needs the following
# 1. `[[axelar_bridge_evm]]` # header
# 2. `name`                  # chain name (eg. "Ethereum")
# 3. 'rpc_addr'              # EVM RPC endpoint URL; chain maintainers set their own endpoint
# 4. `start-with-bridge`     # `true` to support this chain
#
# see https://docs.axelar.dev/roles/validator/external-chains

[[axelar_bridge_evm]]
name = "Ethereum"
rpc_addr = ""
start-with-bridge = false

[[axelar_bridge_evm]]
name = "Avalanche"
rpc_addr = ""
start-with-bridge = false

[[axelar_bridge_evm]]
name = "Fantom"
rpc_addr = ""
start-with-bridge = false

[[axelar_bridge_evm]]
name = "Moonbeam"
rpc_addr = ""
start-with-bridge = false

[[axelar_bridge_evm]]
name = "Polygon"
rpc_addr = ""
start-with-bridge = false
```

### Example: Ethereum

Edit the `Ethereum` entry::

```toml
[[axelar_bridge_evm]]
name = "Ethereum"
rpc_addr = "my_ethereum_host"
start-with-bridge = true
```

Substitute your Ethereum RPC address for `my_ethereum_host`.  Be sure to set `start-with-bridge` to `true`.

## Restart your companion processes

:::caution

Do not stop the `axelar-core` process.  If you stop `axelar-core` then you risk downtime for Tendermint consensus, which can result in penalties.

:::

:::caution

If `vald`, `tofnd` are stopped for too long then your validator might fail to produce a heartbeat transaction when needed.  The risk of this event can be reduced to near-zero if you promptly restart these processes shortly after a recent round of heartbeat transactions.

:::

:::tip

Heartbeat events are emitted every 50 blocks.  Your validator typically responds to heartbeat events within 1-2 blocks.  It should be safe to restart `vald`, `tofnd` at block heights that are 5-10 mod 50.

:::

Stop your companion processes `vald`, `tofnd`.

```bash
kill -9 $(pgrep tofnd)
kill -9 $(pgrep -f "axelard vald-start")
```

Immediately resume your companion processes `vald`, `tofnd`:

<Tabs groupId="network">
<TabItem value="mainnet" label="Mainnet" default>

```bash
KEYRING_PASSWORD=my-secret-password TOFND_PASSWORD=my-tofnd-password ./scripts/validator-tools-host.sh -n mainnet
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```bash
KEYRING_PASSWORD=my-secret-password TOFND_PASSWORD=my-tofnd-password ./scripts/validator-tools-host.sh
```

</TabItem>
</Tabs>

## Check your connections to new chains in vald

Check your `vald` logs to see that your validator node has successfully connected to the new EVM chains you added.  [[How to view logs.]](setup/vald-tofnd)

You should see something like:
```log
2021-11-25T01:25:54Z INF Successfully connected to EVM bridge for chain Ethereum module=vald
2021-11-25T01:25:54Z INF Successfully connected to EVM bridge for chain Avalanche module=vald
2021-11-25T01:25:54Z INF Successfully connected to EVM bridge for chain Fantom module=vald
2021-11-25T01:25:54Z INF Successfully connected to EVM bridge for chain Moonbeam module=vald
2021-11-25T01:25:54Z INF Successfully connected to EVM bridge for chain Polygon module=vald
```

## Register as a maintainer of external chains

For each external blockchain you selected earlier you must inform the Axelar network of your intent to maintain that chain.  This is accomplished via the `register-chain-maintainer` command.

:::tip

You only need to register as a chain maintainer once.  If you've already done it for chain C then you do not need to do it again for chain C.

:::

Example: multiple EVM chains in one command:

<Tabs groupId="network">
<TabItem value="mainnet" label="Mainnet" default>

```bash
echo my-secret-password | ~/.axelar/bin/axelard tx nexus register-chain-maintainer avalanche ethereum fantom moonbeam polygon --from broadcaster --chain-id axelar-dojo-1 --home ~/.axelar/.vald --gas auto --gas-adjustment 1.5
```

</TabItem>
<TabItem value="testnet" label="Testnet">

```bash
echo my-secret-password | ~/.axelar_testnet/bin/axelard tx nexus register-chain-maintainer avalanche ethereum fantom moonbeam polygon --from broadcaster --chain-id axelar-testnet-lisbon-3 --home ~/.axelar_testnet/.vald --gas auto --gas-adjustment 1.5
```

</TabItem>
</Tabs>
