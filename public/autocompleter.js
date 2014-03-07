Autocompleter = function(){
  // Trie mode:
   this.data = new Trie();

  // Array mode:
  //this.data = [];
};

Autocompleter.prototype.complete = function(prefix){
  // Trie mode:
   return this.data.autoComplete(prefix);

  // Array mode:
  //return this.data.filter(function(str){
  //   return str.substring(0,prefix.length).toLowerCase() === prefix;
  //});
};

Autocompleter.prototype.add = function(word){
  // Trie mode:
   this.data.learn(word);

  // Array mode:
  //this.data.push(word);
};