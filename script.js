
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
                bValue = new Date(b.getAttribute('data-date'));
                return aValue - bValue;
        }
    });

    if (!sortOrderAsc) {
        albums.reverse();
    }

    albums.forEach(album => grid.appendChild(album));
}

function filterByTag() {
    const grid = document.getElementById('album-grid');
    const albums = Array.from(grid.getElementsByClassName('album'));
    const selectedTag = document.getElementById('tag-options').value;

    albums.forEach(album => {
        if (selectedTag === 'all' || album.getAttribute('data-tag') === selectedTag) {
            album.style.display = 'block';
        } else {
            album.style.display = 'none';
        }
    });
}

function adjustGridWidth() {
    const grid = document.getElementById('album-grid');
    const gridWidth = document.getElementById('grid-width').value;
    grid.style.gridTemplateColumns = `repeat(auto-fill, minmax(${gridWidth}px, 1fr))`;
}

function searchAlbums() {
    const grid = document.getElementById('album-grid');
    const albums = Array.from(grid.getElementsByClassName('album'));
    const searchQuery = document.getElementById('search-input').value.toLowerCase();

    albums.forEach(album => {
        const title = album.getAttribute('data-title').toLowerCase();
        const artist = album.getAttribute('data-artist').toLowerCase();
        if (title.includes(searchQuery) || artist.includes(searchQuery)) {
            album.style.display = 'block';
        } else {
            album.style.display = 'none';
        }
    });
}

document.getElementById('sort-options').addEventListener('change', sortAlbums);
document.getElementById('tag-options').addEventListener('change', filterByTag);
document.getElementById('grid-width').addEventListener('input', adjustGridWidth);
document.getElementById('search-input').addEventListener('input', searchAlbums);

// Toolbar hover logic
const toolbar = document.getElementById('toolbar');
document.body.addEventListener('mousemove', (event) => {
    const toolbarRect = toolbar.getBoundingClientRect();
    if (event.clientY >= window.innerHeight - toolbarRect.height) {
        toolbar.classList.add('show');
    } else {
        toolbar.classList.remove('show');
    }
});
