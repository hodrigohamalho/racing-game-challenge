$( document ).ready(function() {

    function pressButtonEffect(id){
        $(id).addClass("active");
    }

    function releaseButtonEffect(id){
        $(id).removeClass("active");
    }

    function move(movementData){
        console.log("Calling the websocket with the data:" +movementData);
    }

    function changeSpeed(speed){
        console.log("Calling the speed websocket:" +speed);
    }

    function getSpeed(){
        return $("#speed").val();
    }

    var down = {}; // repeating calling issue

    function enableKeyboardControl(){
        // Case when the button is pressed
        $(document).keydown(function(e) {
            switch(e.which) {
                case 37: // left
                if (down['37'] == null) { // first press
                    pressButtonEffect("#left-button");
                    move({
                        direction: "left",
                        speed: getSpeed()
                    });
                    down['37'] = true;
                }
                break;

                case 38: // up
                if (down['38'] == null) { // first press
                    pressButtonEffect("#up-button");
                    move({
                        direction: "up",
                        speed: getSpeed()
                    });
                    down['38'] = true;
                }
                break;

                case 39: // right
                if (down['39'] == null) { // first press
                    pressButtonEffect("#right-button");
                    move({
                        direction: "right",
                        speed: getSpeed()
                    });
                    down['39'] = true;
                }
                break;

                case 40: // down
                if (down['40'] == null) { // first press
                    pressButtonEffect("#down-button");
                    move({
                        direction: "down",
                        speed: getSpeed()
                    });
                    down['40'] = true;
                }
                break;

                default: return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        });


        $(document).keyup(function(e) {
            switch(e.which) {
                case 37: // left
                releaseButtonEffect("#left-button");
                move({
                    direction: "stop",
                    speed: getSpeed()
                });
                down['37'] = null;
                break;

                case 38: // up
                releaseButtonEffect("#up-button");
                move({
                    direction: "stop",
                    speed: getSpeed()
                });
                down['38'] = null;
                break;

                case 39: // right
                releaseButtonEffect("#right-button");
                move({
                    direction: "stop",
                    speed: getSpeed()
                });
                down['39'] = null;
                break;

                case 40: // down
                releaseButtonEffect("#down-button");
                move({
                    direction: "stop",
                    speed: getSpeed()
                });
                down['40'] = null;
                break;

                default: return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        });
    }

    $("#speed").change(function(){
        let newSpeed = $(this).val();
        changeSpeed(newSpeed);
    });

    // turn on the feature to control using the keyboard
    enableKeyboardControl();

 
});