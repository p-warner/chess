<!doctype html>
<html>
  <head>
      <meta charset="UTF-8" />
      
      <title>Chess Project</title>

      <link href="css/chess.css" rel="stylesheet">
      <link href="css/font-awesome.css" rel="stylesheet">

      <script src="//cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.2/chess.js"></script>
      <script src="//code.jquery.com/jquery-latest.js"></script>
      <script src="js/chess.js"></script>
  </head>
  <body>
    
    

    <header>
      <h1>Chess</h1>
      <span class="hide" id="gdt"><?php date_default_timezone_set('US/Eastern'); echo(date('Y-m-d H:i:s', time())); ?></span>
    </header>

    <aside>
      <p>
        <label id="addToDB" class="button"><span class="fa fa-database fa-fw"></span> Add to database</label>

        <label id="updateDB" class="button"><span class="fa fa-database fa-fw"></span> update DB with current game</label>

        <label id="getFromDB" class="button"><span class="fa fa-database fa-fw"></span> get game by id</label> 
        <input type="text" name="get_gameId" placeholder="ex. 32" maxlength="20" >
      </p>

      
    </aside>

    <aside class="f75">
      <p class="f50"><label for="player_w"><span class="uc sm"><span class="fa fa-user-circle fa-fw"></span> White pieces</span><br><input id="player_w" type="text" name="player_w" data-chess="updatePlayerName" placeholder="Name"></label></p>

      <p class="f50"><label for="player_b"><span class="uc sm"><span class="fa fa-user fa-fw"></span> Black pieces</span><br><input id="player_b" type="text" name="player_b" data-chess="updatePlayerName" placeholder="Name"></label></p>

      <section class="chessGame">
        <div class="board"></div>
      </section>

    </aside>

    <aside class="f25">
      <span class="turn"></span></p>
      <p><input id="orientation" type="checkbox" name="orientation"><label class="reorient button" for="orientation"><span class="fa fa-refresh fa-fw button--hover-flip"></span> Reorient board</label> 
    </aside>

    <footer class="f100">
      <aside class="f50">
        <p><span class="fa fa-terminal"></span> FEN</p>
        <p class="fen sm">&nbsp;</p>
      </aside>
      <aside class="f50">
        <p><span class="fa fa-list-ol"></span> PGN</p>
        <p class="pgn sm"></p>
      </aside>
      <ul class="history hide"></ul>
      
    </footer>

    

    
    
    


    

    
  </body>
</html>
