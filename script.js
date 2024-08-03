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
    const filter = document.getElementById('filter-tags').value.toLowerCase();
    const albums = document.getElementsByClassName('album');

    Array.from(albums).forEach(album => {
        const tags = album.getAttribute('data-tags').toLowerCase();
        if (tags.includes(filter)) {
            album.style.display = 'block';
        } else {
            album.style.display = 'none';
        }
    });
}
