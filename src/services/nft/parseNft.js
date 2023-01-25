function getImage(nft) {
  if (nft.loading === false) {
    if (nft.metadata?.get('image')) {
      const image = nft.metadata.get('image').replace('ipfs://', 'https://gateway.ipfs.io/ipfs/');
      return image.match(/^http(s)*:\/\//) ? image : `https://gateway.ipfs.io/ipfs/${image}`;
    }
    if (nft.metadata?.get('ipfs_url')) {
      return nft.metadata.get('ipfs_url').replace('ipfs://', 'https://gateway.ipfs.io/ipfs/');
    }
    if (nft.metadata?.get('pictureIpfs')) {
      return `https://gateway.ipfs.io/ipfs/${nft.metadata.get('pictureIpfs').replace('ipfs://', '')}`;
    }
    if (nft.metadata?.get('asset') && !nft.metadata?.get('asset').match(/\.json$/)) {
      return nft.metadata.get('asset').replace('ipfs://', 'https://gateway.ipfs.io/ipfs/');
    }
  }
  return undefined;
}

function getAnimation(nft) {
  if (nft) {
    if (nft.metadata?.get('animation_url')) {
      return nft.metadata.get('animation_url').replace('ipfs://', 'https://gateway.ipfs.io/ipfs/');
    }
  }
  return null;
}

function getName(nft) {
  if (nft.metadata?.get('name')) {
    return nft.metadata.get('name');
  }
  return nft.token_id;
}

function getDescription(nft) {
  if (nft.metadata?.get('description')) {
    return nft.metadata.get('description');
  }
  if (nft.metadata?.get('name')) {
    return nft.token_id;
  }
  return nft.metadata?.get('name');
}

function getCharacteristics(nft) {
  const characteristics = new Map(nft.metadata);
  characteristics.delete('description');
  characteristics.delete('name');
  characteristics.delete('image');
  characteristics.delete('token_uri');
  characteristics.delete('attributes');
  characteristics.delete('pictureIpfs');
  characteristics.delete('ipfs_url');
  characteristics.delete('animation_url');
  characteristics.delete('asset');
  return characteristics;
}

function getAttributes(nft) {
  if (nft.metadata?.get('attributes')) {
    if (Array.isArray(nft.metadata.get('attributes'))) {
      nft.metadata.set('attributes', new Map(nft.metadata.get('attributes').map((attr) => [attr.trait_type, attr.value])));
    }
    return nft.metadata.get('attributes');
  }
  return undefined;
}

export default function parseNft(nft) {
  return {
    id: nft.token_id,
    imageURL: getImage(nft),
    videoURL: getAnimation(nft),
    name: getName(nft),
    description: getDescription(nft),
    characteristics: getCharacteristics(nft),
    attributes: getAttributes(nft),
  };
}
