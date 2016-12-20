var columns = 'abcdefgh';
var chess; //global chessjs object.

$(document).ready(function(){
  //chessUIjs

  //insert spans for board
  createBoard($('.board'));

  renderfen('r1b2rk1/p1q2pp1/2pb1n1p/n7/8/2NN1B2/PPP2PP1/R1BQ1R1K b - - 3 16');

  //piece listeners
  addListeners();
});
//createBoard( $('.board').eq(0) );

/*
* Helpers
*/

/*
* Adds listeners to pieces and squares
* @param None
* @return None
*/
function addListeners(){
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

function movePiece(color, type, location, target){
  //attempt to move
  var move = chess.move({ from: location, to: target });
  if(move)
    console.log(move);
  else
    console.log('not a legal move');//should never happen.
  //Update UI
  //update PGN list
  $('ul.pgn').append('<li>'+chess.history()+'</li>');
  //TODO: update FEN
  $('p.fen').text(chess.fen());
  //turn
  $('.turn').html(chess.turn());
  //game board
  $('[data-square-id="'+target+'"]').html($('[data-square-id="'+location+'"] span'));
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
* Renders a position based upon the fen passed to it.
* @param Object html object to place squares in.
* @return None
*/
function renderfen(fen){
  chess = new Chess(fen);
  for(var i=0, r=0; i < 64; i++){
    if(i % 8 == 0) {r++;}
    id_c = columns.charAt(i%8);
    id_r = (r-9)*-1;
    if( chess.get(id_c+id_r) )
      $('[data-square-id='+id_c+id_r+']').append('<span data-piece="'+chess.get(id_c+id_r).color+chess.get(id_c+id_r).type+'"></span>' );
  }
}

/*
* Highlights squares that are valid moves.
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
    offset = validSquares[sq].indexOf('+') > -1 ? -3 : -2;
    console.log(validSquares[sq].substr(offset, 2));
    $('[data-square-id*="'+validSquares[sq].substr(offset, 2)+'"]').attr('data-valid','true');
  }
}

