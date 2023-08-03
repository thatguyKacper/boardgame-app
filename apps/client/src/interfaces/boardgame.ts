export interface Boardgame {
    artist: string,
    bggurl: string,
    category: string,
    designer: string,
    id: number,
    maxplayers: number,
    mechanic: string,
    minage: number,
    minplayers: number,
    name: string,
    playedbyusers?: [{
      userId: number,
      boardgameId: number,
    }],
    playedbyusersCount: number,
    playingtime: number,
    publisher: string,
    score?: [{
      userId: number,
      boardgameId: number,
      score: number
    }],
    usersscoredCount?: number,
    userswanttoplay?: [{
      userId: number,
      boardgameId: number,
    }],
    userswanttoplayCount?: number,
    yearpublished: number
  }

export interface BoardgameAction {
  boardgameId: number,
  token: string,
  score?: number,
}
