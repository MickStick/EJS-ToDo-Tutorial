$(document).ready(function() {
    let indexState = true;
    $('#toReg').on('click', function() {
        if (indexState) {
            indexState = false;
            $('#loginDiv').animate({ height: 'toggle' }, 100, function() {
                $('#regDiv').animate({ height: 'toggle' });
            });
        }

    });

    $('#toLog').on('click', function() {
        if (!indexState) {
            indexState = true;
            $('#regDiv').animate({ height: 'toggle' }, 100, function() {
                $('#loginDiv').animate({ height: 'toggle' });
            });
        }

    });


    function createTodo(todo, parent) {
        var Todo = $("<li id=\"todo-item\"></li>");
        var item = $("<label id=\"todo-item-label\"></label>");
        item.text(todo);
        var delBtn = $("<button id=\"del-item\"><i class=\"material-icons\">delete</i></button>");
        Todo.append(item);
        Todo.append(delBtn);
        parent.append(Todo)
    }

    function loginUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    function logoutUser() {
        localStorage.clear();
    }

    function getLoggedInUser() {
        return localStorage.getItem("user");
    }

    function checkForLoggedInUser() {

        if (localStorage.getItem("user") != null || localStorage.getItem("user") != 'undefined') {
            return true;
        }

        return false;
    }

    function validateForm(inputs) {
        for (let x = 0; x < inputs.length; x++) {
            if (inputs.eq(x).val() == null || inputs.eq(x).val() == "") {
                return { status: false, message: `Please fill in ${inputs.eq(x).attr('name')}` };
            }
        }

        let email = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (!email.test($('#regForm input[name="email"]').val())) {
            return { status: false, message: `Invalid email address` };
        }

        let pword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W|_?).{8,}$/;
        if (!pword.test($('#regForm input[name="password"]').val())) {
            return { status: false, message: `Password should be 8+ characters, 1+ uppercase, 1+ special character, 1+ number` };
        }

        if ($('#regForm input[name="r-password"]').val() != $('#regForm input[name="password"]').val()) {
            return { status: false, message: `Passwords sould match` };
        }

        return { status: true, message: `Di Fawm Good` };
    }

    $('#logoutBtn').on('click', function(e) {
        e.preventDefault();
        logoutUser();
        window.location = "/";
    });

    $('#loginBtn').on('click', function(e) {
        e.preventDefault();
        const email = $('#loginForm input[name="email"]').val();
        const password = $('#loginForm input[name="password"]').val();
        const user = {
            email: email,
            password: password
        }
        $.ajax({
            type: 'POST',
            url: '/user/login',
            data: user,
            success: function(data) {
                //location.reload();//page relaods then something is done to the data
                console.log(data);
                if (!data.status) {
                    alert(`Message: ${data.message}`);
                    return false;
                }
                //alert(`Message: ${data.message}`);
                loginUser(data.User);
                window.location = "/todo";
            }
        });
    });

    $('#regBtn').on('click', function(e) {
        e.preventDefault();
        const val = validateForm($('#regForm input'));
        if (!val.status) {
            alert(`Message: ${val.message}`);
            return false;
        }
        /*alert("Passed");
        return true;*/

        const email = $('#regForm input[name="email"]').val();
        const name = $('#regForm input[name="name"]').val();
        const password = $('#regForm input[name="password"]').val();
        const user = {
            name: name,
            email: email,
            password: password
        };
        $.ajax({
            type: 'POST',
            url: '/user/register',
            data: user,
            success: function(data) {
                //location.reload();//page relaods then something is done to the data
                //console.log(data);
                loginUser(data.User);
                window.location = "/todo";
            }
        });
    });

    $('#todo-list form').on('submit', function(e) {
        e.preventDefault();
        const item = $('#todo-list form input');
        const todo = { item: item.val(), user: JSON.parse(localStorage.getItem("user"))._id };
        const parent = $('ul[name=List]');


        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            success: function(data) {
                //location.reload();//page relaods then something is done to the data
                console.log(data);
                createTodo(data.data.item, parent);
                item.val("");
            }
        });

        return false;
    });


    $('li button').on('click', function(e) {
        var item = $(this).parent('#todo-item').children('#todo-item-label').text().replace(/ /g, "-");
        alert(item);
        var delThis = $(this).parent();
        console.log("here");
        $.ajax({
            type: 'DELETE',
            url: '/todo/' + item,
            success: function(data) {
                //location.reload();//page relaods then something is done to the data
                delThis.remove();
            }
        });
    });


});