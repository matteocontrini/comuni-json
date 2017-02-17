# comuni-json
Database comuni italiani con informazioni ISTAT e CAP.

Il file JSON con tutti i 7983 comuni è `comuni.json`.

La lista dei comuni è aggiornata al 01/01/2017. Comprende i [nuovi comuni 2017](http://www.tuttitalia.it/variazioni-amministrative/nuovi-comuni-2017/) con relativi CAP provvisori (vedi [aggiornamenti](#aggiornamenti)).

* Nome (campo `nome`)
* Codice ISTAT (campo `codice`)
* Zona/Ripartizione geografica (campo `zona` con sottocampi `nome` e `codice`)
* Regione (campo `regione` con sottocampi `nome` e `codice`)
* Provincia (campo `provincia` con sottocampi `nome` e `codice`) [non contiene dati utili se `cm` è presente]
* Città metropolitana/CM (campo `cm` con sottocampi `nome` e `codice`)
* Sigla automobilistica (campo `sigla`)
* Codice catastale (campo `codiceCatastale`)
* Codice di Avviamento Postale (campo `cap`). In caso di comune multi-CAP (41 in totale), il campo è un array che specifica tutti i CAP per il comune

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
    "cap": "26827"
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
    "cap": "10011"
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

Il database è basato su [dati ISTAT](http://www.istat.it/it/archivio/6789) ed è integrato con i dati sui CAP pubblicati da [ANCI](http://www.anci.it/) (Associazione Nazionale Comuni Italiani). Sono state effettuate correzioni manuali per aggiungere le zone postali dei comuni multi-CAP ([fonte 1](http://www.nonsolocap.it/docs/codice-di-avviamento-postale/), [fonte 2](http://www.comuni-italiani.it/cap/multicap.html)) e per allinearsi con gli [aggiornamenti dei CAP](http://www.poste.it/postali/cap.shtml) effettuati in seguito alle fusioni del 2016.

L'aggiornamento di questa repository del 17 febbraio 2017 corregge i CAP di qualche decina di comuni, che erano e sono tuttora sbagliati sul sito dell'ANCI.

## Aggiornamenti

I dati sono aggiornati al 01/01/2017.
Sono state apportate correzioni manuali in seguito agli aggiornamenti dei CAP comunicati da Poste Italiane il [18/04/2016](http://www.poste.it/risorse/postali/pdf/cap-aggiornamento-2016.pdf) e il [21/11/2016](http://www.poste.it/risorse/postali/pdf/cap-aggiornamento-2016-II.pdf). I CAP per i nuovi comuni istituiti il 01/01/2017 non sono ancora stati comunicati da Poste Italiane.

L'aggiornamento di questa repository del 17 febbraio introduce un nuovo metodo di generazione del file `comuni.json`, ma non modifica la struttura del file JSON, che è confermata e validata tramite apposito script. Variano invece leggermente i valori di alcuni campi: in particolare quando il nome/codice della provincia/cm è assente, il campo è una stringa vuota anziché il carattere `-`.
