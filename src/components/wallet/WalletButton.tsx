'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function WalletButton() {
  return (
    <div className="flex gap-4 items-center">
      <WalletMultiButton className="btn-primary" />
    </div>
  );
}
