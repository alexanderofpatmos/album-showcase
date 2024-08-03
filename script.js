function sortAlbums() {
    const grid = document.getElementById('album-grid');
    const albums = Array.from(grid.getElementsByClassName('album'));
    const sortOption = document.getElementById('sort-options').value;

    albums.sort((a, b) => {
        let aValue, bValue;
        switch (sortOption) {
            case 'title':
                aValue = a.getAttribute('data-title');
                bValue = b.getAttribute('data-title');
                return aValue.localeCompare(bValue);
            case 'title-reverse':
                aValue = a.getAttribute('data-title');
                bValue = b.getAttribute('data-title');
                return bValue.localeCompare(aValue);
            case 'artist':
                aValue = a.getAttribute('data-artist');
                bValue = b.getAttribute('data-artist');
                return aValue.localeCompare(bValue);
            case 'artist-reverse':
                aValue = a.getAttribute('data-artist');
                bValue = b.getAttribute('data-artist');
                return bValue.localeCompare(aValue);
            case 'date':
                aValue = a.getAttribute('data-date');
                bValue = b.getAttribute('data-date');
                return new Date(aValue) - new Date(bValue);
            case 'date-reverse':
                aValue = a.getAttribute('data-date');
                bValue = b.getAttribute('data-date');
                return new Date(bValue) - new Date(aValue);
        }
    });

    albums.forEach(album => grid.appendChild(album));
}

function filterAlbums() {
    const filter = Array.from(document.getElementById('filter-tags').selectedOptions).map(option => option.value.toLowerCase());
    const albums = document.getElementsByClassName('album');

    Array.from(albums).forEach(album => {
        const tags = album.getAttribute('data-tags').toLowerCase();
        const match = filter.some(f => tags.includes(f));
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
            tags.add(tag);
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
}

document.addEventListener('DOMContentLoaded', () => {
    populateFilterOptions();
});
