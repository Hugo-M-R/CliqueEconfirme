import { useState, useRef, useCallback } from 'react'
import './App.css'

const PERGUNTA_1 = 'Vai no alok 30/01?'
const PERGUNTA_2 = 'Topa ir lá na loja de doces antes do show?'

const MENSAGEM_OBRIGADO = 'Muito obrigado, te farei feliz! 💜'

/** Tamanho aproximado do botão NÃO para manter dentro da área */
const TAMANHO_BOTAO = 100

function useBotaoFujao(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [pos, setPos] = useState({ x: 20, y: 20 })

  const mover = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const maxX = Math.max(0, rect.width - TAMANHO_BOTAO)
    const maxY = Math.max(0, rect.height - TAMANHO_BOTAO)
    setPos({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    })
  }, [containerRef])

  return { pos, mover }
}

function BlocoPergunta({
  pergunta,
  onSim,
  containerRef,
  posNao,
  moverNao,
}: {
  pergunta: string
  onSim: () => void
  containerRef: React.RefObject<HTMLDivElement | null>
  posNao: { x: number; y: number }
  moverNao: () => void
}) {
  return (
    <div ref={containerRef} className="bloco-pergunta">
      <p className="pergunta-texto">{pergunta}</p>
      <div className="botoes-wrapper">
        <button
          type="button"
          className="botao botao-sim"
          onClick={onSim}
          aria-label="Sim"
        >
          SIM
        </button>
        <button
          type="button"
          className="botao botao-nao"
          style={{ left: posNao.x, top: posNao.y }}
          onMouseEnter={moverNao}
          onClick={moverNao}
          aria-label="Não"
        >
          NÃO
        </button>
      </div>
    </div>
  )
}

function App() {
  const [aceito1, setAceito1] = useState(false)
  const [aceito2, setAceito2] = useState(false)
  const containerRef1 = useRef<HTMLDivElement>(null)
  const containerRef2 = useRef<HTMLDivElement>(null)

  const fujao1 = useBotaoFujao(containerRef1)
  const fujao2 = useBotaoFujao(containerRef2)

  const ambosAceitos = aceito1 && aceito2

  return (
    <div className="tela-pegadinha">
      {ambosAceitos ? (
        <div className="mensagem-sucesso">
          <p className="texto-sucesso">{MENSAGEM_OBRIGADO}</p>
        </div>
      ) : (
        <>
          <BlocoPergunta
            pergunta={PERGUNTA_1}
            onSim={() => setAceito1(true)}
            containerRef={containerRef1}
            posNao={fujao1.pos}
            moverNao={fujao1.mover}
          />
          <BlocoPergunta
            pergunta={PERGUNTA_2}
            onSim={() => setAceito2(true)}
            containerRef={containerRef2}
            posNao={fujao2.pos}
            moverNao={fujao2.mover}
          />
        </>
      )}
    </div>
  )
}

export default App
