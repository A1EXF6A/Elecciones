type Candidato = {
    name: string,
    cargo: string,
    img: string
}

type Partido = {
    id: number,
    candidatos: Candidato[],
    eslogan: string,
    num_votos: number
}

export type { Partido }