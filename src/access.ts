export default function access(initialState: { currentUser?: any } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.roles.includes('ADMIN'),
  };
}
