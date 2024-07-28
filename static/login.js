document.getElementById('button').addEventListener('click', login);
function login() {
    fetch('/api/login', {
	method: 'POST',
	body: JSON.stringify({login: document.getElementById('login').value, 
			     password: document.getElementById('password').value})
    })
	.then(res => {
	    if(res.status === 404){
		return '404';
	    } 
	    console.log(res);
	    return res.json();
	})
	.then(json => {
	    // if(json.permissions.redirect === true){
	    // 	window.location.replace('/api/create');
	    // 	return '301';
	    // } else {
	    // 	renderContent(json);
	    // }    
	})
};


function renderContent(content){
    document.body.innerHTML = `${content}`;
}

function renderError(error){
    if (error == 404){
	render404();
    } else {
	document.body.innerHTML = `<h1 style="color: red">${error}</h1>`;
    }
}

function render404(){
    document.body.innerHTML = `<h1 style="color: blue">404</h1>`;
}
