<!doctype html>
<html>
  <head>
      <meta charset="UTF-8" />
      
      <title>Chess Project</title>

      <link href="css/chess.css" rel="stylesheet">

      <!-- backend -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.2/chess.js"></script>
      <!-- front end -->
      <script src="//code.jquery.com/jquery-latest.js"></script>
      <script src="js/chess.js"></script>

  </head>
  <body>
    <span id="gid"><?php echo(uniqid()); ?></span>
    <span id="gdt"><?php date_default_timezone_set('US/Eastern'); echo(date('Y-m-d H:i:s', time())); ?></span>
    <div class="chessGame">
      <div class="board board__orentation-black"></div>
    </div>
    <h2>Update DB</h2>
    <p><a id="addToDB" href="#">Update DB.</a></p>
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
