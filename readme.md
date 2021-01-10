[<img src="https://avatars1.githubusercontent.com/u/75072225?s=400&u=5a5d314d2f909bfb4b3f0f45f730ffa3487bb4e4&v=4" width="50"/>](logo)
# Documentation de la REST API
## Introduction
Bienvenue sur la documentation de la REST API de GoVolley

## Commencer
### Effectuer une requête à la REST API

Le header doit contenir le token d'autorisation de l'application.
```javascript
headers: {
  'Content-Type': 'application/json'
  'app-token': [YourAppToken]
},
```

## Sport
### Enregistrer un sport 
> `https://api.url/sport/store`
> ```javascript
> body: JSON.stringify({
>   "name": [string],
>   "primay_color": [char(6)],
>   "secondary_color": [char(6)]
> }),
> ```

### Supprimer un sport 
> `https://api.url/sport/destroy`
> ```javascript
> body: JSON.stringify({
>   "name": [string],
> }),
> ```
> OR
> ```javascript
> body: JSON.stringify({
>   "id": [integer],
> }),
> ```

## Comptes
### Créer un compte 
> `https://api.url/auth/register`
> ```javascript
> body: JSON.stringify({
>   "email": [string],
>   "password": [text],
>   "confirm_password": [text]
> }),
> ```

### Se connecter 
> `https://api.url/auth/login`
> ```javascript
> body: JSON.stringify({
>   "email": [string],
>   "password": [text]
> }),
> ```

### Vérifier son compte
> `https://api.url/auth/verified`
> ```javascript
> query: {
>   "token": [text]
> },
> ```