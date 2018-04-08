# comuni-json
Database comuni italiani con informazioni ISTAT e CAP.

Il file JSON con tutti i **7954 comuni** è `comuni.json`.

La lista dei comuni è aggiornata al 2018-03-31. Comprende i [nuovi comuni 2018](http://www.tuttitalia.it/variazioni-amministrative/nuovi-comuni-2018/), con CAP aggiornati al 2018-01-01 (Poste Italiane non ha ancora pubblicato i CAP per i comuni istituiti durante il 2018). 

Vedi [Aggiornamenti](#aggiornamenti) per i dettagli.

**Attenzione: dal 2017-09-14 il campo `cap` è sempre un array**.

* Nome (campo `nome`)
* Codice ISTAT (campo `codice`)
* Zona/Ripartizione geografica (campo `zona` con sottocampi `nome` e `codice`)
* Regione (campo `regione` con sottocampi `nome` e `codice`)
* Provincia (campo `provincia` con sottocampi `nome` e `codice`) [non contiene dati utili se `cm` è presente]
* Città metropolitana/CM (campo `cm` con sottocampi `nome` e `codice`)
* Sigla automobilistica (campo `sigla`)
* Codice catastale (campo `codiceCatastale`)
* Codice di Avviamento Postale (campo `cap`). Sia in caso di comuni con CAP singolo che comuni multi-CAP (41 in totale), il campo è un array che specifica tutti i CAP per il comune

Tutti i campi sono di tipo stringa.

## Rappresentazioni di esempio

### Provincia presente, città metropolitana assente

```json
{
    "nome": "Terranova dei Passerini",
    "codice": "098057",
    "zona": {
        "nome": "Nord-ovest",
        "codice": "1"
    },
    "regione": {
        "codice": "03",
        "nome": "Lombardia"
    },
    "cm": {
        "codice": "",
        "nome": ""
    },
    "provincia": {
        "codice": "098",
        "nome": "Lodi"
    },
    "sigla": "LO",
    "codiceCatastale": "L125",
    "cap": ["26827"]
}
```

### Provincia assente, città metropolitana presente

```json
{
    "nome": "Agliè",
    "codice": "001001",
    "zona": {
        "nome": "Nord-ovest",
        "codice": "1"
    },
    "regione": {
        "codice": "01",
        "nome": "Piemonte"
    },
    "cm": {
        "codice": "201",
        "nome": "Torino"
    },
    "provincia": {
        "codice": "001",
        "nome": ""
    },
    "sigla": "TO",
    "codiceCatastale": "A074",
    "cap": ["10011"]
}
```

### Multi-CAP

```json
{
    "nome": "Torino",
    "codice": "001272",
    "zona": {
        "nome": "Nord-ovest",
        "codice": "1"
    },
    "regione": {
        "codice": "01",
        "nome": "Piemonte"
    },
    "cm": {
        "codice": "201",
        "nome": "Torino"
    },
    "provincia": {
        "codice": "001",
        "nome": ""
    },
    "sigla": "TO",
    "codiceCatastale": "L219",
    "cap": [
        "10121",
        "10122",
        "10123",
        "10124",
        "10125",
        "10126",
        "10127",
        "10128",
        "10129",
        "10130",
        "10131",
        "10132",
        "10133",
        "10134",
        "10135",
        "10136",
        "10137",
        "10138",
        "10139",
        "10140",
        "10141",
        "10142",
        "10143",
        "10144",
        "10145",
        "10146",
        "10147",
        "10148",
        "10149",
        "10150",
        "10151",
        "10152",
        "10153",
        "10154",
        "10155",
        "10156"
    ]
}
```

## Fonti

Il database è basato su [dati ISTAT](http://www.istat.it/it/archivio/6789) ed è integrato con i dati sui CAP pubblicati da [ANCI](http://www.anci.it/) (Associazione Nazionale Comuni Italiani). Sono state effettuate correzioni manuali per aggiungere le zone postali dei comuni multi-CAP ([fonte 1](http://www.nonsolocap.it/docs/codice-di-avviamento-postale/), [fonte 2](http://www.comuni-italiani.it/cap/multicap.html)) e per allinearsi con gli [aggiornamenti dei CAP](https://www.poste.it/cap.html) effettuati in seguito alle fusioni del 2016, 2017 e 2018.

## Aggiornamenti

I dati sono aggiornati al 2018-03-31 ([PDF Istat](pdf/istat-2017-2018.pdf)).

Sono state apportate correzioni manuali in seguito agli aggiornamenti dei CAP comunicati da Poste Italiane il [2016-04-18](pdf/cap-aggiornamento-2016.pdf), il [2016-11-21](pdf/cap-aggiornamento-2016-II.pdf), il [2017-05-08](pdf/cap-aggiornamento-2017.pdf), nel mese di [2017-11](pdf/cap-aggiornamento-2017-II.pdf), nel mese di [2018-03](pdf/cap-aggiornamento-2018.pdf).

I CAP per i comuni istituiti (per fusione o incorporamento) a febbraio e maggio 2017 e a febbraio e marzo 2018 non sono ancora stati comunicati da Poste Italiane. Sono invece presenti i nuovi CAP per i comuni istituiti all'inizio del 2017 e all'inizio del 2018.

L'aggiornamento di questa repository del 2017-02-17 introduce un nuovo metodo di generazione del file `comuni.json`, ma non modifica la struttura del file JSON, che è confermata e validata tramite apposito script. Variano invece leggermente i valori di alcuni campi: in particolare quando il nome/codice della provincia/cm è assente, il campo è una stringa vuota anziché il carattere `-`.

A partire dal 2017-09-14 il campo CAP è sempre un array, anche nel caso in cui il comune abbia un solo CAP.
