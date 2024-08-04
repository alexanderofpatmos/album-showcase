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

function filterAlbums() {
    const selectedOptions = Array.from(document.getElementById('filter-tags').selectedOptions).map(option => option.value.toLowerCase());
    const albums = document.getElementsByClassName('album');

    Array.from(albums).forEach(album => {
        const genres = album.getAttribute('data-genres').toLowerCase().split(' ');
        const arts = album.getAttribute('data-art').toLowerCase().split(' ');
        const match = selectedOptions.length === 0 || selectedOptions.every(filter => genres.includes(`#${filter}`) || arts.includes(`#${filter}`));
        album.style.display = match ? 'block' : 'none';
    });
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

function populateFilterOptions() {
    const albums = document.getElementsByClassName('album');
    const tags = new Set();

    Array.from(albums).forEach(album => {
        album.getAttribute('data-genres').toLowerCase().split(' ').forEach(tag => {
            tags.add(tag.replace('#', ''));
        });
        album.getAttribute('data-art').toLowerCase().split(' ').forEach(tag => {
            tags.add(tag.replace('#', ''));
        });
    });

    const filterSelect = document.getElementById('filter-tags');
    filterSelect.innerHTML = '';

    Array.from(tags).sort().forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.text = tag;
        filterSelect.appendChild(option);
    });

    $(filterSelect).select2({
        placeholder: "Select tags",
        allowClear: true,
        closeOnSelect: false,
        dropdownCssClass: 'dark-dropdown' // Add this line to apply dark theme
    });
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
