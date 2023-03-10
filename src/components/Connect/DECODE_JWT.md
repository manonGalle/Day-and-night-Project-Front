## POUR DECODER UN JWT

1. Commencer par installer la librairie jwt-decode avec la commande suivante

```
npm i jwt-decode
```

2. Ajouter la librairie au fichier qui en a besoin

```
import jwt_decode from "jwt-decode";
```

3. Puis, dans la requête AJAX axios créer une constante decodedToken appellant la fonction jwt_decode(token)


```
const decodedToken = jwt_decode(response.data.token);
```

Cela permettra de décoder le JWT. Un objet est créé contenant tous le contenu du JWT, dont le username dont nous avons besoin.

4. Enfin, dispatcher l'actionConnect avec en paramètre le username

```
dispatch(actionConnect(username));
```