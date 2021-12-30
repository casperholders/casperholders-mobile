import localSigner from '@/services/signers/localSigner';

export default {
  [localSigner.id]: localSigner,
};
