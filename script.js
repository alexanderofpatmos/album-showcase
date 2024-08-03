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
        const tags = album.getAttribute('data-tags').toLowerCase().split(' ');
        const match = selectedOptions.length === 0 || selectedOptions.every(filter => tags.includes(`#${filter}`));
        album.style.display = match ? 'block' : 'none';
    });
}

function showPopup(element) {
    const popup = element.nextElementSibling;
    popup.style.display = 'block';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
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
        album.getAttribute('data-tags').toLowerCase().split(' ').forEach(tag => {
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
        closeOnSelect: false
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateFilterOptions();
    sortAlbums(); // Default sorting by album title (A-Z)
});
