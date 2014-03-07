Trie = function(){
  this.characters = {};
  this.isWord = false;
};
  // This function should add the given word,
  // starting from the given index,
  // to this Trie.
Trie.prototype.learn = function(word, index){
  index = index || 0;
  if (word.length <= index) {
    this.isWord = true;
    return;
  }
  if (this.characters[word[index]] === undefined) {
    this.characters[word[index]] = new Trie();
    this.characters[word[index]].learn(word, index + 1);
  } else
  {
    this.characters[word[index]].learn(word, index + 1);
  }
  return true;
};

Trie.prototype.getWords = function(words, currentWord){
  // This function will return all the words which are
  // contained in this Trie.
  // it will use currentWord as a prefix,
  // since a Trie doesn't know about its parents.

  currentWord = currentWord || ''; //init currentWord
  words = words || [];              //and  words

  if (this.isWord) {                 // if this is a word add it to the words array
    words.push(currentWord);
  }

  $.each(this.characters, function(character, charTrie) {   //go through each character
    words.concat(charTrie.getWords(words, currentWord + character));   //add its words and pass in the currentWord + their letter
  });

  return words;  //return all the words in this trie
};

Trie.prototype.find = function(word, index){
  // This function will return the node in the trie
  // which corresponds to the end of the passed in word.

  // Be sure to consider what happens if the word is not in this Trie.
};

Trie.prototype.autoComplete = function(prefix){
  // This function will return all completions 
  // for a given prefix.
  // It should use find and getWords.
};

window.t = new Trie();
t.learn("pie");
t.learn("pies");
t.learn("pipe");
t.learn("bow");




