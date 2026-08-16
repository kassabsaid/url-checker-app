const elements = {
    input: document.getElementById('url-input'),
    formatStatus: document.getElementById('format-status'),
    serverStatus: document.getElementById('server-status')
};

function validateUrlFormat(urlStr) {
    try {
        new URL(urlStr);
        return true;
    } catch {
        return false;
    }
}

function updateBadge(element, message, type) {
    if (!message) {
        element.className = 'badge';
        element.textContent = '';
        return;
    }
    element.className = `badge visible ${type}`;
    element.textContent = message;
}

elements.input.addEventListener('input', (e) => {
    const currentUrl = e.target.value.trim();

    if (!currentUrl) {
        updateBadge(elements.formatStatus, '', '');
        updateBadge(elements.serverStatus, '', '');
        return;
    }

    const isValidFormat = validateUrlFormat(currentUrl);

    if (isValidFormat) {
        updateBadge(elements.formatStatus, 'Valid Format', 'success');
        // Server logic will be added here
    } else {
        updateBadge(elements.formatStatus, 'Invalid Format', 'error');
        updateBadge(elements.serverStatus, '', '');
    }
});