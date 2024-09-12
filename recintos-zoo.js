/**
 * Classe `RecintosZoo` analisa recintos disponíveis para acomodar animais
 * Verifica o bioma, espaço necessário e compatibilidade com outros animais, aplicando as regras específicas determinadas no desafio
 * Retorna recintos viáveis ou mensagens de erro caso não tenha opções
 */

class RecintosZoo {
  analisaRecintos(animal, quantidade) {
      const recintos = [
          { numero: 1, bioma: "savana", tamanho: 10, animais: [{ especie: "MACACO", quantidade: 3 }] },
          { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
          { numero: 3, bioma: "savana e rio", tamanho: 7, animais: [{ especie: "GAZELA", quantidade: 1 }] },
          { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
          { numero: 5, bioma: "savana", tamanho: 9, animais: [{ especie: "LEAO", quantidade: 1 }] },
      ];

      const especies = {
          LEAO: { tamanho: 3, biomas: ["savana"], carnivoro: true },
          LEOPARDO: { tamanho: 2, biomas: ["savana"], carnivoro: true },
          CROCODILO: { tamanho: 3, biomas: ["rio"], carnivoro: true },
          MACACO: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
          GAZELA: { tamanho: 2, biomas: ["savana"], carnivoro: false },
          HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false },
      };

      try {
          if (!especies[animal]) {
              throw new Error("Animal inválido");
          }

          if (quantidade <= 0) {
              throw new Error("Quantidade inválida");
          }

          const especieInfo = especies[animal];
          const tamanhoNecessario = especieInfo.tamanho * quantidade;
          const recintosViaveis = [];

          for (const recinto of recintos) {
              if (!especieInfo.biomas.includes(recinto.bioma) && recinto.bioma !== "savana e rio") {
                  continue;
              }

              let espacoOcupado = recinto.animais.reduce(
                  (total, { especie, quantidade }) =>
                      total + especies[especie].tamanho * quantidade,
                  0
              );

              if (recinto.animais.length > 0 && !recinto.animais.some((a) => a.especie === animal)) {
                  espacoOcupado += 1;
              }

              const espacoDisponivel = recinto.tamanho - espacoOcupado;

              if (espacoDisponivel < tamanhoNecessario) {
                  continue;
              }

              if (especieInfo.carnivoro && recinto.animais.some(a => a.especie !== animal)) {
                  continue;
              }

              if (animal === "HIPOPOTAMO" && recinto.bioma !== "savana e rio") {
                  continue;
              }

              if (animal === "MACACO") {
                  if (quantidade > 1 && recinto.animais.length === 0) {
                      continue;
                  }
              }

              recintosViaveis.push(
                  `Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - tamanhoNecessario} total: ${recinto.tamanho})`
              );
          }

          if (recintosViaveis.length === 0) {
              throw new Error("Não há recinto viável");
          }

          return { recintosViaveis };

      } catch (error) {
          return { erro: error.message };
      }
  }
}

export { RecintosZoo as RecintosZoo };

