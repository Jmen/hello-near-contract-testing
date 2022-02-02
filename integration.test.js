const { connect, keyStores, utils, Contract } = require("near-api-js");

require('dotenv').config()

const networkId = "testnet";

it('call a near nft contract', async() => {

    const keyPair = new utils.key_pair.KeyPairEd25519(process.env.TEST_ACCOUNT_PRIVATE_KEY);

    const keyStore = new keyStores.InMemoryKeyStore();
    await keyStore.setKey(networkId, "j_men.testnet", keyPair);

    const near = await connect({
        keyStore,
        networkId,
        nodeUrl: "https://rpc.testnet.near.org",
    });

    const account = await near.account("j_men.testnet");

    const contract = new Contract(
        account,
        'nft-example.j_men.testnet',
        {
            viewMethods: ['nft_metadata'],
            changeMethods: []
        }
    );

    const result = await contract.nft_metadata();

    expect(result.spec).toBe("nft-1.0.0");
});
