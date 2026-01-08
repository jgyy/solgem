'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MintCard } from '@/components/mint/MintCard';
import { SERVICE_FEE_WALLET } from '@/lib/utils/constants';

export default function MintPage() {
  const [selectedCollection, setSelectedCollection] = useState(0);

  // Sample collection for demonstration
  const collections = [
    {
      name: 'Genesis Collection',
      description: 'The first and original NFT collection',
      itemsAvailable: 100,
      itemsMinted: 24,
      image: 'https://via.placeholder.com/400x400?text=Genesis+Collection',
    },
    {
      name: 'Rare Elements',
      description: 'Limited edition NFTs with unique properties',
      itemsAvailable: 50,
      itemsMinted: 12,
      image: 'https://via.placeholder.com/400x400?text=Rare+Elements',
    },
    {
      name: 'Digital Art',
      description: 'Curated digital artwork from top artists',
      itemsAvailable: 200,
      itemsMinted: 87,
      image: 'https://via.placeholder.com/400x400?text=Digital+Art',
    },
  ];

  const currentCollection = collections[selectedCollection]!;
  const progress = (currentCollection.itemsMinted / currentCollection.itemsAvailable) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-secondary via-secondary to-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-700 bg-secondary/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            SolGem 💎
          </Link>
          <div className="flex gap-4">
            <Link
              href="/mint"
              className="px-6 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-opacity-90 transition"
            >
              Mint NFT
            </Link>
            <Link
              href="/admin"
              className="px-6 py-2 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-black transition"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-4">Mint Your NFT</h1>
        <p className="text-gray-300 text-lg mb-12">
          Choose a collection and mint a unique NFT from Solana
        </p>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Collections Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Collections</h2>
              <div className="space-y-3">
                {collections.map((collection, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCollection(index)}
                    className={`w-full text-left p-4 rounded-lg border transition ${
                      selectedCollection === index
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'bg-gray-900/50 border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <div className="font-semibold">{collection.name}</div>
                    <div className="text-xs mt-1 opacity-75">
                      {collection.itemsMinted} / {collection.itemsAvailable} minted
                    </div>
                    <div className="mt-2 bg-gray-700 rounded h-2 overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Collection Stats */}
            <div className="mt-6 bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="font-bold text-white mb-4">Collection Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400">Available Items:</span>
                  <span className="float-right text-white font-semibold">
                    {currentCollection.itemsAvailable - currentCollection.itemsMinted}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Minted:</span>
                  <span className="float-right text-white font-semibold">
                    {currentCollection.itemsMinted}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Total Items:</span>
                  <span className="float-right text-white font-semibold">
                    {currentCollection.itemsAvailable}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mint Card */}
          <div className="lg:col-span-2">
            <div className="flex justify-center">
              <MintCard
                candyMachineId="mock_candy_machine_id"
                collectionMint="mock_collection_mint"
                treasuryWallet={SERVICE_FEE_WALLET || 'Treasury'}
                nftName={currentCollection.name}
                nftDescription={currentCollection.description}
                nftImage={currentCollection.image}
              />
            </div>

            {/* Information Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-lg">⚡</span> Fast Transactions
                </h3>
                <p className="text-gray-400 text-sm">
                  Mint NFTs in seconds using Solana's high-speed blockchain with confirmation
                  times under 30 seconds.
                </p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-lg">💾</span> Permanent Storage
                </h3>
                <p className="text-gray-400 text-sm">
                  All metadata is stored permanently on Arweave, ensuring your NFTs and data are
                  accessible forever.
                </p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-lg">🔒</span> Secure & Trustless
                </h3>
                <p className="text-gray-400 text-sm">
                  All transactions are enforced by smart contracts on the blockchain. No
                  intermediaries or custodians needed.
                </p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-lg">💰</span> Affordable
                </h3>
                <p className="text-gray-400 text-sm">
                  Mint unique NFTs for a fraction of the cost on other blockchains. Solana's
                  low fees make it accessible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
