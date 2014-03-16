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

    for (var childStr in this.children) {
      if (childStr[index] === word[index]) {
        if (childStr === word) {
          return;
        }
        set = true;

        for(index += 1; childStr[index] === word[index]; index++){
        }

        var leftHalf = childStr.substring(0,index);
        var rightHalf = childStr.substring(index);
        var wordRightHalf = word.substring(index);

        if(this.children[leftHalf] === undefined) {
          if(rightHalf.length > 0) {
            this.children[leftHalf] = new Trie();
            this.children[leftHalf].learn(rightHalf);
            this.children[leftHalf].children[rightHalf] = this.children[childStr];
            delete this.children[childStr];
          }
          else {
            this.children[leftHalf] = this.children[childStr];
            delete this.children[childStr];
          }
        }
        if (wordRightHalf.length > 0) {
          this.children[leftHalf].learn(wordRightHalf);
        } else {
          this.children[leftHalf].isWord = true;
        }
        
        break;
      }
    }
    if (!set) {
      this.children[word] = new Trie(true);
    }
  }
};

Trie.prototype.find = function(word, path) {
  //Given a string find the furthest node that matches that string
  path = path || "";
  for (var child in this.children) {
    if (child[0] === word[0]) {
        if (word.length <= child.length) { //our search will end with this child
          if (child.substring(0, word.length) === word) {
            var ret = {};
            ret.node = this;
            ret.path = child;
            ret.fullPath = path += child;
            return ret;
          }
        }
        else { // the query is longer than the child 
               // if the first part of the query matches the childs key
               // go into the child poping off the part of the query that matches the child
               // then call find on that child with the remaining query
          if (word.substring(0, child.length) === child) {
            word = word.substring(child.length);
            return this.children[child].find(word, path + child);
          }

        }
    }
  }
  return null;
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
  if (found !== undefined && found !== null) {
    var currentWord = found.path;
    if (prefix.length > currentWord) {
      currentWord = prefix;
    }
    return found.node.children[found.path].getWords([], found.fullPath);
  }
  return [];
};

