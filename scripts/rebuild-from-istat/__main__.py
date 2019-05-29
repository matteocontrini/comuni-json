import csv
import json
import os
from glob import glob

class Application:
    def run(self):
        with open('istat20190515.csv', 'r') as file:
            self._read_file(file)
    
    def _read_file(self, file):
        reader = csv.reader(file, delimiter=';')
        i = -1
        for row in reader:
            i += 1
            if i > 0:
                #self._check_duplicates(row, i)
                self._generate_file(row, i)
    
    def _generate_file(self, row, i):
        istat = row[4]
        files = glob(f'../../data/{istat}-*.json')
        if len(files) > 1:
            raise Exception(f"Duplicate existing files for {istat}: {files}")
        elif len(files) == 0:
            # Nuovo comune. Lo scriviamo da qualche parte per poi sistemare a mano hash e CAP
            existing_file_path = f"../../data/{istat}.json"
            cap_list = []
        else:
            existing_file_path = files[0]
            # Carica i CAP per questo comune, in modo da non perderlo
            # quando si rigenera il file JSON
            with open(existing_file_path, 'r') as existing_file:
                cap_list = json.load(existing_file)['cap']
            
            if (len(cap_list) == 0):
                raise Exception(f'Missing CAP {istat}')
        
        comune = {
            'nome': row[6].strip(),
            'codice': row[4],
            'zona': {
                'codice': row[8],
                'nome': row[9]
            },
            'regione': {
                'codice': row[0],
                'nome': row[10]
            },
            'provincia': {
                'codice': row[2],
                'nome': row[11]
            },
            'sigla': row[13],
            'codiceCatastale': '' if row[18] == 'N.D.' else row[18],
            'cap': cap_list,
            'popolazione': int(row[19].replace('.', ''))
        }

        # Scrivi il nuovo file in tmp/
        new_file_path = f'tmp/{os.path.basename(existing_file_path)}'
        with open(new_file_path, 'w', encoding='utf-8') as new_file:
            print(f"{i}\tWriting {new_file_path}")
            json.dump(comune, new_file, indent='\t', ensure_ascii=False)
            # Riga vuota alla fine del file per POSIX compliance
            new_file.write('\n')

    def _check_duplicates(self, row, i):
        istat = row[4]
        nome = row[5]

        files = glob(f'../../data/{istat}-*.json')
        if len(files) == 0:
            print(f"Missing {istat} {nome}")
        elif len(files) > 1:
            print(f"Duplicates: {files}")
        else:
            print(f"{i}\tOK: {files}")

if __name__ == "__main__":
    app = Application()
    app.run()
