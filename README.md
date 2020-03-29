# Naaiactie
> Lees in [Duch](#dutch)  
> Read in [English](#english)

# DUTCH

Bijdrage leveren? Dat kan!
* Maak een fork (of branch) en een pull request (zie [Hoe maak ik een pull request](#hoe-maak-ik-een-pull-request))
* Meld problemen via de [issues](https://github.com/MakeInBelgium/naaiactie/issues/new).
* **NOOIT** rechtstreeks op `master` pushen.

Het is een eenvoudige statische website in 3 verschillende talen. Iedere taal heeft zn eigen *subfolder* voor de HTML 
bestanden. The CSS is voor alle sites hetzelfde (zie [CSS](#css)). 

Site is beschikbaar in 3 verschillende talen:
- NL ([website/html/BE_nl/](website/html/BE_nl/)): https://maakjemondmasker.be/
- FR ([website/html/BE_fr/](website/html/BE_fr/)): https://faitesvotremasquebuccal.be/
- EN ([website/html/en/](website/html/en/)): https://makefacemasks.com/

## Kom er bij!
Neem dan deel aan de conversatie op de Slack workspace van de Corona-denktank Make in Belgium: https://join.coronadenktank.be (Kanaal: #project-corona-naaiactie-dev).


# local server
Zelf een lokale server opzetten? Dat kan op verschillende manieren!

## met python
Eenvoudig lokaal previewen met het terminal-commando:

```
$> cd website
$> python3 -m http.server 8000
$>
$> # Als python 3 je standaardpython is
$> python -m http.server 8000
```
De Naaiactie is vervolgens bereikbaar op `http://localhost:8000`

## met php
Heb je php op je computer geïnstalleerd? Gebruik dan de PHP built-in webserver:

```
$> cd website
$> php -S 0.0.0.0:8000
```

De Naaiactie is vervolgens bereikbaar op `http://localhost:8000`


# CSS
De css wordt gegenereerd met bootstrap in de npm dependencies, dit kan via het commando `npm ci`. Vervolgens kan je in de map `website/assets/css` met [SCSS](https://sass-lang.com/) de SCSS converteren naar CSS:

**Dev (met auto refresh)**

```
scss --watch website/assets/css/style.scss website/assets/css/style.css
```

**Prod (voor een push)**

```
scss --style compressed website/assets/css/style.scss website/assets/css/style.css
```

## Hoe maak ik een pull request

### Via een fork

* Maak via github een fork van de [repo](https://github.com/MakeInBelgium/naaiactie).
* Maak op je lokale machine **eenmalig** een clone van deze repo.
```
git clone git@github.com:oenie/naaiactie.git
```

* Zorg dat je clone gelinkt is aan de originele repo, en maak hem meteen up-to-date.
```
git remote add upstream https://github.com/MakeInBelgium/naaiactie.git
git fetch upstream && git merge upstream/master
```

* Doe je aanpassingen op je eigen master branch en commit deze op je eigen repo
* Ga via de site naar je eigen fork. Klik vervolgens op **New pull request**
* Vul indien gewenst nog wat extra informatie in, en klik op **Create pull request**
* Wacht tot de PR wordt gemerged
* Zorg bij volgende aanpassingen altijd dat je eerst je repo weer up-to-date brengt met de originele master
```
git fetch upstream && git merge upstream/master
```

### Via een pull request op de originele repo

* Maak eenmalig een clone van de repo op je lokale machine
```
git clone git@github.com:MakeInBelgium/naaiactie.git
```
* Zorg dat je vertrekt van een up-to-date versie vande `master` branch
```
git checkout master; git pull origin master
```
* Maak een branch vanaf `master`
```
git checkout -b naam_van_je_branch
```

* Zorg dat je na je wijzigingen de dingen commit en pusht naar je branch
```
git add -A; git commit -m 'Dit is wat ik heb aangepast'
git push origin naam_van_je_branch
```

* Ga via de site naar de repo en kies uit de dropdown je eigen branch. Klik vervolgens op **New pull request**
* Vul indien gewenst nog wat extra informatie in, en klik op **Create pull request**
* Wacht tot de PR wordt gemerged, en je bent klaar.

## Deployment

De verschillende websites worden volledig gehost via [Cloudflare](https://www.cloudflare.com/) 
en [Cloudflare Worker Sites](https://workers.cloudflare.com/sites). Telkens er naar `master` wordt gepushed wordt de 
*worker* opnieuw ge-upload naar Cloudflare. Er is geen *cache invalidatie* nodig. *Cloudflare Worker Sites* zijn slim 
genoeg. Je kan alle talen centraal bekijken op https://naaiactie.mib.workers.dev/.

More info over workers:
* https://workers.cloudflare.com/sites
* https://developers.cloudflare.com/workers/tooling/wrangler/install/

# PDF met handleiding + patroon
Je kan de verschillende versies van de patronen vinden in de /pdf folder.
Bij het aanpassen van de huidige versie van een patroon best volgende stappen doorlopen:

* Voeg versienummer en eventueel datum toe aan de naam van het document
* Zorg ervoor dat de grootte van het document zeker kleiner is dan 1 MB (om onze bandbreedte te vrijwaren). Haal daarom je versie altijd nog eens door de website http://www.pdfcompressor.com
* Er zijn al problemen geweest met Adobe Reader. Probeer zeker af te checken of je nieuwe PDF ook daarin goed te lezen valt.



# ENGLISH

Do you want ot contribute? Which can!
* Fork this repository and submit a pull request (see [How do I make a pull request](#How-do-I-make-a-pull-request))
* Report problems via [issues](https://github.com/MakeInBelgium/naaiactie/issues/new).
* **NEVER** push directly to `master`.

It is a simple static website in 3 different languages. Each language has its own *subfolder* for the HTML files. The CSS is the same for all sites (see [CSS](#css)). 

Site is available in 3 different languages:
- NL ([website/html/BE_nl/](website/html/BE_nl/)): https://maakjemondmasker.be/
- FR ([website/html/BE_fr/](website/html/BE_fr/)): https://faitesvotremasquebuccal.be/
- EN ([website/html/en/](website/html/en/)): https://makefacemasks.com/

## Joint the conversation!
Then join the conversation on the Slack workspace of the Corona think tank Make in Belgium: https://join.coronadenktank.be (channel: #project-corona-naaiactie-dev).


# local server
Set up a local server yourself? That can be done in different ways!

## Using `python`
Easy local preview with the terminal command:

```
$> cd website
$> python3 -m http.server 8000
$>
$> # Als python 3 je standaardpython is
$> python -m http.server 8000
```
The Sewing Promotion is then available at `http://localhost:8000`.

## Using `php`
Do you have PHP installed on your computer? Then use the PHP built-in web server:

```
$> cd website
$> php -S 0.0.0.0:8000
```
The Sewing Promotion is then available at `http://localhost:8000`.


# CSS
The css is generated with bootstrap in the npm dependencies, this can be done via the command `npm ci`. Then in the folder `website/assets/csswith` [SCSS](https://sass-lang.com/) you can convert the SCSS to CSS:

**Dev (with auto-refresh)**

```
scss --watch website/assets/css/style.scss website/assets/css/style.css
```

**Prod (for a push)**

```
scss --style compressed website/assets/css/style.scss website/assets/css/style.css
```

## How do I make a pull request

### Via a repository fork

* Fork this [repo](https://github.com/MakeInBelgium/naaiactie) on Github.
* Make a **single** clone of this repo on your local machine.
```
git clone git@github.com:oenie/naaiactie.git
```

* Make sure your clone is linked to the original repo, and immediately update it.
```
git remote add upstream https://github.com/MakeInBelgium/naaiactie.git
git fetch upstream && git merge upstream/master
```

* Make your adjustments on your own master branch and commit it on your own repo
* Go to your own fork via the site. Then click on **New pull request**
* Enter some additional information if desired, and click **Create pull request**
* Wait for the PR to merge
* With subsequent adjustments, always make sure that you first bring your repo up-to-date with the original master
```
git fetch upstream && git merge upstream/master
```

### Via a pull request on the original repository

* Clone the repo on your local machine once
```
git clone git@github.com:MakeInBelgium/naaiactie.git
```
* Make sure you start with an up-to-date version of the `master` branch
```
git checkout master; git pull origin master
```
* Create a branch from `master`
```
git checkout -b naam_van_je_branch
```
* After you make changes, commit and push things to your branch
```
git add -A; git commit -m 'Dit is wat ik heb aangepast'
git push origin naam_van_je_branch
```

* Go to the repo via the site and choose your own branch from the dropdown. Then click on **New pull request**
* Enter some additional information if desired, and click **Create pull request**
* Wait for the PR to merge, and you're done.

## Deployment

The different websites are fully hosted via [Cloudflare](https://www.cloudflare.com/) and [Cloudflare Worker Sites](https://workers.cloudflare.com/sites). Whenever `master` is pushed, the worker is re-uploaded to Cloudflare. No *cache invalidation* is required. *Cloudflare Worker Sites* are smart enough. You can view all languages ​​centrally at https://naaiactie.mib.workers.dev/.


More info over workers:
* https://workers.cloudflare.com/sites
* https://developers.cloudflare.com/workers/tooling/wrangler/install/

# PDF met handleiding + patroon
You can find the different versions of the patterns in the / pdf folder. When adjusting the current version of a pattern it is best to go through the following steps:

* Add version number and possibly date to the name of the document
* Make sure the size of the document is definitely less than 1 MB (to protect our bandwidth). Always * get your version through the website http://www.pdfcompressor.com
* There have already been problems with Adobe Reader. Be sure to check whether your new PDF is easy to * read.
