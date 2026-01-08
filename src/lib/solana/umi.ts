import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplCandyMachine } from '@metaplex-foundation/mpl-core-candy-machine';
import { mplCore } from '@metaplex-foundation/mpl-core';

const RPC_ENDPOINT = process.env['NEXT_PUBLIC_RPC_ENDPOINT'] || 'https://api.devnet.solana.com';

export function createUmiClient() {
  const umi = createUmi(RPC_ENDPOINT)
    .use(mplCandyMachine())
    .use(mplCore());

  return umi;
}

export function createUmiClientWithKeypair(secretKey: Uint8Array) {
  let umi = createUmi(RPC_ENDPOINT)
    .use(mplCandyMachine())
    .use(mplCore());

  // Import keypair if provided (server-side only)
  if (secretKey) {
    const { importKeypair } = require('@metaplex-foundation/umi');
    umi = umi.use(importKeypair(secretKey));
  }

  return umi;
}

export const CANDY_MACHINE_PROGRAM_ID = 'CndyV3LVqC9Aq9VVhQ7FwD4EznsrunEZwTKE64mcvWh';
export const CORE_PROGRAM_ID = 'CoREo63V4xaJxnuS6jB5keaf5RfjqkZgvr7Yt5zLe5Q';
