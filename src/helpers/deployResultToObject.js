export default function deployResultToObject(deployResult) {
  return {
    name: deployResult.name,
    hash: deployResult.hash.toLowerCase(),
    status: deployResult.status,
    message: deployResult.message,
    cost: deployResult.cost?.toString(),
    amount: deployResult.amount?.toString(),
  };
}
