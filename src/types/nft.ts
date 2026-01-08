export interface NFTAttribute {
  trait_type: string;
  value: string | number;
}

export interface NFTFile {
  uri: string;
  type: string;
}

export interface NFTCreator {
  address: string;
  share: number;
}

export interface NFTProperties {
  files: NFTFile[];
  category: 'image' | 'video' | 'audio' | 'html';
  creators: NFTCreator[];
}

export interface NFTCollection {
  name: string;
  family: string;
}

export interface NFTMetadata {
  name: string;
  description?: string;
  image: string;
  external_url?: string;
  attributes?: NFTAttribute[];
  properties: NFTProperties;
  collection?: NFTCollection;
}

export interface MintedNFT extends NFTMetadata {
  id: string;
  mint: string;
  owner: string;
  timestamp: number;
  transactionSignature: string;
}

export interface MintingStats {
  totalMinted: number;
  totalRevenue: number;
  averageMintPrice: number;
  lastMintTime?: number;
}
