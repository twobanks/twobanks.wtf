export const fetcher = async <JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> => {
  const res = await fetch(input, init);
  return res.json();
}

export const fetcherStrava = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Erro ao carregar dados');
  }
  return res.json();
};