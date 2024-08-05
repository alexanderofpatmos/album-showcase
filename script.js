let sortOrderAsc = true; // To track the current sort order

function sortAlbums() {
    const grid = document.getElementById('album-grid');
    const albums = Array.from(grid.getElementsByClassName('album'));
    const sortOption = document.getElementById('sort-select').value;

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

    // Clear the grid and append sorted albums
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    albums.forEach(album => grid.appendChild(album));
}

function toggleSortOrder() {
    sortOrderAsc = !sortOrderAsc;
    document.getElementById('sort-order-btn').textContent = sortOrderAsc ? '↑' : '↓';
    sortAlbums();
}

function searchAlbums() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const albums = document.getElementsByClassName('album');

    Array.from(albums).forEach(album => {
        const title = album.getAttribute('data-title').toLowerCase();
        const artist = album.getAttribute('data-artist').toLowerCase();
        const date = album.getAttribute('data-date').toLowerCase();
        const genres = album.getAttribute('data-genres').toLowerCase();
        const arts = album.getAttribute('data-art').toLowerCase();
        const match = title.includes(searchTerm) || artist.includes(searchTerm) || date.includes(searchTerm) || genres.includes(searchTerm) || arts.includes(searchTerm);
        album.style.display = match ? 'block' : 'none';
    });
}

function adjustGridWidth() {
    const gridWidth = document.getElementById('grid-width').value;
    const albumGrid = document.getElementById('album-grid');
    albumGrid.style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`;
}

function toggleToolbar() {
    const toolbar = document.getElementById('toolbar-content');
    if (toolbar.style.display === 'none' || toolbar.style.display === '') {
        toolbar.style.display = 'flex';
    } else {
        toolbar.style.display = 'none';
    }
}

$(document).ready(function() {
    $('#tag-filter').select2({
        placeholder: "Select tags",
        allowClear: true
    });
    
    // Populate the tag filter
    populateTagFilter();

    // Initialize event listeners
    document.getElementById('sort-select').addEventListener('change', sortAlbums);
    document.getElementById('sort-order-btn').addEventListener('click', toggleSortOrder);
    document.getElementById('search-input').addEventListener('input', searchAlbums);
    document.getElementById('grid-width').addEventListener('input', adjustGridWidth);
    document.getElementById('toggle-toolbar-btn').addEventListener('click', toggleToolbar);
});

// Function to populate the tag filter dropdown with unique tags
function populateTagFilter() {
    const tagFilter = document.getElementById('tag-filter');
    const albums = document.querySelectorAll('.album');
    const tags = new Set();

    albums.forEach(album => {
        const albumTags = album.dataset.genres.split(' ');
        albumTags.forEach(tag => tags.add(tag));
    });

    tags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        tagFilter.appendChild(option);
    });
}

// Function to filter albums by selected tags
function filterByTag() {
    const tagFilter = document.getElementById('tag-filter');
    const selectedTags = Array.from(tagFilter.selectedOptions).map(option => option.value);
    const albums = document.querySelectorAll('.album');

    albums.forEach(album => {
        const albumTags = album.dataset.genres.split(' ');
        const matches = selectedTags.every(tag => albumTags.includes(tag));
        album.style.display = matches ? 'block' : 'none';
    });
}

// Call the populateTagFilter function when the page loads
window.onload = function() {
    populateTagFilter();
    // Other onload functions...
}

function searchAlbums() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const albums = document.getElementsByClassName('album');

    Array.from(albums).forEach(album => {
        const title = album.getAttribute('data-title').toLowerCase();
        const artist = album.getAttribute('data-artist').toLowerCase();
        const date = album.getAttribute('data-date').toLowerCase();
        const genres = album.getAttribute('data-genres').toLowerCase();
        const arts = album.getAttribute('data-art').toLowerCase();
        const match = title.includes(searchTerm) || artist.includes(searchTerm) || date.includes(searchTerm) || genres.includes(searchTerm) || arts.includes(searchTerm);
        album.style.display = match ? 'block' : 'none';
    });
}

function showPopup(element) {
    const popup = element.nextElementSibling;
    const allPopups = document.querySelectorAll('.popup');
    allPopups.forEach(p => p.style.display = 'none'); // Hide all popups
    popup.style.display = 'block';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.width = '60%'; // Ensure larger size for clicked popup
    document.body.style.overflow = 'hidden';
}

function hidePopup(element) {
    const popup = element.parentElement;
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function toggleToolbar() {
    const toolbarContent = document.getElementById('toolbar-content');
    const toggleBtn = document.getElementById('toggle-toolbar-btn');
    if (toolbarContent.style.display === 'none') {
        toolbarContent.style.display = 'flex';
        toggleBtn.textContent = '▼ Close Toolbar';
    } else {
        toolbarContent.style.display = 'none';
        toggleBtn.textContent = '▲ Open Toolbar';
    }
}

function toggleInfoPopup() {
    const infoPopup = document.getElementById('info-popup');
    if (infoPopup.style.display === 'none' || infoPopup.style.display === '') {
        infoPopup.style.display = 'block';
    } else {
        infoPopup.style.display = 'none';
    }
}

function updateGridWidth(value) {
    const grid = document.getElementById('album-grid');
    grid.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
}

document.addEventListener('DOMContentLoaded', () => {
    populateFilterOptions();
    sortAlbums(); // Default sorting by album title (A-Z)
    toggleToolbar(); // Ensure toolbar is closed by default
});
