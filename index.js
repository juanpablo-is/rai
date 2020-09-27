let form = document.getElementById('formRai');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.reportValidity();

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
            console.log(result);
        },
        error: function () {
            console.log("error");
        }
    });
});