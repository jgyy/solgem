// Network Configuration
export const SOLANA_NETWORK = process.env['NEXT_PUBLIC_SOLANA_NETWORK'] || 'devnet';
export const RPC_ENDPOINT = process.env['NEXT_PUBLIC_RPC_ENDPOINT'] || 'https://api.devnet.solana.com';

// Service Configuration
export const SERVICE_FEE_WALLET = process.env['SERVICE_FEE_WALLET'] || '';
export const SERVICE_FEE_AMOUNT = parseFloat(process.env['SERVICE_FEE_AMOUNT'] || '0.1');

// Metaplex Program IDs
export const CANDY_MACHINE_PROGRAM_ID = 'CndyV3LVqC9Aq9VVhQ7FwD4EznsrunEZwTKE64mcvWh';
export const CORE_PROGRAM_ID = 'CoREo63V4xaJxnuS6jB5keaf5RfjqkZgvr7Yt5zLe5Q';

// UI Configuration
export const EXPLORER_BASE_URL = SOLANA_NETWORK === 'mainnet-beta'
  ? 'https://solscan.io'
  : `https://solscan.io?cluster=${SOLANA_NETWORK}`;

// Toast Messages
export const TOAST_MESSAGES = {
  CONNECT_WALLET: 'Please connect your wallet',
  MINTING_IN_PROGRESS: 'Minting your NFT...',
  MINT_SUCCESS: 'NFT minted successfully!',
  MINT_ERROR: 'Failed to mint NFT',
  INSUFFICIENT_BALANCE: 'Insufficient SOL balance',
  TRANSACTION_CONFIRMED: 'Transaction confirmed!',
  TRANSACTION_FAILED: 'Transaction failed',
};

// Feature Flags
export const FEATURES = {
  ENABLE_ADMIN_PANEL: true,
  ENABLE_BATCH_UPLOAD: true,
  ENABLE_ANALYTICS: true,
};
