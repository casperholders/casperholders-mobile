import signers from '@/services/signers';

export default function getSignerFromId(signerId) {
  return signers[signerId];
}
