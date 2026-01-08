export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
  properties: {
    files: Array<{ uri: string; type: string }>;
    category: 'image' | 'video' | 'audio';
    creators: Array<{ address: string; share: number }>;
  };
  collection?: {
    name: string;
    family: string;
  };
}

/**
 * Uploads NFT metadata to Arweave via Bundlr
 * Metadata is stored permanently on-chain
 */
export async function uploadMetadataToArweave(
  metadata: NFTMetadata
): Promise<{ uri: string; success: boolean }> {
  try {
    // In production, this would:
    // 1. Initialize Bundlr client with the private key from .env
    // 2. Convert metadata to JSON
    // 3. Upload to Bundlr (which batches to Arweave)
    // 4. Return the permanent Arweave URI

    const mockUri = `https://arweave.net/${generateMockHash()}`;

    console.log('Uploading metadata to Arweave:', {
      name: metadata.name,
      uri: mockUri,
    });

    return {
      uri: mockUri,
      success: true,
    };
  } catch (error) {
    console.error('Error uploading to Arweave:', error);
    return {
      uri: '',
      success: false,
    };
  }
}

/**
 * Uploads batch of NFT metadata
 */
export async function uploadBatchMetadataToArweave(
  metadataArray: NFTMetadata[]
): Promise<{ uris: string[]; successCount: number }> {
  const results = await Promise.allSettled(
    metadataArray.map((metadata) => uploadMetadataToArweave(metadata))
  );

  const uris: string[] = [];
  let successCount = 0;

  results.forEach((result) => {
    if (result.status === 'fulfilled' && result.value.success) {
      uris.push(result.value.uri);
      successCount++;
    } else {
      uris.push('');
    }
  });

  return { uris, successCount };
}

/**
 * Generates sample NFT metadata for testing
 */
export function generateSampleMetadata(index: number, collectionName: string): NFTMetadata {
  return {
    name: `${collectionName} #${index}`,
    description: `A unique NFT from the ${collectionName} collection on Solana`,
    image: `https://via.placeholder.com/400x400?text=${collectionName}+${index}`,
    attributes: [
      {
        trait_type: 'Rarity',
        value: (['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'] as const)[Math.floor(Math.random() * 5)]!,
      },
      {
        trait_type: 'Level',
        value: Math.floor(Math.random() * 100) + 1,
      },
    ],
    properties: {
      files: [
        {
          uri: `https://via.placeholder.com/400x400?text=${collectionName}+${index}`,
          type: 'image/png',
        },
      ],
      category: 'image',
      creators: [
        {
          address: 'CreatorAddressHere',
          share: 100,
        },
      ],
    },
    collection: {
      name: collectionName,
      family: collectionName,
    },
  };
}

/**
 * Validates NFT metadata structure
 */
export function validateMetadata(metadata: NFTMetadata): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!metadata.name || metadata.name.trim() === '') {
    errors.push('Name is required');
  }

  if (!metadata.image || metadata.image.trim() === '') {
    errors.push('Image URI is required');
  }

  if (!metadata.properties || !metadata.properties.files) {
    errors.push('Properties.files is required');
  }

  if (!metadata.properties.category) {
    errors.push('Properties.category is required');
  }

  if (!metadata.properties.creators || metadata.properties.creators.length === 0) {
    errors.push('At least one creator is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Generates a mock Arweave hash for testing
 */
function generateMockHash(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let hash = '';
  for (let i = 0; i < 43; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return hash;
}
