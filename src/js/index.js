import "./imports";

function autoType(elementClass, typingSpeed) {
    var element = $(elementClass);
    element.css({
        "position": "relative",
        "display": "inline-block"
    });
    element.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
    element = element.find(".text-js");
    var text = element.text().trim().split('');
    var amntOfChars = text.length;
    var newString = "";
    element.text("|");
    setTimeout(function() {
        element.css("opacity", 1);
        element.prev().removeAttr("style");
        element.text("");
        for (var i = 0; i < amntOfChars; i++) {
            (function(i, char) {
                setTimeout(function() {
                    newString += char;
                    element.text(newString);
                }, i * typingSpeed);
            })(i + 1, text[i]);

            if (i == amntOfChars - 1) {
                showSubtitle();
            }
        }
    }, 1000);
}


function showSubtitle() {
    $('.subtitle').addClass('fadeInUp');
}

$(document).ready(function() {
    // Now to start autoTyping just call the autoType function with the 
    // class of outer div
    // The second paramter is the speed between each letter is typed.   
    autoType(".type-js", 150);
});