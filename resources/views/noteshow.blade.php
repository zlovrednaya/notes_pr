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

    <div id ="header">
        <div id="headerLeft"></div>
        <div id="headerRight"></div>
    </div>
    <div id = "body_part">
        <div id="cells"> </div>
        <div id="cells_expanded"> </div>

        
    </div>


    <div id="table_part">
    
        <span class="span-elt">Заметка # {{ $note->id }}</span>
    
        <div class="div-pad">
            <span class="span-elt-text">Название: {{ $note->title }}</span>
            <span class="span-elt-text">Описание: {{ $note->content }}</span>
            <span class="span-elt-text">Создана: {{ $note->created_at }}</span>
        </div>
        
    </div>
   
   
    <div class="moveToCurrent"></div>

    <div id = "footer"> </div>



    <script src="{{asset('js/app.js')}}"></script>
</body>
</html>