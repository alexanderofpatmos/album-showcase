
// Existing JavaScript

let sortOrderAsc = true; // To track the current sort order

function sortAlbums() {
    const grid = document.getElementById('album-grid');
    const albums = Array.from(grid.getElementsByClassName('album'));
    const sortOption = document.getElementById('sort-options').value;

    albums.sort((a, b) => {
        let aValue, bValue;
        switch (sortOption) {
            case 'title':
                aValue = a.getAttribute('data-title').toLowerCase();
                bValue = b.getAttribute('data-title').toLowerCase();
                return aValue.localeCompare(bValue);
            case 'artist':
                aValue = a.getAttribute('data-artist').toLowerCase();
                bValue = b.getAttribute('data-artist').toLowerCase();
                return aValue.localeCompare(bValue);
            case 'date':
                aValue = new Date(a.getAttribute('data-date'));
                bValue = new Date(a.getAttribute('data-date'));
                return aValue - bValue;
        }
    });

    if (!sortOrderAsc) {
        albums.reverse();
    }

    albums.forEach(album => grid.appendChild(album));
}

// New JavaScript

// Hover Pop-Up Window
document.querySelectorAll('.album').forEach(album => {
    album.addEventListener('mouseover', function (e) {
        const hoverPopup = document.getElementById('hover-popup');
        hoverPopup.style.display = 'block';
        hoverPopup.style.top = `${e.pageY}px`;
        hoverPopup.style.left = `${e.pageX}px`;
        hoverPopup.querySelector('.popup-content').innerHTML = `
            <p><strong>Title:</strong> ${album.getAttribute('data-title')}</p>
            <p><strong>Artist:</strong> ${album.getAttribute('data-artist')}</p>
            <p><strong>Date:</strong> ${album.getAttribute('data-date')}</p>
        `;
    });

    album.addEventListener('mouseout', function () {
        document.getElementById('hover-popup').style.display = 'none';
    });

    // Center Pop-Up Window
    album.addEventListener('click', function () {
        const centerPopup = document.getElementById('center-popup');
        centerPopup.style.display = 'block';
        centerPopup.querySelector('.popup-content').innerHTML = `
            <div class="close-popup" onclick="closeCenterPopup()">X</div>
            <p><strong>Title:</strong> ${album.getAttribute('data-title')}</p>
            <p><strong>Artist:</strong> ${album.getAttribute('data-artist')}</p>
            <p><strong>Date:</strong> ${album.getAttribute('data-date')}</p>
            <p><strong>Description:</strong> ${album.getAttribute('data-description')}</p>
        `;
    });
});

function closeCenterPopup() {
    document.getElementById('center-popup').style.display = 'none';
}

// Close Center Pop-Up Window by clicking outside
window.addEventListener('click', function (e) {
    const centerPopup = document.getElementById('center-popup');
    if (e.target === centerPopup) {
        centerPopup.style.display = 'none';
    }
});
