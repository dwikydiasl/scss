//loading page
function onReady(callback) {
    var intervalID = window.setInterval(checkReady, 6000);
    function checkReady() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }
}
function show(id, value) {
    document.getElementById(id).style.display = value ? 'block' : 'none';
}
onReady(function () {
    show('header', true);
    show('landing-page', true);
    show('loading_page', false);
});