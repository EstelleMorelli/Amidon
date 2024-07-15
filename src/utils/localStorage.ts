// Ajouter les infos de l'utilisateur (id mais aussi thèmes par exemple) dans le localStorage quand on se connecte
export const addInfosToStorage = (id: string) => {
  localStorage.setItem('id', id);
  // Rajouter les autres infos de l'utilisateur (thèmes par exemple)
};

// Enlève les infos du localStorage quand on se déconnecte
export const removeInfosFromStorage = () => {
  localStorage.removeItem('id');
  // Rajouter les autres infos de l'utilisateur (thèmes par exemple)
};

// Recupère la valeur des infos depuis le localStorage au 1er rendu de <App> pour voir s'il y a déjà un utilisateur connecté. Si oui, récupère les infos, sinon, renvoi undefined
export const getInfosFromStorage = () => {
  return {
    id: localStorage.getItem('id'),
    // Rajouter autres infos à récupérer
  };
};
