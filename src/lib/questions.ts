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
