# SolGem 💎 - NFT Minting Platform on Solana

SolGem is a beginner-friendly NFT minting platform built on Solana that generates revenue through service fees. Create and mint unique digital collectibles with low fees and fast transactions.

## Project Overview

SolGem allows users to mint NFTs directly from your collections, with automatic service fee collection built into the blockchain smart contracts. No complicated setup required - just connect your wallet and start minting!

**Key Features:**
- ✨ NFT minting with automatic service fees (0.1-0.5 SOL per mint)
- 🚀 Lightning-fast transactions on Solana (~30 seconds)
- 💰 Ultra-low fees (~$0.002 network fee + configurable service fee)
- 🔒 Secure & trustless (blockchain-enforced payments)
- 📁 Permanent metadata storage on Arweave
- 👤 Wallet integration (Phantom, Solflare, Torus)
- 📊 Admin dashboard with fee management
- 🎨 Beautiful, responsive UI built with TailwindCSS

## Revenue Model

Every time someone mints an NFT from your platform, they pay:
- **Service Fee**: 0.1-0.5 SOL (configurable) → Goes to your treasury wallet
- **Network Fee**: ~0.002 SOL → Goes to Solana validators

**Revenue Potential:**
- Conservative: 50 mints/month × 0.1 SOL × $150 = **$750/month**
- Moderate: 200 mints/month × 0.15 SOL × $175 = **$5,250/month**
- Optimistic: 500 mints/month × 0.2 SOL × $200 = **$20,000/month**

## Tech Stack

- **Frontend**: Next.js 16 + TypeScript + TailwindCSS
- **Blockchain**: Solana + Metaplex Candy Machine v3
- **Wallet**: Solana Wallet Adapter (Phantom, Solflare, Torus)
- **Storage**: Arweave via Bundlr Network
- **Deployment**: Vercel (free tier)
- **Database**: Optional (Vercel Postgres for analytics)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Solana wallet (Phantom recommended)
- (Optional) Devnet SOL for testing: https://faucet.solana.com

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/solgem.git
cd solgem
```

2. **Install dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Network - Start with devnet for testing
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_RPC_ENDPOINT=https://api.devnet.solana.com

# Your Admin Wallet (Keep Private!)
ADMIN_WALLET_PRIVATE_KEY=your_base58_encoded_private_key
SERVICE_FEE_WALLET=your_public_wallet_address
SERVICE_FEE_AMOUNT=0.1  # SOL per mint

# Arweave/Bundlr for metadata storage
BUNDLR_PRIVATE_KEY=your_bundlr_key
```

4. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser!

## Project Structure

```
solgem/
├── src/
│   ├── app/                           # Next.js app router
│   │   ├── page.tsx                  # Landing page
│   │   ├── mint/page.tsx             # Minting interface
│   │   └── admin/page.tsx            # Admin dashboard
│   ├── components/
│   │   ├── wallet/                   # Wallet connection
│   │   ├── mint/                     # Minting components
│   │   ├── admin/                    # Admin components
│   │   ├── Providers.tsx             # Wallet provider
│   │   └── ui/                       # Reusable UI
│   ├── lib/
│   │   ├── solana/
│   │   │   ├── umi.ts               # UMI client
│   │   │   ├── candyMachine.ts      # Candy Machine ops
│   │   │   └── mint.ts              # Minting logic
│   │   ├── storage/
│   │   │   └── arweave.ts           # Metadata upload
│   │   └── utils/
│   │       └── constants.ts          # Configuration
│   ├── types/
│   │   └── nft.ts                   # Type definitions
│   └── styles/
│       └── globals.css              # Global styles
├── public/                           # Static assets
├── scripts/                          # Utility scripts
├── .env.local                        # Environment config (gitignored)
└── .env.example                      # Example config
```

## Features & Usage

### 1. Minting Page (`/mint`)

Users can:
- Browse available NFT collections
- See collection stats (minted count, available items)
- View mint price breakdown (service fee + network fee)
- Connect wallet and mint NFTs
- View transaction links on Solana Explorer

### 2. Admin Dashboard (`/admin`)

Admin-only features (requires matching wallet):
- View total mints and revenue
- See per-collection statistics
- Withdraw collected SOL fees to treasury wallet
- Monitor recent minting activity

**Admin URL**: `http://localhost:3000/admin`

### 3. Automatic Service Fee Collection

The blockchain enforces payment automatically:
```
When user clicks "Mint NFT":
1. Wallet shows approval dialog (0.1 SOL total)
2. Transaction includes:
   - 0.1 SOL → Your treasury wallet ✓
   - ~0.002 SOL → Solana network
   - NFT → User's wallet
3. All-or-nothing: transaction fails if insufficient balance
```

## Development Workflow

### Build the project
```bash
npm run build
```

### Type checking
```bash
npm run type-check
```

### Development server with hot reload
```bash
npm run dev
```

