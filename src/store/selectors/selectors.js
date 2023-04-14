// Selector pour récupérer l'historique des coups
export const getHistory = state => state.history;

// Selector pour récupérer le nombre de coups joués
export const getStepNumber = state => state.stepNumber;

// Selector pour récupérer le joueur suivant
export const getNextPlayer = state => state.xIsNext ? 'X' : 'O';

// Selector pour récupérer le tableau des carrés du plateau
export const getSquares = state => {
  const history = getHistory(state);
  const current = history[getStepNumber(state)];
  return current.squares;
};

// Selector pour récupérer le gagnant
export const getWinner = state => state.winner;

// Selector pour récupérer les cases gagnantes
export const getWinningSquares = state => state.winningSquares;

// Selector pour savoir si le jeu est terminé
export const isGameFinished = state => Boolean(getWinner(state));

// Selector pour récupérer le coup aléatoire de l'IA
export const getAIMove = state => state.aiMove.move;
