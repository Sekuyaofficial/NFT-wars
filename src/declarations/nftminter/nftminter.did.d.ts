import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'getHadMintedOf' : ActorMethod<[Principal], boolean>,
  'getNftCanisterId' : ActorMethod<[], [] | [Principal]>,
  'getNftsOf' : ActorMethod<
    [Principal],
    Array<
      {
          'Ok' : Array<
            {
              'data' : Uint8Array | number[],
              'key_val_data' : Array<
                {
                  'key' : string,
                  'val' : { 'Nat64Content' : bigint } |
                    { 'Nat32Content' : number } |
                    { 'Nat8Content' : number } |
                    { 'NatContent' : bigint } |
                    { 'Nat16Content' : number } |
                    { 'BlobContent' : Uint8Array | number[] } |
                    { 'TextContent' : string },
                }
              >,
              'purpose' : { 'Preview' : null } |
                { 'Rendered' : null },
            }
          >
        } |
        {
          'Err' : { 'ZeroAddress' : null } |
            { 'InvalidTokenId' : null } |
            { 'Unauthorized' : null } |
            { 'Other' : null }
        }
    >
  >,
  'initNftCanister' : ActorMethod<[Principal], undefined>,
  'mintNfts' : ActorMethod<
    [],
    Array<
      { 'Ok' : { 'id' : bigint, 'token_id' : bigint } } |
        {
          'Err' : { 'ZeroAddress' : null } |
            { 'InvalidTokenId' : null } |
            { 'Unauthorized' : null } |
            { 'Other' : null }
        }
    >
  >,
}
