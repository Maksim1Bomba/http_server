// TODO: handle 401 and 403 status

window.addEventListener('load', init);
function init(){    
    fetch('/api/check', {
	method: 'POST',
	body: JSON.stringify({})
    })
	.then(res => {
	    if(res.status === 404){
		throw '404';
	    }
	    return res.json();
	})
 	.then(json => {
	    if (json.success) {
		document.getElementById('login1').style.display = 'none';
		document.body.innerHTML = `${json.id}`
	    } else {
		document.getElementById('login1').style.display = 'block';
	    }
	})
 	.catch(error => renderError(error));
 }

function addUser(name, login, password){    
    fetch('/api/user/add', {
	method: 'POST',
	body: JSON.stringify({login, password, name})
    })
	.then(res => {
	    if(res.status === 404){
		throw '404';
	    }
	    return res.json();
	})
 	.then(json => {
	    if (json.success) {
		// document.getElementById('login1').style.display = 'none';
		// document.body.innerHTML = `${json.id}`
	    } else {
		// document.getElementById('login1').style.display = 'block';1
	    }
	})
 	.catch(error => renderError(error));
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
