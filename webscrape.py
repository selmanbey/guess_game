from urllib.request import urlopen
from bs4 import BeautifulSoup as soup
import re

link = "https://www.vocabulary.com/lists/52473"


# opens the connection, grabs and reads the page
uClient = urlopen(link)

page_html = uClient.read()

uClient.close()

#html parsing
page_soup = soup(page_html, 'html.parser')

#data scraping
allWords = page_soup.findAll("a", {"class":"word dynamictext"})
allDefinitions = page_soup.findAll("div", {"class":"definition"})

words = []
definitions = []

for word in allWords:
    currentWord = word.text
    words.append(currentWord)

for definition in allDefinitions:
    currentDef = definition.text
    definitions.append(currentDef)

game_dictionary = dict(zip(words, definitions))

# writing the data to a js file as a global variable
with open('gamedict.js', 'w') as f:
    f.write('var hangmanWords = { \n')
    for key in game_dictionary:
        f.write("\t\""+ key + "\"" + ": \"" + game_dictionary[key] + "\",\n")
    f.write("}")