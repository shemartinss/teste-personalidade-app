const questions = [
  // Neuroticismo (N) – Facetas 1 a 6
  { id: "n1p", text: "Me preocupo com as coisas", domain: "N", facet: 1, keyed: "plus" },
  { id: "n1m", text: "Não me estresso facilmente", domain: "N", facet: 1, keyed: "minus" },
  { id: "n1p2", text: "Temo o pior com frequência", domain: "N", facet: 1, keyed: "plus" },
  { id: "n1m2", text: "Sou tranquilo(a) diante de incertezas", domain: "N", facet: 1, keyed: "minus" },

  { id: "n2p", text: "Fico com raiva facilmente", domain: "N", facet: 2, keyed: "plus" },
  { id: "n2m", text: "Sou emocionalmente estável", domain: "N", facet: 2, keyed: "minus" },
  { id: "n2p2", text: "Explodo por pequenas coisas", domain: "N", facet: 2, keyed: "plus" },
  { id: "n2m2", text: "Mantenho a calma sob pressão", domain: "N", facet: 2, keyed: "minus" },

  { id: "n3p", text: "Frequentemente me sinto triste", domain: "N", facet: 3, keyed: "plus" },
  { id: "n3m", text: "Me sinto bem comigo mesmo(a)", domain: "N", facet: 3, keyed: "minus" },
  { id: "n3p2", text: "Me sinto para baixo frequentemente", domain: "N", facet: 3, keyed: "plus" },
  { id: "n3m2", text: "Tenho autoestima elevada", domain: "N", facet: 3, keyed: "minus" },

  { id: "n4p", text: "Tenho dificuldade de me aproximar dos outros", domain: "N", facet: 4, keyed: "plus" },
  { id: "n4m", text: "Me sinto confortável em novos grupos", domain: "N", facet: 4, keyed: "minus" },
  { id: "n4p2", text: "Me sinto inseguro em situações sociais", domain: "N", facet: 4, keyed: "plus" },
  { id: "n4m2", text: "Consigo fazer novos amigos com facilidade", domain: "N", facet: 4, keyed: "minus" },

  { id: "n5p", text: "Adoro ir em farras", domain: "N", facet: 5, keyed: "plus" },
  { id: "n5m", text: "Raramente me excedo em festas", domain: "N", facet: 5, keyed: "minus" },
  { id: "n5p2", text: "Costumo perder o controle em festas", domain: "N", facet: 5, keyed: "plus" },
  { id: "n5m2", text: "Tenho autocontrole em eventos sociais", domain: "N", facet: 5, keyed: "minus" },

  { id: "n6p", text: "Entro em pânico facilmente", domain: "N", facet: 6, keyed: "plus" },
  { id: "n6m", text: "Reajo com calma ao estresse", domain: "N", facet: 6, keyed: "minus" },
  { id: "n6p2", text: "Me sinto sobrecarregado(a) com facilidade", domain: "N", facet: 6, keyed: "plus" },
  { id: "n6m2", text: "Lido bem com momentos difíceis", domain: "N", facet: 6, keyed: "minus" },

  // Extroversão (E) – Facetas 1 a 6
  { id: "e1p", text: "Faço amigos com facilidade", domain: "E", facet: 1, keyed: "plus" },
  { id: "e1m", text: "Evito contatos com outras pessoas", domain: "E", facet: 1, keyed: "minus" },
  { id: "e1p2", text: "Gosto de conversar com desconhecidos", domain: "E", facet: 1, keyed: "plus" },
  { id: "e1m2", text: "Me sinto desconfortável em ambientes sociais", domain: "E", facet: 1, keyed: "minus" },

  { id: "e2p", text: "Amo grandes festas", domain: "E", facet: 2, keyed: "plus" },
  { id: "e2m", text: "Evito lugares movimentados", domain: "E", facet: 2, keyed: "minus" },
  { id: "e2p2", text: "Gosto de eventos sociais com muitas pessoas", domain: "E", facet: 2, keyed: "plus" },
  { id: "e2m2", text: "Prefiro ambientes calmos", domain: "E", facet: 2, keyed: "minus" },

  { id: "e3p", text: "Assumo a liderança das coisas", domain: "E", facet: 3, keyed: "plus" },
  { id: "e3m", text: "Prefiro seguir a liderança dos outros", domain: "E", facet: 3, keyed: "minus" },
  { id: "e3p2", text: "Me posiciono com facilidade em grupo", domain: "E", facet: 3, keyed: "plus" },
  { id: "e3m2", text: "Evito assumir a frente de projetos", domain: "E", facet: 3, keyed: "minus" },

  { id: "e4p", text: "Estou sempre ocupado(a)", domain: "E", facet: 4, keyed: "plus" },
  { id: "e4m", text: "Gosto de ter bastante tempo livre", domain: "E", facet: 4, keyed: "minus" },
  { id: "e4p2", text: "Sou movido(a) por alta energia", domain: "E", facet: 4, keyed: "plus" },
  { id: "e4m2", text: "Preciso de muito descanso entre atividades", domain: "E", facet: 4, keyed: "minus" },

  { id: "e5p", text: "Busco sempre emoção (adrenalina)", domain: "E", facet: 5, keyed: "plus" },
  { id: "e5m", text: "Evito situações muito intensas", domain: "E", facet: 5, keyed: "minus" },
  { id: "e5p2", text: "Gosto de desafios empolgantes", domain: "E", facet: 5, keyed: "plus" },
  { id: "e5m2", text: "Prefiro estabilidade a emoções fortes", domain: "E", facet: 5, keyed: "minus" },

  { id: "e6p", text: "Irradio alegria", domain: "E", facet: 6, keyed: "plus" },
  { id: "e6m", text: "Sou mais reservado(a) em minhas emoções", domain: "E", facet: 6, keyed: "minus" },
  { id: "e6p2", text: "Me entusiasmo facilmente com pequenas coisas", domain: "E", facet: 6, keyed: "plus" },
  { id: "e6m2", text: "Demonstro pouco entusiasmo em geral", domain: "E", facet: 6, keyed: "minus" },

  // Abertura (O) – Facetas 1 a 6
{ id: "o1p", text: "Tenho uma imaginação fértil", domain: "O", facet: 1, keyed: "plus" },
{ id: "o1m", text: "Tenho dificuldade em imaginar cenários diferentes", domain: "O", facet: 1, keyed: "minus" },
{ id: "o1p2", text: "Gosto de sonhar acordado(a)", domain: "O", facet: 1, keyed: "plus" },
{ id: "o1m2", text: "Prefiro o que é concreto ao que é abstrato", domain: "O", facet: 1, keyed: "minus" },

{ id: "o2p", text: "Acredito na importância da arte", domain: "O", facet: 2, keyed: "plus" },
{ id: "o2m", text: "Não vejo sentido em arte ou poesia", domain: "O", facet: 2, keyed: "minus" },
{ id: "o2p2", text: "Tenho sensibilidade estética aguçada", domain: "O", facet: 2, keyed: "plus" },
{ id: "o2m2", text: "Sou pouco sensível a expressões artísticas", domain: "O", facet: 2, keyed: "minus" },

{ id: "o3p", text: "Experimento minhas emoções intensamente", domain: "O", facet: 3, keyed: "plus" },
{ id: "o3m", text: "Raramente percebo minhas emoções", domain: "O", facet: 3, keyed: "minus" },
{ id: "o3p2", text: "Tenho um mundo emocional muito vivo", domain: "O", facet: 3, keyed: "plus" },
{ id: "o3m2", text: "Me considero emocionalmente neutro(a)", domain: "O", facet: 3, keyed: "minus" },

{ id: "o4p", text: "Prefiro variedade à rotina", domain: "O", facet: 4, keyed: "plus" },
{ id: "o4m", text: "Não gosto de mudanças", domain: "O", facet: 4, keyed: "minus" },
{ id: "o4p2", text: "Gosto de experimentar coisas novas", domain: "O", facet: 4, keyed: "plus" },
{ id: "o4m2", text: "Me sinto desconfortável com novidades", domain: "O", facet: 4, keyed: "minus" },

{ id: "o5p", text: "Gosto de ler textos desafiadores", domain: "O", facet: 5, keyed: "plus" },
{ id: "o5m", text: "Evito discussões filosóficas", domain: "O", facet: 5, keyed: "minus" },
{ id: "o5p2", text: "Tenho interesse por ideias complexas", domain: "O", facet: 5, keyed: "plus" },
{ id: "o5m2", text: "Prefiro conversas simples e diretas", domain: "O", facet: 5, keyed: "minus" },

{ id: "o6p", text: "Costumo votar em candidatos políticos progressistas", domain: "O", facet: 6, keyed: "plus" },
{ id: "o6m", text: "Acredito em valores tradicionais", domain: "O", facet: 6, keyed: "minus" },
{ id: "o6p2", text: "Acredito que certo e errado são relativos", domain: "O", facet: 6, keyed: "plus" },
{ id: "o6m2", text: "Acredito que existem regras morais imutáveis", domain: "O", facet: 6, keyed: "minus" },

  // Agradabilidade (A) – Facetas 1 a 6
{ id: "a1p", text: "Confio nos outros", domain: "A", facet: 1, keyed: "plus" },
{ id: "a1m", text: "Desconfio das intenções das pessoas", domain: "A", facet: 1, keyed: "minus" },
{ id: "a1p2", text: "Acredito que as pessoas geralmente são boas", domain: "A", facet: 1, keyed: "plus" },
{ id: "a1m2", text: "Costumo suspeitar das pessoas", domain: "A", facet: 1, keyed: "minus" },

{ id: "a2p", text: "Sou respeitoso(a) com os outros", domain: "A", facet: 2, keyed: "plus" },
{ id: "a2m", text: "Grito com as pessoas quando me irrito", domain: "A", facet: 2, keyed: "minus" },
{ id: "a2p2", text: "Costumo tratar todos com gentileza", domain: "A", facet: 2, keyed: "plus" },
{ id: "a2m2", text: "Sou impaciente com os outros", domain: "A", facet: 2, keyed: "minus" },

{ id: "a3p", text: "Adoro ajudar aos outros", domain: "A", facet: 3, keyed: "plus" },
{ id: "a3m", text: "Não me interesso pelos problemas dos outros", domain: "A", facet: 3, keyed: "minus" },
{ id: "a3p2", text: "Me preocupo com o bem-estar das pessoas", domain: "A", facet: 3, keyed: "plus" },
{ id: "a3m2", text: "Acho que cada um deve cuidar de si", domain: "A", facet: 3, keyed: "minus" },

{ id: "a4p", text: "Evito conflitos sempre que possível", domain: "A", facet: 4, keyed: "plus" },
{ id: "a4m", text: "Amo uma boa briga", domain: "A", facet: 4, keyed: "minus" },
{ id: "a4p2", text: "Prefiro colaborar do que competir", domain: "A", facet: 4, keyed: "plus" },
{ id: "a4m2", text: "Sou confrontador(a) por natureza", domain: "A", facet: 4, keyed: "minus" },

{ id: "a5p", text: "Sou modesto(a) sobre minhas conquistas", domain: "A", facet: 5, keyed: "plus" },
{ id: "a5m", text: "Acredito ser melhor que os outros", domain: "A", facet: 5, keyed: "minus" },
{ id: "a5p2", text: "Reconheço que tenho limitações como qualquer um", domain: "A", facet: 5, keyed: "plus" },
{ id: "a5m2", text: "Gosto de mostrar que sou superior", domain: "A", facet: 5, keyed: "minus" },

{ id: "a6p", text: "Tenho compaixão pelas pessoas em dificuldades", domain: "A", facet: 6, keyed: "plus" },
{ id: "a6m", text: "Acho que cada um tem o que merece", domain: "A", facet: 6, keyed: "minus" },
{ id: "a6p2", text: "Sinto empatia com facilidade", domain: "A", facet: 6, keyed: "plus" },
{ id: "a6m2", text: "Sou indiferente ao sofrimento alheio", domain: "A", facet: 6, keyed: "minus" },

  // Conscienciosidade (C) – Facetas 1 a 6
{ id: "c1p", text: "Concluo as tarefas com sucesso", domain: "C", facet: 1, keyed: "plus" },
{ id: "c1m", text: "Tenho dificuldade em finalizar o que começo", domain: "C", facet: 1, keyed: "minus" },
{ id: "c1p2", text: "Cumpro o que me proponho a fazer", domain: "C", facet: 1, keyed: "plus" },
{ id: "c1m2", text: "Desisto com facilidade quando algo é difícil", domain: "C", facet: 1, keyed: "minus" },

{ id: "c2p", text: "Gosto de organizar as coisas", domain: "C", facet: 2, keyed: "plus" },
{ id: "c2m", text: "Sou desorganizado(a)", domain: "C", facet: 2, keyed: "minus" },
{ id: "c2p2", text: "Planejo bem antes de agir", domain: "C", facet: 2, keyed: "plus" },
{ id: "c2m2", text: "Tenho dificuldade em manter minhas coisas em ordem", domain: "C", facet: 2, keyed: "minus" },

{ id: "c3p", text: "Mantenho minhas promessas", domain: "C", facet: 3, keyed: "plus" },
{ id: "c3m", text: "Quebro as regras com frequência", domain: "C", facet: 3, keyed: "minus" },
{ id: "c3p2", text: "Sou ético(a) e responsável", domain: "C", facet: 3, keyed: "plus" },
{ id: "c3m2", text: "Faço o que é conveniente, mesmo se não for certo", domain: "C", facet: 3, keyed: "minus" },

{ id: "c4p", text: "Trabalho muito", domain: "C", facet: 4, keyed: "plus" },
{ id: "c4m", text: "Procrastino com frequência", domain: "C", facet: 4, keyed: "minus" },
{ id: "c4p2", text: "Sou esforçado(a) no que faço", domain: "C", facet: 4, keyed: "plus" },
{ id: "c4m2", text: "Evito tarefas que exigem esforço", domain: "C", facet: 4, keyed: "minus" },

{ id: "c5p", text: "Estou sempre preparado(a)", domain: "C", facet: 5, keyed: "plus" },
{ id: "c5m", text: "Sou negligente com prazos e compromissos", domain: "C", facet: 5, keyed: "minus" },
{ id: "c5p2", text: "Antecipar problemas faz parte da minha rotina", domain: "C", facet: 5, keyed: "plus" },
{ id: "c5m2", text: "Costumo esquecer compromissos importantes", domain: "C", facet: 5, keyed: "minus" },

{ id: "c6p", text: "Penso bem antes de agir", domain: "C", facet: 6, keyed: "plus" },
{ id: "c6m", text: "Faço as coisas sem pensar", domain: "C", facet: 6, keyed: "minus" },
{ id: "c6p2", text: "Sou cuidadoso(a) nas minhas decisões", domain: "C", facet: 6, keyed: "plus" },
{ id: "c6m2", text: "Tomo decisões impulsivas", domain: "C", facet: 6, keyed: "minus" },

// Fim do arquivo
];

export default questions;
