let inputs = $('input[type="text"], textarea');
inputs.each(function (i, input) {
    $(input).on('input', function (e) {
        if ($(input).val().length == 1) {
            $(input).val($(input).val().toString().toUpperCase());
        }
    })
})

$("input[type='submit']").click(function (e) {
    e.preventDefault();
    let s = document.getElementById('formRai').reportValidity();
    if (s) {
        let url = 'https://script.google.com/macros/s/AKfycby0OfAgmNdhTlux-IAJkwoPRLBqsY3PCwtVO4sWxw/exec';
        let data = {};

        data.title = document.getElementById('title').value;
        data.author = document.getElementById('author').value;
        data.year = document.getElementById('year').value;
        data.theme = document.getElementById('theme').value;
        data.editorial = document.getElementById('editorial').value;
        data.isbn = document.getElementById('isbn').value;
        data.site = document.getElementById('site').value;
        data.date = document.getElementById('date').value;
        data.summary = document.getElementById('summary').value;
        data.conclusion = document.getElementById('conclusion').value;

        $.ajax({
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "POST",
            dataType: "json",
            data: data,
            success: function (result) {
                window.open(window.location.href, '_self');
            },
            error: function (e) {
                alert('An error occurred.');
                console.log("Error: " + e);
            }
        });
    }
});