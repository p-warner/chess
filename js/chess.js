var columns = 'abcdefgh';
var chess; //global chessjs object.

$(document).ready(function(){

  createBoard($('.board'));
  renderPositionFen();
  addGameListeners();
  addUiListeners();
});
//createBoard( $('.board').eq(0) );

/*
* Adds listeners to UI elements like player names, save game, etc.
* @param None
* @return None
*/
function addUiListeners(){
  $('[data-chess*="updatePlayerName"]').on('blur', function(){
    updatePlayers($('input[name="player_w"]').val(), $('input[name="player_b"]').val() );
  });

  $('.reorient').on('click', function(){
    $('.board').eq(0).toggleClass('board__orentation-black');
  });

  $('a#addToDB').on('click', function(){
    addToDb();
  });

  $('a#updateDB').on('click', function(){
    updateDb();
  });

  $('a#getFromDB').on('click', function(){
    getFromDb();
  });
}

/*
* Adds listeners to pieces and squares
* @param None
* @return None
*/
function addGameListeners(){
  //Show squares a piece can move to
  $('span[data-piece]').on('click',function(){
    var color, type, location, target;
    $('[data-piece-selected]').removeAttr('data-piece-selected');

    color = $(this).attr('data-piece').charAt(0);
    type = $(this).attr('data-piece').charAt(1);
    location = $(this).parent('[data-square-id]').attr('data-square-id');

    $(this).attr('data-piece-selected','');
    
    showValidMoves([color, type, location]);
    //Try move
    $('[data-square-id]').off('click');//remove all listener and reapply valid move listeners;
    $('[data-valid]').on('click', function(){
      target = $(this).attr('data-square-id');
      movePiece(color, type, location, target);
      $('[data-valid]').off('click').removeAttr('data-valid');
    });
  });
}

/*
* Adds the current state of the game to the database.
* @param None
* @return None
*/
function addToDb(){
  console.log('addtodb');
  var w = chess.header().White ? chess.header().White : 'unknown';
  var b = chess.header().Black ? chess.header().Black : 'unknown';
  var id = $('#gid').text();
  var d = $('#gdt').text();
  
  $('.board').attr('data-chess-id', id);

  var gamedata = {
    gameID: id,
    datestarted: d,
    result: 'none',
    datelastmove: 'Now + 5m',
    player_w: w,
    player_b: b,
    fen: chess.fen(),
    pgn: chess.pgn(),
    turn: chess.turn(),
    history: chess.history()+'',
    notes: 'notes'
  }

  console.log(gamedata);

  $.ajax({
    method: "POST",
    url: "/chess/api/api.php/games",
    data: gamedata
  })
  .done(function( response ) {
    console.log( "POST response: " + response );
     //$('input[name^=post_response]').val(response)
  });
}

/*
* Updates the db with current game state
* @param None
* @return None
*/
function updateDb(){
  console.log('updateDb');
  var gameID = $('.board').attr('data-chess-id');
  var w = chess.header().White ? chess.header().White : 'unknown';
  var b = chess.header().Black ? chess.header().Black : 'unknown';

  var gamedata = {
    result: 'none',
    datelastmove: 'Now + 5m',
    player_w: w,
    player_b: b,
    fen: chess.fen(),
    pgn: chess.pgn(),
    turn: chess.turn(),
    history: chess.history()+'',
    notes: 'notes'
  }

  console.log(gamedata);

  $.ajax({
    method: "PUT",
    url: "/chess/api/api.php/games?filter=gameID,eq,"+gameID,
    data: gamedata
  })
  .done(function( response ) {
    console.log( "POST response: " + response );
     //$('input[name^=post_response]').val(response)
  });
}

/*
* Gets a gamestate from the database.
* @param None
* @return None - alters the state of the global chess object.
*/
function getFromDb(){
  var gameID = $('input[name="get_gameId"]').val();
  console.log(gameID);
  //var gameID = '18';
  $.ajax({
    method: "GET",
    url: "/chess/api/api.php/games?filter=gameID,eq,"+gameID+'&transform=1'
  })
  .done(function( response ) {
    //console.log(response);
    //console.log('fen: '+response.games[0].fen);

    //renderPositionFen(response.games[0].fen);

    renderPositionPgn(response.games[0].pgn);
    addGameListeners();

  });
}

