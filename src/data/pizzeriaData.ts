export interface MenuItem {
  id: string;
  name: string;
  category: 'Clássicas' | 'Especiais da Casa' | 'Vegetarianas' | 'Doces' | 'Bebidas';
  description: string;
  price: number;
  sizeNote: string;
  featured?: boolean;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  alt: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  name: string;
  context: string;
  rating: number;
  text: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const BUSINESS_INFO = {
  name: 'Pizzaria Bianca',
  slogan: 'Massa perfeita, sabor inesquecível',
  address: 'R. Cristiano Machado, 116 - Centro, Contagem - MG, 32040-590',
  shortAddress: 'R. Cristiano Machado, 116 · Centro, Contagem - MG',
  phoneDisplay: '(31) 3398-5252',
  whatsappNumber: '553133985252',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=R.+Cristiano+Machado,+116+-+Centro,+Contagem+-+MG,+32040-590',
  hours: 'Terça a Domingo, 18h às 23h30',
} as const;

export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${BUSINESS_INFO.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'foto-1',
    url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLc5PaylfKmm_W0Uq58g2QlFrhV2rGRC9lguL8HdiX6Xm_RY5YG9lv_DjpV7Aw-1Qmvn5DTKTiKVwk1yLFSTfCZJhMgcLmgPLzfzluIJ_vUav1z56r01yqa6tBdG5dNEm9WFygkZN_9Z2rGh=s4800-w1024',
    alt: 'Pizzaria Bianca — ambiente e preparo artesanal em Contagem',
    caption: 'Nosso espaço preparado para receber você com pizzas assadas na hora.',
  },
  {
    id: 'foto-2',
    url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLd7KEG4ozI8SqiCf8Hu-Zi5DRdTD7Z4H7X-SQDnuZEuodoVKZhUc8f4J9x1kws0IESwd-PEhh_2SB5Va-UtRnA_2IxmbIaNcwussGKjsy95zZV53xxDsqggfw9GrslvaYpBUKiJfA=s4800-w1024',
    alt: 'Pizza artesanal da Pizzaria Bianca com borda dourada e recheio generoso',
    caption: 'Massa de fermentação cuidadosa, borda leve e cobertura equilibrada.',
  },
  {
    id: 'foto-3',
    url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLc5OyCIGbj5_8H81FcOT946B5qdEyju5EKO_18BYLUHXZOjYUgupDRTjGHEYLiskCjcQCaNGxlnwfwWFPhUBrMJ0nT3ENFSwA8tCLJ4NMrAeXq-ygBMep-e2KD5YJZwYiqc6qiNVpXMvXyk=s4800-w1024',
    alt: 'Pizzas recém-saídas do forno na Pizzaria Bianca no Centro de Contagem',
    caption: 'Sabor marcante do forno à sua mesa no Centro de Contagem.',
  },
  {
    id: 'foto-4',
    url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLcNL9Ui8A4X2hXUUwQml1dWUqnjBuPYnMDTwAKTw7Ga--qE0ynbWyrb1pdZQQ3Jknfk3dVrSNYHir2HzC_uqd8e96ouh8jLbJMO8CIGK_oKT8ARsbd-I9aeF28MSnGh-q9JhiJI4ls0qmTr=s4800-w1024',
    alt: 'Atendimento e apresentação dos pratos na Pizzaria Bianca',
    caption: 'Tradição e cuidado em cada fatia servida ou enviada por delivery.',
  },
];

