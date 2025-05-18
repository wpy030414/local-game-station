export interface Game {
  title: string
  cover: string
  brand: string
  releaseDate: string
  banner: string
  desc: string
  tags: string[]
  url: string
}

export namespace GameFactory {
  export function of() {
    return structuredClone({
      title: '',
      cover: '',
      brand: '',
      releaseDate: '',
      banner: '',
      desc: '',
      tags: [],
      url: '',
    } as Game)
  }
}
