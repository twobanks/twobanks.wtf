export const conversionPage = (value: string) => {
  const labels: { [index: string]: string } = {
    'about': 'sobre',
    'works': 'trampos',
    'idea': 'ideia',
    'activities': 'vivência'
  }
  return labels[value];
}
