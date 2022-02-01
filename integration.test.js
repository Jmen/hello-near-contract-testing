const { connect, keyStores, utils } = require("near-api-js");
const keyStore = new keyStores.InMemoryKeyStore();
const config = {
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
};

it('call a near nft contract', async() => {

    const keyPair = new utils.key_pair.KeyPairEd25519('private-key');

    await keyStore.setKey(config.networkId, "j_men.testnet", keyPair);

    const near = await connect(config);
    const account = await near.account("j_men.testnet");

    const metadataResult = await account.functionCall({
        contractId: "nft-example.j_men.testnet",
        methodName: "nft_metadata"
    })

    expect(metadataResult).not.toBeUndefined();
});
