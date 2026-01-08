import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-secondary via-secondary to-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-700 bg-secondary/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">SolGem 💎</div>
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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-primary via-green-400 to-primary bg-clip-text text-transparent">
              SolGem
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Low fees, fast transactions, and instant minting. Create unique digital collectibles
            and start earning today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/mint"
              className="px-8 py-4 bg-primary text-black font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-primary/50 transition transform hover:scale-105"
            >
              Start Minting →
            </Link>
            <a
              href="#features"
              className="px-8 py-4 border-2 border-primary text-primary font-bold text-lg rounded-lg hover:bg-primary hover:text-black transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20">
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-4xl font-bold text-primary">$0.10</div>
            <p className="text-gray-300 mt-2">Service Fee Per NFT</p>
          </div>
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-4xl font-bold text-primary">&lt;30s</div>
            <p className="text-gray-300 mt-2">Average Mint Time</p>
          </div>
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-4xl font-bold text-primary">0.002 SOL</div>
            <p className="text-gray-300 mt-2">Network Fee</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Why Choose Us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-2xl text-primary flex-shrink-0">⚡</div>
              <div>
                <h3 className="text-xl font-bold text-white">Lightning Fast</h3>
                <p className="text-gray-400">Mint NFTs in seconds with Solana's blazing-fast blockchain</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-2xl text-primary flex-shrink-0">💰</div>
              <div>
                <h3 className="text-xl font-bold text-white">Ultra Low Fees</h3>
                <p className="text-gray-400">Mint for just $0.10 SOL with transaction fees under $0.01</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-2xl text-primary flex-shrink-0">🔒</div>
              <div>
                <h3 className="text-xl font-bold text-white">Secure & Trustless</h3>
                <p className="text-gray-400">Blockchain-enforced security with transparent transactions</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-2xl text-primary flex-shrink-0">🎨</div>
              <div>
                <h3 className="text-xl font-bold text-white">Unique & Permanent</h3>
                <p className="text-gray-400">Store metadata permanently on Arweave blockchain</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-gradient-to-r from-primary/10 to-green-400/10 border border-primary/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Create?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Connect your wallet and start minting unique NFTs today. Earn from every mint.
          </p>
          <Link
            href="/mint"
            className="inline-block px-8 py-4 bg-primary text-black font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-primary/50 transition transform hover:scale-105"
          >
            Mint Your First NFT →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-secondary/50 backdrop-blur-sm py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; 2026 SolGem. The Solana NFT Minting Platform. Built on Solana.</p>
        </div>
      </footer>
    </main>
  );
}
