import os
import json
from glob import glob

# Questo script ricalcola i nomi dei file dentro la cartella "data"

class Application:
    def __init__(self):
        self.hash = Hash()
    
    def run(self):
        files = glob('../../data/*.json')
        comune = None
        for file_name in files:
            # Read file and parse JSON
            with open(file_name, 'r', encoding='utf-8') as file:
                comune = json.load(file)
            
            # Recalculate the hash
            h = self.hash.unique(comune['nome'].lower())
            file_name = os.path.basename(file_name)

            # Build the new file name
            new_file_name = f"{comune['codice']}-{h}.json"

            # Rename the old file name to the new
            if file_name != new_file_name:
                print(f"{file_name} => {new_file_name}")
                os.rename(f'../../data/{file_name}', f'../../data/{new_file_name}')

# Ported from https://github.com/bibig/node-shorthash with some tweaks
class Hash:
    _alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    def unique(self, input : str) -> str:
        output = self._baseConverter(self._javaHashCode(input), 61)
        return output.replace('-', 'Z')
    
    def _baseConverter(self, input : int, base : int) -> str:
        if base < 2 or base > 62:
            assert ValueError("Target base must be between 2 and 62")
        if input == 0:
            return "0"
        
        buffer = [''] * 32  # 32 bits (int) maximum
        index = 32 - 1
        number = abs(input)
        
        while number != 0:
            remainder = number % base
            buffer[index] = self._alphabet[remainder]
            index = index - 1
            number = (int)(number / base)

        result = ''.join(buffer[index+1:])
        if input < 0:
            result = '-' + result
        
        return result
    
    def _javaHashCode(self, input : str) -> int:
        if len(input) == 0:
            return 0
        
        # https://github.com/neuront/pyjhashcode/blob/master/jhashcode/__init__.py
        h = 0
        for c in input:
            h = (31 * h + ord(c)) & 0xFFFFFFFF
        
        return ((h + 0x80000000) & 0xFFFFFFFF) - 0x80000000


if __name__ == "__main__":
    app = Application()
    app.run()
