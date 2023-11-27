export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getHadMintedOf' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'getNftCanisterId' : IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
    'getNftsOf' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Vec(
            IDL.Variant({
              'Ok' : IDL.Vec(
                IDL.Record({
                  'data' : IDL.Vec(IDL.Nat8),
                  'key_val_data' : IDL.Vec(
                    IDL.Record({
                      'key' : IDL.Text,
                      'val' : IDL.Variant({
                        'Nat64Content' : IDL.Nat64,
                        'Nat32Content' : IDL.Nat32,
                        'Nat8Content' : IDL.Nat8,
                        'NatContent' : IDL.Nat,
                        'Nat16Content' : IDL.Nat16,
                        'BlobContent' : IDL.Vec(IDL.Nat8),
                        'TextContent' : IDL.Text,
                      }),
                    })
                  ),
                  'purpose' : IDL.Variant({
                    'Preview' : IDL.Null,
                    'Rendered' : IDL.Null,
                  }),
                })
              ),
              'Err' : IDL.Variant({
                'ZeroAddress' : IDL.Null,
                'InvalidTokenId' : IDL.Null,
                'Unauthorized' : IDL.Null,
                'Other' : IDL.Null,
              }),
            })
          ),
        ],
        ['query'],
      ),
    'initNftCanister' : IDL.Func([IDL.Principal], [], []),
    'mintNfts' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Variant({
              'Ok' : IDL.Record({ 'id' : IDL.Nat, 'token_id' : IDL.Nat64 }),
              'Err' : IDL.Variant({
                'ZeroAddress' : IDL.Null,
                'InvalidTokenId' : IDL.Null,
                'Unauthorized' : IDL.Null,
                'Other' : IDL.Null,
              }),
            })
          ),
        ],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
