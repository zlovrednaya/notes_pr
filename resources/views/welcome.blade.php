<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Notespro</title>
    @viteReactRefresh
    @vite('resources/js/app.js')
</head>
<body>
   <!----<div id="root"></div>   
   --->
    <div id ="header">
        <div id="headerLeft"></div>
        <div id="headerRight"></div>
    </div>
    <div id = "body_part">
        <div id="cells"> </div>
        <div id="cells_expanded"> </div>

        
    </div>

    <div id="table_part">
        <span class="span-elt">Список заметок</span>
        <div id="add_part"><span class="span-elt new"><div class="action-elt" onClick={activateAddForm}>Добавить заметку</div></span></div>
        <table class="table-elt">
            @foreach ($notes as $note)
                <tr class="tr-table">
                    <td class="inner-table-0">{{ $note->id }}</td>
                    <td class="inner-table-1">{{ $note->title }}</td>
                    <td class="inner-table-2 action-elt" type="button"  onclick="add(id={{$note->id}})">show</td>
                    <td class="inner-table-3 action-elt">edit</td>
                    <td class="inner-table-4 action-elt">delete</td>
                
                </tr>
                
            @endforeach
        </table>
    </div>
    <div class="moveToCurrent"></div>

    <div id = "footer"> </div>



    <script src="{{asset('js/app.js')}}"></script>
</body>
</html>