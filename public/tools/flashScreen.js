window.flashScreen = function() {
  const originalColor = document.body.style.backgroundColor;
  document.body.style.backgroundColor = 'white';
  setTimeout(() => {
    document.body.style.backgroundColor = 'black';
  }, 100);
};