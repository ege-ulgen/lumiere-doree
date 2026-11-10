# Galerie Lumière Dorée

Site vitrine de la Galerie Lumière Dorée, galerie d’art contemporain au 24 rue des Archives (Paris 3e), dirigée par Étienne Marchand.

Projet de Publication Web (HLEIPL5) – L3 Information-Communication, Université Côte d’Azur.
Réalisé par **Ege Ulgen** et **Ezgi Batuk**.

**Site en ligne :** https://ege-ulgen.github.io/lumiere-doree/

## Pages

| Fichier | Contenu |
| --- | --- |
| `index.html` | Accueil en « one-page » : Accueil, Nos œuvres, La galerie, Expositions, Contact & inscription |
| `oeuvre-01.html` à `oeuvre-06.html` | Fiches des six œuvres d’Étienne Marchand |
| `merci.html` | Confirmation de l’inscription gratuite |

## Structure

```
index.html, oeuvre-0X.html, merci.html
css/style.css    feuille de style (mobile first, version desktop à partir de 900 px)
js/script.js     interactions et contrôle du formulaire
images/          photographies et œuvres (JPG / WebP), logo (SVG)
robots.txt, sitemap.xml   référencement
```

## Points techniques

- Intégration fidèle aux maquettes Figma desktop (1440 px) et mobile (393 px), responsive de 320 px à grand écran.
- Charte graphique : bleu nuit `#101319`, cuivre `#D6B38A`, ivoire `#E7DFD6`, rouge galerie `#840F0C` ; polices Playfair Display (titres) et Montserrat (textes).
- Animations CSS : apparition de l’accueil, apparition des sections au défilement, survol des œuvres (cadre et bandeau), survol des boutons et du menu, ouverture des fiches, flèche « Défiler ».
- Formulaire d’inscription : champs obligatoires et format de l’adresse e-mail contrôlés, messages d’erreur, page de remerciement (aucune donnée n’est enregistrée).
- Icônes : Font Awesome.
- Référencement et accessibilité : balises `title` et `meta description` par page, données structurées schema.org, `sitemap.xml`, textes alternatifs, navigation au clavier.
