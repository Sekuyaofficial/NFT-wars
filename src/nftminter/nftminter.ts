import {
  blob,
  bool,
  Canister,
  ic,
  init,
  nat,
  nat8,
  nat16,
  nat32,
  nat64,
  Null,
  Opt,
  postUpgrade,
  Principal,
  query,
  Record,
  Result,
  StableBTreeMap,
  text,
  update,
  Variant,
  Vec,
  Void,
} from 'azle';

const getOptSomeOrDefault = <T>(opt: Opt<T>, defaultValue: T) => {
  if ('None' in opt) {
    return defaultValue;
  }
  return opt.Some;
};

const ApiError = Variant({
  Unauthorized: Null,
  InvalidTokenId: Null,
  ZeroAddress: Null,
  Other: Null,
});

const TokenId = nat64;

const MintReceiptPart = Record({
  token_id: TokenId,
  id: nat,
});

const MintReceipt = Result(MintReceiptPart, ApiError);

const MetadataPurpose = Variant({
  Preview: Null,
  Rendered: Null,
});

const MetadataVal = Variant({
  TextContent: text,
  BlobContent: blob,
  NatContent: nat,
  Nat8Content: nat8,
  Nat16Content: nat16,
  Nat32Content: nat32,
  Nat64Content: nat64,
});

const MetadataKeyVal = Record({
  key: text,
  val: MetadataVal,
});

const MetadataPart = Record({
  purpose: MetadataPurpose,
  key_val_data: Vec(MetadataKeyVal),
  data: blob,
});

const MetadataDesc = Vec(MetadataPart);

const MetadataResult = Result(MetadataDesc, ApiError);

// src/nft/Main.mo
const NftCanister = Canister({
  // mintDip721(to: Principal, metadata: Types.MetadataDesc) : async Types.MintReceipt
  mintDip721: update([Principal, MetadataDesc], MintReceipt),
  // getTokenIdsForUserDip721(user: Principal) : async [Types.TokenId]
  getTokenIdsForUserDip721: query([Principal], Vec(TokenId)),
  // getMetadataDip721(token_id: Types.TokenId) : async Types.MetadataResult
  getMetadataDip721: query([TokenId], MetadataResult),
});

let nftCanister: typeof NftCanister;

const nftCanisterStorage = StableBTreeMap(text, Principal, 2)!;

const hadMinted = StableBTreeMap(Principal, bool, 1)!;

const mintHero = async (owner: Principal, name: string) => {
  return await ic.call(nftCanister.mintDip721, {
    args: [
      owner,
      [
        {
          purpose: { Rendered: null },
          key_val_data: [
            {
              key: 'name',
              val: { TextContent: name },
            },
          ],
          data: new Uint8Array(),
        },
      ],
    ],
  });
};

export default Canister({
  init: init([], () => {
    console.log('Canister is created');
  }),

  // nft canister need nftminter id to allow minting => deploy nft after nftminter
  initNftCanister: update([Principal], Void, (nftCanisterId) => {
    // CANISTER_ID_NFT = process.env.CANISTER_ID_NFT; // defined in dfx.json, ejected at build time
    // console.log(`CANISTER_ID_NFT: ${CANISTER_ID_NFT}`);

    nftCanisterStorage.insert('nftCanisterId', nftCanisterId);
    nftCanister = NftCanister(nftCanisterId);
  }),

  postUpgrade: postUpgrade([], () => {
    console.log('Canister code is upgraded');

    const nftCanisterIdOpt = nftCanisterStorage.get('nftCanisterId');
    if ('None' in nftCanisterIdOpt) {
      return;
    }
    const nftCanisterId = nftCanisterIdOpt.Some;
    nftCanister = NftCanister(nftCanisterId);
  }),

  // Mint 4 hero nfts to caller
  mintNfts: update([], Vec(MintReceipt), async () => {
    const hadMintedOpt = hadMinted.get(ic.caller());
    if ('Some' in hadMintedOpt) {
      console.log(`sequya: mintNfts: hadMinted: ${hadMintedOpt.Some}`);
      ic.trap('Already minted');
    }

    const [heroNftMintResult1, heroNftMintResult2, heroNftMintResult3, heroNftMintResult4] = await Promise.all([
      mintHero(ic.caller(), 'Hero #1'),
      mintHero(ic.caller(), 'Hero #2'),
      mintHero(ic.caller(), 'Hero #3'),
      mintHero(ic.caller(), 'Hero #4'),
    ]);

    if (heroNftMintResult1.Ok && heroNftMintResult2.Ok && heroNftMintResult3.Ok && heroNftMintResult4.Ok) {
      hadMinted.insert(ic.caller(), true);
    }

    return [heroNftMintResult1, heroNftMintResult2, heroNftMintResult3, heroNftMintResult4];
  }),

  getNftsOf: query([Principal], Vec(MetadataResult), async (owner) => {
    const nftIds = await ic.call(nftCanister.getTokenIdsForUserDip721, {
      args: [owner],
    });
    console.log(`sequya: getNftsOf: nftIds: ${nftIds.join(',')}`);

    const nfts: any[] = [];
    for (const nftId of nftIds) {
      const nft = await ic.call(nftCanister.getMetadataDip721, {
        args: [nftId],
      });
      console.log(`sequya: getNftsOf: nft ${nftId.toString()}: ${JSON.stringify(nft)}`);
      nfts.push(nft);
    }
    return nfts;
  }),

  getHadMintedOf: query([Principal], bool, (owner) => {
    return getOptSomeOrDefault(hadMinted.get(owner), false);
  }),

  getNftCanisterId: query([], Opt(Principal), () => {
    return nftCanisterStorage.get('nftCanisterId');
  }),

  // whoami: query([], Principal, () => {
  //   return ic.caller();
  // }),
});
