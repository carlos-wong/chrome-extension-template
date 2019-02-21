// Saves options to chrome.storage
function save_options() {
  var token = document.getElementById('lejuhubtoken').value;
  chrome.storage.sync.set({
    lejuhubtoken: token,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
document.getElementById('save').addEventListener('click',save_options);
