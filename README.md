# comuni-json
Database comuni italiani con informazioni ISTAT e CAP

La lista è aggiornata all'1 luglio 2016. Comprende i [nuovi comuni](http://www.tuttitalia.it/variazioni-amministrative/nuovi-comuni-2016/) e i [nuovi CAP](http://www.poste.it/risorse/postali/pdf/cap-aggiornamento-2016.pdf) operativi dal 18 aprile 2016.

* Nome (`nome`)
* Codice ISTAT (`codice`)
* Zona/Ripartizione geografica (`nome` e `codice`)
* Regione (`nome` e `codice`)
* Città metropolitana/CM (`nome` e `codice`)
* Provincia (`nome` e `codice`)
* Sigla automobilistica (`sigla`)
* Codice catastale (`codiceCatastale`)
* Codice di Avviamento Postale (`cap`). In caso di comune multi-CAP (41 in totale), il campo è un array di stringhe che specifica tutti i CAP per il comune
