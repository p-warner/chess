<!doctype html>
<html>
  <head>
      <meta charset="UTF-8" />
      
      <title>Chess Project</title>

      <link href="css/chess.css" rel="stylesheet">

      <script src="//cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.2/chess.js"></script>
      <script src="//code.jquery.com/jquery-latest.js"></script>
      <script src="js/chess.js"></script>
  </head>
  <body>
    <span id="gid"><?php echo(uniqid()); ?></span>
    <span id="gdt"><?php date_default_timezone_set('US/Eastern'); echo(date('Y-m-d H:i:s', time())); ?></span>
    <div class="chessGame">
      <div class="board board__orentation-black"></div>
    </div>
    <p class="reorient">Reorient board</p>
    <h2>Add to DB</h2>
    <p><a id="addToDB" href="#">Add to DB.</a></p>
    <h2>Update DB</h2>
    <p><a id="updateDB" href="#">update DB.</a></p>
    <h2>Get from DB</h2>
    <input type="text" name="get_gameId">
    <p><a id="getFromDB" href="#">Get from DB.</a></p>
    <h2>White</h2>
    <input type="text" name="player_w" data-chess="updatePlayerName">
    <h2>Black</h2>
    <input type="text" name="player_b" data-chess="updatePlayerName">
    <h2>TURN</h2>
    <p><span class="turn"></span></p>
    <h2>History</h2>
    <ul class="history"></ul>
    <h2>FEN</h2>
    <p class="fen"></p>
    <h2>PGN</h2>
    <p class="pgn"></p>
  </body>
</html>