/*
* Moves a piece. Cannot handle invalid moves. Calls updates on various UI elements.
* @param String color - b||w
* @param String type - p, r, n, etc.
* @param String location - valid SAN; from square
* @param String target - valid SAN; to square
* @return None
*/
function movePiece(color, type, location, target){
  //attempt to move
  var move = chess.move({ from: location, to: target });
  if(move)
    console.log(move);
  else
    console.log('not a legal move');//should never happen.
  
  //Update UI
  updateMoveList();
  updateFEN();
  updatePGN();
  updateTurn();
  $('[data-square-id="'+target+'"]').html($('[data-square-id="'+location+'"] span'));

  if( chess.game_over() ){
    gameOver();
  }
}

/*
* Create a board
* @param JQuery Object html object to place squares in.
* @return None
*/
function createBoard(element){
  for(var i=0, r=0; i < 64; i++){
    if(i % 8 == 0) {r++;}
    if(r % 2 == 0){
      c = (i % 2 == 0) ? 'black' : 'white';
    }else{
      c = (i % 2 == 0) ? 'white' : 'black';
    } 
    id_c = columns.charAt(i%8);
    id_r = (r-9)*-1;
    element.eq(0).append('<span data-square-id='+id_c+id_r+' class="'+c+'"></span>');
  }
}

/*
* Update move list
*/
function updateMoveList(){
  $('ul.history').html('<li>'+chess.history()+'</li>');
}

/*
* Update players names
* TODO: validate playernames, maxchar, XSS, etc.
* @param String white
* @param String black
* @return None
*/
function updatePlayers(white, black){
  if(white !== ''){
    chess.header('White', white);
    $('.player_w').text( chess.header('White') );
  }
  if(black !== ''){
    chess.header('Black', black);
    $('.player_b').text( chess.header('Black') );
  }
}

/*
* Updates FEN
*/
function updateFEN(){
  $('p.fen').text(chess.fen());
}

/*
* Updates PGN
*/
function updatePGN(){
  $('p.pgn').text(chess.pgn());
}


/*
* Updates ui to show which side's move it is.
*/
function updateTurn(){
  var color = (chess.turn() == 'w' ? 'white' : 'black');
  $('.turn').html(color);
}

/*
* Updates UI to show gameover state.
*/
function gameOver(){
  $('.board').css('opacity','.5');
}

/*
* Renders a position based upon the fen passed to it.
* @param String fen - valid FEN string
* @return None
*/
function renderPositionFen(fen){
  console.log(!chess in window);
  if(!(chess in window)){
    chess.clear();
    $('[data-piece]').remove();
    chess.load(fen);
  }else{
    chess = new Chess();
  }
  
  for(var i=0, r=0; i < 64; i++){
    if(i % 8 == 0) {r++;}
    id_c = columns.charAt(i%8);
    id_r = (r-9)*-1;
    if( chess.get(id_c+id_r) )
      $('[data-square-id='+id_c+id_r+']').append('<span data-piece="'+chess.get(id_c+id_r).color+chess.get(id_c+id_r).type+'"></span>' );
  }
}

/*
* Renders a position based upon the fen passed to it.
* @param String fen - valid FEN string
* @return None
*/
function renderPositionPgn(pgn){
  if(!(chess in window)){
    chess.clear();
    $('[data-piece]').remove();
    chess.load_pgn(pgn);
  }else{
    chess = new Chess();
  }
  
  for(var i=0, r=0; i < 64; i++){
    if(i % 8 == 0) {r++;}
    id_c = columns.charAt(i%8);
    id_r = (r-9)*-1;
    if( chess.get(id_c+id_r) )
      $('[data-square-id='+id_c+id_r+']').append('<span data-piece="'+chess.get(id_c+id_r).color+chess.get(id_c+id_r).type+'"></span>' );
  }
}

/*
* Highlights squares that are valid moves based upon piece selected.
* @param array [color, type, location]
* @return None
*/
function showValidMoves(args){
  //clear out previous valid moves. 
  $('[data-valid]').removeAttr('data-valid');
  var validSquares = chess.moves( {square: args[2]} );
  console.log(validSquares);
  //TODO: check contains +?
  for(sq in validSquares){
    offset = validSquares[sq].indexOf('+') > -1 || validSquares[sq].indexOf('#') > -1 ? -3 : -2;
    console.log(validSquares[sq].substr(offset, 2));
    $('[data-square-id*="'+validSquares[sq].substr(offset, 2)+'"]').attr('data-valid','true');
  }
}

