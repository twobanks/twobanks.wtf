export default function Sobre() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Sobre Nós</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Conheça nossa história, missão e a equipe por trás do projeto.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Nossa História</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Fundada com o propósito de transformar ideias em soluções inovadoras, nossa jornada é movida pela paixão por excelência e pelo compromisso com nossos clientes.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Missão</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Entregar experiências de alta qualidade que impactem positivamente a vida das pessoas.
          </p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Visão</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Ser referência no mercado através da inovação constante e excelência técnica.
          </p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Valores</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Transparência, empatia, compromisso com resultados e melhoria contínua.
          </p>
        </div>
      </section>
    </main>
  );
}