export const MENU_CATEGORIES: Array<'Todas' | MenuItem['category']> = [
  'Todas',
  'Clássicas',
  'Especiais da Casa',
  'Vegetarianas',
  'Doces',
  'Bebidas',
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'pepperoni-classica',
    name: 'Pepperoni Bianca',
    category: 'Clássicas',
    description:
      'Molho de tomate italiano temperado na casa, mussarela selecionada, fatias crocantes de pepperoni e toque de orégano fresco.',
    price: 58.9,
    sizeNote: 'Grande · 8 fatias',
    featured: true,
  },
  {
    id: 'margherita-folha',
    name: 'Margherita Tradicional',
    category: 'Clássicas',
    description:
      'Molho artesanal de tomates maduros, mussarela derretida, rodelas de tomate fresco, folhas de manjericão verde e fio de azeite extra virgem.',
    price: 52.9,
    sizeNote: 'Grande · 8 fatias',
    featured: true,
  },
  {
    id: 'calabresa-acebolada',
    name: 'Calabresa Especial',
    category: 'Clássicas',
    description:
      'Linguiça calabresa fatiada, cebola roxa laminada, mussarela cremosa e azeitonas pretas sobre massa leve e crocante.',
    price: 54.9,
    sizeNote: 'Grande · 8 fatias',
  },
  {
    id: 'portuguesa-completa',
    name: 'Portuguesa da Casa',
    category: 'Clássicas',
    description:
      'Presunto cozido, ovos cozidos, cebola, pimentão colorido, ervilhas frescas, azeitonas e cobertura generosa de mussarela.',
    price: 57.9,
    sizeNote: 'Grande · 8 fatias',
  },
  {
    id: 'frango-catupiry',
    name: 'Frango com Requeijão Cremoso',
    category: 'Especiais da Casa',
    description:
      'Peito de frango desfiado e refogado em tempero suave, coberto com requeijão cremoso autêntico e milho selecionado.',
    price: 59.9,
    sizeNote: 'Grande · 8 fatias',
    featured: true,
  },
  {
    id: 'bianca-suprema',
    name: 'Bianca Suprema',
    category: 'Especiais da Casa',
    description:
      'Combinação exclusiva de lombo defumado, bacon dourado, palmito macio, champignon fatiado, mussarela e parmesão gratinado.',
    price: 64.9,
    sizeNote: 'Grande · 8 fatias',
    featured: true,
  },
  {
    id: 'quatro-queijos-nobre',
    name: 'Quatro Queijos Artesanal',
    category: 'Especiais da Casa',
    description:
      'Harmonização equilibrada de mussarela, provolone defumado, gorgonzola suave e requeijão cremoso gratinados no forno.',
    price: 61.9,
    sizeNote: 'Grande · 8 fatias',
  },
  {
    id: 'carne-seca-banana',
    name: 'Mineira de Carne Seca',
    category: 'Especiais da Casa',
    description:
      'Carne seca desfiada e acebolada na manteiga de garrafa, mussarela derretida e toque de requeijão cremoso.',
    price: 65.9,
    sizeNote: 'Grande · 8 fatias',
  },
  {
    id: 'rucula-tomate-seco',
    name: 'Rúcula com Tomate Seco',
    category: 'Vegetarianas',
    description:
      'Mussarela cremosa, tomates secos marinados em ervas e folhas frescas de rúcula adicionadas ao sair do forno.',
    price: 58.9,
    sizeNote: 'Grande · 8 fatias',
  },
  {
    id: 'abobrinha-parmesao',
    name: 'Abobrinha & Parmesão',
    category: 'Vegetarianas',
    description:
      'Lâminas finas de abobrinha grelhada no alho e azeite, mussarela leve, lascas de parmesão e pimenta-do-reino moída.',
    price: 55.9,
    sizeNote: 'Grande · 8 fatias',
  },
  {
    id: 'chocolate-morango',
    name: 'Chocolate ao Leite com Morango',
    category: 'Doces',
    description:
      'Massa doce assada com ganache cremosa de chocolate ao leite e morangos frescos fatiados na hora de servir.',
    price: 49.9,
    sizeNote: 'Média · 6 fatias',
    featured: true,
  },
  {
    id: 'romeu-e-julieta',
    name: 'Romeu e Julieta Mineiro',
    category: 'Doces',
    description:
      'Base generosa de mussarela derretida coberta com goiabada cascão cremosa derretida no forno.',
    price: 46.9,
    sizeNote: 'Média · 6 fatias',
  },
  {
    id: 'refrigerante-2l',
    name: 'Refrigerante 2 Litros',
    category: 'Bebidas',
    description: 'Opções tradicionais bem geladas para acompanhar o pedido em família.',
    price: 14.0,
    sizeNote: 'Garrafa · 2L',
  },
  {
    id: 'suco-natural-500ml',
    name: 'Suco Natural 500ml',
    category: 'Bebidas',
    description: 'Sabores da estação preparados na hora: laranja, abacaxi com hortelã ou maracujá.',
    price: 12.0,
    sizeNote: 'Copo · 500ml',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'dep-1',
    name: 'Mariana Oliveira',
    context: 'Moradora do Centro, Contagem',
    rating: 5,
    text: 'A massa da Pizzaria Bianca é realmente diferenciada: leve, crocante na borda e sem pesar. A de Pepperoni chega sempre quentinha aqui em casa.',
  },
  {
    id: 'dep-2',
    name: 'Rafael Mendes',
    context: 'Cliente frequente no salão e delivery',
    rating: 5,
    text: 'Pedimos quase toda sexta-feira pelo WhatsApp. O atendimento no (31) 3398-5252 é super rápido e a Margherita tem sabor de pizzaria tradicional de verdade.',
  },
  {
    id: 'dep-3',
    name: 'Camila & Bruno Ferreira',
    context: 'Contagem - MG',
    rating: 5,
    text: 'Fomos conhecer o espaço na R. Cristiano Machado e viramos clientes fiéis. Recheio farto, ingredientes frescos e a pizza doce de morango fecha a noite com chave de ouro.',
  },
  {
    id: 'dep-4',
    name: 'Eduardo Teixeira',
    context: 'Pedido para retirada no balcão',
    rating: 5,
    text: 'Sempre retiro no balcão quando saio do trabalho. Cumprem o horário certinho e a Bianca Suprema nunca decepciona.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Qual é o endereço e o horário de funcionamento da Pizzaria Bianca?',
    answer:
      'Estamos localizados na R. Cristiano Machado, 116 - Centro, Contagem - MG, 32040-590. Atendemos de terça a domingo, das 18h às 23h30, tanto para consumo e retirada quanto para entregas na região.',
  },
  {
    id: 'faq-2',
    question: 'Como faço meu pedido pelo WhatsApp?',
    answer:
      'Você pode escolher os sabores diretamente aqui no cardápio digital e clicar em "Finalizar pedido no WhatsApp", ou enviar uma mensagem direta para (31) 3398-5252 informando os sabores escolhidos, tamanho, forma de pagamento e endereço de entrega.',
  },
  {
    id: 'faq-3',
    question: 'Vocês fazem pizza meio a meio?',
    answer:
      'Sim! Todas as nossas pizzas salgadas grandes (8 fatias) podem ser montadas com até dois sabores meio a meio. O valor cobrado segue o sabor de maior preço dentre os escolhidos.',
  },
  {
    id: 'faq-4',
    question: 'Posso retirar o pedido no balcão ou comer no local?',
    answer:
      'Com certeza. Você pode fazer seu pedido antecipadamente pelo telefone/WhatsApp (31) 3398-5252 e retirar sem espera no nosso endereço no Centro de Contagem, ou aproveitar nossas pizzas diretamente no local.',
  },
  {
    id: 'faq-5',
    question: 'Quais formas de pagamento são aceitas?',
    answer:
      'Aceitamos Pix, cartões de crédito e débito (na entrega ou no balcão) e dinheiro. Basta informar sua preferência ao finalizar o pedido pelo WhatsApp.',
  },
  {
    id: 'faq-6',
    question: 'Há opções vegetarianas no cardápio?',
    answer:
      'Sim! Além da clássica Margherita Tradicional, contamos com uma seção dedicada a pizzas vegetarianas, como Rúcula com Tomate Seco e Abobrinha & Parmesão, preparadas com ingredientes frescos.',
  },
];
