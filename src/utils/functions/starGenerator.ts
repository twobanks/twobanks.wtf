const specialColors = [ '#A0C4FF', '#FFD27D' ];

export const generateBoxShadow = (n: number) => {
  let value = '';
  for (let i = 0; i < n; i++) {
    const x = Math.floor(Math.random() * 4000);
    const y = Math.floor(Math.random() * 4000);
    let color = '#FFFFFF'; 
    if (Math.random() > 0.8) {
      color = specialColors[Math.floor(Math.random() * specialColors.length)];
    }
    value += `${x}px ${y}px ${color}`;
    if (i < n - 1) {
      value += ', ';
    }
  }
  return value;
};