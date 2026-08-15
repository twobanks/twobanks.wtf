// env.d.ts

// Ensina o TypeScript a aceitar importações de SVG com o sufixo ?raw
declare module '*.svg?raw' {
  const content: string;
  export default content;
}

// (Opcional) Também ensina a aceitar SVGs normais como URL, caso precise
declare module '*.svg' {
  const content: any;
  export default content;
}