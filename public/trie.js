Trie = function(isWord){
  isWord = isWord || false;
  this.isWord = isWord;

};

Trie.prototype.learn = function(word) {
  if (word.length > 0) {
    if (this.children === undefined){
      this.children = {};
    }

    var index = 0;
    var set = false;

    for (var childStr in this.children) {//, function(characterTrie, character) {
      if (childStr[index] === word[index]) {
        set = true;

        for(index += 1; childStr[index] === word[index]; index++){
        }

        var leftHalf = childStr.substring(0,index);
        var rightHalf = childStr.substring(index);
        var wordRightHalf = word.substring(index);

        if(this.children[leftHalf] === undefined) {
          this.children[leftHalf] = this.children[childStr];//new Trie(leftHalf === childStr);
        }
        if (wordRightHalf.length > 0) {
          this.children[leftHalf].learn(wordRightHalf);
        } else {
          this.children[leftHalf].isWord = true;
        }
        this.children[leftHalf].learn(rightHalf);
        if (childStr !== leftHalf) {
          delete this.children[childStr];
        }
        break;
      }
    }
    if (!set) {
      this.children[word] = new Trie(true);
    }
  }
};

Trie.prototype.find = function(word, index) {
  //Given a string
  index = index || 0;
  var ret = null;
  var _this = this;
  _.each(this.children, function(childTrie, child) {
    if (child[0] === word[index]) {
      if (child === word.substring(index)) {   //if this child is the word prefix looking for return it
        ret = {};
        ret.node = _this;
        ret.path = child;
        return;
      }
      else if (child.length > word.length - index) {   //if child length > than word length return it if the letters match up
        if (child.substring(0,word.length-index) === word.substring(index)){
          ret = {};
          ret.node = _this;
          ret.path = child;
          return;
        }
      } else {    //the word is longer than this child
        if (child === word.substring(index, child.length)) {//check if the first part of the word matches this node
          index += child.length;   //if it does add to the index
          ret = {};
          ret.path = child;
          ret.node = childTrie.find(word, index);
          return;
        }
      }
    }
  });
  return ret;
};

Trie.prototype.getWords = function(words, currentWord) {
  currentWord = currentWord || ''; //init currentWord
  words = words || [];

  if (this.isWord) {
    words.push(currentWord);
  }

  if(this.children !== undefined){
    $.each(this.children, function(child, childTrie) {   //go through each character
      if(words.length < 1000) {
        words.concat(childTrie.getWords(words, currentWord + child));   //add its words and pass in the currentWord + their letter
      }
    });
  }
  return words;
};

Trie.prototype.autoComplete = function(prefix) {
  var found = this.find(prefix);
  if (found !== null) {
    currentWord = '';
    var f = found;
    var lastPath = found.path;
    while (f.path !== undefined) {
      currentWord += f.path;
      lastPath = f.path;
      f = f.node;
    }
    return f.children[lastPath].getWords([], currentWord);
  }
  return [];
};
$(function(){
  window.tr = new Trie();
  tr.learn('pie');
  tr.learn('begin');
  tr.learn('beginner');
  tr.learn('beg');
  tr.learn('begging');
  tr.learn('tim');
  tr.learn('begining');
});

// Trie = function(){
//   this.children = {};
//   this.isWord = false;
// };
//   // This function should add the given word,
//   // starting from the given index,
//   // to this Trie.
// Trie.prototype.learn = function(word, index){
//   index = index || 0;
//   if (word.length <= index) {
//     this.isWord = true;
//     return;
//   }
//   if (this.children[word[index]] === undefined) {
//     this.children[word[index]] = new Trie();
//     this.children[word[index]].learn(word, index + 1);
//   } else
//   {
//     this.children[word[index]].learn(word, index + 1);
//   }
//   return true;
// };

// Trie.prototype.getWords = function(words, currentWord){
//   // This function will return all the words which are
//   // contained in this Trie.
//   // it will use currentWord as a prefix,
//   // since a Trie doesn't know about its parents.

//   currentWord = currentWord || ''; //init currentWord
//   words = words || [];              //and  words

//   if (this.isWord) {                 // if this is a word add it to the words array
//     words.push(currentWord);
//   }

//   $.each(this.children, function(character, charTrie) {   //go through each character
//     if(words.length < 1000) {
//       words.concat(charTrie.getWords(words, currentWord + character));   //add its words and pass in the currentWord + their letter
//     }
//   });

//   return words;  //return all the words in this trie
// };

// Trie.prototype.find = function(word, index){
//   // This function will return the node in the trie
//   // which corresponds to the end of the passed in word.

//   // Be sure to consider what happens if the word is not in this Trie.
//   index = index || 0;
//   if (word.length <= index){
//     return this;
//   }
//   if (this.children[word[index]] === undefined) {
//     return false;
//   }
//   return this.children[word[index]].find(word, index + 1);
// };

// Trie.prototype.autoComplete = function(prefix){
//   // This function will return all completions 
//   // for a given prefix.
//   // It should use find and getWords.
//   var found = this.find(prefix);
//   if (found) {
//     return found.getWords([], prefix);
//   }
//   return [];
// };




