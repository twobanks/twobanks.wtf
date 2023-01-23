export const conversionTitlePage = (value: string) => {
  const labels: { [index: string]: string } = {
    'about': 'sobre',
    'works': 'trampos',
    'snippets': 'code snippets',
    'activities': 'atividades'
  }
  return labels[value];
}
