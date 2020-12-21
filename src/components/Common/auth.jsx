import Cookies from 'universal-cookie';
import toastr from 'toastr';

function authenticate(URL, username, password) {
    if (!username) {
        // => logoff
        console.log('Logging Off');
        const cookies = new Cookies();
        console.log(cookies.getAll())
        cookies.remove('token');
        cookies.remove('session');
        cookies.set('logged_in', false)
        console.log(cookies.getAll())
        console.log(Object.keys(cookies.getAll()))

        let options = {
            headers: new Headers({ Authorization: 'deactivated' })
        }; // clear authorization heeader
        
        /*fetch(`${URL}/Auth/token`, options)
          .finally(function() {window.location.href = '/'});*/
    }

    let options = {
        headers: new Headers({
            Authorization: `Basic ${btoa(username + ':' + password)}`
        })
    };

    return fetch(`${URL}/Auth/token`, options)
        .then(function(response) {
            if (response.status !== 200) {
                const msg = `Authentication Failed (${response. statusText})`
                console.log(response);
                toastr.error(msg)
                throw new Error(msg);
            }
            return response.json();
        })
        .then(json => {
            toastr.success('Authenticated');
            const cookies = new Cookies();
            const cookie_opts = {path : '/'}
            cookies.set('token', json.token, cookie_opts);
            cookies.set('username', json.username, cookie_opts);
            cookies.set('userid', json.userid, cookie_opts);
            cookies.set('role', json.role, cookie_opts);
            cookies.set('email', json.email, cookie_opts);
            cookies.set('logged_in', true)
            window.location.reload();

        })
        .catch(error => {
            console.warn('authenticate:',error);
            
        });
}

function get_auth() {
    const cookies = new Cookies();
    var token = cookies.get('token');
    return token;
}

function c2_call_method_post(resource, args) {
    let meta = { args: args };
    return fetch(resource, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + get_auth()
        },
        credentials: 'same-origin',
        body: JSON.stringify({ meta: meta })
    }).then(function(response) {
        if (!response.ok) {
            response.json().then(function(rsp_json) {
                let err_msg = rsp_json['errors'][0]['detail'];
                console.log('E', err_msg);
                if(err_msg != {}){toastr.error(err_msg);}
            });
            //throw new Error('Server Error ( ' + JSON.stringify(response.statusText) + ' )')
        }
        return response;
    });
}

function c2_call_method(resource, args, http_method) {
    let meta = { args: args };

    if (!http_method) {
        return c2_call_method_post(resource, args);
    }

    return fetch(resource, {
        method: http_method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + get_auth()
        },
        credentials: 'same-origin'
    }).then(function(response) {
        if (!response.ok) {
            response.json().then(function(rsp_json) {
                let err_msg = rsp_json['errors'][0]['detail'];
                console.log(err_msg);
                if(err_msg){
                    toastr.error(err_msg);
                }
            });
            //throw new Error('Server Error ( ' + JSON.stringify(response.statusText) + ' )')
        }
        //console.log(response)
        return response;
    });
}

export { get_auth, authenticate, c2_call_method };
