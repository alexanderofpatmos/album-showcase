// Add your JavaScript here
document.addEventListener('DOMContentLoaded', () => {
    $('#filter-tags').select2({
        placeholder: 'Select tags',
        allowClear: true,
        width: '200px',
        closeOnSelect: false
    });

    const albums = document.querySelectorAll('.album');
    const filterTags = document.querySelector('#filter-tags');
    const searchInput = document.querySelector('#search-bar');
    const sortOrderBtn = document.querySelector('#sort-order-btn');
    let ascendingOrder = true;

    albums.forEach(album => {
        album.addEventListener('mouseover', () => showHoverPopup(album));
        album.addEventListener('mouseout', () => hideHoverPopup(album));
    });

    filterTags.addEventListener('change', filterAlbums);
    searchInput.addEventListener('keyup', searchAlbums);
    sortOrderBtn.addEventListener('click', toggleSortOrder);

    function showPopup(img) {
        const album = img.closest('.album');
        const popup = album.querySelector('.center-popup');
        popup.style.display = 'block';
    }

    function hidePopup(element) {
        const popup = element.closest('.popup');
        popup.style.display = 'none';
    }

    function showHoverPopup(album) {
        const popup = album.querySelector('.hover-popup');
        const rect = album.getBoundingClientRect();
        popup.style.display = 'block';
        popup.style.top = `${rect.top - popup.offsetHeight}px`;
        popup.style.left = `${rect.left + (album.offsetWidth / 2) - (popup.offsetWidth / 2)}px`;
    }

    function hideHoverPopup(album) {
        const popup = album.querySelector('.hover-popup');
        popup.style.display = 'none';
    }

    function filterAlbums() {
        const selectedTags = Array.from(filterTags.selectedOptions).map(option => option.value);
        albums.forEach(album => {
            const albumTags = album.dataset.genres.split(' ').concat(album.dataset.art.split(' '));
            const matches = selectedTags.every(tag => albumTags.includes(tag));
            album.style.display = matches ? 'block' : 'none';
        });
    }

    function searchAlbums() {
        const searchText = searchInput.value.toLowerCase();
        albums.forEach(album => {
            const albumTitle = album.dataset.title.toLowerCase();
            const artistName = album.dataset.artist.toLowerCase();
            const albumDate = album.dataset.date.toLowerCase();
            const albumTags = album.dataset.genres.toLowerCase() + ' ' + album.dataset.art.toLowerCase();
            const matches = albumTitle.includes(searchText) || artistName.includes(searchText) || albumDate.includes(searchText) || albumTags.includes(searchText);
            album.style.display = matches ? 'block' : 'none';
        });
    }

    function sortAlbums() {
        const sortOption = document.querySelector('#sort-options').value;
        const sortedAlbums = Array.from(albums).sort((a, b) => {
            if (sortOption === 'title') {
                return a.dataset.title.localeCompare(b.dataset.title);
            } else if (sortOption === 'artist') {
                return a.dataset.artist.localeCompare(b.dataset.artist);
            } else if (sortOption === 'date') {
                return new Date(a.dataset.date) - new Date(b.dataset.date);
            }
        });
        if (!ascendingOrder) {
            sortedAlbums.reverse();
        }
        sortedAlbums.forEach(album => album.parentNode.appendChild(album));
    }

    function toggleSortOrder() {
        ascendingOrder = !ascendingOrder;
        sortOrderBtn.textContent = ascendingOrder ? '↑' : '↓';
        sortAlbums();
    }

    function toggleToolbar() {
        const toolbarContent = document.querySelector('#toolbar-content');
        const toolbarBtn = document.querySelector('#toggle-toolbar-btn');
        if (toolbarContent.style.display === 'none') {
            toolbarContent.style.display = 'flex';
            toolbarBtn.textContent = '▼ Close Toolbar';
        } else {
            toolbarContent.style.display = 'none';
            toolbarBtn.textContent = '▲ Open Toolbar';
        }
    }

    function toggleInfoPopup() {
        const infoPopup = document.querySelector('#info-popup');
        infoPopup.style.display = infoPopup.style.display === 'block' ? 'none' : 'block';
    }
});

function updateGridWidth(value) {
    const albumGrid = document.querySelector('#album-grid');
    albumGrid.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
}
