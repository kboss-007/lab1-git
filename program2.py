import sys

def find_duplicates(strings):
    word_count = {}
    for word in strings:
        #converts word to lowercase for case-insensitive comparison
        word_lower = word.lower()
        if word_lower in word_count:
            #updates the count if the word is already seen
            word_count[word_lower][1] += 1
        else:
            #stores the word with its original case and a count of 1
            word_count[word_lower] = [word, 1]
    
    #filters the dictionary to only include words with count > 1
    duplicates = [original[0] for original in word_count.values() if original[1] > 1]
    return duplicates

#function to split a string into words
def split_words(arg):
    words = []
    word = ""
    for char in arg:
        if char.isalpha():
            word += char
        elif word:
            words.append(word)
            word = ""
    if word:
        words.append(word)
    return words

def main():
    if len(sys.argv) < 2:
        print("ERROR: You must provide at least one string")
        return
    
    words = []
    for arg in sys.argv[1:]:
        #split each argument into words using the split_words function
        words.extend(split_words(arg))

    duplicates = find_duplicates(words)
    
    if duplicates:
        for word in duplicates:
            print(word)
    else:
        print("No duplicates found.")

main()
