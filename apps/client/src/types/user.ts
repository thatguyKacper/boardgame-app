export type User = {
    email: string,
    id: number,
    password: string,
    playedboardgamesCount?:number,
    usersscoredCount?:number,
    wanttoplayboardgamesCount?:number
    score?: [{
      userId: number,
      boardgameId: number,
      score: number
    }],
    playedboardgames?: [{
      id: number,
      name: string
    }],
    wanttoplayboardgames?: [{
      id: number,
      name: string
    }]
  }