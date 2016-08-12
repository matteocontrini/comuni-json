# comuni-json
Database comuni italiani con informazioni ISTAT e CAP

La lista è aggiornata al 01/07/2016. Comprende i [nuovi comuni 2016](http://www.tuttitalia.it/variazioni-amministrative/nuovi-comuni-2016/) e i [nuovi CAP](http://www.poste.it/risorse/postali/pdf/cap-aggiornamento-2016.pdf) operativi dal 18/04/2016.

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

## Fonti

Il database è basato su [dati ISTAT](http://www.istat.it/it/archivio/6789), nella versione 01/07/2016, ed è integrato con i dati sui CAP pubblicati da [ANCI](http://www.anci.it/) (Associazione Nazionale Comuni Italiani). Sono state effettuate correzioni manuali per aggiungere le zone postali dei comuni multi-CAP ([fonte 1](http://www.nonsolocap.it/docs/codice-di-avviamento-postale/), [fonte 2](http://www.comuni-italiani.it/cap/multicap.html)) e per allinearsi con gli aggiornamenti di CAP del 18/04/2016 (vedi link sopra).
