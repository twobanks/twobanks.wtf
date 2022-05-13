export const conversionPage = (value: string) => {
  const labels: { [index: string]: string } = {
    'about': 'sobre',
    'activities': 'bike | trail',
    'works': 'trampos',
    'idea': 'as ideia'
  }
  return labels[value];
}
