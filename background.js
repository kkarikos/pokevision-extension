chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
  notify(request);
});

var notificationTimeout = 120000; // 2mins

function notify(pokemon) {
  if (notifiedPokemons.indexOf(pokemon.pokemonId) == -1) {
    doNotify(pokemon);
    notifiedPokemons.push(pokemon.pokemonId);
    setTimeout(function() {
      notifiedPokemons.splice(notifiedPokemons.indexOf(pokemon.pokemonId), 1);
    }, notificationTimeout);
  }
}

function doNotify(pokemon) {
  var id = '' + pokemon.id;
  var options = {
    type: 'basic',
    title: "Found'a!",
    message: toMessage(pokemon),
    iconUrl: 'icon.png'
  };
  var callback = function() {};
  console.log('Notifying', pokemon);
  chrome.notifications.create(id, options, callback);
}

function toMessage(pokemon) {
  return 'Found you awesome ' + getName(pokemon.pokemonId) + '!';
}

function getName(pokemonId) {
  if (pokemons[''+pokemonId]) {
    return pokemons[''+pokemonId];
  } else {
    return 'Unknown';
  }
}

var notifiedPokemons = [];

var pokemons = {
  '4': 'Charmander',
  '5': 'Charmeleon',
  '6': 'Charizard',
  '96': 'Drowzee'
};

console.log('We are live at background near you.');
