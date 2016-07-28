console.log('Loaded main.js');

var awesomePokemons = [96];

$( document ).ajaxComplete(function( event, xhr, settings ) {
  var response = JSON.parse(xhr.responseText);
  console.log('Response:', response);
  if (response.status === "success") {
    checkPokemons(response.pokemon);
  }
});

function checkPokemons(pokemons) {
  for (var i = 0; i < pokemons.length; i++) {
    var pokemon = pokemons[i];
    if (awesomePokemons.indexOf(pokemon.pokemonId) > -1) {
      notify(pokemon);
    }
  }
}

function notify(pokemon) {
  console.log('Notifying about:', pokemon);
  chrome.runtime.sendMessage("giomchhlnmmdogcifbfjclejnoeokieh", pokemon);
}
