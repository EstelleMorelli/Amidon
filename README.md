# INSTALLATION DU DOSSIER DU FRONT SUR SON ORDINATEUR POUR VISION LOCALHOST DE LA VM :

<details>
<summary> Pré-requis (déjà dans la VM O'Clock) :</summary>
  
### Installer node

<details>
  <summary>Linux</summary>

**Ubuntu :**

```
sudo apt install nodejs
```

**Pour les autres distributions**, vérifier <https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions>

Ou <https://nodejs.org/en/download/package-manager/>

**Alternative via NVM**  
NVM est un outil permettant de gérer plusieurs installations de plusieurs versions de node

- [Installer NVM](https://github.com/nvm-sh/nvm#installing-and-updating)
- [Utiliser NVM](https://github.com/nvm-sh/nvm#usage)

</details>

<details>
  <summary>MacOS</summary>

- A télécharger directement sur <https://nodejs.org/en/>

Ou

- [Installer homebrew](https://brew.sh/)
- Puis node avec la commande `brew install node`

</details>

<details>
  <summary>Windows</summary>

- A télécharger directement sur <https://nodejs.org/en/>

Ou

- [Installer chocolatey](https://chocolatey.org/)
- Puis node avec la commande `choco install nodejs`

</details>

### Mettre à jour node

<details>
  <summary>Linux</summary>

**Méthode via npm**

```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

**Si vous utilisez NVM**

- [Référez vous à l'utilisation de nvm](https://github.com/nvm-sh/nvm#usage)

</details>

<details>
  <summary>MacOS</summary>

- A télécharger directement sur <https://nodejs.org/en/>

Ou

**Méthode via npm**

```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

</details>

<details>
  <summary>Windows</summary>

- A télécharger directement sur <https://nodejs.org/en/>

Ou

- Si vous utilisez [chocolatey](https://chocolatey.org/) `choco upgrade nodejs`

</details>
</details>

  ### Installer PNPM
PNPM est un gestionnaire de dépendencies pour ne les stocker qu'à un endroit sur le disque de l'ordi et y avoir accès dans tous les projets (vs les installer dans tous X projets et en avoir X copies sur le disque) :
  
```
npm install -g pnpm
```

ref : https://pnpm.io/installation
 


## Cloner le dossier avec son modele Vite "vite-amidon"

Vite : dossier modèle qui configure une environnement rapidement pour plusieurs projet. 

### Fait 1 fois (à ne pas refaire) : Création du modèle vite-amidon 
<details>
C'est le modèle de base de vite avec les modifications suivantes :
  
+ eslint d'Airbnb (une référence)
+ prettier
+ d'autres choses modifier pour coller au modèle du react-vite-model d'O'Clock
+ Passage du <html lang="fr"> pour des sites en français
+ Ajout d'un reset de style css
+ Mise à zéro de App et main
+ Suppression des logos et assets par défaut
+ Ajout des dépendances React : react react-router-dom redux react-redux @reduxjs/toolkit react-dom 
+ Ajout de la bibliothèque d'icone : feather-icons
+ Ajout de l'extension de language CSS : sass
  
</details>
  
### À faire 1 fois pour ce projet et d'autres potentiels :
<details>
Cloner le repo vite-amidon dans un dossier sur votre VM ou ordinateur (dossier où seront les projets qui utiliseront le modèle) :

```
git clone git@github.com:MarionLeblanc77/vite-amidon.git
```

</details>

### À faire 1 fois à la place du clonage classique de ce projet front :
<details>
Ouvrir un terminal dans le dossier où le modèle vite-amidon a été cloné et utiliser la commande d'installation :

```
./vite-amidon/bin/install.sh
# si nécessaire, donner les droits à ce fichier :
# `chmod +x ./vite-amidon/bin/install.sh`
```

Renseigner soit :
- soit l'adresse SSH d'un dépôt Git (ce qu'on met d'habitude avec/après le git clone) (ex : git@github.com:O-clock-MA_PROMO/NOM_CHALLENGE.git)
- le nom du projet (ex : my-app)
Ici, pour ce projet :

```
git@github.com:O-clock-Nem/projet-4-aide-o-tri-front.git
```

La première fois, cette installation lance VSC, installe les dépendances et active aussi le serveur de dev sur localhost:5173. Le site est normalement accessible sur http://localhost:5173/.
</details>

### Les fois suivantes, 
on ouvre le projet dans VSC puis on lance la commande suivante pour pouvoir accéder au site sur http://localhost:5173/ :

```
pnpm dev
```
