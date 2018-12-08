//=============================================================================
// Aphromaze.js
//=============================================================================

/*:
 * @plugindesc ゲーム用のユーティリティ.
 * @author kamomoo
 */

(function() {
    
    var _Game_Interpreter_pluginCommand =                               Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args)
    {
    _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'ShowPic') {
            switch (args[0]) {
            case 'left':
                $gameSystem.showGamePic(args[1], args[2], 0, 20, 80, 80, 10);
                this.wait(10)
                break;
            case 'right':
                //$gameSystem.showGamePic(args[1], args[2], 450, 20, 80, 80, 10);
                $gameSystem.showGamePic(args[1], args[2], 350, 0, 100, 100, 10);
                this.wait(10)
                break;
            case 'show':
                var x = $gameScreen.picture(args[1]).x();
                var y = $gameScreen.picture(args[1]).y();
                $gameSystem.showGamePic(args[1], args[2], x, y, 80, 80, 30);
                this.wait(30)
                break;
            case 'copy':
                $gameSystem.copyGamePic(args[1], args[2]);
                break;
            case 'fade':
                $gameSystem.fadeGamePic(args[1], 30);
                this.wait(30)
                break;
            case 'bg':
                $gameSystem.showGamePic(args[1], args[2], 0, 0, 100, 100, 0);
                this.wait(10)
                break;
            case 'event':
                $gameSystem.showGamePic(args[1], args[2], 0, 0, 100, 100, 30);
                this.wait(30)
                break;
            }
        }
    };

    // 指定ピクチャをフェードイン
    Game_System.prototype.showGamePic = function(id, name, x, y, scaleX, scaleY, duration) {

        // ピクチャ表示　あらかじめ非表示に
        $gameScreen.showPicture(id, name, 0, x, y, scaleX, scaleY, 0, 0);

        // ピクチャ移動　立ち絵を徐々に表示
        $gameScreen.movePicture(id, 0, x, y, scaleX, scaleY, 255, 0, duration);
        
        // this.wait(duration)
    };

    // 指定ピクチャをコピー
    // 立ち絵フェードインの準備
    // 0:元絵 1:表示絵 という画像重なりで、徐々に表情変化するように見える
    Game_System.prototype.copyGamePic = function(idFrom, idTo) {

        // 
        var name = $gameScreen.picture(idFrom).name();
        var origin = $gameScreen.picture(idFrom).origin();
        var x = $gameScreen.picture(idFrom).x();
        var y = $gameScreen.picture(idFrom).y();
        var scaleX = $gameScreen.picture(idFrom).scaleX();
        var scaleY = $gameScreen.picture(idFrom).scaleY();

        $gameScreen.showPicture(idTo, name, origin, x, y, scaleX, scaleY, 255, 0);
        
        // $gameScreen.picture(idTo) = $gameScreen.picture(idFrom);
        
    };
    
    // 指定ピクチャをフェードアウト
    Game_System.prototype.fadeGamePic = function(id, duration) {

        // ピクチャ表示　あらじめ表示済み前提
        
        // ピクチャ移動　立ち絵をフェードアウト
        var origin = $gameScreen.picture(id).origin();
        var x = $gameScreen.picture(id).x();
        var y = $gameScreen.picture(id).y();
        var scaleX = $gameScreen.picture(id).scaleX();
        var scaleY = $gameScreen.picture(id).scaleY();
        
        $gameScreen.movePicture(id, origin, x, y, scaleY, scaleY, 0, 0, duration);
        
        // this.wait(duration)
    };

})();
