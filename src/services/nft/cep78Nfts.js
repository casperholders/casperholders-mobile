import { getStateItem } from '@/helpers/rpc';

export async function fetchCep78IdentifierMode(network, srh, token) {
  const name = token.namedKeys?.filter((n) => n.name === 'identifier_mode');
  if (name[0] && name[0].initial_value && !force) {
    return name[0].initial_value;
  }

  return name[0]
    ? (await getStateItem(network, name[0].uref, srh))
      .result?.stored_value?.CLValue?.parsed
    : undefined;
}
