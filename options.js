const API_KEY_STORAGE_KEY = 'kainos-todo:apiKey';

function loadApiKey() {
}

function saveApiKey(key) {
}

document.getElementById('settings-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const key = document.getElementById('api-key-input').value.trim();

});

loadApiKey();
