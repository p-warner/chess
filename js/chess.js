var columns = 'abcdefgh';
var chess;
$(document).ready(function(){
  //chessjs
  chess = new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');


  //insert spans for board
  for(var i=0, r=0; i < 64; i++){
    if(i % 8 == 0) {r++;}
    if(r % 2 == 0){
      c = (i % 2 == 0) ? 'black' : 'white';
    }else{
      c = (i % 2 == 0) ? 'white' : 'black';
    } 
    id_c = columns.charAt(i%8);
    id_r = (r-9)*-1;
    $('.board').eq(0).append('<span data-square-id='+id_c+id_r+' class="'+c+'"></span>');
  }

  //starting setup
  //initPieces();
  renderBoard('rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2');

  //piece listeners
  $('span[data-piece]').on('click',function(){
    var color, type, location;
    
    color = $(this).attr('data-piece').split('_')[0];
    type = $(this).attr('data-piece').split('_')[1];
    location = $(this).parent('[data-square-id]').attr('data-square-id');
    console.log(color+', '+type+', '+location);
    
    showValidMoves([color, type, location]);
  });
});
//createBoard( $('.board').eq(0) );

/*
* Helpers
*/

/*
* Places all pieces at their starting locations
* @param None
* @return None
*/
function initPieces(){
  //init pawns
  for(i=1; i<9; i++){
    insertPiece(columns.charAt(i%8)+'2', 'w_p');
    insertPiece(columns.charAt(i%8)+'7', 'b_p');
  }
  
  //insertPiece('c3', 'w_n');
  
  //init pieces
  insertPiece('a1', 'w_r');
  insertPiece('h1', 'w_r');
  insertPiece('b1', 'w_n');
  insertPiece('g1', 'w_n');
  insertPiece('c1', 'w_b');
  insertPiece('f1', 'w_b');
  insertPiece('d1', 'w_q');
  insertPiece('e1', 'w_k');
  //init pieces
  insertPiece('a8', 'b_r');
  insertPiece('h8', 'b_r');
  insertPiece('b8', 'b_n');
  insertPiece('g8', 'b_n');
  insertPiece('c8', 'b_b');
  insertPiece('f8', 'b_b');
  insertPiece('d8', 'b_q');
  insertPiece('e8', 'b_k');
}

/*
* Places a piece on a square
* @param String square id
* @param String the piece
* @return None
*/
function insertPiece(id_square, piece){
  $('[data-square-id='+id_square+']').html('<span data-piece="'+piece+'"></span>');
}

/*
* Removes a piece from a square
* @param String square id
* @return None
*/
function removePiece(id_square){
  $('[data-square-id='+id_square+']').html('');
}

/*
* Create a board
* @param Object html object to place squares in.
* @return None
*/
function createBoard(b){
  
}

/*
* Renders a position based upon the fen passed to it.
* @param Object html object to place squares in.
* @return None
*/
function renderBoard(fen){
  var c = new Chess(fen);
  for(var i=0, r=0; i < 64; i++){
    if(i % 8 == 0) {r++;}
    id_c = columns.charAt(i%8);
    id_r = (r-9)*-1;
    if( c.get(id_c+id_r) )
      $('[data-square-id='+id_c+id_r+']').append('<span data-piece="'+c.get(id_c+id_r).color+'_'+c.get(id_c+id_r).type+'"></span>' );
  }

}

function showValidMoves(args){
  //clear out previous valid moves. 
  $('[data-valid]').removeAttr('data-valid');
  var validSquares = [];
  switch(args[1]){
    case 'p'://pawn
      if(args[0] == 'w'){
        validSquares.push(args[2].charAt(0)+''+String.fromCharCode(args[2].charCodeAt(1)+1));
        validSquares.push(args[2].charAt(0)+''+String.fromCharCode(args[2].charCodeAt(1)+2));
      }else{
        validSquares.push(args[2].charAt(0)+''+String.fromCharCode(args[2].charCodeAt(1)-1));
        validSquares.push(args[2].charAt(0)+''+String.fromCharCode(args[2].charCodeAt(1)-2));
      }
      break;
    case 'n'://knight
      //up
      validSquares.push(String.fromCharCode(args[2].charCodeAt(0)-1)+''+String.fromCharCode(args[2].charCodeAt(1)+2));
      validSquares.push(String.fromCharCode(args[2].charCodeAt(0)+1)+''+String.fromCharCode(args[2].charCodeAt(1)+2));
      //left
      validSquares.push(String.fromCharCode(args[2].charCodeAt(0)-2)+''+String.fromCharCode(args[2].charCodeAt(1)+1));
      validSquares.push(String.fromCharCode(args[2].charCodeAt(0)-2)+''+String.fromCharCode(args[2].charCodeAt(1)-1));
      //down
      validSquares.push(String.fromCharCode(args[2].charCodeAt(0)+1)+''+String.fromCharCode(args[2].charCodeAt(1)-2));
      validSquares.push(String.fromCharCode(args[2].charCodeAt(0)-1)+''+String.fromCharCode(args[2].charCodeAt(1)-2));
      //right
      validSquares.push(String.fromCharCode(args[2].charCodeAt(0)+2)+''+String.fromCharCode(args[2].charCodeAt(1)+1));
      validSquares.push(String.fromCharCode(args[2].charCodeAt(0)+2)+''+String.fromCharCode(args[2].charCodeAt(1)-1));
      break;
  }
  for(sq in validSquares){
    $('[data-square-id*="'+validSquares[sq]+'"]').attr('data-valid','true');
  }
}

