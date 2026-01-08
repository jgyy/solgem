'use client';

import { useCallback, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { mintNFT, getEstimatedMintCost } from '@/lib/solana/mint';
import { SERVICE_FEE_AMOUNT, EXPLORER_BASE_URL } from '@/lib/utils/constants';

interface MintCardProps {
  candyMachineId: string;
  collectionMint: string;
  treasuryWallet: string;
  nftName: string;
  nftDescription: string;
  nftImage: string;
}

export function MintCard({
  candyMachineId,
  collectionMint,
  treasuryWallet,
  nftName,
  nftDescription,
  nftImage,
}: MintCardProps) {
  const { connected, publicKey } = useWallet();
  const [isMinting, setIsMinting] = useState(false);
  const [mintResult, setMintResult] = useState<{
    success: boolean;
    assetId?: string;
    transactionSignature?: string;
    error?: string;
  } | null>(null);

  const cost = getEstimatedMintCost(SERVICE_FEE_AMOUNT);

  const handleMint = useCallback(async () => {
    if (!connected || !publicKey) {
      setMintResult({
        success: false,
        error: 'Please connect your wallet first',
      });
      return;
    }

    setIsMinting(true);
    setMintResult(null);

    try {
      const result = await mintNFT({
        candyMachineId,
        collectionMint,
        treasuryWallet,
        serviceFeeAmount: SERVICE_FEE_AMOUNT,
      });

      setMintResult(result);

      if (result.success) {
        // Optional: Delay to show success message
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error) {
      setMintResult({
        success: false,
        error: error instanceof Error ? error.message : 'Minting failed',
      });
    } finally {
      setIsMinting(false);
    }
  }, [connected, publicKey, candyMachineId, collectionMint, treasuryWallet]);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 max-w-sm w-full hover:border-primary/50 transition">
      {/* NFT Preview */}
      <div className="mb-6">
        <img
          src={nftImage}
          alt={nftName}
          className="w-full h-80 object-cover rounded-lg mb-4 border border-gray-600"
        />
      </div>

      {/* NFT Details */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{nftName}</h3>
        <p className="text-gray-300 text-sm">{nftDescription}</p>
      </div>

      {/* Pricing */}
      <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Service Fee:</span>
          <span className="text-white font-semibold">{cost.serviceFee} SOL</span>
        </div>
        <div className="flex justify-between text-sm mb-3">
          <span className="text-gray-400">Network Fee:</span>
          <span className="text-white font-semibold">{cost.networkFee.toFixed(6)} SOL</span>
        </div>
        <div className="border-t border-gray-700 pt-2 flex justify-between text-base">
          <span className="text-white font-bold">Total:</span>
          <span className="text-primary font-bold">{cost.total.toFixed(6)} SOL</span>
        </div>
      </div>

      {/* Mint Button or Wallet Connection */}
      {!connected ? (
        <div className="mb-4">
          <WalletMultiButton className="w-full" />
        </div>
      ) : (
        <button
          onClick={handleMint}
          disabled={isMinting || !connected}
          className={`w-full py-3 px-4 rounded-lg font-bold text-lg transition mb-4 ${
            isMinting || !connected
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-primary text-black hover:bg-opacity-90 active:scale-95'
          }`}
        >
          {isMinting ? 'Minting...' : 'Mint NFT'}
        </button>
      )}

      {/* Result Messages */}
      {mintResult && (
        <div
          className={`p-4 rounded-lg border text-sm ${
            mintResult.success
              ? 'bg-green-900/30 border-green-500/50 text-green-200'
              : 'bg-red-900/30 border-red-500/50 text-red-200'
          }`}
        >
          {mintResult.success ? (
            <>
              <p className="font-bold mb-2">✓ Minting Successful!</p>
              {mintResult.assetId && (
                <p className="text-xs mb-2">Asset ID: {mintResult.assetId}</p>
              )}
              {mintResult.transactionSignature && (
                <a
                  href={`${EXPLORER_BASE_URL}/tx/${mintResult.transactionSignature}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-300 hover:text-green-200 underline text-xs"
                >
                  View on Explorer →
                </a>
              )}
            </>
          ) : (
            <>
              <p className="font-bold mb-1">✗ Error</p>
              <p className="text-xs">{mintResult.error}</p>
            </>
          )}
        </div>
      )}

      {/* Additional Info */}
      <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-400">
        <p>
          💡 Service fee supports platform maintenance. Network fees go to Solana validators.
        </p>
      </div>
    </div>
  );
}
