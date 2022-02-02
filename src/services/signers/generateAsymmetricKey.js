import { Keys } from 'casper-js-sdk';

/**
 * Generate an asymmetric key from a private key string
 * @param key
 * @returns {AsymmetricKey}
 */
export default function generateAsymmetricKey(key) {
  const privateKey = Keys.Ed25519.parsePrivateKey(Keys.Ed25519.readBase64WithPEM(key));
  const publicKey = Keys.Ed25519.privateToPublicKey(privateKey);

  return Keys.Ed25519.parseKeyPair(publicKey, privateKey);
}
