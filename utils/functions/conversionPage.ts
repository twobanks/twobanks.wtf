export const conversionTitlePage = (value: string) => {
  const labels: { [index: string]: string } = {
    'sobre': 'sobre',
    'trampos': 'trampos',
    'snippets': 'code snippets',
    'activities': 'atividades',
    'ouvindo': '...ouvindo!'
  }
  return labels[value];
}
