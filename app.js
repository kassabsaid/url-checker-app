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

// Debounce function to limit server request
function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

// Mock asynchronous server request to simulate checking URL existence
async function mockAsyncServerRequest(url) {
    return new Promise((resolve) => {
        // Simulate network delay between 400ms and 1200ms
        const networkDelay = Math.floor(Math.random() * 800) + 400;
        
        setTimeout(() => {
            const exists = Math.random() > 0.3; // 70% chance to exist
            const hasFileExtension = /\.[a-z0-9]+$/i.test(url);
            const type = hasFileExtension ? 'file' : 'directory';

            resolve({ exists, type });
        }, networkDelay);
    });
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

async function checkUrlExistence(url) {
    updateBadge(elements.serverStatus, 'Checking server...', 'loading');

    try {
        const result = await mockAsyncServerRequest(url);
        
        if (!result.exists) {
            updateBadge(elements.serverStatus, '404 - Not Found', 'error');
            return;
        }

        const typeLabel = result.type === 'file' ? 'File' : 'Directory';
        updateBadge(elements.serverStatus, `Found (${typeLabel})`, 'info');
        
    } catch (error) {
        updateBadge(elements.serverStatus, 'Server Error', 'error');
    }
}

const debouncedServerCheck = debounce(checkUrlExistence, 500);

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
        updateBadge(elements.serverStatus, 'Waiting for input...', 'loading');
        
        // Trigger throttled server check
        debouncedServerCheck(currentUrl);
    } else {
        updateBadge(elements.formatStatus, 'Invalid Format', 'error');
        updateBadge(elements.serverStatus, '', '');
    }
});