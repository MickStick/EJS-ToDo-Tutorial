$(document).ready(function(){

    //shellAtInit();
    function createTodo(todo,parent){
        var Todo = $("<li id=\"todo-item\"></li>");
        var item = $("<label id=\"todo-item-label\"></label>");
        item.text(todo);
        var delBtn = $("<button id=\"del-item\"><i class=\"material-icons\">delete</i></button>");
        Todo.append(item);
        Todo.append(delBtn);
        parent.append(Todo)
    }

   $('form').on('submit',function(){
        var item = $('form input');
        var todo = {item: item.val()};
        var parent = $('ul[name=List]');
        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            success: function(data){
                //location.reload();//page relaods then something is done to the data
                console.log(data);
                createTodo(data.item,parent);
                item.val("");
            }
        });

        return false;
    });

    $('li button').on('click', function(e){
        var item = $(this).parent('#todo-item').children('#todo-item-label').text().replace(/ /g, "-");
        var delThis = $(this).parent();
        console.log("here");
        $.ajax({
            type: 'DELETE',
            url: '/todo/' + item,
            success: function(data){
                //location.reload();//page relaods then something is done to the data
                delThis.remove();
            }
        });
    });


});