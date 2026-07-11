export const menuData = {
  makis: [
    {
      name: 'ACEVICHADO',
      tag: 'Favorito de siempre',
      price: 'S/ 26',
      desc: 'Relleno de ebi furai y palta, cubierto de bonito, salsa acevichada, togarashi y neggi.',
    },
    {
      name: 'YEYO MAKI',
      tag: 'new kid on the block',
      price: 'S/ 26',
      desc: 'Relleno de ebi furai y palta, cubierto de bonito flameado en salsa yeyo, leche de tigre nikkei, kuro goma y neggi.',
    },
    {
      name: 'VOLCÁN',
      tag: '🔥🔥 Spicy',
      price: 'S/ 26',
      desc: 'Relleno de ebi furai y queso crema, cubierto de bonito flameado en salsa spicy, togarashi y kuro goma.',
    },
    {
      name: 'KING SALMON',
      tag: '👑 Premium',
      price: 'S/ 26',
      desc: 'Relleno de ebi furai y palta, cubierto de salmón flameado en salsa spicy, salsa tare y togarashi.',
    },
    {
      name: 'CALIFORNIA',
      tag: 'creamy & fresh af',
      price: 'S/ 26',
      desc: 'Relleno de salmón, palta y queso crema, cubierto con kuro goma.',
    },
    {
      name: 'FURAI',
      tag: 'Empanizado perfecto',
      price: 'S/ 26',
      desc: 'Relleno de salmón, queso crema y palta. Empanizado y frito por fuera.',
    },
    {
      name: 'PARRILLERO',
      tag: 'nene',
      price: 'S/ 26',
      desc: 'Relleno de ebi furai y queso crema, cubierto de lomo fino flameado, chimichurri y togarashi.',
    },
    {
      name: 'PARMESANO',
      tag: 'iykyk',
      price: 'S/ 26',
      desc: 'Relleno de ebi furai y palta, cubierto de parmesano, gotas de limón y togarashi.',
    },
  ],
  signature: [
    {
      name: 'RYU NO KEN',
      tag: 'El dragón',
      price: 'S/ 32',
      desc: 'Relleno de ebi furai y palta, cubierto de lomo fino flameado en salsa spicy, nuestra crema Dragon, y coronado con togarashi.',
    },
    {
      name: 'KURO KAJI ROLL',
      tag: 'Fuego negro',
      price: 'S/ 32',
      desc: 'Relleno de salmón y palta, cubierto de bonito flameado en parmesano, siracha, togarashi, kuro goma y neggi.',
    },
    {
      name: 'FUJI SUNSET',
      tag: 'Delicado',
      price: 'S/ 32',
      desc: 'Relleno de ebi furai, palta y nuestro nabo encurtido, cubierto de salmón, salsa fuji, togarashi y neggi.',
    },
  ],
  bites: [
    { name: 'KESAKE ROLL', tag: '', price: 'S/ 25', desc: 'Relleno de salmón y queso crema, cubierto de kuro goma por fuera.' },
    { name: 'PASAKE ROLL', tag: '', price: 'S/ 25', desc: 'Relleno de salmón y palta, cubierto de shiro goma por fuera.' },
    { name: 'KEBI ROLL', tag: '', price: 'S/ 25', desc: 'Relleno de ebi furai y queso crema, cubierto de un mix de kuro y shiro goma.' },
    { name: 'KESAKE FURAI', tag: 'Frito & delicioso', price: 'S/ 25', desc: 'Relleno de salmón y queso crema, empanizado y frito por fuera.' },
  ],
  entradas: [
    { name: 'EBI FURAI', tag: 'infaltables • 5 unid', price: 'S/ 18', desc: 'W/ limón y canela china.' },
    { name: 'WANTAN FRITO', tag: '6 unid', price: 'S/ 10', desc: 'Crujiente y adictivo.' },
    { name: 'ALITAS FRITAS XL', tag: '6 unid', price: 'S/ 28', desc: 'W/ limón y canela china. ufff.' },
    { name: 'NABO ENCURTIDO', tag: 'iykyk • Para compartir', price: 'S/ 7', desc: 'Porción para compartir.' },
  ],
}

export type MenuCategory = 'makis' | 'signature' | 'bites' | 'entradas'
