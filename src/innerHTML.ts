function init(path: string) {

    fetch(path)
        .then(res => {
            if (res.status === 404) {
                throw '404';
            }
            return res.json();
        })
        .then(json => renderContent(json))
        .catch(error => renderError(error));
}

function renderContent(content) {
    document.body.innerHTML = `${content.txt}`;
}

function renderError(error) {
    if (error == 404) {
        render404();
    } else {
        document.body.innerHTML = `<h1 style="color: red">${error}</h1>`;
    }
}

function render404() {
    document.body.innerHTML = `<h1 style="color: blue">404</h1>`;
}

export { init };
