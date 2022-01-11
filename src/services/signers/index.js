import localSigner from '@/services/signers/testLocalSigner';

export default {
  [localSigner.id]: localSigner,
};
