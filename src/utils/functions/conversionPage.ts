export const conversionTitlePage = (value: string) => {
  const labels: { [index: string]: string } = {
    'about': 'sobre',
    'works': 'trampos',
    'idea': 'blog',
    'activities': 'atividades'
  }
  return labels[value];
}
