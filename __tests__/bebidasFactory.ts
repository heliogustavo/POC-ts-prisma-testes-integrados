
interface Bebida {
    id: number;
    nome: string;
    tipo: string;
    preco: number;
  }
  
  export function criarBebida(data: Partial<Bebida> = {}): Bebida {
    const defaultValues: Bebida = {
        nome: 'Coca-Cola',
        tipo: 'Refrigerante',
        preco: 2.99,
        id: 0
    };
  
    const bebida: Bebida = { ...defaultValues, ...data };
  
    return bebida;
  }
  