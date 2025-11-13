import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { StarRating } from "./StarRating";

const ESTILOS_CABELO = [
  {
    id: "cabelo-1",
    nome: "Curto Cacheado",
    imagem: "@/assets/1/estilo_do_cabelo_curto_cacheado_pixel_art.jpeg"
  },
  {
    id: "cabelo-2",
    nome: "Médio Ondulado",
    imagem: "@/assets/1/estilo_do_cabelo_medio_ondulado_pixel_art.jpeg"
  },
  {
    id: "cabelo-3",
    nome: "Pixie Cut",
    imagem: "@/assets/1/estilo_do_cabelo_pixie_cut_pixel_art.jpeg"
  },
  {
    id: "cabelo-4",
    nome: "Corte Bob",
    imagem: "@/assets/1/cabelo_estilo_bob_pixel_art_somente_o.jpeg"
  }
];

const ESTILOS_ROUPA = [
  {
    id: "roupa-1",
    nome: "Casual",
    imagem: "@/assets/2/roupa_tecnologica_estilo_casual_pixel_art_somente.jpeg"
  },
  {
    id: "roupa-2",
    nome: "Formal",
    imagem: "@/assets/2/roupa_tecnologica_estilo_formal_pixel_art_somente.jpeg"
  },
  {
    id: "roupa-3",
    nome: "Esportivo",
    imagem: "@/assets/2/roupa_tecnologica_estilo_esportivo_pixel_art_somente.jpeg"
  },
  {
    id: "roupa-4",
    nome: "Boho",
    imagem: "@/assets/2/roupa_tecnologica_estilo_boho_pixel_art_somente.jpeg"
  }
];

const CENARIOS = [
  {
    id: "cenario-1",
    nome: "Área Rural",
    imagem: "@/assets/3/fundo_de_uma_area_rural.jpeg"
  },
  {
    id: "cenario-2",
    nome: "Parque Natural",
    imagem: "@/assets/3/fundo_de_um_parque_natural_no_brasil.jpeg"
  },
  {
    id: "cenario-3",
    nome: "Pôr do Sol",
    imagem: "@/assets/3/fundo_de_um_por_do_sol_na.jpeg"
  },
  {
    id: "cenario-4",
    nome: "Estúdio Tech",
    imagem: "@/assets/3/fundo_de_um_estudio_de_tecnologia_estilo.jpeg"
  },
  {
    id: "cenario-5",
    nome: "Abstrato",
    imagem: "@/assets/3/fundo_de_um_abstrato_pixelart.jpeg"
  }
];

export function CustomizationStepper() {
  const [etapa, setEtapa] = useState(1);
  const [selecoes, setSelecoes] = useState({
    cabelo: "",
    roupa: "",
    cenario: "",
  });
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [avaliacao, setAvaliacao] = useState(0);

  const handleSelecao = (id: string, tipo: "cabelo" | "roupa" | "cenario") => {
    setSelecoes((prev) => ({
      ...prev,
      [tipo]: id,
    }));
  };

  const handleProximo = () => {
    if (etapa < 3) setEtapa((prev) => prev + 1);
  };

  const handleVoltar = () => {
    if (mostrarResultado) {
      setMostrarResultado(false);
    } else if (etapa > 1) {
      setEtapa((prev) => prev - 1);
    }
  };

  const handleFinalizar = () => {
    setMostrarResultado(true);
  };

  const ResultadoFinal = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-center mb-8">Seu Look Personalizado</h3>
        <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-2xl h-[600px] rounded-lg overflow-hidden bg-muted">
            {/* Placeholder para a imagem final combinada */}
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center space-y-4">
                <p className="text-lg">Combinação Final</p>
                <p className="text-sm text-muted-foreground">
                  Cabelo: {ESTILOS_CABELO.find(c => c.id === selecoes.cabelo)?.nome}<br />
                  Roupa: {ESTILOS_ROUPA.find(r => r.id === selecoes.roupa)?.nome}<br />
                  Cenário: {CENARIOS.find(c => c.id === selecoes.cenario)?.nome}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 text-center">
            <h4 className="text-lg font-medium">Como você avalia seu look?</h4>
            <div className="flex justify-center">
              <StarRating onChange={setAvaliacao} />
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={handleVoltar}>
              Voltar e Editar
            </Button>
            <Button 
              onClick={() => {
                // TODO: Implementar salvamento
                console.log("Look salvo com avaliação:", avaliacao);
              }}
              disabled={avaliacao === 0}
            >
              Salvar Look
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderOpcoes = (
    opcoes: Array<{ id: string; nome: string; imagem: string }>,
    tipo: "cabelo" | "roupa" | "cenario"
  ) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {opcoes.map((opcao) => (
          <Card
            key={opcao.id}
            className={`p-4 cursor-pointer transition-all hover:scale-105 ${
              selecoes[tipo] === opcao.id
                ? "ring-2 ring-primary"
                : "hover:ring-1 hover:ring-primary/50"
            }`}
            onClick={() => handleSelecao(opcao.id, tipo)}
          >
            <div className="h-64 rounded-md mb-2 overflow-hidden">
              <img
                src={opcao.imagem}
                alt={opcao.nome}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h4 className="font-medium text-center">{opcao.nome}</h4>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Card className="p-6 w-full max-w-6xl mx-auto">
      {mostrarResultado ? (
        <ResultadoFinal />
      ) : (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-8">
              {[1, 2, 3].map((numero) => (
                <div
                  key={numero}
                  className={`flex flex-col items-center ${
                    etapa === numero ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      etapa >= numero
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {numero}
                  </div>
                  <span className="text-sm">
                    {numero === 1
                      ? "Cabelo"
                      : numero === 2
                      ? "Roupa"
                      : "Cenário"}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {etapa === 1 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-center mb-6">Escolha o Estilo do Cabelo</h3>
                  {renderOpcoes(ESTILOS_CABELO, "cabelo")}
                </div>
              )}

              {etapa === 2 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-center mb-6">Escolha o Estilo da Roupa</h3>
                  {renderOpcoes(ESTILOS_ROUPA, "roupa")}
                </div>
              )}

              {etapa === 3 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-center mb-6">Escolha o Cenário</h3>
                  {renderOpcoes(CENARIOS, "cenario")}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleVoltar}
              disabled={etapa === 1}
            >
              Voltar
            </Button>
            {etapa < 3 ? (
              <Button onClick={handleProximo}>Próximo</Button>
            ) : (
              <Button 
                onClick={handleFinalizar}
                disabled={!selecoes.cabelo || !selecoes.roupa || !selecoes.cenario}
              >
                Finalizar
              </Button>
            )}
          </div>
        </>
      )}
    </Card>
  );
}