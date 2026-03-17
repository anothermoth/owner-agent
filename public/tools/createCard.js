window.createCard = function(title, description) {
  const container = document.getElementById('container');

  if (!container) {
    console.error('Error: The #container element was not found in the DOM.');
    return;
  }

  // Create the main card element
  const card = document.createElement('div');
  card.className = 'bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200 transform hover:scale-105 transition-transform duration-300 ease-in-out';

  // Create the title element
  const titleElement = document.createElement('h3');
  titleElement.className = 'text-2xl font-bold text-gray-800 mb-2';
  titleElement.textContent = title;

  // Create the description element
  const descriptionElement = document.createElement('p');
  descriptionElement.className = 'text-gray-600 text-base';
  descriptionElement.textContent = description;

  // Assemble the card
  card.appendChild(titleElement);
  card.appendChild(descriptionElement);

  // Append the card to the container
  container.appendChild(card);
};