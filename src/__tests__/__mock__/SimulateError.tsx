type SumulateProp = {
  simulate: boolean;
};

export function SimulateError(prop: SumulateProp) {
  const { simulate } = prop;
  if (simulate) {
    throw new Error('Error simulated');
  }
  return <div>No error</div>;
}
