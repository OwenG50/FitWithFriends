var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.1.min.js';
document.getElementsByTagName('head')[0].appendChild(script);


$("#filterTextBox").on("keyup", function () {
    var search = this.value.toUpperCase();
    $(".video").show().filter(function () {
        return $(".videoName", this).text().toUpperCase().indexOf(search) < 0;
    }).hide();
});
