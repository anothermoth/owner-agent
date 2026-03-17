window.createCard = function({ title = 'New Card', closable = true, draggable = true } = {}) {
    // Create the main card element
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-xl w-80 h-auto flex flex-col absolute select-none overflow-hidden';

    // Set a random initial position so new cards don't stack perfectly
    const randomOffsetX = Math.floor(Math.random() * 40);
    const randomOffsetY = Math.floor(Math.random() * 40);
    card.style.left = `${20 + randomOffsetX}px`;
    card.style.top = `${20 + randomOffsetY}px`;

    // Create the header
    const header = document.createElement('div');
    header.className = 'bg-gray-800 text-white p-3 flex justify-between items-center';

    const titleEl = document.createElement('span');
    titleEl.className = 'font-bold truncate';
    titleEl.textContent = title;
    header.appendChild(titleEl);

    // Handle the closable option
    if (closable) {
        const closeButton = document.createElement('button');
        closeButton.className = 'ml-4 text-gray-400 hover:text-white transition-colors focus:outline-none flex-shrink-0';
        closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`;
        closeButton.ariaLabel = 'Close';
        closeButton.onclick = (e) => {
            e.stopPropagation();
            card.remove();
        };
        header.appendChild(closeButton);
    }

    // Create the card body
    const body = document.createElement('div');
    body.className = 'p-4 flex-grow bg-gray-50 text-gray-700';
    body.innerHTML = `<p>This is the content area for "${title}".</p>`;

    // Assemble the card
    card.appendChild(header);
    card.appendChild(body);

    // Handle the draggable option
    if (draggable) {
        header.classList.add('cursor-move');
        let isDragging = false;
        let offsetX, offsetY;

        const onMouseDown = (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
            isDragging = true;
            
            offsetX = e.clientX - card.getBoundingClientRect().left;
            offsetY = e.clientY - card.getBoundingClientRect().top;
            
            card.style.zIndex = 1000; // Bring to front
            card.classList.add('shadow-2xl', 'scale-105');
            document.body.style.cursor = 'move';

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp, { once: true });
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;
            card.style.left = `${newX}px`;
            card.style.top = `${newY}px`;
        };

        const onMouseUp = () => {
            isDragging = false;
            card.style.zIndex = ''; // Reset z-index
            card.classList.remove('shadow-2xl', 'scale-105');
            document.body.style.cursor = '';
            document.removeEventListener('mousemove', onMouseMove);
        };

        header.addEventListener('mousedown', onMouseDown);
    }

    // Append to the container
    const container = document.getElementById('container');
    if (container) {
        container.appendChild(card);
    } else {
        console.error('#container element not found. Appending to body.');
        document.body.appendChild(card);
    }

    // MOST IMPORTANTLY: return the created element
    return card;
};