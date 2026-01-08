'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { SERVICE_FEE_WALLET } from '@/lib/utils/constants';

interface AdminStats {
  totalMinted: number;
  totalRevenue: number;
  collectionStats: Array<{
    name: string;
    minted: number;
    revenue: number;
  }>;
}

export default function AdminPage() {
  const { publicKey, connected } = useWallet();
  const [stats, setStats] = useState<AdminStats>({
    totalMinted: 247,
    totalRevenue: 24.7,
    collectionStats: [
      { name: 'Genesis Collection', minted: 24, revenue: 2.4 },
      { name: 'Rare Elements', minted: 12, revenue: 1.2 },
      { name: 'Digital Art', minted: 211, revenue: 21.1 },
    ],
  });

  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const isAdmin = publicKey?.toString() === SERVICE_FEE_WALLET;

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setIsWithdrawing(true);
    try {
      // In production, this would execute a real blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(`Successfully withdrew ${withdrawAmount} SOL`);
      setWithdrawAmount('');
      // Simulate revenue update
      setStats((prev) => ({
        ...prev,
        totalRevenue: Math.max(0, prev.totalRevenue - parseFloat(withdrawAmount)),
      }));
    } catch (error) {
      alert('Withdrawal failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsWithdrawing(false);
    }
  };

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
              className="px-6 py-2 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-black transition"
            >
              Mint NFT
            </Link>
            <WalletMultiButton />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-300 text-lg mb-12">Manage your NFT minting platform</p>

        {!connected ? (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Connect Wallet</h2>
            <p className="text-gray-300 mb-6">
              Please connect your wallet to access admin features
            </p>
            <WalletMultiButton className="mx-auto" />
          </div>
        ) : !isAdmin ? (
          <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-red-200 mb-4">Access Denied</h2>
            <p className="text-red-200">
              Your wallet is not authorized to access admin features.
              <br />
              Expected: {SERVICE_FEE_WALLET}
              <br />
              Current: {publicKey?.toString()}
            </p>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-primary/20 to-green-400/20 border border-primary/50 rounded-xl p-6">
                <h3 className="text-gray-300 text-sm font-semibold mb-2">Total Minted</h3>
                <p className="text-4xl font-bold text-primary">{stats.totalMinted}</p>
                <p className="text-gray-400 text-xs mt-2">NFTs created this month</p>
              </div>

              <div className="bg-gradient-to-br from-primary/20 to-green-400/20 border border-primary/50 rounded-xl p-6">
                <h3 className="text-gray-300 text-sm font-semibold mb-2">Total Revenue</h3>
                <p className="text-4xl font-bold text-primary">{stats.totalRevenue.toFixed(2)}</p>
                <p className="text-gray-400 text-xs mt-2">SOL collected from fees</p>
              </div>

              <div className="bg-gradient-to-br from-primary/20 to-green-400/20 border border-primary/50 rounded-xl p-6">
                <h3 className="text-gray-300 text-sm font-semibold mb-2">Avg. Price</h3>
                <p className="text-4xl font-bold text-primary">
                  {(stats.totalRevenue / stats.totalMinted).toFixed(3)}
                </p>
                <p className="text-gray-400 text-xs mt-2">SOL per NFT</p>
              </div>
            </div>

            {/* Fee Withdrawal Section */}
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Withdraw Fees</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Available Balance
                    </label>
                    <p className="text-3xl font-bold text-primary">{stats.totalRevenue.toFixed(2)} SOL</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Withdrawal Amount (SOL)
                    </label>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      max={stats.totalRevenue}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-3 text-sm text-blue-200">
                    ℹ️ Withdrawal will be sent to: {SERVICE_FEE_WALLET}
                  </div>

                  <button
                    onClick={handleWithdraw}
                    disabled={
                      isWithdrawing || !withdrawAmount || parseFloat(withdrawAmount) <= 0
                    }
                    className={`w-full py-3 px-4 rounded-lg font-bold text-lg transition ${
                      isWithdrawing || !withdrawAmount || parseFloat(withdrawAmount) <= 0
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-primary text-black hover:bg-opacity-90 active:scale-95'
                    }`}
                  >
                    {isWithdrawing ? 'Processing...' : 'Withdraw SOL'}
                  </button>
                </div>
              </div>

              {/* Collection Stats */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Collection Performance</h2>

                <div className="space-y-4">
                  {stats.collectionStats.map((collection, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-white">{collection.name}</h3>
                        <span className="text-primary font-bold">{collection.minted} NFTs</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Revenue:</span>
                        <span className="text-green-400 font-semibold">
                          {collection.revenue.toFixed(2)} SOL
                        </span>
                      </div>
                      <div className="mt-2 bg-gray-700 rounded h-2 overflow-hidden">
                        <div
                          className="bg-primary h-full"
                          style={{
                            width: `${(collection.revenue / stats.totalRevenue) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>

              <div className="space-y-3">
                {[
                  {
                    action: 'NFT Minted',
                    collection: 'Digital Art',
                    amount: '0.1 SOL',
                    time: '2 minutes ago',
                  },
                  {
                    action: 'NFT Minted',
                    collection: 'Genesis Collection',
                    amount: '0.1 SOL',
                    time: '15 minutes ago',
                  },
                  {
                    action: 'Fees Withdrawn',
                    collection: 'Platform',
                    amount: '5 SOL',
                    time: '1 hour ago',
                  },
                  {
                    action: 'NFT Minted',
                    collection: 'Rare Elements',
                    amount: '0.1 SOL',
                    time: '3 hours ago',
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-700/50"
                  >
                    <div>
                      <p className="font-semibold text-white">{activity.action}</p>
                      <p className="text-xs text-gray-400">{activity.collection}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{activity.amount}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
