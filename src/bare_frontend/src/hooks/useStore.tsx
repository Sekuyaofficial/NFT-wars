import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ActorSubclass, Identity } from '@dfinity/agent';
import { AuthClient, AuthClientCreateOptions, AuthClientLoginOptions } from '@dfinity/auth-client';
import { Principal } from '@dfinity/principal';

import {
  canisterId as nftMinterCanisterId,
  createActor as createNftMinterActor,
} from '../../../declarations/nftminter';
import { _SERVICE as _NFT_MINTER_SERVICE } from '../../../declarations/nftminter/nftminter.did';

const IS_MAINNET = process.env.DFX_NETWORK === 'ic';

const LEDGER_HOST = process.env.LEDGER_HOST;

const defaultOptions: {
  createOptions: AuthClientCreateOptions;
  loginOptions: AuthClientLoginOptions;
} = {
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true,
    },
  },
  loginOptions: {
    identityProvider: IS_MAINNET
      ? 'https://identity.ic0.app/#authorize'
      : `http://${LEDGER_HOST}?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai#authorize`,
  },
};

const useStore_ = (options = defaultOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [principal, setPrincipal] = useState<Principal | null>(null);
  const [nftMinterActor, setNftMinterActor] = useState<ActorSubclass<_NFT_MINTER_SERVICE> | null>(null);

  const [shouldDisplayLoader, setShouldDisplayLoader] = useState(false);
  const [shouldDisplayPageLoader, setShouldDisplayPageLoader] = useState(false);

  const mintNfts = async (nftMinterActor_ = nftMinterActor!, principal_ = principal!) => {
    try {
      const hadMintedNfts = await nftMinterActor_.getHadMintedOf(principal_);
      if (hadMintedNfts) {
        return;
      }

      await nftMinterActor_.mintNfts();
      toast.success('Successfully gifted Sekuya NFTWars Heros to your identity.');
    } catch (error) {
      console.error(error);
      toast.error('Error when trying to mint Sekuya NFTWars Heros');
    }
  };

  const updateClient = async (client = authClient!) => {
    const isAuthenticated_ = await client.isAuthenticated();
    setIsAuthenticated(isAuthenticated_);

    const identity_ = client.getIdentity();
    setIdentity(identity_);

    const principal_ = identity_.getPrincipal();
    setPrincipal(principal_);

    const nftMinterActor_ = createNftMinterActor(nftMinterCanisterId, {
      agentOptions: {
        identity: identity_,
      },
    });
    setNftMinterActor(nftMinterActor_);

    if (isAuthenticated_) {
      await mintNfts(nftMinterActor_, principal_);
    }
  };

  const initAuthClient = async () => {
    try {
      const authClient_ = await AuthClient.create(options.createOptions);
      setAuthClient(authClient_);
      updateClient(authClient_);
    } catch (error) {
      console.error(error);
      toast.error('Error while initializing Internet Identity');
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    initAuthClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async () => {
    await authClient!.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateClient();
      },
    });
  };

  const logout = async () => {
    await authClient!.logout();
    await initAuthClient();
  };

  const displayLoader = useCallback(() => setShouldDisplayLoader(true), [setShouldDisplayLoader]);

  const hideLoader = useCallback(() => setShouldDisplayLoader(false), [setShouldDisplayLoader]);

  const togglePageLoader = useCallback(
    () => setShouldDisplayPageLoader((previousShouldDisplayPageLoader) => !previousShouldDisplayPageLoader),
    [setShouldDisplayPageLoader],
  );

  return {
    isAuthenticated,
    login,
    logout,
    authClient,
    identity: identity!,
    principal: principal!,
    shouldDisplayLoader,
    displayLoader,
    hideLoader,
    shouldDisplayPageLoader,
    setShouldDisplayPageLoader,
    togglePageLoader,
  };
};

const StoreContext = createContext<ReturnType<typeof useStore_>>({} as any);

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const store = useStore_();

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
