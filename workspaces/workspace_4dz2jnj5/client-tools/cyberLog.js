window.cyberLog = function(text) {
  const styles = [
    'font-size: 2rem',
    'color: #f0f',
    'text-shadow: 0 0 5px #f0f, 0 0 10px #f0f, 0 0 20px #f0f, 0 0 40px #ff00de, 0 0 80px #ff00de',
    'font-family: "Courier New", Courier, monospace',
    'font-weight: bold',
    'padding: 10px',
    'background-color: #0d020d',
    'border: 2px solid #f0f',
    'border-radius: 5px'
  ].join(';');

  console.log(`%c${text}`, styles);
};