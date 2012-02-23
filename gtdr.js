function gaLoad() {
    $.getScript("https://apis.google.com/js/client.js?onload=gaInit")
};

function gaInit() {
    gapi.client.setApiKey(API_KEY);
    gapi.auth.init(gaCreateAuth(true));
};

function gaCreateAuth(firstTry) {
    return function() {
        window.setTimeout(function() {
            gapi.auth.authorize({
                client_id : CLIENT_ID,
                scope : SCOPE,
                immediate : firstTry
            }, gaCreateAuthHandler(firstTry));
        }, 1);
    }
}

function gaCreateAuthHandler(firstTry) {
    if(firstTry) {
        return function(authResult) {
            if(authResult) {
                gaTaskLoad()
            } else {
                gapi.auth.init(gaCreateAuth(false));
            }
        }
    } else {
        return function(authResult) {
            if(authResult) {
                gaTaskLoad()
            } else {
                alert("Please refresh the page and give permission to access Google Tasks!");
            }
        }
    }
}

function gaTaskLoad() {
    gapi.client.load('tasks', 'v1', gtdStart)
}

function gtdStart() {
    gapi.client.tasks.tasklists.list().execute(function(response) {
        console.log(response)
    });
}

$(function() {
    gaLoad();
});