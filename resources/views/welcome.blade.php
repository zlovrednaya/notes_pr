<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>This way</title>
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

    <div id = "footer"> </div>


    <script src="{{asset('js/app.js')}}"></script>
</body>
</html>