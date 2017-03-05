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
    
    <!-- 
    If you're looking here, I assume you want an explanation-

    This is a chess implementation that has the ability to save games. The goal here is to play an asynchronous game of chess on desktop and also have the ability to continue the same game from a mobile device. The goal has been met but has a ton of usability issues and is not ready to challenge someone

    This app was hacked together in under a week of christmas vacation with a 3 year old. A lot of stuff is ugly, but functional. A lot of refactoring is necessary.

    FRONT END
    The goal is to keep the front end as lean as possible so it's performant on mobile devices. It's built from scratch to keep library bloat to a minimum. (font awesome... O_o)

    HMTL5 and CSS3 are used for the presentation.

    Javascript handles most of the logic, interactivity, and UI updates. I used chessjs for the game logic.

    Front end uses ajax to call a PHP based API. Since the point of this app is not to create a game where you sit and play, ajax was a decision I made to keep the code fast and simple. web sockets would be ideal in a situation where a game would have a time limit.

    BACK END
    The api uses PHP-CRUD-API and PHP-AUTH. The API is driven by a MySQL database.

    Workflow
    I setup a git repo on github and on the Digital Ocean droplet. So pushing a 'release' to the Droplet is as simple as 'git push droplet master'. 

    Things I learned-
    The innards of a simple API and Auth for the API. 

    -pwarner
    January 2, 2016

    -->

    <header>
      <h1>Chess</h1>
      <span class="hide" id="gdt"><?php date_default_timezone_set('US/Eastern'); echo(date('Y-m-d H:i:s', time())); ?></span>
    </header>

    <aside>
      <p>
        <input type="text" name="user" placeholder="user" >
        <input type="text" name="password" placeholder="password" >
        <label id="authenticate" class="button"><span class="fa fa-database fa-fw"></span> Authenticate with API and get token</label>
      </p>

      
    </aside>

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