### Production build
```bash
npm run build
npm run start
```

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial NFT minting platform"
git push
```

2. **Create Vercel project**
   - Go to https://vercel.com
   - Click "New Project"
   - Connect your GitHub repo
   - Add environment variables from `.env.local`
   - Click "Deploy"

3. **Update environment for mainnet** (after testing on devnet)
```env
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_RPC_ENDPOINT=https://api.mainnet-beta.solana.com
```

### Deploy to other platforms

Works on any Node.js hosting (Netlify, AWS, Heroku, etc.)

## Testing on Devnet

1. Get devnet SOL: https://faucet.solana.com
2. Set env to devnet
3. Mint test NFTs
4. Verify transactions on Solana Explorer

## Important Security Notes

⚠️ **Never commit `.env.local` to version control**

The `.gitignore` file already excludes `.env.local`, but double-check.

🔐 **Protect your private keys**
- Never share `ADMIN_WALLET_PRIVATE_KEY` or `BUNDLR_PRIVATE_KEY`
- Use environment variables, never hardcode
- Consider using a hardware wallet for admin wallet

## Customization

### Change Service Fee
Edit `.env.local`:
```env
SERVICE_FEE_AMOUNT=0.25  # 0.25 SOL per mint
```

### Add More Collections
Edit `/src/app/mint/page.tsx` and add to the `collections` array:
```typescript
{
  name: 'Your Collection',
  description: 'Description here',
  itemsAvailable: 500,
  itemsMinted: 0,
  image: 'https://via.placeholder.com/400x400?text=Your+Collection',
}
```

### Customize UI
- Modify colors in `tailwind.config.ts`
- Edit components in `src/components/`
- Update styles in `src/styles/globals.css`

## Production Checklist

Before launching on mainnet:

- [ ] Test complete minting flow on devnet
- [ ] Update `SERVICE_FEE_WALLET` to your permanent admin wallet
- [ ] Configure service fee amount
- [ ] Set up Arweave/Bundlr for permanent metadata storage
- [ ] Test admin fee withdrawal
- [ ] Deploy to Vercel with mainnet configuration
- [ ] Verify all transactions on Solana Explorer
- [ ] Test with live SOL (small amounts first)
- [ ] Monitor platform for 24 hours
- [ ] Set up analytics & monitoring

## Troubleshooting

### "Cannot create Candy Machine" error
- Ensure admin wallet has sufficient SOL (~1-2 SOL)
- Verify Candy Machine configuration is valid
- Check Solana network status

### Wallet not connecting
- Ensure Phantom/Solflare wallet is installed
- Try refreshing the page
- Check browser console for errors
- Verify wallet is connected to correct network

### Metadata not loading on Explorer
- Arweave might be slow (can take 5-10 minutes)
- Verify metadata was uploaded to Arweave
- Check Bundlr Network status

### High transaction fees
- Solana should always be <$0.01
- If higher, check your RPC endpoint
- Consider upgrading to dedicated RPC (Helius, QuickNode)

## Advanced Configuration

### Premium RPC Endpoint
For better performance and reliability:

1. **Helius**: https://www.helius.dev
```env
NEXT_PUBLIC_RPC_ENDPOINT=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
```

2. **QuickNode**: https://www.quicknode.com
```env
NEXT_PUBLIC_RPC_ENDPOINT=https://your-quicknode-endpoint.com
```

### Database Setup (Optional)
For analytics and user tracking:

1. Use Vercel Postgres or Supabase
2. Track mint events
3. Generate revenue reports
4. Monitor user statistics

## API Endpoints

The platform includes optional API routes for programmatic access:

- `POST /api/candy-machine/create` - Create Candy Machine
- `GET /api/candy-machine/config` - Get CM configuration
- `GET /api/candy-machine/stats` - Get minting stats
- `POST /api/metadata/upload` - Upload NFT metadata

## Community & Support

- **Discord**: Join Solana developers community
- **Docs**: https://developers.metaplex.com
- **Explorer**: https://solscan.io (devnet/mainnet explorer)
- **Issues**: Create GitHub issues for bugs/features

## Revenue Optimization

### Increase Sales
1. Market your platform on Twitter/Discord
2. Create unique, valuable NFTs
3. Build community engagement
4. Offer limited editions or drops

### Reduce Costs
1. Use Arweave for permanent storage
2. Optimize metadata size
3. Batch uploads to reduce fees
4. Use Solana's low-cost infrastructure

### Multiple Revenue Streams
1. Service fees per mint
2. Secondary marketplace fees
3. Staking/locking NFTs
4. Exclusive content access

## Next Steps

1. **Customize**: Modify the UI and add your branding
2. **Deploy**: Push to Vercel with mainnet config
3. **Market**: Share on Twitter/Discord with your community
4. **Monitor**: Track mints and revenue on admin dashboard
5. **Scale**: Add features based on user feedback

## Differentiation from Solmint

| Aspect | This Project | Solmint |
|--------|-------------|--------|
| Purpose | NFT Minting Platform | Token Minting Toolkit |
| Standard | Metaplex Core | SPL Token |
| Use Case | Collectibles, Art, Gaming | Cryptocurrencies |
| Revenue | Per-mint service fees | One-time creation |
| Metadata | Rich (images, traits) | Minimal |
| Complexity | Full platform | Basic toolkit |

## License

MIT License - Feel free to use this for commercial projects

## Support & Feedback

Have questions or need help? Open an issue on GitHub!

---

**SolGem** - Built with ❤️ for the Solana community

Start generating revenue from day 1 with Solana's lightning-fast blockchain! 🚀💎
