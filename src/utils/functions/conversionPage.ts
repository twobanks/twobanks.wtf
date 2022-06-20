export const conversionPage = (value: string) => {
  const labels: { [index: string]: string } = {
    'about': 'sobre',
    'works': 'trampo',
    'idea': 'ideia',
    'lifestyle': 'vivência'
  }
  return labels[value];
}
