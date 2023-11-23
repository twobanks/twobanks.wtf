export const conversionTitlePage = (value: string) => {
  const labels: { [index: string]: string } = {
    'about': 'sobre',
    'trampos': 'trampos',
    'snippets': 'code snippets',
    'activities': 'atividades',
    'ouvindo': '...ouvindo!'
  }
  return labels[value];
}
