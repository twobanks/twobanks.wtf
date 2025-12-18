const specialColors: readonly string[] = ['#A0C4FF', '#FFD27D'];

export const generateBoxShadow = (n: number): string => {
  let value = '';
  
  for (let i = 0; i < n; i++) {
    const x = Math.floor(Math.random() * 4000);
    const y = Math.floor(Math.random() * 4000);
    
    let color = '#FFFFFF';
    
    if (Math.random() > 0.8) {
      const randomIndex = Math.floor(Math.random() * specialColors.length);
      color = specialColors[randomIndex] ?? '#FFFFFF';
    }

    value += `${x}px ${y}px ${color}`;

    if (i < n - 1) {
      value += ', ';
    }
  }

  return value;
};